// 25 preguntas
const preguntas = [
  { pregunta:"¿Quién construyó el arca?", opciones:["Moisés","Noé","Abraham"], correcta:"Noé" },
  { pregunta:"¿Dónde nació Jesús?", opciones:["Jerusalén","Belén","Nazaret"], correcta:"Belén" },
  { pregunta:"¿Cuántos libros tiene la Biblia?", opciones:["66","72","39"], correcta:"66" },
  { pregunta:"¿Cuál fue el primer milagro de Jesús?", opciones:["Sanar un ciego","Caminar sobre el agua","Convertir agua en vino"], correcta:"Convertir agua en vino" },
  { pregunta:"¿Quién fue tragado por un pez gigante?", opciones:["Jonás","Pedro","Pablo"], correcta:"Jonás" },
  { pregunta:"¿Quién recibió los 10 mandamientos?", opciones:["David","Abraham","Moisés"], correcta:"Moisés" },
  { pregunta:"¿Qué apóstol negó a Jesús tres veces?", opciones:["Juan","Pedro","Tomás"], correcta:"Pedro" },
  { pregunta:"¿Cuál fue el primer hombre?", opciones:["Abel","Caín","Adán"], correcta:"Adán" },
  { pregunta:"¿Quién escribió muchos salmos?", opciones:["Salomón","David","Isaías"], correcta:"David" },
  { pregunta:"¿Quién traicionó a Jesús?", opciones:["Pedro","Judas","Tomás"], correcta:"Judas" },
  { pregunta:"¿Quién fue la madre de Jesús?", opciones:["Marta","María","Elisabet"], correcta:"María" },
  { pregunta:"¿Cómo se llama el primer libro de la Biblia?", opciones:["Génesis","Éxodo","Levítico"], correcta:"Génesis" },
  { pregunta:"¿Quién fue el hermano de Moisés?", opciones:["Aarón","José","David"], correcta:"Aarón" },
  { pregunta:"¿Qué instrumento tocaba David?", opciones:["Flauta","Arpa","Tambor"], correcta:"Arpa" },
  { pregunta:"¿Quién fue la esposa de Adán?", opciones:["Sara","Eva","Rebeca"], correcta:"Eva" },
  { pregunta:"¿Qué profeta desafió a los profetas de Baal?", opciones:["Elías","Isaías","Jeremías"], correcta:"Elías" },
  { pregunta:"¿Qué cayó del cielo para alimentar a los israelitas?", opciones:["Pan","Maná","Agua"], correcta:"Maná" },
  { pregunta:"¿Dónde recibió Moisés los mandamientos?", opciones:["Monte Carmelo","Monte Sinaí","Monte Hermón"], correcta:"Monte Sinaí" },
  { pregunta:"¿Quién mató a Goliat?", opciones:["David","Saúl","Samuel"], correcta:"David" },
  { pregunta:"¿Qué libro habla del fin del mundo?", opciones:["Hechos","Apocalipsis","Romanos"], correcta:"Apocalipsis" },
  { pregunta:"¿Cuántos discípulos tuvo Jesús?", opciones:["10","12","14"], correcta:"12" },
  { pregunta:"¿Qué mar fue dividido por Moisés?", opciones:["Mar Rojo","Mar de Galilea","Mar Muerto"], correcta:"Mar Rojo" },
  { pregunta:"¿Quién subió al cielo en un carro de fuego?", opciones:["Elías","Moisés","Isaías"], correcta:"Elías" },
  { pregunta:"¿Qué animal habló con Eva?", opciones:["León","Serpiente","Halcón"], correcta:"Serpiente" },
  { pregunta:"¿Quién fue vendido por sus hermanos?", opciones:["José","Benjamín","Rubén"], correcta:"José" }
];

const total = preguntas.length;
const nombre = localStorage.getItem("nombre");
const numero = localStorage.getItem("numero");
const jugado = localStorage.getItem("jugado");

// Recupera índice y puntos guardados, o inicia en 0
let indice = parseInt(localStorage.getItem("indice")) || 0;
let puntos = parseInt(localStorage.getItem("puntos_current")) || 0;
let tiempo = 15, intervalo;

window.addEventListener("DOMContentLoaded", () => {
  if (!nombre || !numero) {
    document.body.innerHTML = "<h2>No iniciaste sesión.</h2>";
    return;
  }
  if (jugado === "true") {
    document.body.innerHTML = "<h2>Ya completaste el quiz.</h2>";
    return;
  }
  document.getElementById("totalPreguntas").textContent = total;
  showQuestion();
});

function showQuestion() {
  if (indice >= total) return endQuiz();

  // Guarda el estado actual
  localStorage.setItem("indice", indice);
  localStorage.setItem("puntos_current", puntos);

  const q = preguntas[indice];
  document.getElementById("pregunta").textContent = q.pregunta;
  const opts = document.getElementById("opciones");
  opts.innerHTML = "";
  q.opciones.forEach(o => {
    const btn = document.createElement("button");
    btn.textContent = o;
    btn.onclick = () => selectAnswer(o);
    opts.appendChild(btn);
  });
  document.getElementById("numPregunta").textContent = indice + 1;

  tiempo = 15;
  document.getElementById("tiempo").textContent = tiempo;
  clearInterval(intervalo);
  intervalo = setInterval(() => {
    tiempo--;
    document.getElementById("tiempo").textContent = tiempo;
    if (tiempo === 0) {
      clearInterval(intervalo);
      indice++;
      showQuestion();
    }
  }, 1000);
}

function selectAnswer(opcion) {
  clearInterval(intervalo);
  if (opcion === preguntas[indice].correcta) puntos++;
  indice++;
  showQuestion();
}

function endQuiz() {
  clearInterval(intervalo);
  document.getElementById("question-card").classList.add("hidden");
  document.getElementById("result-card").classList.remove("hidden");

  // Llena la tabla con resultados
  const fila = document.createElement("tr");
  [nombre, numero, `${puntos} / ${total}`].forEach(texto => {
    const td = document.createElement("td");
    td.textContent = texto;
    fila.appendChild(td);
  });
  document.querySelector("#resultTable tbody").appendChild(fila);

  localStorage.setItem("puntos", puntos);
  localStorage.setItem("jugado", "true");
}
