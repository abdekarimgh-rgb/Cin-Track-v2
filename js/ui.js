import { getComments, getContents } from "./api.js"

export async function getData() {
    const container = document.getElementById("contenair-cntnt")
    try {
        container.textContent = 'chargement...'
        container.style.color = "green"
        const data = await getContents()

        container.textContent = "Chargement Termine..."
        return data

    } catch (e) {
        console.error("errer chargement data...! ", e)
        container.textContent = "Error chargement des donnes!"
        container.style.color = "red"
    }
}


export async function getCommentaire() {
    const spaceCommnet = document.querySelector(".spaceCommnet")
    try {
        spaceCommnet.textContent = 'chargement...'
        spaceCommnet.style.color = "green"
        const data = await getComments()

        spaceCommnet.textContent = "Chargement des commentaire Termine..."
        return data

    } catch (e) {
        console.error("errer chargement data...! ", e)
        spaceCommnet.textContent = "Error chargement des donnes!"
        spaceCommnet.style.color = "red"
    }
}
