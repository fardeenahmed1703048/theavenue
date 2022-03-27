const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginFrom = document.getElementById("login-form");


loginBtn.addEventListener('click',(e) => {
   e.preventDefault();

    const inputEmail = email.value;
    const inputPassword = password.value;
    console.log(inputEmail, inputPassword);

    fetch(`http://localhost:8080/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: inputEmail, password: inputPassword})
    })
    .then(res => res.json())
    .then(data => {
        data && location.replace('admin.html')
        loginFrom.reset();

    })
})