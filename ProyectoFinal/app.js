//Desestructuracion de objetos
const {app, BrowserWindow}  =  require('electron');
const url = require('url');
const path  = require('path');
const {ipcMain} = require('electron');
const {dialog} = require('electron');
const {systemPreferences} = require('electron');
const fs = require('fs');


app.on('before-quit',  ()=> {
   console.log('Saliendo...');
});

var win;

 createWindow = () => {

    win =  new BrowserWindow({
        width: 500, 
        height: 500, 
        title: 'BeerCode',
        center: true, 
        maximizable: false, 
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
            
        }
    }); 

    //win.setBackgroundColor("#000027")
    win.setIcon(__dirname + '/imagenes/Logo.ico',)


    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol:'file',
            slashes:true
        })
    );
}


ipcMain.on('openFile', async (event, args)=> {
    
    const  chosenFile =  await dialog.showOpenDialog(win,{properties:['openFile']});
    var pathFile  =  chosenFile.filePaths[0];

    fs.readFile(pathFile,'utf8',(err, data)=> {
        if(err) {
            dialog.showMessageBox(win, {
                message:'Error al leer el archivo seleccionado',
                buttons: ['Aceptar']
            });
            return;
        }
        event.sender.send('datosarchivo',data);
    });

});




ipcMain.on('saveFile',async (event, args)=> {
  
    var path  =  await dialog.showSaveDialog(win,{properties:[]});

    fs.writeFile(path.filePath, args, (err)=> {
        if(err){
            console.log(err);
        }
    });
  
});



app.on('ready', createWindow);