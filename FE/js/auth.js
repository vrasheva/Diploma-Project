const DEMO_USERS = {
    'student@edu.bg': {
        password: 'student123',
        role: 'student',
        name: 'Иван Петров',
        class: '10А',
        id: 1
    },
    'teacher@edu.bg': {
        password: 'teacher123',
        role: 'teacher',
        name: 'Мария Иванова',
        subject: 'Математика',
        id: 2
    },
    'director@edu.bg': {
        password: 'director123',
        role: 'director',
        name: 'Петър Георгиев',
        id: 3
    }
};

// Проверка дали потребител е логнат
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Ако не е логнат и не е на login страницата, пренасочи към login
        if (!window.location.href.includes('login.html')) {
            window.location.href = '../html/login.html';
        }
        return null;
    }
    return JSON.parse(currentUser);
}

// Login функция
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        
        // Проверка на credentials
        const user = DEMO_USERS[email];
        
        if (!user || user.password !== password) {
            errorMessage.textContent = 'Невалиден имейл или парола!';
            errorMessage.classList.add('show');
            return;
        }
        
        // Успешен login - запази данните в localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            role: user.role,
            name: user.name,
            id: user.id,
            class: user.class,
            subject: user.subject
        }));
        
        // Пренасочи към съответния dashboard
        switch(user.role) {
            case 'student':
                window.location.href = 'student-dashboard.html';
                break;
            case 'teacher':
                window.location.href = 'teacher-dashboard.html';
                break;
            case 'director':
                window.location.href = 'director-dashboard.html';
                break;
        }
    });
}

// Logout функция
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Зареждане на потребителски данни при старт на dashboard страниците
function loadUserData() {
    const user = checkAuth();
    if (!user) return;
    
    // Актуализирай header информацията
    if (document.getElementById('userName')) {
        document.getElementById('userName').textContent = user.name;
    }
    
    if (document.getElementById('userAvatar')) {
        const initials = user.name.split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
        document.getElementById('userAvatar').textContent = initials;
    }
    
    // Актуализирай съдържанието специфично за всяка роля
    if (user.role === 'student' && document.getElementById('studentName')) {
        document.getElementById('studentName').textContent = user.name.split(' ')[0];
    }
    
    if (user.role === 'teacher' && document.getElementById('teacherName')) {
        document.getElementById('teacherName').textContent = user.name;
    }
    
    if (user.role === 'director' && document.getElementById('directorName')) {
        document.getElementById('directorName').textContent = user.name;
    }
    
    return user;
}

// Изпълни при зареждане на страницата
if (!window.location.href.includes('login.html')) {
    window.addEventListener('DOMContentLoaded', loadUserData);
}