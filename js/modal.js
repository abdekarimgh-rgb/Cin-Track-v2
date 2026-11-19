import { createComment } from "./api.js"



export function modal(dataApi) {
    const filmes = document.querySelectorAll('.filmes')
    filmes.forEach(filme => {
        filme.addEventListener('click', (e) => {
            const filmeInfo = dataApi.find(element => {
                return element.id === filme.id
            })

            const body = document.querySelector('body')
            const divModal = document.createElement('div')
            divModal.id = 'divModal'

            divModal.className = "fixed inset-0 z-50 flex justify-center flex flex-col items-center "

            let timeOrSeasons = ""
            if (filmeInfo.type === "movie") {
                timeOrSeasons = `${filmeInfo.duration} min`
            }
            else {
                timeOrSeasons = `${filmeInfo.seasons.length} Seasons`
            }

            divModal.innerHTML = `
            <div class="relative items-center border shadow-xl rounded-2xl p-4 bg-slate-900 flex flex-col gap-4 max-h-[90vh] overflow-y-auto  ">
            <div class="flex flex-col gap-4 sm:flex-row md:flex-row">
                <button id="closeModal" class="absolute top-2 right-2 z-10 p-3 rounded-full bg-slate-700 hover:bg-red-500">✕</button>
                <img src="${filmeInfo.image}" alt="" class="flex align-top object-cover rounded-2xl max-w-60">
                <div class="flex flex-col gap-4">
                    <div class="flex gap-2 font-semibold text-slate-50">
                        <span class="bg-amber-600 rounded-sm px-2">${filmeInfo.type}</span>
                        <span>${filmeInfo.releaseYear}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-50">${filmeInfo.title}</h3>
                    <div class="flex gap-3">
                        <div class=" bg-slate-700 border border-slate-600 rounded-lg px-2">
                            <span>${timeOrSeasons} min</span>
                        </div>
                        <div class="bg-slate-700 border border-slate-600 rounded-lg px-2">
                            <span>${filmeInfo.productionCountries.join(' - ')}</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <p class="text-xs font text-slate-500 font-semibold">GENRES</p>
                        <div id="genres" class="flex gap-2">
                        
                        </div>
                    </div>
                    <div>
                        <p class="text-xs font text-slate-500 font-semibold">Réalisateur(s)</p>
                        <p class="text-slate-100">${filmeInfo.directors}</p>
                    </div>
                    <div>
                        <p class="text-xs font text-slate-500 font-semibold">Synopsis</p>
                        <p class="text-slate-100">${filmeInfo.description}</p>
                    </div>
                </div>
            </div>    
                    <hr>
                    <section class="flex flex-col w-full md:flex-row-reverse">
                    <form id="formComments" for="" class="text-slate-500 border bg-slate-950 rounded-xl p-2 w-full">
                        <p id="validateur" class="text-red-700-200"></p>
                        <div class="flex flex-col">
                            <label for="nomComment">Nom *</label>
                            <input type="text" name="nomComment" id="nomComment" class="bg-slate-500 rounded-lg p-1 text-slate-100 px-2">
                        </div>
                        <div class="flex flex-col mb-1">
                            <label for="commentaire" >Commentaire *</label>
                            <textarea name="commentaire" id="commentaire" class="bg-slate-500 rounded-lg max-6 resize-none text-slate-100 px-2"></textarea>
                        </div>
                        <button class="bg-red-600 flex justify-center rounded-lg p-2 text-slate-50 font-semibold cursor-pointer hover:scale-101">Ajoute aux favoris</button>
                    </form>
                    <div class="text-slate-500 border bg-slate-950 rounded-xl p-2 w-full">
                        <h3 class="font-semibold text-slate-200" >Avis des utilisateurs*</h3>
                        <div class="spaceCommnet" class="p-2">
                            <p class="text-center items-center "><i>Aucun Comments</i></p>
                        </div>
                    </div>
                    </section>
                 
            </div>
            `

            body.appendChild(divModal)
            const genres = document.getElementById('genres')
            const infoGenres = filmeInfo.genres

            infoGenres.forEach(element => {
                genres.innerHTML += `<span class="bg-slate-700 border border-slate-600 rounded-lg px-2">${element}</span>`
            })

            comments(filme)

            const closeModal = document.getElementById('closeModal')
            closeModal.addEventListener('click', (e) => {
                const divModal = document.getElementById('divModal')
                divModal.remove()
            })
        })
    })

}


 function comments(filme) {

    const formComments = document.getElementById('formComments')
    formComments.addEventListener("submit", event => {
        event.preventDefault()


        const contentId = filme.id
        const author = document.getElementById("nomComment").value.trim()
        const text = document.getElementById("commentaire").value.trim()
        const createdAt = new Date()


        const validateur = document.getElementById("validateur")
        if (!author || !text) {
            validateur.textContent = "Touts les chemps est obligatoire!"
            validateur.style.color = "red"
            return;
        }
        validateur.textContent = ""

        const object = {
            contentId: contentId,
            author: author,
            text: text,
            rating: null,
            createdAt: createdAt
        }
        console.log(object)
        
        createComment(object)
        document.getElementById("nomComment").value = ""
        document.getElementById("commentaire").value = ""
    })
}
