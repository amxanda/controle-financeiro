// ==================== CONSTANTES ====================
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const ANO_INICIAL = 2026;
const STORAGE_KEY = 'controle-financeiro-v1';

// 🎨 Cores de bancos (para Caixinhas)
const BANK_COLORS = {
    'nubank': '#820ad1', 'mercado pago': '#00b1ea', 'picpay': '#21c25e',
    'inter': '#ff7a00', 'c6 bank': '#242424', 'c6': '#242424',
    'itaú': '#ec7000', 'itau': '#ec7000', 'bradesco': '#cc092f',
    'santander': '#ec0000', 'caixa': '#0067ab', 'banco do brasil': '#fbe300',
    'bb': '#fbe300', 'btg': '#001e62', 'safra': '#b19357',
    'original': '#00a650', 'next': '#00ff5f', 'neon': '#00aeff',
    'pagseguro': '#00a651', 'will bank': '#ffd700', 'ame': '#8b2be2',
    'iti': '#ff0080', 'pan': '#00b0ff'
};

const getBankColor = (name) => {
    const key = (name || '').toLowerCase().trim();
    for (const [k, v] of Object.entries(BANK_COLORS)) {
        if (key.includes(k)) return v;
    }
    return '#6b4eff';
};

// 🎨 Cores de streams (para Assinaturas)
const STREAM_COLORS = {
    'netflix': '#e50914',
    'hbo': '#8b00ff', 'hbo max': '#8b00ff', 'max': '#8b00ff',
    'prime video': '#00a8e1', 'amazon prime': '#00a8e1', 'prime': '#00a8e1',
    'disney+': '#113ccf', 'disney plus': '#113ccf', 'disney': '#113ccf',
    'spotify': '#1db954',
    'deezer': '#a238ff',
    'youtube premium': '#ff0000', 'youtube': '#ff0000',
    'apple music': '#fa243c', 'apple tv': '#000000', 'apple tv+': '#000000',
    'globoplay': '#ff6600', 'globo play': '#ff6600',
    'paramount+': '#0064ff', 'paramount plus': '#0064ff', 'paramount': '#0064ff',
    'star+': '#003cff', 'star plus': '#003cff',
    'crunchyroll': '#f47521',
    'twitch': '#9146ff',
    'xbox game pass': '#107c10', 'game pass': '#107c10',
    'playstation plus': '#0070d1', 'ps plus': '#0070d1',
    'nintendo switch online': '#e60012', 'nintendo': '#e60012',
    'canva': '#00c4cc',
    'adobe': '#ff0000',
    'microsoft 365': '#d83b01', 'office 365': '#d83b01',
    'google one': '#4285f4',
    'icloud': '#3693f3',
    'dropbox': '#0061ff',
    'chatgpt': '#10a37f', 'openai': '#10a37f',
    'notion': '#000000',
    'figma': '#f24e1e',
    'github': '#181717',
    'linkedin premium': '#0a66c2',
    'duolingo': '#58cc02'
};

const getStreamColor = (name) => {
    const key = (name || '').toLowerCase().trim();
    if (STREAM_COLORS[key]) return STREAM_COLORS[key];
    for (const [k, v] of Object.entries(STREAM_COLORS)) {
        if (key.includes(k)) return v;
    }
    return '#64748b';
};

// 🎨 Cores de bancos (para Cartões)
const CARD_BANK_COLORS = {
    'nubank': '#820ad1', 'nu': '#820ad1',
    'inter': '#ff7a00',
    'picpay': '#21c25e',
    'mercado pago': '#00b1ea', 'mercadopago': '#00b1ea',
    'c6 bank': '#242424', 'c6': '#242424',
    'itaú': '#ec7000', 'itau': '#ec7000',
    'bradesco': '#cc092f',
    'santander': '#ec0000',
    'caixa': '#0067ab',
    'banco do brasil': '#fbe300', 'bb': '#fbe300',
    'btg': '#001e62', 'btg pactual': '#001e62',
    'safra': '#b19357',
    'original': '#00a650',
    'next': '#00ff5f',
    'neon': '#00aeff',
    'pagseguro': '#00a651',
    'will bank': '#ffd700',
    'ame': '#8b2be2',
    'iti': '#ff0080',
    'pan': '#00b0ff',
    'sicoob': '#003641',
    'sicredi': '#3fa110',
    'stone': '#00a868',
    'infinitepay': '#00d68f',
    'wise': '#9fe870',
    'revolut': '#0075eb',
    'paypal': '#003087',
    'visa': '#1a1f71',
    'mastercard': '#eb001b',
    'elo': '#000000',
    'american express': '#006fcf', 'amex': '#006fcf',
    'hipercard': '#b3131b'
};

