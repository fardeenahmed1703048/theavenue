const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginFrom = document.getElementById("login-form");


loginBtn.addEventListener('click',async (e) => {
   e.preventDefault();

    const inputEmail = email.value;
    const inputPassword = password.value;
    // console.log(inputEmail, inputPassword);

    await fetch(`https://salty-caverns-30855.herokuapp.com/login`,{
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