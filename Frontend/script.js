// Diabetes Detection System - Frontend-Only Script (Client-Side)

// Base API URL (update to your backend, e.g., 'http://localhost:3000/api')
const API_BASE = 'http://localhost:3000/api'; // Change to your server URL

document.addEventListener('DOMContentLoaded', function() {
    // Landing Page Logic (mobile menu, smooth scroll, animations)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Optional: Scroll animations for feature cards
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ======= SIGNUP FORM =======
    const signupForm = document.getElementById('signupForm');
    const signupSubmitBtn = signupForm ? signupForm.querySelector('button[type="submit"]') : null;

    if (signupForm) {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateOfBirth').setAttribute('max', today);

        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const fullname = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const gender = document.getElementById('gender').value;
            const dateOfBirth = document.getElementById('dateOfBirth').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;

            let isValid = true;
            let errorMsg = '';

            // Validation
            if (!fullname) errorMsg = 'Full name is required.';
            else if (!email || !email.includes('@') || !email.includes('.')) errorMsg = 'Please enter a valid email address.';
            else if (!gender) errorMsg = 'Please select your gender.';
            else if (!dateOfBirth) errorMsg = 'Date of birth is required.';
            else {
                const birthDate = new Date(dateOfBirth);
                const todayDate = new Date();
                let age = todayDate.getFullYear() - birthDate.getFullYear();
                const monthDiff = todayDate.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())) age--;
                if (age < 18) errorMsg = 'You must be at least 18 years old to sign up.';
            }

            if (!password || password.length < 6) errorMsg = 'Password must be at least 6 characters long.';
            else if (password !== confirmPassword) errorMsg = 'Passwords do not match.';
            else if (!terms) errorMsg = 'You must agree to the terms and privacy policy.';

            if (errorMsg) {
                alert(errorMsg);
                return;
            }

            signupSubmitBtn.disabled = true;
            signupSubmitBtn.textContent = 'Creating Account...';

            try {
                const response = await fetch(`http://localhost:3000/api/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fullname, // Match backend naming
                        email,
                        gender,
                        dateOfBirth,
                        password
                    })
                });

                const data = await response.json();

                if (data.success) {
                    localStorage.setItem('userName', fullname);
                    if (data.token) localStorage.setItem('token', data.token);

                    alert(data.message || 'Account created successfully!');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message || 'Sign-up failed. Please try again.');
                }
            } catch (error) {
                console.error('Frontend API Error:', error);
                alert('Network error. Please check your connection and try again.');
            } finally {
                signupSubmitBtn.disabled = false;
                signupSubmitBtn.textContent = 'Sign Up';
            }
        });
    }

    // ======= LOGIN FORM =======
    const loginForm = document.getElementById('loginForm');
const loginSubmitBtn = loginForm ? loginForm.querySelector('button[type="submit"]') : null;

if (loginForm) {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberMe = document.getElementById('rememberMe');
    
    if (rememberedEmail && rememberMe) {
        document.getElementById('email').value = rememberedEmail;
        rememberMe.checked = true;
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMeChecked = document.getElementById('rememberMe').checked;

        let errorMsg = '';
        if (!email || !email.includes('@') || !email.includes('.')) errorMsg = 'Please enter a valid email.';
        else if (!password) errorMsg = 'Password is required.';

        if (errorMsg) {
            alert(errorMsg);
            return;
        }

        loginSubmitBtn.disabled = true;
        loginSubmitBtn.textContent = 'Logging In...';

        try {
            const response = await fetch(`http://localhost:3000/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // ✅ Save token, user info, and patientId for later use
                
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("patientId", data.user.userId);
      localStorage.setItem("userName", data.user.fullname || 'User');
      localStorage.setItem("gender", data.user.gender);
      localStorage.setItem("dateOfBirth", data.user.dateOfBirth);
                // ✅ Remember email if checkbox is checked
                if (rememberMeChecked) localStorage.setItem('rememberedEmail', email);
                else localStorage.removeItem('rememberedEmail');

                alert(data.message || 'Login successful!');
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Frontend API Error:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            loginSubmitBtn.disabled = false;
            loginSubmitBtn.textContent = 'Log In';
        }
    });
}


    // Logout
    window.logout = function() {
        localStorage.clear();
        window.location.href = 'index.html';
    };
});
