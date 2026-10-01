
(() => {
    'use strict';

    /* ================= constants & elements ================= */
    const STORAGE_KEY = 'day-ledger:v2';
    const MAX_LEN = 140;
    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const $ = s => document.querySelector(s);

    const els = {
        dateLine: $('#dateLine'), clock: $('#clock'),
        statPending: $('#statPending'), statDone: $('#statDone'),
        statBar: $('#statBar'), settledNote: $('#settledNote'), clearDone: $('#clearDone'),
        nextNo: $('#nextNo'),
        form: $('#entryForm'), input: $('#entryInput'), count: $('#entryCount'), error: $('#entryError'),
        filters: $('#filters'), ink: $('#filterInk'),
        searchInput: $('#searchInput'), searchClear: $('#searchClear'),
        resultsNote: $('#resultsNote'),
        ledger: $('#ledger'), empty: $('#emptyState'),
        colophonCount: $('#colophonCount'), storageNote: $('#storageNote'),
        toast: $('#toast'), toastMsg: $('#toastMsg'), toastUndo: $('#toastUndo'),
    };

    const svgIcon = p =>
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
    const ICONS = {
        pencil: svgIcon('<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>'),
        trash: svgIcon('<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>'),
        check: svgIcon('<path d="M20 6 9 17l-5-5"/>'),
        x: svgIcon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
    };

    /* ================= state ================= */
    let state = { seq: 0, tasks: [] };
    let filter = 'all';
    let query = '';
    let storageOk = true;
    let lastPending = null, lastDone = null;
    let toastTimer = null, toastAction = null;

    const uid = () => (crypto.randomUUID
        ? crypto.randomUUID()
        : 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
    const pad = (n, l = 2) => String(n).padStart(l, '0');

    /* ================= persistence ================= */
    /* v1 users migrate forward: their entries carry over untouched */
    function load() {
        for (const key of [STORAGE_KEY, 'day-ledger:v1']) {
            try {
                const raw = localStorage.getItem(key);
                if (raw) {
                    const data = JSON.parse(raw);
                    if (data && Array.isArray(data.tasks)) {
                        state.seq = Number(data.seq) || 0;
                        state.tasks = data.tasks
                            .filter(t => t && typeof t.text === 'string')
                            .map(t => ({
                                id: t.id || uid(),
                                no: Number(t.no) || 0,
                                text: t.text,
                                done: !!t.done,
                                createdAt: t.createdAt || Date.now(),
                                doneAt: t.doneAt || null,
                            }));
                        if (key !== STORAGE_KEY) save(); /* migrate to v2 */
                        return;
                    }
                }
            } catch (e) { /* corrupted or unavailable — try next / start fresh */ }
        }
        seed();
    }

    function save() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
        catch (e) { storageOk = false; }
    }

    /* first visit only: a small sample so the page opens with life */
    function seed() {
        const now = Date.now(), h = 3600000;
        state = {
            seq: 5, tasks: [
                { id: uid(), no: 1, text: 'Sketch the first idea in the margin', done: true, createdAt: now - 7 * h, doneAt: now - 5 * h },
                { id: uid(), no: 2, text: 'Reply to the letter from Tuesday', done: false, createdAt: now - 6 * h, doneAt: null },
                { id: uid(), no: 3, text: 'Water the fern on the windowsill', done: true, createdAt: now - 5 * h, doneAt: now - 2 * h },
                { id: uid(), no: 4, text: 'Read twenty pages before bed', done: false, createdAt: now - 3 * h, doneAt: null },
                { id: uid(), no: 5, text: 'Call the bookbinder about the ledger', done: false, createdAt: now - 1 * h, doneAt: null },
            ]
        };
        save();
    }

    /* ================= small helpers ================= */
    function fmtMeta(ts) {
        const d = new Date(ts), now = new Date();
        return d.toDateString() === now.toDateString()
            ? pad(d.getHours()) + ':' + pad(d.getMinutes())
            : d.getDate() + ' ' + MONTHS[d.getMonth()];
    }

    /* builds text safely, wrapping search matches in <mark> */
    function textFragment(text, q) {
        const frag = document.createDocumentFragment();
        if (!q) { frag.appendChild(document.createTextNode(text)); return frag; }
        const lower = text.toLowerCase(), ql = q.toLowerCase();
        let i = 0;
        while (i <= text.length) {
            const idx = lower.indexOf(ql, i);
            if (idx === -1) { frag.appendChild(document.createTextNode(text.slice(i))); break; }
            if (idx > i) frag.appendChild(document.createTextNode(text.slice(i, idx)));
            const mark = document.createElement('mark');
            mark.textContent = text.slice(idx, idx + ql.length);
            frag.appendChild(mark);
            i = idx + ql.length;
        }
        return frag;
    }

    function visibleTasks() {
        const q = query.toLowerCase();
        return state.tasks.filter(t => {
            if (filter === 'pending' && t.done) return false;
            if (filter === 'done' && !t.done) return false;
            if (q && !t.text.toLowerCase().includes(q)) return false;
            return true;
        });
    }

    function iconBtn({ cls = '', label, icon, action }) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'icon-btn' + (cls ? ' ' + cls : '');
        if (action) b.dataset.action = action;
        b.setAttribute('aria-label', label);
        b.innerHTML = icon;
        return b;
    }

    /* ================= rendering ================= */
    function makeRow(task) {
        const li = document.createElement('li');
        li.className = 'row grid-line' + (task.done ? ' done' : '');
        li.dataset.id = task.id;

        const check = document.createElement('button');
        check.type = 'button';
        check.className = 'checkbox';
        check.dataset.action = 'toggle';
        check.setAttribute('role', 'checkbox');
        check.setAttribute('aria-checked', String(task.done));
        check.setAttribute('aria-label', task.done ? 'Mark as pending' : 'Mark as done');
        check.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" pathLength="1"/></svg>';

        const no = document.createElement('span');
        no.className = 'lineno';
        no.textContent = pad(task.no, 3);

        const textCell = document.createElement('div');
        textCell.className = 'task-text';
        const content = document.createElement('span');
        content.className = 'content';
        content.appendChild(textFragment(task.text, query));
        textCell.appendChild(content);

        const meta = document.createElement('span');
        meta.className = 'meta';
        meta.textContent = fmtMeta(task.createdAt);
        meta.title = 'Added ' + new Date(task.createdAt).toLocaleString();

        const actions = document.createElement('div');
        actions.className = 'actions';
        actions.append(
            iconBtn({ label: 'Edit task', icon: ICONS.pencil, action: 'edit' }),
            iconBtn({ cls: 'danger', label: 'Delete task', icon: ICONS.trash, action: 'delete' })
        );

        li.append(check, no, textCell, meta, actions);
        return li;
    }

    function ghostRows() {
        const widths = ['62%', '44%', '70%', '52%'];
        return widths.map((w, i) => {
            const li = document.createElement('li');
            li.className = 'row grid-line ghost-row';
            li.setAttribute('aria-hidden', 'true');
            const box = document.createElement('span'); box.className = 'checkbox is-ghost';
            const no = document.createElement('span'); no.className = 'lineno is-ghost';
            no.textContent = pad(state.seq + 1 + i, 3);
            const line = document.createElement('span'); line.className = 'ghost-line';
            line.style.width = w;
            li.append(box, no, line);
            return li;
        });
    }

    function showEmpty(msg, sub, actionLabel) {
        els.empty.hidden = false;
        els.empty.replaceChildren();
        const m = document.createElement('p');
        m.className = 'empty-msg';
        m.textContent = msg;
        els.empty.appendChild(m);
        if (sub) {
            const s = document.createElement('p');
            s.className = 'empty-sub';
            s.textContent = sub;
            els.empty.appendChild(s);
        }
        if (actionLabel) {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'empty-action';
            b.textContent = actionLabel;
            b.addEventListener('click', clearSearch);
            els.empty.appendChild(b);
        }
    }

    function renderList() {
        const vis = visibleTasks();
        const total = state.tasks.length;
        els.ledger.replaceChildren();

        if (total === 0) {
            showEmpty('A blank page.', 'Add your first entry above');
            els.ledger.append(...ghostRows());
            return;
        }
        if (vis.length === 0) {
            if (query) showEmpty('No entries match \u201C' + query + '.\u201D', null, 'Clear search');
            else if (filter === 'pending') showEmpty('Nothing pending — the page is settled.');
            else showEmpty('Nothing settled yet.');
            return;
        }
        els.empty.hidden = true;
        const frag = document.createDocumentFragment();
        for (const t of vis) frag.appendChild(makeRow(t));
        els.ledger.appendChild(frag);
    }

    function setNum(el, val, prev) {
        const txt = pad(val);
        if (el.textContent !== txt) {
            el.textContent = txt;
            if (prev !== null) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
        }
    }

    function renderStats() {
        const total = state.tasks.length;
        const done = state.tasks.filter(t => t.done).length;
        const pending = total - done;
        setNum(els.statPending, pending, lastPending); lastPending = pending;
        setNum(els.statDone, done, lastDone); lastDone = done;
        const settled = total > 0 && pending === 0;
        els.statBar.style.width = (total ? Math.round(done / total * 100) : 0) + '%';
        els.statBar.classList.toggle('full', settled);
        els.settledNote.classList.toggle('show', settled);
        els.clearDone.classList.toggle('show', done > 0);
        els.nextNo.textContent = pad(state.seq + 1, 3);
    }

    function renderNote() {
        const total = state.tasks.length;
        const active = (query !== '' || filter !== 'all') && total > 0;
        if (!active) { els.resultsNote.classList.remove('show'); els.resultsNote.replaceChildren(); return; }
        els.resultsNote.classList.add('show');
        els.resultsNote.replaceChildren();
        const span = document.createElement('span');
        let label = 'Showing ' + visibleTasks().length + ' of ' + total + (total === 1 ? ' entry' : ' entries');
        if (query) label += ' — \u201C' + query + '\u201D';
        span.textContent = label;
        els.resultsNote.appendChild(span);
        if (query) {
            const b = document.createElement('button');
            b.type = 'button';
            b.textContent = 'Reset';
            b.addEventListener('click', clearSearch);
            els.resultsNote.appendChild(b);
        }
    }

    function renderFooter() {
        const total = state.tasks.length;
        els.colophonCount.textContent = total + (total === 1 ? ' entry recorded' : ' entries recorded');
        els.storageNote.textContent = storageOk
            ? 'All entries are stored locally in this browser'
            : 'Storage unavailable — entries will not persist';
    }

    function render() {
        renderStats();
        renderList();
        renderNote();
        renderFooter();
        save();
    }

    function flashRow(id) {
        const row = els.ledger.querySelector('[data-id="' + id + '"]');
        if (row) row.classList.add('enter');
    }

    /* ================= task actions ================= */
    function toggleTask(task) {
        task.done = !task.done;
        task.doneAt = task.done ? Date.now() : null;
        const row = els.ledger.querySelector('[data-id="' + task.id + '"]');
        const leavesView = (filter === 'pending' && task.done) || (filter === 'done' && !task.done);
        if (row) {
            row.classList.toggle('done', task.done); /* in place, so the strike animation plays */
            if (!leavesView) {
                const cb = row.querySelector('.checkbox');
                cb.setAttribute('aria-checked', String(task.done));
                cb.setAttribute('aria-label', task.done ? 'Mark as pending' : 'Mark as done');
            }
        }
        renderStats();
        save();
        if (leavesView) setTimeout(render, 560); /* let the strike finish, then re-filter */
        else { renderNote(); renderFooter(); }
    }

    function deleteTask(task, row) {
        if (row.classList.contains('collapsing')) return;
        row.style.height = row.offsetHeight + 'px';
        row.classList.add('removing', 'collapsing'); /* strike first, then collapse */
        requestAnimationFrame(() => { row.style.height = '0px'; });
        setTimeout(() => {
            const idx = state.tasks.findIndex(t => t.id === task.id);
            if (idx > -1) state.tasks.splice(idx, 1);
            render();
            showToast('Entry \u2116 ' + pad(task.no, 3) + ' removed', () => {
                state.tasks.splice(Math.min(idx, state.tasks.length), 0, task);
                render();
                flashRow(task.id);
            });
        }, 420);
    }

    function startEdit(row, task) {
        if (row.classList.contains('editing')) return;
        row.classList.add('editing');
        const textCell = row.querySelector('.task-text');
        const actions = row.querySelector('.actions');
        const meta = row.querySelector('.meta');
        meta.style.display = 'none';
        actions.replaceChildren();

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = task.text;
        input.spellcheck = false;
        input.setAttribute('aria-label', 'Edit task');

        const err = document.createElement('span');
        err.className = 'edit-error';
        textCell.replaceChildren(input, err);
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);

        const save = () => {
            const v = input.value.trim();
            if (!v) { err.textContent = 'The entry cannot be empty.'; nudge(input); return; }
            if (v.length > MAX_LEN) { err.textContent = 'Keep it under ' + MAX_LEN + ' characters.'; nudge(input); return; }
            task.text = v;
            render();
            flashRow(task.id);
        };
        const cancel = () => render();

        const saveBtn = iconBtn({ label: 'Save edit', icon: ICONS.check });
        saveBtn.addEventListener('click', save);
        const cancelBtn = iconBtn({ cls: 'danger', label: 'Cancel edit', icon: ICONS.x });
        cancelBtn.addEventListener('click', cancel);
        actions.append(saveBtn, cancelBtn);

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); save(); }
            else if (e.key === 'Escape') { e.preventDefault(); cancel(); }
        });
        input.addEventListener('input', () => { err.textContent = ''; });
    }

    function nudge(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }

    /* ================= toast with undo ================= */
    function showToast(msg, undo) {
        els.toastMsg.textContent = msg;
        toastAction = undo || null;
        els.toastUndo.style.display = undo ? '' : 'none';
        els.toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(hideToast, 5000);
    }
    function hideToast() { els.toast.classList.remove('show'); clearTimeout(toastTimer); }
    els.toastUndo.addEventListener('click', () => {
        const a = toastAction; toastAction = null; hideToast(); if (a) a();
    });

    /* ================= events ================= */
    els.ledger.addEventListener('click', e => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const row = btn.closest('.row');
        if (!row) return;
        const task = state.tasks.find(t => t.id === row.dataset.id);
        if (!task) return;
        const action = btn.dataset.action;
        if (action === 'toggle') toggleTask(task);
        else if (action === 'delete') deleteTask(task, row);
        else if (action === 'edit') startEdit(row, task);
    });

    /* add, with validation */
    els.form.addEventListener('submit', e => {
        e.preventDefault();
        const v = els.input.value.trim();
        if (!v) {
            entryError('The line is empty — write something first.');
            return;
        }
        if (v.length > MAX_LEN) {
            entryError('Keep it under ' + MAX_LEN + ' characters — you\u2019re at ' + v.length + '.');
            return;
        }
        const task = { id: uid(), no: ++state.seq, text: v, done: false, createdAt: Date.now(), doneAt: null };
        state.tasks.push(task);
        els.input.value = '';
        updateCount();
        clearEntryError();
        render();
        if (visibleTasks().some(t => t.id === task.id)) flashRow(task.id);
        else showToast('Entry \u2116 ' + pad(task.no, 3) + ' added — not shown in this view');
        els.input.focus();
    });

    function entryError(msg) {
        els.error.textContent = msg;
        els.error.classList.add('show');
        nudge(els.form);
    }
    function clearEntryError() { els.error.classList.remove('show'); els.error.textContent = ''; }

    els.input.addEventListener('input', () => { clearEntryError(); updateCount(); });
    function updateCount() {
        const n = els.input.value.length;
        els.count.textContent = n >= 120 ? n + ' / ' + MAX_LEN : '';
        els.count.classList.toggle('over', n > MAX_LEN);
    }

    /* filters — sliding ink underline */
    els.filters.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn || btn.dataset.filter === filter) return;
        filter = btn.dataset.filter;
        els.filters.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('is-active', b === btn));
        moveInk();
        render();
    });
    function moveInk() {
        const btn = els.filters.querySelector('.filter-btn.is-active');
        if (!btn) return;
        els.ink.style.left = btn.offsetLeft + 'px';
        els.ink.style.width = btn.offsetWidth + 'px';
    }
    window.addEventListener('resize', moveInk);
    window.addEventListener('load', moveInk);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);

    /* search — live, with highlighted matches */
    els.searchInput.addEventListener('input', () => {
        query = els.searchInput.value.trim();
        els.searchClear.hidden = query === '';
        render();
    });
    els.searchInput.addEventListener('keydown', e => {
        if (e.key === 'Escape') { e.preventDefault(); clearSearch(); }
    });
    els.searchClear.addEventListener('click', clearSearch);
    function clearSearch() {
        els.searchInput.value = '';
        query = '';
        els.searchClear.hidden = true;
        render();
        els.searchInput.focus();
    }

    /* clear all done, undoable */
    els.clearDone.addEventListener('click', () => {
        const done = state.tasks.filter(t => t.done);
        if (!done.length) return;
        const snapshot = done
            .map(t => ({ t, idx: state.tasks.indexOf(t) }))
            .sort((a, b) => a.idx - b.idx);
        state.tasks = state.tasks.filter(t => !t.done);
        render();
        showToast(done.length + (done.length === 1 ? ' entry' : ' entries') + ' cleared', () => {
            snapshot.forEach(({ t, idx }) =>
                state.tasks.splice(Math.min(idx, state.tasks.length), 0, t));
            render();
        });
    });

    /* ================= masthead clock ================= */
    function tick() {
        const now = new Date();
        const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
        els.clock.textContent = '\u2116 ' + doy + ' \u00B7 ' +
            pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
        els.dateLine.textContent =
            DAYS[now.getDay()] + ' \u00B7 ' + now.getDate() + ' ' + MONTHS[now.getMonth()] + ' ' + now.getFullYear();
    }

    /* ================= init ================= */
    load();
    render();
    tick();
    setInterval(tick, 1000);
    moveInk();
    if (window.matchMedia('(min-width: 681px)').matches) els.input.focus();
})();
