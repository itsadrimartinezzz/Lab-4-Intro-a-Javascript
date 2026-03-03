const XP_POR_DIFICULTAD = {
  FACIL: 10,
  NORMAL: 25,
  DIFICIL: 50
};

function getCategoria(xp) {
  if (xp < 50) return "Novato";
  if (xp < 150) return "Constante";
  return "Legendario";
}

let misiones = [];
let nextId = 1;

const form = document.getElementById("missionForm");
const nombreEl = document.getElementById("nombre");
const descEl = document.getElementById("descripcion");
const diffEl = document.getElementById("dificultad");
const msgEl = document.getElementById("msg");

const listEl = document.getElementById("missionList");
const xpEl = document.getElementById("xpGlobal");
const catEl = document.getElementById("categoria");
const totalMEl = document.getElementById("totalM");

function calcularXpGlobal() {
  return misiones
    .filter(m => m.status === "SUCCESFUL")
    .reduce((acc, m) => acc + m.xp, 0);
}

function setMsg(text) {
  msgEl.textContent = text || "";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  const xpGlobal = calcularXpGlobal();
  xpEl.textContent = xpGlobal;
  catEl.textContent = getCategoria(xpGlobal);
  totalMEl.textContent = misiones.length;

  if (misiones.length === 0) {
    listEl.innerHTML = `
      <div class="item">
        <div class="left">
          <div class="title">
            <span class="name">No hay misiones</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  listEl.innerHTML = misiones.map(m => {
    const difficultyLabel =
      m.difficulty === "FACIL" ? "Fácil" : (m.difficulty === "NORMAL" ? "Normal" : "Difícil");

    const statusBadge = m.status === "SUCCESFUL"
      ? `<span class="badge">SUCCESFUL</span>`
      : `<span class="badge">PENDING</span>`;

    const disableBtn = m.status === "SUCCESFUL" ? "disabled" : "";

    return `
      <div class="item">
        <div class="left">
          <div class="title">
            <span class="name">${escapeHtml(m.name)}</span>
            ${statusBadge}
            <span class="badge">${difficultyLabel} • ${m.xp} XP</span>
          </div>

          <div class="desc">${escapeHtml(m.description)}</div>
        </div>

        <div class="actions">
          <button class="btn primary" ${disableBtn} onclick="marcarTerminada(${m.id})">
            Terminar
          </button>
          <button class="btn ghost" onclick="borrarMision(${m.id})">
            Borrar
          </button>
        </div>
      </div>
    `;
  }).join("");
}

window.marcarTerminada = function(id) {
  const m = misiones.find(x => x.id === id);
  if (!m) return;
  if (m.status === "SUCCESFUL") return;

  m.status = "SUCCESFUL";
  render();
};

window.borrarMision = function(id) {
  misiones = misiones.filter(x => x.id !== id);
  render();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setMsg("");

  const name = nombreEl.value.trim();
  const description = descEl.value.trim();
  const difficulty = diffEl.value;

  if (!name || !description) {
    setMsg("Completa nombre y descripción.");
    return;
  }

  const xp = XP_POR_DIFICULTAD[difficulty] ?? 0;

  const nueva = {
    id: nextId++,
    name,
    description,
    difficulty,
    xp,
    status: "PENDING"
  };

  misiones.unshift(nueva);

  console.log("Misión creada:", nueva);

  nombreEl.value = "";
  descEl.value = "";
  diffEl.value = "FACIL";

  setMsg("Misión agregada.");
  render();
});

render();