const getCardColor = (name) => {
    const key = (name || '').toLowerCase().trim();
    if (CARD_BANK_COLORS[key]) return CARD_BANK_COLORS[key];
    for (const [k, v] of Object.entries(CARD_BANK_COLORS)) {
        if (key.includes(k)) return v;
    }
    return '#6b4eff';
};

// ==================== ESTADO ====================
const DEFAULT_STATE = {
    currentMonth: 0,
    currentYear: ANO_INICIAL,
    cards: [],
    debtors: [],
    subscriptions: [],
    banks: [],
    expenses: [],
    paidMonthly: []
};

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...DEFAULT_STATE, paidMonthly: new Set() };
        const parsed = JSON.parse(raw);
        return {
            currentMonth: typeof parsed.currentMonth === 'number' ? parsed.currentMonth : 0,
            currentYear: typeof parsed.currentYear === 'number' ? parsed.currentYear : ANO_INICIAL,
            cards: Array.isArray(parsed.cards) ? parsed.cards : [],
            debtors: Array.isArray(parsed.debtors) ? parsed.debtors : [],
            subscriptions: Array.isArray(parsed.subscriptions) ? parsed.subscriptions : [],
            banks: Array.isArray(parsed.banks) ? parsed.banks : [],
            expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
            paidMonthly: new Set(Array.isArray(parsed.paidMonthly) ? parsed.paidMonthly : [])
        };
    } catch (err) {
        console.warn('Erro ao carregar. Iniciando vazio.', err);
        return { ...DEFAULT_STATE, paidMonthly: new Set() };
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            currentMonth: state.currentMonth,
            currentYear: state.currentYear,
            cards: state.cards,
            debtors: state.debtors,
            subscriptions: state.subscriptions,
            banks: state.banks,
            expenses: state.expenses,
            paidMonthly: Array.from(state.paidMonthly)
        }));
    } catch (err) {
        console.warn('Erro ao salvar.', err);
    }
}

let state = loadState();
if (!(state.paidMonthly instanceof Set)) state.paidMonthly = new Set(state.paidMonthly || []);

// ==================== HELPERS ====================
const formatCurrency = (v) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

const getCardName = (cardId) => {
    const c = state.cards.find(x => x.id === cardId);
    return c ? c.name : 'Cartão removido';
};
const getCard = (cardId) => state.cards.find(x => x.id === cardId);
const getSubscription = (subId) => state.subscriptions.find(x => x.id === subId);
const getInstallmentValue = (exp) => exp.total / exp.installments;

const getParcelaNumberInMonth = (exp, month, year) => {
    const diff = (year - exp.startYear) * 12 + (month - exp.startMonth);
    if (diff < 0 || diff >= exp.installments) return 0;
    return diff + 1;
};

const getParcelaMonthYear = (exp, parcelaNum) => {
    const total = exp.startMonth + (parcelaNum - 1);
    return { month: total % 12, year: exp.startYear + Math.floor(total / 12) };
};

const isMonthlyPaid = (expId, month, year) =>
    state.paidMonthly.has(`${expId}-${month}-${year}`);

const calculateMonthTotal = (month, year) => {
    let total = 0;
    state.expenses.forEach(exp => {
        const num = getParcelaNumberInMonth(exp, month, year);
        if (num > 0 && !isMonthlyPaid(exp.id, month, year)) {
            total += getInstallmentValue(exp);
        }
    });
    return total;
};

const calculateDebtors = () => {
    const map = new Map();
    state.expenses.forEach(exp => {
        if (!exp.debtor) return;
        const valorParcela = getInstallmentValue(exp);
        for (let i = 1; i <= exp.installments; i++) {
            const { month, year } = getParcelaMonthYear(exp, i);
            if (!isMonthlyPaid(exp.id, month, year)) {
                map.set(exp.debtor, (map.get(exp.debtor) || 0) + valorParcela);
            }
        }
    });
    return map;
};

const calculateSubscriptions = () => {
    const map = new Map();
    state.expenses.forEach(exp => {
        if (!exp.subscriptionId) return;
        const valorParcela = getInstallmentValue(exp);
        for (let i = 1; i <= exp.installments; i++) {
            const { month, year } = getParcelaMonthYear(exp, i);
            if (!isMonthlyPaid(exp.id, month, year)) {
                map.set(exp.subscriptionId, (map.get(exp.subscriptionId) || 0) + valorParcela);
            }
        }
    });
    return map;
};

