import {showLogin} from './loginPage.js'

let main;
let section;

document.getElementById('logIn').addEventListener('submit', async e => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('repeatPassword');
    console.log(email, password, rePass);

    if (email === '' || password === '' || rePass === '') {
        return alert('All fiels are required!');
    } else if (password !== rePass) {
        return alert('Passwprds do not match!');
    }
    const respons = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })

    if (respons.ok === false) {
        const error = respons.statusText;
        return alert(error);
    } else {
        const data = await respons.json();
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', data.email);
    }

    target.reset();
    showLogin();
})

export function setupRegister(mainTarget, selectionTarget) {
    main = mainTarget;
    section = selectionTarget;
}

export async function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);

}