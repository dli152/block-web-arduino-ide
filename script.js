let editor, fileHandle = null, isSaved = true;
let darkTheme = true;

require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs' } });
require(['vs/editor/editor.main'], function () {
    const blinkCode = `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}`;
    editor = monaco.editor.create(document.getElementById('container'), {
        value: blinkCode,
        language: 'cpp',
        theme: 'vs-dark',
        automaticLayout: true,
    });

    editor.onDidChangeModelContent(() => {
        isSaved = false;
    });
});

function toggleMenu(id) {
    document.querySelectorAll('.dropdown').forEach(menu => {
        if (menu.id !== id) menu.style.display = 'none';
    });
    const menu = document.getElementById(id);
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

window.onclick = function (e) {
    if (!e.target.closest('.menu')) {
        document.querySelectorAll('.dropdown').forEach(menu => menu.style.display = 'none');
    }
};

function newFile() {
    if (!isSaved && !confirm("You have unsaved changes. Continue anyway?")) return;
    editor.setValue('');
    fileHandle = null;
    isSaved = true;
}

document.getElementById('fileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const text = await file.text();
    editor.setValue(text);
    isSaved = true;
});

function saveFile() {
    if ('showSaveFilePicker' in window) {
        saveNative();
    } else {
        saveFallback();
    }
}

async function saveNative() {
    if (!fileHandle) {
        fileHandle = await window.showSaveFilePicker({
            suggestedName: "sketch.ino",
            types: [{ description: "Arduino Sketch", accept: { "text/plain": [".ino", ".cpp", ".c"] } }]
        });
    }
    const writable = await fileHandle.createWritable();
    await writable.write(editor.getValue());
    await writable.close();
    isSaved = true;
}

function saveFallback() {
    const blob = new Blob([editor.getValue()], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sketch.ino';
    a.click();
    URL.revokeObjectURL(a.href);
    isSaved = true;
}

function viewAction() {
    darkTheme = !darkTheme;
    monaco.editor.setTheme(darkTheme ? 'vs-dark' : 'vs');
}

function buildAction() {
    alert("no");
}

window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.altKey) {
        switch (e.key.toLowerCase()) {
            case 'n':
                e.preventDefault();
                newFile();
                break;
            case 's':
                e.preventDefault();
                saveFile();
                break;
            case 'k':
                e.preventDefault();
                buildAction();
                break;
            case 'o':
                e.preventDefault();
                document.getElementById('fileInput').click()
                break;
        }
    }
});

window.addEventListener("beforeunload", (e) => {
    if (!isSaved) {
        e.preventDefault();
        e.returnValue = '';
    }
});

window.onerror = function (msg, source, lineno, colno, error) {
    confirm(`${error}: ${msg}\n${source}\n${lineno}, ${colno}`);
}