const getPaidInstallments = (exp) => {
    let count = 0;
    for (let i = 1; i <= exp.installments; i++) {
        const { month, year } = getParcelaMonthYear(exp, i);
        if (isMonthlyPaid(exp.id, month, year)) count++;
    }
    return count;
};

const getTotalGeralFatura = () => {
    let total = 0, pendentes = 0, pagas = 0;
    state.expenses.forEach(exp => {
        const valorParcela = getInstallmentValue(exp);
        for (let i = 1; i <= exp.installments; i++) {
            const { month, year } = getParcelaMonthYear(exp, i);
            if (isMonthlyPaid(exp.id, month, year)) pagas++;
            else { total += valorParcela; pendentes++; }
        }
    });
    return { total, parcelasPendentes: pendentes, parcelasPagas: pagas };
};

const getTotalBancos = () => {
    let total = 0, qtd = 0;
    state.banks.forEach(b => b.caixinhas.forEach(cx => { total += cx.valor; qtd++; }));
    return { total, qtd };
};

// ==================== RENDER ====================
function renderMonths() {
    document.getElementById('currentYearLabel').textContent = state.currentYear;
    const container = document.getElementById('monthsContainer');
    container.innerHTML = MESES.map((m, i) =>
        `<button class="month-btn ${i === state.currentMonth ? 'active' : ''}" data-month="${i}">${m}</button>`
    ).join('');
    container.querySelectorAll('.month-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.currentMonth = parseInt(e.target.dataset.month);
            renderAll();
        });
    });
}

function renderCards() {
    const c = document.getElementById('cardManagerList');
    if (state.cards.length === 0) {
        c.innerHTML = '<div class="empty-state">Nenhum cartão cadastrado.</div>';
        return;
    }
    c.innerHTML = state.cards.map(card => {
        const cor = card.color || getCardColor(card.name);
        return `<div class="card-chip" style="background:${cor};">${card.name} <button data-card-id="${card.id}" class="delete-card" title="Excluir">✕</button></div>`;
    }).join('');

    c.querySelectorAll('.delete-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.target.dataset.cardId;
            if (confirm('Excluir este cartão? Os gastos associados permanecerão, mas o cartão ficará como "removido".')) {
                state.cards = state.cards.filter(x => x.id !== id);
                renderAll();
            }
        });
    });
}

function renderSubscriptions() {
    const chips = document.getElementById('subscriptionChips');
    const c = document.getElementById('subscriptionManagerList');
    const totalBox = document.getElementById('subscriptionTotalValue');
    if (!c) return;

    const acumulado = calculateSubscriptions();
    let totalGeral = 0;
    acumulado.forEach(v => { totalGeral += v; });
    if (totalBox) totalBox.textContent = formatCurrency(totalGeral);

    if (state.subscriptions.length === 0) {
  chips.innerHTML = '<div class="empty-state" style="padding:8px 0;">Nenhuma assinatura cadastrada.</div>';
} else {
  chips.innerHTML = state.subscriptions.map(s =>
    `<div class="card-chip" style="background:${s.color || '#6b4eff'};">
      ${s.name}
      <button data-sub-id="${s.id}" class="delete-sub-chip" title="Excluir">✕</button>
    </div>`
  ).join('');

  // 🔹 Handler de exclusão dos chips
  chips.querySelectorAll('.delete-sub-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subId = e.target.dataset.subId;
      const sub = getSubscription(subId);
      if (!sub) return;

      // 🔒 Verifica se há gastos vinculados
      const vinculados = state.expenses.filter(exp => exp.subscriptionId === subId);

      if (vinculados.length > 0) {
        const nomes = vinculados.map(v => `• ${v.name}`).join('\n');
        alert(
          `Não é possível excluir "${sub.name}".\n\n` +
          `Há ${vinculados.length} gasto${vinculados.length === 1 ? '' : 's'} vinculado${vinculados.length === 1 ? '' : 's'}:\n\n` +
          nomes +
          `\n\nRemova o vínculo antes de excluir (edite o gasto e escolha outra assinatura ou "Nenhuma").`
        );
        return;
      }

      if (confirm(`Excluir a assinatura "${sub.name}"?`)) {
        state.subscriptions = state.subscriptions.filter(x => x.id !== subId);
        renderAll();
      }
    });
  });
}

    const ativas = state.subscriptions
        .map(s => ({ ...s, total: acumulado.get(s.id) || 0 }))
        .filter(s => s.total > 0)
        .sort((a, b) => b.total - a.total);

    if (ativas.length === 0) {
        c.innerHTML = '<div class="empty-state">Nenhuma assinatura com valor vinculado.</div>';
        return;
    }

    c.innerHTML = ativas.map(s => `
    <div class="list-item" data-sub-id="${s.id}">
      <div class="list-name-container">
        <span class="list-color-dot" style="background:${s.color || '#6b4eff'};"></span>
        <span class="list-name" data-original-name="${s.name}">${s.name}</span>
      </div>
      <span class="list-value sub">${formatCurrency(s.total)}</span>
      <div class="list-actions">
        <button class="edit-sub-btn" title="Editar">✎</button>
      </div>
    </div>
  `).join('');

    c.querySelectorAll('.edit-sub-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = e.target.closest('.list-item');
            const subId = item.dataset.subId;
            const sub = getSubscription(subId);
            if (sub) openEditSubscriptionModal(sub);
        });
    });
}

