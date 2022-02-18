const electron = require('electron')
const path = require('path')
// BrowserWindow Instance is a part of the Main Process,
// To fetch its instance from the Main Process,
// Use electron.remote
const BrowserWindow = electron.remote.BrowserWindow

var update = document.getElementById('value');
var button = document.getElementById('new');

button.addEventListener('click', function (event) {
	// Linking to new-window.html
	const newPath = path.join('file://', __dirname, 'new-window.html');
	let win = new BrowserWindow({
		// To display the Default Frame of the Window
		// consisting of default Menu
		frame: true,
		
		// Makes the Renderer Window Sticky,
		// Will always stay on top despite focus change
		alwaysOnTop: true,
		width: 600,
		height: 400,
		webPreferences: {
			nodeIntegration: true
		}
	});

// Destroy the BrowserWindow Instance on close
	win.on('close', function () {
		win = null;
	});

	// win.webContents.openDevTools();
	win.loadURL(newPath);
	win.show();
});

