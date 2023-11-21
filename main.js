// main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      // Electron Printing Enable
      enableBlinkFeatures: "PrintPreview",
      // Enable popups for print preview
      nativeWindowOpen: true,
      webSecurity: false
    },
  });
  mainWindow.maximize();
  // Load your Next.js application
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(
          __dirname,
          "build",
          "server",
          "pages",
          "index.html"
        )}`
  ); 
  
  // Print Preview
  mainWindow.webContents.on("before-print", (event) => {
    // Code to show print preview dialog
    event.preventDefault(); // Prevent default print behavior
    mainWindow.webContents.print({
      silent: false,
      printBackground: true,
      deviceName: "",
    });
  });

  // Disable window resize on double-click title bar
  mainWindow.on("maximize", (event) => {
    event.preventDefault();
  });
});
