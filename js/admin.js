<<<<<<< Updated upstream
=======
import { deleteContent } from "./api.js"
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
        

        if(!button)return;

        const id = button.dataset.number

        console.log(id)
        const film = data.find(element => element.id === id)
        if (!confirm(`Supprimer «${film.title}» ?`)) return;
        try {
            await deleteContent(id)

            const newData = data.filter(element =>{
                return element.id !== id;
            })
            console.log(newData)
            affichageAdmin(newData)

        } catch(e){
            console.error("Erreur suppression :", e)
        }

    })
}
>>>>>>> Stashed changes
