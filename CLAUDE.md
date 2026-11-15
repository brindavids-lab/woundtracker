# Wound Report Tracker: instructions for Claude

Wound Report Tracker is a static, installable web app for wound care practitioners in South Africa. It records patients, wounds, visits and photos, tracks progress, and produces a wound management report as a PDF for medical scheme authorisation.

Live site: https://brindavids-lab.github.io/woundtracker/ (GitHub Pages, `main` branch, root folder).

## Rules that never change

1. Patient data stays on the device. Never add a server call, analytics, a tracking script, a remote font or any outside request. The Content Security Policy in `index.html` sets `connect-src 'none'`. Do not loosen it without the owner's explicit decision.
2. Never commit patient records, photos, backup files or real patient details. Use fictional data in examples and tests.
3. Raise the version with every change to any file:
   - `VERSION` in `sw.js` (for example `wrt-v11` to `wrt-v12`)
   - the "App version" number in the footer text inside `index.html`
   Keep both numbers the same. Without this, installed phones keep the old copy.
4. Keep existing records working. When the data shape changes, extend `normalize()` in `index.html` so old records and old backups convert on load. Test with an old-format record.
5. Push to `main` only when the owner asked for the change. A push to `main` publishes to the live site within two minutes.
6. The repository must stay public while the site runs on the free GitHub Pages plan. A private repository stops Pages.
7. No build step and no npm packages. The app is plain HTML, CSS and JavaScript in one file, plus bundled libraries.

## Files

- `index.html`: the whole app (styles, markup and script)
- `icd10.js`: ICD-10 codes and titles, WHO 2019 version, loaded on first use of the code search. Copyright WHO, not covered by the MIT licence
- `jspdf.umd.min.js`: jsPDF 2.5.1, bundled for offline PDF export
- `sw.js`: service worker. Network first for the page, cache first for other files
- `manifest.webmanifest`, `icons/`: install support
- `README.md`, `LICENSE` (MIT)

## How the app is organised (`index.html`)

- Storage: IndexedDB database `woundReportTracker` with stores `cases`, `photos` and `meta`, wrapped by `store`. It falls back to memory when the browser refuses storage.
- State: `cases` (patients), `settings` (practitioner details, `customIcd`), `ui` (current view, patient, wound, tab).
- Data model:
  - patient: `id, name, billing, aid, aidNo, idNo, dep, refDr, practiceNo, startDate, icd, history, frequency, nextVisit, reportPhotos, wounds[]`
  - wound: `id, site, region, side, types[], healability, dressings, visits[]`
  - visit: `id, date, l, w, d, note, photos[]` plus the assessment fields listed in `ASSESS`
  - photo: stored separately by id as `{data, w, h}`, resized to 1400 px JPEG
- Views: `viewDash` (opening dashboard), `viewHome` (patient list), `viewSettings`, `viewCase` with tabs `tabDetails`, `tabVisits`, `tabProgress`, `tabReport`.
- Rendering: template strings set on `#app` by `render()`. One delegated `click` listener handles every `data-action`. Inputs save through `data-bind` (`case|field`, `wound|field`, `visit|id|field`, `set|field`).
- Report: `model()` builds the content once. `tabReport()` shows the HTML preview and `buildPdf()` draws the PDF. Change both when the report layout changes.
- Options: dropdown values live in `OPT`, wound sites in `SITES`, the body diagram in `BODY`.
- ICD-10 search: `ICD_QUICK` (codes from the practice code sheets, with PMB codes), `settings.customIcd` (codes the user typed), then the WHO list. `ICD_SYN` and `ICD_ALIAS` map everyday wound terms.
- Dashboard alerts: area grew since the previous visit, infection at the last visit, or a healable wound under 30% smaller after 28 days.

## Testing before a push

Serve the folder (`python3 -m http.server`) and drive the page with Playwright or a browser:

1. The dashboard loads with the example patient and no console errors.
2. Add a patient, a second wound, a visit with a photo, and open Progress.
3. Open Report and download the PDF. Look at the pages.
4. For data model changes, write an old-format record into IndexedDB, reload, and confirm it converts.

Report what was tested and what was not. Finger input on a real phone is the owner's test.

## Clinical and regulatory context

- South African schemes use ICD-10 based on the WHO version through the Master Industry Table, with local five character codes such as `W01.09`. Do not add US ICD-10-CM codes (six or seven characters).
- An S code needs an external cause code (V, W, X or Y). The app reminds the user.
- The design follows the wound bed preparation paradigm (Smart H, Sibbald RG, et al. Wound Bed Preparation 2024. Adv Skin Wound Care. 2024;37(4):180-196).
- The app is a record keeping and reporting aid. Do not add automated diagnosis, automated wound measuring or tissue classification without the owner's decision. Such features move the app toward medical device rules (SAHPRA). A photo tracing tool was built once and removed because the results were not accurate.
- POPIA applies to the practitioner. Keeping records on the device keeps that burden small.

## Working with the owner

- The owner is a wound care clinician, not a programmer. Explain in plain language, with numbered steps for anything they do themselves.
- State limits and risks plainly, and say when a request conflicts with South African coding or privacy rules.
- Remind the owner to download a backup (Settings) before a large update reaches their phone.

## Ideas not built yet

- Authorisation tracking: date sent, authorisation number, expiry date
- Mark a wound as healed, with a healing rate figure
- Login and paid access (needs a server for accounts only, with patient data still on the device)
- Hosting on the owner's own domain
