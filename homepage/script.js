const catalog = [
  {
    id: "npl-s3",
    kind: "live",
    title: "NPL Season 3 Live Broadcast",
    year: "2026",
    duration: "Live",
    genres: "Cricket",
    match: "Live now",
    description: "Nepal Premier League Season 3 live broadcast.",
    embedUrl: "https://cr7world.pages.dev/mpd/?id=fancode"
  },
  {
    id: "bajirao-mastani",
    kind: "movie",
    title: "Now Playing Bajirao Mastani",
    year: "2015",
    duration: "2h 37m",
    genres: "Drama, Romance",
    match: "98% Match",
    description: "A war-time love story in which the warrior Bajirao (Ranveer Singh) falls for Mastani (Deepika Padukone) while married to Kashibai (Priyanka Chopra). A Hindi drama about sacrifice and the acceptance of love.",
    embedUrl: "https://ok.ru/videoembed/4394229762723?nochat=1"
  },
  {
    id: "jailer-2",
    kind: "movie",
    title: "Jailer 2",
    year: "2026",
    duration: "2h 44m",
    genres: "Action, Thriller",
    match: "New",
    description: "A retired officer's peaceful life is disrupted when a dangerous criminal organization threatens his family. He must use his skills one final time to protect his loved ones and preserve his legacy. Directed and written by Nelson Dilipkumar. Starring Rajinikanth, Mohanlal and Shivarajkumar.",
    embedUrl: "https://www.vidy.st/movie/1234139?play=true"
  },
    {
    id: "bethlehem-kudumba-unit",
    kind: "movie",
    title: "Bethlehem Kudumba Unit",
    year: "2026",
    duration: "2h 36m",
    genres: "Romance, Comedy, Drama",
    match: "New",
    description: "Ashley's homecoming from abroad takes an emotional turn when a wedding next door stirs memories of her first love, Justin.",
    embedUrl: "https://www.movy.sx/movie/1508168?play=true"
  }
];

const frame = document.getElementById("playerFrame");
const placeholder = document.getElementById("placeholder");
const titleEl = document.getElementById("title");
const metaEl = document.getElementById("meta");
const descEl = document.getElementById("description");
const cardsEl = document.getElementById("cards");
const navButtons = document.querySelectorAll("nav button");

let currentId = catalog[0].id;
let filter = "all";

function play(item) {
  currentId = item.id;
  document.title = item.title + " | Streamflix";
  titleEl.textContent = item.title;
  descEl.textContent = item.description;
  metaEl.innerHTML = "";

  const bits = [];
  if (item.kind === "live") bits.push({ text: "LIVE", className: "live-pill" });
  if (item.match) bits.push({ text: item.match, className: "match" });
  bits.push({ text: item.year });
  bits.push({ text: "HD", className: "badge" });
  bits.push({ text: item.duration });
  bits.push({ text: item.genres });

  bits.forEach((bit) => {
    const span = document.createElement("span");
    if (bit.className) span.className = bit.className;
    span.textContent = bit.text;
    metaEl.appendChild(span);
  });

  if (item.embedUrl) {
    placeholder.classList.remove("visible");
    frame.style.display = "block";
    frame.src = item.embedUrl;
    frame.title = item.title;
  } else {
    frame.removeAttribute("src");
    frame.style.display = "none";
    placeholder.classList.add("visible");
    placeholder.querySelector("h2").textContent = item.title;
  }

  renderCards();
}

function renderCards() {
  cardsEl.innerHTML = "";
  catalog
    .filter((item) => filter === "all" || item.kind === filter)
    .forEach((item) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card" + (item.kind === "live" ? " live-card" : "") + (item.id === currentId ? " active" : "");
      card.innerHTML =
        (item.kind === "live" ? '<span class="tag">LIVE</span>' : "") +
        "<strong>" + item.title + "</strong>" +
        "<span>" + item.year + " · " + item.genres + "</span>";
      card.addEventListener("click", () => play(item));
      cardsEl.appendChild(card);
    });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    navButtons.forEach((b) => b.classList.toggle("active", b === button));
    renderCards();
  });
});

document.getElementById("fullscreenBtn").addEventListener("click", () => {
  const target = frame.style.display === "none" ? document.querySelector(".player") : frame;
  if (target.requestFullscreen) target.requestFullscreen();
});

document.getElementById("restartBtn").addEventListener("click", () => {
  const item = catalog.find((entry) => entry.id === currentId);
  if (!item) return;
  if (item.embedUrl) {
    frame.src = item.embedUrl;
  } else {
    play(item);
  }
});

play(catalog[0]);
