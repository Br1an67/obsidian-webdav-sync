import { createClient, WebDAVClient } from 'webdav'
import WebDAVSyncPlugin from '../index'
import { createRateLimitedWebDAVClient } from '../utils/rate-limited-client'

export class WebDAVService {
	constructor(private plugin: WebDAVSyncPlugin) {}

	async createWebDAVClient(): Promise<WebDAVClient> {
		const serverUrl = this.plugin.settings.webdavServerUrl
		const client = createClient(serverUrl, {
			username: this.plugin.settings.account,
			password: this.plugin.settings.credential,
		})
		return createRateLimitedWebDAVClient(client)
	}

	async checkWebDAVConnection(): Promise<{ error?: Error; success: boolean }> {
		try {
			const client = await this.createWebDAVClient()
			return { success: await client.exists('/') }
		} catch (error) {
			return {
				error,
				success: false,
			}
		}
	}
}
