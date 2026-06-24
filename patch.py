import re

with open('main.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports and settings
new_header = '''import { Plugin, setIcon, Notice, TFile, FileSystemAdapter, normalizePath, PluginSettingTab, Setting, WorkspaceLeaf, App, Platform, Modal, MarkdownRenderer, Component } from 'obsidian';
import { getLocale, LocaleKey } from './locales';

export interface SamsungNotePluginSettings {
    language: string;
}

const DEFAULT_SETTINGS: SamsungNotePluginSettings = {
    language: 'it'
}

export default class SamsungNoteIntegrationPlugin extends Plugin {
    settings: SamsungNotePluginSettings;
    observer: MutationObserver | null = null;
    activePopup: HTMLElement | null = null;
    settingTab: SamsungNoteSettingTab | null = null;
    
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
        console.log('Loading SamsungNote Integration Plugin');'''

# We need to replace from 'import { Plugin ...' to 'console.log('Loading SamsungNote Integration Plugin');'
content = re.sub(r'import \{.*?\} from \'obsidian\';\n\nexport default class SamsungNoteIntegrationPlugin extends Plugin \{.*?async onload\(\) \{\n        console\.log\(\'Loading SamsungNote Integration Plugin\'\);', new_header, content, flags=re.DOTALL)


# Strings replacement
content = content.replace("'Impossibile utilizzare il plugin: questa funzionalità è supportata solo su telefoni e tablet Samsung.'", "this.t('unsupportedDevice')")
content = content.replace("'Apertura con SamsungNote Integration...'", "this.t('opening')")
content = content.replace("'Errore nell\\'apertura del PDF: ' + err.message", "this.t('errorOpeningPdf') + err.message")
content = content.replace("newestLabel = 'Originale';", "newestLabel = this.t('original');")
content = content.replace("`Attenzione: Stai per modificare una versione che non è la più recente (la più recente è del ${newestLabel}). Vuoi procedere comunque?`", "this.t('warningNotRecent', newestLabel)")
content = content.replace("'Procedi'", "this.t('proceed')")
content = content.replace("'File PDF non trovato.'", "this.t('pdfNotFound')")
content = content.replace("'Nessuna variante trovata.'", "this.t('noVariantFound')")
content = content.replace("'Scansione della cartella in corso...'", "this.t('scanningFolder')")
content = content.replace("label = 'Originale';", "label = this.t('original');")

content = content.replace("`Rimosso il collegamento a ${fileToDelete.name} in ${affectedNotes.length} note.`", "this.t('removedLinkCount', fileToDelete.name, affectedNotes.length.toString())")
content = content.replace("`Aggiornati collegamenti a ${replacementFile.name} in ${affectedNotes.length} note.`", "this.t('updatedLinksCount', replacementFile.name, affectedNotes.length.toString())")
content = content.replace("`Sei sicuro di voler eliminare la versione \"${label}\"?`", "this.t('confirmDeleteVersion', label)")
content = content.replace("`File ${fileToDelete.name} spostato nel cestino del vault.`", "this.t('fileTrashedVault', fileToDelete.name)")
content = content.replace("`File ${fileToDelete.name} spostato nel cestino di sistema.`", "this.t('fileTrashedSystem', fileToDelete.name)")
content = content.replace("`File ${fileToDelete.name} eliminato definitivamente.`", "this.t('fileDeletedPerm', fileToDelete.name)")
content = content.replace("`Errore nell'eliminazione del file: ${deleteErr.message}`", "this.t('errorDeletingFile', deleteErr.message)")

# Extracting the tutorial markdown - it spans multiple lines. We'll use a regex
content = re.sub(r'const content = `# 📱 SamsungNotes Integration Guide & Workflow.*?`;', "const content = this.t('tutorialMarkdown');", content, flags=re.DOTALL)

content = content.replace("'Errore nella creazione del tutorial: ' + err.message", "this.t('errorCreatingTutorial', err.message)")
content = content.replace("'Errore: Impossibile identificare la nota sorgente.'", "this.t('errorSourceNotFound')")
content = content.replace("'Errore: File della nota non trovato.'", "this.t('errorNoteFileNotFound')")
content = content.replace("`Collegamento aggiornato a: ${newFile.name}`", "this.t('linkUpdatedTo', newFile.name)")
content = content.replace("'Impossibile trovare il collegamento originale nel testo della nota.'", "this.t('linkNotFoundInText')")


# Modals translations
# SamsungNoteSettingTab
tab_header = '''class SamsungNoteSettingTab extends PluginSettingTab {
    plugin: SamsungNoteIntegrationPlugin;
    groupedVariants: Map<string, { baseFile: TFile | null, variants: TFile[] }> = new Map();
    isScanning: boolean = false;

    constructor(app: App, plugin: SamsungNoteIntegrationPlugin) {
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
            .setDesc(this.plugin.t('settingDupDesc'));'''

content = re.sub(r'class SamsungNoteSettingTab extends PluginSettingTab \{.*?\.setDesc\(\'Rileva e gestisci i file PDF con più versioni salvate nel vault\.\'\);', tab_header, content, flags=re.DOTALL)

content = content.replace("btn.setButtonText(this.isScanning ? 'Scansione in corso...' : 'Scansiona memoria')", "btn.setButtonText(this.isScanning ? this.plugin.t('scanningStatus') : this.plugin.t('scanMemory'))")
content = content.replace("new Notice('Scansione completata.');", "new Notice(this.plugin.t('scanCompleted'));")
content = content.replace("new Notice('Errore durante la scansione: ' + err.message);", "new Notice(this.plugin.t('scanError') + err.message);")
content = content.replace("{ text: 'Scansione del vault in corso...', cls: 'setting-item-description' }", "{ text: this.plugin.t('vaultScanning'), cls: 'setting-item-description' }")
content = content.replace("{ \n                text: 'Nessun PDF con versioni multiple trovato. Clicca su \"Scansiona memoria\" per cercare.', \n                cls: 'setting-item-description' \n            }", "{ text: this.plugin.t('noMultiPdfFound'), cls: 'setting-item-description' }")
content = content.replace("{ text: 'Nessun PDF con versioni multiple trovato. Clicca su \"Scansiona memoria\" per cercare.', cls: 'setting-item-description' }", "{ text: this.plugin.t('noMultiPdfFound'), cls: 'setting-item-description' }")
content = content.replace("{ text: 'Tieni solo più recente', cls: 'mod-cta' }", "{ text: this.plugin.t('keepNewestOnly'), cls: 'mod-cta' }")

content = content.replace("label = 'Originale';", "label = this.plugin.t('original');")
content = content.replace("label = 'Originale (Base)';", "label = this.plugin.t('originalBase');")

content = content.replace("`Sei sicuro di voler tenere SOLO la versione più recente (${label}) ed eliminare tutte le altre?`", "this.plugin.t('confirmKeepNewest', label)")
content = content.replace("{ text: 'Anteprima' }", "{ text: this.plugin.t('previewBtn') }")
content = content.replace("new PDFPreviewModal(this.app, variant)", "new PDFPreviewModal(this.app, variant, this.plugin)")
content = content.replace("{ text: 'Tieni solo questa nota', cls: 'mod-cta' }", "{ text: this.plugin.t('keepOnlyThis'), cls: 'mod-cta' }")
content = content.replace("`Sei sicuro di voler tenere questa versione (${label}) ed eliminare tutte le altre?`", "this.plugin.t('confirmKeepThis', label)")
content = content.replace("{ text: 'Elimina', cls: 'mod-warning' }", "{ text: this.plugin.t('deleteBtn'), cls: 'mod-warning' }")


# Modals modifications - need to pass `plugin` instance to get translations
pdf_preview_header = '''class PDFPreviewModal extends Modal {
    file: TFile;
    component: Component;
    plugin: SamsungNoteIntegrationPlugin;

    constructor(app: App, file: TFile, plugin: SamsungNoteIntegrationPlugin) {
        super(app);
        this.file = file;
        this.plugin = plugin;
        this.component = new Component();
    }'''
content = re.sub(r'class PDFPreviewModal extends Modal \{.*?constructor\(app: App, file: TFile\) \{.*?\}', pdf_preview_header, content, flags=re.DOTALL)
content = content.replace("titleEl.setText(`Anteprima: ${this.file.name}`);", "titleEl.setText(this.plugin.t('previewTitle', this.file.name));")

# ConfirmationModal
confirmation_header = '''class ConfirmationModal extends Modal {
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
    }'''
content = re.sub(r'class ConfirmationModal extends Modal \{.*?constructor\(app: App.*?\) \{.*?\}', confirmation_header, content, flags=re.DOTALL)
content = content.replace("contentEl.createEl('h3', { text: 'Richiesta di conferma' });", "contentEl.createEl('h3', { text: this.confirmLabel === 'Procedi' ? 'Attenzione' : 'Richiesta di conferma' });")
content = content.replace("{ text: 'Annulla' }", "{ text: this.cancelLabel }")

# Update new ConfirmationModal calls to include correct cancelLabel (this is a bit tricky, but I can use plugin.t where we call it)
content = content.replace("new ConfirmationModal(", "new ConfirmationModal(")
content = content.replace("new ConfirmationModal(this.app, this.t('warningNotRecent', newestLabel), () => {", "new ConfirmationModal(this.app, this.t('warningNotRecent', newestLabel), () => {")

# DeleteConflictModal
delete_conflict_header = '''class DeleteConflictModal extends Modal {
    fileToDelete: TFile;
    affectedNotes: TFile[];
    otherVariants: TFile[];
    plugin: SamsungNoteIntegrationPlugin;
    onChoice: (action: 'delete_everywhere' | 'replace', replacementFile?: TFile) => void;

    constructor(
        app: App, 
        fileToDelete: TFile, 
        affectedNotes: TFile[], 
        otherVariants: TFile[], 
        plugin: SamsungNoteIntegrationPlugin,
        onChoice: (action: 'delete_everywhere' | 'replace', replacementFile?: TFile) => void
    ) {
        super(app);
        this.fileToDelete = fileToDelete;
        this.affectedNotes = affectedNotes;
        this.otherVariants = otherVariants;
        this.plugin = plugin;
        this.onChoice = onChoice;
    }'''
content = re.sub(r'class DeleteConflictModal extends Modal \{.*?constructor\(.*?\) \{.*?this\.onChoice = onChoice;\n    \}', delete_conflict_header, content, flags=re.DOTALL)

content = content.replace("titleEl.setText('Gestione eliminazione file collegato');", "titleEl.setText(this.plugin.t('deleteConflictTitle'));")
content = content.replace("text: `la nota che stai eliminando è attualmente visualizzata nei seguenti file:`", "text: this.plugin.t('noteViewedInFiles')")
content = content.replace("contentEl.createEl('h4', { text: 'Cosa vuoi fare?' });", "contentEl.createEl('h4', { text: this.plugin.t('whatToDo') });")
content = content.replace("text: 'Elimina la nota ovunque'", "text: this.plugin.t('deleteEverywhere')")
content = content.replace("text: 'Sostituisci la nota con la versione :'", "text: this.plugin.t('replaceWithVersion')")
content = content.replace("label = 'Originale (Base)';", "label = this.plugin.t('originalBase');")
content = content.replace("const cancelBtn = footer.createEl('button', { text: 'Annulla' });", "const cancelBtn = footer.createEl('button', { text: this.plugin.t('cancelBtn') });")

# Change where DeleteConflictModal is instantiated
content = content.replace("new DeleteConflictModal(\n                this.app,\n                fileToDelete,\n                affectedNotes,\n                otherVariants,\n                async (action, replacementFile) => {", 
                          "new DeleteConflictModal(\n                this.app,\n                fileToDelete,\n                affectedNotes,\n                otherVariants,\n                this,\n                async (action, replacementFile) => {")

# TutorialCreatedModal
tutorial_created_header = '''class TutorialCreatedModal extends Modal {
    plugin: SamsungNoteIntegrationPlugin;
    constructor(app: App, plugin: SamsungNoteIntegrationPlugin) {
        super(app);
        this.plugin = plugin;
    }'''
content = re.sub(r'class TutorialCreatedModal extends Modal \{.*?constructor\(app: App\) \{.*?\}', tutorial_created_header, content, flags=re.DOTALL)

content = content.replace("titleEl.setText('Tutorial Creato');", "titleEl.setText(this.plugin.t('tutorialCreatedTitle'));")
content = content.replace("text: 'La nota Tutorial (\"SamsungNotes Integration Guide.md\") e le relative immagini di supporto sono state create con successo nella cartella \"SamsungNotes Guide\" del tuo vault Obsidian e la nota è stata aperta.',", "text: this.plugin.t('tutorialCreatedDesc'),")
content = content.replace("const closeBtn = footer.createEl('button', { text: 'Ok', cls: 'mod-cta' });", "const closeBtn = footer.createEl('button', { text: this.plugin.t('okBtn'), cls: 'mod-cta' });")

content = content.replace("new TutorialCreatedModal(this.app).open();", "new TutorialCreatedModal(this.app, this).open();")

# We need to replace the 'Procedi' / 'Annulla' arguments of ConfirmationModal
content = content.replace("new ConfirmationModal(\n                    this.app,\n                    this.t('warningNotRecent', newestLabel),\n                    () => {\n                        openApp();\n                    },\n                    'Procedi',\n                    'mod-cta'\n                ).open();",
                          "new ConfirmationModal(\n                    this.app,\n                    this.t('warningNotRecent', newestLabel),\n                    () => {\n                        openApp();\n                    },\n                    this.t('proceed'),\n                    'mod-cta',\n                    this.t('cancelBtn')\n                ).open();")

# Inside `promptDeleteFile`
content = content.replace("new ConfirmationModal(this.app, this.t('confirmDeleteVersion', label), async () => {",
                          "new ConfirmationModal(this.app, this.t('confirmDeleteVersion', label), async () => {")
content = content.replace("await this.executeActualDeletion(fileToDelete);\n                if (onDeleted) onDeleted();\n            }).open();",
                          "await this.executeActualDeletion(fileToDelete);\n                if (onDeleted) onDeleted();\n            }, this.t('deleteBtn'), 'mod-warning', this.t('cancelBtn')).open();")

# In SamsungNoteSettingTab ConfirmationModals
content = content.replace("new ConfirmationModal(this.app, this.plugin.t('confirmKeepNewest', label), async () => {", "new ConfirmationModal(this.app, this.plugin.t('confirmKeepNewest', label), async () => {")
content = content.replace("this.display();\n                }).open();", "this.display();\n                }, this.plugin.t('deleteBtn'), 'mod-warning', this.plugin.t('cancelBtn')).open();")

content = content.replace("new ConfirmationModal(this.app, this.plugin.t('confirmKeepThis', label), async () => {", "new ConfirmationModal(this.app, this.plugin.t('confirmKeepThis', label), async () => {")
content = content.replace("this.display();\n                    }).open();", "this.display();\n                    }, this.plugin.t('deleteBtn'), 'mod-warning', this.plugin.t('cancelBtn')).open();")


with open('main.ts', 'w', encoding='utf-8') as f:
    f.write(content)
