// ========================================
// API Configuration
// ========================================
// ВАЖНО: Промени с твоя Backend URL след стартиране на Visual Studio
const API_URL = 'https://localhost:7132/api';

// ========================================
// DOM Elements
// ========================================
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// ========================================
// Show Error Message
// ========================================
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// ========================================
// Hide Error Message
// ========================================
function hideError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

// ========================================
// Login Handler
// ========================================
async function handleLogin(email, password) {
    try {
        const response = await fetch(`${API_URL}/api/Users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email.trim(), 
                password: password 
            })
        });
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return data;
        
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
}

// ========================================
// Redirect Based on Role
// ========================================
function redirectUser(roleId) {
    const routes = {
        1: 'student-dashboard.html',      // Student
        2: 'teacher-dashboard.html',      // Teacher
        3: 'director-dashboard.html',     // Director
        4: 'director-dashboard.html',     // Vice Director
    };
    
    const route = routes[roleId] || '../index.html';
    window.location.href = route;
}

// ========================================
// Form Submit Event
// ========================================
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Basic validation
    if (!email || !password) {
        showError('Моля, попълнете всички полета!');
        return;
    }
    
    // Disable button during request
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Влизане...';
    
    try {
        const data = await handleLogin(email, password);
        
        if (data.success) {
            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loginTime', new Date().toISOString());
            
            // Show success message
            submitButton.textContent = '✓ Успешен вход!';
            submitButton.style.background = '#28a745';
            
            // Redirect after short delay
            setTimeout(() => {
                redirectUser(data.user.roleId);
            }, 800);
            
        } else {
            // Show error from server
            showError(data.message || 'Грешен email или парола!');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
        
    } catch (error) {
        // Network or server error
        showError('Грешка при свързване със сървъра! Уверете се, че backend-ът работи.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        console.error('Detailed error:', error);
    }
});

// ========================================
// Check if already logged in
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('user');
    
    if (isLoggedIn === 'true' && user) {
        try {
            const userData = JSON.parse(user);
            // Redirect to appropriate dashboard
            redirectUser(userData.roleId);
        } catch (error) {
            // Invalid stored data, clear it
            localStorage.clear();
        }
    }
});

// ========================================
// Demo Quick Login (optional)
// ========================================
// Uncomment if you want quick login buttons for testing
/*
document.addEventListener('DOMContentLoaded', () => {
    const demoCredentials = document.querySelector('.demo-credentials');
    
    // Add click handlers to demo credentials
    const demos = demoCredentials.querySelectorAll('p');
    demos.forEach((demo, index) => {
        if (index > 0) { // Skip the title
            demo.style.cursor = 'pointer';
            demo.addEventListener('click', () => {
                const text = demo.textContent;
                const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
                const passMatch = text.match(/pass\d+/);
                
                if (emailMatch && passMatch) {
                    emailInput.value = emailMatch[0];
                    passwordInput.value = passMatch[0];
                }
            });
        }
    });
});
*/