const GOLD_BUY_RATE = 0.80;
const SILVER_BUY_RATE = 0.65;

const METAL_OPTIONS = {
  gold: {
    label: 'Gull',
    selectedLabel: 'Gull valgt',
    shortText: 'Smykker, ringer, arvegull',
    accent: 'gold',
    typeLabel: 'Velg type gull',
    uncertainText: 'Det går fint. Ta kontakt, så hjelper vi deg å finne riktig type.',
    weightText: 'Du kan skrive cirka-vekt hvis du er usikker.',
    resultText: 'Dette er et veiledende estimat. Endelig pris bekreftes etter kontroll av vekt og renhet.',
    emailSubject: 'Ny forespørsel: Selg gull',
    pagePath: '/selg-gull',
    fallbackNokOz: 36500,
    buyRate: GOLD_BUY_RATE,
    types: [
      ['8k / 333', 0.333],
      ['9k / 375', 0.375],
      ['14k / 585', 0.585],
      ['18k / 750', 0.750],
      ['21k / 875', 0.875],
      ['22k / 916', 0.916],
      ['24k / 999', 0.999],
      ['Jeg er usikker', null]
    ]
  },
  silver: {
    label: 'Sølv',
    selectedLabel: 'Sølv valgt',
    shortText: 'Bestikk, sølvtøy, mynter',
    accent: 'silver',
    typeLabel: 'Velg type sølv',
    uncertainText: 'Det går fint. Ta kontakt, så hjelper vi deg å finne riktig type.',
    weightText: 'Du kan skrive cirka-vekt hvis du er usikker.',
    resultText: 'Dette er et veiledende estimat. Endelig pris bekreftes etter kontroll av vekt og sølvtype.',
    emailSubject: 'Ny forespørsel: Selg sølv',
    pagePath: '/selg-solv',
    fallbackNokOz: 420,
    buyRate: SILVER_BUY_RATE,
    types: [
      ['830S', 0.830],
      ['925S', 0.925],
      ['999', 0.999],
      ['Jeg er usikker', null]
    ]
  }
};

const SELL_PAGE_CONFIG = {
  gold: {
    defaultMetal: 'gold',
    pagePath: '/selg-gull',
    heroEyebrow: 'Selg gull og sølv hos Sherwani',
    heroTitle: 'Selg gull trygt og enkelt',
    heroDesc: 'Har du gullsmykker, ringer, kjeder eller arvegull? Få en enkel og uforpliktende vurdering hos Sherwani Gull & Sølv.',
    primaryCta: 'Beregn pris',
    note: 'Du trenger ikke vite nøyaktig vekt eller type. Velg gull eller sølv, så hjelper vi deg videre.',
    panelTitle: 'Slik kommer du i gang',
    panelText: 'Se cirka-pris, send e-post eller ring oss direkte. Enkelt og uforpliktende.',
    trust: [
      'Uforpliktende vurdering',
      'Vi kjøper gull og sølv',
      'Gratis henting kan avtales',
      'Du bestemmer selv'
    ],
    itemsTitle: 'Hva slags gull kan du selge?',
    itemsDesc: 'Du kan sende forespørsel selv om du er usikker på karat, vekt eller tilstand.',
    items: ['Ringer', 'Kjeder', 'Armbånd', 'Øredobber', 'Ødelagte smykker', 'Arvegull', 'Gullmynter', 'Gull uten sertifikat'],
    pickupTitle: 'Gratis henting i Oslo, Akershus og Østfold',
    pickupText: 'Vi kan etter avtale tilby gratis henting i Oslo, Akershus og Østfold. Dette passer godt hvis du har flere gjenstander, sølvbestikk, arvegull eller ønsker en enklere prosess hjemmefra.',
    pickupNote: 'Henting avtales individuelt og avhenger av område, tidspunkt og mengde.'
  },
  silver: {
    defaultMetal: 'silver',
    pagePath: '/selg-solv',
    heroEyebrow: 'Selg gull og sølv hos Sherwani',
    heroTitle: 'Selg sølv trygt og enkelt',
    heroDesc: 'Har du sølvbestikk, sølvtøy, sølvmynter eller sølvsmykker? Få en enkel og uforpliktende vurdering hos Sherwani Gull & Sølv.',
    primaryCta: 'Beregn pris',
    note: 'Du trenger ikke vite nøyaktig vekt eller type. Velg gull eller sølv, så hjelper vi deg videre.',
    panelTitle: 'Slik kommer du i gang',
    panelText: 'Se cirka-pris, send e-post eller ring oss direkte. Enkelt og uforpliktende.',
    trust: [
      'Uforpliktende vurdering',
      'Vi kjøper gull og sølv',
      'Gratis henting kan avtales',
      'Du bestemmer selv'
    ],
    itemsTitle: 'Hva slags sølv kan du selge?',
    itemsDesc: 'Du kan sende forespørsel selv om sølvet er brukt, gravert, ufullstendig eller upusset.',
    items: ['Sølvbestikk', 'Sølvtøy', 'Sølvfat', 'Lysestaker', 'Smykker', 'Sølvmynter', 'Arvesølv', 'Ufullstendige sett'],
    pickupTitle: 'Gratis henting i Oslo, Akershus og Østfold',
    pickupText: 'Har du større mengder sølvbestikk, sølvtøy eller arvesølv, kan gratis henting være en enkel løsning. Vi kan etter avtale hente i Oslo, Akershus og Østfold.',
    pickupNote: 'Henting avtales individuelt og avhenger av område, tidspunkt og mengde.'
  }
};

