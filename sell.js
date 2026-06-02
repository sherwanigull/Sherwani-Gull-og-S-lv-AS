const SELL_PAGE_CONFIG = {
  gold: {
    pagePath: '/selg-gull',
    metalLabel: 'Gull',
    metalValue: 'Gull',
    emailSubject: 'Ny forespørsel: Selg gull',
    heroEyebrow: 'Selg gull hos Sherwani',
    heroTitle: 'Selg gull trygt og enkelt',
    heroDesc: 'Har du gull, smykker eller arvegull du vurderer å selge? Sherwani Gull & Sølv gir deg en ryddig og uforpliktende vurdering basert på vekt, renhet og dagens markedspris.',
    primaryCta: 'Få vurdering av gull',
    secondaryCta: 'Kontakt oss direkte',
    note: 'Du bestemmer alltid selv om du vil selge. Vi forklarer vurderingen på en enkel måte, uten press og uten skjulte steg.',
    panelTitle: 'Send én enkel forespørsel',
    panelText: 'Legg igjen navn, telefon, område og en kort beskrivelse. Har du bilder, kan du sende dem direkte på e-post etterpå.',
    trust: [
      'Uforpliktende vurdering',
      'Basert på dagens markedspris',
      'Gratis henting kan avtales i Oslo, Akershus og Østfold',
      'Ingen press - du bestemmer selv'
    ],
    itemsTitle: 'Hva slags gull kan du selge?',
    itemsDesc: 'Tilstand er vanligvis ikke avgjørende. Vurderingen baseres hovedsakelig på gullinnhold, vekt og renhet.',
    items: ['Ringer', 'Kjedesmykker', 'Armbånd', 'Øredobber', 'Ødelagte smykker', 'Arvegull', 'Gullmynter', 'Gull uten sertifikat', '8k, 14k, 18k, 21k, 22k og 24k gull'],
    process: [
      ['Send forespørsel', 'Send inn navn, telefon, område og gjerne en kort beskrivelse av gjenstandene.'],
      ['Få en rolig vurdering', 'Vi tar kontakt og forklarer neste steg. Ved behov får du veiledning om karat, vekt og forventet verdi.'],
      ['Avtal levering eller henting', 'Du kan avtale trygg levering, møte eller gratis henting i Oslo, Akershus og Østfold der dette passer.']
    ],
    pickupTitle: 'Gratis henting i Oslo, Akershus og Østfold',
    pickupText: 'For kunder i Oslo, Akershus og Østfold kan vi etter avtale tilby gratis henting. Dette gjør prosessen enklere for deg som har gull eller sølv hjemme, men ønsker en trygg og personlig gjennomgang før du bestemmer deg.',
    pickupNote: 'Henting avtales individuelt og er avhengig av tidspunkt, område og mengde.',
    calcTitle: 'Veiledende gullkalkulator',
    calcDesc: 'Få en enkel pekepinn før du sender forespørsel. Estimatet er ren metallverdi, ikke et bindende kjøpstilbud.',
    calcSelectLabel: 'Velg karat',
    calcWeightLabel: 'Vekt i gram',
    calcDisclaimer: 'Dette er kun et veiledende estimat. Endelig tilbud gis etter kontroll av vekt, renhet og gjenstand.',
    priceSource: 'gold',
    // Fallback-pris i NOK per troy ounce brukes bare hvis live markedspris ikke kan hentes.
    fallbackNokOz: 36500,
    fineness: [
      ['8k gull', 0.333],
      ['9k gull', 0.375],
      ['14k gull', 0.585],
      ['18k gull', 0.750],
      ['21k gull', 0.875],
      ['22k gull', 0.916],
      ['24k gull', 0.999]
    ],
    defaultType: 'Gull',
    faq: [
      ['Må jeg vite karat før jeg tar kontakt?', 'Nei. Send gjerne en forespørsel selv om du er usikker. Vi kan veilede deg rolig videre.'],
      ['Kjøper dere ødelagt gull?', 'Ja, ødelagte smykker kan ofte vurderes fordi verdien hovedsakelig handler om gullinnhold, vekt og renhet.'],
      ['Kan jeg få vurdering uten å selge?', 'Ja. Vurderingen er uforpliktende, og du bestemmer selv om du vil gå videre.'],
      ['Tilbyr dere henting?', 'Gratis henting kan avtales i Oslo, Akershus og Østfold, avhengig av område, tidspunkt og mengde.'],
      ['Hvordan beregnes prisen?', 'Vi ser på vekt, renhet/karat og dagens markedspris. Eventuelle detaljer forklares før du bestemmer deg.'],
      ['Når får jeg betaling?', 'Betaling avtales når vurderingen er kontrollert og du har akseptert tilbudet.']
    ]
  },
  silver: {
    pagePath: '/selg-solv',
    metalLabel: 'Sølv',
    metalValue: 'Sølv',
    emailSubject: 'Ny forespørsel: Selg sølv',
    heroEyebrow: 'Selg sølv hos Sherwani',
    heroTitle: 'Selg sølv på en enkel og trygg måte',
    heroDesc: 'Har du sølvbestikk, sølvtøy, smykker eller sølvmynter liggende? Sherwani Gull & Sølv hjelper deg med en ryddig og uforpliktende vurdering.',
    primaryCta: 'Få vurdering av sølv',
    secondaryCta: 'Avtal gratis henting',
    note: 'Vi kan etter avtale tilby gratis henting i Oslo, Akershus og Østfold, spesielt ved større mengder sølv eller hvis du ønsker en enklere løsning.',
    panelTitle: 'Enkel prosess for sølv',
    panelText: 'Fortell kort hva du har og hvor du holder til. Sølv trenger ikke være pusset eller komplett før du tar kontakt.',
    trust: [
      'Vi vurderer sølv uansett tilstand',
      'Sølvbestikk, mynter, smykker og sølvtøy',
      'Gratis henting kan avtales i Oslo, Akershus og Østfold',
      'Trygg og personlig prosess'
    ],
    itemsTitle: 'Hva slags sølv kan du selge?',
    itemsDesc: 'Det gjør ingenting om sølvet er brukt, oksidert, gravert eller ufullstendig. Verdien vurderes hovedsakelig etter type sølv, vekt og renhet.',
    items: ['Sølvbestikk', 'Sølvtøy', 'Sølvfat', 'Lysestaker', 'Smykker', 'Sølvmynter', 'Arvesølv', '830S, 925S og 999 sølv', 'Sølv med gravering', 'Ufullstendige bestikksett'],
    process: [
      ['Send forespørsel', 'Send inn navn, telefon, område og en kort beskrivelse av sølvet du vurderer å selge.'],
      ['Få vurdering', 'Vi tar kontakt, forklarer prosessen og gir deg en ryddig vurdering basert på type sølv, vekt og renhet.'],
      ['Avtal levering eller gratis henting', 'Ved behov kan du avtale levering, møte eller gratis henting i Oslo, Akershus og Østfold.']
    ],
    pickupTitle: 'Gratis henting ved større mengder sølv',
    pickupText: 'Har du større mengder sølvbestikk, sølvtøy eller arvesølv, kan gratis henting være en enkel løsning. Vi kan etter avtale hente i Oslo, Akershus og Østfold.',
    pickupNote: 'Henting avtales individuelt og er avhengig av tidspunkt, område og mengde.',
    calcTitle: 'Veiledende sølvkalkulator',
    calcDesc: 'En enkel kalkulator som gir en idé om ren metallverdi før du sender forespørsel.',
    calcSelectLabel: 'Velg sølvtype',
    calcWeightLabel: 'Vekt i gram',
    calcDisclaimer: 'Estimert verdi er kun veiledende. Endelig tilbud gis etter kontroll av sølvtype, vekt og tilstand.',
    priceSource: 'silver',
    // Fallback-pris i NOK per troy ounce brukes bare hvis live markedspris ikke kan hentes.
    fallbackNokOz: 420,
    fineness: [
      ['830S sølv', 0.830],
      ['925S sølv', 0.925],
      ['999 sølv', 0.999]
    ],
    defaultType: 'Sølv',
    faq: [
      ['Kjøper dere sølvbestikk?', 'Ja, vi vurderer sølvbestikk og sølvtøy, også større mengder og arvesølv.'],
      ['Må sølvet være pusset først?', 'Nei. Sølvet trenger ikke være pusset før vurdering.'],
      ['Kjøper dere ufullstendige sett?', 'Ja, ufullstendige bestikksett kan også vurderes.'],
      ['Hva betyr 830S og 925S?', 'Det forteller sølvinnholdet. 925S har høyere sølvandel enn 830S.'],
      ['Kan dere hente sølv hjemme hos meg?', 'Gratis henting kan avtales i Oslo, Akershus og Østfold der det passer.'],
      ['Er vurderingen bindende?', 'Nei. Vurderingen er uforpliktende, og du bestemmer selv om du vil selge.']
    ]
  }
};

