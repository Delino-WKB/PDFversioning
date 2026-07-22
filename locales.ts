export type LocaleKey =
    | 'opening' | 'errorOpeningPdf' | 'warningNotRecent' | 'original' | 'originalBase' | 'proceed'
    | 'noVariantFound' | 'pdfNotFound' | 'scanningFolder' | 'deleteVersion' | 'removedLinkCount' | 'updatedLinksCount'
    | 'confirmDeleteVersion' | 'fileTrashedVault' | 'fileTrashedSystem' | 'fileDeletedPerm' | 'errorDeletingFile' | 'errorCreatingTutorial'
    | 'errorSourceNotFound' | 'errorNoteFileNotFound' | 'linkUpdatedTo' | 'linkNotFoundInText' | 'settingsTitle' | 'settingLangName'
    | 'settingLangDesc' | 'settingTutorialName' | 'settingTutorialDesc' | 'settingTutorialBtn' | 'settingNoteMgmt' | 'settingDupName'
    | 'settingDupDesc' | 'scanningStatus' | 'scanMemory' | 'scanCompleted' | 'scanError' | 'vaultScanning'
    | 'noMultiPdfFound' | 'keepNewestOnly' | 'confirmKeepNewest' | 'previewBtn' | 'keepOnlyThis' | 'confirmKeepThis'
    | 'deleteBtn' | 'previewTitle' | 'confirmTitle' | 'cancelBtn' | 'deleteConflictTitle' | 'noteViewedInFiles'
    | 'whatToDo' | 'deleteEverywhere' | 'replaceWithVersion' | 'tutorialCreatedTitle' | 'tutorialCreatedDesc' | 'okBtn'
    | 'unsupportedDevice' | 'tutorialMarkdown' | 'settingVersioningStyleName' | 'settingVersioningStyleDesc' | 'versioningStyleSamsung' | 'versioningStyleHuman' | 'settingSamsungTruncateName' | 'settingSamsungTruncateDesc';

