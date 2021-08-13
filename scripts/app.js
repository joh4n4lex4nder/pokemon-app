//const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
//const API_URL = 'https://pokeapi.co/api/v2/pokemon/151';
const API_URL = 'https://pokeapi.co/api/v2/pokemon/10';
//const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
const main = document.getElementById('main');

//Evento disparado cuando el documento HTML ha sido completamente cargado y luego continúa con el JavaScript
document.addEventListener('DOMContentLoaded', () => {
    //const random = getRandomInt(1, 151);
    getData(API_URL);
})

/*
//Función flecha para generar números aleatorios entre 1 y 151
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
*/

//Función asíncrona que envía la petición para consumir la información de la API y que espera hasta obtener toda la data para luego mostrarla
const getData = async (url) => {
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        console.log(data);
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name
        }
        showData(pokemon);
    } catch (error) {
          console.log(error);
    }
}

/*
const getData = (url) => {
    const peticion = fetch(url);
    peticion.then(res => res.json()) 
            .then(data => showData(data.sprites.other.dream_world.front_default))
}
*/

function showData(pokemon) {
    console.log(pokemon)
    main.innerHTML = ''

    pokemon.forEach((element) => {
        const{name, front_default} = element
        const pokemonElement = document.createElement('div')
        pokemonElement.classList.add('card')
        pokemonElement.innerHTML = `
            <div class="card">
                <img src="./images/bg-pattern-card.svg" alt="" class="card-header">
                <div class="card-body">
                    <img src="${front_default}" alt="" class="card-body-img">
                    <h2 class="card-body-title">
                        ${name}
                        <span>26</span>
                    </h2>
                    <p>Descripción</p>
                </div>
                <div class="card-footer">
                    <div class="card-footer-social">
                        <h3>80K</h3>
                        <p>Followers</p>
                    </div>
                    <div class="card-footer-social">
                        <h3>803K</h3>
                        <p>Likes</p>
                    </div>
                    <div class="card-footer-social">
                        <h3>1.4K</h3>
                        <p>Photos</p>
                    </div>
                </div>
            </div>
        `
        main.appendChild(pokemonElement)
    })
}