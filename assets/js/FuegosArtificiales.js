// use querySelector or getElementById
const fireworksContainer = document.querySelector('.fireworks-container')

const fireworksConfig = {
    hue: {
        min: 0,
        max: 345
    },
    delay: {
        min: 15,
        max: 15
    },
    speed: 10,
    acceleration: 1.2,
    friction: 0.96,
    gravity: 1,
    particles: 90,
    trace: 3,
    explosion: 6,
    autoresize: true,
    brightness: {
        min: 50,
        max: 80,
        decay: {
            min: 0.015,
            max: 0.03
        }
    },
    boundaries: {
        top: 50,
        bottom: fireworksContainer.clientHeight,
        left: 50,
        right: fireworksContainer.clientWidth
    },
    sound: {
        enable: true,
        files: [
            document.location.origin + document.location.pathname + 'assets/sounds/explosion0.mp3',
            document.location.origin + document.location.pathname + 'assets/sounds/explosion1.mp3',
            document.location.origin + document.location.pathname + 'assets/sounds/explosion2.mp3'
        ],
        volume: {
            min: 4,
            max: 8
        }
    },
    mouse: {
        click: true,
        move: false,
        max: 3
    }
}

const backgroundConfig = {
    backgroundColor: '#000000',
    backgroundImage: '',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    container: false,
    fps: false
}

if (document.location.hash) {
    try {
        const hash = document.location.hash.slice(1)
        const c = b64DecodeUnicode(hash).split(',')
            .map(Number)
            .filter(v => typeof v === 'number')

        if (c.length === 15) {
            fireworksConfig.hue.min = c[0]
            fireworksConfig.hue.max = c[1]
            fireworksConfig.delay.min = c[2]
            fireworksConfig.delay.max = c[3]
            fireworksConfig.brightness.min = c[4]
            fireworksConfig.brightness.max = c[5]
            fireworksConfig.brightness.decay.min = c[6]
            fireworksConfig.brightness.decay.max = c[7]
            fireworksConfig.speed = c[8]
            fireworksConfig.acceleration = c[9]
            fireworksConfig.friction = c[10]
            fireworksConfig.gravity = c[11]
            fireworksConfig.particles = c[12]
            fireworksConfig.trace = c[13]
            fireworksConfig.explosion = c[14]
        }
    } catch (err) {
        document.location.hash = ''
        console.log(err)
    }
}

const fireworks = new Fireworks(fireworksContainer, fireworksConfig)


$(document).ready(function () {
    if (esMiCumple() || esAnoNuevo() || esFundacionSantaCruz()) {
        fireworks.start();
        setTimeout(detenerFuegosArtificiales, 5000);
    }
});

function detenerFuegosArtificiales() {
    fireworks.stop();
}

function esMiCumple() {
    const fecha = new Date();
    const diaActual = fecha.getDate();
    const mesActual = fecha.getMonth();

    const diaNavidad = 3;
    const mesNavidad = 6;

    if ((diaActual == diaNavidad) && (mesActual == mesNavidad)) {
        return true;
    }
    else {
        return false;
    }


}
function esAnoNuevo() {
    const fecha = new Date();
    const diaActual = fecha.getDate();
    const mesActual = fecha.getMonth();

    const diaNavidad = 1;
    const mesNavidad = 0;

    if ((diaActual == diaNavidad) && (mesActual == mesNavidad)) {
        return true;
    }
    else {
        return false;
    }


}
function esFundacionSantaCruz() {
    const fecha = new Date();
    const diaActual = fecha.getDate();
    const mesActual = fecha.getMonth();

    const diaFestivo = 24;
    const mesFestivo = 8;

    if ((diaActual == diaFestivo) && (mesActual == mesFestivo)) {
        return true;
    }
    else {
        return false;
    }


}