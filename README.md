# HRM System - Printamax

El **HRM System** es una aplicación web de gestión de recursos humanos desarrollada con **React** y **Tailwind CSS**, utilizando **Node.js** para la visualización. Permite a los usuarios gestionar funciones clave relacionadas con la administración de empleados, incluyendo la gestión de vacaciones, la contratación de candidatos y la creación de perfiles de empleados. Este sistema está diseñado para ser utilizado por diferentes roles dentro de la organización, como trabajadores, especialistas en recursos humanos y gerentes de recursos humanos.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario interactivas y dinámicas.
- **Tailwind CSS**: Framework de diseño CSS que facilita la creación de interfaces de usuario personalizadas y atractivas mediante clases de utilidad.
- **Lucide Icons**: Biblioteca de íconos que se utiliza para representar funciones clave dentro de la aplicación, como el acceso a perfiles y la gestión de vacaciones.
- **React State Management**: Utilización de `useState` para gestionar el estado de la aplicación, como la autenticación de usuarios y la navegación entre módulos.
- **Node.js**: Entorno de ejecución de JavaScript que se utiliza para el servidor y la visualización de la aplicación en el navegador.

## Funcionalidades

### Autenticación y Roles de Usuario
- Los usuarios pueden ingresar con un correo electrónico y contraseña.
- Tres roles de usuario disponibles:
  - **Trabajador**: Acceso a la gestión de vacaciones y soporte.
  - **Especialista en Recursos Humanos**: Acceso a la gestión de candidatos, creación de perfiles de empleados y gestión de vacaciones.
  - **Gerente de Recursos Humanos**: Acceso a la gestión de vacaciones, gestión de perfiles y soporte.

### Módulos Disponibles
- **Gestión de Vacaciones**: Los usuarios pueden solicitar y gestionar días de vacaciones.
- **Gestión de Candidatos**: Los especialistas en recursos humanos pueden gestionar la contratación de candidatos.
- **Soporte (Chatbot)**: Acceso a soporte interactivo mediante un chatbot.
- **Gestión de Perfiles**: Los gerentes de recursos humanos pueden gestionar y actualizar los perfiles de los empleados.
- **Creación de Perfil de Empleado**: Los especialistas pueden crear y gestionar perfiles de nuevos empleados.

## Instalación

1. Clona este repositorio en tu máquina local:
   git clone https://github.com/JeremyParada/HRM-demo-Printamax.git

2. Navega al directorio del proyecto:
    cd hrm-system
3. Instala las dependencias:
    npm install
4. Inicia el servidor de desarrollo con Node.js:
    npm start

Esto abrirá la aplicación en http://localhost:3000.