function renderExpenses() {
    const month = state.currentMonth;
    const year = state.currentYear;
    const container = document.getElementById('expenseListContainer');

    const list = state.expenses.filter(exp => getParcelaNumberInMonth(exp, month, year) > 0);
    document.getElementById('currentMonthLabel').textContent = `${MESES[month]} ${year}`;

    if (list.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum gasto neste mês.</div>';
        document.getElementById('faturaTotalValue').textContent = formatCurrency(calculateMonthTotal(month, year));
        return;
    }

    const grupos = new Map();
    list.forEach(exp => {
        if (!grupos.has(exp.cardId)) grupos.set(exp.cardId, []);
        grupos.get(exp.cardId).push(exp);
    });

    let html = '';
    grupos.forEach((exps, cardId) => {
        const card = getCard(cardId);
        const cardName = card ? card.name : 'Cartão removido';
        const cardColor = card?.color || getCardColor(cardName);

        let subtotal = 0;
        exps.forEach(exp => {
            if (!isMonthlyPaid(exp.id, month, year)) subtotal += getInstallmentValue(exp);
        });

        html += `
      <div class="card-group">
        <div class="card-group-header" style="background:${cardColor};">
          <span class="card-group-name">💳 ${cardName}</span>
          <span class="card-group-subtotal">${formatCurrency(subtotal)}</span>
        </div>
        <div class="card-group-items">
    `;

        exps.forEach(exp => {
            const parcela = getInstallmentValue(exp);
            const pago = isMonthlyPaid(exp.id, month, year);
            const parcelaNum = getParcelaNumberInMonth(exp, month, year);
            const sub = exp.subscriptionId ? getSubscription(exp.subscriptionId) : null;

            let tags = '';
            if (exp.debtor) {
                tags += `<span class="expense-tag" style="background:#ef4444;">${exp.debtor}</span>`;
            }
            if (sub) {
                tags += `<span class="expense-tag" style="background:${sub.color || '#6b4eff'};">📺 ${sub.name}</span>`;
            }

            html += `
        <div class="expense-item ${pago ? 'paid' : ''}" data-expense-id="${exp.id}" style="border-left-color:${exp.color || cardColor};">
          <input type="checkbox" class="expense-check" data-expense-id="${exp.id}" ${pago ? 'checked' : ''}>
          <div class="expense-info">
            <div class="expense-title-row">
              <span class="expense-name">${exp.name}</span>
              ${tags}
            </div>
            <div class="text-muted" style="font-size:0.8rem;">Parcela ${parcelaNum} de ${exp.installments}</div>
          </div>
          <div class="expense-value">${formatCurrency(parcela)}</div>
          <button class="expense-delete-btn" data-expense-id="${exp.id}" title="Excluir gasto">🗑️</button>
        </div>
      `;
        });

        html += `</div></div>`;
    });

    container.innerHTML = html;
    document.getElementById('faturaTotalValue').textContent = formatCurrency(calculateMonthTotal(month, year));

    container.querySelectorAll('.expense-check').forEach(cb => {
        cb.addEventListener('change', (e) => {
            e.stopPropagation();
            const id = e.target.dataset.expenseId;
            const key = `${id}-${month}-${year}`;
            if (e.target.checked) state.paidMonthly.add(key);
            else state.paidMonthly.delete(key);
            renderAll();
        });
    });

    container.querySelectorAll('.expense-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox' || e.target.classList.contains('expense-delete-btn')) return;
            const exp = state.expenses.find(x => x.id === item.dataset.expenseId);
            if (exp) openDetailModal(exp);
        });
    });

    container.querySelectorAll('.expense-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.target.dataset.expenseId;
            if (confirm('Excluir este gasto? Todas as parcelas serão removidas.')) {
                state.expenses = state.expenses.filter(x => x.id !== id);
                const toRemove = [];
                state.paidMonthly.forEach(k => { if (k.startsWith(id + '-')) toRemove.push(k); });
                toRemove.forEach(k => state.paidMonthly.delete(k));
                renderAll();
            }
        });
    });
}

