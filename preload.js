const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myApi', {
    openAnswerWindow: async (questionId) => {
        const result = await ipcRenderer.invoke('window:answer', questionId);
    },
   
});

// window.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded');
//     ipcRenderer.on('event', (_event, value) => {
//       console.log('value:', value);       
//     })
// })