import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');

// TODO task004: ajouter les références DOM nécessaires pour les points de vente
// TODO task004: prévoir une variable d'état pour éviter de recharger inutilement les données

const salesPointContainer = document.querySelector('#sales-points-container')

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
//loadSalesPoint.addEventListener('click', loadSalesPoint);

async function loadSalesPoint() {
    //feedback.textContent = '';

    try {
        const SalesPoint = await fetchSalesPoints();
        displaySalesPoints(SalesPoint);
    } catch (error) {
        console.error(error);
        feedback.textContent = 'Impossible de charger les snacks.';
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
//loadSalesPoint()

// TODO task003: créer une fosnction loadSalesPoints
// TODO task003: créer une fonction displaySalesPoints
// TODO task005: afficher un message lisible si le chargement échoue