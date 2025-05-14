import { app, BrowserWindow, session, ipcMain, shell } from "electron";
import { getPort } from "get-port-please";
import { join } from "path";
import { fork } from "child_process";

let nextServerProcess: any;
let mainWindow: BrowserWindow;

const isDev = process.env.NODE_ENV === "development";

const startNextServer = async () => {
  const port = await getPort({ portRange: [30011, 50000] });
  const nextBuildDir = join(__dirname, "../.next/standalone");
  const nextServerPath = join(nextBuildDir, "server.js");

  nextServerProcess = fork(nextServerPath, ["-p", port.toString()], {
    cwd: nextBuildDir,
  });

  return port;
};

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
      preload: join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    ...options
  });

  window.on('ready-to-show', () => {
    window.show();
  });

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders["X-Electron"] = "true";
    callback({ requestHeaders: details.requestHeaders });
  });

  return window;
};

app.whenReady().then(async () => {
  mainWindow = await createWindow();

  if (isDev) {
    await mainWindow.loadURL("http://localhost:3000");
  } else {
    const port = await startNextServer();
    await mainWindow.loadURL(`http://localhost:${port}`);
  }

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