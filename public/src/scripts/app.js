const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const fetchPokemon = () => {

    const pokemonPromises = []

    for (let i = 1; i <= 150; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
        

    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
           console.log(pokemons)
            const liPokemons = pokemons.reduce((accumulator, pokemon) =>{
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                const abilities = pokemon.abilities.map(abilitiesInfo => abilitiesInfo.ability.name)
                const status = pokemon.stats.map(statsInfo => statsInfo.stat.name)
                const namePokemon = pokemon.name
                const id = pokemon.id

                accumulator += `
                <li class = "card">
                    <img  alt="${namePokemon}" src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" }></img>
                    <h2 class ="card-title"> ${id}. ${namePokemon}. </h2>
                    <p calss="typeIndex ${types[0]}"> ${types.join(' | ')}</p>
                    <p class="moves">${abilities.join(' | ')}</p>
                    <div>
                        
                    </div>
                </li>
                `
                return accumulator

                console.log(liPokemons)

            },'')
            const ul  = document.querySelector('[data-js = pokedex]')
            //console.log(ul)
            ul.innerHTML = liPokemons
        })
}

fetchPokemon()