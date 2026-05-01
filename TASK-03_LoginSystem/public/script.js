document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const userError = document.getElementById('userError');
    const pwdError = document.getElementById('pwdError');
    const apiError = document.getElementById('apiError');
    const apiSuccess = document.getElementById('apiSuccess');
    const loginBtn = document.getElementById('loginBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        userError.style.display = 'none';
        pwdError.style.display = 'none';
        apiError.style.display = 'none';
        apiSuccess.style.display = 'none';

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Validations
        let isValid = true;
        if (!username) {
            userError.style.display = 'block';
            isValid = false;
        }
        if (password.length < 6) {
            pwdError.style.display = 'block';
            isValid = false;
        }

        if (!isValid) return;

        loginBtn.disabled = true;
        loginBtn.innerText = 'Authenticating...';

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (data.success) {
                apiSuccess.innerText = data.message;
                apiSuccess.style.display = 'block';
            } else {
                apiError.innerText = data.message;
                apiError.style.display = 'block';
            }
        } catch (err) {
            apiError.innerText = 'Network error. Please try again.';
            apiError.style.display = 'block';
        } finally {
            loginBtn.disabled = false;
            loginBtn.innerText = 'Sign In';
        }
    });

    // Clear API error when typing
    [usernameInput, passwordInput].forEach(inp => {
        inp.addEventListener('input', () => {
            apiError.style.display = 'none';
            apiSuccess.style.display = 'none';
        });
    });
});
