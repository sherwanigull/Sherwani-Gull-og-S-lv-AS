const METAL_OPTIONS = {
  gold: {
    label: 'Gull',
    selectedLabel: 'Gull valgt',
    shortText: 'Smykker, ringer, arvegull',
    accent: 'gold',
    typeLabel: 'Velg type gull',
    uncertainText: 'Det går fint. Ta kontakt, så hjelper vi deg å finne riktig type.',
    weightText: '',
    resultText: 'Dette er et veiledende estimat. Endelig pris bekreftes etter kontroll av vekt og renhet.',
    emailSubject: 'Ny forespørsel: Selg gull',
    pagePath: '/selg-gull',
    fallbackNokOz: 36500,
    types: [
      ['24k / 999', 0.999, 'Rent gull', 0.98],
      ['22k / 916', 0.916, 'Høy renhet', 0.85],
      ['21k / 875', 0.875, 'Vanlig i enkelte smykker', 0.85],
      ['18k / 750', 0.750, 'Eksklusive smykker', 0.85],
      ['14k / 585', 0.585, 'Vanlig smykkegull', 0.85],
      ['9k / 375', 0.375, 'Lavere karat', 0.82],
      ['8k / 333', 0.333, 'Laveste relevante valg', 0.82],
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
    weightText: '',
    resultText: 'Dette er et veiledende estimat. Endelig pris bekreftes etter kontroll av vekt og sølvtype.',
    emailSubject: 'Ny forespørsel: Selg sølv',
    pagePath: '/selg-solv',
    fallbackNokOz: 420,
    types: [
      ['999', 0.999, 'Rent sølv', 1],
      ['925', 0.925, 'Sterling sølv', 0.80],
      ['835', 0.835, '', 0.80],
      ['830', 0.830, 'Norsk sølvbestikk', 0.80],
      ['800', 0.800, '', 0.80],
      ['500 / eldre norske mynter', 0.500, '', 0.80],
      ['400 / enkelte eldre mynter', 0.400, '', 0.80],
      ['Jeg er usikker', null]
    ]
  }
};

const SELL_PAGE_CONFIG = {
  gold: {
    defaultMetal: 'gold',
    pagePath: '/selg-gull',
    heroEyebrow: '',
    heroDesc: '',
    primaryCta: 'Beregn pris på ditt gull',
    note: '',
    trust: [],
    itemsTitle: 'Hva slags gull kan du selge?',
    itemsDesc: 'Velg nærmeste type i kalkulatoren. Usikker går også fint.',
    items: ['Ringer', 'Kjeder', 'Armbånd', 'Øredobber', 'Ødelagte smykker', 'Arvegull', 'Gullmynter', 'Gull uten sertifikat'],
    pickupTitle: 'Hjemmehenting i Oslo, Akershus og Østfold',
    pickupText: 'Henting kan avtales hvis du ønsker en enklere vurdering hjemmefra.',
    pickupNote: 'Avtales etter område, tidspunkt og mengde.'
  },
  silver: {
    defaultMetal: 'silver',
    pagePath: '/selg-solv',
    heroEyebrow: '',
    heroDesc: '',
    primaryCta: 'Beregn pris på ditt sølv',
    note: '',
    trust: [],
    itemsTitle: 'Hva slags sølv kan du selge?',
    itemsDesc: 'Velg nærmeste type i kalkulatoren. Usikker går også fint.',
    items: ['Sølvbestikk', 'Sølvtøy', 'Sølvfat', 'Lysestaker', 'Smykker', 'Sølvmynter', 'Eldre norske mynter', 'Arvesølv'],
    pickupTitle: 'Hjemmehenting i Oslo, Akershus og Østfold',
    pickupText: 'Henting kan avtales hvis du ønsker en enklere vurdering hjemmefra.',
    pickupNote: 'Avtales etter område, tidspunkt og mengde.'
  }
};

const PRICE_CONFIG = {
  timeoutMs: 10000
};

const SUPABASE_CONFIG = {
  url: 'https://sbsxckncemyonvidinup.supabase.co',
  anonKey: 'sb_publishable_oW8DcDM2Rhym-PLyH84pig_evX2rWoA',
  inquiriesTable: 'foresporsler',
  timeoutMs: 12000
};

const calculatorState = {
  metal: 'gold',
  typeLabel: '',
  fineness: null,
  typeBuyRate: null,
  weight: '',
  unknownWeight: false,
  priceNokOz: {
    gold: METAL_OPTIONS.gold.fallbackNokOz,
    silver: METAL_OPTIONS.silver.fallbackNokOz
  },
  pricesLive: false,
  estimatedPrice: null,
  contact: {
    name: '',
    phone: '',
    email: '',
    message: ''
  },
  submitStatus: 'idle',
  submitMessage: ''
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

function krGram(value) {
  return Number(value || 0).toLocaleString('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function activeMetal() {
  return METAL_OPTIONS[calculatorState.metal];
}

function scrollToCalculator() {
  document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function inquiryPayload() {
  const metal = activeMetal();
  const contact = calculatorState.contact;
  const grams = calculatorState.unknownWeight ? null : (parseWeight() || null);

  return {
    source_page: metal.pagePath,
    metal: calculatorState.metal,
    metal_label: metal.label,
    type_label: calculatorState.typeLabel || null,
    fineness: calculatorState.fineness,
    buy_rate: calculatorState.typeBuyRate,
    weight_grams: grams,
    unknown_weight: calculatorState.unknownWeight,
    estimated_price_nok: calculatorState.estimatedPrice,
    price_nok_oz: calculatorState.priceNokOz[calculatorState.metal],
    prices_live: calculatorState.pricesLive,
    customer_name: contact.name.trim(),
    customer_phone: contact.phone.trim() || null,
    customer_email: contact.email.trim() || null,
    message: contact.message.trim() || null,
    status: 'ny'
  };
}

async function postJsonWithTimeout(url, payload) {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), SUPABASE_CONFIG.timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        apikey: SUPABASE_CONFIG.anonKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || String(res.status));
    }
  } finally {
    clearTimeout(tid);
  }
}

