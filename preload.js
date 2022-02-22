const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myApi', {
    openAnswerWindow: async (questionId) => {
        const result = await ipcRenderer.invoke('window:answer', questionId);
    },
    getQuestion: () => ipcRenderer.invoke('service:question')
});