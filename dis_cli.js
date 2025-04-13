const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

async function downloadVideos(url) {
    if (!isValidUrl(url)) {
        console.error('URL inválida proporcionada');
        process.exit(1);
    }

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--ignore-certificate-errors']
    });

    const page = await browser.newPage();
    await page.goto('https://indown.io/insta-stories-download');

    // Esperar a que la página cargue
    await page.waitForSelector('input[name="link"]', { timeout: 60000 });

    // Escribir en el input
    await page.type('input[name="link"]', url);

    // Pulsar el botón "SEARCH"
    await page.click('button#get');

    // Esperar a que cargue la página con los videos
    try {
        await page.waitForSelector('video', { timeout: 60000 });
    } catch (error) {
        console.log('No se encontraron videos en el perfil proporcionado.');
        await browser.close();
        return;
    }

    // Obtener todas las URLs de los videos
    const videoUrls = await page.$$eval('video source', sources => {
        return sources.map(source => source.getAttribute('src'));
    });

    // Crear una carpeta para guardar los videos
    const downloadDir = path.join(__dirname, 'downloaded_videos');
    if (!fs.existsSync(downloadDir)) {
        await fsPromises.mkdir(downloadDir);
    }

    // Descargar cada video
    for (let i = 0; i < videoUrls.length; i++) {
        const videoUrl = videoUrls[i];
        if (!isValidUrl(videoUrl)) {
            console.error(`URL inválida para el video ${i + 1}: ${videoUrl}`);
            continue;
        }

        const videoName = `video_${i + 1}.mp4`;
        const videoPath = path.join(downloadDir, videoName);

        try {
            const response = await axios({
                url: videoUrl,
                method: 'GET',
                responseType: 'stream'
            });

            const writer = fs.createWriteStream(videoPath);
            response.data.pipe(writer);

            writer.on('finish', () => {
                console.log(`Video ${i + 1} descargado: ${videoName}`);
            });

            writer.on('error', (err) => {
                console.error(`Error al descargar el video ${i + 1}:`, err);
            });
        } catch (error) {
            console.error(`Error al descargar el video ${i + 1}:`, error);
        }
    }

    await browser.close();
}

// Manejar los argumentos de la línea de comandos
const argv = yargs(hideBin(process.argv))
    .option('url', {
        alias: 'u',
        describe: 'URL del perfil de Instagram',
        type: 'string',
        demand: true, // Asegura que el argumento sea obligatorio
    })
    .help()
    .alias('help', 'h')
    .argv;

// Llamar a la función principal con la URL proporcionada
downloadVideos(argv.url);