async function submitInquiry() {
  if (!contactIsReady() || calculatorState.submitStatus === 'sending') return;

  calculatorState.submitStatus = 'sending';
  calculatorState.submitMessage = 'Sender forespørselen...';
  updateSubmitState();

  try {
    await postJsonWithTimeout(
      `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.inquiriesTable}`,
      inquiryPayload()
    );
    calculatorState.submitStatus = 'sent';
    calculatorState.submitMessage = 'Forespørselen er sendt. Vi tar kontakt så snart vi kan.';
  } catch (error) {
    console.warn('[Forespørsel] Kunne ikke sende:', error.message);
    calculatorState.submitStatus = 'error';
    calculatorState.submitMessage = 'Kunne ikke sende akkurat nå. Prøv igjen, eller ring oss direkte.';
  }

  updateSubmitState();
}

function markInquiryChanged() {
  if (calculatorState.submitStatus === 'sent' || calculatorState.submitStatus === 'error') {
    calculatorState.submitStatus = 'idle';
    calculatorState.submitMessage = '';
  }
}

function SellHero(config) {
  if (!config.heroEyebrow && !config.heroDesc && !config.note && !config.trust.length) return '';

  return `
    <section class="sell-hero">
      <div class="sell-hero-inner">
        <div>
          ${config.heroEyebrow ? `<div class="hero-eyebrow">${esc(config.heroEyebrow)}</div>` : ''}
          ${config.heroDesc ? `<p class="hero-desc">${esc(config.heroDesc)}</p>` : ''}
          ${config.note ? `<p class="hero-note">${esc(config.note)}</p>` : ''}
          ${TrustBadges(config)}
        </div>
      </div>
    </section>
  `;
}

function TrustBadges(config) {
  if (!config.trust.length) return '';
  return `<div class="trust-grid">${config.trust.map((item) => `<div class="trust-badge">${esc(item)}</div>`).join('')}</div>`;
}

function buyPricePerGram(metalKey, fineness, buyRate) {
  const pricePerGramPure = calculatorState.priceNokOz[metalKey] / 31.1035;
  return pricePerGramPure * fineness * buyRate;
}

function LivePriceSection(config) {
  return `
    <section class="live-price-section" aria-live="polite">
      <div class="live-price-inner" data-live-price-board data-metal="${esc(config.defaultMetal)}">
        ${LivePriceBoard(config.defaultMetal)}
      </div>
    </section>
  `;
}

