electron  = require('electron');
const {app, Menu, dialog, ipcMain, ipcRenderer  } = electron;
const events = require('events');
const MainWindow = require('./app/MainWindow');
const MenuContent = require('./app/MenuContent');

let mainWindow;
const eventEmitter = new events.EventEmitter();

app.on('ready', () => {
    mainWindow =  new MainWindow();
    Menu.setApplicationMenu(Menu.buildFromTemplate(new MenuContent(mainWindow, eventEmitter).content));
});

eventEmitter.on('load-file', (files) => {
    mainWindow.loadFile(files);
});