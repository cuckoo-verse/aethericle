import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import type { BrowserWindowConstructorOptions } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, ...args: any[]) => {
      ipcRenderer.send(channel, ...args)
    },
    on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(channel, listener)
      return () => ipcRenderer.removeListener(channel, listener)
    }
  }
})