export const locales: Record<string, Record<LocaleKey, string>> = {
    en: {
        opening: "Opening with PDF versioning...",
        errorOpeningPdf: "Error opening PDF: ",
        warningNotRecent: "You are about to edit a version that is not the most recent.",
        original: "Original",
        originalBase: "Original (Base)",
        proceed: "Proceed",
        noVariantFound: "No variant found.",
        pdfNotFound: "PDF file not found.",
        scanningFolder: "Scanning folder in progress...",
        deleteVersion: "Delete version",
        removedLinkCount: "Removed link to {0} in {1} notes.",
        updatedLinksCount: "Updated links to {0} in {1} notes.",
        confirmDeleteVersion: "Are you sure you want to delete version {0}?",
        fileTrashedVault: "File {0} moved to the vault trash.",
        fileTrashedSystem: "File {0} moved to the system trash.",
        fileDeletedPerm: "File {0} permanently deleted.",
        errorDeletingFile: "Error deleting file: {0}",
        errorCreatingTutorial: "Error creating tutorial: {0}",
        errorSourceNotFound: "Error: Cannot identify source note.",
        errorNoteFileNotFound: "Error: Note file not found.",
        linkUpdatedTo: "Link updated to: {0}",
        linkNotFoundInText: "Cannot find the original link in the note text.",
        settingsTitle: "PDF versioning Settings",
        settingLangName: "Language",
        settingLangDesc: "Choose the plugin language.",
        settingTutorialName: "Plugin Tutorial",
        settingTutorialDesc: "Generates a guide note in the vault's main folder with instructions on using the plugin and opens it automatically.",
        settingTutorialBtn: "Generate Tutorial",
        settingNoteMgmt: "Note Management",
        settingDupName: "Duplicate Check",
        settingDupDesc: "Detect and manage PDF files with multiple versions saved in the vault.",
        scanningStatus: "Scanning...",
        scanMemory: "Scan storage",
        scanCompleted: "Scan completed.",
        scanError: "Error during scan: ",
        vaultScanning: "Scanning vault...",
        noMultiPdfFound: "No PDF with multiple versions found. Click on 'Scan storage' to search.",
        keepNewestOnly: "Keep newest only",
        confirmKeepNewest: "Are you sure you want to keep ONLY the newest version ({0}) and delete all others?",
        previewBtn: "Preview",
        keepOnlyThis: "Keep only this note",
        confirmKeepThis: "Are you sure you want to keep this version ({0}) and delete all others?",
        deleteBtn: "Delete",
        previewTitle: "Preview: {0}",
        confirmTitle: "Confirmation Request",
        cancelBtn: "Cancel",
        deleteConflictTitle: "Linked File Deletion Management",
        noteViewedInFiles: "The note you are deleting is currently viewed in the following files:",
        whatToDo: "What do you want to do?",
        deleteEverywhere: "Delete note everywhere",
        replaceWithVersion: "Replace note with version:",
        tutorialCreatedTitle: "Tutorial Created",
        tutorialCreatedDesc: "The Tutorial note and its supporting images have been successfully created in the 'PDF versioning guide' folder of your Obsidian vault and the note has been opened.",
        okBtn: "Ok",
        unsupportedDevice: "Cannot use plugin: this feature is only supported on Samsung phones and tablets.",
        settingVersioningStyleName: "Versioning Style",
        settingVersioningStyleDesc: "Choose the naming convention used to identify different versions of a PDF. \n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Samsung Style (double timestamp)",
        versioningStyleHuman: "Human Style (_Version_X)",
        settingSamsungTruncateName: "Samsung Notes Long Filename Fix",
        settingSamsungTruncateDesc: "Compare only the first 50 characters of filenames (Samsung Notes truncates base filenames longer than 50 characters before appending the timestamp).",
        tutorialMarkdown: `# 📱 PDF versioning Guide & Workflow

This plugin enables a seamless connection between **Obsidian** and any external PDF editor. You can annotate your PDF notes and automatically manage the multiple versions (variants) created during your workflow.

---

## ❓ Why PDF versioning?

Unlike standard static PDFs inside Obsidian, using an external editor that supports exporting or saving editable PDFs (like Samsung Notes, Acrobat, Drawboard, etc.) preserves your vector ink strokes, meaning you can export a note to Obsidian and still resume editing your original handwriting later!

---

## 🚀 Workflow 1: Human Style (Universal)

Use this workflow for any generic PDF editor on your PC, Mac, or tablet.

### Step 1: Embed the PDF in Obsidian
Simply add the PDF to any of your markdown notes using the standard Obsidian embed syntax:
\`\`\`markdown
![[Your_PDF_Name.pdf]]
\`\`\`

### Step 2: Open and Edit the PDF
1. You will see two custom buttons added on top of your embedded PDF toolbar. Press the **Pencil icon** to edit the file.
2. The file will open in your default system PDF reader.
3. Save the file when done.
4. ⚠️ **CRITICAL STEP:** Save the file inside the Obsidian vault **using the selected versioning naming style**. For the "Human Style", save it as \`Your_PDF_Name_Version_1.pdf\`.

### Step 3: Switch and Manage Versions
Back in Obsidian, click the **Layers button** to view and switch between different versions, delete old duplicates, or sync the file list.

---

## 🚀 Workflow 2: Samsung Notes Style (Android)

This workflow is optimized specifically for Samsung Notes on Android devices, allowing you to use high-precision S-Pen input.

### Step 1: Export from Samsung Notes as Editable PDF
1. **Create your note** in Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. **Open the menu** by tapping the three dots in the top-right corner.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. Tap on **Save as file**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. Select **PDF file**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **CRITICAL STEP:** Choose **Notes-compatible PDF** (this allows you to edit your hand-drawn strokes later).
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **Save the file** inside your Obsidian vault folder.
   ⚠️ **CRITICAL STEP:** Do not change the note's name. It is fundamental for the plugin to identify versions and respect the Samsung Notes naming conventions.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### Step 2: Embed the PDF in Obsidian
Simply add the PDF to any of your markdown notes:
\`\`\`markdown
![[Your_PDF_Name.pdf]]
\`\`\`

### Step 3: Open and Edit the PDF
1. Press the **Pencil icon** to edit the file.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. Choose **Samsung Notes (PDF Reader)** from the Android system prompt if requested.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Tap the **Pencil button** inside Samsung Notes to start writing or editing your existing vector strokes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. Save the file when done.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **CRITICAL STEP:** Save the file inside the Obsidian vault **without changing the default name**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### Step 4: Switch and Manage Versions
Back in Obsidian, click the **Layers button** to view and switch between different versions.
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ Vault & Note Settings
Go to the plugin settings under **Note Management** to access bulk cleanup tools:

### 🔍 Duplicate Finder
Scans the entire vault for duplicate PDF versions.
* **Keep only most recent:** Bulk-deletes all older versions, automatically updating all embeds in your notes to link to the latest copy.
* **Preview:** Opens a mobile-compatible preview modal to visually inspect the PDF content.


---

### 📱 Samsung Notes Long Filename Integration Note
When exporting or editing a PDF in Samsung Notes, if the original filename exceeds 50 characters, Samsung Notes automatically truncates it to 50 characters before appending the timestamp (e.g. \`_260722_114213\`).
By enabling the **"Samsung Notes Long Filename Fix"** option in the plugin settings (visible when style is Samsung), PDF Versioning will compare the first 50 "safe" characters of filenames, ensuring that variants with long names are properly detected and grouped.`
    },
    it: {
        opening: "Apertura con PDF versioning...\n\n---\n\n### 📱 Samsung Notes Long Filename Integration Note\nWhen exporting or editing a PDF in Samsung Notes, if the original filename exceeds 50 characters, Samsung Notes automatically truncates it to 50 characters before appending the timestamp (e.g. `_260722_114213`).\nBy enabling the **\"Samsung Notes Long Filename Fix\"** option in the plugin settings (visible when style is Samsung), PDF Versioning will compare the first 50 \"safe\" characters of filenames, ensuring that variants with long names are properly detected and grouped.",
        errorOpeningPdf: "Errore nell'apertura del PDF: ",
        warningNotRecent: "Stai per modificare una versione che non è la più recente.",
        original: "Originale",
        originalBase: "Originale (Base)",
        proceed: "Procedi",
        noVariantFound: "Nessuna variante trovata.",
        pdfNotFound: "File PDF non trovato.",
        scanningFolder: "Scansione della cartella in corso...",
        deleteVersion: "Elimina versione",
        removedLinkCount: "Rimosso il collegamento a {0} in {1} note.",
        updatedLinksCount: "Aggiornati collegamenti a {0} in {1} note.",
        confirmDeleteVersion: "Sei sicuro di voler eliminare la versione {0}?",
        fileTrashedVault: "File {0} spostato nel cestino del vault.",
        fileTrashedSystem: "File {0} spostato nel cestino di sistema.",
        fileDeletedPerm: "File {0} eliminato definitivamente.",
        errorDeletingFile: "Errore nell'eliminazione del file: {0}",
        errorCreatingTutorial: "Errore nella creazione del tutorial: {0}",
        errorSourceNotFound: "Errore: Impossibile identificare la nota sorgente.",
        errorNoteFileNotFound: "Errore: File della nota non trovato.",
        linkUpdatedTo: "Collegamento aggiornato a: {0}",
        linkNotFoundInText: "Impossibile trovare il collegamento originale nel testo della nota.",
        settingsTitle: "Impostazioni PDF versioning",
        settingLangName: "Lingua (Language)",
        settingLangDesc: "Scegli la lingua del plugin.",
        settingTutorialName: "Tutorial del plugin",
        settingTutorialDesc: "Genera una nota di guida nella cartella principale del vault con le istruzioni sull'uso del plugin e la apre automaticamente.",
        settingTutorialBtn: "Genera Tutorial",
        settingNoteMgmt: "Gestione delle note",
        settingDupName: "Controllo duplicati",
        settingDupDesc: "Rileva e gestisci i file PDF con più versioni salvate nel vault.",
        scanningStatus: "Scansione in corso...",
        scanMemory: "Scansiona memoria",
        scanCompleted: "Scansione completata.",
        scanError: "Errore durante la scansione: ",
        vaultScanning: "Scansione del vault in corso...",
        noMultiPdfFound: "Nessun PDF con versioni multiple trovato. Clicca su 'Scansiona memoria' per cercare.",
        keepNewestOnly: "Tieni solo più recente",
        confirmKeepNewest: "Sei sicuro di voler tenere SOLO la versione più recente ({0}) ed eliminare tutte le altre?",
        previewBtn: "Anteprima",
        keepOnlyThis: "Tieni solo questa nota",
        confirmKeepThis: "Sei sicuro di voler tenere questa versione ({0}) ed eliminare tutte le altre?",
        deleteBtn: "Elimina",
        previewTitle: "Anteprima: {0}",
        confirmTitle: "Richiesta di conferma",
        cancelBtn: "Annulla",
        deleteConflictTitle: "Gestione eliminazione file collegato",
        noteViewedInFiles: "La nota che stai eliminando è attualmente visualizzata nei seguenti file:",
        whatToDo: "Cosa vuoi fare?",
        deleteEverywhere: "Elimina la nota ovunque",
        replaceWithVersion: "Sostituisci la nota con la versione:",
        tutorialCreatedTitle: "Tutorial Creato",
        tutorialCreatedDesc: "La nota Tutorial e le relative immagini di supporto sono state create con successo nella cartella 'PDF versioning guide' del tuo vault Obsidian e la nota è stata aperta.",
        okBtn: "Ok",
        unsupportedDevice: "Impossibile utilizzare il plugin: questa funzionalità è supportata solo su telefoni e tablet Samsung.",
        settingVersioningStyleName: "Stile di Versionamento",
        settingVersioningStyleDesc: "Scegli la convenzione dei nomi usata per identificare diverse versioni di un PDF. \n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Stile Samsung (doppio timestamp)",
        versioningStyleHuman: "Stile Human (_Version_X)",
        settingSamsungTruncateName: "Supporto nomi lunghi Samsung Notes",
        settingSamsungTruncateDesc: "Ignora i caratteri oltre i primi 50 per confrontare le varianti (Samsung Notes tronca i nomi dei PDF che superano i 50 caratteri prima di aggiungere la data e l'ora).",
        tutorialMarkdown: `# 📱 Guida e Flusso di lavoro di PDF versioning

Questo plugin consente una connessione fluida tra **Obsidian** e qualsiasi editor PDF esterno. Puoi annotare le tue note PDF e gestire automaticamente le versioni multiple (varianti) create durante il tuo flusso di lavoro.

---

## ❓ Perché PDF versioning?

A differenza dei PDF statici standard all'interno di Obsidian, l'uso di un editor esterno che supporta l'esportazione o il salvataggio di PDF modificabili (come Samsung Notes, Acrobat, Drawboard, etc.) preserva i tratti di inchiostro vettoriale, il che significa che puoi esportare una nota su Obsidian e riprendere comunque a modificare la tua scrittura a mano originale in un secondo momento!

---

## 🚀 Flusso di lavoro 1: Stile Human (Universale)

Usa questo flusso di lavoro per qualsiasi editor PDF generico su PC, Mac o tablet.

### Passaggio 1: Incorpora il PDF in Obsidian
Aggiungi semplicemente il PDF a una qualsiasi delle tue note markdown usando la sintassi standard di Obsidian:
\`\`\`markdown
![[Nome_Tuo_PDF.pdf]]
\`\`\`

### Passaggio 2: Apri e modifica il PDF
1. Vedrai due pulsanti personalizzati aggiunti in cima alla barra degli strumenti del PDF incorporato. Premi l'**icona della matita** per modificare il file.
2. Il file si aprirà nel lettore PDF predefinito del sistema.
3. Salva il file al termine.
4. ⚠️ **PASSAGGIO CRITICO:** Salva il file all'interno del vault di Obsidian **utilizzando lo stile di denominazione del versionamento selezionato**. Per lo "Stile Human", salvalo come \`Nome_Tuo_PDF_Version_1.pdf\`.

### Passaggio 3: Cambia e gestisci le versioni
Tornando su Obsidian, fai clic sul **pulsante dei livelli** per visualizzare e passare da una versione all'altra, eliminare i vecchi duplicati o sincronizzare l'elenco dei file.

---

## 🚀 Flusso di lavoro 2: Stile Samsung Notes (Android)

Questo flusso di lavoro è ottimizzato specificamente per Samsung Notes su dispositivi Android, consentendoti di utilizzare l'input S-Pen ad alta precisione.

### Passaggio 1: Esporta da Samsung Notes come PDF modificabile
1. **Crea la tua nota** in Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. **Apri il menu** toccando i tre punti nell'angolo in alto a destra.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. Tocca su **Salva come file**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. Seleziona **File PDF**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **PASSAGGIO CRITICO:** Scegli **PDF compatibile con Notes** (questo ti consente di modificare i tratti disegnati a mano in seguito).
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **Salva il file** all'interno della cartella del tuo vault Obsidian.
   ⚠️ **PASSAGGIO CRITICO:** Non cambiare il nome della nota. È fondamentale affinché il plugin identifichi le versioni e rispetti le convenzioni di denominazione di Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### Passaggio 2: Incorpora il PDF in Obsidian
Aggiungi semplicemente il PDF a una qualsiasi delle tue note markdown:
\`\`\`markdown
![[Nome_Tuo_PDF.pdf]]
\`\`\`

### Passaggio 3: Apri e modifica il PDF
1. Premi l'**icona della matita** per modificare il file.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. Scegli **Samsung Notes (Lettore PDF)** dal prompt di sistema di Android se richiesto.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Tocca il **pulsante della matita** all'interno di Samsung Notes per iniziare a scrivere o modificare i tratti vettoriali esistenti.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. Salva il file al termine.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **PASSAGGIO CRITICO:** Salva il file all'interno del vault di Obsidian **senza modificare il nome predefinito**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### Passaggio 4: Cambia e gestisci le versioni
Tornando su Obsidian, fai clic sul **pulsante dei livelli** per visualizzare e passare da una versione all'altra.
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ Impostazioni del Vault e delle Note
Vai alle impostazioni del plugin in **Gestione delle note** per accedere agli strumenti di pulizia di massa:

### 🔍 Trova Duplicati
Scansiona l'intero vault alla ricerca di versioni PDF duplicate.
* **Tieni solo più recente:** Elimina in blocco tutte le versioni precedenti, aggiornando automaticamente tutti gli elementi incorporati nelle note per collegarli alla copia più recente.
* **Anteprima:** Apre un modal di anteprima compatibile con i dispositivi mobili per ispezionare visivamente il contenuto del PDF.


---

### 📱 Note sull'integrazione con Samsung Notes e nomi file lunghi
Quando esportate o modificate un PDF in Samsung Notes, se il nome del file originale supera i 50 caratteri, Samsung Notes lo troncherà automaticamente a 50 caratteri prima di aggiungere la data e l'ora (es. \`_260722_114213\`).
Abilitando l'opzione **"Supporto nomi lunghi Samsung Notes"** nelle impostazioni del plugin (visibile quando lo stile è Samsung), PDF Versioning confronterà i primi 50 caratteri "sicuri" dei file, garantendo che anche le varianti dai nomi molto lunghi vengano riconosciute e raggruppate correttamente.`
    },
    fr: {
        opening: "Ouverture avec PDF versioning...\n\n---\n\n### 📱 Note sull'integrazione con Samsung Notes e nomi file lunghi\nQuando esportate o modificate un PDF in Samsung Notes, se il nome del file originale supera i 50 caratteri, Samsung Notes lo troncherà automaticamente a 50 caratteri prima di aggiungere la data e l'ora (es. `_260722_114213`).\nAbilitando l'opzione **\"Supporto nomi lunghi Samsung Notes\"** nelle impostazioni del plugin (visibile quando lo stile è Samsung), PDF Versioning confronterà i primi 50 caratteri \"sicuri\" dei file, garantendo che anche le varianti dai nomi molto lunghi vengano riconosciute e raggruppate correttamente.",
        errorOpeningPdf: "Erreur lors de l'ouverture du PDF : ",
        warningNotRecent: "Vous êtes sur le point de modifier une version qui n'est pas la plus récente.",
        original: "Original",
        originalBase: "Original (Base)",
        proceed: "Continuer",
        noVariantFound: "Aucune variante trouvée.",
        pdfNotFound: "Fichier PDF introuvable.",
        scanningFolder: "Analyse du dossier en cours...",
        deleteVersion: "Supprimer la version",
        removedLinkCount: "Lien vers {0} supprimé dans {1} notes.",
        updatedLinksCount: "Liens vers {0} mis à jour dans {1} notes.",
        confirmDeleteVersion: "Êtes-vous sûr de vouloir supprimer la version {0} ?",
        fileTrashedVault: "Fichier {0} déplacé vers la corbeille du coffre.",
        fileTrashedSystem: "Fichier {0} déplacé vers la corbeille système.",
        fileDeletedPerm: "Fichier {0} supprimé définitivement.",
        errorDeletingFile: "Erreur lors de la suppression du fichier : {0}",
        errorCreatingTutorial: "Erreur lors de la création du tutoriel : {0}",
        errorSourceNotFound: "Erreur : Impossible d'identifier la note source.",
        errorNoteFileNotFound: "Erreur : Fichier de note introuvable.",
        linkUpdatedTo: "Lien mis à jour vers : {0}",
        linkNotFoundInText: "Impossible de trouver le lien original dans le texte de la note.",
        settingsTitle: "Paramètres PDF versioning",
        settingLangName: "Langue",
        settingLangDesc: "Choisissez la langue du plugin.",
        settingTutorialName: "Tutoriel du plugin",
        settingTutorialDesc: "Génère une note de guide dans le dossier principal du coffre avec les instructions et l'ouvre automatiquement.",
        settingTutorialBtn: "Générer le tutoriel",
        settingNoteMgmt: "Gestion des notes",
        settingDupName: "Vérification des doublons",
        settingDupDesc: "Détectez et gérez les fichiers PDF avec plusieurs versions enregistrées dans le coffre.",
        scanningStatus: "Analyse en cours...",
        scanMemory: "Analyser le stockage",
        scanCompleted: "Analyse terminée.",
        scanError: "Erreur lors de l'analyse : ",
        vaultScanning: "Analyse du coffre en cours...",
        noMultiPdfFound: "Aucun PDF avec plusieurs versions trouvé. Cliquez sur 'Analyser le stockage' pour chercher.",
        keepNewestOnly: "Garder uniquement la plus récente",
        confirmKeepNewest: "Êtes-vous sûr de vouloir garder UNIQUEMENT la version la plus récente ({0}) et supprimer toutes les autres ?",
        previewBtn: "Aperçu",
        keepOnlyThis: "Garder uniquement cette note",
        confirmKeepThis: "Êtes-vous sûr de vouloir garder cette version ({0}) et supprimer toutes les autres ?",
        deleteBtn: "Supprimer",
        previewTitle: "Aperçu : {0}",
        confirmTitle: "Demande de confirmation",
        cancelBtn: "Annuler",
        deleteConflictTitle: "Gestion de la suppression de fichiers liés",
        noteViewedInFiles: "La note que vous supprimez est actuellement affichée dans les fichiers suivants :",
        whatToDo: "Que voulez-vous faire ?",
        deleteEverywhere: "Supprimer la note partout",
        replaceWithVersion: "Remplacer la note par la version :",
        tutorialCreatedTitle: "Tutoriel Créé",
        tutorialCreatedDesc: "La note Tutoriel et ses images de support ont été créées avec succès dans le dossier 'PDF versioning guide' et la note a été ouverte.",
        okBtn: "Ok",
        unsupportedDevice: "Impossible d'utiliser le plugin : cette fonctionnalité n'est prise en charge que sur les téléphones et tablettes Samsung.",
        settingVersioningStyleName: "Style de versionnement",
        settingVersioningStyleDesc: "Choisissez la convention de nommage utilisée pour identifier les différentes versions d'un PDF. \n- Human : file_Version_1.pdf\n- Samsung : file_20260624_153505.pdf",
        versioningStyleSamsung: "Style Samsung (double horodatage)",
        versioningStyleHuman: "Style Human (_Version_X)",
        settingSamsungTruncateName: "Correction des noms longs Samsung Notes",
        settingSamsungTruncateDesc: "Compare uniquement les 50 premiers caractères des fichiers (Samsung Notes tronque les noms de base dépassant 50 caractères avant d'ajouter l'horodatage).",
        tutorialMarkdown: `# 📱 Guide et flux de travail de PDF versioning

Ce plugin permet une connexion fluide entre **Obsidian** et tout éditeur PDF externe. Vous pouvez annoter vos notes PDF et gérer automatiquement les multiples versions (variantes) créées au cours de votre flux de travail.

---

## ❓ Pourquoi PDF versioning ?

Contrairement aux PDF statiques standard dans Obsidian, l'utilisation d'un éditeur externe qui prend en charge l'exportation ou l'enregistrement de PDF modifiables (comme Samsung Notes, Acrobat, Drawboard, etc.) préserve vos tracés vectoriels, ce qui signifie que vous pouvez exporter une note vers Obsidian tout en pouvant modifier votre écriture manuscrite d'origine plus tard !

---

## 🚀 Flux de travail 1 : Style Human (Universel)

Utilisez ce flux de travail pour tout éditeur PDF générique sur votre PC, Mac ou tablette.

### Étape 1 : Intégrer le PDF dans Obsidian
Ajoutez simplement le PDF à l'une de vos notes markdown en utilisant la syntaxe d'intégration standard d'Obsidian :
\`\`\`markdown
![[Votre_nom_de_PDF.pdf]]
\`\`\`

### Étape 2 : Ouvrir et modifier le PDF
1. Vous verrez deux boutons personnalisés ajoutés au-dessus de votre barre d'outils PDF intégrée. Appuyez sur l'**icône Crayon** pour modifier le fichier.
2. Le fichier s'ouvrira dans votre lecteur PDF système par défaut.
3. Enregistrez le fichier une fois terminé.
4. ⚠️ **ÉTAPE CRITIQUE :** Enregistrez le fichier dans le coffre Obsidian **en utilisant le style de nommage de version sélectionné**. Pour le « Style Human », enregistrez-le sous le nom \`Votre_nom_de_PDF_Version_1.pdf\`.

### Étape 3 : Basculer et gérer les versions
De retour dans Obsidian, cliquez sur le **bouton Couches** pour afficher et basculer entre les différentes versions, supprimer les anciens doublons ou synchroniser la liste des fichiers.

---

## 🚀 Flux de travail 2 : Style Samsung Notes (Android)

Ce flux de travail est optimisé spécifiquement pour Samsung Notes sur les appareils Android, vous permettant d'utiliser la saisie S-Pen de haute précision.

### Étape 1 : Exporter depuis Samsung Notes en tant que PDF modifiable
1. **Créez votre note** dans Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. **Ouvrez le menu** en appuyant sur les trois points dans le coin supérieur droit.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. Appuyez sur **Enregistrer sous forme de fichier**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. Sélectionnez **Fichier PDF**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **ÉTAPE CRITIQUE :** Choisissez **PDF compatible avec Notes** (cela vous permet de modifier vos tracés dessinés à la main plus tard).
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **Enregistrez le fichier** dans le dossier de votre coffre Obsidian.
   ⚠️ **ÉTAPE CRITIQUE :** Ne modifiez pas le nom de la note. C'est fondamental pour que le plugin identifie les versions et respecte les conventions de nommage de Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### Étape 2 : Intégrer le PDF dans Obsidian
Ajoutez simplement le PDF à l'une de vos notes markdown :
\`\`\`markdown
![[Votre_nom_de_PDF.pdf]]
\`\`\`

### Étape 3 : Ouvrir et modifier le PDF
1. Appuyez sur l'**icône Crayon** pour modifier le fichier.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. Choisissez **Samsung Notes (Lecteur PDF)** dans l'invite du système Android si demandé.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Appuyez sur le **bouton Crayon** dans Samsung Notes pour commencer à écrire ou à modifier vos tracés vectoriels existants.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. Enregistrez le fichier une fois terminé.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **ÉTAPE CRITIQUE :** Enregistrez le fichier dans le coffre Obsidian **sans modifier le nom par défaut**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### Étape 4 : Basculer et gérer les versions
De retour dans Obsidian, cliquez sur le **bouton Couches** pour afficher et basculer entre les différentes versions.
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ Paramètres du coffre et des notes
Accédez aux paramètres du plugin sous **Gestion des notes** pour accéder aux outils de nettoyage en masse :

### 🔍 Détecteur de doublons
Analyse l'ensemble du coffre à la recherche de versions de PDF doublons.
* **Garder uniquement la plus récente :** Supprime en masse toutes les versions plus anciennes, mettant automatiquement à jour toutes les intégrations de vos notes pour pointer vers la dernière copie.
* **Aperçu :** Ouvre une fenêtre d'aperçu compatible mobile pour inspecter visuellement le contenu du PDF.


---

### 📱 Note sur l'intégration Samsung Notes et les noms de fichiers longs
Lors de l'exportation ou de la modification d'un PDF dans Samsung Notes, si le nom d'origine dépasse 50 caractères, Samsung Notes le tronque automatiquement à 50 caractères avant d'ajouter l'horodatage (ex. \`_260722_114213\`).
En activant l'option **"Correction des noms longs Samsung Notes"** dans les paramètres du plugin (visible en mode Samsung), PDF Versioning comparera les 50 premiers caractères des fichiers, garantissant la détection exacte des variantes aux noms très longs.`
    },
    de: {
        opening: "Öffnen mit PDF versioning...\n\n---\n\n### 📱 Note sur l'intégration Samsung Notes et les noms de fichiers longs\nLors de l'exportation ou de la modification d'un PDF dans Samsung Notes, si le nom d'origine dépasse 50 caractères, Samsung Notes le tronque automatiquement à 50 caractères avant d'ajouter l'horodatage (ex. `_260722_114213`).\nEn activant l'option **\"Correction des noms longs Samsung Notes\"** dans les paramètres du plugin (visible en mode Samsung), PDF Versioning comparera les 50 premiers caractères des fichiers, garantissant la détection exacte des variantes aux noms très longs.",
        errorOpeningPdf: "Fehler beim Öffnen der PDF: ",
        warningNotRecent: "Sie bearbeiten eine Version, die nicht die aktuellste ist.",
        original: "Original",
        originalBase: "Original (Basis)",
        proceed: "Fortfahren",
        noVariantFound: "Keine Variante gefunden.",
        pdfNotFound: "PDF-Datei nicht gefunden.",
        scanningFolder: "Ordner wird gescannt...",
        deleteVersion: "Version löschen",
        removedLinkCount: "Link zu {0} in {1} Notizen entfernt.",
        updatedLinksCount: "Links zu {0} in {1} Notizen aktualisiert.",
        confirmDeleteVersion: "Sind Sie sicher, dass Sie die Version {0} löschen möchten?",
        fileTrashedVault: "Datei {0} in den Vault-Papierkorb verschoben.",
        fileTrashedSystem: "Datei {0} in den System-Papierkorb verschoben.",
        fileDeletedPerm: "Datei {0} dauerhaft gelöscht.",
        errorDeletingFile: "Fehler beim Löschen der Datei: {0}",
        errorCreatingTutorial: "Fehler beim Erstellen des Tutorials: {0}",
        errorSourceNotFound: "Fehler: Quellnotiz kann nicht identifiziert werden.",
        errorNoteFileNotFound: "Fehler: Notizdatei nicht gefunden.",
        linkUpdatedTo: "Link aktualisiert auf: {0}",
        linkNotFoundInText: "Ursprünglicher Link im Notiztext nicht gefunden.",
        settingsTitle: "PDF versioning Einstellungen",
        settingLangName: "Sprache",
        settingLangDesc: "Wählen Sie die Plugin-Sprache.",
        settingTutorialName: "Plugin-Tutorial",
        settingTutorialDesc: "Generiert eine Anleitungsnotiz im Hauptordner des Vaults mit Anweisungen und öffnet sie.",
        settingTutorialBtn: "Tutorial generieren",
        settingNoteMgmt: "Notizenverwaltung",
        settingDupName: "Duplikatprüfung",
        settingDupDesc: "Erkennen und verwalten Sie PDF-Dateien mit mehreren Versionen im Vault.",
        scanningStatus: "Wird gescannt...",
        scanMemory: "Speicher scannen",
        scanCompleted: "Scan abgeschlossen.",
        scanError: "Fehler beim Scannen: ",
        vaultScanning: "Vault wird gescannt...",
        noMultiPdfFound: "Keine PDF mit mehreren Versionen gefunden. Klicken Sie auf 'Speicher scannen', um zu suchen.",
        keepNewestOnly: "Nur die neueste behalten",
        confirmKeepNewest: "Sind Sie sicher, dass Sie NUR die neueste Version ({0}) behalten und alle anderen löschen möchten?",
        previewBtn: "Vorschau",
        keepOnlyThis: "Nur diese Notiz behalten",
        confirmKeepThis: "Sind Sie sicher, dass Sie diese Version ({0}) behalten und alle anderen löschen möchten?",
        deleteBtn: "Löschen",
        previewTitle: "Vorschau: {0}",
        confirmTitle: "Bestätigung erforderlich",
        cancelBtn: "Abbrechen",
        deleteConflictTitle: "Verwaltung verknüpfter Dateien",
        noteViewedInFiles: "Die Notiz, die Sie löschen, wird in folgenden Dateien angezeigt:",
        whatToDo: "Was möchten Sie tun?",
        deleteEverywhere: "Notiz überall löschen",
        replaceWithVersion: "Notiz ersetzen durch Version:",
        tutorialCreatedTitle: "Tutorial erstellt",
        tutorialCreatedDesc: "Das Tutorial wurde erfolgreich im Ordner 'PDF versioning guide' erstellt und geöffnet.",
        okBtn: "Ok",
        unsupportedDevice: "Das Plugin kann nicht verwendet werden: wird nur auf Samsung-Geräten unterstützt.",
        settingVersioningStyleName: "Versionierungsstil",
        settingVersioningStyleDesc: "Wählen Sie die Namenskonvention zur Identifizierung verschiedener Versionen einer PDF-Datei. \n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Samsung-Stil (doppelter Zeitstempel)",
        versioningStyleHuman: "Human-Stil (_Version_X)",
        settingSamsungTruncateName: "Korrektur für lange Dateinamen in Samsung Notes",
        settingSamsungTruncateDesc: "Vergleicht nur die ersten 50 Zeichen der Dateinamen (Samsung Notes kürzt Dateinamen über 50 Zeichen, bevor der Zeitstempel angehängt wird).",
        tutorialMarkdown: `# 📱 PDF versioning Anleitung & Arbeitsablauf

Dieses Plugin ermöglicht eine nahtlose Verbindung zwischen **Obsidian** und jedem externen PDF-Editor. Sie können Ihre PDF-Notizen mit Anmerkungen versehen und die verschiedenen Versionen (Varianten), die während Ihres Arbeitsablaufs erstellt werden, automatisch verwalten.

---

## ❓ Warum PDF versioning?

Im Gegensatz zu statischen Standard-PDFs in Obsidian bleiben bei Verwendung eines externen Editors, der den Export oder das Speichern bearbeitbarer PDFs unterstützt (wie Samsung Notes, Acrobat, Drawboard usw.), Ihre Vektor-Tintenstriche erhalten. Das bedeutet, dass Sie eine Notiz nach Obsidian exportieren und Ihre ursprüngliche Handschrift später weiterbearbeiten können!

---

## 🚀 Arbeitsablauf 1: Human-Stil (Universal)

Verwenden Sie diesen Arbeitsablauf für jeden gängigen PDF-Editor auf Ihrem PC, Mac oder Tablet.

### Schritt 1: PDF in Obsidian einbetten
Fügen Sie die PDF einfach mit der standardmäßigen Obsidian-Einbettungssyntax zu einer Ihrer Markdown-Notizen hinzu:
\`\`\`markdown
![[Ihr_PDF_Name.pdf]]
\`\`\`

### Schritt 2: PDF öffnen und bearbeiten
1. Sie sehen zwei benutzerdefinierte Schaltflächen oben in der Symbolleiste der eingebetteten PDF-Datei. Drücken Sie das **Stiftsymbol**, um die Datei zu bearbeiten.
2. Die Datei wird in Ihrem Standard-PDF-Reader geöffnet.
3. Speichern Sie die Datei, wenn Sie fertig sind.
4. ⚠️ **WICHTIGER SCHRITT:** Speichern Sie die Datei im Obsidian-Vault **unter Verwendung des ausgewählten Versionierungsstils**. Speichern Sie sie beim „Human-Stil“ als \`Ihr_PDF_Name_Version_1.pdf\`.

### Schritt 3: Versionen wechseln und verwalten
Klicken Sie in Obsidian wieder auf die **Ebenen-Schaltfläche**, um verschiedene Versionen anzuzeigen und zwischen ihnen zu wechseln, alte Duplikate zu löschen oder die Dateiliste zu synchronisieren.

---

## 🚀 Arbeitsablauf 2: Samsung Notes-Stil (Android)

Dieser Arbeitsablauf ist speziell für Samsung Notes auf Android-Geräten optimiert und ermöglicht die präzise Eingabe mit dem S-Pen.

### Schritt 1: Aus Samsung Notes als bearbeitbare PDF exportieren
1. **Erstellen Sie Ihre Notiz** in Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. **Öffnen Sie das Menü**, indem Sie auf die drei Punkte in der oberen rechten Ecke tippen.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. Tippen Sie auf **Als Datei speichern**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. Wählen Sie **PDF-Datei** aus.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **WICHTIGER SCHRITT:** Wählen Sie **Mit Notes kompatible PDF** (dadurch können Sie Ihre handschriftlichen Zeichnungen später weiterbearbeiten).
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **Speichern Sie die Datei** in Ihrem Obsidian-Vault-Ordner.
   ⚠️ **WICHTIGER SCHRITT:** Ändern Sie den Namen der Notiz nicht. Dies ist wichtig, damit das Plugin Versionen erkennen und die Samsung Notes-Namenskonventionen einhalten kann.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### Schritt 2: PDF in Obsidian einbetten
Fügen Sie die PDF einfach zu einer Ihrer Markdown-Notizen hinzu:
\`\`\`markdown
![[Ihr_PDF_Name.pdf]]
\`\`\`

### Schritt 3: PDF öffnen und bearbeiten
1. Drücken Sie das **Stiftsymbol**, um die Datei zu bearbeiten.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. Wählen Sie bei Bedarf **Samsung Notes (PDF Reader)** aus der Android-Systemabfrage aus.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Tippen Sie in Samsung Notes auf die **Stiftschaltfläche**, um mit dem Schreiben oder Bearbeiten Ihrer vorhandenen Vektorstriche zu beginnen.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. Speichern Sie die Datei, wenn Sie fertig sind.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **WICHTIGER SCHRITT:** Speichern Sie die Datei im Obsidian-Vault, **ohne den Standardnamen zu ändern**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### Schritt 4: Versionen wechseln und verwalten
Klicken Sie in Obsidian wieder auf die **Ebenen-Schaltfläche**, um verschiedene Versionen anzuzeigen und zwischen ihnen zu wechseln.
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ Vault- & Notizen-Einstellungen
Gehen Sie in den Plugin-Einstellungen auf **Notizenverwaltung**, um auf die Bereinigungstools zuzugreifen:

### 🔍 Duplikatsuche
Scannt den gesamten Vault nach doppelten PDF-Versionen.
* **Nur die neueste behalten:** Löscht alle älteren Versionen im Stapelbetrieb und aktualisiert automatisch alle Einbettungen in Ihren Notizen, sodass sie auf die neueste Kopie verweisen.
* **Vorschau:** Öffnet ein webtaugliches Vorschaufenster zur visuellen Überprüfung des PDF-Inhalts.


---

### 📱 Hinweis zur Integration von Samsung Notes bei langen Dateinamen
Beim Exportieren oder Bearbeiten einer PDF-Datei in Samsung Notes kürzt Samsung Notes Dateinamen automatisch auf 50 Zeichen, wenn der Originalname 50 Zeichen überschreitet, bevor der Zeitstempel (z. B. \`_260722_114213\`) angehängt wird.
Durch Aktivieren der Option **"Korrektur für lange Dateinamen in Samsung Notes"** in den Einstellungen (sichtbar im Samsung-Stil) vergleicht PDF Versioning nur die ersten 50 "sicheren" Zeichen der Dateinamen, sodass auch Varianten mit sehr langen Namen korrekt erkannt und gruppiert werden.`
    },
    es: {
        opening: "Abriendo con PDF versioning...\n\n---\n\n### 📱 Hinweis zur Integration von Samsung Notes bei langen Dateinamen\nBeim Exportieren oder Bearbeiten einer PDF-Datei in Samsung Notes kürzt Samsung Notes Dateinamen automatisch auf 50 Zeichen, wenn der Originalname 50 Zeichen überschreitet, bevor der Zeitstempel (z. B. `_260722_114213`) angehängt wird.\nDurch Aktivieren der Option **\"Korrektur für lange Dateinamen in Samsung Notes\"** in den Einstellungen (sichtbar im Samsung-Stil) vergleicht PDF Versioning nur die ersten 50 \"sicheren\" Zeichen der Dateinamen, sodass auch Varianten mit sehr langen Namen korrekt erkannt und gruppiert werden.",
        errorOpeningPdf: "Error al abrir el PDF: ",
        warningNotRecent: "Estás a punto de modificar una versión que no es la más reciente.",
        original: "Original",
        originalBase: "Original (Base)",
        proceed: "Continuar",
        noVariantFound: "No se encontró variante.",
        pdfNotFound: "Archivo PDF no encontrado.",
        scanningFolder: "Escaneando carpeta en curso...",
        deleteVersion: "Eliminar versión",
        removedLinkCount: "Enlace a {0} eliminado en {1} notas.",
        updatedLinksCount: "Enlaces a {0} actualizados en {1} notas.",
        confirmDeleteVersion: "¿Estás seguro de que quieres eliminar la versión {0}?",
        fileTrashedVault: "Archivo {0} movido a la papelera del vault.",
        fileTrashedSystem: "Archivo {0} movido a la papelera del sistema.",
        fileDeletedPerm: "Archivo {0} eliminado permanentemente.",
        errorDeletingFile: "Error al eliminar el archivo: {0}",
        errorCreatingTutorial: "Error al crear el tutorial: {0}",
        errorSourceNotFound: "Error: No se puede identificar la nota de origen.",
        errorNoteFileNotFound: "Error: Archivo de nota no encontrado.",
        linkUpdatedTo: "Enlace actualizado a: {0}",
        linkNotFoundInText: "No se puede encontrar el enlace original en el texto de la nota.",
        settingsTitle: "Ajustes de PDF versioning",
        settingLangName: "Idioma",
        settingLangDesc: "Elige el idioma del plugin.",
        settingTutorialName: "Tutorial del plugin",
        settingTutorialDesc: "Genera una nota de guía en la carpeta principal del vault y la abre automáticamente.",
        settingTutorialBtn: "Generar Tutorial",
        settingNoteMgmt: "Gestión de notas",
        settingDupName: "Comprobación de duplicados",
        settingDupDesc: "Detecta y gestiona archivos PDF con varias versiones guardadas en el vault.",
        scanningStatus: "Escaneando...",
        scanMemory: "Escanear almacenamiento",
        scanCompleted: "Escaneo completado.",
        scanError: "Error durante el escaneo: ",
        vaultScanning: "Escaneando el vault...",
        noMultiPdfFound: "No se encontró ningún PDF con múltiples versiones. Haz clic en 'Escanear almacenamiento' para buscar.",
        keepNewestOnly: "Mantener solo la más reciente",
        confirmKeepNewest: "¿Estás seguro de que quieres mantener SOLO la versión más reciente ({0}) y eliminar todas las demás?",
        previewBtn: "Vista previa",
        keepOnlyThis: "Mantener solo esta nota",
        confirmKeepThis: "¿Estás seguro de que quieres mantener esta versión ({0}) y eliminar todas las demás?",
        deleteBtn: "Eliminar",
        previewTitle: "Vista previa: {0}",
        confirmTitle: "Solicitud de confirmación",
        cancelBtn: "Cancelar",
        deleteConflictTitle: "Gestión de eliminación de archivos vinculados",
        noteViewedInFiles: "La nota que estás eliminando se ve actualmente en los siguientes archivos:",
        whatToDo: "¿Qué quieres hacer?",
        deleteEverywhere: "Eliminar la nota en todas partes",
        replaceWithVersion: "Reemplazar la nota con la versión:",
        tutorialCreatedTitle: "Tutorial Creado",
        tutorialCreatedDesc: "La nota Tutorial y sus imágenes de soporte se han creado con éxito en la carpeta 'PDF versioning guide' y la nota se ha abierto.",
        okBtn: "Ok",
        unsupportedDevice: "No se puede utilizar el plugin: esta función solo es compatible con teléfonos y tabletas Samsung.",
        settingVersioningStyleName: "Estilo de versionamiento",
        settingVersioningStyleDesc: "Elija la convención de nomenclatura utilizada para identificar las diferentes versiones de un PDF. \n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Estilo Samsung (doble marca de tiempo)",
        versioningStyleHuman: "Estilo Human (_Version_X)",
        settingSamsungTruncateName: "Corrección de nombres largos de Samsung Notes",
        settingSamsungTruncateDesc: "Compara solo los primeros 50 caracteres del nombre del archivo (Samsung Notes trunca los nombres de base de más de 50 caracteres antes de añadir la marca de tiempo).",
        tutorialMarkdown: `# 📱 Guía y flujo de trabajo de PDF versioning

Este complemento permite una conexión fluida entre **Obsidian** y cualquier editor de PDF externo. Puede anotar sus notas en PDF y administrar automáticamente las múltiples versiones (variantes) creadas durante su flujo de trabajo.

---

## ❓ ¿Por qué PDF versioning?

Al variar de los PDF estáticos estándar dentro de Obsidian, el uso de un editor externo que admita la exportación o el guardado de PDF editables (como Samsung Notes, Acrobat, Drawboard, etc.) conserva los trazos de tinta vectoriales, lo que significa que puede exportar una nota a Obsidian y continuar editando su escritura a mano original más tarde.

---

## 🚀 Flujo de trabajo 1: Estilo Human (Universal)

Utilice este flujo de trabajo para cualquier editor de PDF genérico en su PC, Mac o tableta.

### Paso 1: Incrustar el PDF en Obsidian
Simplemente agregue el PDF a cualquiera de sus notas de markdown utilizando la sintaxis de incrustación estándar de Obsidian:
\`\`\`markdown
![[Su_nombre_de_PDF.pdf]]
\`\`\`

### Paso 2: Abrir y editar el PDF
1. Verá dos botones personalizados agregados en la parte superior de la barra de herramientas del PDF incrustado. Presione el **icono del lápiz** para editar el archivo.
2. El archivo se abrirá en su lector de PDF predeterminado del sistema.
3. Guarde el archivo cuando haya terminado.
4. ⚠️ **PASO CRÍTICO:** Guarde el archivo dentro del almacén (vault) de Obsidian **utilizando el estilo de nomenclatura de versiones seleccionado**. Para el "Estilo Human", guárdelo como \`Su_nombre_de_PDF_Version_1.pdf\`.

### Paso 3: Cambiar y administrar versiones
De vuelta en Obsidian, haga clic en el **botón de capas** para ver y cambiar entre diferentes versiones, eliminar duplicados antiguos o sincronizar la lista de archivos.

---

## 🚀 Flujo de trabajo 2: Estilo Samsung Notes (Android)

Este flujo de trabajo está optimizado específicamente para Samsung Notes en dispositivos Android, lo que le permite utilizar la entrada S-Pen de alta precisión.

### Paso 1: Exportar desde Samsung Notes como PDF editable
1. **Cree su nota** en Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. **Abra el menú** tocando los tres puntos en la esquina superior derecha.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. Toque en **Guardar como archivo**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. Seleccione **Archivo PDF**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **PASO CRÍTICO:** Elija **PDF compatible con Notes** (esto le permite editar sus trazos dibujados a mano más tarde).
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **Guarde el archivo** dentro de la carpeta de su almacén de Obsidian.
   ⚠️ **PASO CRÍTICO:** No cambie el nombre de la nota. Es fundamental para que el complemento identifique las versiones y respete las convenciones de nomenclatura de Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### Paso 2: Incrustar el PDF en Obsidian
Simplemente agregue el PDF a cualquiera de sus notas de markdown:
\`\`\`markdown
![[Su_nombre_de_PDF.pdf]]
\`\`\`

### Paso 3: Abrir y editar el PDF
1. Presione el **icono del lápiz** para editar el archivo.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. Elija **Samsung Notes (Lector de PDF)** de la lista de aplicaciones del sistema de Android si se le solicita.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Toque el **botón del lápiz** dentro de Samsung Notes para comenzar a escribir o editar sus trazos vectoriales existentes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. Guarde el archivo cuando haya terminado.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **PASO CRÍTICO:** Guarde el archivo dentro del almacén de Obsidian **sin cambiar el nombre predeterminado**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### Paso 4: Cambiar y administrar versiones
De vuelta en Obsidian, haga clic en el **botón de capas** para ver y cambiar entre diferentes versiones.
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ Configuración del almacén y las notas
Vaya a la configuración del complemento en **Gestión de notas** para acceder a las herramientas de limpieza masiva:

### 🔍 Buscador de duplicados
Escanea todo el almacén en busca de versiones de PDF duplicadas.
* **Conservar solo la más reciente:** Elimina de forma masiva todas las versiones anteriores, actualizando automáticamente todas las incrustaciones de sus notas para vincularlas a la copia más reciente.
* **Vista previa:** Abre un modal de vista previa compatible con dispositivos móviles para inspeccionar visualmente el contenido del PDF.


---

### 📱 Nota de integración con Samsung Notes y nombres de archivo largos
Al exportar o editar un PDF en Samsung Notes, si el nombre original supera los 50 caracteres, Samsung Notes lo trunca automáticamente a 50 caracteres antes de añadir la marca de tiempo (ej. \`_260722_114213\`).
Al activar la opción **"Corrección de nombres largos de Samsung Notes"** en la configuración del complemento (visible en estilo Samsung), PDF Versioning comparará los primeros 50 caracteres "seguros" de los archivos, garantizando que las variantes con nombres largos se detecten y agrupen correctamente.`
    },
    pl: {
        opening: "Otwieranie z PDF versioning...\n\n---\n\n### 📱 Nota de integración con Samsung Notes y nombres de archivo largos\nAl exportar o editar un PDF en Samsung Notes, si el nombre original supera los 50 caracteres, Samsung Notes lo trunca automáticamente a 50 caracteres antes de añadir la marca de tiempo (ej. `_260722_114213`).\nAl activar la opción **\"Corrección de nombres largos de Samsung Notes\"** en la configuración del complemento (visible en estilo Samsung), PDF Versioning comparará los primeros 50 caracteres \"seguros\" de los archivos, garantizando que las variantes con nombres largos se detecten y agrupen correctamente.",
        errorOpeningPdf: "Błąd podczas otwierania PDF: ",
        warningNotRecent: "Edytujesz wersję, która nie jest najnowsza.",
        original: "Oryginał",
        originalBase: "Oryginał (Baza)",
        proceed: "Kontynuuj",
        noVariantFound: "Nie znaleziono wariantu.",
        pdfNotFound: "Nie znaleziono pliku PDF.",
        scanningFolder: "Skanowanie folderu w toku...",
        deleteVersion: "Usuń wersję",
        removedLinkCount: "Usunięto link do {0} w {1} notatkach.",
        updatedLinksCount: "Zaktualizowano linki do {0} w {1} notatkach.",
        confirmDeleteVersion: "Czy na pewno chcesz usunąć wersję {0}?",
        fileTrashedVault: "Plik {0} przeniesiony do kosza vault.",
        fileTrashedSystem: "Plik {0} przeniesiony do kosza systemowego.",
        fileDeletedPerm: "Plik {0} trwale usunięty.",
        errorDeletingFile: "Błąd podczas usuwania pliku: {0}",
        errorCreatingTutorial: "Błąd podczas tworzenia samouczka: {0}",
        errorSourceNotFound: "Błąd: Nie można zidentyfikować notatki źródłowej.",
        errorNoteFileNotFound: "Błąd: Nie znaleziono pliku notatki.",
        linkUpdatedTo: "Link zaktualizowany na: {0}",
        linkNotFoundInText: "Nie można znaleźć oryginalnego linku w tekście notatki.",
        settingsTitle: "Ustawienia PDF versioning",
        settingLangName: "Język",
        settingLangDesc: "Wybierz język wtyczki.",
        settingTutorialName: "Samouczek wtyczki",
        settingTutorialDesc: "Generuje notatkę-przewodnik z instrukcjami w głównym folderze vault.",
        settingTutorialBtn: "Generuj Samouczek",
        settingNoteMgmt: "Zarządzanie notatkami",
        settingDupName: "Sprawdzanie duplikatów",
        settingDupDesc: "Wykrywaj i zarządzaj plikami PDF z wieloma wersjami w vault.",
        scanningStatus: "Skanowanie...",
        scanMemory: "Skanuj pamięć",
        scanCompleted: "Skanowanie zakończone.",
        scanError: "Błąd podczas skanowania: ",
        vaultScanning: "Skanowanie vault...",
        noMultiPdfFound: "Nie znaleziono plików PDF z wieloma wersjami. Kliknij 'Skanuj pamięć', aby wyszukać.",
        keepNewestOnly: "Zatrzymaj tylko najnowszą",
        confirmKeepNewest: "Czy na pewno chcesz zachować TYLKO najnowszą wersję ({0}) i usunąć wszystkie inne?",
        previewBtn: "Podgląd",
        keepOnlyThis: "Zatrzymaj tylko tę notatkę",
        confirmKeepThis: "Czy na pewno chcesz zachować tę wersję ({0}) i usunąć wszystkie inne?",
        deleteBtn: "Usuń",
        previewTitle: "Podgląd: {0}",
        confirmTitle: "Wymagane potwierdzenie",
        cancelBtn: "Anuluj",
        deleteConflictTitle: "Zarządzanie usuwaniem powiązanych plików",
        noteViewedInFiles: "Notatka, którą usuwasz, jest obecnie wyświetlana w następujących plikach:",
        whatToDo: "Co chcesz zrobić?",
        deleteEverywhere: "Usuń notatkę wszędzie",
        replaceWithVersion: "Zastąp notatkę wersją:",
        tutorialCreatedTitle: "Samouczek utworzony",
        tutorialCreatedDesc: "Samouczek został pomyślnie utworzony w folderze 'PDF versioning guide' i otwarty.",
        okBtn: "Ok",
        unsupportedDevice: "Nie można użyć wtyczki: funkcja jest obsługiwana tylko na urządzeniach Samsung.",
        settingVersioningStyleName: "Styl wersjonowania",
        settingVersioningStyleDesc: "Wybierz konwencję nazewnictwa używaną do identyfikacji różnych wersji pliku PDF. \n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Styl Samsung (podwójny znacznik czasu)",
        versioningStyleHuman: "Styl Human (_Version_X)",
        settingSamsungTruncateName: "Poprawka długich nazw plików Samsung Notes",
        settingSamsungTruncateDesc: "Porównuj tylko pierwsze 50 znaków nazwy pliku (Samsung Notes skraca nazwy plików dłuższe niż 50 znaków przed dodaniem znacznika czasu).",
        tutorialMarkdown: `# 📱 PDF versioning Instrukcja i przepływ pracy

Ta wtyczka umożliwia bezproblemowe połączenie między **Obsidian** a dowolnym zewnętrznym edytorem PDF. Możesz dodawać adnotacje do swoich notatek PDF i automatycznie zarządzać wieloma wersjami (wariantami) tworzonymi podczas pracy.

---

## ❓ Dlaczego PDF versioning?

W przeciwieństwie do standardowych statycznych plików PDF w programie Obsidian, korzystanie z zewnętrznego edytora obsługującego eksportowanie lub zapisywanie edytowalnych plików PDF (takich jak Samsung Notes, Acrobat, Drawboard itp.) zachowuje wektorowe pociągnięcia piórka. Oznacza to, że możesz wyeksportować notatkę do Obsidian, a później kontynuować edycję oryginalnego pisma odręcznego!

---

## 🚀 Przepływ pracy 1: Styl Human (Uniwersalny)

Użyj tego przepływu pracy dla dowolnego ogólnego edytora PDF na komputerze PC, Mac lub tablecie.

### Krok 1: Osadź plik PDF w Obsidian
Po prostu dodaj plik PDF do dowolnej notatki markdown za pomocą standardowej składni osadzania Obsidian:
\`\`\`markdown
![[Nazwa_twojego_pliku_PDF.pdf]]
\`\`\`

### Krok 2: Otwórz i edytuj plik PDF
1. Nad paskiem narzędzi osadzonego pliku PDF zobaczysz dwa niestandardowe przyciski. Naciśnij **ikonę ołówka**, aby edytować plik.
2. Plik otworzy się w domyślnym czytniku PDF w systemie.
3. Zapisz plik po zakończeniu pracy.
4. ⚠️ **KROK KRYTYCZNY:** Zapisz plik wewnątrz skarbca Obsidian **przy użyciu wybranego stylu nazewnictwa wersji**. W przypadku „Stylu Human” zapisz go jako \`Nazwa_twojego_pliku_PDF_Version_1.pdf\`.

### Krok 3: Przełączaj wersje i zarządzaj nimi
Po powrocie do programu Obsidian kliknij **przycisk Warstwy**, aby wyświetlić różne wersje i przełączać się między nimi, usuwać stare duplikaty lub synchronizować listę plików.

---

## 🚀 Przepływ pracy 2: Styl Samsung Notes (Android)

Ten przepływ pracy jest zoptymalizowany specjalnie dla aplikacji Samsung Notes na urządzeniach z systemem Android i umożliwia korzystanie z precyzyjnego piórka S-Pen.

### Krok 1: Wyeksportuj z Samsung Notes jako edytowalny plik PDF
1. **Utwórz notatkę** w aplikacji Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. **Otwórz menu**, dotykając trzech kropek w prawym górnym rogu.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. Dotknij **Zapisz jako plik**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. Wybierz **Plik PDF**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **KROK KRYTYCZNY:** Wybierz **PDF zgodny z Notes** (umożliwia to późniejszą edycję odręcznych rysunków).
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **Zapisz plik** w folderze skarbca Obsidian.
   ⚠️ **KROK KRYTYCZNY:** Nie zmieniaj nazwy notatki. Ma to kluczowe znaczenie dla identyfikacji wersji przez wtyczkę i zachowania zgodności z konwencją nazewnictwa Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### Krok 2: Osadź plik PDF w Obsidian
Po prostu dodaj plik PDF do dowolnej notatki markdown:
\`\`\`markdown
![[Nazwa_twojego_pliku_PDF.pdf]]
\`\`\`

### Krok 3: Otwórz i edytuj plik PDF
1. Naciśnij **ikonę ołówka**, aby edytować plik.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. W razie potrzeby wybierz **Samsung Notes (Czytnik PDF)** z monitu systemowego Android.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Dotknij **przycisku Ołówek** w aplikacji Samsung Notes, aby zacząć pisać lub edytować istniejące pociągnięcia wektorowe.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. Zapisz plik po zakończeniu pracy.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **KROK KRYTYCZNY:** Zapisz plik w skarbcu Obsidian **bez zmiany domyślnej nazwy**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### Krok 4: Przełączaj wersje i zarządzaj nimi
Po powrocie do programu Obsidian kliknij **przycisk Warstwy**, aby wyświetlić i przełączać wersje.
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ Ustawienia skarbca i notatek
Przejdź do ustawień wtyczki w sekcji **Zarządzanie notatkami**, aby uzyskać dostęp do narzędzi czyszczenia zbiorczego:

### 🔍 Wyszukiwanie duplikatów
Skanuje cały skarbiec w poszukiwaniu zduplikowanych wersji plików PDF.
* **Zachowaj tylko najnowsze:** Usuwa zbiorczo wszystkie starsze wersje, automatycznie aktualizując wszystkie osadzenia w notatkach, aby prowadziły do najnowszej kopii.
* **Podgląd:** Otwiera kompatybilne z urządzeniami mobilnymi okno podglądu w celu wizualnej oceny zawartości pliku PDF.


---

### 📱 Uwaga dotycząca integracji długich nazw plików Samsung Notes
Podczas eksportowania lub edycji pliku PDF w Samsung Notes, jeśli oryginalna nazwa pliku przekracza 50 znaków, Samsung Notes automatycznie skraca ją do 50 znaków przed dodaniem znacznika czasu (np. \`_260722_114213\`).
Włączając opcję **"Poprawka długich nazw plików Samsung Notes"** w ustawieniach wtyczki (widoczną, gdy stylem jest Samsung), PDF Versioning porówna tylko pierwsze 50 "bezpiecznych" znaków nazw plików, zapewniając prawidłowe wykrywanie i grupowanie wariantów o długich nazwach.`
    },
    zh: {
        opening: "正在使用 PDF versioning 打开...",
        errorOpeningPdf: "打开 PDF 时出错： ",
        warningNotRecent: "您正在编辑的不是最新版本。",
        original: "原始版本",
        originalBase: "原始版本（基础）",
        proceed: "继续",
        noVariantFound: "未找到变体。",
        pdfNotFound: "未找到 PDF 文件。",
        scanningFolder: "正在扫描文件夹...",
        deleteVersion: "删除版本",
        removedLinkCount: "删除了 {1} 个笔记中指向 {0} 的链接。",
        updatedLinksCount: "更新了 {1} 个笔记中指向 {0} 的链接。",
        confirmDeleteVersion: "您确定要删除版本 {0} 吗？",
        fileTrashedVault: "文件 {0} 已移动到回收站。",
        fileTrashedSystem: "文件 {0} 已移动到系统回收站。",
        fileDeletedPerm: "文件 {0} 已永久删除。",
        errorDeletingFile: "删除文件时出错： {0}",
        errorCreatingTutorial: "创建教程时出错： {0}",
        errorSourceNotFound: "错误：无法识别源笔记。",
        errorNoteFileNotFound: "错误：找不到笔记文件。",
        linkUpdatedTo: "链接更新为： {0}",
        linkNotFoundInText: "在笔记文本中找不到原始链接。",
        settingsTitle: "PDF versioning 设置",
        settingLangName: "语言",
        settingLangDesc: "选择插件语言。",
        settingTutorialName: "插件教程",
        settingTutorialDesc: "在 vault 主文件夹中生成指南笔记，并自动打开。",
        settingTutorialBtn: "生成教程",
        settingNoteMgmt: "笔记管理",
        settingDupName: "重复检查",
        settingDupDesc: "检测并管理 vault 中保存的具有多个版本的 PDF 文件。",
        scanningStatus: "正在扫描...",
        scanMemory: "扫描存储",
        scanCompleted: "扫描完成。",
        scanError: "扫描期间出错： ",
        vaultScanning: "正在扫描 vault...",
        noMultiPdfFound: "未找到具有多个版本的 PDF。点击 '扫描存储' 即可搜索。",
        keepNewestOnly: "仅保留最新",
        confirmKeepNewest: "您确定只保留最新版本 ({0}) 并删除所有其他版本吗？",
        previewBtn: "预览",
        keepOnlyThis: "仅保留此笔记",
        confirmKeepThis: "您确定要保留此版本 ({0}) 并删除所有其他版本吗？",
        deleteBtn: "删除",
        previewTitle: "预览： {0}",
        confirmTitle: "需要确认",
        cancelBtn: "取消",
        deleteConflictTitle: "链接文件删除管理",
        noteViewedInFiles: "您要删除的笔记目前在以下文件中查看：",
        whatToDo: "您想做什么？",
        deleteEverywhere: "在所有地方删除笔记",
        replaceWithVersion: "将笔记替换为版本：",
        tutorialCreatedTitle: "教程已创建",
        tutorialCreatedDesc: "教程笔记已在 'PDF versioning guide' 文件夹中成功创建并打开。",
        okBtn: "确定",
        unsupportedDevice: "无法使用插件：此功能仅在三星设备上受支持。",
        settingVersioningStyleName: "版本命名样式",
        settingVersioningStyleDesc: "选择用于识别 PDF 不同版本的命名规范。\n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Samsung 样式（双时间戳）",
        versioningStyleHuman: "Human 样式（_Version_X）",
        settingSamsungTruncateName: "三星笔记长文件名修复",
        settingSamsungTruncateDesc: "仅比较文件名的前50个字符（三星笔记在添加时间戳之前会将超过50个字符的基础文件名截断）。",
        tutorialMarkdown: `# 📱 PDF versioning 指南与工作流

此插件可在 **Obsidian** 与任何外部 PDF 编辑器之间实现无缝连接。您可以为 PDF 添加批注，并自动管理工作流中产生的多个版本（变体）。

---

## ❓ 为什么需要 PDF versioning？

与 Obsidian 中的普通静态 PDF 不同，使用支持导出或保存可编辑 PDF 的外部编辑器（如 Samsung Notes, Acrobat, Drawboard 等）会保留您的矢量笔迹，这意味着您可以将笔记导出到 Obsidian，并在以后继续编辑您的原始手写内容！

---

## 🚀 工作流 1：Human 样式（通用）

此工作流适用于您的 PC、Mac 或平板电脑上的任何通用 PDF 编辑器。

### 步骤 1：在 Obsidian 中嵌入 PDF
使用标准 Obsidian 嵌入语法，将 PDF 简单添加到您的任一 Markdown 笔记中：
\`\`\`markdown
![[您的_PDF_文件名.pdf]]
\`\`\`

### 步骤 2：打开并编辑 PDF
1. 您会看到嵌入的 PDF 工具栏上方添加了两个自定义按钮。点击 **铅笔图标** 编辑文件。
2. 文件将在您系统默认的 PDF 阅读器中打开。
3. 编辑完成后保存文件。
4. ⚠️ **关键步骤：** **使用选定的版本命名样式**将文件保存到 Obsidian 保险箱中。对于“Human 样式”，将其保存为 \`您的_PDF_文件名_Version_1.pdf\`。

### 步骤 3：切换与管理版本
回到 Obsidian，点击 **图层按钮** 可以查看并切换不同版本、删除旧 assembly 文件，或同步文件列表。

---

## 🚀 工作流 2：Samsung Notes 样式（Android）

此工作流专门针对 Android 设备上的 Samsung Notes 进行了优化，可实现高精度的 S-Pen 输入。

### 步骤 1：从 Samsung Notes 导出为可编辑 PDF
1. 在 Samsung Notes 中**新建笔记**。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. 点击右上角的三点图标**打开菜单**。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. 点击 **另存为文件**。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. 选择 **PDF 文件**。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **关键步骤：** 选择 **Notes 兼容 PDF**（这允许您稍后继续编辑手绘笔迹）。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **保存文件**至 Obsidian 保险箱文件夹中。
   ⚠️ **关键步骤：** 请勿修改笔记名称。这是插件识别版本并遵循 Samsung Notes 命名规范的基础。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### 步骤 2：在 Obsidian 中嵌入 PDF
将 PDF 简单添加到您的任一 Markdown 笔记中：
\`\`\`markdown
![[您的_PDF_文件名.pdf]]
\`\`\`

### 步骤 3：打开并编辑 PDF
1. 点击 **铅笔图标** 编辑文件。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. 如果系统提示，从 Android 系统弹窗中选择 **Samsung Notes (PDF阅读器)**。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. 点击 Samsung Notes 里的 **铅笔按钮** 开始书写或修改已有的矢量笔迹。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. 编辑完成后保存文件。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **关键步骤：** **在不修改默认名称的情况下**将文件保存到 Obsidian 保险箱中。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### 步骤 4：切换与管理版本
回到 Obsidian，点击 **图层按钮** 查看并切换不同版本。
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ 保险箱与笔记设置
前往插件设置中的**笔记管理**以使用批量清理工具：

### 🔍 重复文件查找器
扫描整个保险箱以查找重复的 PDF 版本。
* **仅保留最新版本：** 批量删除所有旧版本，并自动将笔记中的所有嵌入更新为链接到最新副本。
* **预览：** 打开适配移动端的预览弹窗，直观检查 PDF 内容。


---

### 📱 三星笔记长文件名集成说明
在三星笔记中导出或编辑PDF时，如果原始文件名超过50个字符，三星笔记会在添加时间戳（例如 \`_260722_114213\`）之前自动将其截断为50个字符。
在插件设置中启用 **“三星笔记长文件名修复”** 选项（在模式为三星时可见），PDF Versioning 将仅比较文件名的前50个“安全”字符，确保完美识别并分组长文件名的变体。`
    },
    ja: {
        opening: "PDF versioning で開いています...",
        errorOpeningPdf: "PDF のオープンエラー： ",
        warningNotRecent: "最新ではないバージョンを編集しようとしています。",
        original: "オリジナル",
        originalBase: "オリジナル（ベース）",
        proceed: "続行",
        noVariantFound: "バリアントが見つかりません。",
        pdfNotFound: "PDF ファイルが見つかりません。",
        scanningFolder: "フォルダーをスキャン中...",
        deleteVersion: "バージョンを削除",
        removedLinkCount: "{1} 個のノートで {0} へのリンクを削除しました。",
        updatedLinksCount: "{1} 個のノートで {0} へのリンクを更新しました。",
        confirmDeleteVersion: "バージョン {0} を削除してもよろしいですか？",
        fileTrashedVault: "ファイル {0} は Vault のゴミ箱に移動されました。",
        fileTrashedSystem: "ファイル {0} はシステムのゴミ箱に移動されました。",
        fileDeletedPerm: "ファイル {0} は完全に削除されました。",
        errorDeletingFile: "ファイルの削除エラー： {0}",
        errorCreatingTutorial: "チュートリアルの作成エラー： {0}",
        errorSourceNotFound: "エラー：ソースノートを識別できません。",
        errorNoteFileNotFound: "エラー：ノートファイルが見つかりません。",
        linkUpdatedTo: "リンクを更新： {0}",
        linkNotFoundInText: "ノートテキスト内に元のリンクが見つかりません。",
        settingsTitle: "PDF versioning 設定",
        settingLangName: "言語",
        settingLangDesc: "プラグインの言語を選択します。",
        settingTutorialName: "プラグインチュートリアル",
        settingTutorialDesc: "Vaultのメインフォルダにガイドノートを生成し、自動的に開きます。",
        settingTutorialBtn: "チュートリアルを生成",
        settingNoteMgmt: "ノート管理",
        settingDupName: "重複チェック",
        settingDupDesc: "Vault に保存されている複数バージョンの PDF を検出して管理します。",
        scanningStatus: "スキャン中...",
        scanMemory: "ストレージをスキャン",
        scanCompleted: "スキャンが完了しました。",
        scanError: "スキャン中のエラー： ",
        vaultScanning: "Vault をスキャン中...",
        noMultiPdfFound: "複数バージョンの PDF は見つかりませんでした。「ストレージをスキャン」をクリックして検索してください。",
        keepNewestOnly: "最新のみ保持",
        confirmKeepNewest: "最新バージョン ({0}) のみを保持し、他をすべて削除してもよろしいですか？",
        previewBtn: "プレビュー",
        keepOnlyThis: "このノートのみ保持",
        confirmKeepThis: "このバージョン ({0}) を保持し、他をすべて削除してもよろしいですか？",
        deleteBtn: "削除",
        previewTitle: "プレビュー： {0}",
        confirmTitle: "確認リクエスト",
        cancelBtn: "キャンセル",
        deleteConflictTitle: "リンクされたファイルの削除管理",
        noteViewedInFiles: "削除しようとしているノートは、現在次のファイルで表示されています：",
        whatToDo: "どうしますか？",
        deleteEverywhere: "すべての場所でノートを削除",
        replaceWithVersion: "ノートを次のバージョンに置き換え：",
        tutorialCreatedTitle: "チュートリアル作成完了",
        tutorialCreatedDesc: "チュートリアルノートが 'PDF versioning guide' フォルダに正常に作成され、開かれました。",
        okBtn: "OK",
        unsupportedDevice: "プラグインを使用できません：この機能は Samsung デバイスでのみサポートされています。",
        settingVersioningStyleName: "バージョニングスタイル",
        settingVersioningStyleDesc: "PDFの異なるバージョンを識別するために使用する命名規則を選択します。\n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Samsungスタイル（ダブルタイムスタンプ）",
        versioningStyleHuman: "Humanスタイル（_Version_X）",
        settingSamsungTruncateName: "Samsung Notes 長いファイル名の修正",
        settingSamsungTruncateDesc: "ファイル名の最初の50文字のみを比較します（Samsung Notesはタイムスタンプを追加する前に50文字を超える基本ファイル名を切断します）。",
        tutorialMarkdown: `# 📱 PDF versioning ガイド ＆ ワークフロー

このプラグインは、**Obsidian** と外部の PDF エディタをシームレスに接続します。PDF 形式のノートに注釈を書き込み、ワークフロー中に作成された複数のバージョン（バリアント）を自動的に管理できます。

---

## ❓ なぜ PDF versioning なのか？

Obsidian 内の一般的な静的 PDF とは異なり、編集可能な PDF のエクスポートまたは保存をサポートする外部エディタ（Samsung Notes, Acrobat, Drawboard など）を使用すると、ベクター形式のインクストロークが保持されるため、ノートを Obsidian にエクスポートした後でも、後から手書きの編集を再開できます。

---

## 🚀 ワークフロー 1：Human スタイル（ユニバーサル）

PC、Mac、タブレット上の一般的な PDF エディタを使用する場合は、このワークフローを使用します。

### ステップ 1：Obsidian に PDF を埋め込む
標準の Obsidian 埋め込み構文を使用して、Markdown ノートに PDF を埋め込みます：
\`\`\`markdown
![[PDFのファイル名.pdf]]
\`\`\`

### ステップ 2：PDF を開いて編集する
1. 埋め込まれた PDF ツールバーの上部に 2 つのカスタムボタンが追加されます。**鉛筆アイコン**を押してファイルを編集します。
2. ファイルはシステムのデフォルトの PDF ビューアで開きます。
3. 編集が完了したらファイルを保存します。
4. ⚠️ **重要なステップ：** 選択したバージョン命名スタイルに従って、ファイルを Obsidian フォルダ内に保存します。「Humanスタイル」の場合は、\`PDFのファイル名_Version_1.pdf\` として保存します。

### ステップ 3：バージョンの切り替えと管理
Obsidian に戻り、**レイヤーボタン**をクリックして、異なるバージョン間の切り替え、古い重複ファイルの削除、またはファイルリストの同期を行います。

---

## 🚀 ワークフロー 2：Samsung Notes スタイル（Android）

このワークフローは、Android デバイスの Samsung Notes 用に最適化されており、高精度の Sペン入力を利用できます。

### ステップ 1：Samsung Notes から編集可能な PDF としてエクスポートする
1. Samsung Notes で**ノートを作成**します。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. 右上の 3 つの点アイコンをタップして**メニューを開き**ます。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. **ファイルとして保存**を選択します。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. **PDF ファイル**を選択します。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **重要なステップ：** **Notes 互換 PDF** を選択します（これにより、後から手書きストロークを編集できるようになります）。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. Obsidian のフォルダ内に**ファイルを保存**します。
   ⚠️ **重要なステップ：** ノートの名前を変更しないでください。プラグインがバージョンを識別し、Samsung Notes の命名規則に従うために不可欠です。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### ステップ 2：Obsidian に PDF を埋め込む
Markdown ノートに PDF を追加します：
\`\`\`markdown
![[PDFのファイル名.pdf]]
\`\`\`

### ステップ 3：PDF を開いて編集する
1. **鉛筆アイコン**を押してファイルを編集します。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. 必要に応じて、Android システムのプロンプトから **Samsung Notes (PDFリーダー)** を選択します。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Samsung Notes 内の**鉛筆ボタン**をタップして、既存のベクターストロークへの書き込み oder 編集を開始します。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. 編集が完了したらファイルを保存します。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **重要なステップ：** **デフォルトの名前を変更せずに**ファイルを Obsidian 内に保存します。
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### ステップ 4：バージョンの切り替えと管理
Obsidian に戻り、**レイヤーボタン**をクリックして、異なるバージョンを表示・切り替えます。
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ フォルダ ＆ ノート設定
プラグイン設定の**ノート管理**に移動し、一括クリーンアップツールを使用します：

### 🔍 重複チェッカー
フォルダ全体をスキャンして重複する PDF バージョンを見つけます。
* **最新のみ保持：** 古いバージョンを一括削除し、ノート内のすべての埋め込みを自動的に最新のコピーに更新します。
* **プレビュー：** モバイル対応のプレビューウィンドウを開いて、PDF の内容を目視で確認します。


---

### 📱 Samsung Notes 長いファイル名統合ノート
Samsung NotesでPDFをエクスポートまたは編集する際、元のファイル名が50文字を超える場合、Samsung Notesはタイムスタンプ（例: \`_260722_114213\`）を追加する前に自動的に50文字に切り詰めます。
プラグイン設定で **「Samsung Notes 長いファイル名の修正」** オプション（スタイルがSamsungの場合に表示）を有効にすると、PDF Versioningはファイル名の最初の50文字の「安全な」文字のみを比較し、長い名前のバリアントを正しく認識してグループ化します。`
    },
    ru: {
        opening: "Открытие через PDF versioning...",
        errorOpeningPdf: "Ошибка открытия PDF: ",
        warningNotRecent: "Вы собираетесь редактировать версию, которая не является последней.",
        original: "Оригинал",
        originalBase: "Оригинал (База)",
        proceed: "Продолжить",
        noVariantFound: "Вариант не найден.",
        pdfNotFound: "PDF файл не найден.",
        scanningFolder: "Сканирование папки...",
        deleteVersion: "Удалить версию",
        removedLinkCount: "Удалена ссылка на {0} в {1} заметках.",
        updatedLinksCount: "Обновлены ссылки на {0} в {1} заметках.",
        confirmDeleteVersion: "Вы уверены, что хотите удалить версию {0}?",
        fileTrashedVault: "Файл {0} перемещен в корзину хранилища.",
        fileTrashedSystem: "Файл {0} перемещен в системную корзину.",
        fileDeletedPerm: "Файл {0} безвозвратно удален.",
        errorDeletingFile: "Ошибка удаления файла: {0}",
        errorCreatingTutorial: "Ошибка создания руководства: {0}",
        errorSourceNotFound: "Ошибка: Невозможно определить исходную заметку.",
        errorNoteFileNotFound: "Ошибка: Файл заметки не найден.",
        linkUpdatedTo: "Ссылка обновлена на: {0}",
        linkNotFoundInText: "Оригинальная ссылка не найдена в тексте.",
        settingsTitle: "Настройки PDF versioning",
        settingLangName: "Язык",
        settingLangDesc: "Выберите язык плагина.",
        settingTutorialName: "Руководство по плагину",
        settingTutorialDesc: "Создает руководство в корне хранилища и автоматически открывает его.",
        settingTutorialBtn: "Создать руководство",
        settingNoteMgmt: "Управление заметками",
        settingDupName: "Проверка дубликатов",
        settingDupDesc: "Поиск и управление PDF-файлами с несколькими версиями.",
        scanningStatus: "Сканирование...",
        scanMemory: "Сканировать память",
        scanCompleted: "Сканирование завершено.",
        scanError: "Ошибка при сканировании: ",
        vaultScanning: "Сканирование хранилища...",
        noMultiPdfFound: "PDF с несколькими версиями не найдены. Нажмите 'Сканировать память' для поиска.",
        keepNewestOnly: "Оставить только самую новую",
        confirmKeepNewest: "Вы уверены, что хотите оставить ТОЛЬКО новую версию ({0}) и удалить остальные?",
        previewBtn: "Предпросмотр",
        keepOnlyThis: "Оставить только эту",
        confirmKeepThis: "Вы уверены, что хотите оставить эту версию ({0}) и удалить остальные?",
        deleteBtn: "Удалить",
        previewTitle: "Предпросмотр: {0}",
        confirmTitle: "Подтверждение",
        cancelBtn: "Отмена",
        deleteConflictTitle: "Управление удалением связанных файлов",
        noteViewedInFiles: "Заметка, которую вы удаляете, сейчас используется в файлах:",
        whatToDo: "Что вы хотите сделать?",
        deleteEverywhere: "Удалить везде",
        replaceWithVersion: "Заменить на версию:",
        tutorialCreatedTitle: "Руководство создано",
        tutorialCreatedDesc: "Руководство успешно создано в папке 'PDF versioning guide' и открыто.",
        okBtn: "Ок",
        unsupportedDevice: "Плагин не работает: функция поддерживается только на устройствах Samsung.",
        settingVersioningStyleName: "Стиль версионирования",
        settingVersioningStyleDesc: "Выберите соглашение о наименовании, используемое для идентификации различных версий PDF-файла. \n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Стиль Samsung (двойная отметка времени)",
        versioningStyleHuman: "Стиль Human (_Version_X)",
        settingSamsungTruncateName: "Исправление длинных имен файлов Samsung Notes",
        settingSamsungTruncateDesc: "Сравнивает только первые 50 символов имени файла (Samsung Notes обрезает имя файла длиннее 50 символов перед добавлением метки времени).",
        tutorialMarkdown: `# 📱 Руководство и рабочий процесс PDF versioning

Этот плагин обеспечивает бесшовное соединение между **Obsidian** и любым внешним редактором PDF. Вы можете аннотировать свои PDF-заметки и автоматически управлять несколькими версиями (вариантами), созданными в ходе рабочего процесса.

---

## ❓ Почему именно PDF versioning?

В отличие от стандартных статических PDF внутри Obsidian, использование внешнего редактора с поддержкой экспорта или сохранения редактируемых PDF (такого как Samsung Notes, Acrobat, Drawboard и т. д.) сохраняет ваши векторные штрихи. Это означает, что вы можете экспортировать заметку в Obsidian и продолжить редактирование рукописного текста позже!

---

## 🚀 Рабочий процесс 1: Стиль Human (Универсальный)

Используйте этот рабочий процесс для любого стандартного редактора PDF на вашем ПК, Mac или планшете.

### Шаг 1: Внедрите PDF в Obsidian
Просто добавьте PDF в любую из заметок markdown с помощью стандартного синтаксиса встраивания Obsidian:
\`\`\`markdown
![[Имя_вашего_PDF.pdf]]
\`\`\`

### Шаг 2: Откройте и отредактируйте PDF
1. Вы увидите две пользовательские кнопки на панели инструментов встроенного PDF. Нажмите **иконку карандаша**, чтобы начать редактирование.
2. Файл откроется в стандартном системном приложении для чтения PDF.
3. Сохраните файл по завершении.
4. ⚠️ **КРИТИЧЕСКИЙ ШАГ:** Сохраните файл внутри хранилища Obsidian **с использованием выбранного стиля именования версий**. Для стиля «Human» сохраните его как \`Имя_вашего_PDF_Version_1.pdf\`.

### Шаг 3: Переключение и управление версиями
Вернитесь в Obsidian и нажмите **кнопку со слоями**, чтобы просмотреть версии, переключиться между ними, удалить старые дубликаты или синхронизировать список файлов.

---

## 🚀 Рабочий процесс 2: Стиль Samsung Notes (Android)

Этот рабочий процесс оптимизирован специально для Samsung Notes на устройствах Android, что позволяет использовать высокоточное перо S-Pen.

### Шаг 1: Экспорт из Samsung Notes в виде редактируемого PDF
1. **Создайте заметку** в Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. **Откройте меню**, нажав на три точки в правом верхнем углу.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. Нажмите **Сохранить как файл**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. Выберите **Файл PDF**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **КРИТИЧЕСКИЙ ШАГ:** Выберите **PDF, совместимый с заметками** (это позволит редактировать рукописные штрихи позже).
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **Сохраните файл** в папку вашего хранилища Obsidian.
   ⚠️ **КРИТИЧЕСКИЙ ШАГ:** Не изменяйте имя заметки. Это необходимо для идентификации версий плагином и соблюдения соглашений об именах Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### Шаг 2: Внедрите PDF в Obsidian
Просто добавьте PDF в любую из заметок markdown:
\`\`\`markdown
![[Имя_вашего_PDF.pdf]]
\`\`\`

### Шаг 3: Откройте и отредактируйте PDF
1. Нажмите **иконку карандаша**, чтобы начать редактирование.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. При необходимости выберите **Samsung Notes (PDF Reader)** в системном запросе Android.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Нажмите кнопку **карандаша** в Samsung Notes, чтобы начать писать или редактировать векторные штрихи.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. Сохраните файл по завершении.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **КРИТИЧЕСКИЙ ШАГ:** Сохраните файл внутри хранилища Obsidian **без изменения имени по умолчанию**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### Шаг 4: Переключение и управление версиями
Вернитесь в Obsidian и нажмите **кнопку со слоями**, чтобы просмотреть версии и переключиться между ними.
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ Настройки хранилища и заметок
Перейдите в настройки плагина в раздел **Управление заметками** для доступа к инструментам массовой очистки:

### 🔍 Поиск дубликатов
Сканирует всё хранилище на наличие дубликатов версий PDF.
* **Сохранить только последнюю:** Массово удаляет все более старые версии, автоматически обновляя все ссылки во встроенных файлах на актуальную копию.
* **Предпросмотр:** Открывает окно предварительного просмотра для визуального контроля содержимого PDF.


---

### 📱 Примечание по интеграции длинных имен файлов Samsung Notes
При экспорте или редактировании PDF в Samsung Notes, если исходное имя файла превышает 50 символов, Samsung Notes автоматически обрезает его до 50 символов перед добавлением метки времени (например, \`_260722_114213\`).
Включив параметр **"Исправление длинных имен файлов Samsung Notes"** в настройках плагина (видимый, когда выбран стиль Samsung), PDF Versioning будет сравнивать только первые 50 "безопасных" символов имен файлов, гарантируя правильное обнаружение и группировку вариантов с длинными именами.`
    },
    pt: {
        opening: "Abrindo com PDF versioning...",
        errorOpeningPdf: "Erro ao abrir PDF: ",
        warningNotRecent: "Você está prestes a editar uma versão que não é a mais recente.",
        original: "Original",
        originalBase: "Original (Base)",
        proceed: "Continuar",
        noVariantFound: "Nenhuma variante encontrada.",
        pdfNotFound: "Arquivo PDF não encontrado.",
        scanningFolder: "A varrer pasta...",
        deleteVersion: "Excluir versão",
        removedLinkCount: "Link para {0} removido em {1} notas.",
        updatedLinksCount: "Links para {0} atualizados em {1} notas.",
        confirmDeleteVersion: "Tem certeza de que deseja excluir a versão {0}?",
        fileTrashedVault: "Arquivo {0} movido para a lixeira do vault.",
        fileTrashedSystem: "Arquivo {0} movido para a lixeira do sistema.",
        fileDeletedPerm: "Arquivo {0} excluído permanentemente.",
        errorDeletingFile: "Erro ao excluir arquivo: {0}",
        errorCreatingTutorial: "Erro ao criar tutorial: {0}",
        errorSourceNotFound: "Erro: Não é possível identificar a nota de origem.",
        errorNoteFileNotFound: "Erro: Arquivo de nota não encontrado.",
        linkUpdatedTo: "Link updated to: {0}",
        linkNotFoundInText: "Não é possível encontrar o link original no texto da nota.",
        settingsTitle: "Configurações do PDF versioning",
        settingLangName: "Idioma",
        settingLangDesc: "Escolha o idioma do plugin.",
        settingTutorialName: "Tutorial do plugin",
        settingTutorialDesc: "Gera uma nota de guia na pasta principal com instruções e abre automaticamente.",
        settingTutorialBtn: "Gerar Tutorial",
        settingNoteMgmt: "Gestão de notas",
        settingDupName: "Verificação de duplicados",
        settingDupDesc: "Detete e gerencie arquivos PDF com várias versões.",
        scanningStatus: "A varrer...",
        scanMemory: "Varrer armazenamento",
        scanCompleted: "Varredura concluída.",
        scanError: "Erro durante a varredura: ",
        vaultScanning: "A varrer o vault...",
        noMultiPdfFound: "Nenhum PDF com várias versões encontrado. Clique em 'Varrer armazenamento' para pesquisar.",
        keepNewestOnly: "Manter apenas a mais recente",
        confirmKeepNewest: "Tem certeza de que deseja manter APENAS a versão mais recente ({0}) e excluir todas as outras?",
        previewBtn: "Pré-visualizar",
        keepOnlyThis: "Manter apenas esta nota",
        confirmKeepThis: "Tem certeza de que deseja manter esta versão ({0}) e excluir todas as outras?",
        deleteBtn: "Excluir",
        previewTitle: "Pré-visualização: {0}",
        confirmTitle: "Confirmação",
        cancelBtn: "Cancelar",
        deleteConflictTitle: "Gestão de Exclusão de Arquivos",
        noteViewedInFiles: "A nota que você está excluindo é exibida nos seguintes arquivos:",
        whatToDo: "O que você quer fazer?",
        deleteEverywhere: "Excluir em todos os lugares",
        replaceWithVersion: "Substituir pela versão:",
        tutorialCreatedTitle: "Tutorial Criado",
        tutorialCreatedDesc: "O Tutorial foi criado com sucesso na pasta 'PDF versioning guide' e aberto.",
        okBtn: "Ok",
        unsupportedDevice: "Não é possível usar o plugin: função suportada apenas em dispositivos Samsung.",
        settingVersioningStyleName: "Estilo de versionamento",
        settingVersioningStyleDesc: "Escolha a convenção de nomenclatura usada para identificar diferentes versões de um PDF. \n- Human: file_Version_1.pdf\n- Samsung: file_20260624_153505.pdf",
        versioningStyleSamsung: "Estilo Samsung (registro de data e hora duplo)",
        versioningStyleHuman: "Estilo Human (_Version_X)",
        settingSamsungTruncateName: "Correção de nomes longos do Samsung Notes",
        settingSamsungTruncateDesc: "Compara apenas os primeiros 50 caracteres do nome do arquivo (o Samsung Notes trunca nomes base com mais de 50 caracteres antes de adicionar a carimbo de data/hora).",
        tutorialMarkdown: `# 📱 Guia e Fluxo de trabalho de PDF versioning

Este plugin permite uma conexão contínua entre o **Obsidian** e qualquer editor de PDF externo. Você pode anotar suas notas em PDF e gerenciar automaticamente as múltiplas versões (variantes) criadas durante o seu fluxo de trabalho.

---

## ❓ Por que PDF versioning?

Ao contrário dos PDFs estáticos padrão no Obsidian, o uso de um editor externo que suporta a exportação ou salvamento de PDFs editáveis (como Samsung Notes, Acrobat, Drawboard, etc.) preserva os seus traços de tinta vetoriais, o que significa que você pode exportar uma nota para o Obsidian e continuar a editar a sua caligrafia original mais tarde!

---

## 🚀 Fluxo de trabalho 1: Estilo Human (Universal)

Use este fluxo de trabalho para qualquer editor de PDF genérico no seu PC, Mac ou tablet.

### Passo 1: Incorporar o PDF no Obsidian
Basta adicionar o PDF a qualquer uma de suas notas markdown usando a sintaxe padrão de incorporação do Obsidian:
\`\`\`markdown
![[Nome_do_seu_PDF.pdf]]
\`\`\`

### Passo 2: Abrir e editar o PDF
1. Você verá dois botões personalizados adicionados no topo da barra de ferramentas do seu PDF incorporado. Pressione o **ícone de lápis** para editar o arquivo.
2. O arquivo será aberto no leitor de PDF padrão do seu sistema.
3. Salve o arquivo quando terminar.
4. ⚠️ **PASSO CRÍTICO:** Salve o arquivo dentro do cofre (vault) do Obsidian **usando o estilo de nomenclatura de versionamento selecionado**. Para o "Estilo Human", salve-o como \`Nome_do_seu_PDF_Version_1.pdf\`.

### Passo 3: Alternar e gerenciar versões
De volta ao Obsidian, clique no **botão de camadas** para visualizar e alternar entre diferentes versões, excluir duplicatas antigas ou sincronizar a lista de arquivos.

---

## 🚀 Fluxo de trabalho 2: Estilo Samsung Notes (Android)

Este fluxo de trabalho é otimizado especificamente para o Samsung Notes em dispositivos Android, permitindo que você use a entrada de S-Pen de alta precisão.

### Passo 1: Exportar do Samsung Notes como PDF editável
1. **Crie a sua nota** no Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120614_Samsung Notes.jpg|200]]
2. **Abra o menu** tocando nos três pontos no canto superior direito.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120650_Samsung Notes.jpg|200]]
3. Toque em **Salvar como arquivo**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120752_Samsung Notes.jpg|200]]
4. Selecione **Arquivo PDF**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120849_Samsung Notes.jpg|200]]
5. ⚠️ **PASSO CRÍTICO:** Escolha **PDF compatível com Notes** (isso permite que você edite seus traços desenhados à mão mais tarde).
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120910_Samsung Notes.jpg|200]]
6. **Salve o arquivo** dentro da pasta do cofre do Obsidian.
   ⚠️ **PASSO CRÍTICO:** Não altere o nome da nota. É fundamental para o plugin identificar versões e respeitar as convenções de nomenclatura do Samsung Notes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_120958_Samsung Notes 1.jpg|200]]

### Passo 2: Incorporar o PDF no Obsidian
Basta adicionar o PDF a qualquer uma de suas notas markdown:
\`\`\`markdown
![[Nome_do_seu_PDF.pdf]]
\`\`\`

### Passo 3: Abrir e editar o PDF
1. Pressione o **ícone de lápis** para editar o arquivo.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_122947_Obsidian.jpg|400]]
2. Escolha **Samsung Notes (Leitor de PDF)** no prompt do sistema Android se solicitado.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123103_IntentResolver.jpg|400]]
3. Toque no **botão de lápis** dentro do Samsung Notes para começar a escrever ou editar os seus traços vetoriais existentes.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123156_Samsung Notes.jpg|400]]
4. Salve o arquivo quando terminar.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123226_Samsung Notes.jpg|400]]
5. ⚠️ **PASSO CRÍTICO:** Salve o arquivo dentro do cofre do Obsidian **sem alterar o nome padrão**.
   ![[PDF versioning guide/Attachments/Screenshot_20260624_123304_Samsung Notes.jpg|400]]

### Passo 4: Alternar e gerenciar versões
De volta ao Obsidian, clique no **botão de camadas** para visualizar e alternar entre diferentes versões.
![[PDF versioning guide/Attachments/Screenshot_20260624_123351_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123420_Obsidian.jpg|300]] ![[PDF versioning guide/Attachments/Screenshot_20260624_123436_Obsidian.jpg|300]]

---

## ⚙️ Configurações do Vault e Notas
Vá para as configurações do plugin em **Gestão de notas** para acessar as ferramentas de limpeza em massa:

### 🔍 Localizador de Duplicatas
Varre todo o cofre em busca de versões PDF duplicadas.
* **Manter apenas a mais recente:** Exclui em massa todas as versões mais antigas, atualizando automaticamente todas as incorporações em suas notas para apontar para a cópia mais recente.
* **Visualização:** Abre um modal de visualização compatível com dispositivos móveis para inspecionar visualmente o conteúdo do PDF.


---

### 📱 Nota de integração de nomes de arquivos longos do Samsung Notes
Ao exportar ou editar um PDF no Samsung Notes, se o nome do arquivo original exceder 50 caracteres, o Samsung Notes o truncará automaticamente para 50 caracteres antes de anexar a carimbo de data/hora (ex. \`_260722_114213\`).
Ao ativar a opção **"Correção de nomes longos do Samsung Notes"** nas configurações do plugin (visível no estilo Samsung), o PDF Versioning comparará apenas os primeiros 50 caracteres "seguros" dos nomes dos arquivos, garantindo que as variantes com nomes longos sejam detectadas e agrupadas corretamente.`
    },
};

export function getLocale(lang: string): Record<LocaleKey, string> {
    return locales[lang] || locales['en'];
}