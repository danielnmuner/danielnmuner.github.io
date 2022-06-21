## Fundamentos Apps Script👨‍💻
[Apps Script](https://www.youtube.com/playlist?list=PLG1qdjD__qH4dyXq4sM03Rf0RFhB_4tbm)
Powered by: Aula en la nube
[Apps Script Fundamentos](https://www.youtube.com/playlist?list=PLFVYPW43NcuzRignaoqLX1BBoNmN-cVQV)
Powered By: Mozart Alberto García de Haro
#### Indice
#### Basic Module
- [Crear y abrir documentos en Google DOCS](#crear-y-abrir-documentos-en-google-docs)
- [Condiciones](#condiciones)
- [Bucle](#bucle)
- [Bucle FOR IN y análisis de atributos](#bucle-for-in-y-análisis-de-atributos)
- [Crear funciones con parámetros y menú personalizado](#crear-funciones-con-parámetros-y-menú-personalizado)
- [Crear formulario HTML en Google Docs](#crear-formulario-html-en-google-docs)   
- [Crear tablas personalizadas con formulario HTML](#crear-tablas-personalizadas-con-formulario-html)
- [Combinar correspondencia en Google Docs](#combinar-correspondencia-en-google-docs)
- [Combinar correspondencia múltiple](#combinar-correspondencia-múltiple)
- [Añadir ventana de verificación sobre combinar correspondencia](#añadir-ventana-de-verificación-sobre-combinar-correspondencia)
- [Añadiendo casillas de verificación](#añadiendo-casillas-de-verificación)
- [Generar PDF a partir de un documento de Google](#generar-pdf-a-partir-de-un-documento-de-google)
- [Crear carpetas y mover archivos](#crear-carpetas-y-mover-archivos)
- [Mejorando función combinar correspondencia](#eejora-do-func-ón-combinar--orr-pdf-dencia)
- [Enviar correos electrónicos con PDF adjunto](#enviar-correos-electrónicos-con-pdf-adjunto)
- [Funciones personalizadas en Google Sheets](#funciones-personalizadas-en-google-sheets)
- [Bucle FOR Doble sobre un rango de celdas en Google Sheets](#bucle-for-doble-sobre-un-rango-de-celdas-en-google-sheets)
- [Bucle FOR IN Doble sobre un rango de celdas](#bucle-for-in-doble-sobre-un-rango-de-celdas)
- [Bucle FOREACH Doble sobre un rango de celdas](#bucle-foreach-doble-sobre-un-rango-de-celdas)
- [Función MAP para manipular matrices y arrays](#función-map-para-manipular-matrices-y-arrays)
- [Función REDUCE para analizar matrices y arrays](#función-reduce-para-analizar-matrices-y-arrays)
- [Función FILTER sobre rango de celdas](#función-filter-sobre-rango-de-celdas)
- [Funciones con varios parámetros](#funciones-con-varios-parámetros)
- [Crear Barra lateral en Google Sheets](#Crear Barra lateral en Google-sheets)
- [Crear Barra lateral en Google Sheets](#crear-barra-lateral-en-google-sheets)


## Installar Google Apps Script
1. Google Apps Script and open it then start scripting. Also get access from Goolge Drive

## Crear y abrir documentos en Google DOCS   

*[Indice](#indice)*
1. Creacion de un Documento en Blanco en Google Docs
```js
function CrearDcumento() {
  DocumentApp.create('Data Analyst')
//Listo Creamos un Docs al Ejecutar la funcion. 
}
```
2. Para guardar el documento y manipularlo lo debemos guardar en una variable. El objetivo es poder acceder a metodos, a diferetes niveles de profundidad y que el codigo sea legible realemten podemos colocar una cadena de metodos sin afectar el funcionamiento del codigo.

```js
function CrearDcumento() {
 var documento = DocumentApp.create('Data Analyst')
 var documento_body= documento.getBody()
 documento_body.appendParagraph('Escribiendo en Docs Creado desde Apps Script')
//La legibilidad no es la mejor: 
documento.getBody().appendParagraph('Text')
}
```
3. Escribir sobre un Documento Existente. Los Docs normalmente tienen un Id el cual podemos extraer desde la URL del documento de Google.
```js 
function OpenDocumento() {
  var documento = DocumentApp.openById('Id')
  documento.getBody().appendParagraph('Text')
}
```
## Condiciones   

*[Indice](#indice)*

```js
function ModificarFormato() {

Logger.log('Imprime Texto en pantalla');

//Buscamos el documento a partir de su Id
//Accedemos al cuerpo del documento, luego al parrafo
//El parrafo un elemento tipo lista y lo accedemos a partir de getText()
  var documento = DocumentApp.openById('1S9s6tjqJapx7BL2fnxzsWRwjNmS3UoGgrCINLqYjRMQ');
  var parrafo = documento.getBody().getParagraphs();


//If: Si la condicion se cumple usamos setText() para modificar el parrafo[0]
if (parrafo[0].getText() == 'Hola Data Analyst Jr. ') parrafo[0].setText('Soy Data Scientist');

//If/Else: Alineamos a la Izquierda si se encuentra a la derecha y viceversa
if (parrafo[0].isLeftToRight) 
  parrafo[0].setLeftToRight(false);
else
  parrafo[0].setLeftToRight(true);


//If/Else If/Else: Obtiene el numero de espacios despues del parrafo señalado, a partir de ese numero
//modifica la cantidad de espacios si se cumple alguna de la condiciones indicadas.
if (parrafo[0].getSpacingAfter()==null)
  parrafo[0].setSpacingAfter(10);
else if (parrafo[0].getSpacingAfter()==10)
  parrafo[0].setSpacingAfter(20);
else if (parrafo[0].getSpacingAfter()==20)
  parrafo[0].setSpacingAfter(30);  
else
  parrafo[0].setSpacingAfter(null);

}
```
## Bucle   

*[Indice](#indice)*
A continuaciones aplicaremos loops en documentos, pero para eso debemos abrir el Documento sobre el que se escribira en la ejecucion del bucle.
1. Inicializamos `contador`, definimos una condicion a partir de contador e incrementamos `contador++`.
2. En cada ejecucion usamos `appendParagraph()` para escribir sobre el documento. 

- **While Loop**
```js
function CrearLoopParagraphs(){
  var documento = DocumentApp.openById('1S9s6tjqJapx7BL2fnxzsWRwjNmS3UoGgrCINLqYjRMQ');
  var contador = 0;
  while(contador<100){
    documento.getBody().appendParagraph(contador+' Data Analysis is the Future')
    contador++;
  }
}
```
- **For Loop**
```js
function CrearLoopParagraphs(){
  var documento = DocumentApp.openById('1S9s6tjqJapx7BL2fnxzsWRwjNmS3UoGgrCINLqYjRMQ');

  for(var contador = 0;contador < 100;contador++)
    {
      documento.getBody().appendParagraph(contador+' Data Analysis is the Future');
    }
}
```
- **While Loop/Condicional**
```js
function ChangeDocThruLoop(){
  var documento = DocumentApp.openById('1S9s6tjqJapx7BL2fnxzsWRwjNmS3UoGgrCINLqYjRMQ');
  var parrafo = documento.getBody().getParagraphs();
  var contador = 0;
  while(contador < parrafo.length){
  var thisparagraph = parrafo[contador].getText();
//Se modifica el parrafo si la condicion se cumple.
    if (thisparagraph =='2 Data Analysis is the Future'){
      parrafo[contador].setText('Analysis is the Future');
    }
    contador++;
  }
}
```

## Bucle FOR IN y análisis de atributos   
*[Indice](#indice)*

Este codigo ademas de usar `For In` similar a `For Each` utilizar metodos que hacen que un vector se convierta en otro vector y ademas se modifique a partir de sus atributos. 
```js
function AnalizarParrafos(){
  var doc = DocumentApp.openById('1S9s6tjqJapx7BL2fnxzsWRwjNmS3UoGgrCINLqYjRMQ');

//Acedemos al texto a partir de getParagraphs()
  var parrafos = doc.getBody().getParagraphs();
//Inicializamos el tamaño del texto
  var size = 10;

//Analizar cada parrafo por separado.
  for(var parrafo in parrafos){
//Crear un vector con los attributos del parrafo
    var paragraphattrs = parrafos[parrafo].getAttributes();
//Recorrer el vector y validar los condicionales
    for(var paragraphattr in paragraphattrs){
//Si este en BOLD entonces retiramos ese atributo
      if (paragraphattr == 'BOLD' && paragraphattrs[paragraphattr] == true){
        parrafos[parrafo].setAttributes({'BOLD':false});
      }
      if (paragraphattr == 'FOREGROUD_COLOR' && paragraphattrs[paragraphattr] != null){
        parrafos[parrafo].setAttributes({'FOREGROUD_COLOR':'#00ffff','FOND_SIZE':size++});
      }
    }
  }
}
```

## Crear funciones con parámetros y menú personalizado   
*[Indice](#indice)*   

La funcion `onOpen` recibe este nombre por comvension para la creacion de un menu en el panel de herramientas de google Docs
```js
function onOpen(){
//createMenu('name_nav_menu') Es el nombre que tendra la nueva opcion del panel
  DocumentApp.getUi().createMenu('Options')
//addItem('name_option','name_function') No solo el nombre de la opcion sino que funcion desencadena.
  .addItem('Direct','CreateParagraph')
  .addItem('Promt','PromptWindow')
  .addToUi();
}
```
![image](https://user-images.githubusercontent.com/60556632/174460372-a7fd2c75-876e-4346-84b2-66ba13526444.png)   

La funcion `CreateParagraph()` simplemente accede al documento activo, reemplaza todo lo que pueda haber en `getBody()` por un texto y luego del texto un bucle `For` escribe varias veces sobre el documento 
```js
function CreateParagraph(){
//Debido a que el codigo se encuentra enlazado al Documento solo es suficiente
//el metodo getActiveDocument()
  var documento =  DocumentApp.getActiveDocument();
  documento.getBody().setText('Aqui Inicial el Bucle: ')
  for(var contador = 0; contador < 5;contador++){
    documento.getBody().appendParagraph('Texto Creado a partir de un Loop en Apps Script \n')
  }
}
```
![image](https://user-images.githubusercontent.com/60556632/174460385-8c74495d-2bb2-4dab-9761-d48286afc94f.png)    

La funcion `PromptWindow()` hace exactamente lo mismo sin embargo le pregunta el texto al usuario y le da opciones para aceptar o cancelar la ejecucion de la funcion. 

1. Acedemos al metodo de `interfaz de usuario` del docuemento en general y luego le indicamos que queremos crear una ventana emergente `prompt`.
2. Almacenamos la respuesta del usuario en `button -> Button.CANCEL|Button.OK`. Y en texto respectivamente.
3. Usamos la infomacion de `button` para establecer la condicion y usamos `text` para indicar que se debe escribir en el documento.
```js
function PromptWindow(){
  var ui =  DocumentApp.getUi();
  var ventana = ui.prompt('Nombre de Ventana Emergente','Informacion hacerca de la Ventana',ui.ButtonSet.OK_CANCEL);
  var button = ventana.getSelectedButton();
  var text = ventana.getResponseText();

  if(button == ui.Button.OK){
    var documento =  DocumentApp.getActiveDocument();
    documento.getBody().setText('Aqui Inicial el Bucle: ')
    for(var contador = 0; contador < 5;contador++){
      documento.getBody().appendParagraph(text)
    }
  }

  else if (button == ui.Button.CANCEL){
    ui.alert('Cancelaste la Operacion, intenta nuevamente')
  }
}
```
## Crear formulario HTML en Google Docs
*[Indice](#indice)* 

1. Creamos un formulario usando HTML y luego usamos JavaScript para llamar la funcion de Apps Script y pasarle lo argumentos obtenidos a partir del formulario.
```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
  </head>
  <body>
    <label>Cuantos Parrafos?</label>
    <input type="number" id="cantidad"><br>

    <label>Introduce el contenido de Parrafos</label>
    <input type="text" id="frase"><br>

    <label>Introduce el Color</label>
    <input type="color" id="colores"><br>

    <label>Fecha</label>
    <input type="date" id="fecha"><br>

    <button type="button" onclick="GetInfoForm()">Escribir Documento</button>

  <script>
    function GetInfoForm(){
      var texto = document.getElementById('frase').value;
      var number = document.getElementById('cantidad').value;
      var colores = document.getElementById('colores').value;
      var fecha = document.getElementById('fecha').value;

      google.script.run.OpenFromJS(texto,number,colores,fecha)
      google.script.host.close(); 
    }
  </script>
  </body>
</html>
```   
![image](https://user-images.githubusercontent.com/60556632/174464563-c9faac74-fc00-44fb-874f-9b2fb5bf32ff.png)

2. Creamos un menu facil de acceder desde Google Docs
```js
function onOpen(){
//createMenu('name_nav_menu') Es el nombre que tendra la nueva opcion del panel
  DocumentApp.getUi().createMenu('Options')
//addItem('name_option','name_function') No solo el nombre de la opcion sino que funcion desencadena.
  .addItem('Form HTML','OpenForm')
  .addToUi();
}
```
3. La primera funcion a Ejecutar es aquella que abre el archivo HTML

```js
//La funcion `OpenForm()` abre al formulario y es la funcion desencadenada por el menu de herramientas
function OpenForm(){
//Me permite crear un HTML a partir de un archivo
  var html = HtmlService.createHtmlOutputFromFile('index.html')
  .setWidth(1000)
  .setHeight(700)

//Usado para proteger a los usuarios de HTML malicioso o JS 
//y que se ejecuta en un Sandbox que impone restricciones al codigo.
  .setSandboxMode(HtmlService.SandboxMode.IFRAME)
  DocumentApp.getUi().showModalDialog(html,'Name');
}
```
4. Luego de abrir el formulario, el usuario ingresara la informacion y esta sera recolectada a travez de JavaScript para pasar los argumentos a la siguiente funcion. 

```js
function OpenFromJS(texto,numero,color,fecha){
  var documento = DocumentApp.getActiveDocument();
  documento.getBody().clear();
  documento.getBody().setAttributes({'FOREGROUND_COLOR':color});
  var title = documento.getBody().insertParagraph(0,'Darn Good Title')
  title.setHeading(DocumentApp.ParagraphHeading.HEADING1);

  for(var contador = 0;contador<numero;contador++){
    var paraph = documento.getBody().appendParagraph(texto);
  }

  documento.addFooter();
  var footer = documento.getFooter().appendParagraph('Modified on: '+fecha);
  footer.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
}
```

## Crear tablas personalizadas con formulario HTML   
*[Indice](#indice)* 

En esta seccion se explica como crear una tabla en Google Docs. El usuario indica filas, columnas y que colores debe tener el encabezado y el cuerpo de la tabla. El proceso de ejecucion involucra una interfaz de usuario creada a partir de **HTML**, **CSS** y **JavaScript** la cual se comunica con **Apps Script** y ejecuta la logica de la creacion de la tabla en este lenguage.

1. Creamos un menu `Options` en Google Docs con la opcion `Insert Table`.   

![image](https://user-images.githubusercontent.com/60556632/174496903-8fb27843-cf90-43ba-afa6-5eefdf974e27.png)

```js
function onOpen(){
  DocumentApp.getUi().createMenu('Options')
  .addItem('Form HTML','OpenForm')
  .addItem('Insert Table','OpenCreateTable')
  .addToUi();
}
```
2. La opcion `Insert Table` activa la funcion `OpenCreateTable()` que se encarga de abrir el archivo **HTML**.

```js
function OpenCreateTable(){
  var html = HtmlService.createHtmlOutputFromFile('table.html')
  .setWidth(1000)
  .setHeight(700)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME)
  DocumentApp.getUi().showModalDialog(html,'Este Codigo nos Permite insertar tablas en el Documento');   
}
```
  - Usamos Bootstrap y le damos estilo al HTML. 

```html
<!DOCTYPE html>
<html>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>

<style>
.contenedor{
  display:flex;
  text-align:right;
  justify-content:space-around;
  flex-direction:row;
  flex-wrap: wrap;
  fond-size:large;
  border-radius: 5px;
  padding:50px;
  margin:40px;
  width: 80%;
  background-color:rgb(243,247,255);
  box-shadow:0px 2px 2px #aaaaaa;
}
.caja{
  line-height:50px;
}
</style>
```
- Creamos el formulario en **HTML** 

![image](https://user-images.githubusercontent.com/60556632/174497210-6ec01137-a359-4bd0-8584-5dc4d9d8de79.png)

```html
<head>
  <base target="_top">
</head>
<body>
  <div class="contenedor">
    <div class="caja">
      <label>Introduce la cantidad de Filas</label>
      <input type="range" id="filas" min="1" max="20" step="1" value="5">
      <output class="filas-output"></output><br>

      <label>Introduce la cantidad de Columnas</label>
      <input type="range" id="columnas" min="1" max="20" step="1" value="5">
      <output class="columnas-output"></output><br>

      <label>Introduce el Color Enabezado</label>
      <input type="color" id="colorE"><br>

      <label>Introduce el Color Par</label>
      <input type="color" id="colorP"><br>

      <label>Introduce el Color Impar</label>
      <input type="color" id="colorI"><br>

      <center><button type="button" class="btn btn-outline-primary" onclick="CrearTable()">Crear Tabla</button></center>

    </div>
  </div>
```
  - Capturamos los datos del Usuario usando **JS**
```js
<script>
    function CrearTable(){
      var rows = document.getElementById('filas').value;
      var columns = document.getElementById('columnas').value;
      var colorE = document.getElementById('colorE').value;
      var colorP = document.getElementById('colorP').value;
      var colorI = document.getElementById('colorI').value;
      google.script.run.ParamsTable(rows,columns,colorE,colorP,colorI);
      google.script.host.close(); 
    }
```
- Esta parte del codigo solo se encarga de mostrar el usuario el valor correspondiente a los `<input>` tipo `rage`.

```js
   //Indica el Id del objeto que se esta consultando
    const numRows = document.querySelector('#filas');
    //Indica la clase del Objeto donde se va a mostrar el # de rows
    const outRows = document.querySelector('.filas-output');
    //Se coloca para mostrar el valor inicial addEventListener() no lo muestra a menos que cambie.
    outRows.textContent =  numRows.value;
    //Obtiene y Actualiza constatemente outRows que es igual a numRows.value
    numRows.addEventListener('input',function(){outRows.textContent =  numRows.value;})

    const numCols = document.querySelector('#columnas');
    const outCols = document.querySelector('.columnas-output');
    outCols.textContent =  numCols.value;
    numCols.addEventListener('input',function(){outCols.textContent =  numCols.value;})


  </script>
  </body>
</html>
```
3. Creamos una funcion en Apps Script que se encarga de crear la tabla segun los parametros indicados por el usuario.

```js
function ParamsTable(rows,columns,colorE,colorP,colorI){

  var documento =  DocumentApp.getActiveDocument().getBody();

  var styleDocP = {};
  styleDocP[DocumentApp.Attribute.BACKGROUND_COLOR] = colorP;

  var styleDocE = {};
  styleDocE[DocumentApp.Attribute.BACKGROUND_COLOR] = colorE;
  styleDocE[DocumentApp.Attribute.BOLD] = true

  var styleDocI = {};
  styleDocI[DocumentApp.Attribute.BACKGROUND_COLOR] = colorI;

  var createTable =  documento.appendTable();
  var fila;
  var celda;
  for(var i=0;i<rows;i++){
    fila = createTable.appendTableRow();
    for(var j=0;j<columns;j++){
      celda = fila.appendTableCell('Celda '+j)
      if (i==0) celda.setAttributes(styleDocE);
      else if (i%2 == 0) celda.setAttributes(styleDocP);
      else celda.setAttributes(styleDocI);
    }
  }
}
```
![image](https://user-images.githubusercontent.com/60556632/174497243-41a114b6-0c1f-4431-9765-3ea5678f3ae3.png)

## Combinar correspondencia en Google Docs
*[Indice](#indice)*

A continuacion se muestra como podemos crear documentos personalizables a partir de los parametros indicados por el usuario los cuales fueron previamente asignados a una variable la cual se reemplazara en el documento.

1. Creamos una platilla y colocamos las variables `<<variable>>`.   

![image](https://user-images.githubusercontent.com/60556632/174512603-3dc17c6d-f89d-43b2-b0d1-d9a3507c07de.png)

2. Creamos el menu de `Google Docs` para que el usuario intereacture con la funcion.    
![image](https://user-images.githubusercontent.com/60556632/174512658-cd38de2f-9027-4837-959a-2e87a1c24b2d.png)

3. Abrimos el HTML usando `HtmlService.createHtmlOutputFromFile` como se ha hecho anteriormente.   
![image](https://user-images.githubusercontent.com/60556632/174512767-95d07ee8-8f9e-4614-9211-a4390ee5c428.png)

4. La funcion principal `CreateCertificate()` crea un nuevo **Documento** y luego reemplaza las variables `<<>>` en el texto, asi podemos utilizar la plantilla un numero ilimitado de veces y crear tantos documentos como queramos. 
```js
function CreateCertificate(curso,plataforma,funcion){

  var idCurrentDoc =  DocumentApp.getActiveDocument().getId();
  var currentDoc = DriveApp.getFileById(idCurrentDoc)

//Creamos un nuevo documento, si no lo hacemos perderemos la plantilla
  var newDoc= currentDoc.makeCopy('Curso: '+curso)
  var documento = DocumentApp.openById(newDoc.getId());

//Obtenemos la fecha en la que se creo el Certificado
  var date = new Date();
  var mes = date.getMonth();
  var day = date.getDate();
  var year = date.getFullYear();

//La funcion switch pemite reemplazar el mes numerico a tipo texto
  switch(mes){
    case 0: mes = 'Enero'; break;
    case 1: mes = 'Febrero'; break;
    case 2: mes = 'Marzo'; break;
    case 3: mes = 'Abril'; break;
    case 4: mes = 'Mayo'; break;
    case 5: mes = 'Junio'; break;
    case 6: mes = 'Julio'; break;
    case 7: mes = 'Agosto'; break;
    case 8: mes = 'Septiembre'; break;
    case 9: mes = 'Octubre'; break;
    case 10: mes = 'Noviembre'; break;
    case 11: mes = 'Diciembre'; break;
  }

//Reemplazamos las variables <<>> en el texto por aquellas ingresadas por el usuario.
  var certyDate = 'Certificado Emitido el dia '+day+' de '+mes+' de '+year;
  documento.getBody().replaceText('<<curso>>',curso);
  documento.getBody().replaceText('<<plataforma>>',plataforma);
  documento.getBody().replaceText('<<funcion>>',funcion);
  documento.getBody().replaceText('<<fecha>>',certyDate);
}
```
![image](https://user-images.githubusercontent.com/60556632/174513478-a463c626-6017-428f-adc6-f71bb63d6828.png)

## Combinar correspondencia múltiple    
*[Indice](#indice)*   
A diferencia del codigo anterior(HTML Form) ahora utilizamos **Google Sheets** para crear varios documentos.
1. Como no usamos **HTML** no necesitamos funciones adicionales para abrir **HTML** que luego le pasa los datos a **JavaScript** y luego se los pasa a **Apps Script**. Nada de lo anterior, solo creamos del codigo **Apps Script** desde **Spread Sheet**, creamos una funcion que se conecta con el documento platilla que recibe los datos desde filas y columnas y que se ejecuta en un bucle hasta que no encuentra mas filas.

2. Creamos la tabla que contiene la informacion que se colocara en el Documento ademas de un boton que al hacer click desencadenara la funcion.    
![image](https://user-images.githubusercontent.com/60556632/174523324-c1970d0d-3fe8-47d0-887b-a0295009dd02.png)    

3. `row` indica desde que fila iniciamos, `nameCel` es el nombre de la celda donde iniciamos, `currentSheet` se conecta con el Spread Sheet y finalmente `currentCel` se ubica en el rango señalado `nameCel` usando la funcion `getRange(nameCel)` 
```js
//Nos conectamos al documento donde se encuentra la plantilla utilizando su Id
  var currentDoc = DriveApp.getFileById('1U0WAP6dFPRYfZOW8jSPSJ8Vo2UthIdNaQV0zWs3oFGY')
  var row = 2;
  var nameCel = 'A'+row;
  var currentSheet = SpreadsheetApp.getActive();
  var currentCel =  currentSheet.getRange(nameCel);
```
4. El bucle solo se ejecuta solo si la celda donde estamos ubicados no esta vacia. 
```js
 while(!currentCel.isBlank()){...}
```
5. Luego de confirmar que la celda no esta vacia, no s desplazamos por la columnas de la fila y asignamos el valor de cada celda en el documento platilla.
```js
documento.getBody().replaceText('<<curso>>',currentSheet.getRange('A'+row).getValue());
documento.getBody().replaceText('<<plataforma>>',currentSheet.getRange('B'+row).getValue());
documento.getBody().replaceText('<<funcion>>',currentSheet.getRange('C'+row).getValue());
```
6. El codigo completo es muy similar al de la seccion anterior. 

```js
function InsertData() {
  var currentDoc = DriveApp.getFileById('1U0WAP6dFPRYfZOW8jSPSJ8Vo2UthIdNaQV0zWs3oFGY')
  var row = 2;
  var nameCel = 'A'+row;
  var currentSheet = SpreadsheetApp.getActive();
  var currentCel =  currentSheet.getRange(nameCel);

//Ejecuta el bucle si la celda no esta en blanco
  while(!currentCel.isBlank()){
  //Creamos un nuevo documento, si no lo hacemos perderemos la plantilla
    var newDoc= currentDoc.makeCopy('Curso: '+currentSheet.getRange('A'+row).getValue())
    var documento = DocumentApp.openById(newDoc.getId());

  //Obtenemos la fecha en la que se creo el Certificado
    var date = new Date();
    var mes = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

  //La funcion switch pemite reemplazar el mes numerico a tipo texto
    switch(mes){
      case 0: mes = 'Enero'; break;
      case 1: mes = 'Febrero'; break;
      case 2: mes = 'Marzo'; break;
      case 3: mes = 'Abril'; break;
      case 4: mes = 'Mayo'; break;
      case 5: mes = 'Junio'; break;
      case 6: mes = 'Julio'; break;
      case 7: mes = 'Agosto'; break;
      case 8: mes = 'Septiembre'; break;
      case 9: mes = 'Octubre'; break;
      case 10: mes = 'Noviembre'; break;
      case 11: mes = 'Diciembre'; break;
    }
  //Reemplazamos las variables <<>> en el texto por aquellas ingresadas por el usuario.
    var certyDate = 'Certificado Emitido el dia '+day+' de '+mes+' de '+year;
    documento.getBody().replaceText('<<curso>>',currentSheet.getRange('A'+row).getValue());
    documento.getBody().replaceText('<<plataforma>>',currentSheet.getRange('B'+row).getValue());
    documento.getBody().replaceText('<<funcion>>',currentSheet.getRange('C'+row).getValue());
    documento.getBody().replaceText('<<fecha>>',certyDate);


    //Shifting Down Cells
    row++;
    nameCel = 'A'+row;
    currentCel = currentSheet.getRange(nameCel);
  }
}
```
## Añadir ventana de verificación sobre combinar correspondencia    
*[Indice](#indice)* 

La ventana de verificacion nos permite confirmar la accion del usuario en caso de que la accion no haya sido activada intensionalmente. El codigo es exactamente el mismo que la seccion anterior solo que esta encerrado en condicionales para ejecutarse o no segun la repuesta del usuario.

```js
function InsertData() {

  var ui = SpreadsheetApp.getUi();
  var answer =  ui.alert('Estas a punto de geenerar los documentos?',ui.ButtonSet.YES_NO)
  if(answer == ui.Button.YES){
//Aqui va todo el codigo fuente...
//Confirma la ejecucion del mismo
    ui.alert('Los documentos se han creado satisfactoriamente');
  }
  else
  {
//Confirma la cancelacion del mismo.
    ui.alert('Acabas de cancelar la generacion de de Documentos');
  }
```

## Añadiendo casillas de verificación
*[Indice](#indice)*

Entre mas valiaciones e informacion tenga usuario este tendra mas informacion de que no se ha creado y en caso de haberlo creado, indicaremos cuando. El codigo de creacion de documentos a partir de una patilla es el mismo y solo se añade una estructura de control `IF` para validar si el docuemento fue creado  previamente.

```js
//Ejecuta el bucle si la celda no esta en blanco
  while(!currentCel.isBlank()){

//El condicional valida si la columna D o de ENVIADO se cuentra marcada con true sino crea el documento
  if (currentSheet.getRange('D'+row).getValue() != true)
  {

  //Aqui va el codigo ....

  //Creamos en Checkbox y justo despues de crearlo lo marcamos
    currentSheet.getRange('D'+row).insertCheckboxes();
    currentSheet.getRange('D'+row).setValue(true);

    currentSheet.getRange('E'+row).setValue(date)

  }
```    
![image](https://user-images.githubusercontent.com/60556632/174606175-85cd5817-3371-4564-8133-dbab08b74848.png)    
 El codigo completo hasta el momento:
 
 ```js 
 function InsertData() {

  var ui = SpreadsheetApp.getUi();
  var answer =  ui.alert('Estas a punto de geenerar los documentos?',ui.ButtonSet.YES_NO)
  if(answer == ui.Button.YES){

    var currentDoc = DriveApp.getFileById('1U0WAP6dFPRYfZOW8jSPSJ8Vo2UthIdNaQV0zWs3oFGY')
    var row = 2;
    var nameCel = 'A'+row;
    var currentSheet = SpreadsheetApp.getActive();
    var currentCel =  currentSheet.getRange(nameCel);

//Ejecuta el bucle si la celda no esta en blanco
    while(!currentCel.isBlank()){
    
//El condicional valida si la columna D o de ENVIADO se cuentra marcada con true sino crea el documento
    if (currentSheet.getRange('D'+row).getValue() != true)
    {

    //Aqui va el codigo ....
    //Creamos un nuevo documento, si no lo hacemos perderemos la plantilla
      var newDoc= currentDoc.makeCopy('Curso: '+currentSheet.getRange('A'+row).getValue())
      var documento = DocumentApp.openById(newDoc.getId());

    //Obtenemos la fecha en la que se creo el Certificado
      var date = new Date();
      var mes = date.getMonth();
      var day = date.getDate();
      var year = date.getFullYear();

    //La funcion switch pemite reemplazar el mes numerico a tipo texto
      switch(mes){
        case 0: mes = 'Enero'; break;
        case 1: mes = 'Febrero'; break;
        case 2: mes = 'Marzo'; break;
        case 3: mes = 'Abril'; break;
        case 4: mes = 'Mayo'; break;
        case 5: mes = 'Junio'; break;
        case 6: mes = 'Julio'; break;
        case 7: mes = 'Agosto'; break;
        case 8: mes = 'Septiembre'; break;
        case 9: mes = 'Octubre'; break;
        case 10: mes = 'Noviembre'; break;
        case 11: mes = 'Diciembre'; break;
      }
    //Reemplazamos las variables <<>> en el texto por aquellas ingresadas por el usuario.
      var certyDate = 'Certificado Emitido el dia '+day+' de '+mes+' de '+year;
      documento.getBody().replaceText('<<curso>>',currentSheet.getRange('A'+row).getValue());
      documento.getBody().replaceText('<<plataforma>>',currentSheet.getRange('B'+row).getValue());
      documento.getBody().replaceText('<<funcion>>',currentSheet.getRange('C'+row).getValue());
      documento.getBody().replaceText('<<fecha>>',certyDate);

    //Creamos en Checkbox y justo despues de crearlo lo marcamos
      currentSheet.getRange('D'+row).insertCheckboxes();
      currentSheet.getRange('D'+row).setValue(true);

      currentSheet.getRange('E'+row).setValue(date)

    }
    


      //Shifting Down Cells
      row++;
      nameCel = 'A'+row;
      currentCel = currentSheet.getRange(nameCel);
    }

    ui.alert('Los documentos se han creado satisfactoriamente');
  }
  else
  {
    ui.alert('Acabas de cancelar la generacion de de Documentos');
  }
}
```

## Generar PDF a partir de un documento de Google
*[Indice](#indice)*

Crear PDF y guardarlo en la carpeta raiz de Google Drive. Lo primero es ejecutar `saveAndClose()` para que el PDF no se cree mientras se guarda el el DOC sino que lo haga cuando ya haya sido creado. Indicamos el tipo de documento con `getAs()` y con `setName()` ademas de dale nombre añadimos el tipo de archivo `.pdf`. Finalmente creamos el PDF en la carpeta raiz de Drive.
```js
documento.saveAndClose();
var docPdf = documento.getAs('application/pdf');
docPdf.setName(documento.getName()+'.pdf');
DriveApp.createFile(docPdf);
```

## Crear carpetas y mover archivos    
*[Indice](#indice)*

La carpeta raiz es `DriveApp` y por esto si creamos una carpeta esta se guarda alli a no ser que indiquemos mas instrucciones
```js
var carpeta =DriveApp.createFolder('Certificados: '+ new Date());
```   
Luego de haber creado la carpeta debemos mover los archivo de `DriveApp` a la Carpeta.
```js
//Donde var newDoc= currentDoc.makeCopy('Curso: '+currentSheet.getRange('A'+row).getValue())
var documentoPdf = DriveApp.createFile(docPdf);
  documentoPdf.moveTo(carpeta);
  newDoc.moveTo(carpeta);
```
Si queramos guardar la carpeta dentro de Otra carpeta entonces debemos seguir los siguientes pasos:

1. Creamos una carpeta manualmente, donde se almacenaran las carpetas por cada ejecucion del codigo.
2. Movemos manualmente tanto el Spread Sheet(Paramentros Certificados) como Docs(Platilla Certificados).
3. Ahora que la el Spread Sheet no esta en la carpeta raiz sino en una subcarpeta debemos obtener `getFileById()` de la subcarpeta y usamos las funciones `.getParents().next()` para indicar la ruta de la carpeta padre.  

```js
var idHoja = SpreadsheetApp.getActive().getId();
var carpetaPadre = DriveApp.getFileById(idHoja).getParents().next();
//Finalemte creamos la carpeta, esto solo se debe hace fuera del bucle y es llamada desde `while`.
var carpeta =carpetaPadre.createFolder('Certificados: '+ new Date());
```

## Mejorando función combinar correspondencia    
*[Indice](#indice)*    

El objetivo es indicarle al usuario si enverdad se han generado documentos. En el codigo anterior se mostraba el mensaje de alerta `Se han creado los documentos` incluado cuando no era el caso. Ahora colocaremos condicionales adicionales para entragar la informacion correcta.

1. Ahora crearemos la carpeta dentro del `while` para evitar que se creen carpetas vacias, como recordaras antes se creaba una carpeta antes de ejecutar el codigo. 
2. Para evitar que se crea una carpeta por cada documento usamos un condicional para que el bucle solo pueda acceder a la creacion de carpeta si y solo si encontro algun documento y ademas lo haga una sola vez por todos los documentos.
```js
//El condicional valida si la columna D o de ENVIADO se cuentra marcada con true sino crea el documento
if (currentSheet.getRange('D'+row).getValue() != true)
{
//documentosGenerados es una variable que se incrementa solo si encuentra una documento por crear.
  documentosGenerados++;
//documentosGenerados va a incrementar varias veces pero solo se creara la carpeta cuanto sea igual a 1
  if (documentosGenerados == 1){
    //Creamos una carpeta en Drive
    var idHoja = SpreadsheetApp.getActive().getId();
    var carpetaPadre = DriveApp.getFileById(idHoja).getParents().next();
    var carpeta =carpetaPadre.createFolder('Certificados: '+ new Date());
  } 
//Codigo ....
}
```
3. Ahora que solo se creara la carpeta si hay documentos por crear solo falta agregar los ventanas de alerta para notificar al usuario.
```js
if (documentosGenerados>0)
  ui.alert('Se han generado ' + documentosGenerados + 'documentos');
else 
  ui.alert('No se han encontrado datos por lo cual no se generaron documentos')
```

## Enviar correos electrónicos con PDF adjunto     
*[Indice](#indice)*   
Para enviar un correo electronico necesitamos primero crear una lista que contenga los correo electronicos en `Google Sheets`, luego usamos las funcion `GmailApp.sendEmail(destinatario,titulo,cuerpo,{attachments:[documento]})` le pasamos los paramentros obtenidos y listo.😎
```js
var destinatario =  currentSheet.getRange('F'+row).getValue();
var titulo =  'Certificado: ' + currentSheet.getRange('B'+row).getValue();
var cuerpo =  'Enhorabuena, a continuacion adjuntamos el certificado de ' + currentSheet.getRange('F'+row).getValue()+ ' que obtubiste en ' + currentSheet.getRange('B'+row).getValue();
GmailApp.sendEmail(destinatario,titulo,cuerpo,{attachments:[documentoPdf]})
```
## Funciones personalizadas en Google Sheets    
*[Indice](#indice)*   

Las funciones personalizadas pueden ser usadas dentro de las celdas de excel, solo tenemos de ejecutarlas y entregarle los parametros que requiere la funcion, es como ejecutar cualquier funcion mativa de excel. 
- La funcion `=DOUBLE(A2)` toma un valor y retorna el cuadrado de ese valor. 
```js
function DOUBLE(x){
  return x**2;
}
```

## Bucle FOR Doble sobre un rango de celdas en Google Sheets    
*[Indice](#indice)*   
- Operar arreglos de datos a partir de estructuras iterativas.
```js
function DoubleArray(datos) {
//Valida si hay mas de un dato en la funcion.
  if(Array.isArray(datos)){
    var result = [];
    //Se posiciona en la celda A1 y valida el tamaño del Arreglo de arriba a abajo.
    for(var row = 0; row < datos.length;row++){
      result[row] = new Array(datos[row].length);
      //La primera posicion es datos[1]=A1, datos[2]=A2, ahora los convertimos en array
      //new Array(A1.length) y determinamos en tamaño a nivel de columnas. 
      for(var cols = 0; cols<result[row].length;cols++){
        //result[1][1]=A1, result[1][2]=B1..., calculamos el doble de cada celda de la tabla
        //pero lo parsemos entes de guardarlo en la matriz. 
        result[row][cols] = parseInt(datos[row][cols])*2;
      }
    }
    return result;
  }
  //Si no hay un rango de valores solo calculamos el doble.
  else 
  {
    return datos*2;
  } 
} 
```

## Bucle FOR IN Doble sobre un rango de celdas    
*[Indice](#indice)*  

A continuacion se muestra como se puede ejecutar el mimo codigo a partir de un bucle `For In`
```js
function DoubleArrayForIn(datos) {
  if(Array.isArray(datos)){
    var result = [];
    for(var row in datos)
      //Array para guardar los elementos de las filas
      var dataRow = [];
      for(var cols in datos[row]){
        //Push permite añandir cada elemento en dataRow
        dataRow.push(parseInt(datos[row][cols])*2);
      }
      result.push(dataRow)
    }
    return result;
  }
  else 
  {
    return datos*2;
  } 
} 
```
## Bucle FOREACH Doble sobre un rango de celdas    
*[Indice](#indice)*  

El uso es `ForEach` es mas simplificado de todos los `For` hasta el momento. A continuacion se muetran desde la forma mas larga hasta la mas corta con `arrow functions`.

1. ForEach se compone de un elemento iterable y de una funcion como argumento que contiene el codigo correspondiente. 

```js
function DoubleForEach(datos){
//Vector que almacena la informacion resultante.
  var result = [];
  if(Array.isArray(datos)){
    //Primer forEach se encarga de recorrer las filas
    datos.forEach(function(row){
      //Segundo forEach se encarga de recorrer las columnas
      //dataRow corresponde al vector de cada fila
      var dataRow = []
      row.forEach(function(column){
      //Caculamos el doble de cada celda en la medida que recorremos el array de cada fila
        dataRow.push(column*2)
      });
      //Guardamos cada vector dataRow en result hasta construir la matriz
      result.push(dataRow)
    });
    return result;
  }
  else{
    return datos*2;
  }
}
```

2. Utilizamos arrow functions para hacer el codigo mas legible. 
```js
function DoubleForEach(datos){
  var result = [];
  if(Array.isArray(datos)){
    datos.forEach(row =>{
      var dataRow = []
      row.forEach(column=> dataRow.push(column*2));
      result.push(dataRow)
    });
    return result;
  }
  else{
    return datos*2;
  }
}
```

3. Utilizamos un indice para cada vector en vez de crear un array por cada fila.
```js
function DoubleForEach(datos){
  var result = [];
  if(Array.isArray(datos)){

    datos.forEach((row,idxrow) =>{
      //Creamos un array para cada una de las filas.
      result[idxrow] = new Array(datos[idxrow].length);
      
      //Calculamos el doble de cada elemento del array de cada fila.
      row.forEach((cell,idxcol)=> result[idxrow][idxcol] = cell*2);
    });
    return result;
  }
  else{
    return datos*2;
  }
}
```
4. La siguiente funcion calcula la sumatoria total de un arreglo. 
```js
function DoubleTotal(datos){
  var result = 0;
  if(Array.isArray(datos)){
    datos.forEach(row => row.forEach(col => result += col*2));
    return result;
  }
  else{
    return datos*2;
  }
}
```

## Función MAP para manipular matrices y arrays    
*[Indice](#indice)*  

Funcion que obtiene otra matriz pero utilizando la funcion map.
```js
function MapArray(datos){
  if (Array.isArray(datos)){
    return datos.map(row => row.map(cell => cell*2));
  }
  else{
    return datos *2;
  }
}
```
Funcion que obtiene la sumatoria del doble de cada celda, utilizando `map`.
```js
function MapTotalArray(datos){
  var resul = 0;
  if (Array.isArray(datos)){
    return datos.map(row => row.map(cell => result +=cell*2));
  }
  else{
    return datos *2;
  }
}
```
## Función REDUCE para analizar matrices y arrays   
*[Indice](#indice)*  

Al aplicar la funcion reduce sobre una matriz el codigo quedaria de la siguiente forma:.
```js
function MapTotalArray(datos){
  //Debido a que solo es posible cacular el doble a partir del segundo paramentro
  //colocalos el cero el cual al momento de la ejecicion de convertira en el primero
  return datos.reduce(((a,b)=> a+b.reduce(((c,d)=> c+d*2),0)),0);
}
```

## Función FILTER sobre rango de celdas   
*[Indice](#indice)*  

Esta funcion permite aplicar un filtro sobre los datos, es decir reducir el tamaño del arreglo. Si queremos realizar una reduccion de los datos, podemos primero filtart los datos y luego pasarlos a una funcion que haga la reduccion. 
```js
function FilterArray(datos){
  if (Array.isArray(datos)){
  //Se convierte cada fila en un array luego aplicamos filter. 
    return datos.map(row => row.filter(cell => cell > 5));
  }
  else{
    return datos.filter(cell => cell > 5);
  }
}
```

## Funciones con varios parámetros    
*[Indice](#indice)* 

La documentacion de una funcion permite al usuario tener mas informacion hacerca de su uso como saber el tipo de dato que debe ingresar. El proceso se debe seguir tal cual como aparece a continuacion. 
```js
/**
 * Multiplicar celdas por el valor almacenado en otra celda
 * 
 * @param {number|Array<Array<number>>} datos - Celda o Rango de Celdas que queremos multiplicar
 * @para {number} multiplicador- Celda multiplicadora.
 * @customfunction 
 */

function MULTIPLICADOR(datos,multiplicador){

//Posibles Errores
  if (Array.isArray(multiplicador) || multiplicador==null) return 'Error: El se aceptan Arrays o Nulos'
  if (Array.isArray(datos)){
    return datos.map(row => row.map(cell => cell*multiplicador));
  }
  else{
    return datos *2;
  }
}
``` 
## Crear Barra lateral en Google Sheets    
*[Indice](#indice)*   

- [Creacion de Barra Repositorio](https://github.com/aulaenlanube/barra-lateral-estilos-gas)