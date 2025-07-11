import { app, BrowserWindow, session, ipcMain } from "electron";
import { join } from "path";

let mainWindow: BrowserWindow;

const isDev = process.env.NODE_ENV === "development";



const createWindow = async (options: Electron.BrowserWindowConstructorOptions = {}) => {
  const window = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1280,
    minHeight: 720,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)',
      height: 64,
      symbolColor: 'white'
    },
    webPreferences: {
      preload: join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    ...options
  });

  window.on('ready-to-show', () => {
    window.show();
  });

  return window;
};

app.whenReady().then(async () => {
  mainWindow = await createWindow();

  if (isDev) {
    await mainWindow.loadURL("http://localhost:3000");
  } else {
    await mainWindow.loadURL("https://aethericle.choneas.com");
  }

  ipcMain.on('window-minimize', () => {
    if (mainWindow) {
      mainWindow.minimize();
      mainWindow.webContents.send('window-minimized-state', true);
    }
  });

  ipcMain.on('window-close', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  mainWindow.on('minimize', () => {
    if (mainWindow) {
      mainWindow.webContents.send('window-minimized-state', true);
    }
  });

  mainWindow.on('restore', () => {
    if (mainWindow) {
      mainWindow.webContents.send('window-minimized-state', false);
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = await createWindow();
    }
  });
});