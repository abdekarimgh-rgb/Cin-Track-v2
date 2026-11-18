import { getContents } from "./api.js"

export async function getData() {
    const container = document.getElementById("contenair-cntnt")
    try {
        container.textContent = 'chargement...'
        container.style.color = "green"
        const data = await getContents()

        container.textContent = "Chargement Termine..."
        return data

    } catch (e) {
    console.error("errer chargement data...! ",e)
    container.textContent = "Error chargement des donnes!"
    container.style.color = "red"
}
}