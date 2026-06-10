const totalWeeks = 5;
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

function generateDiaryHtml() {
    let generatedHtml = "";
    for (let w = 1; w <= totalWeeks; w++) {
        generatedHtml += `
            <div class="page theme-bg">
                <div class="tracker-border"></div>
                <div class="tracker-title">MY WEEKLY SALAH TRACKER</div>
                <div class="tracker-sub">"Prayer is the pillar of Islam" — Click the hearts to fill or erase them!</div>
                <table class="table-container">
                    <thead>
                        <tr>
                            <th class="th-day">DAYS</th>
                            <th class="th-fajr">FAJR</th>
                            <th class="th-dhuhr">DHUHR</th>
                            <th class="th-asr">ASR</th>
                            <th class="th-maghrib">MAGHRIB</th>
                            <th class="th-isha">ISHA</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        days.forEach(day => {
            generatedHtml += `<tr class="row-line"><td class="td-day">${day}</td>`;
            prayers.forEach(prayer => {
                generatedHtml += `
                    <td class="heart-slot" data-id="heart-w${w}-${day}-${prayer}" data-prayer="${prayer}" onclick="toggleHeart(this)">
                        <div class="pure-heart-outline">♥</div>
                    </td>`;
            });
            generatedHtml += `</tr>`;
        });
        generatedHtml += `
                    </tbody>
                </table>
                <div class="reward-section">
                    <div class="reward-title">🏆 MY WEEKLY REWARD GOAL:</div>
                    <input type="text" id="reward-w${w}" class="reward-input" placeholder="Type your reward goal for this week...">
                </div>
            </div>
        `;
        // Notes page
        generatedHtml += `
            <div class="page notes-page theme-bg">
                <div class="notes-header">
                    <div class="top-stars">✦ ✦ ✦</div>
                    <h1 class="notes-title">Personal Reflection</h1>
                    <p class="notes-quote">"Indeed, prayer keeps away from immorality and wrongdoing."</p>
                    <div class="meta-inputs">
                        <div class="meta-field">WEEK: <input type="text" id="meta-week-w${w}" class="week-input" placeholder="${w}"></div>
                        <div class="meta-field">MONTH / YEAR: <input type="text" id="meta-month-w${w}" class="month-input" placeholder="Type here..."></div>
                    </div>
                </div>
                <div class="boxes-wrapper">
                    <div class="section-box"><h3>✨ What made me happy this week?</h3><textarea id="reflect-happy-w${w}" class="interactive-textarea" placeholder="Type here..." rows="6"></textarea></div>
                    <div class="section-box"><h3>🎯 My Goal</h3><textarea id="reflect-goal-w${w}" class="interactive-textarea" placeholder="Type here..." rows="6"></textarea></div>
                    <div class="section-box"><h3>🤲 Dua of the week</h3><textarea id="reflect-dua-w${w}" class="interactive-textarea" placeholder="Type here..." rows="6"></textarea></div>
                    <div class="section-box"><h3>📝 Extra Notes</h3><textarea id="reflect-notes-w${w}" class="interactive-textarea" placeholder="Type here..." rows="6"></textarea></div>
                </div>
            </div>
        `;
    }
    return generatedHtml;
}

function insertDiary() {
    const container = document.getElementById('dynamic-pages');
    if (!container) {
        console.error('Container element #dynamic-pages not found');
        return;
    }
    const generatedHtml = generateDiaryHtml();
    console.log('Generated diary HTML length:', generatedHtml.length);
    container.innerHTML = generatedHtml;
}

window.toggleHeart = function(element) {
    element.classList.toggle('active');
    const heartId = element.getAttribute('data-id');
    const isActive = element.classList.contains('active');
    localStorage.setItem(heartId, isActive ? "true" : "false");
};

function setupAutoSave() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        if (localStorage.getItem(input.id)) {
            input.value = localStorage.getItem(input.id);
        }
        input.addEventListener('input', () => {
            localStorage.setItem(input.id, input.value);
        });
    });
    const heartSlots = document.querySelectorAll('.heart-slot');
    heartSlots.forEach(slot => {
        const heartId = slot.getAttribute('data-id');
        if (localStorage.getItem(heartId) === "true") {
            slot.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    insertDiary();
    setupAutoSave();
});
