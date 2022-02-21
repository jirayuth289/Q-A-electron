const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('answerApi', {
  handleAnswer: (callback) => ipcRenderer.on('show-answer', callback)
})

// const { ipcRenderer } = require('electron')

// window.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded');
//     ipcRenderer.on('show-answer', (_event, value) => {
//       console.log('value:', value);       
//     })
// })