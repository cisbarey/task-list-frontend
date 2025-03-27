# Task List Frontend

Este proyecto es la parte frontend de una aplicación de lista de tareas desarrollada como parte del **Challenge Técnico FullStack Developer**. Está construido con **Angular 17**, utiliza **Angular Material** para el diseño, y está desplegado en **Firebase Hosting**.

## Descripción

La aplicación permite a los usuarios iniciar sesión con su correo, crear y gestionar tareas (agregar, marcar como completadas, eliminar), y cerrar sesión. El frontend se comunica con un backend en Google Cloud Functions para manejar las operaciones de usuarios y tareas.

- **URL Desplegada:** [https://clusterdb-eaaa6.web.app/login]
- **Repositorio Backend:** [task-list-backend](https://github.com/cisbarey/task-list-backend)

## Características

- **Autenticación:** Login con correo; si el usuario no existe, se ofrece crearlo.
- **Gestión de Tareas:** Crear, listar, marcar como completadas, y eliminar tareas.
- **Diseño Responsivo:** Adaptado para dispositivos móviles y de escritorio.
- **Angular Material:** Uso de componentes como `mat-form-field`, `mat-button`, `mat-checkbox`, `mat-list`, `mat-spinner`.
- **Spinners:** Indicadores de carga durante las llamadas al API (login, carga de tareas, agregar tarea, actualizar estado).
- **Modularidad:** Uso de lazy loading para los módulos `LoginModule` y `TasksModule`.
- **Optimización:** Ajuste de budgets en `angular.json` para cumplir con los requisitos de build.

## Tecnologías

- Angular 17
- Angular Material
- SCSS
- Firebase Hosting

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/cisbarey/task-list-frontend.git
   cd task-list-frontend