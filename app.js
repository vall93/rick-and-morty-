//obtenemos nuestros html
const root = document.getElementById('root');
const loader = document.getElementById('contenedor');
const totalPersonajes = document.getElementById('total-personajes');

// paginado

const paginaActual = document.getElementById('pagina-actual');
const totalPaginas = document.getElementById('total-paginas');
const nextPage = document.getElementById('next-page');
const firstPage = document.getElementById('first-page');
const previusPage = document.getElementById('previus-page');
const lastPage = document.getElementById('last-page');

// filtros

const todos = document.getElementById('todos');
const mujeres = document.getElementById('mujeres');
const hombres = document.getElementById('hombres');
const sinGenero = document.getElementById('sinGenero');
const desconocido = document.getElementById('desconocido');

let pagina = 1;
let total = 0;

const getData = async () => {
  const url = `https://rickandmortyapi.com/api/character?page=${pagina}`
  const response = await fetch(url)
  const json = await response.json();
  total = json.info.pages;
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total
  printData(json.results)
  // setTimeout(() => {
    root.classList.remove('esconder')
    loader.classList.add('esconder')
  // },1700)
  updatePagination()
  data = json;
  return json;
}

let data = {};

const printData = arr => {
  let card = '';
  totalPersonajes.innerHTML = arr.length
  arr.forEach((personaje) => {
    card = card + `
    <div class="col s12 m6 l3">
      <div class="card">
        <div class="card-image">
          <img src=${personaje.image}>
        </div>
        <div class="card-content">
          <p>Nombre: ${personaje.name}</p>
          <p>Género: ${personaje.gender}</p>
          <p>Especie: ${personaje.species}</p>
          <p>Estado: ${personaje.status}</p>
          <p>Origen: ${personaje.origin.name}</p>
          <p>Locación: ${personaje.location.name}</p>
        </div>
      </div>
    </div>`
  })
  root.innerHTML = card;
}

const pagination = async promesa => {
  const result = await promesa
  nextPage.addEventListener('click', () => {
    pagina += 1;
    getData()
  })
  previusPage.addEventListener('click', () => {
    pagina -= 1;
    getData()
  })
  lastPage.addEventListener('click', () => {
    if(pagina < result.info.pages){
      pagina = result.info.pages
      getData()
    }
  })
  firstPage.addEventListener('click', () => {
    if(pagina > 2){
      pagina = 1;
      getData()
    }
  })
}

const updatePagination = () => {
  if(pagina <= 1){
    previusPage.disabled = true;
    firstPage.disabled = true;
  } else {
    previusPage.disabled = false;
    firstPage.disabled = false;
  }
  if(pagina === total ){
    nextPage.disabled = true
    lastPage.disabled = true
  } else {
    nextPage.disabled = false
    lastPage.disabled = false
  }
}

mujeres.addEventListener('click', () => {
  const arr = data.results;
  let arrMujeres = [];
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].gender === 'Female'){
      arrMujeres.push(arr[i])
    }
  }
  printData(arrMujeres)
});

hombres.addEventListener('click', () => {
  const arr = data.results;
  const arrHombres = arr.filter(personaje => personaje.gender === 'Male');
  printData(arrHombres);
});

sinGenero.addEventListener('click', () =>{
    const arr = data.results;
    const arrsingenero = arr.filter(personaje => personaje.gender === 'Genderless');
    printData(arrsingenero);
});

desconocido.addEventListener('click', () =>{
    const arr =data.results;
    const arrdesconosido = arr.filter(personajes => personajes.gender === 'unknown');
    printData(arrdesconosido);
})

todos.addEventListener('click', () => {
  const arr = data.results;
  printData(arr)
});
pagination(getData())


          
// Realizar solicitud a la API
let episodios = 1;

const tengoData = async()=>{
  const url=('https://rickandmortyapi.com/api/episode')


.then(response => response.json())
.then(data => {
// Procesar los datos y mostrarlos en el contenedor
const episodes = data.results;
    episodes.forEach(episode => {
const episodeDiv = document.createElement('div');
    episodeDiv.innerHTML = `
        <h2>${episode.name}</h2>
        <p>Episodio: ${episode.episode}</p>
        <p>Fecha de emisión: ${episode.air_date}</p>`;
            episodesContainer.appendChild(episodeDiv);
          });
        })
.catch(error => {
  console.error('Error:', error);
});}
