const electron = require('electron');
const { app,BrowserWindow } = electron;
const mm = require('music-metadata');
const util = require('util');

class MainWindow extends BrowserWindow {

    constructor() {
        super({
            webPreferences: {nodeIntegration: true, backgroundThrottling: false}
        });
        this.on('closed', () => app.quit());
        this.loadURL(`file://${__dirname}/main.html`);
        this.isOnItem = false;
    }



    loadFile(files) {
        if (!this.isOnItem) {
            this.loadURL(`file://${__dirname}/item.html`);
            this.isOnItem = true;


            mm.parseFile(files[0])
                .then( metadata => {
                    console.log(util.inspect(metadata, { showHidden: false, depth: null }));
                    //console.log(util.inspect(metadata.common.picture));
                    // let base64Data = metadata.common.picture[0].data;
                    // console.log(metadata.common.picture[0].data);


                    // require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
                    //    console.log(err);
                    //});
                })
                .catch( err => {
                    console.error(err.message);
                });
        }
    }
}

module.exports = MainWindow;