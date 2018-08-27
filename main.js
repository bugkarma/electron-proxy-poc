const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

// Set up the app
app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 840, height: 600})
  mainWindow.loadFile('index.html');
  mainWindow.webContents.session.clearStorageData();
  mainWindow.on('closed', () => { mainWindow = null; })
});
app.on('window-all-closed', () => app.quit());
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});


// Listen for updateProxy message from renderer process
ipcMain.on('updateProxy', (evt, proxySettings, requestURL) => {
  if (!proxySettings) {
      // Setting the proxyRules to an empty string seems to reset the proxy
      mainWindow.webContents.session.setProxy({ proxyRules: '' }, () => {
        console.log('Unsetting proxy');
      });
      return;
  }

  const { hostname, type, port, id, password } = proxySettings;

  // Concatenate proxy URL from settings
  let url = `${type.toLowerCase()}://`;
  if (id && password) url += `${id}:${password}@`;
  url += hostname;
  if (port) url += `:${port}`;

  mainWindow.webContents.session.setProxy({ proxyRules: url }, () => {
      console.log(`Proxying http requests through ${url}`);
  });
});