const PRICE_CONFIG = {
  timeoutMs: 10000,
  refreshMs: 60 * 1000
};

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function kr(value) {
  return Number(value || 0).toLocaleString('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0
  });
}

function scrollToForm() {
  document.getElementById('foresporsel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            <a class="btn btn-dark" href="#foresporsel">${esc(config.primaryCta)}</a>
            <a class="btn btn-soft" href="tel:+4747996251">${esc(config.secondaryCta)}</a>
          </div>
          <p class="hero-note">${esc(config.note)}</p>
          ${TrustBadges(config)}
        </div>
        <aside class="hero-panel">
          <h2 class="hero-panel-title">${esc(config.panelTitle)}</h2>
          <p>${esc(config.panelText)}</p>
          <div class="mini-links">
            <a href="#kalkulator">Se veiledende kalkulator</a>
            <a href="#henting">Les om gratis henting</a>
            <a href="../index.html#priser">Se priser i dag</a>
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
        <div class="section-label">${esc(config.metalLabel)} vi vurderer</div>
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
      </div>
    </section>
  `;
}

function MetalCalculator(config) {
  return `
    <section class="section" id="kalkulator">
      <div class="section-inner">
        <div class="section-label">Veiledende estimat</div>
        <h2 class="section-title">${esc(config.calcTitle)}</h2>
        <p class="section-desc">${esc(config.calcDesc)}</p>
        <div class="calculator" data-calculator>
          <div class="calc-grid">
            <div class="field">
              <label for="calc-fineness">${esc(config.calcSelectLabel)}</label>
              <select id="calc-fineness" data-calc-fineness>
                ${config.fineness.map(([label, value]) => `<option value="${value}">${esc(label)}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label for="calc-weight">${esc(config.calcWeightLabel)}</label>
              <input id="calc-weight" data-calc-weight type="number" min="0" step="0.1" inputmode="decimal" placeholder="f.eks. 25">
            </div>
          </div>
          <div class="calc-result">
            <div class="calc-label">Estimert ren metallverdi</div>
            <div class="calc-value" data-calc-result>kr 0</div>
            <p class="calc-status" data-calc-status>Henter markedspris...</p>
          </div>
          <p class="disclaimer">${esc(config.calcDisclaimer)}</p>
        </div>
      </div>
    </section>
  `;
}

function SellInquiryForm(config) {
  return `
    <section class="section form-section" id="foresporsel">
      <div class="section-inner">
        <div class="section-label">Send forespørsel</div>
        <h2 class="section-title">${esc(config.primaryCta)}</h2>
        <p class="section-desc">Fyll ut kort, så tar vi kontakt så snart vi kan. Du kan også sende bilder direkte til post@sherwanigull.no etter at du har sendt forespørselen.</p>
        <form class="sell-form" id="sell-form">
          <input type="hidden" id="form-source" value="${esc(config.pagePath)}">
          <div class="form-row">
            <div class="field">
              <label for="form-name">Navn</label>
              <input id="form-name" name="navn" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="form-phone">Telefon</label>
              <input id="form-phone" name="telefon" type="tel" autocomplete="tel" required>
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="form-email">E-post, valgfritt</label>
              <input id="form-email" name="epost" type="email" autocomplete="email">
            </div>
            <div class="field">
              <label for="form-area">Poststed / område</label>
              <input id="form-area" name="omrade" type="text" autocomplete="address-level2" required>
            </div>
          </div>
          <div class="field">
            <label for="form-type">Hva ønsker du å selge?</label>
            <select id="form-type" name="type" required>
              ${['Gull', 'Sølv', 'Gull og sølv', 'Usikker'].map((option) =>
                `<option${option === config.defaultType ? ' selected' : ''}>${option}</option>`
              ).join('')}
            </select>
          </div>
          <div class="field">
            <label for="form-message">Beskrivelse</label>
            <textarea id="form-message" name="melding" placeholder="Skriv gjerne hva du har, ca. mengde/vekt hvis du vet, og om du ønsker henting." required></textarea>
          </div>
          <label class="checkbox-card">
            <input id="form-pickup" type="checkbox">
            <span>Jeg ønsker gratis henting hvis mulig</span>
          </label>
          <label class="checkbox-card">
            <input id="form-call" type="checkbox" checked>
            <span>Jeg ønsker å bli kontaktet på telefon</span>
          </label>
          <p class="form-note">Bildeopplasting er ikke koblet til skjemaet ennå. Send gjerne bilder direkte til post@sherwanigull.no etter at du har sendt forespørselen.</p>
          <button class="btn btn-dark" type="submit">Send forespørsel</button>
          <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
        </form>
      </div>
    </section>
  `;
}

function FAQSection(config) {
  return `
    <section class="section" id="faq">
      <div class="section-inner">
        <div class="section-label">Spørsmål og svar</div>
        <h2 class="section-title">Ofte stilte spørsmål</h2>
        <div class="faq-list">
          ${config.faq.map(([question, answer]) => `
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
  return { gold: xau.price * nokRate, silver: xag.price * nokRate, live: true };
}

function initCalculator(config) {
  const fineness = document.querySelector('[data-calc-fineness]');
  const weight = document.querySelector('[data-calc-weight]');
  const result = document.querySelector('[data-calc-result]');
  const status = document.querySelector('[data-calc-status]');
  if (!fineness || !weight || !result || !status) return;

  let priceNokOz = config.fallbackNokOz;
  let isLive = false;

  function render() {
    const grams = Math.max(0, Number(String(weight.value).replace(',', '.')) || 0);
    const purity = Number(fineness.value) || 0;
    const pricePerGramPure = priceNokOz / 31.1035;
    result.textContent = kr(grams * pricePerGramPure * purity);
    status.textContent = isLive
      ? 'Basert på live markedspris akkurat nå.'
      : 'Basert på midlertidig placeholder-pris. Oppdateres automatisk når live pris er tilgjengelig.';
  }

  fineness.addEventListener('input', render);
  weight.addEventListener('input', render);
  render();

  fetchMetalPrices().then((prices) => {
    priceNokOz = prices[config.priceSource];
    isLive = true;
    render();
  }).catch(() => render());
}

function initForm(config) {
  const form = document.getElementById('sell-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const area = document.getElementById('form-area').value.trim();
    const type = document.getElementById('form-type').value;
    const message = document.getElementById('form-message').value.trim();
    const pickup = document.getElementById('form-pickup').checked ? 'Ja' : 'Nei';
    const call = document.getElementById('form-call').checked ? 'Ja' : 'Nei';
    const source = document.getElementById('form-source').value;

    const body = [
      'Side: ' + source,
      'Navn: ' + name,
      'Telefon: ' + phone,
      'E-post: ' + (email || 'Ikke oppgitt'),
      'Poststed/område: ' + area,
      'Ønsker å selge: ' + type,
      'Ønsker gratis henting hvis mulig: ' + pickup,
      'Ønsker telefonkontakt: ' + call,
      '',
      'Beskrivelse:',
      message,
      '',
      'Bilder kan legges ved i denne e-posten før sending.'
    ].join('\n');

    document.getElementById('form-status').textContent =
      'Takk! Vi har mottatt forespørselen din og tar kontakt så snart vi kan.';

    window.location.href = 'mailto:post@sherwanigull.no?subject=' +
      encodeURIComponent(config.emailSubject) + '&body=' + encodeURIComponent(body);
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
    MetalItemsSection(config),
    '<div class="section-spacer spacer-water" aria-hidden="true"></div>',
    SellProcessSteps(config),
    PickupAreaSection(config),
    MetalCalculator(config),
    SellInquiryForm(config),
    FAQSection(config)
  ].join('');

  document.querySelectorAll('[data-scroll-form]').forEach((button) => {
    button.addEventListener('click', scrollToForm);
  });
  initCalculator(config);
  initForm(config);
}

document.addEventListener('DOMContentLoaded', renderSellPage);