function LivePriceBoard(metalKey) {
  const metal = METAL_OPTIONS[metalKey];
  const config = SELL_PAGE_CONFIG[metalKey];
  const coinSrc = metalKey === 'gold' ? '../assets/sherwani-gold-coin.png' : '../assets/sherwani-silver-coin.png';
  const coinAlt = metalKey === 'gold' ? 'Sherwani gullmynt' : 'Sherwani sølvmynt';
  const priceRows = metal.types
    .filter(([, fineness]) => fineness)
    .map(([label, fineness, text, buyRate]) => {
      const gramPrice = buyPricePerGram(metalKey, fineness, buyRate);
      return `
        <div class="live-price-row">
          <span>
            <strong>${esc(label)}</strong>
            ${text ? `<small>${esc(text)}</small>` : ''}
          </span>
          <em>${krGram(gramPrice)} / g</em>
        </div>
      `;
    }).join('');

  return `
    <div class="live-price-head">
      <div class="live-price-copy">
        <div>
          <div class="section-label">Live kjøpspris</div>
          <h2>${esc(metal.label)} per gram</h2>
        </div>
        <p>${calculatorState.pricesLive ? 'Prisene følger markedet og kan endre seg fortløpende.' : 'Henter livepris. Midlertidige priser vises frem til oppdatering.'}</p>
        <a class="btn ${metalKey === 'gold' ? 'btn-gold' : 'btn-silver'} live-price-cta" href="#kalkulator">${esc(config.primaryCta)}</a>
      </div>
      <div class="live-price-coin" aria-hidden="true">
        <img src="${coinSrc}" alt="${coinAlt}">
      </div>
    </div>
    <div class="live-price-grid">
      ${priceRows}
    </div>
  `;
}

function updateLivePriceBoards() {
  document.querySelectorAll('[data-live-price-board]').forEach((board) => {
    const metalKey = board.dataset.metal === 'silver' ? 'silver' : 'gold';
    board.innerHTML = LivePriceBoard(metalKey);
  });
}

function MetalItemsSection(config) {
  return `
    <section class="section" id="hva-kan-du-selge">
      <div class="section-inner">
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
        <h2 class="section-title">${esc(config.pickupTitle)}</h2>
        <p class="section-desc">${esc(config.pickupText)}</p>
        <p class="pickup-note">${esc(config.pickupNote)}</p>
      </div>
    </section>
  `;
}