function renderDebtors() {
    const chips = document.getElementById('debtorChips');
    const c = document.getElementById('debtorsContainer');
    const map = calculateDebtors();

    if (state.debtors.length === 0) {
  chips.innerHTML = '<div class="empty-state" style="padding:8px 0;">Nenhum devedor cadastrado.</div>';
} else {
  chips.innerHTML = state.debtors.map(nome =>
    `<div class="card-chip neutral">
      ${nome}
      <button data-debtor-name="${nome}" class="delete-debtor-chip" title="Excluir">✕</button>
    </div>`
  ).join('');

  // 🔹 Handler de exclusão dos chips
  chips.querySelectorAll('.delete-debtor-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const nome = e.target.dataset.debtorName;
      if (!nome) return;

      // 🔒 Verifica se há gastos vinculados
      const vinculados = state.expenses.filter(exp => exp.debtor === nome);

      if (vinculados.length > 0) {
        const lista = vinculados.map(v => `• ${v.name}`).join('\n');
        alert(
          `Não é possível excluir "${nome}".\n\n` +
          `Há ${vinculados.length} gasto${vinculados.length === 1 ? '' : 's'} vinculado${vinculados.length === 1 ? '' : 's'}:\n\n` +
          lista +
          `\n\nRemova o vínculo antes de excluir (edite o gasto e escolha outro devedor ou "Nenhum").`
        );
        return;
      }

      if (confirm(`Excluir o devedor "${nome}"?`)) {
        state.debtors = state.debtors.filter(d => d !== nome);
        renderAll();
      }
    });
  });
}

    const ativos = Array.from(map.entries())
        .filter(([_, v]) => v > 0)
        .sort((a, b) => b[1] - a[1]);

    if (ativos.length === 0) {
        c.innerHTML = '<div class="empty-state">Ninguém te deve no momento.</div>';
        return;
    }

    c.innerHTML = ativos.map(([nome, valor]) => `
    <div class="list-item" data-debtor-name="${nome}">
      <div class="list-name-container">
        <span class="list-name" data-original-name="${nome}">${nome}</span>
      </div>
      <span class="list-value danger">${formatCurrency(valor)}</span>
      <div class="list-actions">
        <button class="edit-debtor-btn" title="Editar nome">✎</button>
      </div>
    </div>
  `).join('');

    c.querySelectorAll('.edit-debtor-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = e.target.closest('.list-item');
            const span = item.querySelector('.list-name');
            const original = span.dataset.originalName;

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'list-name-input';
            input.value = original;
            span.replaceWith(input);
            input.focus(); input.select();

            const actions = item.querySelector('.list-actions');
            actions.innerHTML = `<button class="save-btn" title="Salvar">✓</button><button class="cancel-debtor-btn" title="Cancelar">✕</button>`;

            const save = () => {
                const novo = input.value.trim();
                if (novo && novo !== original) {
                    state.expenses.forEach(exp => { if (exp.debtor === original) exp.debtor = novo; });
                    const idx = state.debtors.indexOf(original);
                    if (idx >= 0) state.debtors[idx] = novo;
                    else if (novo) state.debtors.push(novo);
                }
                renderAll();
            };
            const cancel = () => renderAll();

            actions.querySelector('.save-btn').addEventListener('click', save);
            actions.querySelector('.cancel-debtor-btn').addEventListener('click', cancel);
            input.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter') save();
                if (ev.key === 'Escape') cancel();
            });
        });
    });
}

