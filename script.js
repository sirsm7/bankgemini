/**
 * GOOGLE ED PREP - LOGIC CONTROLLER (GAMIFIED EDITION)
 * Versi: 5.1 (Isolasi Storan, Sistem Misi & Lencana, Ketahanan Ralat Visual)
 * * NOTA: Fail ini bergantung kepada 'questions.js' yang mesti dimuatkan
 * SEBELUM fail ini dalam HTML.
 */

if (typeof rawData === 'undefined') {
    console.error("RALAT KRITIKAL: 'questions.js' tidak dimuatkan! Sila semak fail HTML anda.");
}

// State Aplikasi
let currentView = 'dashboard';
let currentCategoryFilter = 'all';
let flashcardIndex = 0;
let shuffledFlashcards = [];
let flashcardRevealed = false;

// ==========================================
// 1. PEMBUNGKUS STORAN SELAMAT (STORAGE WRAPPER)
// Mengelakkan crash jika fail dijalankan secara tempatan (file://) atau mode privasi
// ==========================================
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn("localStorage disekat. Rekod tanda semak hanya sementara untuk sesi ini.");
    }
}

function getFromStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

// ==========================================
// 2. INISIALISASI UTAMA
// Setiap komponen dijalankan secara berasingan untuk elak kegagalan berantai
// ==========================================
function init() {
    try {
        updateDashboardStats();
    } catch (e) {
        console.error("Ralat mengira statistik:", e);
    }

    try {
        renderChart();
    } catch (e) {
        console.error("Ralat memuatkan carta (Semak talian Internet untuk fail CDN Chart.js):", e);
    }

    try {
        renderCategories();
        renderQuestions();
    } catch (e) {
        console.error("Ralat memuatkan Bank Soalan:", e);
    }
    
    try {
        if (typeof tasksLevel1 !== 'undefined') {
            initMissions(tasksLevel1, 'l1-missions-grid', 'L1');
        } else {
            // Pemanggil fungsi ralat jika array tiada
            initMissions(null, 'l1-missions-grid', 'L1'); 
        }
    } catch (e) {
        console.error("Ralat memuatkan Misi L1:", e);
    }

    try {
        if (typeof tasksLevel2 !== 'undefined') {
            initMissions(tasksLevel2, 'l2-missions-grid', 'L2');
        } else {
             // Pemanggil fungsi ralat jika array tiada
            initMissions(null, 'l2-missions-grid', 'L2');
        }
    } catch (e) {
        console.error("Ralat memuatkan Misi L2:", e);
    }
}

// ==========================================
// 3. LOGIK PAPARAN: DASHBOARD (STATISTIK GEMINI)
// ==========================================
function updateDashboardStats() {
    if (typeof rawData === 'undefined') return;
    const totalQ = rawData.length;
    
    const statTotalQ = document.getElementById('stat-total-q');
    if(statTotalQ) {
        statTotalQ.textContent = totalQ;
        statTotalQ.classList.remove('animate-pulse');
    }

    const statIntro = document.getElementById('stat-intro-count');
    if(statIntro) statIntro.textContent = totalQ;

    const statTotalQ2 = document.getElementById('stat-total-q-2');
    if(statTotalQ2) statTotalQ2.textContent = totalQ;

    const uniqueCategories = new Set(rawData.map(q => q.category.replace(/\(.*\)/, '').trim()));
    const statTotalCat = document.getElementById('stat-total-cat');
    if(statTotalCat) {
        statTotalCat.textContent = uniqueCategories.size;
        statTotalCat.classList.remove('animate-pulse');
    }

    const categoryCounts = {};
    rawData.forEach(q => {
        const cleanCat = q.category.replace(/\(.*\)/, '').trim();
        categoryCounts[cleanCat] = (categoryCounts[cleanCat] || 0) + 1;
    });

    let maxCat = '';
    let maxCount = 0;

    for (const [cat, count] of Object.entries(categoryCounts)) {
        if (count > maxCount) {
            maxCount = count;
            maxCat = cat;
        }
    }

    const statTopCat = document.getElementById('stat-top-cat');
    const statTopDesc = document.getElementById('stat-top-cat-desc');

    if(statTopCat) {
        statTopCat.textContent = maxCat;
        statTopCat.classList.remove('animate-pulse');
    }
    if(statTopDesc) statTopDesc.textContent = `Pecahan tertinggi dari keseluruhan topik.`;
}

