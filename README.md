# Speech2Textjg
Proyecto para prueba de ingreso José Gabriel Ortiz, uso de Speech to Text GCP

## Pasos para la ejecución del proyecto
1. Verificar que la versión instalada de Node sea >= v8.13.0 
2. Clonar el proyecto utilizando el comando
```
git clone https://github.com/joseortizd/Speech2Textjg.git
cd Speech2Textjg/Speech2TextFallabellaJG/
npm i
```
3. Antes de ejecutar el proyecto se debe incluir dentro de la ruta `Speech2TextFallabellaJG/public/jsons` el archivo de nombre **speech2textjg-1571871521725-9a51691f15f4.json** El cual va adjunto en el correo de entrega de la asignación y no fue incluido en el código fuente por motivos de seguridad y que Google los bloquea al detectarlos en repositorios públicos.
4. Ejecutar pruebas antes de ejecutar el proyecto para verificar su correcta instalción y que no tenga problemas de ejecución. 
```
npm test
```
5. En caso que las pruebas hayan sido exitósas la aplicación está lista para ser ejecutada, para ello ejecutar:
```
npm start
```
6. Para probar el servicio utilizar algún cliente REST, creando una petición POST, acá la documentación del endpoint:
[Documentación](https://speech2textjg.docs.apiary.io/).

## Extra
De acuerdo a lo solicitado el proyecto se encuentra ejecutándose en GCP a través de APP Engine. La URL pública es la siguiente: https://speech2textjg-1571871521725.appspot.com/
 