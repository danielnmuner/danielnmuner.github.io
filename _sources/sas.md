## Learning SAS

Statistical Analysis System

##### Environment
**Menu**
- **Server Files and Folders**
- Task and Utilities
- Snippets
- **Libraries**
- File shortcuts

**Server Files and Folders**
Normalmente se deben guardar los archivos en `Archivos(Inicio)`.

**Libraries**
Es un repositorio de Datos donde podemos asignar permisos basados en roles. Para acceder a los datos indicamos el nombre de la libreria y el nombre del tada set.
```sas
/*Nombre del dataset*/
data test;
/*Ruta del dataset en libraries*/
    set sashelp.airline;
/*Cada linea finaliza con `;` y los errores de sintaxis no se muestran como tal*/
run;
```
Para ejecutar el codigo tenemos que seleccionarlo y luego ejecutarlo, ademas es importante guardarlo en una carpeta en `Archivos(Inicio)`.
## Gettin Start
La `columnas` las llamamos `Variables`
Las `filas` las llamamos `Observations`
- **Origin Datasets**
  - SAS Data Set are stored in SAS Libraries. Your temp Data Sets are always stored in the **WORK** Library.

- **Valores nulos de tipo caracter y numericos**
  - Los caracteres faltantes se identifican con un ` ` y los datos numericos faltantes con `.`.

- **Tipos de Bloques en SAS**
    - `data step` _Crea o modifica datos_
```sas
/*Creamos variable o DataFrame*/
data airline_create;
    set sashelp.airline;
/*Creamos la columna Month la cual es igual al mes de la columna date*/
    Month = month(date);
run;
/*Procedure step que imprime data que es igual a airline create*/
proc print data=airline_create;
run;
```

**Datalines**
```sas
data demografic_cols;
/*Ademas de $ para indicar que es tipo caracter podemos usar 1-5 rangos para
indicar los espacios que pueden ocupar los datos de las filas es como
un limitante de carateres y numeros, es util cuando tenemos archivos de
texto alineados pero sin limitadores como ; o ,*/
	input Name $ 1-5 Age 6-8 State $ 9-11 Weight 12-15;
	datalines;
Marie 25 WV 132
Danie 188 ST 188
;
run;

proc print data=demografic_cols;
run;
```
- **Datalines Archivos separados por espacios**
```sas
data demografic_cols;
/*Donde infile recibe la ruta del archivo no delimitado por ; sino por espacios*/
	infile 'path/file.txt';
/*+1 salta una colmna e inicia a partir de la siguiente
@18 Indica que iniciara en la columna 18*/
	input Gender $ 1-2 Index +1 Age $ 5-6 Ethnicity $ @18;
run;

proc print data=demografic_cols;
run;
```

- **Datalines en Fechas**
```sas
data date_sample;
/*El 10. indica el total de caracteres incluyendo `-`
si no usamos format obtendremos el valor numerico de la fecha*/
	format Date_Birth MMDDYY10.;
	input Name $ Date_Birth MMDDYY10.;
	Datalines;
Oliver 03-16-1972
Natalie 12-11-1965
;
run;
proc print data=date_sample;
run;
```
- **Informats**
Son usados para leer datos no estandar como:
- Hyphens
- Slashes
- Dollar Sign
- Percent Sign
- Commas

- **Data Step**
Data Statement: Name of the new dataset you want to create and the library you are storing it in
Set Statement: Name of the old dateset

- **Create a library that already contains SAS datasets**
```sas
data bweight_kg;
	set sashelp.bweight;
/*Creamos la variable Weight_Kg y Domestic_Status*/
	Weight_Kg = Weight/1000; * division;
	Domestic_Status =  "International";*character asignment;
run;

proc print data=bweight_kg;
run;
```
- **Crecion de una Libreria**
```sas
/*Creacion de una libreria de nombre 'mydata'
donde la libreria es una instancia de una
de carperta en esta caso 'bpo2b'*/
libname mydata '/home/u61609774/bpo2b';
run;
```
 
- **[Proc Means](https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.5/proc/p0f0fjpjeuco4gn1ri963f683mi4.htm)**
Provee estadistica basica para varibles numericas. Si ejecutamos este codigo obtenemos la siguiente tabla.

