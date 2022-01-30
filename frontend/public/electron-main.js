const path = require('path');

const {app, BrowserWindow, Menu} = require('electron');
const isDev = require('electron-is-dev');

let kill = require('tree-kill');


Menu.setApplicationMenu(null)

function createWindow() {

    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            defaultEncoding: 'UTF-8'
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    if (isDev) {
        win.webContents.openDevTools({mode: 'detach'});
    }

    win.on('closed', function () {
        kill(child.pid);
        win = null
    });
}

let jarPath = app.getAppPath() + '\\backendApp.jar';
console.log(jarPath)
let child = require('child_process').spawn(
    'java', ['-jar', jarPath, '']);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});