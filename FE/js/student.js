const STUDENT_DATA = {
    subjects: [
        { id: 1, name: 'Математика', lessons: 5, tests: 2, icon: '📚' },
        { id: 2, name: 'Физика', lessons: 3, tests: 1, icon: '🔬' },
        { id: 3, name: 'Български език', lessons: 2, tests: 3, icon: '📖' },
        { id: 4, name: 'История', lessons: 4, tests: 1, icon: '📜' }
    ],
    materials: [
        { id: 1, subject: 'Математика', chapter: 'Глава 3: Квадратни уравнения', lesson: 'Урок 3.1: Въведение', hasAI: true },
        { id: 2, subject: 'Математика', chapter: 'Глава 3: Квадратни уравнения', lesson: 'Урок 3.2: Решаване', hasAI: true },
        { id: 3, subject: 'Физика', chapter: 'Глава 2: Механика', lesson: 'Урок 2.1: Движение', hasAI: false }
    ],
    tests: [
        { id: 1, subject: 'Математика', name: 'Тест 1: Квадратни уравнения', deadline: '2026-01-10', status: 'active' },
        { id: 2, subject: 'Физика', name: 'Тест 2: Кинематика', deadline: '2026-01-08', status: 'active' }
    ],
    grades: [
        { subject: 'Математика', grade: 6.00, test: 'Тест 1', date: '2025-12-15' },
        { subject: 'Физика', grade: 5.50, test: 'Контролно', date: '2025-12-20' },
        { subject: 'Български език', grade: 5.00, test: 'Есе', date: '2025-12-18' }
    ]
};

// Зареди предмети за ученик
function loadStudentSubjects() {
    const grid = document.getElementById('subjectsGrid');
    if (!grid) return;
    
    let html = '';
    STUDENT_DATA.subjects.forEach(subject => {
        html += createCard(
            subject.icon,
            subject.name,
            `${subject.lessons} урока • ${subject.tests} теста`
        );
    });
    
    grid.innerHTML = html;
}

// Зареди материали за ученик
function loadStudentMaterials() {
    const content = document.getElementById('materialsContent');
    if (!content) return;
    
    let html = '';
    STUDENT_DATA.materials.forEach(material => {
        html += `
            <div class="card" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <div class="card-title">${material.chapter}</div>
                        <div class="card-desc">${material.lesson}</div>
                        <div style="margin-top: 10px; color: #666; font-size: 13px;">
                            📄 PDF учебник ${material.hasAI ? '• 🎧 AI преразказ достъпен' : ''}
                        </div>
                    </div>
                    <button class="btn">Отвори</button>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

// Зареди тестове за ученик
function loadStudentTests() {
    const content = document.getElementById('testsContent');
    if (!content) return;
    
    let html = '';
    STUDENT_DATA.tests.forEach(test => {
        html += `
            <div class="card" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <div class="card-title">${test.name}</div>
                        <div class="card-desc">${test.subject}</div>
                        <div style="margin-top: 10px; color: #666; font-size: 13px;">
                            📅 Краен срок: ${formatDate(test.deadline)}
                        </div>
                    </div>
                    <button class="btn">Започни</button>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

// Зареди оценки за ученик
function loadStudentGrades() {
    const content = document.getElementById('gradesContent');
    if (!content) return;
    
    let html = '';
    STUDENT_DATA.grades.forEach(grade => {
        const gradeColor = grade.grade >= 5.5 ? '#28a745' : (grade.grade >= 4.5 ? '#ffc107' : '#dc3545');
        html += `
            <div class="card" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div class="card-title">${grade.subject}</div>
                        <div class="card-desc">${grade.test} • ${formatDate(grade.date)}</div>
                    </div>
                    <div style="font-size: 32px; font-weight: bold; color: ${gradeColor};">${grade.grade.toFixed(2)}</div>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

// Зареди игри
function loadStudentGames() {
    const content = document.getElementById('gamesContent');
    if (!content) return;
    
    content.innerHTML = `
        <div class="game-container">
            <h2>🧮 Математически предизвикателства</h2>
            <div class="game-score">485</div>
            <div style="font-size: 18px; margin-bottom: 20px;">Текущи точки</div>
            
            <div class="progress-bar">
                <div class="progress-fill" style="width: 65%;"></div>
            </div>
            <div style="margin-bottom: 30px;">Ниво 6 • 65% до следващо ниво</div>
            
            <button class="btn" style="background: white; color: #FF7A59; font-size: 18px; padding: 15px 30px;">▶ Започни игра</button>
        </div>
    `;
}

// Инициализация при зареждане
if (window.location.href.includes('student-dashboard.html')) {
    window.addEventListener('DOMContentLoaded', function() {
        loadStudentSubjects();
        loadStudentMaterials();
        loadStudentTests();
        loadStudentGrades();
        loadStudentGames();
    });
}