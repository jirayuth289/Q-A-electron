const { app, BrowserWindow, ipcMain, net } = require('electron');
const path = require('path');

const { getQuestionService, getAnswerByQuestionIdService } = require('./src/service')


function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1280,
        height: 760,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload'),
        }
    })

    // and load the index.html of the app.
    win.loadFile(path.join(__dirname, 'src', 'index.html'))

    // Open the DevTools.
    // win.webContents.openDevTools();

    //Quit app when main BrowserWindow Instance is closed
    win.on('closed', function () {
        app.quit();
    });
}

const openAnswerWindow = (event, questionId) => {
    let answerWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'src', 'preload-answer.js'),
        },
    });

    // answerWindow.webContents.openDevTools();
    answerWindow.loadFile(path.join(__dirname, 'src', 'answer.html'));

    //Destroy the BrowserWindow Instance on close
    answerWindow.on('close', function () {
        answerWindow = null;
    });

    answerWindow.webContents.on('did-finish-load', async () => {
        if (!answerWindow) {
            throw new Error('"answerWindow" is not defined');
        }
        try {
            const result = await getAnswerByQuestionIdService(questionId);

            answerWindow.show();
            answerWindow.webContents.send('show-answer', result.answer);
        } catch (error) {
            throw error;
        }
    });

    return { questionId }
}

// This method will be called when the Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    createWindow();

    ipcMain.handle('window:answer', openAnswerWindow);
    ipcMain.handle('service:question', (ev) => getQuestionService())
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

