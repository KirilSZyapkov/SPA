import {showHome} from './homePage.js';

let mein;
let section;
let movie;
let movieId;

export function setupEditMovie(meinTarget, sectionTarget, data, id) {
    movie = data;
    mein = meinTarget;
    section = sectionTarget;
    section.querySelector('form');
    const form = section.childNodes[1];

    form[0].value = movie.title;
    form[1].value = movie.description;
    form[2].value = movie.imageUrl;
    movieId = id;

    section.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('authToken');
        const target = e.target;
        const formData = new FormData(target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        await fetch('http://localhost:3030/data/movies/' + movieId, {
            method: 'put',
            headers: {'X-Authorization': token},
            body: JSON.stringify({title, description, imageUrl})
        })
        showHome();
    });
}

export function showEditMovie() {
    mein.innerHTML = '';
    mein.appendChild(section);
}

