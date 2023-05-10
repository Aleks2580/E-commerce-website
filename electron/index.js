const { app, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 868,
  });

  mainWindow.loadURL('https://ali-elbrus.herokuapp.com/');

  mainWindow.once('ready-to-show', mainWindow.show);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darvin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
