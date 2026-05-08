// amali-gce.js
// Logic interaktif untuk amali-helper.html.
// Versi V3 menyokong dropdown exam/lab, common start steps per lab session, guided step aktif, inline copy blocks, image blocks, dan progress localStorage.
// Data sumber dibaca daripada window.AMALI_GCE_DATA yang disediakan oleh amali-gce-data.js.

(function () {
    'use strict';

    const STORAGE_KEY = 'amaliGceProgressV2';
    const SESSION_KEY = 'amaliGceSessionV3';
    const COPY_SUCCESS_DURATION = 1800;

    const state = {
        activeLevelId: '',
        activeLabId: '',
        activeStepIndex: 0,
        searchQuery: '',
        showAllSteps: false,
        progress: {},
        commonStepProgress: {},
        prepConfirmedLabId: ''
    };

    const selectors = {
        appTitle: 'app-title',
        appSubtitle: 'app-subtitle',
        sourceBadge: 'source-badge',
        examSelect: 'exam-select',
        labSelect: 'lab-select',
        examSelectWrap: 'exam-select-wrap',
        labSelectWrap: 'lab-select-wrap',
        guidedShell: 'guided-shell',
        guidedSummary: 'guided-summary',
        commonStartPanel: 'common-start-panel',
        labProgressPanel: 'lab-progress-panel',
        guidedStepPanel: 'guided-step-panel',
        allStepsPanel: 'all-steps-panel',
        searchInput: 'search-input',
        clearSearchBtn: 'clear-search-btn',
        toast: 'toast',
        legacyLevelTabs: 'level-tabs',
        legacyLabCards: 'lab-cards',
        legacyLabDetail: 'lab-detail'
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
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function normalizeText(value) {
        return String(value || '').trim().toLowerCase();
    }

    function loadJson(storageKey, fallback) {
        try {
            const value = window.localStorage.getItem(storageKey);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.warn(`Gagal membaca ${storageKey}:`, error);
            return fallback;
        }
    }

    function saveJson(storageKey, value) {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(value));
        } catch (error) {
            console.warn(`Gagal menyimpan ${storageKey}:`, error);
        }
    }

    function loadState() {
        const session = loadJson(SESSION_KEY, {});
        state.progress = loadJson(STORAGE_KEY, {});
        state.activeLevelId = typeof session.activeLevelId === 'string' ? session.activeLevelId : '';
        state.activeLabId = typeof session.activeLabId === 'string' ? session.activeLabId : '';
        state.activeStepIndex = Number.isInteger(session.activeStepIndex) ? session.activeStepIndex : 0;
        state.showAllSteps = Boolean(session.showAllSteps);
        state.commonStepProgress = {};
        state.prepConfirmedLabId = '';
    }

    function saveProgress() {
        saveJson(STORAGE_KEY, state.progress);
    }

    function saveSession() {
        saveJson(SESSION_KEY, {
            activeLevelId: state.activeLevelId,
            activeLabId: state.activeLabId,
            activeStepIndex: state.activeStepIndex,
            showAllSteps: state.showAllSteps
        });
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
            const lab = Array.isArray(level.labs)
                ? level.labs.find((item) => item.id === labId)
                : null;

            if (lab) {
                return { level, lab };
            }
        }

        return null;
    }

    function getActiveLevel() {
        return getLevelById(state.activeLevelId);
    }

    function getActiveLabRecord() {
        return getLabById(state.activeLabId);
    }

    function getActiveLab() {
        const record = getActiveLabRecord();
        return record ? record.lab : null;
    }

    function getCommonSteps() {
        const data = getData();
        if (!data || !data.commonStart || !Array.isArray(data.commonStart.steps)) {
            return [];
        }

        return data.commonStart.steps;
    }

    function getLabSteps(lab) {
        if (!lab || !Array.isArray(lab.guidedSteps)) return [];
        return lab.guidedSteps;
    }

    function getProgressKey(scope, stepId) {
        return `${scope}::${stepId}`;
    }

    function getCommonProgressKey(stepId) {
        return `${state.activeLabId || 'no-lab'}::${stepId}`;
    }

    function isStepComplete(scope, stepId) {
        return Boolean(state.progress[getProgressKey(scope, stepId)]);
    }

    function setStepComplete(scope, stepId, isComplete) {
        const key = getProgressKey(scope, stepId);

        if (isComplete) {
            state.progress[key] = true;
        } else {
            delete state.progress[key];
        }

        saveProgress();
    }

    function isCommonStepComplete(stepId) {
        return Boolean(state.commonStepProgress[getCommonProgressKey(stepId)]);
    }

    function setCommonStepComplete(stepId, isComplete) {
        const key = getCommonProgressKey(stepId);

        if (isComplete) {
            state.commonStepProgress[key] = true;
        } else {
            delete state.commonStepProgress[key];
        }

        syncPrepConfirmationFromCommonSteps();
    }

    // ── SURGICAL EDIT START: Auto-complete Persediaan Awal jika Lab 100% selesai ──
    function resetCommonForActiveLab() {
        state.commonStepProgress = {};
        state.prepConfirmedLabId = '';

        const lab = getActiveLab();
        if (lab) {
            const progress = getLabProgress(lab);
            if (progress.total > 0 && progress.completed === progress.total) {
                getCommonSteps().forEach((step) => {
                    state.commonStepProgress[getCommonProgressKey(step.id)] = true;
                });
                state.prepConfirmedLabId = lab.id;
            }
        }
    }
    // ── SURGICAL EDIT END ──

    function isCommonComplete() {
        const lab = getActiveLab();
        const steps = getCommonSteps();

        if (!lab || steps.length === 0) return false;
        if (state.prepConfirmedLabId !== lab.id) return false;

        return steps.every((step) => isCommonStepComplete(step.id));
    }

    function syncPrepConfirmationFromCommonSteps() {
        const lab = getActiveLab();
        const steps = getCommonSteps();

        if (!lab || steps.length === 0) {
            state.prepConfirmedLabId = '';
            return;
        }

        const allComplete = steps.every((step) => isCommonStepComplete(step.id));
        state.prepConfirmedLabId = allComplete ? lab.id : '';
    }

    function setCommonComplete(isComplete) {
        const lab = getActiveLab();
        const steps = getCommonSteps();

        if (!lab) {
            resetCommonForActiveLab();
            return;
        }

        steps.forEach((step) => {
            const key = getCommonProgressKey(step.id);

            if (isComplete) {
                state.commonStepProgress[key] = true;
            } else {
                delete state.commonStepProgress[key];
            }
        });

        state.prepConfirmedLabId = isComplete ? lab.id : '';
    }

    function getLabProgress(lab) {
        const steps = getLabSteps(lab);

        if (steps.length === 0) {
            return {
                completed: 0,
                total: 0,
                percent: 0
            };
        }

        const completed = steps.reduce((count, step) => {
            return count + (isStepComplete(lab.id, step.id) ? 1 : 0);
        }, 0);

        return {
            completed,
            total: steps.length,
            percent: Math.round((completed / steps.length) * 100)
        };
    }

    function getFilteredLabs(level) {
        if (!level || !Array.isArray(level.labs)) return [];

        const query = normalizeText(state.searchQuery);
        if (!query) return level.labs;

        return level.labs.filter((lab) => {
            const guidedText = getLabSteps(lab).map((step) => {
                const copyText = Array.isArray(step.copyBlocks)
                    ? step.copyBlocks.map((block) => `${block.label} ${block.text}`).join(' ')
                    : '';
                const imageText = Array.isArray(step.imageBlocks)
                    ? step.imageBlocks.map((block) => `${block.label || ''} ${block.alt || ''}`).join(' ')
                    : '';

                return [step.title, step.before, copyText, imageText, step.after].join(' ');
            }).join(' ');

            const searchableText = [
                lab.title,
                lab.app,
                lab.summary,
                guidedText
            ].join(' ');

            return normalizeText(searchableText).includes(query);
        });
    }

    function getStepByCopyId(copyId) {
        const lab = getActiveLab();
        if (!lab) return null;

        for (const step of getLabSteps(lab)) {
            if (!Array.isArray(step.copyBlocks)) continue;

            const block = step.copyBlocks.find((item) => item.id === copyId);
            if (block) {
                return { step, block };
            }
        }

        for (const step of getCommonSteps()) {
            if (!Array.isArray(step.copyBlocks)) continue;

            const block = step.copyBlocks.find((item) => item.id === copyId);
            if (block) {
                return { step, block };
            }
        }

        return null;
    }

    function clampActiveStepIndex() {
        const lab = getActiveLab();
        const steps = getLabSteps(lab);

        if (steps.length === 0) {
            state.activeStepIndex = 0;
            return;
        }

        // ── SURGICAL EDIT START: Benarkan pengekalan step index, sekat di tahap UI ──
        // (Logik reset ke 0 dibuang supaya session restore berjaya)
        // ── SURGICAL EDIT END ──

        if (state.activeStepIndex < 0) {
            state.activeStepIndex = 0;
        }

        if (state.activeStepIndex > steps.length - 1) {
            state.activeStepIndex = steps.length - 1;
        }
    }

    function findFirstIncompleteStepIndex(lab) {
        if (!isCommonComplete()) return 0;

        const steps = getLabSteps(lab);
        const index = steps.findIndex((step) => !isStepComplete(lab.id, step.id));
        return index === -1 ? Math.max(steps.length - 1, 0) : index;
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

    function renderExamDropdown() {
        const data = getData();
        const examSelect = getElement(selectors.examSelect);
        if (!data || !examSelect) return;

        const options = ['<option value="">Pilih exam...</option>'].concat(
            data.levels.map((level) => {
                const selected = level.id === state.activeLevelId ? ' selected' : '';
                return `<option value="${escapeHtml(level.id)}"${selected}>${escapeHtml(level.title)}</option>`;
            })
        );

        examSelect.innerHTML = options.join('');
    }

    function renderLabDropdown() {
        const labSelect = getElement(selectors.labSelect);
        const labSelectWrap = getElement(selectors.labSelectWrap);
        const level = getActiveLevel();

        if (!labSelect) return;

        if (!level) {
            labSelect.innerHTML = '<option value="">Pilih exam dahulu...</option>';
            labSelect.disabled = true;
            if (labSelectWrap) labSelectWrap.classList.add('hidden');
            return;
        }

        const filteredLabs = getFilteredLabs(level);

        if (labSelectWrap) labSelectWrap.classList.remove('hidden');

        if (filteredLabs.length === 0) {
            labSelect.innerHTML = '<option value="">Tiada lab dijumpai...</option>';
            labSelect.disabled = true;
            return;
        }

        labSelect.disabled = false;

        const options = ['<option value="">Pilih lab...</option>'].concat(
            filteredLabs.map((lab) => {
                const selected = lab.id === state.activeLabId ? ' selected' : '';
                const progress = getLabProgress(lab);
                return `<option value="${escapeHtml(lab.id)}"${selected}>${escapeHtml(lab.title)} (${progress.percent}%)</option>`;
            })
        );

        labSelect.innerHTML = options.join('');
    }

    function renderGuidedSummary() {
        const container = getElement(selectors.guidedSummary);
        if (!container) return;

        const level = getActiveLevel();
        const lab = getActiveLab();

        if (!level) {
            container.innerHTML = `
                <div class="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-8 text-center">
                    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-400/10 text-3xl">🎯</div>
                    <h2 class="mt-5 text-xl font-black text-white">Pilih exam dahulu</h2>
                    <p class="mt-2 text-sm leading-relaxed text-slate-400">Selepas memilih exam, dropdown lab akan muncul untuk pilihan set amali.</p>
                </div>
            `;
            return;
        }

        if (!lab) {
            container.innerHTML = `
                <div class="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-8 text-center">
                    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-purple-300/20 bg-purple-400/10 text-3xl">📚</div>
                    <h2 class="mt-5 text-xl font-black text-white">Pilih lab untuk ${escapeHtml(level.shortTitle || level.title)}</h2>
                    <p class="mt-2 text-sm leading-relaxed text-slate-400">Langkah amali hanya akan dipaparkan selepas lab dipilih.</p>
                </div>
            `;
            return;
        }

        const progress = getLabProgress(lab);
        const commonDone = isCommonComplete();

        container.innerHTML = `
            <div class="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/20">
                <div class="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 md:p-8">
                    <div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <div>
                            <div class="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-200">
                                <span class="h-2 w-2 rounded-full bg-cyan-300"></span>
                                ${escapeHtml(level.shortTitle || level.title)} · ${escapeHtml(lab.app || 'Google Workspace')}
                            </div>
                            <h2 class="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">${escapeHtml(lab.title || '')}</h2>
                            <p class="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">${escapeHtml(lab.summary || '')}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-3 md:w-56">
                            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                                <div class="text-3xl font-black text-white">${progress.percent}%</div>
                                <div class="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Lab</div>
                            </div>
                            <div class="rounded-2xl border ${commonDone ? 'border-emerald-300/30 bg-emerald-400/10' : 'border-amber-300/30 bg-amber-400/10'} p-4 text-center">
                                <div class="text-2xl font-black ${commonDone ? 'text-emerald-200' : 'text-amber-200'}">${commonDone ? '✓' : '!'}</div>
                                <div class="mt-1 text-[11px] font-bold uppercase tracking-wider ${commonDone ? 'text-emerald-300/80' : 'text-amber-300/80'}">Awal</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                        <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all" style="width: ${progress.percent}%;"></div>
                    </div>
                    <div class="mt-3 text-xs text-slate-400">${progress.completed}/${progress.total} langkah khusus lab selesai</div>
                </div>
            </div>
        `;
    }

    // ── SURGICAL EDIT START: Besarkan fon langkah dan tambah renderer imej interaktif ──
    function renderCopyBlocks(copyBlocks) {
        if (!Array.isArray(copyBlocks) || copyBlocks.length === 0) return '';

        return `
            <div class="mt-5 space-y-4">
                ${copyBlocks.map((block) => `
                    <div class="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] shadow-lg shadow-black/20">
                        <div class="flex items-center justify-between gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-3">
                            <div class="min-w-0">
                                <div class="truncate text-sm font-bold uppercase tracking-wider text-cyan-300">${escapeHtml(block.label || 'Teks')}</div>
                            </div>
                            <button type="button" data-copy-id="${escapeHtml(block.id)}" class="copy-btn shrink-0 rounded-lg border border-purple-400/30 bg-purple-500/15 px-3 py-2 text-sm font-bold text-purple-100 transition-all hover:bg-purple-500/25 active:scale-95">
                                Salin
                            </button>
                        </div>
                        <pre class="max-h-72 overflow-auto whitespace-pre-wrap p-4 text-base leading-8 text-blue-100/90 custom-scrollbar md:text-lg"><code>${escapeHtml(block.text || '')}</code></pre>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderImageBlocks(imageBlocks) {
        if (!Array.isArray(imageBlocks) || imageBlocks.length === 0) return '';

        return `
            <div class="mt-5 grid grid-cols-1 gap-4">
                ${imageBlocks.map((block, index) => {
                    const src = block && block.src ? block.src : '';
                    const alt = block && block.alt ? block.alt : `Imej langkah ${index + 1}`;
                    const label = block && block.label ? block.label : 'Imej rujukan';
                    const caption = block && block.caption ? block.caption : 'Klik imej untuk besarkan paparan tanpa membuka tab baharu.';

                    if (!src) return '';

                    return `
                        <div class="overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-950/20 shadow-lg shadow-black/20">
                            <div class="border-b border-cyan-300/10 bg-cyan-950/40 px-4 py-3">
                                <div class="text-sm font-bold uppercase tracking-wider text-cyan-200">${escapeHtml(label)}</div>
                                <p class="mt-1 text-sm leading-relaxed text-cyan-100/70">${escapeHtml(caption)}</p>
                            </div>
                            <div
                                role="button"
                                tabindex="0"
                                data-image-preview-src="${escapeHtml(src)}"
                                data-image-preview-alt="${escapeHtml(alt)}"
                                data-image-preview-title="${escapeHtml(label)}"
                                class="image-preview-trigger group cursor-zoom-in bg-slate-950/60 p-3 outline-none transition-all hover:bg-slate-950 focus:ring-4 focus:ring-cyan-400/20"
                                aria-label="Besarkan imej ${escapeHtml(label)}"
                            >
                                <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" class="mx-auto max-h-[420px] w-full rounded-xl border border-white/10 object-contain shadow-2xl shadow-black/30 transition-transform duration-200 group-hover:scale-[1.01]" />
                                <div class="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-cyan-100/80">
                                    <span>🔍</span>
                                    <span>Klik untuk besarkan</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    function renderInstructionBlock(step, options) {
        const scope = options && options.scope ? options.scope : 'lab';
        const lab = getActiveLab();
        const progressScope = scope === 'common' ? 'common' : lab ? lab.id : 'lab';
        const complete = scope === 'common' ? isCommonStepComplete(step.id) : isStepComplete(progressScope, step.id);
        const copyBlocksHtml = renderCopyBlocks(step.copyBlocks);
        const imageBlocksHtml = renderImageBlocks(step.imageBlocks);
        const stepNumber = options && Number.isInteger(options.stepNumber) ? options.stepNumber : null;
        const totalSteps = options && Number.isInteger(options.totalSteps) ? options.totalSteps : null;
        const badgeText = stepNumber && totalSteps ? `Langkah ${stepNumber}/${totalSteps}` : 'Langkah';

        return `
            <div class="rounded-3xl border ${complete ? 'border-emerald-300/20 bg-emerald-950/20' : 'border-white/10 bg-slate-900/60'} p-6 shadow-xl shadow-black/10 md:p-8">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <div class="inline-flex rounded-full border ${complete ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-white/5 text-slate-400'} px-3 py-1 text-xs font-bold uppercase tracking-wider">${escapeHtml(badgeText)}</div>
                        <h3 class="mt-4 text-xl font-black leading-snug text-white md:text-2xl">${escapeHtml(step.title || '')}</h3>
                    </div>
                    <div class="shrink-0 rounded-full border ${complete ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-white/5 text-slate-500'} px-3 py-1 text-sm font-bold">${complete ? 'Selesai' : 'Aktif'}</div>
                </div>

                ${step.before ? `<p class="mt-5 text-base leading-8 text-slate-300 md:text-lg">${escapeHtml(step.before)}</p>` : ''}
                ${copyBlocksHtml}
                ${imageBlocksHtml}
                ${step.after ? `<p class="mt-5 text-base leading-8 text-slate-300 md:text-lg">${escapeHtml(step.after)}</p>` : ''}
            </div>
        `;
    }
    // ── SURGICAL EDIT END ──

    function renderCommonStartPanel() {
        const container = getElement(selectors.commonStartPanel);
        const data = getData();
        const lab = getActiveLab();

        if (!container) return;

        if (!lab) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        container.classList.remove('hidden');

        const commonStart = data && data.commonStart ? data.commonStart : null;
        const commonSteps = getCommonSteps();
        const commonDone = isCommonComplete();
        const firstCommonStep = commonSteps.length > 0 ? commonSteps[0] : null;

        // ── SURGICAL EDIT START: Butang Video Panduan Persediaan Awal ──
        const videoGuideUrl = commonStart && commonStart.videoGuideUrl ? commonStart.videoGuideUrl : '';
        const videoGuideBtnHtml = videoGuideUrl ? `
        <a href="${escapeHtml(videoGuideUrl)}" target="_blank" class="flex items-center justify-center gap-2 rounded-xl border border-rose-300/30 bg-rose-500/15 px-4 py-3 text-sm font-bold text-rose-100 transition-all hover:bg-rose-500/25 active:scale-95 shadow-lg shadow-rose-900/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Tonton Panduan Awal
        </a>
        ` : '';
        // ── SURGICAL EDIT END ──

        container.innerHTML = `
            <section class="rounded-3xl border ${commonDone ? 'border-emerald-300/20 bg-emerald-950/20' : 'border-amber-300/20 bg-amber-950/20'} p-5 md:p-6 shadow-xl shadow-black/10">
                <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <div class="inline-flex items-center gap-2 rounded-full border ${commonDone ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-200' : 'border-amber-300/30 bg-amber-400/10 text-amber-200'} px-3 py-1 text-xs font-bold uppercase tracking-wider">
                            <span class="h-2 w-2 rounded-full ${commonDone ? 'bg-emerald-300' : 'bg-amber-300'}"></span>
                            ${commonDone ? 'Selesai untuk lab ini' : 'Wajib sebelum lab ini'}
                        </div>
                        <h2 class="mt-3 text-xl font-black text-white">${escapeHtml(commonStart && commonStart.title ? commonStart.title : 'Persediaan Awal Semua Lab')}</h2>
                        <p class="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">${escapeHtml(commonStart && commonStart.description ? commonStart.description : '')}</p>
                        <p class="mt-2 max-w-3xl text-xs leading-relaxed text-amber-100/80">Status persediaan awal ini hanya sah untuk lab yang sedang dipilih. Jika tukar lab atau reload page, ia perlu disahkan semula.</p>
                    </div>
                    <div class="flex flex-col gap-2 sm:flex-row md:flex-col">
                        ${videoGuideBtnHtml}
                        <button type="button" id="open-guest-profile-btn" class="rounded-xl border border-cyan-300/30 bg-cyan-500/15 px-4 py-3 text-sm font-bold text-cyan-100 transition-all hover:bg-cyan-500/25 active:scale-95">
                            Buka Guest Profile
                        </button>
                        <button type="button" id="toggle-common-complete-btn" class="rounded-xl border ${commonDone ? 'border-slate-600 bg-slate-800/80 text-slate-300 hover:bg-slate-700' : 'border-emerald-300/30 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25'} px-4 py-3 text-sm font-bold transition-all active:scale-95">
                            ${commonDone ? 'Reset Persediaan' : 'Saya sudah selesai persediaan awal'}
                        </button>
                    </div>
                </div>

                <div class="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                    ${commonSteps.map((step, index) => {
                        const complete = isCommonStepComplete(step.id);
                        const isGuestStep = firstCommonStep && firstCommonStep.id === step.id;

                        return `
                            <button type="button" data-common-step-id="${escapeHtml(step.id)}" class="common-step-toggle rounded-2xl border ${complete ? 'border-emerald-300/20 bg-emerald-400/10' : 'border-white/10 bg-slate-900/60 hover:bg-slate-800/80'} p-4 text-left transition-all">
                                <div class="flex items-start gap-3">
                                    <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${complete ? 'bg-emerald-400/20 text-emerald-200' : 'bg-white/5 text-slate-400'} text-xs font-black">${complete ? '✓' : index + 1}</span>
                                    <span>
                                        <span class="block text-sm font-bold text-white">${isGuestStep ? 'Buka Guest Profile' : escapeHtml(step.title || '')}</span>
                                        <span class="mt-1 block text-xs leading-relaxed ${complete ? 'text-emerald-200/70' : 'text-slate-400'}">${escapeHtml(step.before || '')}${step.after ? ' ' + escapeHtml(step.after) : ''}</span>
                                    </span>
                                </div>
                            </button>
                        `;
                    }).join('')}
                </div>
            </section>
        `;
    }

    function renderLabProgressPanel() {
        const container = getElement(selectors.labProgressPanel);
        const lab = getActiveLab();

        if (!container) return;

        if (!lab) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        container.classList.remove('hidden');

        const steps = getLabSteps(lab);
        const progress = getLabProgress(lab);

        // ── SURGICAL EDIT START: Butang Video Tutorial Lab ──
        const videoGuideUrl = lab && lab.videoGuideUrl ? lab.videoGuideUrl : '';
        const videoGuideBtnHtml = videoGuideUrl ? `
        <a href="${escapeHtml(videoGuideUrl)}" target="_blank" class="flex items-center justify-center gap-2 rounded-xl border border-rose-300/30 bg-rose-500/15 px-4 py-2 text-sm font-bold text-rose-100 transition-all hover:bg-rose-500/25 active:scale-95 shadow-lg shadow-rose-900/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Video Tutorial Lab
        </a>
        ` : '';
        // ── SURGICAL EDIT END ──

        container.innerHTML = `
            <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-5 md:p-6 shadow-xl shadow-black/10">
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 class="text-lg font-black text-white">Progress Lab</h2>
                        <p class="mt-1 text-sm text-slate-400">Klik “Selesai & Seterusnya” untuk sembunyikan langkah semasa dan paparkan langkah berikutnya.</p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        ${videoGuideBtnHtml}
                        <button type="button" id="jump-first-incomplete-btn" class="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100 transition-all hover:bg-cyan-400/20 active:scale-95">
                            Pergi ke belum selesai
                        </button>
                        <button type="button" id="toggle-all-steps-btn" class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-white/10 active:scale-95">
                            ${state.showAllSteps ? 'Sembunyi Semua Langkah' : 'Lihat Semua Langkah'}
                        </button>
                        <button type="button" id="reset-lab-progress-btn" class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-white/10 active:scale-95">
                            Reset Lab
                        </button>
                    </div>
                </div>

                <div class="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                    <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all" style="width: ${progress.percent}%;"></div>
                </div>

                <div class="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                    <span>${progress.completed}/${progress.total} langkah selesai</span>
                    <span>Langkah aktif: ${steps.length > 0 ? state.activeStepIndex + 1 : 0}/${steps.length}</span>
                </div>
            </section>
        `;
    }

    function renderGuidedStepPanel() {
        const container = getElement(selectors.guidedStepPanel);
        const lab = getActiveLab();

        if (!container) return;

        if (!lab) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        container.classList.remove('hidden');

        const steps = getLabSteps(lab);
        clampActiveStepIndex();

        if (steps.length === 0) {
            container.innerHTML = `
                <section class="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-8 text-center">
                    <div class="text-3xl">📭</div>
                    <h2 class="mt-4 text-lg font-bold text-white">Tiada langkah lab direkodkan</h2>
                    <p class="mt-2 text-sm text-slate-400">Sila semak data amali untuk lab ini.</p>
                </section>
            `;
            return;
        }

        const step = steps[state.activeStepIndex];
        const isFirst = state.activeStepIndex === 0;
        const isLast = state.activeStepIndex === steps.length - 1;
        const complete = isStepComplete(lab.id, step.id);
        
        // ── SURGICAL EDIT START: Sekatan butang jika persediaan belum selesai ──
        const prepRequired = !isCommonComplete();
        // ── SURGICAL EDIT END ──

        container.innerHTML = `
            <section class="space-y-4">
                ${renderInstructionBlock(step, {
                    scope: 'lab',
                    stepNumber: state.activeStepIndex + 1,
                    totalSteps: steps.length
                })}

                ${prepRequired ? `
                    <div class="rounded-2xl border border-amber-300/20 bg-amber-950/30 p-4 text-sm leading-relaxed text-amber-100">
                        Sahkan Persediaan Awal Semua Lab dahulu sebelum meneruskan ${isFirst ? 'Langkah 1' : 'langkah ini'}.
                    </div>
                ` : ''}

                <div class="flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-xl shadow-black/10 sm:flex-row sm:items-center sm:justify-between">
                    <button type="button" id="previous-step-btn" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40" ${isFirst ? 'disabled' : ''}>
                        Sebelumnya
                    </button>

                    <div class="text-center text-xs text-slate-500">
                        ${prepRequired ? 'Butang ini dikunci sehingga persediaan awal disahkan.' : complete ? 'Langkah ini telah ditanda selesai.' : 'Klik selesai untuk paparkan langkah seterusnya.'}
                    </div>

                    <button type="button" id="complete-next-step-btn" class="rounded-xl border ${isLast ? 'border-emerald-300/30 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25' : 'border-purple-300/30 bg-purple-500/15 text-purple-100 hover:bg-purple-500/25'} px-4 py-3 text-sm font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40" ${prepRequired ? 'disabled' : ''}>
                        ${isLast ? 'Tandakan Selesai' : 'Selesai & Seterusnya'}
                    </button>
                </div>
            </section>
        `;
    }

    function renderAllStepsPanel() {
        const container = getElement(selectors.allStepsPanel);
        const lab = getActiveLab();

        if (!container) return;

        if (!lab || !state.showAllSteps) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        container.classList.remove('hidden');

        const steps = getLabSteps(lab);

        container.innerHTML = `
            <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-5 md:p-6 shadow-xl shadow-black/10">
                <div class="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 class="text-lg font-black text-white">Semua Langkah</h2>
                        <p class="mt-1 text-sm text-slate-400">Paparan semakan penuh. Klik mana-mana langkah untuk jadikannya langkah aktif.</p>
                    </div>
                    <div class="text-xs text-slate-500">${steps.length} langkah khusus lab</div>
                </div>

                <div class="space-y-4">
                    ${steps.map((step, index) => `
                        <button type="button" data-jump-step-index="${index}" class="jump-step-btn block w-full text-left transition-all hover:scale-[1.005] active:scale-[0.995]">
                            ${renderInstructionBlock(step, {
                                scope: 'lab',
                                stepNumber: index + 1,
                                totalSteps: steps.length
                            })}
                        </button>
                    `).join('')}
                </div>
            </section>
        `;
    }

    function ensureModernContainers() {
        const legacyDetail = getElement(selectors.legacyLabDetail);
        if (!legacyDetail) return;

        if (getElement(selectors.examSelect) && getElement(selectors.labSelect)) return;

        const levelTabs = getElement(selectors.legacyLevelTabs);
        const labCards = getElement(selectors.legacyLabCards);

        if (levelTabs) {
            levelTabs.innerHTML = `
                <div id="exam-select-wrap" class="space-y-3">
                    <label for="exam-select" class="block text-xs font-bold uppercase tracking-wider text-slate-500">Pilih Exam</label>
                    <select id="exam-select" class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/10">
                        <option value="">Pilih exam...</option>
                    </select>
                </div>
            `;
        }

        if (labCards) {
            labCards.innerHTML = `
                <div id="lab-select-wrap" class="hidden space-y-3">
                    <label for="lab-select" class="block text-xs font-bold uppercase tracking-wider text-slate-500">Pilih Lab</label>
                    <select id="lab-select" class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all focus:border-purple-300/50 focus:ring-4 focus:ring-purple-400/10" disabled>
                        <option value="">Pilih exam dahulu...</option>
                    </select>
                </div>
            `;
        }

        legacyDetail.innerHTML = `
            <div id="guided-shell" class="space-y-6">
                <div id="guided-summary"></div>
                <div id="common-start-panel" class="hidden"></div>
                <div id="lab-progress-panel" class="hidden"></div>
                <div id="guided-step-panel" class="hidden"></div>
                <div id="all-steps-panel" class="hidden"></div>
            </div>
        `;
    }

    function renderModernView() {
        const data = getData();

        if (!data) {
            renderMissingDataError();
            return;
        }

        renderMeta(data);
        renderExamDropdown();
        renderLabDropdown();
        renderGuidedSummary();
        renderCommonStartPanel();
        renderLabProgressPanel();
        renderGuidedStepPanel();
        renderAllStepsPanel();
        saveSession();
    }

    function renderMissingDataError() {
        const detail = getElement(selectors.guidedSummary) || getElement(selectors.legacyLabDetail);
        if (!detail) return;

        detail.innerHTML = `
            <div class="rounded-3xl border border-red-400/20 bg-red-950/30 p-8 text-center">
                <div class="text-4xl">⚠️</div>
                <h2 class="mt-4 text-xl font-bold text-red-100">Data amali tidak dijumpai</h2>
                <p class="mt-2 text-sm leading-relaxed text-red-200/80">Pastikan fail amali-gce-data.js dimuatkan sebelum amali-gce.js.</p>
            </div>
        `;
    }

    function renderGuestProfileModal() {
        const existingModal = getElement('guest-profile-modal');
        if (existingModal) existingModal.remove();

        const modalHtml = `
            <div id="guest-profile-modal" class="fixed inset-0 z-[150] flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm modal-backdrop"></div>
                
                <div class="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                    <div class="p-6 md:p-8">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200 text-2xl">
                                👤
                            </div>
                            <div>
                                <h3 class="text-xl font-black text-white">Buka Guest Profile</h3>
                                <p class="text-sm font-medium text-slate-400 mt-1">Langkah wajib untuk pengguna DELIMa.</p>
                            </div>
                        </div>

                        <div class="space-y-4 mb-8">
                            <div class="rounded-2xl border border-amber-300/20 bg-amber-500/10 p-4">
                                <p class="text-sm leading-relaxed text-amber-200/90 font-medium">
                                    <span class="font-bold text-amber-400">Penting:</span> 
                                    Akaun rasmi DELIMa menghalang penggunaan tab Incognito. Sila gunakan <strong>Guest Profile</strong> Chrome untuk mengelakkan pertembungan sesi semasa login amali.
                                </p>
                            </div>

                            <div class="space-y-3 mt-4">
                                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Cara Membuka:</h4>
                                <div class="flex items-start gap-3">
                                    <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">1</div>
                                    <p class="text-sm text-slate-300">Klik profil Chrome di penjuru atas kanan pelayar.</p>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">2</div>
                                    <p class="text-sm text-slate-300">Klik pada <span class="font-bold text-white">Guest</span> atau <span class="font-bold text-white">Tetamu</span>.</p>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">3</div>
                                    <p class="text-sm text-slate-300">Selesaikan login di tetingkap Guest yang baharu.</p>
                                </div>
                            </div>
                        </div>

                        <button type="button" id="close-guest-modal-btn" class="w-full rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-3.5 text-sm font-bold transition-all active:scale-95 shadow-lg shadow-cyan-900/50">
                            Saya Faham & Teruskan
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const closeBtn = getElement('close-guest-modal-btn');
        const backdrop = document.querySelector('.modal-backdrop');

        const closeModal = () => {
            const modal = getElement('guest-profile-modal');
            if (modal) modal.remove();
            
            const firstStep = getCommonSteps()[0];
            if (firstStep) {
                setCommonStepComplete(firstStep.id, true);
            }
            showToast('Langkah membuka Guest Profile telah disahkan.', 'success');
            renderModernView();
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);
    }

    // ── SURGICAL EDIT START: Lightbox imej tanpa membuka tab baharu ──
    function closeImagePreviewModal() {
        const modal = getElement('image-preview-modal');
        if (modal) modal.remove();
    }

    function renderImagePreviewModal(src, alt, title) {
        closeImagePreviewModal();

        const safeSrc = escapeHtml(src || '');
        const safeAlt = escapeHtml(alt || 'Imej rujukan langkah');
        const safeTitle = escapeHtml(title || 'Imej rujukan');

        if (!safeSrc) {
            showToast('Imej tidak dijumpai.', 'error');
            return;
        }

        const modalHtml = `
            <div id="image-preview-modal" class="fixed inset-0 z-[180] flex items-center justify-center p-3 md:p-6">
                <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" data-image-preview-close="true"></div>

                <div class="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/60">
                    <div class="flex items-center justify-between gap-4 border-b border-white/10 bg-slate-900/90 px-4 py-3 md:px-5">
                        <div class="min-w-0">
                            <h3 class="truncate text-base font-black text-white md:text-lg">${safeTitle}</h3>
                            <p class="mt-1 text-xs text-slate-400 md:text-sm">Paparan dibesarkan dalam halaman ini.</p>
                        </div>
                        <button type="button" data-image-preview-close="true" class="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition-all hover:bg-white/10 active:scale-95">
                            Tutup
                        </button>
                    </div>

                    <div class="custom-scrollbar overflow-auto bg-slate-950 p-3 md:p-5">
                        <img src="${safeSrc}" alt="${safeAlt}" class="mx-auto max-h-[78vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl shadow-black/40" />
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    // ── SURGICAL EDIT END ──

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
        const record = getStepByCopyId(copyId);

        if (!record || !record.block) {
            showToast('Teks tidak dijumpai.', 'error');
            return;
        }

        const originalText = button.textContent;
        button.textContent = 'Menyalin...';
        button.disabled = true;

        copyText(record.block.text || '')
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

    function markCurrentStepCompleteAndAdvance() {
        const lab = getActiveLab();
        if (!lab) return;

        const steps = getLabSteps(lab);
        if (steps.length === 0) return;

        clampActiveStepIndex();

        // ── SURGICAL EDIT START: Sekatan butang "Selesai" untuk semua langkah jika persediaan belum disahkan ──
        if (!isCommonComplete()) {
            showToast('Sahkan Persediaan Awal Semua Lab dahulu sebelum meneruskan.', 'error');
            renderModernView();
            return;
        }
        // ── SURGICAL EDIT END ──

        const currentStep = steps[state.activeStepIndex];
        setStepComplete(lab.id, currentStep.id, true);

        if (state.activeStepIndex < steps.length - 1) {
            state.activeStepIndex += 1;
            showToast('Langkah selesai. Langkah seterusnya dipaparkan.', 'success');
        } else {
            showToast('Langkah terakhir ditanda selesai.', 'success');
        }

        renderModernView();
    }

    function goToPreviousStep() {
        if (state.activeStepIndex > 0) {
            state.activeStepIndex -= 1;
            renderModernView();
        }
    }

    function jumpToFirstIncomplete() {
        const lab = getActiveLab();
        if (!lab) return;

        if (!isCommonComplete()) {
            state.activeStepIndex = 0;
            showToast('Sahkan Persediaan Awal Semua Lab dahulu sebelum pergi ke langkah belum selesai.', 'error');
            renderModernView();
            return;
        }

        state.activeStepIndex = findFirstIncompleteStepIndex(lab);
        renderModernView();
    }

    function resetLabProgress() {
        const lab = getActiveLab();
        if (!lab) return;

        getLabSteps(lab).forEach((step) => {
            delete state.progress[getProgressKey(lab.id, step.id)];
        });

        state.activeStepIndex = 0;
        
        // Reset state common back to false so it requires re-confirmation
        state.commonStepProgress = {};
        state.prepConfirmedLabId = '';

        saveProgress();
        showToast('Progress lab dan persediaan awal telah direset.', 'success');
        renderModernView();
    }

    function handleExamChange(value) {
        const level = getLevelById(value);

        state.activeLevelId = level ? level.id : '';
        state.activeLabId = '';
        state.activeStepIndex = 0;
        state.showAllSteps = false;
        
        state.commonStepProgress = {};
        state.prepConfirmedLabId = '';

        renderModernView();
    }

    function handleLabChange(value) {
        const labRecord = getLabById(value);

        if (!labRecord) {
            state.activeLabId = '';
            state.activeStepIndex = 0;
            state.showAllSteps = false;
            
            state.commonStepProgress = {};
            state.prepConfirmedLabId = '';
            
            renderModernView();
            return;
        }

        state.activeLevelId = labRecord.level.id;
        state.activeLabId = labRecord.lab.id;
        state.activeStepIndex = 0;
        state.showAllSteps = false;
        
        resetCommonForActiveLab();

        renderModernView();
    }

    function handleSearchChange(value) {
        state.searchQuery = value;

        const activeLevel = getActiveLevel();
        if (activeLevel && state.activeLabId) {
            const filteredLabs = getFilteredLabs(activeLevel);
            const currentLabStillVisible = filteredLabs.some((lab) => lab.id === state.activeLabId);

            if (!currentLabStillVisible) {
                state.activeLabId = '';
                state.activeStepIndex = 0;
                state.showAllSteps = false;
                
                state.commonStepProgress = {};
                state.prepConfirmedLabId = '';
            }
        }

        renderModernView();
    }

    function bindEvents() {
        document.addEventListener('change', (event) => {
            const examSelect = event.target.closest(`#${selectors.examSelect}`);
            if (examSelect) {
                handleExamChange(examSelect.value);
                return;
            }

            const labSelect = event.target.closest(`#${selectors.labSelect}`);
            if (labSelect) {
                handleLabChange(labSelect.value);
            }
        });

        document.addEventListener('input', (event) => {
            const searchInput = event.target.closest(`#${selectors.searchInput}`);
            if (!searchInput) return;

            handleSearchChange(searchInput.value);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeImagePreviewModal();
                return;
            }

            const imagePreviewTrigger = event.target.closest('[data-image-preview-src]');
            if (imagePreviewTrigger && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                event.stopPropagation();
                renderImagePreviewModal(
                    imagePreviewTrigger.getAttribute('data-image-preview-src'),
                    imagePreviewTrigger.getAttribute('data-image-preview-alt'),
                    imagePreviewTrigger.getAttribute('data-image-preview-title')
                );
            }
        });

        document.addEventListener('click', (event) => {
            const imagePreviewClose = event.target.closest('[data-image-preview-close]');
            if (imagePreviewClose) {
                event.preventDefault();
                event.stopPropagation();
                closeImagePreviewModal();
                return;
            }

            const imagePreviewTrigger = event.target.closest('[data-image-preview-src]');
            if (imagePreviewTrigger) {
                event.preventDefault();
                event.stopPropagation();
                renderImagePreviewModal(
                    imagePreviewTrigger.getAttribute('data-image-preview-src'),
                    imagePreviewTrigger.getAttribute('data-image-preview-alt'),
                    imagePreviewTrigger.getAttribute('data-image-preview-title')
                );
                return;
            }

            const copyButton = event.target.closest('[data-copy-id]');
            if (copyButton) {
                event.preventDefault();
                event.stopPropagation();
                handleCopyButton(copyButton);
                return;
            }

            const clearSearchBtn = event.target.closest(`#${selectors.clearSearchBtn}`);
            if (clearSearchBtn) {
                const searchInput = getElement(selectors.searchInput);
                state.searchQuery = '';

                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }

                renderModernView();
                return;
            }

            const openGuestProfileBtn = event.target.closest('#open-guest-profile-btn');
            if (openGuestProfileBtn) {
                renderGuestProfileModal();
                return;
            }

            const toggleCommonBtn = event.target.closest('#toggle-common-complete-btn');
            if (toggleCommonBtn) {
                const nextStatus = !isCommonComplete();
                setCommonComplete(nextStatus);
                showToast(nextStatus ? 'Persediaan awal untuk lab ini ditanda selesai.' : 'Persediaan awal untuk lab ini direset.', 'success');
                renderModernView();
                return;
            }

            const commonStepToggle = event.target.closest('[data-common-step-id]');
            if (commonStepToggle) {
                const stepId = commonStepToggle.getAttribute('data-common-step-id');
                setCommonStepComplete(stepId, !isCommonStepComplete(stepId));
                renderModernView();
                return;
            }

            const previousStepBtn = event.target.closest('#previous-step-btn');
            if (previousStepBtn) {
                goToPreviousStep();
                return;
            }

            const completeNextBtn = event.target.closest('#complete-next-step-btn');
            if (completeNextBtn) {
                markCurrentStepCompleteAndAdvance();
                return;
            }

            const jumpFirstIncompleteBtn = event.target.closest('#jump-first-incomplete-btn');
            if (jumpFirstIncompleteBtn) {
                jumpToFirstIncomplete();
                return;
            }

            const toggleAllStepsBtn = event.target.closest('#toggle-all-steps-btn');
            if (toggleAllStepsBtn) {
                state.showAllSteps = !state.showAllSteps;
                renderModernView();
                return;
            }

            const resetLabBtn = event.target.closest('#reset-lab-progress-btn');
            if (resetLabBtn) {
                resetLabProgress();
                return;
            }

            const jumpStepBtn = event.target.closest('[data-jump-step-index]');
            if (jumpStepBtn) {
                const index = Number(jumpStepBtn.getAttribute('data-jump-step-index'));
                if (Number.isInteger(index)) {
                    // ── SURGICAL EDIT START: Benarkan lompatan langkah, tapi kekal disekat di dalam panel ──
                    state.activeStepIndex = index;
                    state.showAllSteps = false;
                    // ── SURGICAL EDIT END ──
                    renderModernView();
                }
            }
        });
    }

    function validateRestoredSelection() {
        const level = getLevelById(state.activeLevelId);

        if (!level) {
            state.activeLevelId = '';
            state.activeLabId = '';
            state.activeStepIndex = 0;
            state.showAllSteps = false;
            resetCommonForActiveLab();
            return;
        }

        if (state.activeLabId) {
            const labRecord = getLabById(state.activeLabId);
            if (!labRecord || labRecord.level.id !== level.id) {
                state.activeLabId = '';
                state.activeStepIndex = 0;
                state.showAllSteps = false;
                resetCommonForActiveLab();
            }
        }

        // ── SURGICAL EDIT START: Baiki Logik Pemulihan Sesi (Jangan reset activeStepIndex) ──
        if (state.activeLabId) {
            resetCommonForActiveLab();
            // activeStepIndex dipelihara (tidak di-reset ke 0) untuk fungsi session restore
        }
        // ── SURGICAL EDIT END ──

        clampActiveStepIndex();
    }

    function init() {
        loadState();
        ensureModernContainers();
        validateRestoredSelection();
        bindEvents();
        renderModernView();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();