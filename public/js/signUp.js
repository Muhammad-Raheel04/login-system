window.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const submitBtn = document.getElementById('submit');
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', (e) => {
       

        submitBtn.disabled = true;
        submitBtn.innerText = "Checking...";

        if (password.value.length < 8) {
            e.preventDefault(); // block only if submission fails
            submitBtn.innerText = "Password must be of at least 8 characters";
            setTimeout(() => {
                submitBtn.innerText = 'Sign Up';
                submitBtn.disabled = false;
            }, 3000)
            return;
        }
        submitBtn.innerText = "Signing you up...";
        submitBtn.disabled = true;
    })
})