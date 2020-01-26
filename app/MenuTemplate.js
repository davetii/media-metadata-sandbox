const {app, dialog} = electron;

class MenuTemplate {
    constructor(mainWindow, eventEmitter) {
        this.content =
            [
                {
                    label: 'File',
                    submenu: [
                        {
                            label: 'Open',
                            click() {
                                console.log('open');
                                dialog.showOpenDialog(mainWindow,  {
                                    filters: [
                                        { name: 'Music', extensions: ['mp3', 'ogg', 'flac'] },
                                        { name: 'All Files', extensions: ['*'] }
                                    ],
                                    properties: ['openFile']
                                }).then(result => {
                                    console.log(result.canceled);
                                    console.log(result.filePaths);
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
    }


}

module.exports = MenuTemplate;