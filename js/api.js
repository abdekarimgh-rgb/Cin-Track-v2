const BASE_URL = "https://6afaee0d730c1d152f32c40c.mockapi.io/"

export async function request(path, options ={}) {
    try {
        const response = await fetch(BASE_URL + path, {
            headers: { "content-type": "application/json"},
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        const data = await response.json()
        console.log(data)

        return data

    } catch (error) {
        console.log(error.message)
        const body = document.querySelector('body')
        const message = document.createElement('div')
        message.className = 'fixed inset-0 flex items-center justify-center z-50'
        message.innerHTML = `<div class="flex flex-col justify-around bg-slate-300 text-slate-950 rounded-xl h-40 w-90 text-center ">
                <h3 class="text-3xl font-semibold">Erreur de chargement</h3>
                <p>Impossible de charger les films et séries. Veuillez réessayer.</p>
                <button class="bg-red-700 w-20 rounded-sm p-1 mx-auto">Fermer</button>
            </div>`

        body.appendChild(message)
    }
}

export const getContents = () => request("/contents");

export const getComments = () => request("/comments");

export const createContent = (data) =>
     request("/contents", {
        method: "POST",
        body: JSON.stringify(data)
    });


export const updateContent = (id, data) => 
    request(`/contents/:${id}`, {
        method: "PUT", 
        body: JSON.stringify(data)
    });


export const deleteContent = (id) =>
    request(`/contents/:${id}`, {
        method: "DELETE"
    });
