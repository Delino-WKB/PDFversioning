# 📱 Obsidian PDF versioning Plugin

A powerful bridge between **Obsidian** and your favorite external PDF editors. Annotate your embedded PDFs, maintain multiple chronological versions of your drawings and annotations, and manage your assets with ease directly from Obsidian.

---

## ❓ Why use PDF versioning?

Standard PDF readers inside Obsidian flatten your handwriting and do not easily allow for saving multiple iterations or branching versions of the same file. This plugin allows you to automatically detect, pick, and swap between different saved versions (variants) of a PDF.

It perfectly complements apps like **Samsung Notes** (on Android) which can export vector-ink PDFs, or any desktop/mobile tool that allows saving iterations of your work.

With this plugin, you get:
1. **Quick access** to open PDFs in external editors.
2. **Live embeds and automatic versioning** inside Obsidian.
3. **Bulk management tools** to keep your vault clean from outdated duplicates.

---

## ✨ Key Features

### ✏️ Edit PDFs (Pencil Button)
- Opens any embedded PDF (`![[your-note.pdf]]`) or a PDF opened in a tab directly in your default external PDF editor.
- **Safety warning:** If you attempt to edit an older variant of a note, the plugin prompts you with a warning to prevent accidental data loss.

### 🥞 Version Picker & Switcher (Layers Button)
- Displays all saved variants/versions of a PDF in a chronological dropdown list next to the edit button.
- **Hot-swapping:** Click any version in the list to instantly swap the embedded PDF to that specific variant.
- **Sync/Reload:** Force a manual vault scan to detect newly saved versions immediately.

### ⚙️ Autonomous Versioning
Choose between two versioning naming styles in the plugin settings:
1. **Samsung Style**: Matches files ending with double timestamps (e.g., `file_20260624_153505.pdf`).
2. **Human Style**: Matches files ending with standard version numbers (e.g., `file_Version_1.pdf`, `file_Version_2.pdf`).

### 🧹 Vault & Note Cleanup
Access the plugin settings for bulk cleanup tools:
- **Duplicate Finder**: Scans the vault for multiple versions of the same file.
- **Keep only most recent**: Deletes all older variants of a file and automatically updates all markdown links pointing to them.
- **Keep only this note**: Deletes all variants except the selected one.
- **Mobile-friendly Preview**: Inspect the PDF content before deleting.

### 🛡️ Safe Deletion & Link Redirection
Deleting a PDF variant from the version picker triggers a safety check. If the file is linked or embedded in any of your markdown notes, the plugin will block standard deletion and ask you to either:
- **Delete everywhere:** Delete the PDF and strip its embed links from your notes.
- **Replace with version:** Delete the PDF and automatically update all your notes to link to a different variant you choose.

---

## 🛠️ Installation

1. Create a folder in your vault at `.obsidian/plugins/pdf-versioning`.
2. Copy `main.js`, `manifest.json`, and `styles.css` to that folder.
3. Reload Obsidian and enable the plugin in the Community Plugins tab.

---

## 🪪 License

MIT License. See `LICENSE` file for details.
