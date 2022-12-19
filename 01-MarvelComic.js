document.addEventListener("DOMContentLoaded", () => {
    
document.getElementById('comics').style.display = 'none';
document.getElementById('series').style.display = 'none';


const formularioComic = document.getElementById("buscarComic");

const inputFormato = document.getElementById("formato");
const inputTitulo = document.getElementById("titulo");
const inputAnio = document.getElementById("anio");

const cardComic = document.getElementById("cardComic");

const templateCardComic = document.getElementById("template-cardComic").content;

const fragment = document.createDocumentFragment();


////////////////////////////////////////////////////////////


const formularioSerie = document.getElementById("buscarSerie");
const inputTitle = document.getElementById("title");

const cardSerie = document.getElementById("cardSerie");

const templateCardSerie = document.getElementById("template-cardSerie").content;

const fragment2 = document.createDocumentFragment();

const urlComics = "http://gateway.marvel.com/v1/public/comics"
const urlSeries = "http://gateway.marvel.com/v1/public/series"

async function getSeriesByTitle(title) {
    const urlFetch = urlSeries + "?title=" + title +"&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9";
    const response = await fetch(urlFetch);
    const json = await response.json();
    console.log(json);
    return json;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getCharactersByElements(format, title, startyear)
{
    const urlFetch = urlComics + "?format=" + format + "&title=" + title + "&startYear=" + startyear +"&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9";
    const response = await fetch(urlFetch);
    const json = await response.json();
    console.log(json);
    return json;
}

formularioComic.addEventListener("submit", e => {
    e.preventDefault();
    const titulo = inputTitulo.value.trim();
    const formato = inputFormato.value.trim();
    const anio = inputAnio.value.trim();
    getCharactersByElements(formato,titulo,anio)
        .then(comics => { //Characters es el json que devuelve la función getCharactersbyName
            console.log(comics)
            pintarCards(comics);
        });
    
});
formularioSerie.addEventListener("submit", e => {
    e.preventDefault();
    const title = inputTitle.value.trim();
    getSeriesByTitle(title)
        .then(titulos => { //Titulos es el json que devuelve la función getSeriesByTitle
            console.log(titulos);
            pintarCards2(titulos);
        });
    
});

const pintarCards = comics => {
    cardComic.innerHTML="";
    
    comics.data.results.forEach(element =>{
        //cambiamos partes de la plantilla para cada personaje 
        templateCardComic.querySelector("img").setAttribute("src", element.thumbnail.path+`.`+element.thumbnail.extension);
        templateCardComic.querySelector("h4").textContent = `Título: ${element.title}`;
        templateCardComic.querySelector("h5").textContent = `Formato: ${element.format}`;
        //templateCardComic.querySelector("h6").textContent = `Año de comienzo: ${element.startYear}`;
        
        //clonamos la plantilla y la agregamos a un fragmento que ira acumulando todas las cards
        const clone = templateCardComic.cloneNode(true);
        fragment.appendChild(clone);
    })
    cardComic.appendChild(fragment);
}
const pintarCards2 = titulos => {
    cardSerie.innerHTML="";
    titulos.data.results.forEach(element =>{

        templateCardSerie.querySelector("img").setAttribute("src", element.thumbnail.path+`.`+element.thumbnail.extension);
        templateCardSerie.querySelector("h4").textContent = `Nombre: ${element.title}`;
        //clonamos la plantilla y la agregamos a un fragmento que ira acumulando todas las cards
        const clone = templateCardSerie.cloneNode(true);
        fragment2.appendChild(clone);
    })
    cardSerie.appendChild(fragment2);
}




});
