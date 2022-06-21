
## Entorno de Desarrollo 💻

![GitHub branch checks state](https://img.shields.io/github/checks-status/darngcode/some-cookiecutters/main?label=Cookiecutter&logo=Cookiecutter)

Cookiecutters
---
This repo encompasses what I think is relevant and good enough to create personal projects as a future data analyst. All the repositories were cloned and saved on my own. Please take them a look if you want to. 

Some links
Here are the links to go through and sure their amazing authors. 
1. [balechon](https://github.com/balechon/cookiecutter-Data_Analysis)
2. [jvelezmagic](https://github.com/jvelezmagic/cookiecutter-conda-data-science)
3. [pjbull](https://github.com/drivendata/cookiecutter-data-science)  
### Python Directory and Files Management [programiz](https://www.programiz.com/python-programming/directory)
---
### OS Module
This package abstracts the functionalities of the platform and provides the python functions to navigate, create, delete and modify files and folders. "[stackabuse](https://stackabuse.com/introduction-to-python-os-module/)"

- [x] Import OS module  
``` import os```
- [x] State variables 
```CURRENT_DIR = os.getcwd()``` Current location  
```DATA_DIR=os.path.join(CURRENT_DIR,os.pardir,'data','raw') ``` os.path.join allow us to join all arguments on that function.
- [x] Confirm ```DATA_DIR``` exist.  
```os.path.exists(DATA_DIR)```  
- [x] Iterate over ```DATA_DIR``` using the next code    
```[os.path.join(DATA_DIR,item) for item in os.listdir(DATA_DIR)]``` The function ```listdir()``` turn ```DATA_DIR``` into a iterable.  
- [x] Create a folder using ```os.mkdir()``` function.  
```os.mkdir(os.path.join(CURRENT_DIR,'folder_name'))``` In doing so we can create the folder in that especific path.

#### pathlib 
As an alternative, we can use the pathlib module that's easier to implement than the os module. 

- [x] import pathlib  
```python
import pathlib
CURRENT_DIR = pathlib.Path().resolve()
DATA_DIR = CURRENT_DIR.parent.joinpath('data')
```
Functions like ```Path()``` abstract the O.S. path structure and will use ```/``` or ```\``` depending on. ```resolve()``` is a linux function that displays the path to get to current directory. Finally ```parent``` and ```joinpath``` to bring certain path.  

- [x] Creating a folder with pathlib differs from the os module.  Here is the right way with pathlib.

``` DATA_DIR.joinpath('pathlib').mkdir()``` Instead of specifying the path and file or folder name within the ```mkdir()``` function we'll define it before the function. 

- [x] List specific files based on a pattern or wildcards
```list(DATA_DIR.glob(".git*"))``` Globbing is mainly used to match filenames or searching for content in a file. Globbing uses wildcard characters to create the pattern [linuxhint](https://linuxhint.com/bash_globbing_tutorial/)

#### PyFilesystem2
PyFilesystem2 stand out from previous modules given that whenever we arrange a path we'll just use ```/``` separately from the O.S. for instance ``` DATA_DIR = fs .open_fs('../data/raw/') ```
It generally resemble to prior modules when it comes to the basic functionalities.
```python
import fs
# Open current directory
CURRENT_DIR=fs.open_fs('.')
#Previous function will return a OSFS object so it's no longer a simple str
```  
Now if you want to iterate over pathname we can use the next function ``` walk.files()``` as shown below.

```python
for path in DATA_DIR.walk.files():
    print(path)
```
#### pyprojroot & pyhere
Pyprojroot and Pyhere are modules that allow us to set up a root on a fixed folder in that way we say that the path become a relative path since it has been picked up on purpose.  

``` import pyprojroot``` to Find relative paths from a project root directory [chendaniely](https://github.com/chendaniely/pyprojroot/blob/master/README.md)

```pyprojroot``` finds the root working directory for your project as a pathlib object. You can now use the here function to pass in a relative path from the project root directory (no matter what working directory you are in the project), and you will get a full path to the specified file. That is, in a jupyter notebook, you can write something like `pandas.read_csv(here('./data/my_data.csv'))` instead of `pandas.read_csv('../data/my_data.csv')`. This allows you to restructure the files in your project without having to worry about changing file paths.


### Notebooks and Scripts as a team
**Note: The following sections assume you are located in your conda environment.**

## Set up project's module

To move beyond notebook prototyping, all reusable code should go into the `nice_environment/` folder package. To use that package inside your project, install the project's module in editable mode, so you can edit files in the `nice_environment` folder and use the modules inside your notebooks :

```bash
pip install --editable .
```

To use the module inside your notebooks, add `%autoreload` at the top of your notebook :

```python
%load_ext autoreload
%autoreload 2
```
Example of module usage where data_dir() is a function created within `nice_environment/` so any function can be called from my notebooks, making sure previous recomendations were followed.  

```python
from nice_environment.utils.paths import data_dir
data_dir()
```



