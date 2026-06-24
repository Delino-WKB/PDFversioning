import { Plugin, setIcon, Notice, TFile, FileSystemAdapter, normalizePath, PluginSettingTab, Setting, WorkspaceLeaf, App, Platform, Modal, MarkdownRenderer, Component } from 'obsidian';
import { getLocale, LocaleKey } from './locales';

export interface PDFVersioningSettings {
    language: string;
    versioningStyle: 'samsung' | 'human';
}

const DEFAULT_SETTINGS: PDFVersioningSettings = {
    language: 'it',
    versioningStyle: 'human'
}

export default class PDFVersioningPlugin extends Plugin {
    settings: PDFVersioningSettings;
    observer: MutationObserver | null = null;
    activePopup: HTMLElement | null = null;
    settingTab: PDFVersioningSettingTab | null = null;
    
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
    
    t(key: LocaleKey, ...args: string[]): string {
        let str = getLocale(this.settings.language)[key];
        for (let i = 0; i < args.length; i++) {
            str = str.replace('{'+i+'}', args[i]);
        }
        return str;
    }

    async onload() {
        await this.loadSettings();
        console.log('Loading PDF versioning Plugin');

        // Register markdown post-processor to capture embedded PDFs
        this.registerMarkdownPostProcessor((el, ctx) => {
            const pdfEmbeds = el.querySelectorAll('.internal-embed.pdf-embed');
            pdfEmbeds.forEach((pdfEmbed) => {
                if (pdfEmbed instanceof HTMLElement) {
                    pdfEmbed.dataset.pdfVersioningSourcePath = ctx.sourcePath;
                    this.setupPdfEmbed(pdfEmbed);
                }
            });
        });

        // Scan existing DOM on layout change to capture open/cached views
        this.registerEvent(
            this.app.workspace.on('layout-change', () => {
                this.scanForPdfs();
            })
        );

        // Also scan when active leaf changes to catch newly opened or switched views
        this.registerEvent(
            this.app.workspace.on('active-leaf-change', () => {
                this.scanForPdfs();
            })
        );

        // Run initial scan once layout is fully ready
        this.app.workspace.onLayoutReady(() => {
            this.scanForPdfs();
        });

        // Set up a global mutation observer to detect asynchronously loaded PDF toolbars
        this.observer = new MutationObserver((mutations) => {
            let shouldScan = false;
            for (let i = 0; i < mutations.length; i++) {
                const mutation = mutations[i];
                for (let j = 0; j < mutation.addedNodes.length; j++) {
                    const node = mutation.addedNodes[j];
                    if (node instanceof HTMLElement) {
                        if (node.classList.contains('pdf-toolbar') || node.querySelector('.pdf-toolbar')) {
                            shouldScan = true;
                            break;
                        }
                    }
                }
                if (shouldScan) break;
            }
            if (shouldScan) {
                this.scanForPdfs();
            }
        });
        
        this.observer.observe(document.body, { childList: true, subtree: true });

        // Register settings tab
        this.settingTab = new PDFVersioningSettingTab(this.app, this);
        this.addSettingTab(this.settingTab);
    }

    scanForPdfs() {
        this.app.workspace.iterateAllLeaves((leaf) => {
            const view = leaf.view;
            if (!view) return;

            if (view.getViewType() === 'pdf') {
                this.setupPdfLeaf(leaf);
            } else {
                const pdfEmbeds = view.containerEl.querySelectorAll('.internal-embed.pdf-embed');
                pdfEmbeds.forEach((pdfEmbed) => {
                    this.setupPdfEmbed(pdfEmbed as HTMLElement);
                });
            }
        });
    }

    setupPdfEmbed(pdfEmbed: HTMLElement) {
        if (!pdfEmbed.dataset.pdfVersioningSourcePath) {
            const activeFile = this.app.workspace.getActiveFile();
            if (activeFile) {
                pdfEmbed.dataset.pdfVersioningSourcePath = activeFile.path;
            }
        }

        const src = pdfEmbed.getAttribute('src');
        if (!src) return;
        const linkpath = src.split('#')[0];
        const file = this.app.metadataCache.getFirstLinkpathDest(linkpath, '');
        if (!file) return;

        const toolbar = pdfEmbed.querySelector('.pdf-toolbar');
        if (toolbar) {
            this.injectButtons(toolbar as HTMLElement, file, pdfEmbed, null);
        }
    }

    setupPdfLeaf(leaf: WorkspaceLeaf) {
        const view = leaf.view;
        if (view.getViewType() !== 'pdf') return;
        const file = (view as any).file;
        if (!file) return;

        const toolbar = view.containerEl.querySelector('.pdf-toolbar');
        if (toolbar) {
            this.injectButtons(toolbar as HTMLElement, file, null, leaf);
        }
    }

