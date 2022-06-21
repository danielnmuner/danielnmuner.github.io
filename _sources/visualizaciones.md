## Matplotlib y Seaborn 📊

[Someone Notes](https://aldeherr.github.io/Seabor_matplotlib/)

**Matplotlib**        

  - [x] [La importancia de la visualización de datos](#la-importancia-de-la-visualización-de-datos)
  - [x] [Subplot](#subplot) 
  - [x] [Método orientado a objetos](#método-orientado-a-objetos) 
  - [x] [Subplots](#subplots)
  - [x] [Leyendas, etiquetas, títulos, tamaño](#leyendas-,-etiquetas-,-títulos-,-tamaño)
  - [x] [Colores y estilos](#colores-y-estilos)
  - [x] [Bar Plot](#bar-plot)
  - [x] [Crear otro tipo de gráficas](#crear-otro-tipo-de-gráficas)

**Seaborn**     

  - [x] [Set](#set)
  - [x] [Parámetros más usados con Seaborn](#parámetros-más-usados-con-seaborn)
  - [x] [Distribuciones](#distribuciones) 
  - [x] [Categóricos](#categóricos)
  - [x] [Archivos de la clase](#archivos-de-la-clase)
  - [x] [Jointplot y Pairplot](#jointplot-y-pairplot)
  - [x] [Heatmap](#heatmap)

### La importancia de la visualización de datos

**Cheatsheets** valiosas
![image](https://matplotlib.org/cheatsheets/_images/cheatsheets-1.png)
![image](https://matplotlib.org/cheatsheets/_images/handout-beginner.png)
![image](https://matplotlib.org/cheatsheets/_images/handout-intermediate.png)
![image](https://matplotlib.org/cheatsheets/_images/cheatsheets-2.png)
![image](https://matplotlib.org/cheatsheets/_images/handout-tips.png)


## Pyplot básico [Funciones](https://matplotlib.org/stable/plot_types/basic/plot.html)

```python
#Importamos la libreria de Matplotlib
import numpy as np
import matplotlib.pyplot as plt

#Creamos un array con linspace el cual particiona un rango
#en este caso 0 a 5 en 11 partes iguales
x =  np.linspace(0,5,11)
y = x ** 2 #Funcion cuadratica

#Definine los ejes X, Y con plot(X,Y), ademas de formato con 'bs-'
#Ejemplo: plot(x,y,'color,string,tipo_linea') 
plt.plot(x,y,'bs-')
#Para que se muestre la grafica usamos:
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165412747-d3cbe9ae-5584-4d84-b313-c318924dfeff.png)

```python
#Graficar X en un histograma cambiando 'plot' por 'hist'
plt.hist(x)
#plt.pie(x) Grafico de pastel
#plt.scatter(x,y) Grafico de correlacion
#plt.boxplot(x) Grafico de cajas
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165412773-5d6479fe-0707-439f-b309-46cbddf0257e.png)


Fomato en Graficas con Matplotlib.pyplot

**Formatos de Strings**

| character | description            |
| --------- | ---------------------- |
| ‘.’       | point marker           |
| ‘,’       | pixel marker           |
| ‘o’       | circle marker          |
| ‘v’       | triangle\_down marker  |
| ‘^’       | triangle\_up marker    |
| ‘<’       | triangle\_left marker  |
| ‘>’       | triangle\_right marker |
| ‘1’       | tri\_down marker       |
| ‘2’       | tri\_up marker         |
| ‘3’       | tri\_left marker       |
| ‘4’       | tri\_right marker      |
| ‘8’       | octagon marker         |
| ‘s’       | square marker          |
| ‘p’       | pentagon marker        |
| ‘P’       | plus (filled) marker   |
| ‘\*’      | star marker            |
| ‘h’       | hexagon1 marker        |
| ‘H’       | hexagon2 marker        |
| ‘+’       | plus marker            |
| ‘x’       | x marker               |
| ‘X’       | x (filled) marker      |
| ‘D’       | diamond marker         |
| ‘d’       | thin\_diamond marker   |
| ‘|’       | vline marker           |
| ‘\_’      | hline marker           |

**Tipos de Lineas**

| character | description         |
| --------- | ------------------- |
| ‘-’       | solid line style    |
| ‘–’       | dashed line style   |
| ‘-.’      | dash-dot line style |
| ‘:’       | dotted line style   |


**Colores**
| character | color   |
| --------- | ------- |
| ‘b’       | blue    |
| ‘g’       | green   |
| ‘r’       | red     |
| ‘c’       | cyan    |
| ‘m’       | magenta |
| ‘y’       | yellow  |
| ‘k’       | black   |
| ‘w’       | white   |

### Subplot
```python 
#Subplot es una herramienta que nos permite colocar varios graficos
#Creamos un array usando numpy

x = np.linspace(0,5,11)
y = x ** 2

#subplot de 1 row X 2 cols luego son dos graficos
#por tanto de indica en el 3er arg si es el 1 o el 2

plt.subplot(1,2,1) #1er Grafico dos en uno

plt.plot(x,y,'g--') #Relacion X,Y
plt.plot(y,x,'g--') #Relacion Y,X

plt.subplot(1,2,2) #2er Grafico
plt.hist(y) # Histograma de Y
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165413712-eeed0c98-e751-4307-9af6-f708990ad75e.png)

### Método orientado a objetos

```python
#Object Oriented
# - Requiere mas codigo pero vale la pena
# - Mayor personalizacion
# - Mas amigable a mulipple graficos
# - Mas codigo

import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0,5,11)
y = x ** 2

#Creamos el objeto fig. El metodo figure() es el liezo
#donde van las graficas
fig = plt.figure()

#Definimos las dimenciones y posicion del Lienzo de cada grafico
#add_axes([pos_x,pos_y,len_x,len_y])

axes = fig.add_axes([0.1,0.1,0.8,0.9])
axes2 = fig.add_axes([0.2,0.55,0.4,0.3])

#Graficamos axes como objetos independientes
axes.plot(x,y,'b')
axes2.plot(y,x,'m')

#Mostrar objeto fig o lienzos
fig.show()
```
![image](https://user-images.githubusercontent.com/60556632/165430699-726c10ef-d88b-4a94-8f71-2361f69f8c24.png)

**Partes de Fig**
![image](https://user-images.githubusercontent.com/60556632/165423223-c5e00e5a-40c7-4a99-b286-6bcb1666e690.png)

### Subplots

```python
#Object Oriented
# - Requiere mas codigo pero vale la pena
# - Mayor personalizacion
# - Mas amigable a mulipple graficos
# - Mas codigo

import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0,5,11)
y = np.sin(x)

#Definimos objetos fig y axes, en otras palabras
#crear el lienzo para luego graficar 1 row X 2 cols
fig, axes = plt.subplots(nrows=1,ncols=2) #Diferente de Subplot

#Primer grafico en la posicion [0]
axes[0].plot(x,y,'b')
#Primer grafico en la posicion [1]
axes[1].plot(y,x,'g')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165432534-4d5087e2-0b85-4c32-bd1f-fcce39f336bc.png)

```python
#Como la salida es un array entonces podemos definir
#previamente el nombre de los axes en vez de usar posiciones 
fig, (ax1,ax2) = plt.subplots(nrows=1,ncols=2) #Diferente de Subplot

#Exactamente igual al grafico anterior, a esto nos referimos 
#con orientado a objetos independientes
ax1.plot(x,y,'b')
ax2.plot(y,x,'g')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165432534-4d5087e2-0b85-4c32-bd1f-fcce39f336bc.png)


```python
#Si creamos un lienzo de tipo matricial
#axes se debe indicar la posicion a menos que 
#(ax1,ax2,ax3,ax4)
fig, axes = plt.subplots(nrows=2,ncols=2)

#Indicamos la posicion de acada axes.
axes[0,0].plot(x,np.cos(x),'y')
axes[0,1].plot(x,np.sin(x),'r')
axes[1,0].plot(x,np.tan(x),'m')
axes[1,1].plot(x,np.cos(x),'b')

#Controla el padding entre bordes de los figs
fig.tight_layout()
```
![image](https://user-images.githubusercontent.com/60556632/165432624-fd644ed8-d707-4c18-9ba5-e06e4fb0e24b.png)

### Leyendas, etiquetas, títulos, tamaño

```python
#A continuacion le daremos mas contexto a los graficos
#Creamos objetos fig y axes

import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0,5,11)
y = np.sin(x)

#Cambiamos el tamaño todo el Lienzo conÑ 
#figsize=(len_x,len_y)
fig, axes = plt.subplots(1,2,figsize=(5,5))

#Titulo axes[0]
axes[0].set_title('Relacion_X Y')
#Ejes
axes[0].set_xlabel('Axis X')
axes[0].set_ylabel('Axis Y')
#Etiquetamos dentro de 'plot' y con lenged
axes[0].plot(x,y,'b',label='$sin(x)$')
axes[0].legend()

#Titulo axes[1]
axes[1].set_title('Relacion_Y X')
#Ejes
axes[1].set_xlabel('Axis Y')
axes[1].set_ylabel('Axis X')
#Etiquetamos dentro de 'plot' y con lenged
#dentro del signo $$ podemos colocar notacion matematica
axes[1].plot(y,x,'m',label='$sin(y)$')
axes[1].legend()

#Controla el padding entre bordes de los axes
fig.tight_layout()
```
![image](https://user-images.githubusercontent.com/60556632/165434284-1c7236d7-6552-4e34-9005-c44750f16a3f.png)

**Aporte de Platzi**
![image](https://user-images.githubusercontent.com/60556632/165434546-efb4131e-d310-4e97-b8fa-f292c38f53ea.png)

### Colores y estilos

**[Estilos de Linea](https://matplotlib.org/3.5.1/tutorials/colors/colors.html)**

```python
#Colores y estilos
import matplotlib.pyplot as plt
import numpy as np
x = np.linspace(0,5,11)

#Mostrar en pantalla los estilos con lo que 
#puedo trabajar
print(plt.style.available)
```
```
['Solarize_Light2', '_classic_test_patch', 'bmh', 'classic', 'dark_background', 'fast', 'fivethirtyeight', 'ggplot', 'grayscale', 'seaborn', 'seaborn-bright', 'seaborn-colorblind', 'seaborn-dark', 'seaborn-dark-palette', 'seaborn-darkgrid', 'seaborn-deep', 'seaborn-muted', 'seaborn-notebook', 'seaborn-paper', 'seaborn-pastel', 'seaborn-poster', 'seaborn-talk', 'seaborn-ticks', 'seaborn-white', 'seaborn-whitegrid', 'tableau-colorblind10']
```
```python
#Creamos un plot y aplicamos alguno de los stilos
#en plt.style.available de la siguiente forma:
plt.style.use('fivethirtyeight')
fig, ax = plt.subplots(figsize=(8,4))

#Finalmente graficamos con mas stilos:
#Opcionalmente a 'g2-' esta por separado:

#color='#66ffc4'
#marker='0', markersize=10, markerfacecolor='#66ffc4'
#linestyle='--'

#linewidth=1.0

ax.plot(x,x,'m3--',linewidth=1.0,markerfacecolor='#ffffff')
ax.plot(x,2*x,'g2-',linewidth=1.0)
ax.plot(x,3*x,'bo:',linewidth=1.0)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165532044-087f4af6-1c72-43fc-8070-1c5d650ee333.png)

### Bar Plot

```python
#Los graficos de barras nos permiten 
#graficar variables categoricas

import matplotlib.pyplot as plt
import numpy as np

#Creamos una lista de Pises y de poblacion
country = ['Colombia','Usa','España','Alemania', 'Corea']
population = [1000,800,900,1000,300]

#En X van la variables categoricas
#width=0.5 ancho de las barras
#color=['#ffffff','r'], icluso color por cada barra.
#plt.xticks permite modificar etiquetas eje X y rotation

plt.bar(country,population, width=0.5,color=['#34ffff','b'])
plt.xticks(np.arange(5),('Colombia','Usa','España','Alemania', 'Corea'), rotation=45)
plt.show
```
![image](https://user-images.githubusercontent.com/60556632/165535022-8882948c-5f62-4d32-8e52-1bd0657853c0.png)

```python
#Posicionar la barras horizontalmente
plt.barh(country,population)
plt.show
```
![image](https://user-images.githubusercontent.com/60556632/165535138-28ef3588-d754-4b63-8294-1006cf284945.png)

### Crear otro tipo de gráficas

```python
import matplotlib.pyplot as plt
import numpy as np

#Creamos un array a partir de valores aleatorios
data = np.random.randint(1,50,100)
data
```
```
array([23, 13, 17, 12, 31,  5, 43, 23, 13, 46, 30, 34, 43, 16, 46, 48, 14,
       12, 33, 42, 47, 27, 33, 44, 25, 43, 24, 11, 47, 22,  4, 28, 32, 14,
       43, 15, 21, 15, 31,  4, 27, 36, 49, 19,  4, 41, 40, 27, 24, 35,  6,
       20,  5, 26, 45, 46, 13,  8, 42,  7, 37, 47,  4, 24, 49, 32, 45, 48,
       19,  9, 24,  5, 21, 12, 48, 37, 14, 12, 23, 41,  3, 25,  3, 27, 33,
       40, 45,  5, 48, 20, 35, 38, 16, 15,  5,  7, 30, 11, 22,  4])
```
```python
#Graficar la distribucion de los datos a partir
#un hisgrama, donde podemos configurar los bins

#histtype='step' tipo linea
#histtype='bar' tipo barra
plt.hist(data,bins=10,histtype='step')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165766792-0f448f14-0b18-40cd-8e83-eff80d621a0e.png)

```python
#Boxplot, indica Rango Intercuartil
#y los diferente quantiles 0.25 0.50 0.75

#vert=False cambia de vertical a horizontal
#patch_artist=True agrega color a la caja
#notch=True enfoca mejor la media de la caja
#showliers=True, Muestra outlyers con False los saca del diagrama

#Añadimos outlyers a la distribucion:
data = np.append(data,(100,200,150))
plt.boxplot(data, vert=False, patch_artist=True, notch=True,showfliers=True)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165766867-41aa20bf-4999-4f4a-88e6-5767b58d0d02.png)

```python
#Grafico de dispersion
#Creamos una varible no importa su valor.
N = 50

#Definimos los valores de X, Y
x = np.random.rand(N)
y = np.random.rand(N)

#Area indica la frecuencia con la que ocurre la relacion X,Y
area = (30 * np.random.rand(N)) ** 2
#Color indica la categoria a la que pertenece cada realacion X,Y
colors = np.random.rand(N)

#Graficamos la relacion y ademas indicamos añadimos mas informacion 
#indicando:
#s=area, frecuencia de la relacion
#c = colors, categoria a la que pertenece la relacion  
#marker='o', estilo de forma, como poligono, estrella, etc..
#alpha = 0.5, le da opacidad al grafico

plt.scatter(x,y,s=area,c = colors, marker='o')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165766987-840024ce-3095-414c-8b6c-878c7bcfa6bd.png)

### Seaborn
Seaborn esta construido sobre matplotlib, hay que tener en cuenta que matpotlib esta optimizado para numpy, sin embargo, seaborn esta optimizado para pandas. Cada grafica resuelve diferentes tipos de problemas:

![image](https://user-images.githubusercontent.com/60556632/165772950-1aaa09ac-fb16-4634-b8f9-fece486cd137.png)

### Set

A traves de `set` podemos modificar varios paramentros en cuanto al estilo, tener en cuenta la documentacion: [set_theme](https://seaborn.pydata.org/generated/seaborn.set_theme.html#seaborn.set_theme), [color_palett](https://seaborn.pydata.org/generated/seaborn.color_palette.html#seaborn.color_palette)

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.barplot(x=['A','B','C'],y=[1,3,2])
#plt.show() funciona debido a que es la base de sns 
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165774314-e09948b9-c749-452c-b002-cf039eb08c57.png)

```python
sns.set(style='darkgrid', palette='muted',font='Verdana', font_scale=1)
sns.barplot(x=['A','B','C'],y=[1,3,2])
#plt.show() funciona debido a que es la base de sns 
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165775254-5692687e-2a5a-4a72-b8f5-18b12b718800.png)

### Parámetros más usados con Seaborn
Algunos [Data sources](https://github.com/mwaskom/seaborn-data), que podemos usar para experimentar.

```python
#Importamos Seaborn
import seaborn as sns
import matplotlib.pyplot as plt

#Cargamos un dataset built-in sns
tips = sns.load_dataset('tips')

#Veremos displot mas adelante, a continuacion 
#tenemos un histograma de total_bill
sns.displot(data=tips, x = 'total_bill')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165815365-8af6180d-73ff-4c6e-9e14-6d64ef4df802.png)

```python
#Este grafico muestra una relacion entre 'total_bill' y 'tips'
#automaticamente crea un grafico alterno al histograma
#usamos el arg 'hue' para categorizar los datos por 'sex'
sns.displot(data=tips, x='total_bill',y='tip',hue='sex')
plt.show() 

#Aunque displot seleciona eligio el grafico automaticamente
#tambien lo podemos hacer a traves de:
#kind='kde', de densidad

#A nivel de estilo uno de los mas usados son:
#legend=True
#palette='dark'
#alpha=0.25
```
![image](https://user-images.githubusercontent.com/60556632/165815422-f45e0993-96c8-46d6-aff9-7197768ae66e.png)

### Distribuciones

```python
#Opciones para realizar distribuciones numericas en sns

#Importamos Seaborn
import seaborn as sns
import matplotlib.pyplot as plt

#Cargamos un dataset built-in sns
tips = sns.load_dataset('tips')

#Asi ejecutamos un histograma donde podemos ver 
#la frecuencia de los 'tip', esta frecuencia puede ser
#modificada usando los bins. 

#cumulative=True, permite que se vallan sumando las frecuencias
sns.histplot(data=tips, x='tip', bins=10, cumulative=True)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165823815-90f2e4bc-06e0-4d27-8703-4f71cf6635ee.png)

```python
#Categorizamos el grafico a partir de hue='sex'

#Se puede graficar un estadistico especifico a partir de:
#stat='probability', stat='frecuency', stat='percent'
#stat='density', stat='count'-> defaul

#Indicamos como queremos presentar los datos
#multiple='stack', multiple='layer',multiple='dodge',multiple='fill'
#element="step"

sns.histplot(data=tips, x='tip', bins=10, cumulative=False, hue='sex'
,stat='probability', multiple='dodge')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165823879-b024ffb5-0017-4fa0-b7f3-0783ecc58a38.png)

```python
#Grafico de densidad de tip, donde al parecer los
#hombres dejn mas propina que las mujeres

#Al igual que en el histograma podemos usar la propiedad
#cumulative=True/False
#shade=True, para sombrear el area bajo la curva
#bs_adjust=1, ajusta la grafica de acuerdo a los ejes

sns.kdeplot(data=tips, x='tip', hue='sex', shade=True)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165823941-2ff2feed-11c5-4e80-bbd8-d47703ca8838.png)

```python
#Grafico escalonado que indica las proporciones o tasa de cambio
#puede ser en base a a diferentes estadisticos 
sns.ecdfplot(data=tips, x='tip', hue='sex', stat='count')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165824010-9f664e86-ff16-4407-9070-8c5bfd4e7e6d.png)

```python
#Displot se refiere a cualquier tipo de diagrama de distribucion.
sns.displot(data=tips, x='tip', hue='sex', stat='count')
plt.show()
```

![image](https://user-images.githubusercontent.com/60556632/165824055-26dba82e-6e9a-48dc-937f-dfdc3ef41687.png)

### Categóricos

```python
#Graficos de variables categoricas
#Importamos Seaborn
import seaborn as sns
import matplotlib.pyplot as plt

#Cargamos un dataset built-in sns como 'tips'
tips = sns.load_dataset('tips')
#countplot es practicamente un hisplot/displot con 
#multiple='dodge' o dodge=True

sns.countplot(data=tips,x='day',hue='sex')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165873358-00b2c0f8-3ea7-4eff-af1b-25aeabf539ae.png)

```python
#stripplot requiere al menos:
#x, una variable categorica
#y, una distribucion numerica
#hue, otra variable categorica
#dodge, permite separar hue para que sea mas claro
sns.stripplot(data=tips,x='day',y='total_bill',hue='sex', dodge=True)
plt.show()

#En esta grafica vemos las distribucion de una variable numerica 
#respecto a una categorica como los dias
```
![image](https://user-images.githubusercontent.com/60556632/165873372-e488ff13-c43b-4081-819b-209566964206.png)

```python
#swarmplot es como stripplot solo que se ve mas claro la
#consentracion, incluso tiene las mismas propiedades
sns.swarmplot(data=tips,x='day',y='total_bill',hue='sex', dodge=True)
plt.show()
```

![image](https://user-images.githubusercontent.com/60556632/165873401-7f09f068-cc4d-41a4-881b-6d7418865e72.png)

```python
#El boxplot indica la distribucion numerica por cuantiles
#podemos colocar dos grupos categoricos como se muestra:
sns.boxplot(data=tips,x='day',y='total_bill',hue='sex', dodge=True)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165873422-af124872-e330-4e7c-8292-447e0ffe80ca.png)

```python
#En este grafico se sobreponen un swarmplot y un boxplot
#lo cual es interesante para relacionar cuantiles y consetracion.

plt.figure(figsize=(8,6))

sns.swarmplot(data=tips,x='day',y='total_bill',hue='sex', 
dodge=True,color='k', marker='>')

sns.boxplot(data=tips,x='day',y='total_bill',hue='sex', dodge=True)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165873449-94a62b83-694e-440c-8e80-430d18e85266.png)

```python
#El violin es similar al boxplot, pero en vez de cuantiles, indica
#la consentracion de los datos es como swarmplot pero delineado .
sns.violinplot(data=tips,x='day',y='total_bill',hue='sex', dodge=True)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165873481-8c7aa045-7b48-4e87-bb58-cd052adac6da.png)


```python
#La propiedad 'split' permite contrarestar la distribucion 
#de los datos a nivel de consentracion entre nuestra 
#variable categorica 'sex'

sns.violinplot(data=tips,x='day',y='total_bill'
,hue='sex',dodge=True,split=True)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165873501-3fc423e2-1a60-48fd-a838-33550fa67dc6.png)
```python
#Categorical plot es una opcion universal como displot. 😊👽
#solo cambiando kind='box', kind='violin', etc..
#col, es una propiedad de catplot que nos permite dividir la grafica en dos
#graficas de forma categorica. 
sns.catplot(data=tips,x='day',y='total_bill',hue='sex',
            dodge=True,kind='box',col='time')
```
![image](https://user-images.githubusercontent.com/60556632/165873531-544c4f24-9a48-4e69-bfc9-a2e29766a02d.png)

### Archivos de la clase

```python
#Graficos de relacion entre variables como scatterplot

#Importamos Seaborn
import seaborn as sns
import matplotlib.pyplot as plt

#Cargamos un dataset built-in sns como 'tips'
tips = sns.load_dataset('tips')

#scatterplot permite ver si eziste alguna asociacion entre variables
#con style, podemos agregar otra categoria ademas de hue
#size='size',podemos agregar otra categoria ademas de hue 
sns.scatterplot(data=tips, x='total_bill',y='tip'
, hue='sex',style='time',size='size')

#Usando legend posicionamos la legenda
plt.legend(loc='center', bbox_to_anchor=(1.15,0.5))
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165877825-520a52e6-8116-4ad2-9472-d18fd7806010.png)\

```python
#Crear un dicionario para la propiedad marker
#donde queremos que la categoria time tenga diferentes
#estilos de forma:

markers={'Lunch':'p','Dinner':'>'}

plt.figure(figsize=(7,5))
sns.scatterplot(data=tips, x='total_bill',y='tip'
, hue='day',style='time',size='size',markers=markers)

plt.legend(loc='center', bbox_to_anchor=(1.15,0.5))
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165877849-63090b7b-b655-4265-aa66-a1a3ae9c1d08.png)

```python
#Lineplot es como un scatterplot pero unido con lineas
#como podemos ver es preferible el scatterplot
plt.figure(figsize=(7,5))
sns.lineplot(data=tips, x='total_bill',y='tip'
, hue='day',style='time',size='size',markers=markers)
```
![image](https://user-images.githubusercontent.com/60556632/165877913-d0ebbe6d-6a6f-40a5-a090-7392eade6804.png)

```python
#Relational plot es una opcion universal como displot. 😊👽
#solo cambiando kind='scatter', kind='line', etc..
plt.figure(figsize=(7,5))
sns.relplot(data=tips, x='total_bill',y='tip'
, hue='day',style='time',size='size',markers=markers, col='time')
```

![image](https://user-images.githubusercontent.com/60556632/165877962-5484c373-841f-4fee-b84e-4aaa24aa878e.png)

### Jointplot y Pairplot

```python
#Importamos Seaborn
import seaborn as sns
import matplotlib.pyplot as plt

#Cargamos un dataset built-in sns como 'tips'
tips = sns.load_dataset('tips')

#jointplot es un grafico muy util para identificar tanto la 
#relacion entre variables como el histograma de cada una de ellas
#algo muy interesante de jointplot este podemos utilizar
#kind='hist',kind= 'kde', etc

sns.jointplot(data=tips,x='total_bill', y='tip'
,hue='sex')
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165880300-fef730c2-3bf5-4a5d-a73d-b69ae7664bd5.png)

```python
#Usando las propiedades maginal_ticks=True,
#margina_kws=dict(bins=25, fill=False,multiple='dodge' podemos
#modificar el estilo de los graficos marginales sin afectar el 
#grafico principal y asi agregar mas contexto

sns.jointplot(data=tips,x='total_bill', y='tip', kind='hist'
,hue='sex',marginal_ticks=True, marginal_kws=dict(fill=False, multiple='dodge'))
plt.show()
```

![image](https://user-images.githubusercontent.com/60556632/165880361-4bcedbb3-5542-4946-b440-aaab119bdbc5.png)

```python
#Pairplot permite visulizar relaciones numericas
#automaticamente identifica las mismas en nuestro dataset

#La propiedad 'corner=True' solo muestra la mitad de los graficos 
sns.pairplot(data=tips,hue='sex', kind='hist', palette='coolwarm',)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/165880437-e8693caf-0ece-4b58-9531-b92eebbfe2f8.png)

### Heatmap

Mapas de colores que podemos trabajar con seaborn, [heatmap](https://seaborn.pydata.org/generated/seaborn.heatmap.html)

```python
#Heatmap, es util al graficar datos en una estructura matricial.

#Importamos Seaborn
import seaborn as sns
import matplotlib.pyplot as plt

#Cargamos un dataset built-in sns como 'tips'
tips = sns.load_dataset('tips')

#A pertir de corr() optenemos la correlacion 
#entre los valores numericos de tips asi tenemos un tipo de matriz
tips.corr()
```
![image](https://user-images.githubusercontent.com/60556632/166060278-76cb4c5d-a4b0-426d-91ec-be9abb6010bf.png)


```python
#Visualmente heatmap puede ser muy util para ver la correlacion 
#entre variables

#annot=True, indica el valor numerico de la correlacion
#cmap='coolwarm', color map, opciones de colores
#linewidth=5, lineas intermedias
#linecolor='black', cambia el color de las lineas intermedias 
#vmin=0,vmax=1, modifica la escala de los valores
#cbar=True, Valor default para mostrar la barra de escala

sns.heatmap(tips.corr(),annot=True,cmap='coolwarm',
            linewidth=5,linecolor='black',vmin=0.5,vmax=1,cbar=True)
plt.show()
```
![image](https://user-images.githubusercontent.com/60556632/166060863-190ca7e1-feaa-41ec-be6d-50e0c650212c.png)





