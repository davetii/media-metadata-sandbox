electron  = require('electron');
const {app, Menu, dialog, ipcMain, ipcRenderer  } = electron;
const events = require('events');
const MainWindow = require('./app/MainWindow');
const MenuTemplate = require('./app/MenuTemplate');
let mainWindow;
let menuTemplate;
const eventEmitter = new events.EventEmitter();

app.on('ready', () => {
    mainWindow =  new MainWindow();
    menuTemplate = new MenuTemplate(mainWindow, eventEmitter);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate.content));
});

eventEmitter.on('load-file', (files) => {
    mainWindow.loadFile(files);
});