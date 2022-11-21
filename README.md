# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

## Parte B: 

  Se hicieron 2 Filtros (Nombre, Direccion) los cuales la api comunica con el backend de manera que 
  delega unos querys especificos para de esta manera usar el motor de la base de datos.
  
  La diferencia está en que puede haber un problema de integridad debido a que no nos estamos 
  asegurando de que los datos que se obtienen desde el front esten completos y correctos, 
  por ejemplo si se hace desde este, un dato puede cambiar desde que se trajo por primera vez y 
  cuando se hace el filtro no se vea el cambio

## Parte C:


## Otras preguntas (explicar con sus palabras):

## 1.¿Qué es un ORM? Ventajas y desventajas.
  Es la manera en que se transforman o "mapean" estructuras de datos con el fin de simplificar y acelerar
  el desarrollo de las aplicaciones.
  ### Ventajas
    El ORM permite automatizar el proceso de mapeo, ademas facilita la velocidad de uso y 
    aporta seguridad a la capa de acceso de datos.
  
  ### Desventajas
    En entornos con cargas altas puede llegar a reducir el rendimiento debido que se esta agregando una capa
    extra al sistema
    
## 2.Diferencias entre: cliente de BD vs driver de conexión de BD vs motor de base de datos  (Dar ejemplos)
  ### Cliente de BD
    Un cliente de DB es un software que sirve para visualizar y gestionar los datos de una BD
    Ejemplos de este son: dbvisaulizer, dbeaver, tablePlus
  ### Driver de conexion de BD
    El driver es el encargado de conectar nuestro programa y el motor de base de datos e 
    internamente estos drivers implementan protocolos
    de comunicacion necesarios para ejecutar operaciones sobre la BD
    un ejemplo de esto seria Spring Boot JDBC para la conexion con mysql
  ### Motor de base de datos
    Estos son herramientas que permiten realizar un numero determinado de operaciones sobre las tablas y sus datos.
    Ejemplos de estos son: Postgres y Mysql
## 3.¿Qué es una API REST?
  Son mecanismos que permiten que 2 sistemas o componentes puedan comunicarse e intercambiar informacion

## 4.¿Qué es una Single Page Application? Donde se ejecuta una SPA?
  - Una SPA es una pagina web la cual el contenido esta dentro de un solo archivo, es decir solo se
  carga un archivo HTML y todo el contenido está dentro de este, permitiendo que estas paginas
  sean muy rapidas a la hora de cargar.
  - En una SPA se tienen diferentes vistas no diferentes paginas. Estas webs se hacen en lenguaje
  JavaScript debido a que se ejecutan unica y exclusivamente en el lado del cliente.
  - No importa el tipo de backend que tengan detras, las SPA solo necesitan una API que les
  propocione el contenido para mostrar.
