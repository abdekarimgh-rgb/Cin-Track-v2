import { createContent, deleteContent, getContents, updateContent } from "./api.js"
import { getData } from "./ui.js"

const dataApi = await getData()
console.log(dataApi)

function affichageAdmin(dataApi) {
    const contenairCntnt = document.getElementById('contenair-cntnt')
    contenairCntnt.innerHTML = ""
    const mesFav = dataApi.map(element => {
        return `
                 <div
                    class=" relative flex w-full gap-3 items-center text-slate-50 p-1 bg-slate-950 ">
                    <img class="h-16 rounded-lg"
                        src="${element.image}" alt="">
                    <div class="">
                        <h3 class="font-semibold text-8 mb-1 flex self-start">${element.title}</h3>
                        <div class="flex items-center">
                        <span class="bg-amber-600 p-0.5 rounded-lg mr-1 self-start inline-block">${element.type}</span>
                        <span class="text-slate-400">${element.releaseYear}</span>
                        </div>
                    </div>

                    <button data-number='${element.id}' class="edit absolute items-center right-12 p-1 rounded-lg hover:bg-slate-700 cursor-pointer hover:text-red-700">
                    <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    
                    <button data-number='${element.id}' class="supprimerAdmin absolute right-3 p-1 rounded-lg hover:bg-slate-700 cursor-pointer hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </button>
             </div>
             <hr class="text-slate-600">
            `
    })
    contenairCntnt.innerHTML = mesFav.join('')
}
affichageAdmin(dataApi)
supprimerData(dataApi)


function supprimerData(data) {
    const contenairCntnt = document.querySelector("#contenair-cntnt")
    contenairCntnt.addEventListener("click", async event => {

        const button = event.target.closest('.supprimerAdmin')


        if (!button) return;

        const id = button.dataset.number

        console.log(id)
        const film = data.find(element => element.id === id)
        if (!confirm(`Supprimer «${film.title}» ?`)) return;
        try {
            await deleteContent(id)

            data = data.filter(element => {
                return element.id !== id;
            })
            console.log(data)
            affichageAdmin(data)

        } catch (e) {
            console.error("Erreur suppression :", e)
        }

    })
}



let idModif = null;
function modification(data) {
    const modifier = document.getElementById("contenair-cntnt")

    modifier.addEventListener("click", event => {
        const btn = event.target.closest(".edit")
        if (!btn) return;
        const id = btn.dataset.number

        idModif = id

        console.log(idModif)

        if (idModif === null) {

        }

        const target = data.find(element => {
            return element.id === id
        })
        if (target.type === "series") {
            const derationSession = document.getElementById('deration-session')
            derationSession.innerHTML = `
                                        <label for="duree">Session *</label>
                                        <input type="number" name="duree" id="duree" value=${target.seasons.length}
                                            class="bg-slate-700 border border-slate-500 rounded-sm p-1 text-slate-100 text-base focus:outline-0">
                                    `

        }
        else {
            const derationSession = document.getElementById('deration-session')
            derationSession.innerHTML = `
                                        <label for="duree">duration *</label>
                                        <input type="number" name="duree" id="duree"
                                            class="bg-slate-700 border border-slate-500 rounded-sm p-1 text-slate-100 text-base focus:outline-0">
                                    `

        }
        console.log(target)

        const formMdf = document.getElementById("form-admin")

        const titre = document.getElementById('titre')
        titre.value = target.title
        const type = document.getElementById('type')
        type.value = target.type
        const annee = document.getElementById('annee')
        annee.value = target.releaseYear
        const duree = document.getElementById('duree')
        if (target.type === "series") {
            duree.value = target.seasons.length
        }
        else {
            duree.value = target.duration
        }


        const URL = document.getElementById('URL')
        URL.value = target.image

        //avatar

        const image = document.querySelector(".avatar-inp img")
        image.src = `${URL.value}`
        const titreAvatar = document.querySelector("#title-inp")
        titreAvatar.textContent = target.title

        const linkAvatar = document.querySelector("#link-inp")
        linkAvatar.textContent = target.image

        const Genres = document.getElementById('Genres')
        Genres.value = target.genres.join(", ")
        const Realisateur = document.getElementById('Realisateur')
        Realisateur.value = target.directors.join(', ')
        const paysProduction = document.getElementById('pays-production')
        paysProduction.value = target.productionCountries.join(", ")
        const Description = document.getElementById('Description')
        Description.value = target.description

        const formTitle = document.getElementById("formTitle")
        formTitle.textContent = "Modifier un titre"

        const buttonEnregester = document.getElementById("submit-cat")
        buttonEnregester.textContent = "Enregistrer les modifications"



    })
    appliqueModification(data)
}
modification(dataApi)

