document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    getData(random);
})

//Función para retornar un número aleatorio
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const getData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); //Fetch por defecto hace el consumo en GET(solo lectura)
        const data = await res.json();
        console.log(data);

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat
        }
        paintCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

const paintCard = (pokemon) => {
    //console.log(pokemon); Se imprime el objeto pokemon con toda la información
    const main = document.querySelector('.container');
    const template = document.getElementById('template-card').content;
    const cloneTemplate = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    cloneTemplate.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    cloneTemplate.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
    cloneTemplate.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp';
    cloneTemplate.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque;
    cloneTemplate.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial;
    cloneTemplate.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa;

    fragment.appendChild(cloneTemplate);
    main.appendChild(fragment);
}