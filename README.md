# 🔄 WebDAV Sync for Obsidian

## Introduction | 简介

A generic WebDAV sync plugin for Obsidian with smart conflict resolution. Works with any WebDAV server (Seafile, NextCloud, Owncloud, etc.).

通用 WebDAV 同步插件，支持智能冲突解决。适用于任何 WebDAV 服务器（Seafile 云盘、NextCloud、Owncloud 等）。

---

## ✨ Key Features | 主要特性

- 🔄 **Two-way Sync**: Efficiently synchronize your notes across devices via WebDAV
- 🌐 **Generic WebDAV**: Works with any standard WebDAV server
- 📁 **WebDAV Explorer**: Visual file browser for remote file management
- 🔀 **Smart Conflict Resolution**:
  - Three-layer merge: diff3 → diff-match-patch → conflict markers
  - Character-level comparison to automatically merge changes when possible
  - Option to use timestamp-based resolution (newest file wins)
- 🚀 **Loose Sync Mode**: Optimize performance for vaults with thousands of notes
- 📦 **Large File Handling**: Set size limits to skip large files for better performance
- 📊 **Sync Status Tracking**: Clear visual indicators of sync progress and completion
- 📝 **Detailed Logging**: Comprehensive logs for troubleshooting

<br>

- 🔄 **双向同步**: 通过 WebDAV 协议在多设备间高效同步笔记
- 🌐 **通用 WebDAV**: 支持任何标准 WebDAV 服务器
- 📁 **WebDAV 文件浏览器**: 远程文件管理的可视化界面
- 🔀 **智能冲突解决**:
  - 三层合并：diff3 → diff-match-patch → 冲突标记
  - 字符级比较自动合并更改
  - 支持基于时间戳的解决方案（最新文件优先）
- 🚀 **宽松同步模式**: 优化对包含数千笔记的仓库的性能
- 📦 **大文件处理**: 设置大小限制以跳过大文件，提升性能
- 📊 **同步状态跟踪**: 清晰的同步进度和完成提示
- 📝 **详细日志**: 全面的故障排查日志

---

## ⚠️ Important Notes | 注意事项

- ⏳ Initial sync may take longer (especially with many files)
- 💾 Please backup before syncing

<br>

- ⏳ 首次同步可能需要较长时间 (文件比较多时)
- 💾 请在同步之前备份

---

## 📜 Attribution | 致谢

This project is based on [obsidian-nutstore-sync](https://github.com/nutstore/obsidian-nutstore-sync) by nutstore-dev and contributors, licensed under AGPL-3.0. See the [NOTICE](./NOTICE) file for details.

本项目基于 [obsidian-nutstore-sync](https://github.com/nutstore/obsidian-nutstore-sync)（nutstore-dev 及贡献者），使用 AGPL-3.0 许可证。详见 [NOTICE](./NOTICE) 文件。