```sas
/*Proc means*/
data baseball_data;
	set sashelp.baseball;
run;

proc print data=baseball_data;
run;
```
![image](https://user-images.githubusercontent.com/60556632/171197100-e4e2b273-dacf-4bbd-bf7b-a3c4271d99df.png)
Si queremos calcular los estadisticos de `nHits` y `nRuns` podemos usar el siguiente codigo:

```sas
/*Proc means*/
data baseball_data;
	set sashelp.baseball;
run;

proc means data=baseball_data;
/*Indicamos las variables a calcular sus estadisticos*/
	var nHits nRuns;
run;
```
![image](https://user-images.githubusercontent.com/60556632/171197810-85789cda-1461-4450-a21f-8a8c2dc929ee.png)

A continuacion especificamos que estadisticos necesitamos e incluso crear un nuevo archivo de salida con `output out`
```sas
/*Proc means*/
data baseball_data;
	set sashelp.baseball;
run;

/*Indicamos algunos estadisticos
q1: es el quantil minimo
maxdec: Decimales maximos
nmiss: total nulos
n: total datos
mean: media
median: mediana
*/
proc means data=baseball_data median q1 maxdec=2 nmiss n mean;
	var nHits nRuns;
/*output out: Crea un nuevo archivo 'baseball_stats' */
	output out = baseball_stats;
run;
```
A continuacion usamos `Class` el cual es funciona como un groupby donde podemos calcular estadisticos a partir de la agrupacion de datos categoricos.
```sas
/*Proc means*/
data baseball_data;
	set sashelp.baseball;
run;

proc means data=baseball_data;
/*Calculamos stats a partir de la agurpacion por `League`*/
	class League;
	var nHits nRuns;
run;
```
![image](https://user-images.githubusercontent.com/60556632/171201706-da1e6ed9-3945-4cc5-a382-feb0e529d4c5.png)

Una alternativa a `class` es `by` sin embargo primero debemos hacer un `sort` como se muestra acontinuacion
```sas
/*Realizamos un sort de League*/
proc sort data=baseball_data out=baseball_sorted;
	by League;
run;

/*Ahora si podemos aplicar un by. Al final es lo mismo que class
pero class es mas facil y claro*/
proc means data=baseball_sorted;
	by League;
	var nHits nRuns;
run;
```
- **Uso de Where**
```sas
proc means data=sashelp.baseball;
/*Basic stats de la variable nOuts
filtrando los datos diferentes a Houston*/
	var nOuts;
	where team not = 'Houston';
/*Nombre de la tabla*/
	Title 'All outs Except Houston';
run;
```
- **Uso de [Table](https://documentation.sas.com/doc/en/pgmsascdc/v_010/procstat/procstat_freq_overview.htm)**
Muestra la lista de variables que queremos ver. A continuacion generacion de Tabla de Frecuencias
```sas
proc freq data=sashelp.baseball;
/*Creamos dos tablas de frecuencias
Una para Position y Otra para League*/
	tables Position League;	
run;
```
![image](https://user-images.githubusercontent.com/60556632/171206660-df790ae5-ab84-454a-84b5-a65b19048a94.png)
![image](https://user-images.githubusercontent.com/60556632/171206800-17dee8fe-7c42-44e7-9c7b-6885b573c5bd.png)   

En caso de querer mover o sacar alguna de las columnas de la tabla de frecuencias solo lo podemos hacer para una tabla de freq no para dos como en el caso anterior.
```sas
proc freq data=sashelp.baseball;
/*Mover la columna de valores acumulados*/
	tables Position/NOCUM;	
run;
```
- **Tabulacion de frecuencias transversal a variables categoricas.
```sas
proc freq data=sashelp.baseball;
/*Tabulacion transversal a dos variable categoricas*/
	tables Position * League;	
run;
```
![image](https://user-images.githubusercontent.com/60556632/171208280-411715b2-4aeb-4fc1-9ab6-af5259b70c3f.png)

- **Formats**
A continuacion daremos formato a la columna date donde pasaremos de `JAN49` a `DD-MM-YYYY` format.
```sas
data airline_data;
/*El numero 10. sirve para indicar el total de carateres
y DATE es el nombre de la columna*/
	format DATE MMDDYY10.;
	set sashelp.airline;
run;
```    

A continuacion podemos ver como convertir una variable numerica en una categorica o viceversa.
```sas
data airline_data;
	set sashelp.airline;
/*put(column_name,format) es importante recordar que los numeros normalemte
estan identados a la derecha y los caracteres a la izquierda.
$: Indica que es de tipo caracter
4:El numero de carateres

Asi ahora tenemos una nueva columna New_Air con el mismo valor de AIR pero categorico*/
	New_Air = put(AIR, $4.);
run;
```

- **Proc Format**
Esta opcion permite reemplazar valores en nuestro dataset.
```sas
proc format;
/*Creamos una variable gender y agegrp internamente 
cada una almacena un formato que luego sera asignado a determinada tabla
LOW y HIGH son variable internas de SAS*/
	VALUE $gender 'M' = 'Male'
				  'F' = 'Female';
	VALUE agegrp  LOW - 13 = 'Youth Teen'
				  14 - HIGH = 'Mid Teen';
run;

proc print data=sashelp.class;
/*Asignamos ageqpr a age y $gender a sex*/
	format age agegrp. sex $gender.;
run;
```
![image](https://user-images.githubusercontent.com/60556632/171213744-b3940a27-db5c-4973-af89-9f82e60fc1ee.png)

- **Proc Tabulate**
Sirve para cruzar variables categoricas y evaluar diferentes paramentros.
- `Class` Columns and `Table` Columns
```sas
/*Por defecto el estadistico es N*/
proc tabulate data=sashelp.baseball;
	class Division;
	table Division;
run;
```
![image](https://user-images.githubusercontent.com/60556632/171215805-85b43b72-558d-45b4-b3ba-01b0f988514c.png)

- `Class` Rows,Columns and `Table` Rows,Columns
```sas
proc tabulate data=sashelp.baseball;
/*Indicamos Rows and Columsn
No olvidar `,` en tables*/
	class Division League;
	table Division, League;
run;
```
![image](https://user-images.githubusercontent.com/60556632/171216571-faedb756-7742-4f12-b7f2-38bcfcb3cd34.png)
- `Class` Page,Rows,Columns and `Table` Page,Rows,Columns
```sas
proc tabulate data=sashelp.baseball;
/*Indicamos Page, Rows and Columsn
No olvidar `,` en tables
Page es el cantida de tablas data una categoria
en este caso division solo tiene 2 categorias*/
	class Division League Team;
	table Division, League, Team;
run;
```
![image](https://user-images.githubusercontent.com/60556632/171217411-00e35ef3-104c-458b-a345-76d4c9d710ab.png)

- Otros estadistico que pueden ser usados en el ejemplo anterior.
![image](https://user-images.githubusercontent.com/60556632/171218172-c3a9808d-f513-488f-8d27-8c0557599900.png)   

A continuacion se muestra como se pueden agregar estos estadisticos.

```sas
proc tabulate data=sashelp.baseball;
	class Division League;
	var nOuts;
/*Agrega ALL: Subtotales
MEAN: La media de nOuts pero ademas la media de los subtotales de League
Importante si table no tiene `,` no se van a separa por filas y columnas*/
	table Division ALL, MEAN*nOuts*(League ALL);
run;
```
![image](https://user-images.githubusercontent.com/60556632/171219483-e1f27ceb-4a69-4009-9cf5-43dad56b6021.png)

- **Proc [Report](https://support.sas.com/resources/papers/proceedings/proceedings/sugi30/259-30.pdf)**
- Ordenar Ascendentemente
```sas
proc report data=sashelp.baseball;
/*Utiliza la Columna CrHits para ordenar toda la table ascendentemente*/
	define CrHits / Order 'Career Hits Order';
run;
```
- Agrupar tablas acotadas
```sas
proc report data=sashelp.baseball MISSING;
/*Indica las columnas que queremos tomar a traves de column*/
	column League Salary;
/*Agrupa Salary en funcion de League una variable categorica
y suma el total de salario para cada grupo de League*/
	define League / GROUP;
run;
```
- Agupar tablas acotadas e indicar el estaditico
```sas
/*MISSING indica que tendremos en cuenta los valores nulos*/
proc report data=sashelp.baseball MISSING;
/*Indica las columnas que queremos tomar a traves de column*/
	column League Salary;
/*Agrupa Salary en funcion de League una variable categorica
y suma el total de salario para cada grupo de League*/
	define League / GROUP;
/*Si queremos indicar otro estadistico diferente a `Sum` entonces 
debemos definir la variable numerica para un estadistico dado*/
	define Salary / Analysis Mean;
/*Ahora es stat sera Mean en vez de Sum*/
run;
```
- **If/Then/Else Statement**
- Condicional Simple
```sas
data class_data;
/*Cantidad maxima de caracteres*/
	length _Sex $10;
	set sashelp.class;
/*Crea una nueva columna con un nuevo nombre*/
	if Sex = 'M' then _Sex = 'Male';
	else _Sex = 'Female';
run;

proc print data=class_data;
run;
```
- Condicional compuesto
```sas
data class_data;
	length Fish_Size $10;
	set sashelp.fish;
	if Length1 < 15 then Fish_Size = 'Small';
	else if Lenght >15 and Length < 25 then Fish_Size = 'Medium';
	else Fish_Size = 'Large';
run;
```
- Condicional con mas de una accion
```sas
data class_data;
	length Fish_Size $10;
	set sashelp.fish;
	if Length1 < 15 then Do;
/*Crear dos columnas en base a un condicional*/
	Fish_Size = 'Small';
	Fish_Location = 'SaltWater';
	end;
run;
```

