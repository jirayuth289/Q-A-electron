const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // },
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        show: false,
    })

    mainWindow.loadFile('index.html');

    mainWindow.maximize();
    mainWindow.show();
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Function to create child window of parent one
function createChildWindow() {
    let childWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        modal: true,
        show: false,
        parent: mainWindow, // Make sure to add parent window here

        // Make sure to add webPreferences with below configuration
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    // Child window loads settings.html file
    childWindow.loadFile("answer.html");

    childWindow.once("ready-to-show", () => {
        childWindow.show();
    });
}

ipcMain.on("openChildWindow", (event, arg) => {
    createChildWindow();
});