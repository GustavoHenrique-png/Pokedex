const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const fetchPokemon = () => {

    const pokemonPromises = []

    for (let i = 1; i <= 150; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
        

    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
           // console.log(pokemons)
            const liPokemons = pokemons.reduce((accumulator, pokemon) =>{
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                accumulator += `
                <li class = "card" ${types[0]}>
                    <img class = "cardImage " alt = "${pokemon.name}" src = "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                   <h2 class = "cardTitle">${pokemon.id}. ${pokemon.name}</h2> 
                   <p class = "cardSubtitle">${types.join(' | ')}</p>

                </li>
                `
                return accumulator

            },'')
            const ul  = document.querySelector('[data-js = pokedex]')
            //console.log(ul)
            ul.innerHTML = liPokemons
        })
    /*fetch(getPokemonUrl)
        .then(response => response.json())
        .then(pokemon =>{
            console.log(pokemon)
        })*/
}

fetchPokemon()