# Formulario de Admisión 

Este proyecto fue desarrollado en el editor de texto de Visual Studio Code y para el desarrollo del servidor se utilizó la API de json-server.

El proyecto válida a través de un formulario inical los NIT de las empresas registradas en nuestro servidor, si la empresa ingresa el NIT inválido no permite el ingreso, saltando una alerta indicando que no tiene el permiso necesario para acceder al formulario de registro, caso contrario si ingresa un NIT valido podrá darle paso al siguiente formulario. En dicho formulario se podría realizar la modificacion de los datos o ingresar nueva informacion según se desea, este formulario tendrá algunas validaciones y requerimientos necesarios para poder hacer un registro exitoso, en caso de no ser realizado con éxito se dispondra de algunas ayudas con información relevante para la corrección de los campos de texto.

## Requisitos

Para este proyecto necesitas tener instalado lo siguiente:
* Node.js
* Usar el servidor de json-server, el cual tiene un srcipt de ejecución a través de   la consola con la siguiente línea de comando:
  ~~~
  yarn server
  ~~~
  Este servidor está direccionado al puerto 8000 y la aplicación esta corriendo en     el puerto 3000.
  
### Configuración

Para configurar este proyecto de forma local sigue estas instrucciones:

1.Clona el proyecto de Git:
~~~
git clone
~~~
2.Instala las dependencias con YARN, el que tu prefieras:
 ~~~
yarn install
~~~
3.Crea un archivo .env con las variables de entorno:
~~~
REACT_APP_SERVER_URL="http://localhost:8000"
REACT_APP_BASE_URL="http://localhost:3000"
~~~
Ejecuta el proyecto en una terminal con el siguiente comando:
~~~
yarn start
~~~
Ejecuta el servidor en otra terminal con el siguiente comando:
~~~
yarn server
~~~
Con esto el proyecto correrá normalmente desde tu localhost.
