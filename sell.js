const GOLD_BUY_RATE = 0.80;
const SILVER_BUY_RATE = 0.65;

const METAL_OPTIONS = {
  gold: {
    label: 'Gull',
    selectedLabel: 'Gull valgt',
    shortText: 'Smykker, ringer, arvegull',
    accent: 'gold',
    typeLabel: 'Velg type gull',
    uncertainText: 'Det går fint. Send forespørsel, så hjelper vi deg å finne riktig type.',
    weightText: 'Du kan skrive cirka-vekt hvis du er usikker.',
    resultText: 'Dette er et veiledende estimat. Endelig pris bekreftes etter kontroll av vekt og renhet.',
    emailSubject: 'Ny forespørsel: Selg gull',
    pagePath: '/selg-gull',
    priceSource: 'gold',
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
    uncertainText: 'Det går fint. Send forespørsel, så hjelper vi deg å finne riktig type.',
    weightText: 'Du kan skrive cirka-vekt hvis du er usikker.',
    resultText: 'Dette er et veiledende estimat. Endelig pris bekreftes etter kontroll av vekt og sølvtype.',
    emailSubject: 'Ny forespørsel: Selg sølv',
    pagePath: '/selg-solv',
    priceSource: 'silver',
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
    secondaryCta: 'Send forespørsel',
    note: 'Vi kjøper både gull og sølv. Du trenger ikke vite nøyaktig vekt eller type - vi hjelper deg videre.',
    panelTitle: 'Velg gull eller sølv',
    panelText: 'Enten du har gullsmykker, arvegull, sølvbestikk eller sølvtøy, hjelper vi deg med en trygg vurdering.',
    trust: [
      'Uforpliktende vurdering',
      'Vi kjøper gull og sølv',
      'Gratis henting kan avtales',
      'Du bestemmer selv'
    ],
    itemsTitle: 'Hva slags gull kan du selge?',
    itemsDesc: 'Tilstand er vanligvis ikke avgjørende. Vi hjelper deg med en rolig vurdering, også når du er usikker på karat eller vekt.',
    items: ['Ringer', 'Kjedesmykker', 'Armbånd', 'Øredobber', 'Ødelagte smykker', 'Arvegull', 'Gullmynter', 'Gull uten sertifikat', '8k, 14k, 18k, 21k, 22k og 24k gull'],
    process: [
      ['Send forespørsel', 'Send inn navn, telefon og hva du ønsker å selge.'],
      ['Få en rolig vurdering', 'Vi tar kontakt og hjelper deg med vekt, type og neste steg.'],
      ['Avtal levering eller henting', 'Du kan avtale trygg levering, møte eller gratis henting der dette passer.']
    ],
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
    secondaryCta: 'Send forespørsel',
    note: 'Vi kjøper både gull og sølv. Du trenger ikke vite nøyaktig vekt eller type - vi hjelper deg videre.',
    panelTitle: 'Velg gull eller sølv',
    panelText: 'Velg gull eller sølv og få en enkel veiledende pris. Du kan også sende forespørsel uten å bruke kalkulatoren.',
    trust: [
      'Uforpliktende vurdering',
      'Vi kjøper gull og sølv',
      'Gratis henting kan avtales',
      'Du bestemmer selv'
    ],
    itemsTitle: 'Hva slags sølv kan du selge?',
    itemsDesc: 'Det gjør ingenting om sølvet er brukt, oksidert, gravert eller ufullstendig. Vi hjelper deg videre selv om du er usikker på type eller vekt.',
    items: ['Sølvbestikk', 'Sølvtøy', 'Sølvfat', 'Lysestaker', 'Smykker', 'Sølvmynter', 'Arvesølv', '830S, 925S og 999 sølv', 'Sølv med gravering', 'Ufullstendige bestikksett'],
    process: [
      ['Send forespørsel', 'Send inn navn, telefon og hva du ønsker å selge.'],
      ['Få en rolig vurdering', 'Vi tar kontakt og hjelper deg med vekt, sølvtype og neste steg.'],
      ['Avtal levering eller henting', 'Ved behov kan du avtale levering, møte eller gratis henting der dette passer.']
    ],
    pickupTitle: 'Gratis henting i Oslo, Akershus og Østfold',
    pickupText: 'Har du større mengder sølvbestikk, sølvtøy eller arvesølv, kan gratis henting være en enkel løsning. Vi kan etter avtale hente i Oslo, Akershus og Østfold.',
    pickupNote: 'Henting avtales individuelt og avhenger av område, tidspunkt og mengde.'
  }
};

