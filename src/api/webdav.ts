import { XMLParser } from 'fast-xml-parser'
import { isNil, partial } from 'lodash-es'
import { basename, join } from 'path-browserify'
import { FileStat } from 'webdav'
import { is503Error } from '~/utils/is-503-error'
import logger from '~/utils/logger'
import requestUrl from '~/utils/request-url'
import { useSettings } from '~/settings'

interface WebDAVResponse {
	multistatus: {
		response: Array<{
			href: string
			propstat: {
				prop: {
					displayname: string
					resourcetype: { collection?: any }
					getlastmodified?: string
					getcontentlength?: string
					getcontenttype?: string
				}
				status: string
			}
		}>
	}
}

function extractNextLink(linkHeader: string): string | null {
	const matches = linkHeader.match(/<([^>]+)>;\s*rel="next"/)
	return matches ? matches[1] : null
}

function getServerBasePath(serverUrl: string): string {
	try {
		const url = new URL(serverUrl)
		let path = url.pathname
		if (path.endsWith('/')) {
			path = path.slice(0, -1)
		}
		return path || '/'
	} catch {
		return '/'
	}
}

function convertToFileStat(
	serverBase: string,
	item: WebDAVResponse['multistatus']['response'][number],
): FileStat {
	// propstat can be a single object or an array (e.g. Seafile returns multiple)
	const propstat = Array.isArray(item.propstat)
		? item.propstat.find((ps: any) => ps.prop) || item.propstat[0]
		: item.propstat
	const props = propstat?.prop || {}
	const isDir = !isNil(props.resourcetype?.collection)
	const href = decodeURIComponent(item.href)
	const filename =
		serverBase === '/' ? href : join('/', href.replace(serverBase, ''))

	return {
		filename,
		basename: basename(filename),
		lastmod: props.getlastmodified || '',
		size: props.getcontentlength ? parseInt(props.getcontentlength, 10) : 0,
		type: isDir ? 'directory' : 'file',
		etag: null,
		mime: props.getcontenttype,
	}
}

export async function getDirectoryContents(
	token: string,
	path: string,
): Promise<FileStat[]> {
	const settings = await useSettings()
	const serverUrl = settings?.webdavServerUrl || ''
	const serverBase = getServerBasePath(serverUrl)

	const contents: FileStat[] = []
	path = path.split('/').map(encodeURIComponent).join('/')
	if (!path.startsWith('/')) {
		path = '/' + path
	}
	let currentUrl = `${serverUrl.replace(/\/$/, '')}${path}`

	while (true) {
		try {
			const response = await requestUrl({
				url: currentUrl,
				method: 'PROPFIND',
				headers: {
					Authorization: `Basic ${token}`,
					'Content-Type': 'application/xml',
					Depth: '1',
				},
				body: `<?xml version="1.0" encoding="utf-8"?>
        <propfind xmlns="DAV:">
          <prop>
            <displayname/>
            <resourcetype/>
            <getlastmodified/>
            <getcontentlength/>
            <getcontenttype/>
          </prop>
        </propfind>`,
			})
			const parseXml = new XMLParser({
				attributeNamePrefix: '',
				removeNSPrefix: true,
				parseTagValue: false,
				numberParseOptions: {
					eNotation: false,
					hex: true,
					leadingZeros: true,
				},
				processEntities: false,
			})
			const result: WebDAVResponse = parseXml.parse(response.text)
			const items = Array.isArray(result.multistatus.response)
				? result.multistatus.response
				: [result.multistatus.response]

			contents.push(...items.slice(1).map(partial(convertToFileStat, serverBase)))

			const linkHeader = response.headers['link'] || response.headers['Link']
			if (!linkHeader) {
				break
			}

			const nextLink = extractNextLink(linkHeader)
			if (!nextLink) {
				break
			}
			const nextUrl = new URL(nextLink)
			nextUrl.pathname = decodeURI(nextUrl.pathname)
			currentUrl = nextUrl.toString()
		} catch (e) {
			if (is503Error(e as Error)) {
				logger.error('503 error, retrying...')
				await sleep(60_000)
				continue
			}
			throw e
		}
	}

	return contents
}
