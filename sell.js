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
      ['.999 / 24k', 0.999, 'Rent gull'],
      ['22k / 916', 0.916, 'Høy renhet'],
      ['21k / 875', 0.875, 'Vanlig i enkelte smykker'],
      ['18k / 750', 0.750, 'Eksklusive smykker'],
      ['14k / 585', 0.585, 'Vanlig smykkegull'],
      ['9k / 375', 0.375, 'Lavere karat'],
      ['8k / 333', 0.333, 'Laveste relevante valg'],
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
      ['999', 0.999],
      ['925', 0.925, 'Sterling sølv'],
      ['835', 0.835],
      ['830', 0.830, 'Norsk sølvbestikk'],
      ['800', 0.800],
      ['500 / eldre norske mynter', 0.500],
      ['400 / enkelte eldre mynter', 0.400],
      ['Jeg er usikker', null]
    ]
  }
};

const SELL_PAGE_CONFIG = {
  gold: {
    defaultMetal: 'gold',
    pagePath: '/selg-gull',
    heroEyebrow: '',
    heroTitle: 'Selg gull trygt og enkelt',
    heroDesc: 'Du kan legge inn karat og cirka-vekt for å få et veiledende estimat på en behagelig måte. Vurderingen er uforpliktende, prosessen er trygg, og henting kan avtales ved behov.',
    primaryCta: 'Beregn pris',
    note: '',
    panelTitle: 'Kort fortalt',
    panelText: 'Velg karat og gram. Vi hjelper deg med resten.',
    journey: [
      'Velg karat',
      'Se estimat',
      'Send forespørsel'
    ],
    trust: [],
    itemsTitle: 'Hva slags gull kan du selge?',
    itemsDesc: 'Velg nærmeste type i kalkulatoren. Usikker går også fint.',
    items: ['Ringer', 'Kjeder', 'Armbånd', 'Øredobber', 'Ødelagte smykker', 'Arvegull', 'Gullmynter', 'Gull uten sertifikat'],
    pickupTitle: 'Gratis hjemmehenting i Oslo, Akershus og Østfold',
    pickupText: 'Henting kan avtales hvis du ønsker en enklere vurdering hjemmefra.',
    pickupNote: 'Avtales etter område, tidspunkt og mengde.'
  },
  silver: {
    defaultMetal: 'silver',
    pagePath: '/selg-solv',
    heroEyebrow: '',
    heroTitle: 'Selg sølv og sølvbestikk enkelt',
    heroDesc: 'Du kan legge inn sølvtype og cirka-vekt for å få et veiledende estimat på en behagelig måte. Vurderingen er uforpliktende, prosessen er trygg, og henting kan avtales ved behov.',
    primaryCta: 'Beregn pris',
    note: '',
    panelTitle: 'Kort fortalt',
    panelText: 'Velg sølvtype og gram. Vi hjelper deg med resten.',
    journey: [
      'Velg sølvtype',
      'Se estimat',
      'Send forespørsel'
    ],
    trust: [],
    itemsTitle: 'Hva slags sølv kan du selge?',
    itemsDesc: 'Velg nærmeste type i kalkulatoren. Usikker går også fint.',
    items: ['Sølvbestikk', 'Sølvtøy', 'Sølvfat', 'Lysestaker', 'Smykker', 'Sølvmynter', 'Eldre norske mynter', 'Arvesølv'],
    pickupTitle: 'Gratis hjemmehenting i Oslo, Akershus og Østfold',
    pickupText: 'Henting kan avtales hvis du ønsker en enklere vurdering hjemmefra.',
    pickupNote: 'Avtales etter område, tidspunkt og mengde.'
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
  estimatedPrice: null,
  contact: {
    name: '',
    phone: '',
    email: '',
    message: ''
  }
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

function openInquiryEmail() {
  const metal = activeMetal();
  const type = calculatorState.typeLabel || 'Ikke valgt';
  const weight = calculatorState.unknownWeight ? 'Vet ikke' : (calculatorState.weight ? calculatorState.weight + ' g' : 'Ikke oppgitt');
  const estimate = calculatorState.estimatedPrice ? kr(calculatorState.estimatedPrice) : 'Ikke beregnet';
  const contact = calculatorState.contact;
  const lines = [
    'Side: ' + metal.pagePath,
    'Metall: ' + metal.label,
    'Type: ' + type,
    'Vekt: ' + weight,
    'Estimert pris: ' + estimate,
    '',
    'Kontakt:',
    'Navn: ' + (contact.name || 'Ikke oppgitt'),
    'Telefon: ' + (contact.phone || 'Ikke oppgitt'),
    'E-post: ' + (contact.email || 'Ikke oppgitt'),
    '',
    'Melding:',
    contact.message || 'Ingen ekstra melding.'
  ];

  window.location.href = mailtoHref(metal.emailSubject, lines.join('\n'));
}

function SellHero(config) {
  return `
    <section class="sell-hero">
      <div class="sell-hero-inner">
        <div>
          ${config.heroEyebrow ? `<div class="hero-eyebrow">${esc(config.heroEyebrow)}</div>` : ''}
          <h1 class="hero-title">${esc(config.heroTitle)}</h1>
          <p class="hero-desc">${esc(config.heroDesc)}</p>
          <div class="hero-actions">
            <a class="btn ${config.defaultMetal === 'gold' ? 'btn-gold' : 'btn-silver'}" href="#kalkulator">${esc(config.primaryCta)}</a>
            <a class="btn ${config.defaultMetal === 'gold' ? 'btn-silver' : 'btn-gold'}" href="${config.defaultMetal === 'gold' ? '../selg-solv/' : '../selg-gull/'}">${config.defaultMetal === 'gold' ? 'Selg sølv' : 'Selg gull'}</a>
          </div>
          ${config.note ? `<p class="hero-note">${esc(config.note)}</p>` : ''}
          ${TrustBadges(config)}
        </div>
        <aside class="hero-panel">
          <h2 class="hero-panel-title">${esc(config.panelTitle)}</h2>
          <p>${esc(config.panelText)}</p>
          <ol class="hero-journey" aria-label="Kort prosess">
            ${config.journey.map((item) => `<li>${esc(item)}</li>`).join('')}
          </ol>
        </aside>
      </div>
    </section>
  `;
}

function TrustBadges(config) {
  if (!config.trust.length) return '';
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
        <div class="section-label">Gratis hjemmehenting</div>
        <h2 class="section-title">${esc(config.pickupTitle)}</h2>
        <p class="section-desc">${esc(config.pickupText)}</p>
        <p class="pickup-note">${esc(config.pickupNote)}</p>
      </div>
    </section>
  `;
}

function AfterSubmitSection(config) {
  return `
    <section class="section after-section">
      <div class="section-inner after-inner">
        <div>
          <div class="section-label">Etter innsending</div>
          <h2 class="section-title">Dette skjer etterpå</h2>
        </div>
        <div class="after-steps">
          ${[
            ['Vi leser forespørselen', 'Du får svar så snart vi kan.'],
            ['Vi avtaler kontroll', 'Vekt og renhet bekreftes rolig og tydelig.'],
            ['Du bestemmer selv', 'Vurderingen er uforpliktende.']
          ].map(([title, text]) => `
            <article>
              <h3>${esc(title)}</h3>
              <p>${esc(text)}</p>
            </article>
          `).join('')}
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
        <h2 class="section-title">${config.defaultMetal === 'gold' ? 'Selg gull steg for steg' : 'Selg sølv steg for steg'}</h2>
        <p class="section-desc">Fyll inn det du vet. Estimatet er veiledende, og forespørselen er uforpliktende.</p>
        <div class="calculator" data-calculator>
          <div data-calc-content></div>
        </div>
      </div>
    </section>
  `;
}

function optionButton({ label, text = '', selected = false, metal = '', value = '', action = '', selectedText = 'Valgt' }) {
  return `
    <button class="choice-card ${selected ? 'selected' : ''} ${metal ? 'choice-' + metal : ''}" type="button" data-action="${esc(action)}" data-value="${esc(value)}" aria-pressed="${selected ? 'true' : 'false'}">
      <span>
        <strong>${esc(label)}</strong>
        ${text ? `<small>${esc(text)}</small>` : ''}
      </span>
      ${selected ? `<em>${esc(selectedText)}</em>` : ''}
    </button>
  `;
}

function contactIsReady() {
  const contact = calculatorState.contact;
  return Boolean(contact.name.trim() && (contact.phone.trim() || contact.email.trim()));
}

function StepHeader(number, title, text = '') {
  return `
    <div class="step-head">
      <span class="step-number">${number}</span>
      <div>
        <h3>${esc(title)}</h3>
        ${text ? `<p>${esc(text)}</p>` : ''}
      </div>
    </div>
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
  const canSend = contactIsReady();
  const selectedTypeText = calculatorState.typeLabel ? `${metal.label}: ${calculatorState.typeLabel}` : 'Ikke valgt';
  const weightText = calculatorState.unknownWeight ? 'Usikker vekt' : (calculatorState.weight ? `${calculatorState.weight} g` : 'Ikke oppgitt');

  host.innerHTML = `
    <div class="calc-flow">
      <div class="calc-block step-card">
        ${StepHeader(1, 'Velg metall', 'Sidens metall er forhåndsvalgt, men du kan bytte her.')}
        <div class="choice-grid">
          ${optionButton({ label: 'Gull', text: METAL_OPTIONS.gold.shortText, selected: calculatorState.metal === 'gold', metal: 'gold', value: 'gold', action: 'metal', selectedText: METAL_OPTIONS.gold.selectedLabel })}
          ${optionButton({ label: 'Sølv', text: METAL_OPTIONS.silver.shortText, selected: calculatorState.metal === 'silver', metal: 'silver', value: 'silver', action: 'metal', selectedText: METAL_OPTIONS.silver.selectedLabel })}
        </div>
      </div>

      <div class="calc-block step-card">
        ${StepHeader(2, metal.typeLabel, 'Velg høyeste renhet som stemmer med det du har.')}
        <div class="type-grid">
          ${metal.types.map(([label, value, text]) => optionButton({
            label,
            text,
            selected: calculatorState.typeLabel === label,
            metal: metal.accent,
            value: label,
            action: 'type',
            selectedText: 'Valgt'
          })).join('')}
        </div>
        ${unknownType ? `<p class="calc-help">${esc(metal.uncertainText)}</p>` : ''}
      </div>

      <div class="calc-block step-card">
        ${StepHeader(3, 'Legg inn gram', metal.weightText)}
        <div class="field">
          <label for="calc-weight">Skriv vekt i gram</label>
          <div class="weight-control">
            <button type="button" data-action="weight-adjust" data-value="-10" aria-label="Trekk fra 10 gram">−</button>
            <input id="calc-weight" data-calc-weight type="number" min="0" max="99999" step="1" inputmode="decimal" placeholder="f.eks. 120" value="${esc(calculatorState.weight)}">
            <button type="button" data-action="weight-adjust" data-value="10" aria-label="Legg til 10 gram">+</button>
          </div>
        </div>
        <div class="quick-weight" aria-label="Hurtigvalg for gram">
          <button type="button" data-action="weight-adjust" data-value="10">+10g</button>
          <button type="button" data-action="weight-adjust" data-value="50">+50g</button>
          <button type="button" data-action="weight-adjust" data-value="100">+100g</button>
          <button type="button" data-action="weight-clear">Nullstill</button>
        </div>
        <button class="text-button" type="button" data-action="unknown-weight">Jeg vet ikke vekten</button>
      </div>

      <div class="calc-block step-card estimate-step">
        ${StepHeader(4, 'Se estimert verdi', 'Verdien oppdateres automatisk når type og gram er valgt.')}
        <div class="calc-result ${metal.accent === 'silver' ? 'result-silver' : ''}">
          <div class="calc-label">${needsHelp ? 'Vi hjelper deg' : 'Estimert verdi'}</div>
          <div data-calc-result-live>
          ${canShowPrice ? `
            <div class="calc-value">Ca. ${kr(calculatorState.estimatedPrice)}</div>
            <p class="calc-status">${esc(metal.resultText)}</p>
          ` : `
            <p class="calc-status">${esc(calculatorState.unknownWeight || unknownType ? 'Send forespørsel, så hjelper vi deg med type og vekt.' : 'Velg type og skriv cirka-vekt for å se estimert verdi.')}</p>
          `}
          </div>
        </div>
      </div>

      <div class="calc-block step-card">
        ${StepHeader(5, 'Kontaktinformasjon', 'Legg igjen navn og minst telefon eller e-post.')}
        <div class="contact-grid">
          <div class="field">
            <label for="contact-name">Navn</label>
            <input id="contact-name" data-contact-field="name" type="text" autocomplete="name" value="${esc(calculatorState.contact.name)}">
          </div>
          <div class="field">
            <label for="contact-phone">Telefon</label>
            <input id="contact-phone" data-contact-field="phone" type="tel" autocomplete="tel" value="${esc(calculatorState.contact.phone)}">
          </div>
          <div class="field">
            <label for="contact-email">E-post</label>
            <input id="contact-email" data-contact-field="email" type="email" autocomplete="email" value="${esc(calculatorState.contact.email)}">
          </div>
          <div class="field field-wide">
            <label for="contact-message">Kort melding</label>
            <textarea id="contact-message" data-contact-field="message" rows="3" placeholder="F.eks. ringer, arvegull eller sølvbestikk">${esc(calculatorState.contact.message)}</textarea>
          </div>
        </div>
      </div>

      <div class="submit-panel ${metal.accent === 'silver' ? 'submit-silver' : ''}">
        ${StepHeader(6, 'Send forespørsel', 'Vi åpner en ferdig utfylt e-post med opplysningene dine.')}
        <div class="summary-grid" aria-label="Oppsummering">
          <span><strong>Type</strong><em data-summary-type>${esc(selectedTypeText)}</em></span>
          <span><strong>Gram</strong><em data-summary-weight>${esc(weightText)}</em></span>
          <span><strong>Estimat</strong><em data-summary-estimate>${canShowPrice ? esc(kr(calculatorState.estimatedPrice)) : 'Ikke beregnet'}</em></span>
        </div>
        <div class="calc-actions">
          <button class="btn btn-dark" type="button" data-action="email" ${canSend ? '' : 'disabled'}>${canSend ? 'Send forespørsel' : 'Fyll inn kontaktinfo'}</button>
          <a class="btn btn-soft" href="tel:+4747996251">Ring oss</a>
        </div>
        <p class="calc-status" data-submit-help>${canSend ? 'Forespørselen er uforpliktende.' : 'Navn og telefon eller e-post må fylles inn før sending.'}</p>
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
      if (action === 'weight-adjust') {
        adjustWeight(Number(el.dataset.value) || 0);
        renderCalculator();
        return;
      }
      if (action === 'weight-clear') {
        calculatorState.unknownWeight = false;
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
      updateSummary();
    });
  }

  document.querySelectorAll('[data-contact-field]').forEach((field) => {
    field.addEventListener('input', () => {
      calculatorState.contact[field.dataset.contactField] = field.value;
      updateSubmitState();
    });
  });
}

function adjustWeight(delta) {
  const nextWeight = Math.max(0, parseWeight() + delta);
  calculatorState.unknownWeight = false;
  calculatorState.weight = nextWeight ? String(nextWeight) : '';
  calculateEstimatedPrice();
}

function updateCalculatorResult() {
  const result = document.querySelector('[data-calc-result-live]');
  const label = document.querySelector('.calc-result .calc-label');
  if (!result || !label) return;
  const metal = activeMetal();
  const estimate = calculateEstimatedPrice();
  const unknownType = calculatorState.typeLabel === 'Jeg er usikker';
  const needsHelp = calculatorState.unknownWeight || unknownType || !calculatorState.typeLabel;
  label.textContent = needsHelp ? 'Vi hjelper deg' : 'Estimert verdi';
  result.innerHTML = estimate !== null
    ? `<div class="calc-value">Ca. ${kr(estimate)}</div><p class="calc-status">${esc(metal.resultText)}</p>`
    : `<p class="calc-status">${esc(calculatorState.unknownWeight || unknownType ? 'Send forespørsel, så hjelper vi deg med type og vekt.' : 'Velg type og skriv cirka-vekt for å se estimert verdi.')}</p>`;
  updateSubmitState();
  updateSummary();
}

function updateSubmitState() {
  const button = document.querySelector('[data-action="email"]');
  const help = document.querySelector('[data-submit-help]');
  if (!button || !help) return;
  const ready = contactIsReady();
  button.disabled = !ready;
  button.textContent = ready ? 'Send forespørsel' : 'Fyll inn kontaktinfo';
  help.textContent = ready ? 'Forespørselen er uforpliktende.' : 'Navn og telefon eller e-post må fylles inn før sending.';
}

function updateSummary() {
  const type = document.querySelector('[data-summary-type]');
  const weight = document.querySelector('[data-summary-weight]');
  const estimate = document.querySelector('[data-summary-estimate]');
  if (!type || !weight || !estimate) return;
  type.textContent = calculatorState.typeLabel ? `${activeMetal().label}: ${calculatorState.typeLabel}` : 'Ikke valgt';
  weight.textContent = calculatorState.unknownWeight ? 'Usikker vekt' : (calculatorState.weight ? `${calculatorState.weight} g` : 'Ikke oppgitt');
  estimate.textContent = calculatorState.estimatedPrice ? kr(calculatorState.estimatedPrice) : 'Ikke beregnet';
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
    ['Må jeg vite vekt før jeg tar kontakt?', 'Nei. Du kan sende forespørsel selv om du ikke vet nøyaktig vekt. Vi hjelper deg videre.'],
    ['Må jeg vite karat eller sølvtype?', 'Nei. Velg “Jeg er usikker” eller skriv kort hva du har, så hjelper vi deg.'],
    ['Kan dere hente hjemme hos meg?', 'Ja, henting kan avtales i Oslo, Akershus og Østfold.'],
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
}

function renderSellPage() {
  const metal = document.body.dataset.metal === 'silver' ? 'silver' : 'gold';
  const config = SELL_PAGE_CONFIG[metal];
  const root = document.getElementById('sell-page-root');
  if (!root) return;

  root.innerHTML = [
    SellHero(config),
    MetalCalculator(config),
    AfterSubmitSection(config),
    PickupAreaSection(config),
    MetalItemsSection(config),
    FAQSection()
  ].join('');

  initCalculator(config);
  bindPageActions();
}

document.addEventListener('DOMContentLoaded', renderSellPage);