function renderBanks() {
    const c = document.getElementById('banksContainer');
    if (state.banks.length === 0) {
        c.innerHTML = '<div class="empty-state">Nenhum banco cadastrado.</div>';
        return;
    }
    c.innerHTML = state.banks.map(bank => {
        const total = bank.caixinhas.reduce((a, cx) => a + cx.valor, 0);
        const color = bank.color || getBankColor(bank.name);
        return `
      <div class="bank-card" style="border-left: 5px solid ${color};">
        <div class="bank-header">
          <span class="bank-name" style="color:${color};">${bank.name}</span>
          <span class="bank-total">${formatCurrency(total)}</span>
        </div>
        <div class="caixinha-list">
          ${bank.caixinhas.map((cx, idx) => `
            <div class="caixinha-item">
              <span class="caixinha-nome">${cx.nome}</span>
              <span class="caixinha-valor">${formatCurrency(cx.valor)}</span>
              <div class="caixinha-actions">
                <button class="edit-caixinha" data-bank-id="${bank.id}" data-index="${idx}">✎</button>
                <button class="delete-caixinha" data-bank-id="${bank.id}" data-index="${idx}">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-outline btn-sm add-caixinha-btn" data-bank-id="${bank.id}">+ Caixinha</button>
      </div>
    `;
    }).join('');

    c.querySelectorAll('.edit-caixinha').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const bankId = e.target.dataset.bankId;
            const i = parseInt(e.target.dataset.index);
            const bank = state.banks.find(b => b.id === bankId);
            if (bank) openCaixinhaModal(bankId, i, bank.caixinhas[i].nome, bank.caixinhas[i].valor);
        });
    });

    c.querySelectorAll('.delete-caixinha').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const bankId = e.target.dataset.bankId;
            const i = parseInt(e.target.dataset.index);
            const bank = state.banks.find(b => b.id === bankId);
            if (bank && confirm(`Excluir a caixinha "${bank.caixinhas[i].nome}"?`)) {
                bank.caixinhas.splice(i, 1);
                renderAll();
            }
        });
    });

    c.querySelectorAll('.add-caixinha-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            openCaixinhaModal(e.target.dataset.bankId, null, '', 0);
        });
    });
}

function renderSummary() {
    const { total } = getTotalGeralFatura();
    document.getElementById('summaryFatura').textContent = formatCurrency(total);

    const map = calculateDebtors();
    let totalDiv = 0; map.forEach(v => totalDiv += v);
    document.getElementById('summaryDividas').textContent = formatCurrency(totalDiv);

    const { total: tb } = getTotalBancos();
    document.getElementById('summaryBancos').textContent = formatCurrency(tb);
}

// ==================== MODAIS ====================
function openDetailModal(expense) {
    const modal = document.getElementById('detailModal');
    document.getElementById('detailTitle').textContent = expense.name;
    const content = document.getElementById('detailContent');
    const parcela = getInstallmentValue(expense);
    const pagas = getPaidInstallments(expense);
    const total = expense.installments;
    const progresso = (pagas / total) * 100;
    const atual = Math.min(pagas + 1, total);
    const prox = getParcelaMonthYear(expense, atual);
    const sub = expense.subscriptionId ? getSubscription(expense.subscriptionId) : null;

    let lista = '';
    for (let i = 1; i <= total; i++) {
        const { month, year } = getParcelaMonthYear(expense, i);
        const paga = isMonthlyPaid(expense.id, month, year);
        lista += `<div style="display:flex; justify-content:space-between; padding:4px 0; font-size:0.85rem; ${paga ? 'color:#94a3b8; text-decoration:line-through;' : ''}">
      <span>Parcela ${i} — ${MESES[month]}/${year}</span>
      <span>${formatCurrency(parcela)} ${paga ? '✓' : ''}</span>
    </div>`;
    }

    content.innerHTML = `
    <div class="installment-row"><span>Valor total</span><strong>${formatCurrency(expense.total)}</strong></div>
    <div class="installment-row"><span>Valor da parcela</span><strong>${formatCurrency(parcela)}</strong></div>
    <div class="installment-row"><span>Parcelas pagas</span><strong>${pagas} de ${total}</strong></div>
    <div class="installment-progress"><div class="installment-progress-bar" style="width:${progresso}%"></div></div>
    <div class="installment-parcela">Parcela ${atual} de ${total} — ${MESES[prox.month]}/${prox.year}</div>
    <div class="text-muted" style="text-align:center;">Cartão: ${getCardName(expense.cardId)}</div>
    ${expense.debtor ? `<div class="text-muted" style="text-align:center;">Devedor: ${expense.debtor}</div>` : ''}
    ${sub ? `<div class="text-muted" style="text-align:center;">Assinatura: ${sub.name}</div>` : ''}
    <details style="margin-top:8px;">
      <summary style="cursor:pointer; font-size:0.85rem; color:var(--accent); font-weight:600;">Ver todas as parcelas</summary>
      <div style="margin-top:8px; max-height:220px; overflow-y:auto;">${lista}</div>
    </details>
    <button class="btn btn-outline btn-sm" id="editExpenseFromDetail" style="margin-top:8px;">✎ Editar gasto</button>
  `;

    document.getElementById('editExpenseFromDetail').addEventListener('click', () => {
        modal.classList.remove('open');
        openEditExpenseModal(expense);
    });

    modal.classList.add('open');
}

function openCaixinhaModal(bankId, index, nome, valor) {
    document.getElementById('caixinhaModalTitle').textContent = index === null ? 'Nova caixinha' : 'Editar caixinha';
    document.getElementById('caixinhaBankId').value = bankId;
    document.getElementById('caixinhaIndex').value = index !== null ? index : '';
    document.getElementById('caixinhaNome').value = nome;
    document.getElementById('caixinhaValor').value = valor;
    document.getElementById('caixinhaModal').classList.add('open');
}

function openEditExpenseModal(expense) {
    document.getElementById('expenseModalTitle').textContent = 'Editar gasto';
    document.getElementById('expenseEditId').value = expense.id;
    document.getElementById('expenseName').value = expense.name;
    document.getElementById('expenseTotal').value = expense.total;
    document.getElementById('expenseInstallments').value = expense.installments;
    document.getElementById('expenseColor').value = expense.color || '#6b4eff';

    document.getElementById('expenseCard').innerHTML =
        state.cards.map(c => `<option value="${c.id}" ${c.id === expense.cardId ? 'selected' : ''}>${c.name}</option>`).join('');
    document.getElementById('expenseDebtor').innerHTML = '<option value="">-- Nenhum --</option>' +
        state.debtors.map(d => `<option value="${d}" ${d === expense.debtor ? 'selected' : ''}>${d}</option>`).join('');
    document.getElementById('expenseSubscription').innerHTML = '<option value="">-- Nenhuma --</option>' +
        state.subscriptions.map(s => `<option value="${s.id}" ${s.id === expense.subscriptionId ? 'selected' : ''}>${s.name}</option>`).join('');

    document.getElementById('expenseModal').classList.add('open');
}

function openEditSubscriptionModal(sub) {
    document.getElementById('subscriptionModalTitle').textContent = 'Editar assinatura';
    document.getElementById('subscriptionEditId').value = sub.id;
    document.getElementById('subscriptionName').value = sub.name;
    document.getElementById('subscriptionModal').classList.add('open');
}

// ==================== RENDER ALL ====================
function renderAll() {
    renderMonths();
    renderCards();
    renderExpenses();
    renderDebtors();
    renderSubscriptions();
    renderBanks();
    renderSummary();
    saveState();
}

// ==================== INICIALIZAÇÃO ====================
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('prevYearBtn').addEventListener('click', () => {
        state.currentYear--;
        renderAll();
    });
    document.getElementById('nextYearBtn').addEventListener('click', () => {
        state.currentYear++;
        renderAll();
    });

    document.getElementById('resetAllBtn').addEventListener('click', () => {
        if (confirm('Apagar TODOS os dados salvos? Esta ação não pode ser desfeita.')) {
            localStorage.removeItem(STORAGE_KEY);
            state = { ...DEFAULT_STATE, paidMonthly: new Set() };
            renderAll();
        }
    });

    renderAll();

    // GASTO
    document.getElementById('openAddExpenseBtn').addEventListener('click', () => {
        if (state.cards.length === 0) {
            alert('Cadastre um cartão antes de lançar um gasto.');
            return;
        }
        document.getElementById('expenseModalTitle').textContent = 'Novo gasto';
        document.getElementById('expenseEditId').value = '';
        document.getElementById('expenseForm').reset();
        document.getElementById('expenseColor').value = '#6b4eff';
        document.getElementById('expenseCard').innerHTML =
            state.cards.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        document.getElementById('expenseDebtor').innerHTML = '<option value="">-- Nenhum --</option>' +
            state.debtors.map(d => `<option value="${d}">${d}</option>`).join('');
        document.getElementById('expenseSubscription').innerHTML = '<option value="">-- Nenhuma --</option>' +
            state.subscriptions.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        document.getElementById('expenseModal').classList.add('open');
    });
    document.getElementById('closeExpenseModal').addEventListener('click', () =>
        document.getElementById('expenseModal').classList.remove('open'));

    // DETALHE
    document.getElementById('closeDetailModal').addEventListener('click', () =>
        document.getElementById('detailModal').classList.remove('open'));

    // CAIXINHA
    document.getElementById('closeCaixinhaModal').addEventListener('click', () =>
        document.getElementById('caixinhaModal').classList.remove('open'));

    // BANCO
    document.getElementById('openAddBankBtn').addEventListener('click', () => {
        document.getElementById('bankForm').reset();
        document.getElementById('bankModal').classList.add('open');
    });
    document.getElementById('closeBankModal').addEventListener('click', () =>
        document.getElementById('bankModal').classList.remove('open'));

    // CARTÃO
    document.getElementById('openAddCardBtn').addEventListener('click', () => {
        document.getElementById('cardForm').reset();
        document.getElementById('cardModal').classList.add('open');
    });
    document.getElementById('closeCardModal').addEventListener('click', () =>
        document.getElementById('cardModal').classList.remove('open'));

    // ASSINATURA
    document.getElementById('openAddSubscriptionBtn').addEventListener('click', () => {
        document.getElementById('subscriptionModalTitle').textContent = 'Adicionar assinatura';
        document.getElementById('subscriptionEditId').value = '';
        document.getElementById('subscriptionForm').reset();
        document.getElementById('subscriptionModal').classList.add('open');
    });
    document.getElementById('closeSubscriptionModal').addEventListener('click', () =>
        document.getElementById('subscriptionModal').classList.remove('open'));

    // DEVEDOR
    document.getElementById('openAddDebtorBtn').addEventListener('click', () => {
        document.getElementById('debtorForm').reset();
        document.getElementById('debtorModal').classList.add('open');
    });
    document.getElementById('closeDebtorModal').addEventListener('click', () =>
        document.getElementById('debtorModal').classList.remove('open'));

    // Fechar ao clicar fora
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('open');
        });
    });

    // SUBMIT GASTO
    document.getElementById('expenseForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('expenseEditId').value;
        const name = document.getElementById('expenseName').value.trim();
        const total = parseFloat(document.getElementById('expenseTotal').value);
        const installments = parseInt(document.getElementById('expenseInstallments').value);
        const cardId = document.getElementById('expenseCard').value;
        const debtor = document.getElementById('expenseDebtor').value || null;
        const subscriptionId = document.getElementById('expenseSubscription').value || null;
        const color = document.getElementById('expenseColor').value;

        if (!name || isNaN(total) || total <= 0 || installments < 1 || !cardId) return;

        if (editId) {
            const exp = state.expenses.find(x => x.id === editId);
            if (exp) {
                exp.name = name; exp.total = total; exp.installments = installments;
                exp.cardId = cardId; exp.debtor = debtor; exp.subscriptionId = subscriptionId;
                exp.color = color;
            }
        } else {
            state.expenses.push({
                id: 'e' + Date.now(),
                name, total, installments, cardId, debtor, subscriptionId, color,
                startMonth: state.currentMonth,
                startYear: state.currentYear
            });
        }
        if (debtor && !state.debtors.includes(debtor)) state.debtors.push(debtor);
        document.getElementById('expenseModal').classList.remove('open');
        renderAll();
    });

    // SUBMIT CAIXINHA
    document.getElementById('caixinhaForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const bankId = document.getElementById('caixinhaBankId').value;
        const iStr = document.getElementById('caixinhaIndex').value;
        const nome = document.getElementById('caixinhaNome').value.trim();
        const valor = parseFloat(document.getElementById('caixinhaValor').value);
        if (!nome || isNaN(valor) || valor < 0) return;

        const bank = state.banks.find(b => b.id === bankId);
        if (!bank) return;

        if (iStr === '') bank.caixinhas.push({ id: 'cx' + Date.now(), nome, valor });
        else bank.caixinhas[parseInt(iStr)] = { ...bank.caixinhas[parseInt(iStr)], nome, valor };

        document.getElementById('caixinhaModal').classList.remove('open');
        renderAll();
    });

    // SUBMIT BANCO
    document.getElementById('bankForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('bankName').value.trim();
        if (!name) return;
        state.banks.push({ id: 'b' + Date.now(), name, color: getBankColor(name), caixinhas: [] });
        document.getElementById('bankModal').classList.remove('open');
        renderAll();
    });

    // SUBMIT CARTÃO (cor automática)
    document.getElementById('cardForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('cardName').value.trim();
        if (!name) return;
        state.cards.push({
            id: 'c' + Date.now(),
            name,
            color: getCardColor(name)
        });
        document.getElementById('cardModal').classList.remove('open');
        renderAll();
    });

    // SUBMIT ASSINATURA (cor automática)
    document.getElementById('subscriptionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('subscriptionEditId').value;
        const name = document.getElementById('subscriptionName').value.trim();
        if (!name) return;

        if (editId) {
            const sub = state.subscriptions.find(x => x.id === editId);
            if (sub) {
                sub.name = name;
                sub.color = getStreamColor(name);
            }
        } else {
            state.subscriptions.push({
                id: 's' + Date.now(),
                name,
                color: getStreamColor(name)
            });
        }
        document.getElementById('subscriptionModal').classList.remove('open');
        renderAll();
    });

    // SUBMIT DEVEDOR
    document.getElementById('debtorForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('debtorName').value.trim();
        if (!name) return;
        if (!state.debtors.includes(name)) state.debtors.push(name);
        document.getElementById('debtorModal').classList.remove('open');
        renderAll();
    });
});