const PRICE_CONFIG = {
  timeoutMs: 10000
};

const calculatorState = {
  metal: 'gold',
  typeLabel: '',
  fineness: null,
  weight: '',
  unknownWeight: false,
  priceNokOz: {
    gold: METAL_OPTIONS.gold.fallbackNokOz,
    silver: METAL_OPTIONS.silver.fallbackNokOz
  },
  estimatedPrice: null
};

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function kr(value) {
  return Math.round(Number(value || 0)).toLocaleString('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0
  });
}

function activeMetal() {
  return METAL_OPTIONS[calculatorState.metal];
}

function scrollToCalculator() {
  document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mailtoHref(subject, body = '') {
  return 'mailto:post@sherwanigull.no?subject=' + encodeURIComponent(subject) + (body ? '&body=' + encodeURIComponent(body) : '');
}

function openInquiryEmail(options = {}) {
  const metal = activeMetal();
  const type = calculatorState.typeLabel || 'Ikke valgt';
  const weight = calculatorState.unknownWeight ? 'Vet ikke' : (calculatorState.weight ? calculatorState.weight + ' g' : 'Ikke oppgitt');
  const estimate = calculatorState.estimatedPrice ? kr(calculatorState.estimatedPrice) : 'Ikke beregnet';
  const lines = [
    'Side: ' + metal.pagePath,
    'Metall: ' + metal.label,
    'Type: ' + type,
    'Vekt: ' + weight,
    'Estimert pris: ' + estimate
  ];

  if (options.pickup) {
    lines.push('Ønske: Gratis henting hvis mulig');
  }

  lines.push('', 'Skriv gjerne navn, telefon og litt om hva du ønsker å selge.');
  window.location.href = mailtoHref(metal.emailSubject, lines.join('\n'));
}

function SellHero(config) {
  return `
    <section class="sell-hero">
      <div class="sell-hero-inner">
        <div>
          <div class="hero-eyebrow">${esc(config.heroEyebrow)}</div>
          <h1 class="hero-title">${esc(config.heroTitle)}</h1>
          <p class="hero-desc">${esc(config.heroDesc)}</p>
          <div class="hero-actions">
            <a class="btn ${config.defaultMetal === 'gold' ? 'btn-gold' : 'btn-silver'}" href="#kalkulator">${esc(config.primaryCta)}</a>
            <a class="btn ${config.defaultMetal === 'gold' ? 'btn-silver' : 'btn-gold'}" href="${config.defaultMetal === 'gold' ? '../selg-solv/' : '../selg-gull/'}">${config.defaultMetal === 'gold' ? 'Selg sølv' : 'Selg gull'}</a>
          </div>
          <p class="hero-note">${esc(config.note)}</p>
          ${TrustBadges(config)}
        </div>
        <aside class="hero-panel">
          <h2 class="hero-panel-title">${esc(config.panelTitle)}</h2>
          <p>${esc(config.panelText)}</p>
          <div class="quick-links" aria-label="Hurtigvalg">
            <a href="#kalkulator">Beregn pris</a>
            <a href="${mailtoHref(METAL_OPTIONS[config.defaultMetal].emailSubject)}">Send e-post</a>
            <a href="#henting">Gratis henting</a>
            <a href="tel:+4747996251">Ring oss</a>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function TrustBadges(config) {
  return `<div class="trust-grid">${config.trust.map((item) => `<div class="trust-badge">${esc(item)}</div>`).join('')}</div>`;
}

function MetalItemsSection(config) {
  return `
    <section class="section" id="hva-kan-du-selge">
      <div class="section-inner">
        <div class="section-label">Dette kan du selge</div>
        <h2 class="section-title">${esc(config.itemsTitle)}</h2>
        <p class="section-desc">${esc(config.itemsDesc)}</p>
        <div class="chip-grid">${config.items.map((item) => `<span class="chip">${esc(item)}</span>`).join('')}</div>
      </div>
    </section>
  `;
}

function PickupAreaSection(config) {
  return `
    <section class="section pickup-section" id="henting">
      <div class="section-inner">
        <div class="section-label">Gratis henting</div>
        <h2 class="section-title">${esc(config.pickupTitle)}</h2>
        <p class="section-desc">${esc(config.pickupText)}</p>
        <p class="pickup-note">${esc(config.pickupNote)}</p>
        <div class="pickup-action">
          <button class="btn btn-soft" type="button" data-pickup-request>Spør om gratis henting</button>
        </div>
      </div>
    </section>
  `;
}

function MetalCalculator(config) {
  return `
    <section class="section" id="kalkulator">
      <div class="section-inner">
        <div class="section-label">Beregn pris</div>
        <h2 class="section-title">Se cirka-pris raskt</h2>
        <p class="section-desc">Velg gull eller sølv. Vet du ikke vekt eller type, kan du gå rett til kontakt.</p>
        <div class="calculator" data-calculator>
          <div data-calc-content></div>
        </div>
      </div>
    </section>
  `;
}

function optionButton({ label, text = '', selected = false, metal = '', value = '', action = '' }) {
  return `
    <button class="choice-card ${selected ? 'selected' : ''} ${metal ? 'choice-' + metal : ''}" type="button" data-action="${esc(action)}" data-value="${esc(value)}">
      <span>
        <strong>${esc(label)}</strong>
        ${text ? `<small>${esc(text)}</small>` : ''}
      </span>
      ${selected ? `<em>${esc(activeMetal().selectedLabel)}</em>` : ''}
    </button>
  `;
}

function renderCalculator() {
  const host = document.querySelector('[data-calc-content]');
  if (!host) return;

  const metal = activeMetal();
  const estimate = calculateEstimatedPrice();
  const canShowPrice = estimate !== null;
  const unknownType = calculatorState.typeLabel === 'Jeg er usikker';
  const needsHelp = calculatorState.unknownWeight || unknownType || !calculatorState.typeLabel;

  host.innerHTML = `
    <div class="calc-simple">
      <div class="calc-block">
        <div class="calc-mini-label">1. Hva vil du selge?</div>
        <div class="choice-grid">
          ${optionButton({ label: 'Gull', text: METAL_OPTIONS.gold.shortText, selected: calculatorState.metal === 'gold', metal: 'gold', value: 'gold', action: 'metal' })}
          ${optionButton({ label: 'Sølv', text: METAL_OPTIONS.silver.shortText, selected: calculatorState.metal === 'silver', metal: 'silver', value: 'silver', action: 'metal' })}
        </div>
      </div>
      <div class="calc-block">
        <div class="calc-mini-label">2. Velg type</div>
        <div class="type-grid">
          ${metal.types.map(([label, value]) => optionButton({
            label,
            selected: calculatorState.typeLabel === label,
            metal: metal.accent,
            value: label,
            action: 'type'
          })).join('')}
        </div>
        ${unknownType ? `<p class="calc-help">${esc(metal.uncertainText)}</p>` : ''}
      </div>
      <div class="calc-block">
        <div class="calc-mini-label">3. Vekt</div>
        <div class="field">
          <label for="calc-weight">Skriv vekt i gram</label>
          <input id="calc-weight" data-calc-weight type="number" min="0" max="99999" step="1" inputmode="numeric" placeholder="f.eks. 12000" value="${esc(calculatorState.weight)}">
        </div>
        <p class="calc-help">${esc(metal.weightText)}</p>
        <button class="text-button" type="button" data-action="unknown-weight">Jeg vet ikke vekten</button>
      </div>
      <div class="calc-result ${metal.accent === 'silver' ? 'result-silver' : ''}">
        <div class="calc-label">${needsHelp ? 'Vi hjelper deg' : 'Din estimerte pris'}</div>
        <div data-calc-result-live>
        ${canShowPrice ? `
          <div class="calc-value">Ca. ${kr(calculatorState.estimatedPrice)}</div>
          <p class="calc-status">${esc(metal.resultText)}</p>
        ` : `
          <p class="calc-status">${esc(calculatorState.unknownWeight || unknownType ? 'Send gjerne e-post, så hjelper vi deg med type og vekt.' : 'Velg type og skriv cirka-vekt for å se pris, eller send e-post med en gang.')}</p>
        `}
        </div>
        <div class="calc-actions">
          <button class="btn btn-dark" type="button" data-action="email">Send e-post</button>
          <a class="btn btn-soft" href="tel:+4747996251">Ring oss</a>
        </div>
        <button class="text-button" type="button" data-action="email">Usikker? Send e-post, så hjelper vi deg.</button>
      </div>
    </div>
  `;

  bindCalculator();
}

function bindCalculator() {
  document.querySelectorAll('[data-action]').forEach((el) => {
    el.addEventListener('click', () => {
      const action = el.dataset.action;
      if (action === 'metal') {
        calculatorState.metal = el.dataset.value === 'silver' ? 'silver' : 'gold';
        calculatorState.typeLabel = '';
        calculatorState.fineness = null;
        calculatorState.estimatedPrice = null;
        renderCalculator();
        return;
      }
      if (action === 'type') {
        const label = el.dataset.value;
        const item = activeMetal().types.find(([optionLabel]) => optionLabel === label);
        calculatorState.typeLabel = label;
        calculatorState.fineness = item ? item[1] : null;
        calculatorState.estimatedPrice = null;
        renderCalculator();
        return;
      }
      if (action === 'unknown-weight') {
        calculatorState.unknownWeight = true;
        calculatorState.weight = '';
        calculatorState.estimatedPrice = null;
        renderCalculator();
        return;
      }
      if (action === 'email') {
        openInquiryEmail();
      }
    });
  });

  const weightInput = document.querySelector('[data-calc-weight]');
  if (weightInput) {
    weightInput.addEventListener('input', () => {
      calculatorState.weight = weightInput.value;
      calculatorState.unknownWeight = false;
      calculateEstimatedPrice();
      updateCalculatorResult();
    });
  }
}

function updateCalculatorResult() {
  const result = document.querySelector('[data-calc-result-live]');
  const label = document.querySelector('.calc-result .calc-label');
  if (!result || !label) return;
  const metal = activeMetal();
  const estimate = calculateEstimatedPrice();
  const unknownType = calculatorState.typeLabel === 'Jeg er usikker';
  const needsHelp = calculatorState.unknownWeight || unknownType || !calculatorState.typeLabel;
  label.textContent = needsHelp ? 'Vi hjelper deg' : 'Din estimerte pris';
  result.innerHTML = estimate !== null
    ? `<div class="calc-value">Ca. ${kr(estimate)}</div><p class="calc-status">${esc(metal.resultText)}</p>`
    : `<p class="calc-status">${esc(calculatorState.unknownWeight || unknownType ? 'Send gjerne e-post, så hjelper vi deg med type og vekt.' : 'Velg type og skriv cirka-vekt for å se pris, eller send e-post med en gang.')}</p>`;
}

function parseWeight() {
  return Math.max(0, Number(String(calculatorState.weight).replace(',', '.')) || 0);
}

function calculateEstimatedPrice() {
  const metal = activeMetal();
  const grams = parseWeight();
  if (!grams || !calculatorState.fineness) {
    calculatorState.estimatedPrice = null;
    return null;
  }
  const pricePerGramPure = calculatorState.priceNokOz[calculatorState.metal] / 31.1035;
  const internalValue = grams * pricePerGramPure * calculatorState.fineness;
  calculatorState.estimatedPrice = internalValue * metal.buyRate;
  return calculatorState.estimatedPrice;
}

function FAQSection() {
  const faq = [
    ['Kjøper dere både gull og sølv?', 'Ja. Vi kjøper både gull og sølv, inkludert smykker, arvegull, sølvbestikk, sølvtøy og mynter.'],
    ['Må jeg vite vekt før jeg tar kontakt?', 'Nei. Du kan sende forespørsel selv om du ikke vet nøyaktig vekt. Vi hjelper deg videre.'],
    ['Må jeg vite karat eller sølvtype?', 'Nei. Velg “Jeg er usikker” eller skriv kort hva du har, så hjelper vi deg.'],
    ['Kan jeg sende forespørsel uten å være sikker?', 'Ja. Forespørselen er uforpliktende, og du bestemmer selv om du ønsker å selge.'],
    ['Kan dere hente hjemme hos meg?', 'Ja, gratis henting kan avtales i Oslo, Akershus og Østfold der det passer.'],
    ['Kjøper dere ødelagte smykker?', 'Ja, ødelagte smykker kan også vurderes.'],
    ['Kjøper dere sølvbestikk og sølvtøy?', 'Ja, vi vurderer både sølvbestikk, sølvtøy, mynter og arvesølv.'],
    ['Når får jeg svar?', 'Vi tar kontakt så snart vi kan etter at forespørselen er sendt.']
  ];
  return `
    <section class="section" id="faq">
      <div class="section-inner">
        <div class="section-label">Spørsmål og svar</div>
        <h2 class="section-title">Ofte stilte spørsmål</h2>
        <div class="faq-list">
          ${faq.map(([question, answer]) => `
            <details class="faq-item">
              <summary>${esc(question)}</summary>
              <p>${esc(answer)}</p>
            </details>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

async function timedFetch(url) {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), PRICE_CONFIG.timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store' });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } finally {
    clearTimeout(tid);
  }
}

async function fetchMetalPrices() {
  const [xau, xag, fx] = await Promise.all([
    timedFetch('https://api.gold-api.com/price/XAU'),
    timedFetch('https://api.gold-api.com/price/XAG'),
    timedFetch('https://open.er-api.com/v6/latest/USD')
  ]);
  const nokRate = fx?.rates?.NOK;
  if (!xau?.price || !xag?.price || !nokRate) throw new Error('Mangler prisdata');
  return { gold: xau.price * nokRate, silver: xag.price * nokRate };
}

function initCalculator(config) {
  calculatorState.metal = config.defaultMetal;
  calculatorState.typeLabel = '';
  calculatorState.fineness = null;
  calculatorState.weight = '';
  calculatorState.unknownWeight = false;
  calculatorState.estimatedPrice = null;
  renderCalculator();
  fetchMetalPrices().then((prices) => {
    calculatorState.priceNokOz.gold = prices.gold;
    calculatorState.priceNokOz.silver = prices.silver;
    renderCalculator();
  }).catch(() => {
    renderCalculator();
  });
}

function bindPageActions() {
  document.querySelectorAll('[data-scroll-calc]').forEach((button) => {
    button.addEventListener('click', scrollToCalculator);
  });
  document.querySelectorAll('[data-pickup-request]').forEach((button) => {
    button.addEventListener('click', () => {
      openInquiryEmail({ pickup: true });
    });
  });
}

function renderSellPage() {
  const metal = document.body.dataset.metal === 'silver' ? 'silver' : 'gold';
  const config = SELL_PAGE_CONFIG[metal];
  const root = document.getElementById('sell-page-root');
  if (!root) return;

  root.innerHTML = [
    SellHero(config),
    MetalCalculator(config),
    PickupAreaSection(config),
    MetalItemsSection(config),
    FAQSection()
  ].join('');

  initCalculator(config);
  bindPageActions();
}

document.addEventListener('DOMContentLoaded', renderSellPage);
