window.addEventListener("load", () => {
    emailjs.init("HKcjaj3Lx74znEjM9");
});

const form = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submitBtn');

const sections = document.querySelectorAll("section, header");
const navLinksItems = document.querySelectorAll(".nav-links a");

const revealElements = document.querySelectorAll('.reveal');

const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-links');

// toggle burger
burger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// close menu on link click
navLinksItems.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});


function showError(input, message) {
    input.nextElementSibling.textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(e => e.textContent = "");
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoading(state) {
    submitBtn.disabled = state;
    submitBtn.textContent = state ? "Sending..." : "Send Message";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let valid = true;

    if (name.length < 2) {
        showError(form.name, "Name must be at least 2 characters");
        valid = false;
    }

    if (!validateEmail(email)) {
        showError(form.email, "Invalid email");
        valid = false;
    }

    if (message.length < 10) {
        showError(form.message, "Message must be at least 10 characters");
        valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
        await emailjs.send(
            "service_aulyqco",
            "template_y2a4jd3", {
                name,
                email,
                message
            }
        );

       showStatus("Message sent successfully!", "success");
       form.reset();

    } catch (error) {
        console.error(error);
        showStatus("Failed to send message", "error");
    }

    setLoading(false);
});

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = "block";

    setTimeout(() => {
        formStatus.style.opacity = "0";

        setTimeout(() => {
            formStatus.style.display = "none";
            formStatus.style.opacity = "1";
        }, 300);
    }, 3000);
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

function revealOnScroll() {
    revealElements.forEach((el, index) => {
        if (el.classList.contains('active')) return;

        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 150);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});