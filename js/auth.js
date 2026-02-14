// Authentication JavaScript File

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

// Toggle Password Visibility
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Form Validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
};

const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    
    error.className = 'error-message';
    error.textContent = message;
    error.style.cssText = `
        color: var(--danger-color);
        font-size: 0.8rem;
        margin-top: 5px;
        animation: slideDown 0.3s ease;
    `;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.style.borderColor = 'var(--danger-color)';
};

const removeError = (input) => {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    
    if (error) {
        error.remove();
    }
    
    input.style.borderColor = '#e1e1e1';
};

// Login Form Handler
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let isValid = true;
        
        // Reset errors
        removeError(email);
        removeError(password);
        
        // Validate email
        if (!validateEmail(email.value)) {
            showError(email, 'Email tidak valid');
            isValid = false;
        }
        
        // Validate password
        if (password.value.length < 6) {
            showError(password, 'Password minimal 6 karakter');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const button = loginForm.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
            button.disabled = true;
            
            // Simulate login API call
            setTimeout(() => {
                // Demo success
                alert('Login berhasil! (Demo)');
                window.location.href = 'index.html';
            }, 1500);
        }
    });
}

// Register Form Handler
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const email = document.getElementById('email');
        const userType = document.getElementById('userType');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.querySelector('input[type="checkbox"]');
        
        let isValid = true;
        
        // Reset errors
        [firstname, lastname, email, userType, password, confirmPassword].forEach(input => {
            if (input) removeError(input);
        });
        
        // Validate firstname
        if (firstname.value.length < 2) {
            showError(firstname, 'Nama depan minimal 2 karakter');
            isValid = false;
        }
        
        // Validate lastname
        if (lastname.value.length < 2) {
            showError(lastname, 'Nama belakang minimal 2 karakter');
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(email.value)) {
            showError(email, 'Email tidak valid');
            isValid = false;
        }
        
        // Validate user type
        if (!userType.value) {
            showError(userType, 'Pilih tipe pengguna');
            isValid = false;
        }
        
        // Validate password
        if (!validatePassword(password.value)) {
            showError(password, 'Password minimal 8 karakter, harus mengandung huruf besar, huruf kecil, dan angka');
            isValid = false;
        }
        
        // Validate confirm password
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Password tidak cocok');
            isValid = false;
        }
        
        // Validate terms
        if (!terms.checked) {
            alert('Anda harus menyetujui Syarat & Ketentuan');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const button = registerForm.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftar...';
            button.disabled = true;
            
            // Simulate registration API call
            setTimeout(() => {
                // Demo success
                alert('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi. (Demo)');
                window.location.href = 'login.html';
            }, 2000);
        }
    });
}

// Real-time validation for inputs
const inputs = document.querySelectorAll('.auth-form input, .auth-form select');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
    
    input.addEventListener('input', function() {
        removeError(this);
    });
});

// Password strength indicator
const passwordInput = document.getElementById('password');
if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const value = this.value;
        let strength = 0;
        
        if (value.length >= 8) strength++;
        if (value.match(/[a-z]/)) strength++;
        if (value.match(/[A-Z]/)) strength++;
        if (value.match(/[0-9]/)) strength++;
        if (value.match(/[^a-zA-Z0-9]/)) strength++;
        
        // Create or update strength indicator
        let indicator = this.closest('.form-group').querySelector('.strength-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'strength-indicator';
            this.closest('.form-group').appendChild(indicator);
        }
        
        const strengthText = ['Lemah', 'Cukup', 'Sedang', 'Kuat', 'Sangat Kuat'];
        const strengthColor = ['#f44336', '#ff9800', '#ffc107', '#4caf50', '#2196f3'];
        
        indicator.innerHTML = `
            <div class="strength-bar" style="width: ${strength * 20}%; background: ${strengthColor[strength-1] || '#ddd'}"></div>
            <span class="strength-text">${strengthText[strength-1] || ''}</span>
        `;
        
        indicator.style.cssText = `
            margin-top: 5px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        const bar = indicator.querySelector('.strength-bar');
        if (bar) {
            bar.style.cssText = `
                height: 4px;
                border-radius: 2px;
                transition: var(--transition);
                flex: 1;
            `;
        }
    });
}

// Social login buttons
const socialBtns = document.querySelectorAll('.social-btn');
socialBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        this.disabled = true;
        
        // Simulate OAuth
        setTimeout(() => {
            alert(`Login dengan ${provider} (Demo)`);
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Remember me functionality (demo)
const rememberCheckbox = document.querySelector('.checkbox-container input[type="checkbox"]');
if (rememberCheckbox) {
    // Check if there's saved email
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail && document.getElementById('email')) {
        document.getElementById('email').value = savedEmail;
        rememberCheckbox.checked = true;
    }
    
    rememberCheckbox.addEventListener('change', function() {
        const email = document.getElementById('email');
        if (this.checked && email) {
            localStorage.setItem('rememberedEmail', email.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    });
}

// Animated form transitions
const authCards = document.querySelectorAll('.auth-card');
authCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'var(--transition)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Input focus effects
document.querySelectorAll('.auth-form .form-group input, .auth-form .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.closest('.form-group').classList.remove('focused');
    });
});
