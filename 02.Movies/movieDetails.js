import {e} from './dom.js';
import {showHome} from './homePage.js';
import {showEditMovie, setupEditMovie} from './editMovie.js';

function showMovie(movie, likes, ownLikes) {

    const result = e('div', {className: 'container'},
        e('div', {className: 'row bg-light text-dark'},
            e('h1', {}, `Movie title: ${movie.title}`),
            e('div', {className: 'col-md-8'},
                e('img', {className: 'img-thumbnail', src: `${movie.img}`, alt: 'Movie'})),
            e('div', {className: 'col-md-4 text-center', id: movie._id},
                e('h3', {className: 'my-3'}, 'Movie Description'),
                e('p', {}, movie.description),
                e('a', {className: 'btn btn-danger', href: 'javascript:void(0)'}, 'Delete'),
                e('a', {className: 'btn btn-warning', href: 'javascript:void(0)'}, 'Edit'),
                e('a', {className: 'btn btn-primary', href: 'javascript:void(0)'}, 'Like'),
                e('span', {className: 'enrolled-span'}, likes + ' Like' + (likes === 1 ? '' : 's')))
        ));

    const userId = sessionStorage.getItem('userId');
    const toke = sessionStorage.getItem('authToken');
    if (toke === null) {
        result.querySelector('.btn.btn-danger').style.display = 'none';
        result.querySelector('.btn.btn-warning').style.display = 'none';
        result.querySelector('.btn.btn-primary').style.display = 'none';
    }
    if (userId !== movie._ownerId && toke) {
        result.querySelector('.btn.btn-danger').style.display = 'none';
        result.querySelector('.btn.btn-warning').style.display = 'none';

    }
    if (userId === movie._ownerId) {
        result.querySelector('.btn.btn-primary').style.display = 'none';
    }

    return result;
}

let mein;
let section;

export function setupMoviePrevie(meinTarget, sectionTarget) {
    mein = meinTarget;
    section = sectionTarget;
}

export async function showMoviePrevie(id) {
    const respons = await fetch('http://localhost:3030/data/movies/' + id);
    let [data, likes, ownLikes] = await Promise.all([
        respons.json(),
        getMovieLikes(id),
        getMovieOwnLikes(id)
    ]);
    const movieSection = showMovie(data, likes, ownLikes);
    mein.innerHTML = '';
    section.innerHTML = '';

    section.appendChild(movieSection);
    mein.appendChild(section);

    if (ownLikes.length > 0) {
        movieSection.querySelector('.btn.btn-primary').remove();
    }
    const span = movieSection.querySelector('.btn.btn-primary');
    movieSection.querySelector('.col-md-4.text-center').addEventListener('click', async e => {
        const target = e.target;
        const targetTagName = target.tagName;
        const id = target.parentNode.id;
        const token = sessionStorage.getItem('authToken');
        if (targetTagName === 'A') {
            const targetName = target.textContent;
            if (targetName === 'Delete') {
                await fetch('http://localhost:3030/data/movies/' + id, {
                    method: 'delete',
                    headers: {'X-Authorization': token}
                });
                showHome();
            } else if (targetName === 'Edit') {
                const response = await fetch('http://localhost:3030/data/movies/' + id);
                const data = await response.json();
                const section = document.getElementById('edit-movie');
                const main = document.querySelector('main');
                setupEditMovie(main, section, data, id);
                showEditMovie();
            } else if (targetName === 'Like') {
                const response = await fetch('http://localhost:3030/data/likes', {
                    method: 'post',
                    headers: {
                        'Context-type': 'application/json',
                        'X-Authorization': token
                    },
                    body: JSON.stringify({movieId: data._id})
                });
                if (response.ok) {
                    target.remove();
                    likes++;
                    span.textContent = likes + ' Like' + (likes === 1 ? '' : 's');
                }
            }
        }

    });

    async function getMovieLikes(movieId) {
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
        const data = await response.json();
        return data
    };

    async function getMovieOwnLikes(movieId) {
        const userId = sessionStorage.getItem('userId')
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22 `);
        const data = await response.json();
        return data
    };
}