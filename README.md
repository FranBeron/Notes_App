# Aplicacion Notes
Esta es una aplicación de notas que permite al usuario crear, editar y eliminar notas. También se pueden marcar notas como favoritas y buscar notas por contenido.

# Tecnologías utilizadas
-Angular

-Firebase Authentication

-Firebase Realtime Database

-Bootstrap

# Funcionalidades
-Crear notas con título, contenido y color de fondo personalizado.

-Editar notas existentes.

-Eliminar notas.

-Marcar notas como favoritas.

-Buscar notas por contenido.

-Ordenar notas por fecha de creación y favoritos.

-Descargar notas en formato de archivo de texto.

Iniciar sesión con correo electrónico y contraseña o con Google.

Cerrar sesión.

# Estructura del proyecto

src/app/components: contiene los componentes de la aplicación.

src/app/models: contiene la definición de la clase Note.

src/app/pipes: contiene el filtro de búsqueda FilterPipe.

src/app/services: contiene los servicios de autenticación y base de datos.

src/app/app.component.: componente principal de la aplicación.

src/app/app.module.ts: módulo principal de la aplicación.

src/app/firebase.config.ts: archivo de configuración de Firebase.

#Cómo ejecutar la aplicación
*Clonar el repositorio.

*Crear un proyecto en Firebase y configurar la autenticación con correo electrónico y contraseña y la base de datos en tiempo real.

*Copiar las credenciales de Firebase en el archivo 

*firebase.config.ts

*Ejecutar npm install para instalar las dependencias.

*Ejecutar ng serve para iniciar la aplicación en http://localhost:4200

# Licencia
Este proyecto está bajo la Licencia MIT. Consulte el archivo LICENSE para obtener más información.
