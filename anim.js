// Sincronización exacta con la versión de audio enviada
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

var OFFSET = 3;
var lyricsData = [
  { time: 15, es: "Suspiraban lo mismo los dos...", en: "They both sighed the same thing..." },
  { time: 24, es: "Y hoy son parte de una lluvia lejos...", en: "And today they are part of a distant rain..." },
  { time: 31, es: "No te confundas, no sirve el rencor...", en: "Don't be confused, resentment is useless..." },
  { time: 39, es: "Son espasmos después del adiós...", en: "They are spasms after the goodbye..." },
  { time: 46, es: "Pones canciones tristes para sentirte mejor...", en: "You play sad songs to feel better..." },
  { time: 57, es: "Tu esencia es más visible...", en: "Your essence is more visible..." },
  { time: 61, es: "Del mismo dolor, vendrá un nuevo amanecer...", en: "From the pain itself, a new dawn will come..." },
  { time: 74, es: "Tal vez colmaban la necesidad...", en: "Maybe they fulfilled the need..." },
  { time: 81, es: "Pero hay vacíos que no pueden llenar...", en: "But there are voids they cannot fill..." },
  { time: 90, es: "No conocían la profundidad...", en: "They didn't know the depth..." },
  { time: 97, es: "Hasta que un día no dio para más...", en: "Until one day it couldn't take anymore..." },
  { time: 105, es: "Quedabas esperando ecos que no volverán...", en: "You were left waiting for echoes that won't return..." },
  { time: 115, es: "Flotando entre rechazos...", en: "Floating among rejections..." },
  { time: 119, es: "Del mismo dolor, vendrá un nuevo amanecer...", en: "From the pain itself, a new dawn will come..." },
  { time: 148, es: "Separarse de la especie por algo superior...", en: "Separating from the species for something higher..." },
  { time: 159, es: "No es soberbia, es amor...", en: "It's not pride, it's love..." },
  { time: 169, es: "No es soberbia, es amor...", en: "It's not pride, it's love..." },
  { time: 179, es: "Poder decir adiós...", en: "Being able to say goodbye..." },
  { time: 188, es: "...es crecer.", en: "...is growing." }
];

var lastLineTime = null; // recuerda qué línea está mostrada actualmente

function renderLine(line) {
  lyrics.innerHTML = `
    <div style="font-size: 1.5rem; font-weight: bold; color: #ffe600; text-shadow: 0 0 12px rgba(255,230,0,0.8);">${line.es}</div>
    <div style="font-size: 1.1rem; color: #ffffff; font-style: italic; margin-top: 4px; opacity: 0.85;">${line.en}</div>
  `;
  // Forzar reflow para que el navegador registre opacity:0 antes de animar a 1
  void lyrics.offsetWidth;
  lyrics.style.opacity = 1;
}

function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    if (currentLine.time !== lastLineTime) {
      // Cambió la línea: fundido de salida, luego swap de texto y fundido de entrada
      lastLineTime = currentLine.time;
      lyrics.style.opacity = 0;
      setTimeout(() => renderLine(currentLine), 350);
    }
  } else if (lastLineTime !== null) {
    lastLineTime = null;
    lyrics.style.opacity = 0;
    setTimeout(() => {
      lyrics.innerHTML = "";
    }, 800);
  }
}

setInterval(updateLyrics, 500);

// Ocultar título inicial
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  }
}

setTimeout(ocultarTitulo, 12000);