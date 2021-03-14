import {showHome} from './homePage.js';

document.querySelector('form').addEventListener('submit', async e => {
    creatMove(e)
});

async function creatMove(e) {
    const token = sessionStorage.getItem('authToken');
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);

    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');

    await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'Context-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({title, description, imageUrl})
    })
    target.reset();
    showHome();
}

let mein;
let section;

export function setupAddMovie(meinTarget, sectionTarget) {
    mein = meinTarget;
    section = sectionTarget;
}

export function showAddMovie() {
    mein.innerHTML = '';
    mein.appendChild(section);
}