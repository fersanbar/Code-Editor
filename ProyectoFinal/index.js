const notifier  =  require('node-notifier');
const path  =  require('path'); 

document.getElementById('ejecutarArchivo').onclick = (event) => {
   console.log(__dirname);
   notifier.notify(
           {
               title: 'Este es mi titulo',
               message: 'Hola grupo del 311 y 312',
               sound: true, 
               wait: true 
           },
           function (err, response, metadata) {
               alert('Mensaje de la notificacion');
           });

           notifier.on('click', function (notifierObject, options, event) {
           });

           notifier.on('timeout', function (notifierObject, options) {
           });
}