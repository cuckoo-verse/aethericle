import { app, BrowserWindow, session, ipcMain } from "electron";
import { getPort } from "get-port-please";
import { join } from "path";
import { startServer } from "next/dist/server/lib/start-server";

let mainWindow: BrowserWindow;

const isDev = process.env.NODE_ENV === "development";

const startNextServer = async () => {
  try {
    const port = await getPort({ portRange: [30011, 50000] });
    const webDir = join(app.getAppPath(), "app");

    await startServer({
      dir: webDir,
      isDev: false,
      hostname: "localhost",
      port,
      customServer: true,
      allowRetry: false,
      keepAliveTimeout: 5000,
      minimalMode: true,
    });

    return port;
  } catch (error) {
    console.error("Error starting Next.js server:", error);
    throw error;
  }
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

  // 设置 IPC 监听器
  ipcMain.on('window-minimize', () => {
    if (mainWindow) {
      mainWindow.minimize();
      // 通知渲染进程窗口已最小化
      mainWindow.webContents.send('window-minimized-state', true);
    }
  });

  ipcMain.on('window-close', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  // 监听窗口状态变化
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