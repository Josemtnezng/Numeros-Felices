const numberInput = document.getElementById('number-input');
const checkBtn = document.getElementById('check-btn');
const resultContainer = document.getElementById('result-container');
const musicBtn = document.getElementById('music-btn');

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let isMusicPlaying = false;

musicBtn.disabled = true;
musicBtn.style.cursor = 'wait';

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'uojri3jw5mE',
        playerVars: {
            'playsinline': 1,
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'uojri3jw5mE'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    musicBtn.disabled = false;
    musicBtn.style.cursor = 'pointer';
}

musicBtn.addEventListener('click', function() {
    if (isMusicPlaying) {
        player.pauseVideo();
        isMusicPlaying = false;
        musicBtn.textContent = '🎵';
    } else {
        player.playVideo();
        isMusicPlaying = true;
        musicBtn.textContent = '🔇';
    }
});

function verificarNumero() {
    const valor = numberInput.value;

    if (valor === '') {
        resultContainer.innerHTML = '<p style="color: red;">Escribe un numero.</p>';
        return;
    }

    const numero = parseInt(valor);

    if (isNaN(numero) || numero < 1) {
        resultContainer.innerHTML = '<p style="color: red;">Tiene que ser un numero positivo.</p>';
        return;
    }

    let numeroActual = numero;
    const secuencia = [];
    const numerosVistos = [];

    while (numeroActual !== 1 && !numerosVistos.includes(numeroActual)) {
        numerosVistos.push(numeroActual);
        secuencia.push(numeroActual);
        
        let suma = 0;
        const digitos = String(numeroActual).split('');
        for (let i = 0; i < digitos.length; i++) {
            suma = suma + (digitos[i] * digitos[i]);
        }
        numeroActual = suma;
    }
    secuencia.push(numeroActual);

    const esFeliz = numeroActual === 1;
    
    let htmlFinal = esFeliz
      ? `<p class="result-message happy">✅ El numero ${numero} es un Numero Feliz!</p>`
      : `<p class="result-message unhappy">❌ El numero ${numero} es un Numero Triste.</p>`;

    htmlFinal += `<p class="result-sequence"><strong>Secuencia:</strong> ${secuencia.join(' → ')}</p>`;
    
    resultContainer.innerHTML = htmlFinal;
}

checkBtn.addEventListener('click', verificarNumero);

numberInput.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter') {
        verificarNumero();
    }
});
