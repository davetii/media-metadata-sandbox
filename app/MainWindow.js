const electron = require('electron');
const { app,BrowserWindow, dialog, Menu } = electron;
const mm = require('music-metadata');
const util = require('util');

class MainWindow extends BrowserWindow {

    constructor(eventEmitter) {
        super({
            webPreferences: {nodeIntegration: true, backgroundThrottling: false}
        });
        this.loadURL(`file://${__dirname}/item.html`);

        this.menuTemplate = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Open',
                        click() {
                            dialog.showOpenDialog(this,  {
                                filters: [
                                    { name: 'Music', extensions: ['mp3', 'ogg', 'flac'] },
                                    { name: 'All Files', extensions: ['*'] }
                                ],
                                properties: ['openFile']
                            }).then(result => {
                                if (!result.canceled) {
                                    eventEmitter.emit('load-file', result.filePaths);
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    },
                    {
                        label: 'Quit',
                        accelerator : process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                        click() {
                            app.quit();
                        }
                    },
                ]
            },
            {
                label: 'View',
                submenu: [
                    { role: 'reload'},
                    {
                        label: 'Developer Tools',
                        accelerator : process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                        click(item,focusedWindow) { focusedWindow.toggleDevTools(); }
                    }
                ]
            }
        ];
        Menu.setApplicationMenu(Menu.buildFromTemplate(this.menuTemplate));
    }


}

module.exports = MainWindow;