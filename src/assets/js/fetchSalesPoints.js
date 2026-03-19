export default async function fetchSalesPoints() {
    const response = await fetch('../../data/points-of-sale.json');
    //pour faire le teste de la task 5 pour comprendre il faut mettre un mauvais chemin et apres recharger la page et y aura le msg d erreur apres remttre le bon chemin
    if (!response.ok) {
        throw new Error(`Unable to load salepoint: ${response.status}`);
    }

    return response.json();
}