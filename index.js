electron  = require('electron');
const {app, BrowserWindow, Menu} = electron;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click() {
                    console.log('open');
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