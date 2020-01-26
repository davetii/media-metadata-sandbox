const electron = require('electron');
const { app,BrowserWindow } = electron;

class MainWindow extends BrowserWindow {

    constructor() {
        super({
            webPreferences: {nodeIntegration: true, backgroundThrottling: false}
        });
        this.on('closed', () => app.quit());
        this.loadURL(`file://${__dirname}/main.html`);
        this.isOnItem = false;
    }



    loadFile(file) {
        if (!this.isOnItem) {
            this.loadURL(`file://${__dirname}/item.html`);
            this.isOnItem = true;
        }
    }
}

module.exports = MainWindow;