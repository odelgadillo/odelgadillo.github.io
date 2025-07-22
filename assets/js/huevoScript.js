var funMode = false;
var today = new Date();

// En días normales solo se usan estos emoji
var possibleEmoji = [
    '🐻',
    '🤓',
    '💻',
    '🧉',
    '👾',
    '🚀',
    '🤪'
];

// Emoji especiales si es cerca de Navidad
if (today.getMonth() === 11 && [21, 22, 23, 24, 25, 26].indexOf(today.getDate()) !== -1) {
    possibleEmoji = [
        '❄️',
        '🎅',
        '🎁'
    ];
}

document.body.addEventListener('click', function (event) {

    if (funMode && !event.target.getAttribute("href") && event.target.parentNode.nodeName !== 'LABEL' && event.target.id !== 'easter-egg-hint') {
        /* 
         * Genera un número aleatorio entre 0 y el total de emojis posibles
        */
        var randomNumber = Math.round(Math.random() * possibleEmoji.length);

        var span = document.createElement('span');
        span.textContent = possibleEmoji[randomNumber];
        span.className = 'emoji click-emoji';
        /* 
         * event.clientX es la posición horizontal del mouse al momento del click.
         * Así podemos insertar el emoji exactamente donde el usuario hizo click.
        */
        span.style.left = event.clientX + 'px';
        // event.clientY - misma idea que clientX, pero posición vertical.
        span.style.top = event.clientY + 'px';
        /* Estos valores no sirven si no ponemos la posición del emoji
         * fuera del flujo normal del contenido. */
        span.style.position = 'fixed';
        document.body.appendChild(span);
    }
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 67) { // c
        // Buscar todos los elementos emoji que queremos eliminar
        var clickEmoji = document.getElementsByClassName('click-emoji');
        var totalEmoji = clickEmoji.length;

        /* Si quieres soportar navegadores antiguos, podrías usar un polyfill para forEach https://caniuse.com/#search=foreach */
        Array.from(clickEmoji).forEach(function (emoji, index) {
            /*
             * Cambia el delay de la animación para que caigan en diferentes momentos,
             * no todos al mismo tiempo
            */
            var maximumDelay = totalEmoji.length > 10 ? 1000 : 400;
            if (index === 0) {
                emoji.style['animation-delay'] = 0 + 'ms';
            } else {
                emoji.style['animation-delay'] = Math.round(Math.random() * maximumDelay) + 'ms';
            }

            /* 
             * También hace aleatoria la duración de la animación para que caigan a diferentes velocidades
             */
            emoji.style['animation-duration'] = Math.max(Math.round(Math.random() * 700), 100) + 'ms';

            // Cuando el emoji termina de caer, lo eliminamos del DOM
            emoji.addEventListener('animationend', function () {
                document.body.removeChild(emoji);
            });

            /*
             * El resto de la lógica de animación está en CSS, activada por la clase fall-down
            */
            emoji.classList.add('fall-down');
        });

        funMode = false;
    };
});

cheet('o m a r', function () {
    funMode = true;
});