    injectButtons(toolbar: HTMLElement, file: TFile, pdfEmbed: HTMLElement | null, leaf: WorkspaceLeaf | null) {
        const existingPencil = toolbar.querySelector('.pdf-versioning-pencil-button');
        const existingLayers = toolbar.querySelector('.pdf-versioning-layers-button');
        if (toolbar.getAttribute('data-pdf-versioning-file-path') === file.path && existingPencil && existingLayers) {
            return;
        }

        if (existingPencil) existingPencil.remove();
        if (existingLayers) existingLayers.remove();
        toolbar.setAttribute('data-pdf-versioning-file-path', file.path);

        // Create Pencil Button
        const pencilButton = document.createElement('button');
        pencilButton.classList.add('clickable-icon', 'pdf-toolbar-button', 'pdf-versioning-toolbar-button', 'pdf-versioning-pencil-button');
        pencilButton.setAttribute('aria-label', 'Open PDF Editor');
        setIcon(pencilButton, 'pencil');
        pencilButton.addEventListener('click', (e) => {
            e.stopPropagation();



            const variants = this.getVariants(file);
            const newest = variants.length > 0 ? variants[variants.length - 1] : file;

            const openApp = () => {
                try {
                    new Notice(this.t('opening'));
                    this.app.openWithDefaultApp(file.path);
                } catch (err) {
                    console.error('PDF versioning: openWithDefaultApp failed', err);
                    new Notice(this.t('errorOpeningPdf') + err.message);
                }
            };

            if (newest && newest.path !== file.path) {
                let newestLabel = '';
                newestLabel = this.formatVariantLabel(newest);

                new ConfirmationModal(
                    this.app,
                    this.t('warningNotRecent', newestLabel),
                    () => {
                        openApp();
                    },
                    this.t('proceed'),
                    'mod-cta'
                ).open();
            } else {
                openApp();
            }
        });

        // Create Layers Button
        const layersButton = document.createElement('button');
        layersButton.classList.add('clickable-icon', 'pdf-toolbar-button', 'pdf-versioning-toolbar-button', 'pdf-versioning-layers-button');
        layersButton.setAttribute('aria-label', 'Mostra varianti PDF');
        setIcon(layersButton, 'layers');
        layersButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showVariantsPopup(e, pdfEmbed, leaf, file);
        });

        // Place on the right side of the toolbar:
        const toolbarRight = toolbar.querySelector('.pdf-toolbar-right');
        if (toolbarRight) {
            const children = Array.from(toolbarRight.children);
            if (children.length >= 2) {
                const target = children[children.length - 2];
                toolbarRight.insertBefore(pencilButton, target);
                toolbarRight.insertBefore(layersButton, pencilButton);
            } else if (children.length > 0) {
                toolbarRight.insertBefore(pencilButton, children[0]);
                toolbarRight.insertBefore(layersButton, pencilButton);
            } else {
                toolbarRight.appendChild(layersButton);
                toolbarRight.appendChild(pencilButton);
            }
        } else {
            const toolbarActions = toolbar.querySelector('.pdf-toolbar-actions');
            if (toolbarActions) {
                toolbarActions.appendChild(layersButton);
                toolbarActions.appendChild(pencilButton);
            } else {
                toolbar.appendChild(layersButton);
                toolbar.appendChild(pencilButton);
            }
        }
    }

    getSuffixRegex(): RegExp {
        return this.settings.versioningStyle === 'human' ? /_Version_(\d+)$/ : /_(\d{6})_(\d{6})$/;
    }

    getBaseName(fileName: string): string {
        return fileName.replace(this.getSuffixRegex(), '');
    }

    hasSuffix(fileName: string): boolean {
        return this.getSuffixRegex().test(fileName);
    }

    formatVariantLabel(file: TFile): string {
        if (!this.hasSuffix(file.basename)) return file.basename;
        
        if (this.settings.versioningStyle === 'human') {
            const match = file.basename.match(/_Version_(\d+)$/);
            if (match) {
                return `Version ${match[1]}`;
            }
        } else {
            const match = file.basename.match(/_(\d{2})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})$/);
            if (match) {
                const [_, yy, mm, dd, hh, min, ss] = match;
                return `${dd}/${mm}/20${yy} ${hh}:${min}:${ss}`;
            }
        }
        return file.basename;
    }

    getVariants(file: TFile): TFile[] {
        const baseName = this.getBaseName(file.basename);
        const pdfFiles = this.app.vault.getFiles().filter(f => f.extension === 'pdf');
        
        const variants = pdfFiles.filter(f => {
            const fBase = this.getBaseName(f.basename);
            return fBase === baseName;
        });

        variants.sort((a, b) => {
            const aHasSuffix = this.hasSuffix(a.basename);
            const bHasSuffix = this.hasSuffix(b.basename);
            if (!aHasSuffix && bHasSuffix) return -1;
            if (aHasSuffix && !bHasSuffix) return 1;
            
            if (this.settings.versioningStyle === 'human') {
                const matchA = a.basename.match(/_Version_(\d+)$/);
                const matchB = b.basename.match(/_Version_(\d+)$/);
                if (matchA && matchB) {
                    return parseInt(matchA[1]) - parseInt(matchB[1]);
                }
            }
            return a.basename.localeCompare(b.basename);
        });

        return variants;
    }

    async cleanDoubleTimestamps() {
        const files = this.app.vault.getFiles();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.extension === 'pdf') {
                const regex = this.settings.versioningStyle === 'human' ? /^(.*?)(_Version_\d+)+(_Version_\d+)$/ : /^(.*?)(_\d{6}_\d{6})+(_\d{6}_\d{6})$/;
                const match = file.basename.match(regex);
                if (match) {
                    const baseName = match[1];
                    const lastSuffix = match[3];
                    const newBasename = baseName + lastSuffix;
                    
                    const parentPath = file.path.substring(0, file.path.length - file.name.length);
                    const newPath = parentPath + newBasename + '.pdf';
                    const normalizedPath = normalizePath(newPath);

                    if (this.app.vault.getAbstractFileByPath(normalizedPath)) {
                        console.log(`PDF versioning: Skipping rename, target already exists: ${normalizedPath}`);
                        continue;
                    }

                    console.log(`PDF versioning: Cleaning double-timestamp from ${file.path} to ${normalizedPath}`);
                    try {
                        await this.app.fileManager.renameFile(file, normalizedPath);
                    } catch (err) {
                        console.error('PDF versioning: Failed to rename file ' + file.name, err);
                    }
                }
            }
        }
    }

    closePopup() {
        if (this.activePopup) {
            const doc = (this.activePopup as any)._ownerDoc || activeDocument;
            const handler = (this.activePopup as any)._clickOutsideHandler;
            if (handler) {
                doc.removeEventListener('click', handler, true);
            }
            this.activePopup.remove();
            this.activePopup = null;
        }
    }

    async showVariantsPopup(e: MouseEvent, pdfEmbed: HTMLElement | null, leaf: WorkspaceLeaf | null, currentFile: TFile) {
        await this.cleanDoubleTimestamps();

        const reResolvedFile = this.app.vault.getAbstractFileByPath(currentFile.path);
        if (!(reResolvedFile instanceof TFile)) {
            new Notice(this.t('pdfNotFound'));
            return;
        }
        currentFile = reResolvedFile;

        const variants = this.getVariants(currentFile);
        if (variants.length === 0) {
            new Notice(this.t('noVariantFound'));
            return;
        }

        this.closePopup();

        const doc = activeDocument;
        const popup = doc.createElement('div');
        popup.classList.add('pdf-versioning-popup');

        const originalBaseName = currentFile.name.replace(/_\d{6}_\d{6}\.pdf$/, '.pdf');
        const header = doc.createElement('div');
        header.classList.add('pdf-versioning-popup-header');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.gap = '8px';

        const titleSpan = doc.createElement('span');
        titleSpan.textContent = originalBaseName;
        titleSpan.style.overflow = 'hidden';
        titleSpan.style.textOverflow = 'ellipsis';
        titleSpan.style.whiteSpace = 'nowrap';
        header.appendChild(titleSpan);

        const refreshBtn = doc.createElement('div');
        refreshBtn.classList.add('clickable-icon');
        refreshBtn.setAttribute('aria-label', 'Ricarica e scansiona cartella');
        refreshBtn.style.display = 'inline-flex';
        refreshBtn.style.alignItems = 'center';
        refreshBtn.style.justifyContent = 'center';
        setIcon(refreshBtn, 'sync');

        refreshBtn.addEventListener('click', async (evt) => {
            evt.stopPropagation();
            new Notice(this.t('scanningFolder'));
            
            try {
                const parentPath = currentFile.parent ? currentFile.parent.path : '';
                await this.app.vault.adapter.list(parentPath);
            } catch (err) {
                console.error('Failed to list folder', err);
            }

            await this.cleanDoubleTimestamps();
            await new Promise(resolve => setTimeout(resolve, 500));
            this.showVariantsPopup(e, pdfEmbed, leaf, currentFile);
        });

        header.appendChild(refreshBtn);
        popup.appendChild(header);

        variants.forEach((variant) => {
            const isCurrent = variant.path === currentFile.path;
            const item = doc.createElement('div');
            item.classList.add('pdf-versioning-popup-item');
            if (isCurrent) {
                item.classList.add('active');
            }

            const titleContainer = doc.createElement('div');
            titleContainer.classList.add('pdf-versioning-popup-item-title');
            if (isCurrent) {
                titleContainer.classList.add('active');
            }

            if (isCurrent) {
                const checkIcon = doc.createElement('span');
                checkIcon.style.display = 'inline-flex';
                checkIcon.style.alignItems = 'center';
                setIcon(checkIcon, 'check');
                titleContainer.appendChild(checkIcon);
            } else {
                const spacer = doc.createElement('span');
                spacer.style.width = '16px';
                spacer.style.display = 'inline-block';
                titleContainer.appendChild(spacer);
            }

            let label = '';
            label = this.formatVariantLabel(variant);

            const textNode = doc.createElement('span');
            textNode.textContent = label;
            titleContainer.appendChild(textNode);
            item.appendChild(titleContainer);

            titleContainer.addEventListener('click', async (evt) => {
                evt.stopPropagation();
                if (isCurrent) return;
                this.closePopup();

                if (pdfEmbed) {
                    await this.switchEmbedToVariant(pdfEmbed, currentFile, variant);
                } else if (leaf) {
                    await leaf.openFile(variant);
                    this.scanForPdfs();
                }
            });

            const deleteBtn = doc.createElement('div');
            deleteBtn.classList.add('pdf-versioning-popup-item-delete', 'clickable-icon');
            deleteBtn.setAttribute('aria-label', 'Elimina versione');
            setIcon(deleteBtn, 'trash');

            deleteBtn.addEventListener('click', async (evt) => {
                evt.stopPropagation();
                this.closePopup();
                await this.promptDeleteFile(variant, label);
            });

            item.appendChild(deleteBtn);
            popup.appendChild(item);
        });

        doc.body.appendChild(popup);
        this.activePopup = popup;

        const clickOutsideHandler = (evt: MouseEvent) => {
            if (popup && !popup.contains(evt.target as Node)) {
                this.closePopup();
            }
        };

        (popup as any)._clickOutsideHandler = clickOutsideHandler;
        (popup as any)._ownerDoc = doc;

        setTimeout(() => {
            if (this.activePopup === popup) {
                doc.addEventListener('click', clickOutsideHandler, true);
            }
        }, 0);

        const buttonRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        let left = buttonRect.right - popupRect.width;
        let top = buttonRect.bottom + window.scrollY + 4;

        if (left < 10) left = 10;
        if (top + popupRect.height > window.innerHeight) {
            top = buttonRect.top + window.scrollY - popupRect.height - 4;
        }

        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
    }

    getNewestRemainingVariant(deletedFile: TFile): TFile | null {
        const allVariants = this.getVariants(deletedFile);
        const remaining = allVariants.filter(f => f.path !== deletedFile.path);
        if (remaining.length === 0) return null;
        return remaining[remaining.length - 1];
    }

    async findAffectedNotes(fileToDelete: TFile): Promise<TFile[]> {
        const markdownFiles = this.app.vault.getMarkdownFiles();
        const affected: TFile[] = [];
        
        const escName = fileToDelete.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const escPath = fileToDelete.path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(!)?\\[\\[(${escName}|${escPath})(#.*?)?(\\|.*?)?\\]\\]`, 'g');
        
        for (const mdFile of markdownFiles) {
            const content = await this.app.vault.read(mdFile);
            if (regex.test(content)) {
                affected.push(mdFile);
            }
        }
        return affected;
    }

    async promptDeleteFile(fileToDelete: TFile, label: string, onDeleted?: () => void) {
        const affectedNotes = await this.findAffectedNotes(fileToDelete);
        const otherVariants = this.getVariants(fileToDelete).filter(v => v.path !== fileToDelete.path);

        if (affectedNotes.length > 0) {
            new DeleteConflictModal(
                this.app,
                fileToDelete,
                affectedNotes,
                otherVariants,
                this,
                async (action, replacementFile) => {
                    if (action === 'delete_everywhere') {
                        for (const mdFile of affectedNotes) {
                            let content = await this.app.vault.read(mdFile);
                            const escName = fileToDelete.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                            const escPath = fileToDelete.path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                            const regex = new RegExp(`(!)?\\[\\[(${escName}|${escPath})(#.*?)?(\\|.*?)?\\]\\]`, 'g');
                            
                            content = content.replace(regex, '');
                            await this.app.vault.modify(mdFile, content);
                        }
                        new Notice(this.t('removedLinkCount', fileToDelete.name, affectedNotes.length.toString()));
                    } else if (action === 'replace' && replacementFile) {
                        for (const mdFile of affectedNotes) {
                            let content = await this.app.vault.read(mdFile);
                            const escName = fileToDelete.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                            const escPath = fileToDelete.path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                            const regex = new RegExp(`(!)?\\[\\[(${escName}|${escPath})(#.*?)?(\\|.*?)?\\]\\]`, 'g');
                            
                            const newLink = `$1[[${replacementFile.path}$3$4]]`;
                            content = content.replace(regex, newLink);
                            await this.app.vault.modify(mdFile, content);
                        }
                        new Notice(this.t('updatedLinksCount', replacementFile.name, affectedNotes.length.toString()));

                        const pdfLeaves = this.app.workspace.getLeavesOfType('pdf');
                        for (const leaf of pdfLeaves) {
                            const leafFile = (leaf.view as any).file;
                            if (leafFile && leafFile.path === fileToDelete.path) {
                                await leaf.openFile(replacementFile);
                            }
                        }
                    }

                    await this.executeActualDeletion(fileToDelete);
                    if (onDeleted) onDeleted();
                }
            ).open();
        } else {
            new ConfirmationModal(this.app, this.t('confirmDeleteVersion', label), async () => {
                await this.executeActualDeletion(fileToDelete);
                if (onDeleted) onDeleted();
            }, this.t('deleteBtn'), 'mod-warning', this.t('cancelBtn')).open();
        }
    }

    async safeDeleteFileBulk(fileToDelete: TFile, replacementFile: TFile) {
        const affectedNotes = await this.findAffectedNotes(fileToDelete);
        if (affectedNotes.length > 0) {
            for (const mdFile of affectedNotes) {
                let content = await this.app.vault.read(mdFile);
                const escName = fileToDelete.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const escPath = fileToDelete.path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(`(!)?\\[\\[(${escName}|${escPath})(#.*?)?(\\|.*?)?\\]\\]`, 'g');
                
                const newLink = `$1[[${replacementFile.path}$3$4]]`;
                content = content.replace(regex, newLink);
                await this.app.vault.modify(mdFile, content);
            }
            new Notice(this.t('updatedLinksCount', replacementFile.name, affectedNotes.length.toString()));

            const pdfLeaves = this.app.workspace.getLeavesOfType('pdf');
            for (const leaf of pdfLeaves) {
                const leafFile = (leaf.view as any).file;
                if (leafFile && leafFile.path === fileToDelete.path) {
                    await leaf.openFile(replacementFile);
                }
            }
        }
        await this.executeActualDeletion(fileToDelete);
    }

    async executeActualDeletion(fileToDelete: TFile) {
        try {
            await this.app.vault.trash(fileToDelete, false);
            new Notice(this.t('fileTrashedVault', fileToDelete.name));
        } catch (err) {
            console.error('PDF versioning: Failed to trash file locally, trying system trash', err);
            try {
                await this.app.vault.trash(fileToDelete, true);
                new Notice(this.t('fileTrashedSystem', fileToDelete.name));
            } catch (systemErr) {
                console.error('PDF versioning: Failed system trash, trying hard delete', systemErr);
                try {
                    await this.app.vault.delete(fileToDelete);
                    new Notice(this.t('fileDeletedPerm', fileToDelete.name));
                } catch (deleteErr) {
                    console.error('PDF versioning: Failed to delete file', deleteErr);
                    new Notice(this.t('errorDeletingFile', deleteErr.message));
                    return;
                }
            }
        }

        setTimeout(() => {
            this.scanForPdfs();
        }, 500);

        if (this.settingTab) {
            this.settingTab.display();
        }
    }

    async generateTutorialFile() {
        const tutorialFolder = 'PDF versioning guide';
        const attachmentsFolder = `${tutorialFolder}/Attachments`;
        const tutorialPath = `${tutorialFolder}/PDF versioning guide.md`;
        
        const assets = [
            'Screenshot_20260624_120614_Samsung Notes.jpg',
            'Screenshot_20260624_120650_Samsung Notes.jpg',
            'Screenshot_20260624_120752_Samsung Notes.jpg',
            'Screenshot_20260624_120849_Samsung Notes.jpg',
            'Screenshot_20260624_120910_Samsung Notes.jpg',
            'Screenshot_20260624_120958_Samsung Notes 1.jpg',
            'Screenshot_20260624_120958_Samsung Notes.jpg',
            'Screenshot_20260624_122947_Obsidian.jpg',
            'Screenshot_20260624_123103_IntentResolver.jpg',
            'Screenshot_20260624_123156_Samsung Notes.jpg',
            'Screenshot_20260624_123226_Samsung Notes.jpg',
            'Screenshot_20260624_123304_Samsung Notes.jpg',
            'Screenshot_20260624_123351_Obsidian.jpg',
            'Screenshot_20260624_123420_Obsidian.jpg',
            'Screenshot_20260624_123436_Obsidian.jpg'
        ];

        const adapter = this.app.vault.adapter;
        try {
            if (!(await adapter.exists(tutorialFolder))) {
                await adapter.mkdir(tutorialFolder);
            }
            if (!(await adapter.exists(attachmentsFolder))) {
                await adapter.mkdir(attachmentsFolder);
            }
        } catch (e) {
            console.error('Failed to create folders', e);
        }

        const pluginPath = '.obsidian/plugins/pdf-versioning';
        for (const assetName of assets) {
            const srcPath = `${pluginPath}/assets/${assetName}`;
            const destPath = `${attachmentsFolder}/${assetName}`;
            try {
                if (await adapter.exists(srcPath)) {
                    const data = await adapter.readBinary(srcPath);
                    await adapter.writeBinary(destPath, data);
                }
            } catch (err) {
                console.error(`Failed to copy asset ${assetName}`, err);
            }
        }

        const content = this.t('tutorialMarkdown');

        try {
            let file = this.app.vault.getAbstractFileByPath(tutorialPath);
            if (file instanceof TFile) {
                await this.app.vault.modify(file, content);
            } else {
                file = await this.app.vault.create(tutorialPath, content);
            }

            if (file instanceof TFile) {
                const leaf = this.app.workspace.getLeaf(false);
                if (leaf) {
                    await leaf.openFile(file);
                }
            }

            new TutorialCreatedModal(this.app, this).open();
        } catch (err) {
            console.error('Failed to create tutorial file', err);
            new Notice(this.t('errorCreatingTutorial', err.message));
        }
    }

    async switchEmbedToVariant(pdfEmbed: HTMLElement, oldFile: TFile, newFile: TFile) {
        const sourcePath = pdfEmbed.dataset.pdfVersioningSourcePath;
        if (!sourcePath) {
            new Notice(this.t('errorSourceNotFound'));
            return;
        }

        const noteFile = this.app.vault.getAbstractFileByPath(sourcePath);
        if (!(noteFile instanceof TFile)) {
            new Notice(this.t('errorNoteFileNotFound'));
            return;
        }

        let content = await this.app.vault.read(noteFile);

        const escName = oldFile.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const escPath = oldFile.path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(!)?\\[\\[(${escName}|${escPath})(#.*?)?(\\|.*?)?\\]\\]`, 'g');
        const newLink = `$1[[${newFile.path}$3$4]]`;
        
        if (regex.test(content)) {
            content = content.replace(regex, newLink);
            await this.app.vault.modify(noteFile, content);
            new Notice(this.t('linkUpdatedTo', newFile.name));
        } else {
            new Notice(this.t('linkNotFoundInText'));
        }
    }

    getGroupedVariants(): Map<string, { baseFile: TFile | null, variants: TFile[] }> {
        const pdfFiles = this.app.vault.getFiles().filter(f => f.extension === 'pdf');
        const groups = new Map<string, { baseFile: TFile | null, variants: TFile[] }>();
        
        for (const file of pdfFiles) {
            const baseName = this.getBaseName(file.basename);
            
            if (!groups.has(baseName)) {
                groups.set(baseName, { baseFile: null, variants: [] });
            }
            
            const group = groups.get(baseName)!;
            if (!this.hasSuffix(file.basename)) {
                group.baseFile = file;
            }
            group.variants.push(file);
        }
        
        const multiGroups = new Map<string, { baseFile: TFile | null, variants: TFile[] }>();
        for (const [key, group] of groups.entries()) {
            if (group.variants.length > 1) {
                group.variants.sort((a, b) => {
                    const aHasSuffix = this.hasSuffix(a.basename);
                    const bHasSuffix = this.hasSuffix(b.basename);
                    if (!aHasSuffix && bHasSuffix) return -1;
                    if (aHasSuffix && !bHasSuffix) return 1;
                    return a.basename.localeCompare(b.basename);
                });
                multiGroups.set(key, group);
            }
        }
        
        return multiGroups;
    }

    async onunload() {
        console.log('Unloading PDF versioning Plugin');
        
        this.closePopup();

        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        const buttons = document.querySelectorAll('.pdf-versioning-toolbar-button');
        buttons.forEach((btn) => btn.remove());

        const toolbars = document.querySelectorAll('.pdf-toolbar');
        toolbars.forEach((tb) => tb.removeAttribute('data-pdf-versioning-file-path'));
    }
}

class PDFVersioningSettingTab extends PluginSettingTab {
    plugin: PDFVersioningPlugin;
    groupedVariants: Map<string, { baseFile: TFile | null, variants: TFile[] }> = new Map();
    isScanning: boolean = false;

    constructor(app: App, plugin: PDFVersioningPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: this.plugin.t('settingsTitle') });

        new Setting(containerEl)
            .setName(this.plugin.t('settingLangName'))
            .setDesc(this.plugin.t('settingLangDesc'))
            .addDropdown(dropdown => dropdown
                .addOption('zh', 'Cinese')
                .addOption('fr', 'Francese')
                .addOption('ja', 'Giapponese')
                .addOption('en', 'Inglese')
                .addOption('it', 'Italiano')
                .addOption('pl', 'Polacco')
                .addOption('pt', 'Portoghese')
                .addOption('ru', 'Russo')
                .addOption('es', 'Spagnolo')
                .addOption('de', 'Tedesco')
                .setValue(this.plugin.settings.language)
                .onChange(async (value) => {
                    this.plugin.settings.language = value;
                    await this.plugin.saveSettings();
                    this.display(); // Refresh tab to show updated language
                }));

        new Setting(containerEl)
            .setName(this.plugin.t('settingVersioningStyleName'))
            .setDesc(this.plugin.t('settingVersioningStyleDesc'))
            .addDropdown(dropdown => dropdown
                .addOption('human', this.plugin.t('versioningStyleHuman'))
                .addOption('samsung', this.plugin.t('versioningStyleSamsung'))
                .setValue(this.plugin.settings.versioningStyle)
                .onChange(async (value: 'human' | 'samsung') => {
                    this.plugin.settings.versioningStyle = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(this.plugin.t('settingTutorialName'))
            .setDesc(this.plugin.t('settingTutorialDesc'))
            .addButton((btn) => {
                btn.setButtonText(this.plugin.t('settingTutorialBtn'))
                   .setCta()
                   .onClick(async () => {
                       await this.plugin.generateTutorialFile();
                   });
            });

        // Section: Gestione delle note
        containerEl.createEl('h3', { text: this.plugin.t('settingNoteMgmt') });

        // Setting: Controllo duplicati
        const controlSetting = new Setting(containerEl)
            .setName(this.plugin.t('settingDupName'))
            .setDesc(this.plugin.t('settingDupDesc'));

        controlSetting.addButton((btn) => {
            btn.setButtonText(this.isScanning ? this.plugin.t('scanningStatus') : this.plugin.t('scanMemory'))
               .setCta()
               .setDisabled(this.isScanning)
               .onClick(async () => {
                   this.isScanning = true;
                   this.display();

                   try {
                       await this.plugin.cleanDoubleTimestamps();
                       this.groupedVariants = this.plugin.getGroupedVariants();
                       new Notice(this.plugin.t('scanCompleted'));
                   } catch (err) {
                       new Notice(this.plugin.t('scanError') + err.message);
                   }

                   this.isScanning = false;
                   this.display();
               });
        });

        if (this.isScanning) {
            containerEl.createEl('p', { text: this.plugin.t('vaultScanning'), cls: 'setting-item-description' });
            return;
        }

        if (this.groupedVariants.size === 0) {
            this.groupedVariants = this.plugin.getGroupedVariants();
        }

        if (this.groupedVariants.size === 0) {
            containerEl.createEl('p', { text: this.plugin.t('noMultiPdfFound'), cls: 'setting-item-description' });
            return;
        }

        this.groupedVariants.forEach((group, key) => {
            const detailsEl = containerEl.createDiv({ cls: 'pdf-versioning-settings-group' });
            detailsEl.style.border = '1px solid var(--background-modifier-border)';
            detailsEl.style.borderRadius = '8px';
            detailsEl.style.margin = '12px 0';
            detailsEl.style.padding = '12px';
            detailsEl.style.backgroundColor = 'var(--background-secondary)';

            const summaryEl = detailsEl.createDiv({ cls: 'pdf-versioning-settings-summary' });
            summaryEl.style.display = 'flex';
            summaryEl.style.justifyContent = 'space-between';
            summaryEl.style.alignItems = 'center';
            summaryEl.style.cursor = 'pointer';
            summaryEl.style.fontWeight = 'bold';
            summaryEl.style.fontSize = '1.1em';
            summaryEl.style.gap = '8px';

            // Custom chevron span
            const chevronSpan = summaryEl.createEl('span', { cls: 'pdf-versioning-settings-chevron' });
            chevronSpan.style.display = 'inline-flex';
            chevronSpan.style.alignItems = 'center';
            chevronSpan.style.justifyContent = 'center';
            chevronSpan.style.transition = 'transform 0.2s ease';
            setIcon(chevronSpan, 'right-triangle');

            const titleSpan = summaryEl.createEl('span', { text: key + '.pdf' });
            titleSpan.style.flexGrow = '1';

            const keepNewestBtn = summaryEl.createEl('button', { text: this.plugin.t('keepNewestOnly'), cls: 'mod-cta' });
            keepNewestBtn.style.padding = '4px 8px';
            keepNewestBtn.style.fontSize = '0.8em';
            keepNewestBtn.style.marginLeft = '12px';
            
            keepNewestBtn.addEventListener('click', (evt) => {
                evt.stopPropagation();
                const newest = group.variants[group.variants.length - 1];
                let label = '';
                label = this.plugin.formatVariantLabel(newest);

                new ConfirmationModal(this.app, this.plugin.t('confirmKeepNewest', label), async () => {
                    const toDelete = group.variants.filter(v => v.path !== newest.path);
                    for (const f of toDelete) {
                        await this.plugin.safeDeleteFileBulk(f, newest);
                    }
                    this.groupedVariants = this.plugin.getGroupedVariants();
                    this.display();
                }, this.plugin.t('deleteBtn'), 'mod-warning', this.plugin.t('cancelBtn')).open();
            });

            // Assemble header items in summary
            summaryEl.appendChild(chevronSpan);
            summaryEl.appendChild(titleSpan);
            summaryEl.appendChild(keepNewestBtn);

            const listContainer = detailsEl.createDiv();
            listContainer.style.display = 'none'; // starts collapsed
            listContainer.style.marginTop = '12px';
            listContainer.style.borderTop = '1px solid var(--background-modifier-border)';
            listContainer.style.paddingTop = '8px';

            summaryEl.addEventListener('click', () => {
                const isCollapsed = listContainer.style.display === 'none';
                listContainer.style.display = isCollapsed ? 'block' : 'none';
                chevronSpan.style.transform = isCollapsed ? 'rotate(90deg)' : 'rotate(0deg)';
            });


            group.variants.forEach((variant) => {
                const itemEl = listContainer.createDiv();
                itemEl.style.display = 'flex';
                itemEl.style.justifyContent = 'space-between';
                itemEl.style.alignItems = 'center';
                itemEl.style.padding = '6px 0';
                itemEl.style.borderBottom = '1px dashed var(--background-modifier-border-hover)';

                let label = '';
                label = this.plugin.formatVariantLabel(variant);

                const parent = variant.parent;
                const folderName = parent && parent.name && parent.path && parent.path !== '/' ? `[${parent.name}] ` : '';
                const labelText = `${folderName}${label}`;

                const labelSpan = itemEl.createEl('span', { text: labelText });
                labelSpan.style.fontSize = '0.95em';

                const btnContainer = itemEl.createDiv();
                btnContainer.style.display = 'flex';
                btnContainer.style.gap = '6px';

                // Preview button
                const previewBtn = btnContainer.createEl('button', { text: this.plugin.t('previewBtn') });
                previewBtn.style.padding = '4px 8px';
                previewBtn.style.fontSize = '0.85em';
                previewBtn.addEventListener('click', () => {
                    new PDFPreviewModal(this.app, variant, this.plugin).open();
                });

                // Keep button (Tieni solo questa nota e cancella le altre)
                const keepBtn = btnContainer.createEl('button', { text: this.plugin.t('keepOnlyThis'), cls: 'mod-cta' });
                keepBtn.style.padding = '4px 8px';
                keepBtn.style.fontSize = '0.85em';
                keepBtn.addEventListener('click', () => {
                    new ConfirmationModal(this.app, this.plugin.t('confirmKeepThis', label), async () => {
                        const toDelete = group.variants.filter(v => v.path !== variant.path);
                        for (const f of toDelete) {
                            await this.plugin.safeDeleteFileBulk(f, variant);
                        }
                        this.groupedVariants = this.plugin.getGroupedVariants();
                        this.display();
                    }, this.plugin.t('deleteBtn'), 'mod-warning', this.plugin.t('cancelBtn')).open();
                });

                // Delete button
                const deleteBtn = btnContainer.createEl('button', { text: this.plugin.t('deleteBtn'), cls: 'mod-warning' });
                deleteBtn.style.padding = '4px 8px';
                deleteBtn.style.fontSize = '0.85em';
                deleteBtn.addEventListener('click', async () => {
                    await this.plugin.promptDeleteFile(variant, label, () => {
                        this.groupedVariants = this.plugin.getGroupedVariants();
                        this.display();
                    });
                });
            });
        });
    }
}

class PDFPreviewModal extends Modal {
    file: TFile;
    component: Component;
    plugin: PDFVersioningPlugin;

    constructor(app: App, file: TFile, plugin: PDFVersioningPlugin) {
        super(app);
        this.file = file;
        this.plugin = plugin;
        this.component = new Component();
    }

    async onOpen() {
        const { contentEl, titleEl } = this;
        contentEl.empty();
        titleEl.setText(this.plugin.t('previewTitle', this.file.name));

        this.modalEl.style.width = '85vw';
        this.modalEl.style.height = '85vh';
        this.modalEl.style.maxWidth = '1000px';

        contentEl.style.height = 'calc(100% - 40px)';
        contentEl.style.padding = '12px';
        contentEl.style.display = 'flex';
        contentEl.style.flexDirection = 'column';

        const previewContainer = contentEl.createDiv();
        previewContainer.style.flexGrow = '1';
        previewContainer.style.width = '100%';
        previewContainer.style.height = '100%';
        previewContainer.style.overflow = 'auto';

        this.component.load();

        const markdown = `![[${this.file.path}]]`;
        await MarkdownRenderer.render(this.app, markdown, previewContainer, '', this.component);

        const embed = previewContainer.querySelector('.internal-embed');
        if (embed instanceof HTMLElement) {
            embed.style.width = '100%';
            embed.style.height = '100%';
            embed.style.display = 'block';
        }
    }

    onClose() {
        this.component.unload();
        const { contentEl } = this;
        contentEl.empty();
    }
}

class ConfirmationModal extends Modal {
    message: string;
    onConfirm: () => void;
    confirmLabel: string;
    confirmClass: string;
    appInstance: App; // renaming app local var if needed, but it's inherited as this.app
    cancelLabel: string;

    constructor(app: App, message: string, onConfirm: () => void, confirmLabel: string = 'Elimina', confirmClass: string = 'mod-warning', cancelLabel: string = 'Annulla') {
        super(app);
        this.message = message;
        this.onConfirm = onConfirm;
        this.confirmLabel = confirmLabel;
        this.confirmClass = confirmClass;
        this.cancelLabel = cancelLabel;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        
        contentEl.createEl('h3', { text: this.confirmLabel === 'Procedi' ? 'Attenzione' : 'Richiesta di conferma' });
        contentEl.createEl('p', { text: this.message });

        const btnContainer = contentEl.createDiv();
        btnContainer.style.display = 'flex';
        btnContainer.style.justifyContent = 'flex-end';
        btnContainer.style.gap = '10px';
        btnContainer.style.marginTop = '20px';

        const cancelBtn = btnContainer.createEl('button', { text: this.cancelLabel });
        cancelBtn.addEventListener('click', () => {
            this.close();
        });

        const confirmBtn = btnContainer.createEl('button', { text: this.confirmLabel, cls: this.confirmClass });
        confirmBtn.addEventListener('click', () => {
            this.onConfirm();
            this.close();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

class DeleteConflictModal extends Modal {
    fileToDelete: TFile;
    affectedNotes: TFile[];
    otherVariants: TFile[];
    plugin: PDFVersioningPlugin;
    onChoice: (action: 'delete_everywhere' | 'replace', replacementFile?: TFile) => void;

    constructor(
        app: App, 
        fileToDelete: TFile, 
        affectedNotes: TFile[], 
        otherVariants: TFile[], 
        plugin: PDFVersioningPlugin,
        onChoice: (action: 'delete_everywhere' | 'replace', replacementFile?: TFile) => void
    ) {
        super(app);
        this.fileToDelete = fileToDelete;
        this.affectedNotes = affectedNotes;
        this.otherVariants = otherVariants;
        this.plugin = plugin;
        this.onChoice = onChoice;
    }

    onOpen() {
        const { contentEl, titleEl } = this;
        contentEl.empty();
        titleEl.setText(this.plugin.t('deleteConflictTitle'));

        contentEl.createEl('p', {
            text: this.plugin.t('noteViewedInFiles'),
            cls: 'setting-item-description'
        });

        const notesList = contentEl.createEl('ul');
        this.affectedNotes.forEach(note => {
            notesList.createEl('li', { text: note.path });
        });

        contentEl.createEl('h4', { text: this.plugin.t('whatToDo') });

        const optionsContainer = contentEl.createDiv();
        optionsContainer.style.display = 'flex';
        optionsContainer.style.flexDirection = 'column';
        optionsContainer.style.gap = '12px';
        optionsContainer.style.marginTop = '16px';

        const deleteEverywhereBtn = optionsContainer.createEl('button', {
            text: this.plugin.t('deleteEverywhere'),
            cls: 'mod-warning'
        });
        deleteEverywhereBtn.style.textAlign = 'left';
        deleteEverywhereBtn.addEventListener('click', () => {
            this.onChoice('delete_everywhere');
            this.close();
        });

        if (this.otherVariants.length > 0) {
            const replaceHeader = optionsContainer.createEl('div');
            replaceHeader.createEl('p', { 
                text: this.plugin.t('replaceWithVersion'),
                style: 'font-weight: bold; margin-bottom: 6px;'
            });

            const replaceBtnsContainer = optionsContainer.createDiv();
            replaceBtnsContainer.style.display = 'flex';
            replaceBtnsContainer.style.flexDirection = 'column';
            replaceBtnsContainer.style.gap = '6px';
            replaceBtnsContainer.style.paddingLeft = '12px';

            this.otherVariants.forEach(variant => {
                let label = '';
                label = this.plugin.formatVariantLabel(variant);
                
                const parent = variant.parent;
                const folderName = parent && parent.name && parent.path && parent.path !== '/' ? `[${parent.name}] ` : '';
                const btnText = `${folderName}${label} (${variant.name})`;

                const replaceBtn = replaceBtnsContainer.createEl('button', {
                    text: btnText,
                    cls: 'mod-cta'
                });
                replaceBtn.style.textAlign = 'left';
                replaceBtn.addEventListener('click', () => {
                    this.onChoice('replace', variant);
                    this.close();
                });
            });
        }

        const footer = contentEl.createDiv();
        footer.style.display = 'flex';
        footer.style.justifyContent = 'flex-end';
        footer.style.marginTop = '24px';
        const cancelBtn = footer.createEl('button', { text: this.plugin.t('cancelBtn') });
        cancelBtn.addEventListener('click', () => {
            this.close();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

class TutorialCreatedModal extends Modal {
    plugin: PDFVersioningPlugin;
    constructor(app: App, plugin: PDFVersioningPlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl, titleEl } = this;
        contentEl.empty();
        titleEl.setText(this.plugin.t('tutorialCreatedTitle'));

        contentEl.createEl('p', {
            text: this.plugin.t('tutorialCreatedDesc'),
            style: 'margin-bottom: 20px;'
        });

        const footer = contentEl.createDiv();
        footer.style.display = 'flex';
        footer.style.justifyContent = 'flex-end';
        
        const closeBtn = footer.createEl('button', { text: this.plugin.t('okBtn'), cls: 'mod-cta' });
        closeBtn.addEventListener('click', () => {
            this.close();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
