export default async function fetchSalesPoints() {
    const response = await fetch('../../data/points-of-sale.json');

    if (!response.ok) {
        throw new Error(`Unable to load salepoint: ${response.status}`);
    }

    return response.json();
}