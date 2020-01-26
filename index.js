const electron  = require('electron');
const {app } = electron;
const events = require('events');
const mm = require('music-metadata');
const util = require('util');
const MainWindow = require('./app/MainWindow');

let mainWindow;
const eventEmitter = new events.EventEmitter();

app.on('ready', () => {
    mainWindow =  new MainWindow(eventEmitter);
});

eventEmitter.on('load-file', (files) => {
    console.log('load-file');
    console.log(files);
    mm.parseFile(files[0])
        .then( metadata => {
            console.log(util.inspect(metadata.common));
            metadata.common.fileName = files[0];
            mainWindow.webContents.send('populate-form' , metadata.common);
        })
        .catch( err => {
            console.error(err.message);
        });
});