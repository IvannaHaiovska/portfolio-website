const form = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
    formStatus.style.display = 'none';
    formStatus.classList.remove('success', 'error');

    let hasError = false;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name) {
        form.name.nextElementSibling.textContent = 'Please enter your name';
        hasError = true;
    }
    if (!email) {
        form.email.nextElementSibling.textContent = 'Please enter your email';
        hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        form.email.nextElementSibling.textContent = 'Email is not valid';
        hasError = true;
    }
    if (!message) {
        form.message.nextElementSibling.textContent = 'Please enter a message';
        hasError = true;
    }

    if (hasError) return;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showStatus('Message sent successfully!', 'success');
            form.reset();
        } else {
            showStatus('Oops! Something went wrong.', 'error');
        }
    } catch (err) {
        showStatus('Error sending message.', 'error');
        console.error(err);
    }
});

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.classList.add(type);
    formStatus.style.display = 'block';
    formStatus.style.opacity = '1';

    setTimeout(() => {
        formStatus.style.opacity = '0';
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.classList.remove(type);
        }, 500);
    }, 5000);
}

function checkFormPosition() {
    const rect = form.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        form.classList.add('show');
        window.removeEventListener('scroll', checkFormPosition);
    }
}

window.addEventListener('scroll', checkFormPosition);
checkFormPosition();