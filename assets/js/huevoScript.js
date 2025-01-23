var funMode = false;
var today = new Date();

// Regular days just use these emoji
var possibleEmoji = [
    '🐻',
    '🤓',
    '💻',
    '🧉',
    '👾',
    '🚀',
    '🤪'
];

// Special emoji if close to Christmas
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
         * generate random number that falls between 0 and the total number 
         * of emoji possibilities
        */
        var randomNumber = Math.round(Math.random() * possibleEmoji.length);

        var span = document.createElement('span');
        span.textContent = possibleEmoji[randomNumber];
        span.className = 'emoji click-emoji';
        /* 
         * event.clientX is where the mouse was horizontally at the time of 
         * the click. This way we can insert the emoji in the exact location 
         * the user clicked.
        */
        span.style.left = event.clientX + 'px';
        // event.clientY - same idea as clientX, but vertical position.
        span.style.top = event.clientY + 'px';
        /* Of course these values are useless if we don’t set the emoji's
         * position to something outside the normal flow of content. */
        span.style.position = 'fixed';
        document.body.appendChild(span);
    }
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 67) { // c
        // Find all emoji elements that we want to sweep away
        var clickEmoji = document.getElementsByClassName('click-emoji');
        var totalEmoji = clickEmoji.length;

        /* If you want to support older browsers you may want to 
         * polyfill forEach https://caniuse.com/#search=foreach
        */
        Array.from(clickEmoji).forEach(function (emoji, index) {
            /*
             * Change the animation delay to be random so that they fall off 
             * at different times, not all at once
            */
            var maximumDelay = totalEmoji.length > 10 ? 1000 : 400;
            if (index === 0) {
                emoji.style['animation-delay'] = 0 + 'ms';
            } else {
                emoji.style['animation-delay'] = Math.round(Math.random() * maximumDelay) + 'ms';
            }

            /* 
             * Make animation duration random as well for the same reason: 
             * Makes it more interesting if they fall at different speeds
             */
            emoji.style['animation-duration'] = Math.max(Math.round(Math.random() * 700), 100) + 'ms';

            // Once the emoji is done falling, we can remove it from the DOM
            emoji.addEventListener('animationend', function () {
                document.body.removeChild(emoji);
            });

            /*
             * The remainder of the animation logic is in CSS, triggered by 
             * the fall-down class
            */
            emoji.classList.add('fall-down');
        });

        funMode = false;
    };
});

cheet('o m a r', function () {
    funMode = true;
});