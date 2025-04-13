# Instagram Stories Downloader

## English

### Description
This Node.js project uses Puppeteer to automate the download of Instagram stories. It validates the provided URL, navigates to a web service, extracts video URLs, and downloads each video to a local directory. The application is command-line driven, making it easy to use for batch downloads.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/manuel-marg/download_instagram_stories_cli.git
   cd download_instagram_stories_cli
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Usage

1. **Run the application:**
   ```sh
   node dis_cli.js --url <InstagramProfileURL>
   ```

   Replace `<InstagramProfileURL>` with the URL of the Instagram profile from which you want to download stories.

### Example
```sh
node dis_cli.js --url https://www.instagram.com/exampleprofile/
```

### Dependencies
- **puppeteer-extra**: Enhanced version of Puppeteer.
- **puppeteer-extra-plugin-stealth**: Plugin to make Puppeteer less detectable.
- **axios**: For handling HTTP requests to download videos.
- **yargs**: For parsing command-line arguments.
- **fs** and **path**: For file system operations and path manipulations.

## Español

### Descripción
Este proyecto en Node.js utiliza Puppeteer para automatizar la descarga de historias de Instagram. Valida la URL proporcionada, navega a un servicio web, extrae las URLs de los videos y descarga cada video a un directorio local. La aplicación es impulsada por la línea de comandos, lo que la hace fácil de usar para descargas por lotes.

### Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/manuel-marg/download_instagram_stories_cli.git
   cd download_instagram_stories_cli
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

### Uso

1. **Ejecuta la aplicación:**
   ```sh
   node dis_cli.js --url <URLDelPerfilDeInstagram>
   ```

   Reemplaza `<URLDelPerfilDeInstagram>` con la URL del perfil de Instagram del cual deseas descargar las historias.

### Ejemplo
```sh
node dis_cli.js --url https://www.instagram.com/perfildeejemplo/
```

### Dependencias
- **puppeteer-extra**: Versión mejorada de Puppeteer.
- **puppeteer-extra-plugin-stealth**: Plugin para hacer que Puppeteer sea menos detectable.
- **axios**: Para manejar solicitudes HTTP para descargar videos.
- **yargs**: Para analizar argumentos de la línea de comandos.
- **fs** y **path**: Para operaciones del sistema de archivos y manipulaciones de rutas.