function recuperationDesDonnes() {
    const titre = document.getElementById("titre").value
    const type = document.getElementById('type').value
    const annee = Number(document.getElementById("annee").value)
    const duree = Number(document.getElementById("duree").value)
    const image = document.getElementById('URL').value

    const gener = document.getElementById("Genres").value.split(",").map(element => element.trim())

    const directors = document.getElementById("Realisateur").value.split(",").map(element => element.trim())

    const productionCountries = document.getElementById("pays-production").value.split(",").map(element => element.trim())

    const description = document.getElementById('Description').value

    let duration = null;
    let seasons = []
    if (type === "series") {
        for (let i = 1; i <= duree; i++) {
            seasons.push(i)
        }
    }
    else {
        duration = duree
    }

    const nouveauObject = {
        title: titre,
        type: type,
        releaseYear: annee,
        duration: duration,
        seasons: seasons,
        image: image,
        genres: gener,
        directors: directors,
        productionCountries: productionCountries,
        description: description
    }

    return nouveauObject;
}

console.log(recuperationDesDonnes())


function appliqueModification(data) {
    const formMdf = document.getElementById("form-admin")
    formMdf.addEventListener("submit", async event => {
        event.preventDefault()
        if (idModif === null) return;

        const nouveauObject = recuperationDesDonnes()

        const target = data.find(element => {
            return element.id === idModif
        })
        console.log(target)
        if (!confirm(`modification «${target.title}» ?`)) return;


        await updateContent(idModif, nouveauObject)



        const updata = await getContents()
        affichageAdmin(updata)

        const formTitle = document.getElementById("formTitle")
        formTitle.textContent = "Ajouter un titre"

        const titre = document.getElementById("titre").value = ""
        const type = document.getElementById('type').value = ""
        const annee = document.getElementById("annee").value = ""
        const duree = document.getElementById("duree").value = ""
        const image = document.getElementById('URL').value = ""
        const gener = document.getElementById("Genres").value = ""
        const directors = document.getElementById("Realisateur").value = ""
        const productionCountries = document.getElementById("pays-production").value = ""
        const description = document.getElementById('Description').value = ""
        const img = document.querySelector(".avatar-inp img").src = ""
        const titleInp = document.querySelector("#title-inp").textContent = ""
        const linkInp = document.getElementById("link-inp").textContent = ""

    })
}


function ajouter() {
    const type = document.getElementById('type')
    const labelDuration = document.getElementById("labelDuration");

    type.addEventListener("change", event => {

        if (type.value === "series" || type.value === "") {
            labelDuration.textContent = "Seassion *"
        }
        else {
            labelDuration.textContent = 'Durée (minutes) *'
        }
    })

    const formAjo = document.getElementById("form-admin")
    formAjo.addEventListener("submit", async event => {
        event.preventDefault()

        //doit verrifie le conflit entre ajoute est modifie
        if (!idModif) {
            try {
                const nouveauObject = recuperationDesDonnes()
                console.log(nouveauObject)
                const newdata = await createContent(nouveauObject)
                console.log("Ajoute succes", newdata)
            } catch (error) {
                console.error("Error ajoute", error)
            }
        }
    })

}

ajouter()