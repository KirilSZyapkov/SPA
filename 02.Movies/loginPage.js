import {showHome} from './homePage.js';

document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === '' || password === '') {
        return alert('All fields are required!');
    }
    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })

    if (response.ok === false) {
        const error = response.statusText;
        return alert(error);
    } else {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', data.email);
    }

    target.reset();
    showHome();
});


let main;
let section;

export function setupLogin(mainTarget, selectionTarget) {
    main = mainTarget;
    section = selectionTarget;
}

export async function showLogin() {
    main.innerHTML = '';
    main.appendChild(section);
}