function renderChart() {
    const canvasEl = document.getElementById('topicChart');
    if(!canvasEl) return;
    
    const ctx = canvasEl.getContext('2d');
    const categoryCounts = {};
    rawData.forEach(q => {
        const cleanCat = q.category.replace(/\(.*\)/, '').trim(); 
        categoryCounts[cleanCat] = (categoryCounts[cleanCat] || 0) + 1;
    });

    const labels = Object.keys(categoryCounts);
    const data = Object.values(categoryCounts);
    const colors = [
        '#2563eb', '#06b6d4', '#8b5cf6', '#d946ef', 
        '#10b981', '#f59e0b', '#f43f5e', '#3b82f6',
        '#6366f1', '#14b8a6', '#84cc16'
    ];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, font: { size: 12, family: "'Inter', sans-serif" }, padding: 20 } },
                tooltip: { 
                    callbacks: { label: function(context) { return ` ${context.label}: ${context.raw} soalan`; } },
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    padding: 14,
                    cornerRadius: 10,
                    titleFont: { size: 13, family: "'Inter', sans-serif" },
                    bodyFont: { size: 13, family: "'Inter', sans-serif" }
                }
            },
            layout: { padding: 10 }
        }
    });
}

// ==========================================
// 4. LOGIK GAMIFIKASI (MISI L1 & L2)
// ==========================================
function initMissions(missionData, gridContainerId, levelPrefix) {
    const container = document.getElementById(gridContainerId);
    if (!container) return;

    // SUNTIKAN KESELAMATAN: Mekanisme Fallback UI jika data hilang
    if (!missionData || missionData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full p-8 text-center bg-red-50 rounded-2xl border border-red-200 shadow-sm">
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-red-500 text-2xl font-black border border-red-100">!</div>
                <h3 class="text-red-700 font-bold text-lg">Ralat Sistem: Data Misi Tidak Dijumpai</h3>
                <p class="text-sm text-red-600/80 mt-2 max-w-md mx-auto">Sistem tidak dapat mengesan fail <code class="bg-red-100 px-1 rounded">questions.js</code>. Sila pastikan fail tersebut dimuatkan dengan betul dalam pautan HTML.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    // Penentuan Tema Warna Berdasarkan Tahap
    const theme = levelPrefix === 'L1' ? {
        iconStyle: 'bg-blue-50 text-blue-600',
        barStyle: 'bg-gradient-to-r from-blue-500 to-cyan-400',
        peerStyle: 'peer-checked:bg-cyan-500 peer-checked:border-cyan-500'
    } : {
        iconStyle: 'bg-indigo-50 text-indigo-600',
        barStyle: 'bg-gradient-to-r from-indigo-500 to-purple-500',
        peerStyle: 'peer-checked:bg-purple-500 peer-checked:border-purple-500'
    };

    missionData.forEach((mission, missionIndex) => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group';

        let html = `
            <div class="flex items-center gap-4 mb-5">
                <div class="w-12 h-12 rounded-xl ${theme.iconStyle} flex items-center justify-center text-2xl shadow-sm transform group-hover:scale-110 transition-transform">${mission.icon}</div>
                <div>
                    <h3 class="font-bold text-slate-800 text-lg leading-tight">${mission.missionTitle}</h3>
                    <p class="text-xs text-slate-400 font-medium mt-0.5">Lencana: ${mission.badgeName}</p>
                </div>
            </div>
            
            <div class="mb-5">
                <div class="flex justify-between text-xs mb-1.5 font-bold uppercase tracking-wider text-slate-400">
                    <span>Kemajuan Misi</span>
                    <span id="progress-text-${mission.id}" class="${levelPrefix === 'L1' ? 'text-blue-500' : 'text-indigo-500'}">0%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2 shadow-inner overflow-hidden">
                    <div id="progress-bar-${mission.id}" class="${theme.barStyle} h-full rounded-full transition-all duration-700 ease-out" style="width: 0%"></div>
                </div>
            </div>
            
            <div class="space-y-3.5 pl-1">
        `;

        mission.tasks.forEach((task, taskIndex) => {
            const taskId = `${mission.id}_task_${taskIndex}`;
            const isChecked = getFromStorage(taskId) === 'true';

            html += `
                <label class="flex items-start gap-3 cursor-pointer group/item relative">
                    <input type="checkbox" id="${taskId}" class="peer sr-only" ${isChecked ? 'checked' : ''} 
                        onchange="handleTaskChange('${taskId}', '${levelPrefix}')">
                    
                    <div class="mt-0.5 shrink-0 w-5 h-5 border-2 border-slate-300 rounded bg-white ${theme.peerStyle} flex items-center justify-center shadow-sm transition-all duration-200 group-hover/item:border-slate-400">
                        <svg class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    
                    <span class="text-sm font-medium text-slate-600 peer-checked:text-slate-400 peer-checked:line-through transition-all select-none leading-relaxed group-hover/item:text-slate-900">${task}</span>
                </label>
            `;
        });

        html += `</div>`;
        card.innerHTML = html;
        container.appendChild(card);
    });

    // Kira status permulaan (Initial state on load)
    updateGamificationState(levelPrefix);
}

