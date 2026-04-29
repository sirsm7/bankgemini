// amali-gce.js
// Logic interaktif untuk amali-helper.html.
// Data sumber dibaca daripada window.AMALI_GCE_DATA yang disediakan oleh amali-gce-data.js.

(function () {
    'use strict';

    const STORAGE_KEY = 'amaliGceProgress';
    const COPY_SUCCESS_DURATION = 1800;

    const state = {
        activeLevelId: '',
        activeLabId: '',
        searchQuery: '',
        progress: {}
    };

    const selectors = {
        appTitle: 'app-title',
        appSubtitle: 'app-subtitle',
        sourceBadge: 'source-badge',
        levelTabs: 'level-tabs',
        labCards: 'lab-cards',
        labDetail: 'lab-detail',
        searchInput: 'search-input',
        clearSearchBtn: 'clear-search-btn',
        toast: 'toast'
    };

    function getData() {
        if (!window.AMALI_GCE_DATA || !Array.isArray(window.AMALI_GCE_DATA.levels)) {
            return null;
        }

        return window.AMALI_GCE_DATA;
    }

    function getElement(id) {
        return document.getElementById(id);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function normalizeText(value) {
        return String(value || '').trim().toLowerCase();
    }

    function loadProgress() {
        try {
            const savedProgress = window.localStorage.getItem(STORAGE_KEY);
            state.progress = savedProgress ? JSON.parse(savedProgress) : {};
        } catch (error) {
            console.warn('Gagal membaca progress amali:', error);
            state.progress = {};
        }
    }

    function saveProgress() {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
        } catch (error) {
            console.warn('Gagal menyimpan progress amali:', error);
        }
    }

    function getLevelById(levelId) {
        const data = getData();
        if (!data) return null;

        return data.levels.find((level) => level.id === levelId) || null;
    }

    function getLabById(labId) {
        const data = getData();
        if (!data) return null;

        for (const level of data.levels) {
            const lab = level.labs.find((item) => item.id === labId);
            if (lab) {
                return {
                    level,
                    lab
                };
            }
        }

        return null;
    }

    function getActiveLevel() {
        return getLevelById(state.activeLevelId);
    }

    function getActiveLab() {
        const labRecord = getLabById(state.activeLabId);
        return labRecord ? labRecord.lab : null;
    }

    function initializeState(data) {
        if (!state.activeLevelId && data.levels.length > 0) {
            state.activeLevelId = data.levels[0].id;
        }

        const activeLevel = getActiveLevel();
        if (!state.activeLabId && activeLevel && activeLevel.labs.length > 0) {
            state.activeLabId = activeLevel.labs[0].id;
        }
    }

    function getStepKey(labId, stepIndex) {
        return `${labId}::step-${stepIndex}`;
    }

    function isStepComplete(labId, stepIndex) {
        return Boolean(state.progress[getStepKey(labId, stepIndex)]);
    }

    function setStepComplete(labId, stepIndex, isComplete) {
        const key = getStepKey(labId, stepIndex);

        if (isComplete) {
            state.progress[key] = true;
        } else {
            delete state.progress[key];
        }

        saveProgress();
    }

    function getLabProgress(lab) {
        if (!lab || !Array.isArray(lab.steps) || lab.steps.length === 0) {
            return {
                completed: 0,
                total: 0,
                percent: 0
            };
        }

        const completed = lab.steps.reduce((count, _step, index) => {
            return count + (isStepComplete(lab.id, index) ? 1 : 0);
        }, 0);

        return {
            completed,
            total: lab.steps.length,
            percent: Math.round((completed / lab.steps.length) * 100)
        };
    }

    function getFilteredLabs(level) {
        if (!level || !Array.isArray(level.labs)) return [];

        const query = normalizeText(state.searchQuery);
        if (!query) return level.labs;

        return level.labs.filter((lab) => {
            const copyText = Array.isArray(lab.copyBlocks)
                ? lab.copyBlocks.map((block) => `${block.label} ${block.text}`).join(' ')
                : '';

            const searchableText = [
                lab.title,
                lab.app,
                lab.summary,
                copyText,
                Array.isArray(lab.steps) ? lab.steps.join(' ') : ''
            ].join(' ');

            return normalizeText(searchableText).includes(query);
        });
    }

    function renderMeta(data) {
        const titleEl = getElement(selectors.appTitle);
        const subtitleEl = getElement(selectors.appSubtitle);
        const sourceBadgeEl = getElement(selectors.sourceBadge);

        if (titleEl) {
            titleEl.textContent = data.meta && data.meta.title ? data.meta.title : 'Panduan Amali GCE';
        }

        if (subtitleEl) {
            subtitleEl.textContent = data.meta && data.meta.subtitle ? data.meta.subtitle : 'Panduan interaktif latihan amali Google Certified Educator.';
        }

        if (sourceBadgeEl) {
            sourceBadgeEl.textContent = data.meta && data.meta.source ? data.meta.source : 'Sumber PDF';
        }
    }

    function renderLevelTabs() {
        const data = getData();
        const container = getElement(selectors.levelTabs);
        if (!data || !container) return;

        container.innerHTML = data.levels.map((level) => {
            const isActive = level.id === state.activeLevelId;
            const totalLabs = Array.isArray(level.labs) ? level.labs.length : 0;

            return `
                <button type="button" data-level-id="${escapeHtml(level.id)}" class="level-tab group rounded-2xl border px-5 py-4 text-left transition-all ${isActive ? 'border-purple-400/60 bg-purple-500/15 shadow-lg shadow-purple-900/20' : 'border-white/10 bg-slate-900/60 hover:border-purple-500/40 hover:bg-slate-800/80'}">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <div class="text-sm font-bold ${isActive ? 'text-purple-200' : 'text-white'}">${escapeHtml(level.shortTitle || level.title)}</div>
                            <div class="mt-1 text-xs leading-relaxed text-slate-400">${escapeHtml(level.description || '')}</div>
                        </div>
                        <span class="rounded-full border ${isActive ? 'border-purple-300/40 bg-purple-400/20 text-purple-100' : 'border-white/10 bg-white/5 text-slate-400'} px-2.5 py-1 text-[11px] font-bold">${totalLabs} Lab</span>
                    </div>
                </button>
            `;
        }).join('');
    }

    function renderLabCards() {
        const level = getActiveLevel();
        const container = getElement(selectors.labCards);
        if (!level || !container) return;

        const filteredLabs = getFilteredLabs(level);

        if (filteredLabs.length === 0) {
            container.innerHTML = `
                <div class="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-6 text-center">
                    <div class="text-3xl">🔎</div>
                    <h3 class="mt-3 text-sm font-bold text-white">Tiada lab dijumpai</h3>
                    <p class="mt-1 text-xs leading-relaxed text-slate-400">Cuba kosongkan carian atau pilih tahap lain.</p>
                </div>
            `;
            return;
        }

        if (!filteredLabs.some((lab) => lab.id === state.activeLabId)) {
            state.activeLabId = filteredLabs[0].id;
        }

        container.innerHTML = filteredLabs.map((lab) => {
            const isActive = lab.id === state.activeLabId;
            const progress = getLabProgress(lab);

            return `
                <button type="button" data-lab-id="${escapeHtml(lab.id)}" class="lab-card group w-full rounded-2xl border p-4 text-left transition-all ${isActive ? 'border-cyan-300/50 bg-cyan-500/10 shadow-lg shadow-cyan-900/20' : 'border-white/10 bg-slate-900/60 hover:border-cyan-400/30 hover:bg-slate-800/80'}">
                    <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                            <div class="text-xs font-bold uppercase tracking-wider ${isActive ? 'text-cyan-200' : 'text-slate-500'}">${escapeHtml(lab.app || 'Lab')}</div>
                            <h3 class="mt-1 text-sm font-bold leading-snug text-white">${escapeHtml(lab.title || '')}</h3>
                            <p class="mt-2 text-xs leading-relaxed text-slate-400">${escapeHtml(lab.summary || '')}</p>
                        </div>
                        <span class="shrink-0 rounded-full border ${isActive ? 'border-cyan-300/40 bg-cyan-400/15 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-400'} px-2 py-1 text-[11px] font-bold">${progress.percent}%</span>
                    </div>
                    <div class="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all" style="width: ${progress.percent}%;"></div>
                    </div>
                    <div class="mt-2 text-[11px] text-slate-500">${progress.completed}/${progress.total} langkah selesai</div>
                </button>
            `;
        }).join('');
    }

    function renderStepList(lab) {
        if (!lab || !Array.isArray(lab.steps) || lab.steps.length === 0) {
            return `
                <div class="rounded-2xl border border-white/10 bg-slate-900/50 p-5 text-sm text-slate-400">
                    Tiada langkah direkodkan untuk lab ini.
                </div>
            `;
        }

        return `
            <div class="space-y-3">
                ${lab.steps.map((step, index) => {
                    const checked = isStepComplete(lab.id, index);
                    const stepNumber = index + 1;

                    return `
                        <label class="group flex cursor-pointer gap-4 rounded-2xl border border-white/10 bg-slate-900/55 p-4 transition-all hover:border-purple-400/30 hover:bg-slate-800/80">
                            <input type="checkbox" data-step-index="${index}" class="step-checkbox mt-1 h-5 w-5 shrink-0 rounded border-slate-600 bg-slate-900 text-purple-500 focus:ring-purple-500" ${checked ? 'checked' : ''}>
                            <span class="flex-1">
                                <span class="mb-1 inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-bold text-slate-400">Langkah ${stepNumber}</span>
                                <span class="block text-sm leading-relaxed ${checked ? 'text-slate-500 line-through' : 'text-slate-200'}">${escapeHtml(step)}</span>
                            </span>
                        </label>
                    `;
                }).join('')}
            </div>
        `;
    }

    function renderCopyBlocks(lab) {
        if (!lab || !Array.isArray(lab.copyBlocks) || lab.copyBlocks.length === 0) {
            return `
                <div class="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-5 text-sm text-slate-400">
                    Tiada kotak salin untuk lab ini.
                </div>
            `;
        }

        return `
            <div class="grid grid-cols-1 gap-4">
                ${lab.copyBlocks.map((block) => `
                    <div class="copy-card overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] shadow-lg shadow-black/20">
                        <div class="flex items-center justify-between gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-3">
                            <div class="min-w-0">
                                <div class="truncate text-xs font-bold uppercase tracking-wider text-cyan-300">${escapeHtml(block.label || 'Teks')}</div>
                            </div>
                            <button type="button" data-copy-id="${escapeHtml(block.id)}" class="copy-btn shrink-0 rounded-lg border border-purple-400/30 bg-purple-500/15 px-3 py-1.5 text-xs font-bold text-purple-100 transition-all hover:bg-purple-500/25 active:scale-95">
                                Salin
                            </button>
                        </div>
                        <pre class="max-h-60 overflow-auto whitespace-pre-wrap p-4 text-sm leading-7 text-blue-100/90 custom-scrollbar"><code>${escapeHtml(block.text || '')}</code></pre>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function buildLabPlainText(lab) {
        if (!lab) return '';

        const lines = [];
        lines.push(lab.title || 'Lab');
        lines.push('');

        if (lab.summary) {
            lines.push('Ringkasan:');
            lines.push(lab.summary);
            lines.push('');
        }

        if (Array.isArray(lab.steps) && lab.steps.length > 0) {
            lines.push('Langkah:');
            lab.steps.forEach((step, index) => {
                lines.push(`${index + 1}. ${step}`);
            });
            lines.push('');
        }

        if (Array.isArray(lab.copyBlocks) && lab.copyBlocks.length > 0) {
            lines.push('Teks untuk disalin:');
            lab.copyBlocks.forEach((block) => {
                lines.push(`[${block.label}]`);
                lines.push(block.text || '');
                lines.push('');
            });
        }

        return lines.join('\n').trim();
    }

    function renderLabDetail() {
        const container = getElement(selectors.labDetail);
        const lab = getActiveLab();
        if (!container) return;

        if (!lab) {
            container.innerHTML = `
                <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center">
                    <div class="text-4xl">📘</div>
                    <h2 class="mt-4 text-xl font-bold text-white">Pilih lab</h2>
                    <p class="mt-2 text-sm text-slate-400">Sila pilih satu lab di sebelah kiri untuk melihat panduan interaktif.</p>
                </div>
            `;
            return;
        }

        const progress = getLabProgress(lab);

        container.innerHTML = `
            <article class="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/30">
                <div class="border-b border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40 p-6 md:p-8">
                    <div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <div>
                            <div class="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-200">
                                <span class="h-2 w-2 rounded-full bg-cyan-300"></span>
                                ${escapeHtml(lab.app || 'Google Workspace')}
                            </div>
                            <h2 class="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">${escapeHtml(lab.title || '')}</h2>
                            <p class="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">${escapeHtml(lab.summary || '')}</p>
                        </div>
                        <div class="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                            <div class="text-3xl font-black text-white">${progress.percent}%</div>
                            <div class="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Progress</div>
                        </div>
                    </div>
                    <div class="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                        <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all" style="width: ${progress.percent}%;"></div>
                    </div>
                    <div class="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                        <span>${progress.completed}/${progress.total} langkah selesai</span>
                        <div class="flex flex-wrap gap-2">
                            <button type="button" id="copy-lab-btn" class="rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 font-bold text-cyan-100 transition-all hover:bg-cyan-400/20 active:scale-95">
                                Salin Semua Lab
                            </button>
                            <button type="button" id="reset-lab-progress-btn" class="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-bold text-slate-300 transition-all hover:bg-white/10 active:scale-95">
                                Reset Checklist
                            </button>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:p-8 xl:grid-cols-12">
                    <section class="xl:col-span-7">
                        <div class="mb-4 flex items-center justify-between gap-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">Langkah Amali</h3>
                                <p class="mt-1 text-xs text-slate-500">Tanda setiap langkah selepas selesai.</p>
                            </div>
                        </div>
                        ${renderStepList(lab)}
                    </section>

                    <aside class="xl:col-span-5">
                        <div class="mb-4">
                            <h3 class="text-lg font-bold text-white">Kotak Salin Cepat</h3>
                            <p class="mt-1 text-xs text-slate-500">Klik Salin untuk tampal terus dalam aplikasi Google.</p>
                        </div>
                        ${renderCopyBlocks(lab)}
                    </aside>
                </div>
            </article>
        `;
    }

    function renderAll() {
        const data = getData();
        if (!data) {
            renderMissingDataError();
            return;
        }

        renderMeta(data);
        renderLevelTabs();
        renderLabCards();
        renderLabDetail();
    }

    function renderMissingDataError() {
        const detail = getElement(selectors.labDetail);
        if (!detail) return;

        detail.innerHTML = `
            <div class="rounded-3xl border border-red-400/20 bg-red-950/30 p-8 text-center">
                <div class="text-4xl">⚠️</div>
                <h2 class="mt-4 text-xl font-bold text-red-100">Data amali tidak dijumpai</h2>
                <p class="mt-2 text-sm leading-relaxed text-red-200/80">Pastikan fail amali-gce-data.js dimuatkan sebelum amali-gce.js.</p>
            </div>
        `;
    }

    function findCopyBlock(copyId) {
        const labRecord = getLabById(state.activeLabId);
        const lab = labRecord ? labRecord.lab : null;
        if (!lab || !Array.isArray(lab.copyBlocks)) return null;

        return lab.copyBlocks.find((block) => block.id === copyId) || null;
    }

    function showToast(message, type) {
        const toast = getElement(selectors.toast);
        if (!toast) return;

        const safeType = type === 'error' ? 'error' : 'success';
        const baseClasses = 'fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-full border px-5 py-3 text-sm font-bold shadow-2xl transition-all';
        const typeClasses = safeType === 'error'
            ? 'border-red-400/30 bg-red-950/90 text-red-100 shadow-red-950/30'
            : 'border-emerald-400/30 bg-emerald-950/90 text-emerald-100 shadow-emerald-950/30';

        toast.className = `${baseClasses} ${typeClasses}`;
        toast.textContent = message;
        toast.classList.remove('hidden');

        window.clearTimeout(showToast.timeoutId);
        showToast.timeoutId = window.setTimeout(() => {
            toast.classList.add('hidden');
        }, COPY_SUCCESS_DURATION);
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        return new Promise((resolve, reject) => {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', 'readonly');
                textarea.style.position = 'fixed';
                textarea.style.top = '-9999px';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();

                const success = document.execCommand('copy');
                document.body.removeChild(textarea);

                if (success) {
                    resolve();
                } else {
                    reject(new Error('Fallback copy gagal.'));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    function handleCopyButton(button) {
        const copyId = button.getAttribute('data-copy-id');
        const block = findCopyBlock(copyId);

        if (!block) {
            showToast('Teks tidak dijumpai.', 'error');
            return;
        }

        const originalText = button.textContent;
        button.textContent = 'Menyalin...';
        button.disabled = true;

        copyText(block.text || '')
            .then(() => {
                button.textContent = 'Disalin!';
                showToast('Teks berjaya disalin.', 'success');
            })
            .catch((error) => {
                console.error('Gagal menyalin teks:', error);
                button.textContent = 'Gagal';
                showToast('Gagal menyalin. Sila salin secara manual.', 'error');
            })
            .finally(() => {
                window.setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, COPY_SUCCESS_DURATION);
            });
    }

    function handleCopyLab() {
        const lab = getActiveLab();
        if (!lab) return;

        copyText(buildLabPlainText(lab))
            .then(() => {
                showToast('Semua kandungan lab berjaya disalin.', 'success');
            })
            .catch((error) => {
                console.error('Gagal menyalin kandungan lab:', error);
                showToast('Gagal menyalin semua kandungan lab.', 'error');
            });
    }

    function handleResetLabProgress() {
        const lab = getActiveLab();
        if (!lab || !Array.isArray(lab.steps)) return;

        lab.steps.forEach((_step, index) => {
            delete state.progress[getStepKey(lab.id, index)];
        });

        saveProgress();
        renderLabCards();
        renderLabDetail();
        showToast('Checklist lab telah direset.', 'success');
    }

    function bindStaticEvents() {
        const levelTabs = getElement(selectors.levelTabs);
        const labCards = getElement(selectors.labCards);
        const labDetail = getElement(selectors.labDetail);
        const searchInput = getElement(selectors.searchInput);
        const clearSearchBtn = getElement(selectors.clearSearchBtn);

        if (levelTabs) {
            levelTabs.addEventListener('click', (event) => {
                const button = event.target.closest('[data-level-id]');
                if (!button) return;

                const nextLevelId = button.getAttribute('data-level-id');
                const nextLevel = getLevelById(nextLevelId);
                if (!nextLevel) return;

                state.activeLevelId = nextLevel.id;
                state.activeLabId = nextLevel.labs.length > 0 ? nextLevel.labs[0].id : '';
                renderAll();
            });
        }

        if (labCards) {
            labCards.addEventListener('click', (event) => {
                const button = event.target.closest('[data-lab-id]');
                if (!button) return;

                const nextLabId = button.getAttribute('data-lab-id');
                const labRecord = getLabById(nextLabId);
                if (!labRecord) return;

                state.activeLevelId = labRecord.level.id;
                state.activeLabId = labRecord.lab.id;
                renderAll();
            });
        }

        if (labDetail) {
            labDetail.addEventListener('click', (event) => {
                const copyButton = event.target.closest('[data-copy-id]');
                if (copyButton) {
                    handleCopyButton(copyButton);
                    return;
                }

                const copyLabButton = event.target.closest('#copy-lab-btn');
                if (copyLabButton) {
                    handleCopyLab();
                    return;
                }

                const resetButton = event.target.closest('#reset-lab-progress-btn');
                if (resetButton) {
                    handleResetLabProgress();
                }
            });

            labDetail.addEventListener('change', (event) => {
                const checkbox = event.target.closest('.step-checkbox');
                if (!checkbox) return;

                const lab = getActiveLab();
                if (!lab) return;

                const stepIndex = Number(checkbox.getAttribute('data-step-index'));
                if (!Number.isInteger(stepIndex)) return;

                setStepComplete(lab.id, stepIndex, checkbox.checked);
                renderLabCards();
                renderLabDetail();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                state.searchQuery = event.target.value;
                renderLabCards();
                renderLabDetail();
            });
        }

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                state.searchQuery = '';
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
                renderLabCards();
                renderLabDetail();
            });
        }
    }

    function init() {
        const data = getData();

        loadProgress();

        if (!data) {
            renderMissingDataError();
            return;
        }

        initializeState(data);
        bindStaticEvents();
        renderAll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();