const PRICE_CONFIG = {
  timeoutMs: 10000
};

const calculatorState = {
  step: 1,
  metal: 'gold',
  typeLabel: '',
  fineness: null,
  weight: '',
  unknownWeight: false,
  priceNokOz: {
    gold: METAL_OPTIONS.gold.fallbackNokOz,
    silver: METAL_OPTIONS.silver.fallbackNokOz
  },
  isLive: false,
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

function scrollToForm() {
  document.getElementById('foresporsel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToCalculator() {
  document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function isSmallScreen() {
  return window.matchMedia('(max-width: 640px)').matches;
}

function moveToStep(step, shouldScroll = false) {
  calculatorState.step = Math.max(1, Math.min(4, step));
  renderCalculatorStep();
  if (shouldScroll && isSmallScreen()) {
    document.querySelector('[data-calculator]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function SellHero(config) {
  return `
    <section class="sell-hero">
      <div class="sell-hero-inner">
        <div>
          <div class="hero-sun" aria-hidden="true"></div>
          <div class="hero-eyebrow">${esc(config.heroEyebrow)}</div>
          <h1 class="hero-title">${esc(config.heroTitle)}</h1>
          <p class="hero-desc">${esc(config.heroDesc)}</p>
          <div class="hero-actions">
            <a class="btn btn-dark" href="#kalkulator">${esc(config.primaryCta)}</a>
            <a class="btn btn-soft" href="#foresporsel">${esc(config.secondaryCta)}</a>
          </div>
          <p class="hero-note">${esc(config.note)}</p>
          ${TrustBadges(config)}
        </div>
        <aside class="hero-panel">
          <h2 class="hero-panel-title">${esc(config.panelTitle)}</h2>
          <p>${esc(config.panelText)}</p>
          <div class="quick-links" aria-label="Hurtigvalg">
            <a href="#kalkulator">Beregn pris</a>
            <a href="#foresporsel">Send forespørsel</a>
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

function SellProcessSteps(config) {
  return `
    <section class="section" id="slik-fungerer-det">
      <div class="section-inner">
        <div class="section-label">Slik fungerer det</div>
        <h2 class="section-title">Tre enkle steg</h2>
        <div class="process-grid">
          ${config.process.map(([title, text]) => `
            <article class="process-card">
              <h3>${esc(title)}</h3>
              <p>${esc(text)}</p>
            </article>
          `).join('')}
        </div>
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
        <h2 class="section-title">Velg gull eller sølv</h2>
        <p class="section-desc">Få en enkel veiledende pris. Du kan også sende forespørsel hvis du ikke vet vekt eller type.</p>
        <div class="calculator" data-calculator>
          <div class="calc-progress" data-calc-progress>Steg 1 av 4</div>
          <div data-calc-step></div>
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

function renderCalculatorStep() {
  const stepHost = document.querySelector('[data-calc-step]');
  const progress = document.querySelector('[data-calc-progress]');
  if (!stepHost || !progress) return;

  const metal = activeMetal();
  progress.textContent = `Steg ${calculatorState.step} av 4`;

  if (calculatorState.step === 1) {
    stepHost.innerHTML = `
      <div class="calc-step">
        <h3>Hva vil du selge?</h3>
        <p>Du kan bytte mellom gull og sølv når som helst.</p>
        <div class="choice-grid">
          ${optionButton({ label: 'Gull', text: METAL_OPTIONS.gold.shortText, selected: calculatorState.metal === 'gold', metal: 'gold', value: 'gold', action: 'metal' })}
          ${optionButton({ label: 'Sølv', text: METAL_OPTIONS.silver.shortText, selected: calculatorState.metal === 'silver', metal: 'silver', value: 'silver', action: 'metal' })}
        </div>
        <div class="calc-actions">
          <button class="btn btn-dark" type="button" data-action="next">Neste</button>
        </div>
      </div>
    `;
  }

  if (calculatorState.step === 2) {
    stepHost.innerHTML = `
      <div class="calc-step">
        <h3>${esc(metal.typeLabel)}</h3>
        <p>Velg det nærmeste. Er du usikker, velg “Jeg er usikker”.</p>
        <div class="type-grid">
          ${metal.types.map(([label, value]) => optionButton({
            label,
            selected: calculatorState.typeLabel === label,
            metal: metal.accent,
            value: label,
            action: 'type'
          })).join('')}
        </div>
        ${calculatorState.typeLabel === 'Jeg er usikker' ? `<p class="calc-help">${esc(metal.uncertainText)}</p>` : ''}
        <div class="calc-actions split">
          <button class="btn" type="button" data-action="back">Tilbake</button>
          <button class="btn btn-dark" type="button" data-action="next">Neste</button>
        </div>
      </div>
    `;
  }

  if (calculatorState.step === 3) {
    stepHost.innerHTML = `
      <div class="calc-step">
        <h3>Hvor mye veier det?</h3>
        <p>${esc(metal.weightText)}</p>
        <div class="field">
          <label for="calc-weight">Skriv vekt i gram</label>
          <input id="calc-weight" data-calc-weight type="number" min="0" step="0.1" inputmode="decimal" placeholder="f.eks. 25" value="${esc(calculatorState.weight)}">
        </div>
        <button class="text-button" type="button" data-action="unknown-weight">Jeg vet ikke vekten</button>
        <p class="calc-error" data-calc-error></p>
        <div class="calc-actions split">
          <button class="btn" type="button" data-action="back">Tilbake</button>
          <button class="btn btn-dark" type="button" data-action="next">Vis pris</button>
        </div>
      </div>
    `;
  }

  if (calculatorState.step === 4) {
    const canShowPrice = calculateEstimatedPrice() !== null;
    stepHost.innerHTML = `
      <div class="calc-step">
        <h3>Din estimerte pris</h3>
        ${canShowPrice ? `
          <div class="calc-result">
            <div class="calc-label">Din estimerte pris</div>
            <div class="calc-value">Ca. ${kr(calculatorState.estimatedPrice)}</div>
            <p class="calc-status">${esc(metal.resultText)}</p>
          </div>
          <button class="btn btn-dark" type="button" data-action="form">Send forespørsel</button>
        ` : `
          <div class="calc-result">
            <div class="calc-label">Vi hjelper deg</div>
            <p class="calc-status">${esc(calculatorState.unknownWeight ? 'Ingen problem. Send forespørsel, så hjelper vi deg med vekt og type.' : metal.uncertainText)}</p>
          </div>
          <button class="btn btn-dark" type="button" data-action="form">Send forespørsel - vi hjelper deg</button>
        `}
        <button class="text-button" type="button" data-action="form">Usikker på vekt eller type? Send forespørsel, så hjelper vi deg.</button>
        <div class="calc-actions">
          <button class="btn" type="button" data-action="back">Tilbake</button>
        </div>
      </div>
    `;
  }

  bindCalculatorStep();
}

function bindCalculatorStep() {
  document.querySelectorAll('[data-action]').forEach((el) => {
    el.addEventListener('click', () => {
      const action = el.dataset.action;
      if (action === 'metal') {
        calculatorState.metal = el.dataset.value === 'silver' ? 'silver' : 'gold';
        calculatorState.typeLabel = '';
        calculatorState.fineness = null;
        calculatorState.estimatedPrice = null;
        updateFormFromCalculator();
        renderCalculatorStep();
        return;
      }
      if (action === 'type') {
        const label = el.dataset.value;
        const item = activeMetal().types.find(([optionLabel]) => optionLabel === label);
        calculatorState.typeLabel = label;
        calculatorState.fineness = item ? item[1] : null;
        calculatorState.estimatedPrice = null;
        updateFormFromCalculator();
        moveToStep(3, true);
        return;
      }
      if (action === 'unknown-weight') {
        calculatorState.unknownWeight = true;
        calculatorState.weight = '';
        calculatorState.estimatedPrice = null;
        updateFormFromCalculator();
        moveToStep(4, true);
        return;
      }
      if (action === 'back') {
        moveToStep(calculatorState.step - 1, true);
        return;
      }
      if (action === 'next') {
        handleNextStep();
        return;
      }
      if (action === 'form') {
        updateFormFromCalculator();
        scrollToForm();
      }
    });
  });

  const weightInput = document.querySelector('[data-calc-weight]');
  if (weightInput) {
    weightInput.addEventListener('input', () => {
      calculatorState.weight = weightInput.value;
      calculatorState.unknownWeight = false;
      updateFormFromCalculator();
    });
  }
}

function handleNextStep() {
  if (calculatorState.step === 1) {
    moveToStep(2, true);
    return;
  }
  if (calculatorState.step === 2) {
    if (!calculatorState.typeLabel) {
      const help = document.querySelector('.calc-step p');
      if (help) help.textContent = 'Velg en type, eller velg “Jeg er usikker”.';
      return;
    }
    moveToStep(3, true);
    return;
  }
  if (calculatorState.step === 3) {
    const weightInput = document.querySelector('[data-calc-weight]');
    calculatorState.weight = weightInput ? weightInput.value : calculatorState.weight;
    calculatorState.unknownWeight = false;
    const grams = parseWeight();
    if (!grams) {
      const error = document.querySelector('[data-calc-error]');
      if (error) error.textContent = 'Skriv cirka-vekt, eller trykk “Jeg vet ikke vekten”.';
      return;
    }
    moveToStep(4, true);
  }
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

function SellInquiryForm(config) {
  return `
    <section class="section form-section" id="foresporsel">
      <div class="section-inner">
        <div class="section-label">Send forespørsel</div>
        <h2 class="section-title">Send forespørsel</h2>
        <p class="section-desc">Du trenger ikke vite nøyaktig vekt eller type. Send inn det du vet, så hjelper vi deg videre.</p>
        <form class="sell-form" id="sell-form">
          <input type="hidden" id="form-source" value="${esc(config.pagePath)}">
          <input type="hidden" id="form-calc-metal">
          <input type="hidden" id="form-calc-type">
          <input type="hidden" id="form-calc-weight">
          <input type="hidden" id="form-calc-estimate">
          <div class="form-row">
            <div class="field">
              <label for="form-name">Navn</label>
              <input id="form-name" name="navn" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="form-phone">Telefonnummer</label>
              <input id="form-phone" name="telefon" type="tel" autocomplete="tel" required>
            </div>
          </div>
          <div class="field">
            <label for="form-type">Hva ønsker du å selge?</label>
            <select id="form-type" name="type" required>
              ${['Gull', 'Sølv', 'Begge deler', 'Usikker'].map((option) =>
                `<option${option === METAL_OPTIONS[config.defaultMetal].label ? ' selected' : ''}>${option}</option>`
              ).join('')}
            </select>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="form-area">Hvor holder du til?</label>
              <input id="form-area" name="omrade" type="text" autocomplete="address-level2" placeholder="Valgfritt">
            </div>
            <div class="field">
              <label for="form-weight">Omtrentlig vekt</label>
              <input id="form-weight" name="vekt" type="text" inputmode="decimal" placeholder="Valgfritt">
            </div>
          </div>
          <div class="field">
            <label for="form-message">Kort beskrivelse</label>
            <textarea id="form-message" name="melding" placeholder="Valgfritt. Skriv gjerne hva du har."></textarea>
          </div>
          <label class="checkbox-card">
            <input id="form-pickup" type="checkbox">
            <span>Jeg ønsker gratis henting hvis mulig</span>
          </label>
          <label class="checkbox-card">
            <input id="form-call" type="checkbox" checked>
            <span>Jeg ønsker å bli kontaktet på telefon</span>
          </label>
          <p class="form-note">Bildeopplasting er ikke koblet til skjemaet ennå. Du kan sende bilder direkte til post@sherwanigull.no etter at du har sendt forespørselen.</p>
          <button class="btn btn-dark" type="submit">Send forespørsel</button>
          <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
        </form>
      </div>
    </section>
  `;
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
  calculatorState.step = 1;
  calculatorState.typeLabel = '';
  calculatorState.fineness = null;
  calculatorState.weight = '';
  calculatorState.unknownWeight = false;
  calculatorState.estimatedPrice = null;
  renderCalculatorStep();
  updateFormFromCalculator();

  fetchMetalPrices().then((prices) => {
    calculatorState.priceNokOz.gold = prices.gold;
    calculatorState.priceNokOz.silver = prices.silver;
    calculatorState.isLive = true;
    renderCalculatorStep();
  }).catch(() => {
    renderCalculatorStep();
  });
}

function updateFormFromCalculator() {
  const metal = activeMetal();
  const formType = document.getElementById('form-type');
  const formWeight = document.getElementById('form-weight');
  const calcMetal = document.getElementById('form-calc-metal');
  const calcType = document.getElementById('form-calc-type');
  const calcWeight = document.getElementById('form-calc-weight');
  const calcEstimate = document.getElementById('form-calc-estimate');
  if (formType) formType.value = metal.label;
  if (formWeight && calculatorState.weight) formWeight.value = calculatorState.weight + ' g';
  if (calcMetal) calcMetal.value = metal.label;
  if (calcType) calcType.value = calculatorState.typeLabel || 'Ikke valgt';
  if (calcWeight) calcWeight.value = calculatorState.unknownWeight ? 'Vet ikke' : (calculatorState.weight ? calculatorState.weight + ' g' : 'Ikke oppgitt');
  if (calcEstimate) calcEstimate.value = calculatorState.estimatedPrice ? kr(calculatorState.estimatedPrice) : 'Ikke beregnet';
}

function initForm(config) {
  const form = document.getElementById('sell-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    updateFormFromCalculator();
    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const area = document.getElementById('form-area').value.trim();
    const type = document.getElementById('form-type').value;
    const weight = document.getElementById('form-weight').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const pickup = document.getElementById('form-pickup').checked ? 'Ja' : 'Nei';
    const call = document.getElementById('form-call').checked ? 'Ja' : 'Nei';
    const source = document.getElementById('form-source').value;
    const calcMetal = document.getElementById('form-calc-metal').value;
    const calcType = document.getElementById('form-calc-type').value;
    const calcWeight = document.getElementById('form-calc-weight').value;
    const calcEstimate = document.getElementById('form-calc-estimate').value;

    const body = [
      'Side: ' + source,
      'Navn: ' + name,
      'Telefon: ' + phone,
      'Ønsker å selge: ' + type,
      'Hvor holder kunden til: ' + (area || 'Ikke oppgitt'),
      'Omtrentlig vekt: ' + (weight || 'Ikke oppgitt'),
      'Ønsker gratis henting hvis mulig: ' + pickup,
      'Ønsker telefonkontakt: ' + call,
      '',
      'Fra kalkulator:',
      'Valgt metall: ' + calcMetal,
      'Valgt type: ' + calcType,
      'Vekt: ' + calcWeight,
      'Estimert pris vist til kunde: ' + calcEstimate,
      '',
      'Beskrivelse:',
      message || 'Ikke oppgitt',
      '',
      'Bilder kan legges ved i denne e-posten før sending.'
    ].join('\n');

    document.getElementById('form-status').textContent =
      'Takk! Vi har mottatt forespørselen din. Vi tar kontakt og hjelper deg videre.';

    window.location.href = 'mailto:post@sherwanigull.no?subject=' +
      encodeURIComponent(METAL_OPTIONS[config.defaultMetal].emailSubject) + '&body=' + encodeURIComponent(body);
  });
}

function bindPageActions() {
  document.querySelectorAll('[data-scroll-form]').forEach((button) => {
    button.addEventListener('click', scrollToForm);
  });
  document.querySelectorAll('[data-scroll-calc]').forEach((button) => {
    button.addEventListener('click', scrollToCalculator);
  });
  document.querySelectorAll('[data-pickup-request]').forEach((button) => {
    button.addEventListener('click', () => {
      const pickup = document.getElementById('form-pickup');
      if (pickup) pickup.checked = true;
      scrollToForm();
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
    '<div class="section-spacer spacer-sun" aria-hidden="true"></div>',
    MetalCalculator(config),
    '<div class="section-spacer spacer-water" aria-hidden="true"></div>',
    MetalItemsSection(config),
    SellProcessSteps(config),
    PickupAreaSection(config),
    SellInquiryForm(config),
    FAQSection()
  ].join('');

  initCalculator(config);
  initForm(config);
  bindPageActions();
}

document.addEventListener('DOMContentLoaded', renderSellPage);