// Fungsi Pemicu Apabila Checkbox Ditekan
window.handleTaskChange = function(checkboxId, levelPrefix) {
    const checkbox = document.getElementById(checkboxId);
    if(checkbox) {
        saveToStorage(checkboxId, checkbox.checked);
        updateGamificationState(levelPrefix);
    }
};

// Enjin Pengiraan Markah & Pengurusan DOM Misi
function updateGamificationState(levelPrefix) {
    const missionData = levelPrefix === 'L1' ? tasksLevel1 : tasksLevel2;
    const progressTextId = levelPrefix === 'L1' ? 'l1-progress-text' : 'l2-progress-text';
    const progressBarId = levelPrefix === 'L1' ? 'l1-progress-bar' : 'l2-progress-bar';
    const badgesContainerId = levelPrefix === 'L1' ? 'l1-badges-container' : 'l2-badges-container';

    let totalLevelTasks = 0;
    let completedLevelTasks = 0;
    let unlockedBadges = [];

    // Jika data tidak wujud, tidak perlu meneruskan pengiraan
    if (!missionData || missionData.length === 0) return;

    missionData.forEach(mission => {
        let missionTotal = mission.tasks.length;
        let missionCompleted = 0;

        mission.tasks.forEach((task, taskIndex) => {
            totalLevelTasks++;
            const taskId = `${mission.id}_task_${taskIndex}`;
            if (getFromStorage(taskId) === 'true') {
                completedLevelTasks++;
                missionCompleted++;
            }
        });

        // Kemas kini UI Bar Misi Individu
        const mProgText = document.getElementById(`progress-text-${mission.id}`);
        const mProgBar = document.getElementById(`progress-bar-${mission.id}`);
        const mPercentage = missionTotal === 0 ? 0 : Math.round((missionCompleted / missionTotal) * 100);

        if (mProgText) mProgText.textContent = `${mPercentage}%`;
        if (mProgBar) mProgBar.style.width = `${mPercentage}%`;

        // Pengesahan Kunci Lencana (Unlock Logic)
        if (missionCompleted === missionTotal && missionTotal > 0) {
            unlockedBadges.push(mission);
        }
    });

    // Kemas kini UI Bar Utama Keseluruhan Tahap
    const overallPercentage = totalLevelTasks === 0 ? 0 : Math.round((completedLevelTasks / totalLevelTasks) * 100);
    const oProgText = document.getElementById(progressTextId);
    const oProgBar = document.getElementById(progressBarId);

    if (oProgText) oProgText.textContent = `${overallPercentage}%`;
    if (oProgBar) oProgBar.style.width = `${overallPercentage}%`;

    // Render Koleksi Lencana
    renderBadges(unlockedBadges, badgesContainerId, levelPrefix);
}

