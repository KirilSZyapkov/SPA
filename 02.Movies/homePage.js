import {e} from './dom.js';
import {showMoviePrevie} from './movieDetails.js';

async function getMovie() {
    const respons = await fetch('http://localhost:3030/data/movies');
    const data = await respons.json();

    return data;
}

function creatPrevieMovie(movie) {
    const element = e('div', {className: 'card mb-4'},
        e('img', {className: 'card-img-top', src: movie.img, alt: 'Card image cap', width: '400'}),
        e('div', {className: 'card-body'}, e('h4', {className: 'card-title'}, movie.title)),
        e('div', {className: 'card - footer'}, e('a', {href: "#/details/6lOxMFSMkML09wux6sAF"}, e('button', {
            type: 'button',
            className: 'btn btn-info',
            id: movie._id,
        }, 'Details'))),
    );
    element.querySelector('button').addEventListener('click', showMoviePrevie);
    return element;
}

let mein;
let section;
let container;

export function setupHome(mainTarget, selectionTarget) {
    mein = mainTarget;
    section = selectionTarget;
    container = section.querySelector('.card-deck.d-flex.justify-content-center');
}

export async function showHome() {
    container.innerHTML = '';
    mein.innerHTML = '';

    const movie = await getMovie();
    const card = movie.map(creatPrevieMovie);

    card.forEach(c => container.appendChild(c));
    mein.appendChild(section);

    const acssesToken = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');
    const userMail = sessionStorage.getItem('userEmail');

    if(acssesToken === null){
        document.getElementById('addMovie').style.display = 'none';
        if(userId === null){
            document.getElementById('logoutBtn').style.display = 'none';
            document.getElementById('welcome').style.display = 'none';
            document.getElementById('loginBtn').style.display = 'inline';
            document.getElementById('registerBtn').style.display = 'inline';
        }
    } else {
        document.getElementById('addMovie').style.display = 'inline';
        if(userId !== null){
            document.getElementById('logoutBtn').style.display = 'inline';
            document.getElementById('welcome').style.display = 'inline';
            document.getElementById('welcome').textContent = `Welcome, ${userMail}`;
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('registerBtn').style.display = 'none';
        }
    }

}

