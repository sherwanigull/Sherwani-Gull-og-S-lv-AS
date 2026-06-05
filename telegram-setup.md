# Telegram-oppsett for Sherwani Gull & Solv

Dette oppsettet sender et Telegram-varsel hver gang det kommer en ny rad i `public.foresporsler`.

## 1. Lag en bot i Telegram

1. Aapne Telegram og finn `@BotFather`.
2. Send `/newbot`.
3. Velg navn og brukernavn.
4. Kopier bot-tokenet du faar tilbake.

## 2. Finn chat ID-en din

1. Start en chat med boten du nettopp lagde.
2. Send en enkel melding, for eksempel `hei`.
3. Aapne denne URL-en i nettleseren og bytt ut `BOT_TOKEN`:

```text
https://api.telegram.org/botBOT_TOKEN/getUpdates
```

4. Finn `chat.id` i JSON-svaret. Det er verdien du skal bruke som `TELEGRAM_CHAT_ID`.

## 3. Opprett Edge Function i Supabase

Funksjonskoden ligger i:

- [supabase/functions/telegram-notify/index.ts](/Users/parez/Documents/GitHub/Sherwani-Gull-og-S-lv-AS/supabase/functions/telegram-notify/index.ts)
- [supabase/config.toml](/Users/parez/Documents/GitHub/Sherwani-Gull-og-S-lv-AS/supabase/config.toml)

Hvis du bruker dashboard:

1. Gaa til `Edge Functions`.
2. Lag en funksjon som heter `telegram-notify`.
3. Lim inn innholdet fra `index.ts`.
4. Pass paa at funksjonen tillater webhook-kall uten JWT. I repoet er dette satt som:

```toml
[functions.telegram-notify]
verify_jwt = false
```

## 4. Legg inn secrets i Supabase

Gaa til `Project Settings -> Edge Functions -> Secrets` og legg inn:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_WEBHOOK_SECRET`

`TELEGRAM_WEBHOOK_SECRET` kan vaere en tilfeldig lang streng du lager selv.

## 5. Koble databasen til funksjonen

Gaa til `Database -> Webhooks` og lag en webhook med disse verdiene:

- `Name`: `telegram-foresporsel`
- `Table`: `public.foresporsler`
- `Events`: `INSERT`
- `Method`: `POST`
- `URL`: `https://sbsxckncemyonvidinup.supabase.co/functions/v1/telegram-notify`

Legg til headers:

- `Content-Type: application/json`
- `x-webhook-secret: <samme verdi som TELEGRAM_WEBHOOK_SECRET>`

Supabase Database Webhooks sender automatisk en payload med `type`, `table`, `schema`, `record` og `old_record` for INSERT/UPDATE/DELETE-hendelser.

## 6. Test

1. Send inn en foresporsel fra `selg-gull` eller `selg-solv`.
2. Sjekk at raden dukker opp i `public.foresporsler`.
3. Sjekk at Telegram-boten sender deg et varsel.

## Feilsoking

- Hvis raden kommer inn i tabellen, men du ikke faar Telegram-varsel:
  Sjekk `Edge Functions -> Logs`.
- Hvis funksjonen svarer `Unauthorized`:
  Sjekk at `x-webhook-secret` i webhooken matcher `TELEGRAM_WEBHOOK_SECRET`.
- Hvis Telegram ikke svarer:
  Sjekk at bot-tokenet er riktig, og at du har sendt minst en melding til boten for aa aktivere chatten.
