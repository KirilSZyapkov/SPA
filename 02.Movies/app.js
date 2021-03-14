import {setupHome, showHome} from './homePage.js';
import {setupLogin, showLogin} from './loginPage.js';
import {setupRegister, showRegister} from './registerPage.js';
import {setupAddMovie, showAddMovie} from './addMovie.js';
import {setupMoviePrevie, showMoviePrevie} from './movieDetails.js';

const links = {
    'homeLink': showHome,
    'loginBtn': showLogin,
    'registerBtn': showRegister,
    'addMovie': showAddMovie,
    'BUTTON': showMoviePrevie,
    'logoutBtn': logOut
}

const main = document.querySelector('main');

setupSection('home-page', setupHome);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);
setupSection('add-movie', setupAddMovie);
setupSection('movie-example', setupMoviePrevie);

setNavigation();

showHome();

function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section)
}

function setNavigation() {
    document.querySelector('nav').addEventListener('click', e => {
        const target = e.target;
        if (target.tagName === 'A') {
            const view = links[target.id];
            if (typeof view === 'function') {
                e.preventDefault();
                view();
            }
        }
    });
    document.getElementById('addMovie').addEventListener('click', e => {
        e.preventDefault();
        const target = e.target;
        const addView = links[target.id];
        addView();
    });

    document.getElementById('movie').addEventListener('click', e => {
        let target = e.target;
        if (target.tagName === 'BUTTON') {
            const view = links[target.tagName];
            const movieId = target.id;
            view(movieId);
        }
    });

}

async function logOut(){
    const confirmed = confirm('Are you sure?');
    if(confirmed){
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
    }
    showHome();
}