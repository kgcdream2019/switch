import { app, protocol, BrowserWindow } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import MenuBuilder from './menu'
import { ipcMain } from 'electron-better-ipc'
import { autoUpdater } from 'electron-updater'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null
let winClosing = false
let shouldQuit = false

// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true } }
])

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 980,
    minHeight: 560,
    center: true,
    show: false,
    icon: path.join(__static, 'icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.once('ready-to-show', () => {
    if (win) {
      win.show()
    }
  })

  win.on('close', (event: Event) => {
    if (win && !winClosing) {
      event.preventDefault()
      winClosing = true

      ipcMain.callRenderer(win, 'before-window-close').finally(() => {
        if (win) {
          win.close()

          win = null
          winClosing = false

          if (shouldQuit) {
            app.quit()
          }
        }
      })
    }
  })

  const menuBuilder = new MenuBuilder(win)
  menuBuilder.buildMenu()

  ipcMain.answerRenderer('is-update-downloading', async () => {
    if (isDevelopment) {
      return false
    }

    const updateResult = await autoUpdater.checkForUpdatesAndNotify()

    // An update is only being performed if there's a download promise
    if (updateResult && updateResult.downloadPromise) {
      // Restart the app after download completes
      autoUpdater.on('update-downloaded', () => {
        winClosing = true
        shouldQuit = true
        autoUpdater.quitAndInstall()
      })

      // Notify the renderer process that an update download is in progress
      return JSON.parse(JSON.stringify(updateResult.updateInfo))
    }

    return false
  })
}

app.on('before-quit', () => {
  shouldQuit = true
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
