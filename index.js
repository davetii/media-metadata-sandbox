const electron  = require('electron');
const {app } = electron;
const events = require('events');
const mm = require('music-metadata');
const MainWindow = require('./app/MainWindow');

let mainWindow;
const eventEmitter = new events.EventEmitter();

app.on('ready', () => {
    mainWindow =  new MainWindow(eventEmitter);
});

eventEmitter.on('load-file', (files) => {
    mm.parseFile(files[0])
        .then( metadata => {
            metadata.common.fileName = files[0];
            if (metadata.common.picture) {
                metadata.common.imageData = metadata.common.picture[0].data;
            }
            mainWindow.webContents.send('populate-form' , metadata.common);
        })
        .catch( err => {
            console.error(err.message);
        });
});