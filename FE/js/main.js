// Навигация между секции
function showSection(sectionName) {
    // Скрий всички секции
    const sections = document.querySelectorAll('.content > div[id$="Section"]');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Покажи избраната секция
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Актуализирай активния nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Утилитарна функция за форматиране на дата
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

// Утилитарна функция за създаване на карта
function createCard(icon, title, description, bgColor = '#FFF5F3', iconColor = '#FF7A59') {
    return `
        <div class="card">
            <div class="card-icon" style="background: ${bgColor}; color: ${iconColor};">${icon}</div>
            <div class="card-title">${title}</div>
            <div class="card-desc">${description}</div>
        </div>
    `;
}