function renderBadges(badges, containerId, levelPrefix) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (badges.length === 0) {
        container.innerHTML = `<p class="text-sm font-medium text-slate-500/70 italic bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700 border-dashed inline-block">Belum ada lencana yang berjaya dibuka.</p>`;
        return;
    }

    container.innerHTML = '';
    const gradient = levelPrefix === 'L1' ? 'from-blue-500 to-cyan-400' : 'from-indigo-500 to-purple-500';
    const borderGlow = levelPrefix === 'L1' ? 'border-cyan-500/50 shadow-cyan-500/20' : 'border-purple-500/50 shadow-purple-500/20';

    badges.forEach(badge => {
        container.innerHTML += `
            <div class="flex items-center gap-2 bg-slate-800 rounded-full pr-4 pl-1.5 py-1.5 border ${borderGlow} shadow-lg animate-[fadeIn_0.5s_ease-out] transform hover:scale-105 transition-transform cursor-default group" title="Misi '${badge.missionTitle}' Selesai!">
                <div class="w-7 h-7 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-sm shadow-inner shadow-white/30 group-hover:rotate-12 transition-transform">
                    ${badge.icon}
                </div>
                <span class="text-xs font-bold text-white tracking-wide">${badge.badgeName}</span>
            </div>
        `;
    });
}

// ==========================================
// 5. PENUKARAN PAPARAN (VIEW SWITCHER)
// ==========================================
window.switchView = function(viewName) {
    ['dashboard', 'study', 'flashcards'].forEach(v => {
        const viewEl = document.getElementById(`view-${v}`);
        const navEl = document.getElementById(`nav-${v}`);
        if(viewEl) viewEl.classList.add('hidden');
        if(navEl) {
            navEl.classList.remove('bg-blue-50', 'text-blue-600');
            navEl.classList.add('text-slate-600');
        }
    });

    const activeViewEl = document.getElementById(`view-${viewName}`);
    const activeNavEl = document.getElementById(`nav-${viewName}`);
    
    if(activeViewEl) activeViewEl.classList.remove('hidden');
    if(activeNavEl) {
        activeNavEl.classList.add('bg-blue-50', 'text-blue-600');
        activeNavEl.classList.remove('text-slate-600');
    }
    
    currentView = viewName;
    
    if(viewName === 'flashcards' && shuffledFlashcards.length === 0) {
        setupFlashcards();
    }
};

