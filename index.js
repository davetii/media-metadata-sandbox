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
            metadata.common.fileName = files[0];
            if (metadata.common.picture) {
                let base64data =metadata.common.picture[0].data.toString('base64');
                metadata.common.imageContent = 'data:image/png;base64, ' +  base64data;
            }
            mainWindow.webContents.send('populate-form' , metadata.common);
        })
        .catch( err => {
            console.error(err.message);
        });
});