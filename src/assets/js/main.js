import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');

// TODO task004: ajouter les références DOM nécessaires pour les points de vente
// TODO task004: prévoir une variable d'état pour éviter de recharger inutilement les données

// Référence vers le bouton toggle des points de vente
const toggleSalesPointsBtn = document.querySelector('#toggle-sales-points-btn');

// Référence vers la section entière des points de vente (pour la cacher/montrer)
const salesPointsSection = document.querySelector('.sales-points-section');
const salesPointContainer = document.querySelector('#sales-points-container')
    // Variable d'état : true = visible, false = caché
    // Les données étant chargées au démarrage, on commence à true

let salesPointsVisible = true;

// true = les données ont déjà été chargées, false = pas encore
let salesPointsLoaded = false;

// Au clic sur le bouton toggle, on appelle la fonction toggleSalesPoints
toggleSalesPointsBtn.addEventListener('click', toggleSalesPoints);




loadSnacksBtn.addEventListener('click', loadSnacks);
// TODO task004: brancher ici l'événement du bouton des points de vente

async function loadSnacks() {
    feedback.textContent = '';

    try {
        const snacks = await fetchSnacks();
        displaySnacks(snacks);
    } catch (error) {
        console.error(error);
        feedback.textContent = 'Impossible de charger les snacks.';
    }
}

function displaySnacks(snacks) {
    snacksContainer.innerHTML = snacks.map((snack) => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name}</h3>
        <p>${snack.description}</p>
        <p class="price">chf ${snack.price.toFixed(2)}</p>
        <span class="fake-action">commander</span>
      </div>
    </article>
  `).join('');
    // TODO task002: adapter le rendu selon le cahier des charges
}

async function loadSalesPoint() {
    //feedback.textContent = '';

    // Si les données sont déjà chargées, on ne refait pas le fetch
    if (salesPointsLoaded) return;

    try {
        const SalesPoint = await fetchSalesPoints();
        displaySalesPoints(SalesPoint);
    } catch (error) {
        console.error(error);
        feedback.textContent = 'Impossible de charger les points de vente. Veuillez réessayer plus tard';
    }
}

function displaySalesPoints(SalesPoint) {
    salesPointContainer.innerHTML = SalesPoint.map((SalesPoint) => `
    <article class="sales-point-card">
      <h3>${SalesPoint.building}</h3>
      <p><strong>Salle :</strong> ${SalesPoint.room}</p>
      <p><strong>Horaires :</strong> ${SalesPoint.openingHours}</p>
      <p><strong>Email :</strong> ${SalesPoint.email}</p>
    </article>
  `).join('');
    // TODO task002: adapter le rendu selon le cahier des charges
}
loadSalesPoint()

// TODO task003: créer une fosnction loadSalesPoints
// TODO task003: créer une fonction displaySalesPoints
// TODO task005: afficher un message lisible si le chargement échoue

function toggleSalesPoints() {
    if (salesPointsVisible) {
        // La section est visible → on la cache
        salesPointsSection.classList.add('hidden');
        // On change le libellé du bouton
        toggleSalesPointsBtn.textContent = 'Afficher les points de vente';
        salesPointsVisible = false;
    } else {
        // La section est cachée → on l'affiche
        salesPointsSection.classList.remove('hidden');
        // On change le libellé du bouton
        toggleSalesPointsBtn.textContent = 'Masquer les points de vente';
        salesPointsVisible = true;
    }
}