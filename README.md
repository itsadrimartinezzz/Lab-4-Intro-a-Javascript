# Laboratorio #4 — Intro a JavaScript

## Descripción
Este laboratorio consiste en crear **disci-app**, una aplicación de gamification para reforzar hábitos usando un sistema de **misiones** y **recompensas** (XP). 
La idea es que el usuario cree misiones (hábitos), las complete y vaya acumulando XP global para subir de categoría.

## Tecnologías
- HTML
- CSS
- JavaScript (Vanilla)

**Importante:** No se usan librerías, frameworks, ni dependencias externas. Todo es **HTML/CSS/JS puro**.

## Estructura del proyecto

El código fuente se encuentra dentro del directorio `app/`:

```text
Lab-4-Intro-a-Javascript/
├── app/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── README.md
├── .gitignore
└── capturas/
    ├── 01-home.png
    ├── 02-crear-mision.png
    └── 03-succesful-xp.png
```

## Requisitos del laboratorio (Checklist)

- Crear cada misión con: nombre, descripción, dificultad
- XP por dificultad:
  - Fácil: 10 XP
  - Normal: 25 XP
  - Difícil: 50 XP
- XP global = suma de todas las misiones terminadas
- 3 categorías según el XP global del usuario
- `console.log` por cada misión creada para validar estructura
- Mostrar misiones en una lista legible
- El usuario puede marcar una misión como terminada y queda con estado "SUCCESFUL"
- (Opcional) Montaje en nginx para correr desde servidor local

## Cómo ejecutar la app (Local)

### Opción 1: Abrir el HTML directamente

1. Abrir el archivo `app/index.html` en cualquier navegador web.

### Opción 2: Live Server (VS Code)

1. Abrir la carpeta del proyecto en VS Code.
2. Click derecho en `app/index.html`.
3. Seleccionar **Open with Live Server**.

## Montaje en nginx

1. Copiar contenido a la carpeta web:

```bash
sudo rm -rf /var/www/html/*
sudo cp -r app/* /var/www/html/
```

2. Reiniciar nginx:

```bash
sudo systemctl restart nginx
```

3. Abrir en el navegador:

```text
http://localhost
```

## Capturas de pantalla

### Vista principal de la aplicación

![Vista principal](capturas/Normla.png)


## Video demostrativo

https://www.canva.com/design/DAHC3m51z1g/k-yeJrdRbjdl4cpaz5yNlw/edit?utm_content=DAHC3m51z1g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

