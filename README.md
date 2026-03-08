# WebDAV Sync for Obsidian

[English](#english) | [中文](#中文)

## English

An Obsidian plugin for two-way syncing notes via WebDAV. It works with any standard WebDAV server — Seafile, NextCloud, Owncloud, etc.

This project is a fork of [obsidian-nutstore-sync](https://github.com/nutstore/obsidian-nutstore-sync). The Nutstore-specific parts (SSO login, proprietary delta API) have been removed, and the WebDAV server address is now configurable. The core sync engine and its conflict resolution logic are preserved from the original.

### Features

- **Two-way sync** — pushes local changes to the server and pulls remote changes back.
- **Conflict resolution** — when the same file is edited on two devices, the plugin attempts a three-way merge (using the last synced version as the common ancestor). If that fails, it falls back to character-level patching, and as a last resort inserts conflict markers so you can resolve manually. Only Markdown files are merged; binary files use timestamp-based resolution.
- **WebDAV file browser** — browse and manage remote files from within Obsidian.
- **Configurable server URL** — point it at any WebDAV endpoint. The default is `https://pan.ustc.edu.cn/seafdav/` (USTC Seafile).
- **Loose sync mode** — skips fine-grained diffing for large vaults, trading merge precision for speed.
- **Large file skipping** — set a size threshold to exclude large attachments from sync.
- **Sync status and logging** — progress indicators in the status bar, and detailed logs for troubleshooting.

### Usage

1. Install the plugin in Obsidian (manually copy the build output to `.obsidian/plugins/webdav-sync/`).
2. Open the plugin settings, enter your WebDAV server URL, username, and password.
3. Choose a remote directory for your vault.
4. Click the sync button in the ribbon or run the sync command.

### Notes

- The first sync takes longer since it needs to index all files.
- Back up your vault before the first sync.

---

## 中文

一个通过 WebDAV 协议双向同步 Obsidian 笔记的插件。支持任何标准 WebDAV 服务器，比如 Seafile 云盘、NextCloud、Owncloud 等。

本项目 fork 自 [obsidian-nutstore-sync](https://github.com/nutstore/obsidian-nutstore-sync)，去掉了坚果云专有的 SSO 登录和增量同步 API，改为可配置的 WebDAV 地址。核心的同步引擎和冲突解决逻辑保留自原项目。

### 功能

- **双向同步** — 本地改动推送到服务器，服务器改动拉取到本地。
- **冲突解决** — 当同一个文件在两台设备上都被修改时，插件会尝试三路合并（以上次同步的版本作为共同祖先）。如果合并失败，退而使用字符级 patch；最后兜底插入冲突标记，由用户手动处理。只有 Markdown 文件会做合并，二进制文件按时间戳取新的。
- **WebDAV 文件浏览器** — 在 Obsidian 内浏览和管理远端文件。
- **可配置服务器地址** — 指向任意 WebDAV 端点。默认值为 `https://pan.ustc.edu.cn/seafdav/`（中科大 Seafile 云盘）。
- **宽松同步模式** — 跳过精细的 diff 比较，适用于笔记特别多的大仓库，用合并精度换速度。
- **大文件跳过** — 设置大小阈值，排除大附件不参与同步。
- **同步状态与日志** — 状态栏显示同步进度，详细日志方便排查问题。

### 使用方法

1. 在 Obsidian 中安装插件（手动把构建产物复制到 `.obsidian/plugins/webdav-sync/` 目录）。
2. 打开插件设置，填入 WebDAV 服务器地址、用户名和密码。
3. 选择远端目录作为仓库同步路径。
4. 点击侧边栏的同步按钮，或执行同步命令。

### 注意事项

- 首次同步需要较长时间，因为要索引所有文件。
- 首次同步前请备份你的仓库。

---

## Attribution / 致谢

This project is based on [obsidian-nutstore-sync](https://github.com/nutstore/obsidian-nutstore-sync) by nutstore-dev and contributors, licensed under AGPL-3.0. See the [NOTICE](./NOTICE) file for details.

本项目基于 [obsidian-nutstore-sync](https://github.com/nutstore/obsidian-nutstore-sync)（nutstore-dev 及贡献者开发），使用 AGPL-3.0 许可证。详见 [NOTICE](./NOTICE) 文件。

## License

AGPL-3.0. See [LICENSE](./LICENSE).
