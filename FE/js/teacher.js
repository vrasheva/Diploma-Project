const TEACHER_DATA = {
    classes: [
        { id: 1, name: '10А клас', students: 25, subject: 'Математика' },
        { id: 2, name: '10Б клас', students: 23, subject: 'Математика' },
        { id: 3, name: '9А клас', students: 28, subject: 'Математика' }
    ],
    grades: [
        { id: 1, student: 'Иван Петров', class: '10А', subject: 'Математика', test: 'Тест 1', grade: 6.00 },
        { id: 2, student: 'Георги Димитров', class: '10А', subject: 'Математика', test: 'Тест 1', grade: 4.50 }
    ],
    requests: [
        { id: 1, type: 'edit', student: 'Иван Петров', class: '10А', oldGrade: 5.00, newGrade: 6.00, reason: 'Техническа грешка', status: 'pending', date: '2026-01-03' }
    ]
};

// Зареди класове за учител
function loadTeacherClasses() {
    const grid = document.getElementById('classesGrid');
    if (!grid) return;
    
    let html = '';
    TEACHER_DATA.classes.forEach(cls => {
        html += createCard(
            '👥',
            cls.name,
            `${cls.students} ученика • ${cls.subject}`
        );
    });
    
    grid.innerHTML = html;
}

// Зареди оценки за учител
function loadTeacherGrades() {
    const content = document.getElementById('gradesContent');
    if (!content) return;
    
    let html = '';
    TEACHER_DATA.grades.forEach(grade => {
        const gradeColor = grade.grade >= 5.5 ? '#28a745' : (grade.grade >= 4.5 ? '#ffc107' : '#dc3545');
        html += `
            <div class="card" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <div class="card-title">${grade.student}</div>
                        <div class="card-desc">${grade.subject} • ${grade.test}</div>
                    </div>
                    <div style="font-size: 32px; font-weight: bold; color: ${gradeColor};">${grade.grade.toFixed(2)}</div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn" onclick="requestGradeEdit(${grade.id})">✏️ Заяви промяна</button>
                    <button class="btn" style="background: #dc3545;" onclick="requestGradeDelete(${grade.id})">🗑️ Заяви изтриване</button>
                </div>
            </div>
        `;
    });
    
    html += `
        <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 12px; padding: 20px; margin-top: 20px;">
            <strong>ℹ️ Важно:</strong> За промяна или изтриване на оценка трябва да подадете заявка, която ще бъде одобрена от директора.
        </div>
    `;
    
    content.innerHTML = html;
}

// Зареди заявки на учителя
function loadTeacherRequests() {
    const content = document.getElementById('requestsContent');
    if (!content) return;
    
    let html = '';
    TEACHER_DATA.requests.forEach(request => {
        const statusClass = request.status === 'pending' ? 'status-pending' : 
                          request.status === 'approved' ? 'status-approved' : 'status-rejected';
        const statusText = request.status === 'pending' ? 'Очаква одобрение' : 
                         request.status === 'approved' ? 'Одобрена' : 'Отказана';
        
        html += `
            <div class="request-card">
                <div class="request-header">
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">Промяна на оценка</div>
                        <div style="color: #666; font-size: 14px; margin-top: 5px;">Подадена: ${formatDate(request.date)}</div>
                    </div>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div style="background: #FFF5F3; padding: 15px; border-radius: 8px;">
                    <div><strong>Ученик:</strong> ${request.student}, ${request.class}</div>
                    <div><strong>Стара оценка:</strong> ${request.oldGrade.toFixed(2)} → <strong>Нова:</strong> ${request.newGrade.toFixed(2)}</div>
                    <div style="margin-top: 10px;"><strong>Причина:</strong> ${request.reason}</div>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

// Функции за заявки
function requestGradeEdit(gradeId) {
    alert('Тук ще се отвори форма за заявка на промяна на оценка');
}

function requestGradeDelete(gradeId) {
    if (confirm('Сигурни ли сте, че искате да заявите изтриване на тази оценка?')) {
        alert('Заявката е изпратена към директора');
    }
}

function uploadMaterial() {
    alert('Тук ще се отвори форма за качване на материал');
}

function createTest() {
    alert('Тук ще се отвори форма за създаване на тест');
}

// Инициализация при зареждане
if (window.location.href.includes('teacher-dashboard.html')) {
    window.addEventListener('DOMContentLoaded', function() {
        loadTeacherClasses();
        loadTeacherGrades();
        loadTeacherRequests();
    });
}