// ==========================================
// 6. BANK SOALAN (STUDY LIST)
// ==========================================
function renderCategories() {
    if (typeof rawData === 'undefined') return;
    const categories = [...new Set(rawData.map(q => q.category))].sort();
    const container = document.getElementById('category-filters');
    if(!container) return;
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn px-5 py-2.5 rounded-full text-sm font-bold bg-white border-2 border-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm`;
        btn.textContent = cat;
        btn.onclick = () => filterQuestions(cat, btn);
        container.appendChild(btn);
    });
}

window.filterQuestions = function(category, btnElement) {
    currentCategoryFilter = category;
    
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-slate-800', 'text-white', 'border-transparent');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-100');
    });
    
    if (category === 'all') {
        const allBtn = document.querySelector('button[onclick="filterQuestions(\'all\')"]');
        if(allBtn) {
            allBtn.classList.add('bg-slate-800', 'text-white', 'border-transparent');
            allBtn.classList.remove('bg-white', 'text-slate-600');
        }
    } else if (btnElement) {
        btnElement.classList.add('bg-slate-800', 'text-white', 'border-transparent');
        btnElement.classList.remove('bg-white', 'text-slate-600');
    }

    renderQuestions();
};

function renderQuestions() {
    const list = document.getElementById('questions-list');
    if(!list || typeof rawData === 'undefined') return;
    
    list.innerHTML = '';
    
    const filtered = currentCategoryFilter === 'all' 
        ? rawData 
        : rawData.filter(q => q.category === currentCategoryFilter);

    filtered.forEach(q => {
        const item = document.createElement('div');
        item.className = 'bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 relative';
        item.innerHTML = `
            <button onclick="toggleAccordion(${q.id})" class="w-full text-left p-6 flex justify-between items-start gap-4 focus:outline-none group">
                <div class="flex-grow">
                    <span class="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 mb-3 border border-slate-200">${q.category}</span>
                    <h3 class="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors leading-snug">${q.question}</h3>
                </div>
                <span id="icon-${q.id}" class="text-slate-400 text-2xl transform transition-transform duration-300 flex-shrink-0 bg-slate-50 w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 border border-slate-100">+</span>
            </button>
            <div id="content-${q.id}" class="hidden bg-slate-50 border-t border-slate-100 p-6 pl-8 animate-[fadeIn_0.3s_ease-out]">
                <div class="mb-5 bg-white p-4 rounded-xl border border-green-100 shadow-sm relative overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-green-400"></div>
                    <span class="flex items-center gap-2 text-xs font-black text-green-600 uppercase tracking-widest mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Jawapan Tepat
                    </span>
                    <p class="text-slate-900 font-bold text-base ml-1">${q.answer}</p>
                </div>
                <div class="bg-white p-4 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-400"></div>
                    <span class="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Nota Pakar
                    </span>
                    <p class="text-slate-600 text-sm font-medium leading-relaxed italic ml-1">"${q.note}"</p>
                </div>
            </div>
        `;
        list.appendChild(item);
    });
    
    if (filtered.length === 0) {
        list.innerHTML = '<div class="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300"><p class="text-slate-400 font-medium">Tiada soalan ditemui dalam kategori ini.</p></div>';
    }
}

window.toggleAccordion = function(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    if(!content || !icon) return;
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-45');
        icon.innerHTML = '&times;'; 
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-45');
        icon.innerHTML = '+';
    }
};

// ==========================================
// 7. KAD IMBASAN (FLASHCARDS)
// ==========================================
function setupFlashcards() {
    if (typeof rawData === 'undefined') return;
    shuffledFlashcards = [...rawData].sort(() => Math.random() - 0.5);
    flashcardIndex = 0;
    const fcTotal = document.getElementById('fc-total');
    if(fcTotal) fcTotal.textContent = shuffledFlashcards.length;
    loadCard();
}

function loadCard() {
    if (flashcardIndex >= shuffledFlashcards.length) {
        document.getElementById('fc-question').textContent = "Sesi Tamat! Tumpuan Hebat!";
        document.getElementById('fc-category').textContent = "SELESAI";
        document.getElementById('fc-controls').classList.add('opacity-0');
        
        const flashcardEl = document.querySelector('.flashcard');
        if (flashcardEl) flashcardEl.classList.remove('flipped');
        flashcardRevealed = false;
        return;
    }

    const card = shuffledFlashcards[flashcardIndex];
    
    const flashcardEl = document.querySelector('.flashcard');
    if (flashcardEl) {
        flashcardEl.classList.remove('flipped');
    }
    flashcardRevealed = false;
    
    const fcControls = document.getElementById('fc-controls');
    if(fcControls) {
        fcControls.classList.remove('opacity-100');
        fcControls.classList.add('opacity-0');
    }

    setTimeout(() => { 
        document.getElementById('fc-category').textContent = card.category;
        document.getElementById('fc-question').textContent = card.question;
        document.getElementById('fc-answer').textContent = card.answer;
        document.getElementById('fc-note').textContent = card.note;
        document.getElementById('fc-counter').textContent = flashcardIndex + 1;
    }, 300);
}

window.flipCard = function() {
    if (flashcardRevealed) return; 
    
    const flashcardEl = document.querySelector('.flashcard');
    if (flashcardEl) {
        flashcardEl.classList.add('flipped');
        flashcardRevealed = true;
        
        setTimeout(() => {
            const fcControls = document.getElementById('fc-controls');
            if(fcControls) {
                fcControls.classList.remove('opacity-0');
                fcControls.classList.add('opacity-100');
            }
        }, 600);
    }
};

window.nextCard = function(known, event) {
    if(event) event.stopPropagation(); 
    flashcardIndex++;
    loadCard();
};

// ==========================================
// START
// ==========================================
window.addEventListener('DOMContentLoaded', init);