function AfterSubmitSection(config) {
  const steps = [
    {
      number: '1',
      title: 'Vi leser forespørselen',
      icon: `
        <svg viewBox="0 0 96 96" aria-hidden="true">
          <circle class="icon-ring" cx="48" cy="48" r="46"/>
          <path d="M25 42l23 17 23-17"/>
          <path d="M25 42v28h46V42"/>
          <path d="M25 70l18-15"/>
          <path d="M71 70L53 55"/>
          <path d="M36 23h24v27L48 59 36 50z"/>
          <path class="accent" d="M55 44.2c-2 2.3-4.5 3.5-7.4 3.5-5.8 0-10-4.2-10-10s4.2-10 10-10c5.6 0 9.6 3.9 9.6 9.1v3.1c0 1.8-1 2.9-2.5 2.9-1.4 0-2.3-1-2.3-2.7v-7.5"/>
          <circle class="accent" cx="47.3" cy="37.7" r="5.1"/>
        </svg>
      `
    },
    {
      number: '2',
      title: 'Vi kontrollerer innsendingen',
      icon: `
        <svg viewBox="0 0 96 96" aria-hidden="true">
          <circle class="icon-ring" cx="48" cy="48" r="46"/>
          <path d="M48 23v44"/>
          <path d="M24 31h48"/>
          <circle class="accent" cx="24" cy="31" r="2.8"/>
          <circle class="accent" cx="48" cy="31" r="2.8"/>
          <circle class="accent" cx="72" cy="31" r="2.8"/>
          <path d="M24 34l-12 26"/>
          <path d="M24 34l12 26"/>
          <path d="M72 34L60 60"/>
          <path d="M72 34l12 26"/>
          <path d="M12 60c2.2 5.8 6.2 8.8 12 8.8s9.8-3 12-8.8"/>
          <path d="M60 60c2.2 5.8 6.2 8.8 12 8.8s9.8-3 12-8.8"/>
          <path d="M39 70h18"/>
          <path class="accent" d="M35 76h26"/>
        </svg>
      `
    },
    {
      number: '3',
      title: 'Du bestemmer selv',
      icon: `
        <svg viewBox="0 0 96 96" aria-hidden="true">
          <circle class="icon-ring" cx="48" cy="48" r="46"/>
          <circle cx="48" cy="31" r="9"/>
          <path d="M34 58c0-10 6.2-17 14-17s14 7 14 17"/>
          <circle cx="25" cy="68" r="9.5"/>
          <circle cx="71" cy="68" r="9.5"/>
          <path class="accent" d="M20 68l3.8 3.8L31 64"/>
          <path class="accent" d="M66 63l10 10"/>
          <path class="accent" d="M76 63L66 73"/>
        </svg>
      `
    }
  ];

  return `
    <section class="section after-section">
      <div class="section-inner after-inner">
        <div>
          <h2 class="section-title">Dette skjer etterpå</h2>
        </div>
        <div class="after-steps">
          ${steps.map((step, index) => `
            <article class="after-step-card ${index < steps.length - 1 ? 'has-connector' : ''}">
              <span class="after-step-number">${step.number}</span>
              <div class="after-step-visual">
                <div class="after-step-icon">${step.icon}</div>
              </div>
              <div class="after-step-copy">
                <h3>${esc(step.title)}</h3>
                ${step.text ? `<p>${esc(step.text)}</p>` : ''}
              </div>
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

function submitButtonText(ready) {
  if (!ready) return 'Fyll inn kontaktinfo';
  if (calculatorState.submitStatus === 'sending') return 'Sender...';
  if (calculatorState.submitStatus === 'sent') return 'Sendt';
  return 'Send forespørsel';
}

function submitHelpText(ready) {
  if (!ready) return 'Navn og telefon eller e-post må fylles inn før sending.';
  if (calculatorState.submitMessage) return calculatorState.submitMessage;
  return 'Forespørselen er uforpliktende.';
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
  const isSending = calculatorState.submitStatus === 'sending';
  const isSent = calculatorState.submitStatus === 'sent';
  const selectedTypeText = calculatorState.typeLabel ? `${metal.label}: ${calculatorState.typeLabel}` : 'Ikke valgt';
  const weightText = calculatorState.unknownWeight ? 'Usikker vekt' : (calculatorState.weight ? `${calculatorState.weight} g` : 'Ikke oppgitt');

  host.innerHTML = `
    <div class="calc-flow">
      <div class="calc-block step-card">
        ${StepHeader(1, 'Velg metall')}
        <div class="choice-grid">
          ${optionButton({ label: 'Gull', text: METAL_OPTIONS.gold.shortText, selected: calculatorState.metal === 'gold', metal: 'gold', value: 'gold', action: 'metal', selectedText: METAL_OPTIONS.gold.selectedLabel })}
          ${optionButton({ label: 'Sølv', text: METAL_OPTIONS.silver.shortText, selected: calculatorState.metal === 'silver', metal: 'silver', value: 'silver', action: 'metal', selectedText: METAL_OPTIONS.silver.selectedLabel })}
        </div>
      </div>

      <div class="calc-block step-card">
        ${StepHeader(2, metal.typeLabel)}
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
        <button class="unknown-weight-button" type="button" data-action="unknown-weight">Jeg vet ikke vekten</button>
      </div>

      <div class="calc-block step-card estimate-step">
        ${StepHeader(4, 'Se estimert verdi')}
        <div class="calc-result ${metal.accent === 'silver' ? 'result-silver' : ''}">
          <div class="calc-label">${needsHelp ? 'Vi hjelper deg' : 'Estimert verdi'}</div>
          <div data-calc-result-live>
          ${canShowPrice ? `
            <div class="calc-value">Ca. ${kr(calculatorState.estimatedPrice)}</div>
            <p class="calc-status">${esc(metal.resultText)}</p>
          ` : `
            <p class="calc-status">${esc(calculatorState.unknownWeight || unknownType ? 'Vi hjelper deg videre.' : 'Velg type og skriv gram for å se estimert verdi.')}</p>
          `}
          </div>
        </div>
      </div>

      <div class="calc-block step-card">
        ${StepHeader(5, 'Kontaktinformasjon')}
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
        ${StepHeader(6, 'Send forespørsel')}
        <div class="summary-grid" aria-label="Oppsummering">
          <span><strong>Type</strong><em data-summary-type>${esc(selectedTypeText)}</em></span>
          <span><strong>Gram</strong><em data-summary-weight>${esc(weightText)}</em></span>
          <span><strong>Estimat</strong><em data-summary-estimate>${canShowPrice ? esc(kr(calculatorState.estimatedPrice)) : 'Ikke beregnet'}</em></span>
        </div>
        <div class="calc-actions">
          <button class="btn btn-dark" type="button" data-action="submit-inquiry" ${canSend && !isSending && !isSent ? '' : 'disabled'}>${submitButtonText(canSend)}</button>
          <a class="btn btn-soft" href="tel:+4747996251">Ring oss</a>
        </div>
        <p class="calc-status submit-message ${esc(calculatorState.submitStatus)}" data-submit-help>${esc(submitHelpText(canSend))}</p>
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
        const nextMetal = el.dataset.value === 'silver' ? 'silver' : 'gold';
        if (nextMetal !== calculatorState.metal) {
          window.location.href = nextMetal === 'silver' ? '../selg-solv/' : '../selg-gull/';
          return;
        }
        calculatorState.metal = nextMetal;
        calculatorState.typeLabel = '';
        calculatorState.fineness = null;
        calculatorState.typeBuyRate = null;
        calculatorState.estimatedPrice = null;
        renderCalculator();
        return;
      }
      if (action === 'type') {
        markInquiryChanged();
        const label = el.dataset.value;
        const item = activeMetal().types.find(([optionLabel]) => optionLabel === label);
        calculatorState.typeLabel = label;
        calculatorState.fineness = item ? item[1] : null;
        calculatorState.typeBuyRate = item ? item[3] : null;
        calculatorState.estimatedPrice = null;
        renderCalculator();
        return;
      }
      if (action === 'unknown-weight') {
        markInquiryChanged();
        calculatorState.unknownWeight = true;
        calculatorState.weight = '';
        calculatorState.estimatedPrice = null;
        renderCalculator();
        return;
      }
      if (action === 'weight-adjust') {
        markInquiryChanged();
        adjustWeight(Number(el.dataset.value) || 0);
        renderCalculator();
        return;
      }
      if (action === 'weight-clear') {
        markInquiryChanged();
        calculatorState.unknownWeight = false;
        calculatorState.weight = '';
        calculatorState.estimatedPrice = null;
        renderCalculator();
        return;
      }
      if (action === 'submit-inquiry') {
        submitInquiry();
      }
    });
  });

  const weightInput = document.querySelector('[data-calc-weight]');
  if (weightInput) {
    weightInput.addEventListener('input', () => {
      markInquiryChanged();
      calculatorState.weight = weightInput.value;
      calculatorState.unknownWeight = false;
      calculateEstimatedPrice();
      updateCalculatorResult();
      updateSummary();
    });
  }

  document.querySelectorAll('[data-contact-field]').forEach((field) => {
    field.addEventListener('input', () => {
      markInquiryChanged();
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
    : `<p class="calc-status">${esc(calculatorState.unknownWeight || unknownType ? 'Vi hjelper deg videre.' : 'Velg type og skriv gram for å se estimert verdi.')}</p>`;
  updateSubmitState();
  updateSummary();
}

function updateSubmitState() {
  const button = document.querySelector('[data-action="submit-inquiry"]');
  const help = document.querySelector('[data-submit-help]');
  if (!button || !help) return;
  const ready = contactIsReady();
  button.disabled = !ready || calculatorState.submitStatus === 'sending' || calculatorState.submitStatus === 'sent';
  button.textContent = submitButtonText(ready);
  help.textContent = submitHelpText(ready);
  help.className = `calc-status submit-message ${calculatorState.submitStatus}`;
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
  const grams = parseWeight();
  if (!grams || !calculatorState.fineness || !calculatorState.typeBuyRate) {
    calculatorState.estimatedPrice = null;
    return null;
  }
  calculatorState.estimatedPrice = grams * buyPricePerGram(
    calculatorState.metal,
    calculatorState.fineness,
    calculatorState.typeBuyRate
  );
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
  calculatorState.typeBuyRate = null;
  calculatorState.weight = '';
  calculatorState.unknownWeight = false;
  calculatorState.estimatedPrice = null;
  calculatorState.pricesLive = false;
  renderCalculator();
  updateLivePriceBoards();
  fetchMetalPrices().then((prices) => {
    calculatorState.priceNokOz.gold = prices.gold;
    calculatorState.priceNokOz.silver = prices.silver;
    calculatorState.pricesLive = true;
    updateLivePriceBoards();
    renderCalculator();
  }).catch(() => {
    calculatorState.pricesLive = false;
    updateLivePriceBoards();
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
    LivePriceSection(config),
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
