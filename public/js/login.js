// public/js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Create or select an error message container
    let errorMsg = document.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('p');
        errorMsg.className = 'error-message';
        errorMsg.style.color = 'red';
        errorMsg.style.marginTop = '10px';
        form.appendChild(errorMsg);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // prevent default form submission

        // Clear previous error
        errorMsg.textContent = '';

        const email = form.email.value.trim();
        const password = form.password.value.trim();

        if (!email || !password) {
            errorMsg.textContent = "Please enter both email and password.";
            return;
        }

        try {
            // Send login data via fetch
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });

            // If backend redirects (successful login)
            if (res.redirected) {
                window.location.href = res.url;
            } else {
                // If login failed, show error
                errorMsg.textContent = "Invalid email or password.";
            }
        } catch (err) {
            console.error("Login error:", err);
            errorMsg.textContent = "Something went wrong. Please try again.";
        }
    });
});
