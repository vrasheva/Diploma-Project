const DIRECTOR_DATA = {
    statistics: {
        pending: 1,
        approved: 5,
        rejected: 2
    },
    approvals: [
        {
            id: 1,
            type: 'edit',
            teacher: 'Мария Иванова',
            student: 'Иван Петров',
            class: '10А',
            subject: 'Математика',
            oldGrade: 5.00,
            newGrade: 6.00,
            reason: 'Техническа грешка при въвеждане - правилният отговор беше отбелязан погрешно в системата.',
            status: 'pending',
            date: '2026-01-03 14:30'
        },
        {
            id: 2,
            type: 'delete',
            teacher: 'Иван Стоянов',
            student: 'Мария Петкова',
            class: '9Б',
            subject: 'Физика',
            grade: 3.50,
            reason: 'Оценката е въведена по погрешка - ученикът не е участвал в теста.',
            status: 'approved',
            date: '2026-01-02 10:15'
        }
    ]
};

// Зареди статистики за директор
function loadDirectorStatistics() {
    if (document.getElementById('pendingCount')) {
        document.getElementById('pendingCount').textContent = DIRECTOR_DATA.statistics.pending;
    }
    if (document.getElementById('approvedCount')) {
        document.getElementById('approvedCount').textContent = DIRECTOR_DATA.statistics.approved;
    }
    if (document.getElementById('rejectedCount')) {
        document.getElementById('rejectedCount').textContent = DIRECTOR_DATA.statistics.rejected;
    }
}

// Зареди заявки за одобрение
function loadDirectorApprovals() {
    const content = document.getElementById('approvalsContent');
    if (!content) return;
    
    let html = '';
    DIRECTOR_DATA.approvals.forEach(request => {
        const statusClass = request.status === 'pending' ? 'status-pending' : 
                          request.status === 'approved' ? 'status-approved' : 'status-rejected';
        const statusText = request.status === 'pending' ? 'Очаква одобрение' : 
                         request.status === 'approved' ? 'Одобрена' : 'Отказана';
        
        let requestDetails = '';
        if (request.type === 'edit') {
            requestDetails = `
                <div><strong>Ученик:</strong> ${request.student}, ${request.class}</div>
                <div><strong>Предмет:</strong> ${request.subject}</div>
                <div><strong>Стара оценка:</strong> ${request.oldGrade.toFixed(2)} → <strong>Нова оценка:</strong> ${request.newGrade.toFixed(2)}</div>
                <div style="margin-top: 10px;"><strong>Причина:</strong> ${request.reason}</div>
            `;
        } else {
            requestDetails = `
                <div><strong>Ученик:</strong> ${request.student}, ${request.class}</div>
                <div><strong>Предмет:</strong> ${request.subject}</div>
                <div><strong>Оценка за изтриване:</strong> ${request.grade.toFixed(2)}</div>
                <div style="margin-top: 10px;"><strong>Причина:</strong> ${request.reason}</div>
            `;
        }
        
        const actionButtons = request.status === 'pending' ? `
            <div class="action-buttons">
                <button class="btn btn-approve" onclick="approveRequest(${request.id})">✓ Одобри</button>
                <button class="btn btn-reject" onclick="rejectRequest(${request.id})">✗ Откажи</button>
            </div>
        ` : '';
        
        html += `
            <div class="request-card">
                <div class="request-header">
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">${request.type === 'edit' ? 'Промяна на оценка' : 'Изтриване на оценка'}</div>
                        <div style="color: #666; font-size: 14px; margin-top: 5px;">Подадена от: ${request.teacher} • ${request.date}</div>
                    </div>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div style="background: #FFF5F3; padding: 15px; border-radius: 8px;">
                    ${requestDetails}
                </div>
                ${actionButtons}
            </div>
        `;
    });
    
    content.innerHTML = html;
}

// Одобри заявка
function approveRequest(requestId) {
    if (confirm('Сигурни ли сте, че искате да одобрите тази заявка?')) {
        // Тук ще се извика API към backend
        alert('Заявката е одобрена успешно!');
        // Обнови статистиките и списъка
        DIRECTOR_DATA.statistics.pending--;
        DIRECTOR_DATA.statistics.approved++;
        loadDirectorStatistics();
        loadDirectorApprovals();
    }
}

// Откажи заявка
function rejectRequest(requestId) {
    const reason = prompt('Моля въведете причина за отказа:');
    if (reason) {
        // Тук ще се извика API към backend
        alert('Заявката е отказана!');
        // Обнови статистиките и списъка
        DIRECTOR_DATA.statistics.pending--;
        DIRECTOR_DATA.statistics.rejected++;
        loadDirectorStatistics();
        loadDirectorApprovals();
    }
}

// Добави потребител
function addUser() {
    alert('Тук ще се отвори форма за добавяне на нов потребител');
}

// Инициализация при зареждане
if (window.location.href.includes('director-dashboard.html')) {
    window.addEventListener('DOMContentLoaded', function() {
        loadDirectorStatistics();
        loadDirectorApprovals();
    });
}