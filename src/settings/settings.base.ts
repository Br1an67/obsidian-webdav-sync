import { App } from 'obsidian'
import { WebDAVSyncSettingTab } from '.'
import WebDAVSyncPlugin from '..'

export default abstract class BaseSettings {
	constructor(
		protected app: App,
		protected plugin: WebDAVSyncPlugin,
		protected settings: WebDAVSyncSettingTab,
		protected containerEl: HTMLElement,
	) {}

	abstract display(): void
}
