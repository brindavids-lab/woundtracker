# Wound Report Tracker

A web app for wound management reports with photo tracking. It produces the report a medical scheme needs for authorisation, as a PDF.

- Record patient, medical aid and wound details.
- Add visits with photos, dimensions and a wound assessment.
- Follow wound area over time on a chart and a photo timeline.
- Download the report as a PDF.

Patient records and photos stay in the browser on each device. Nothing is sent to a server. Use Settings, Download backup to keep a copy or to move records to another device.

## Hosting

The app is a static site served by GitHub Pages from the `main` branch root.
Live address: https://brindavids-lab.github.io/woundtracker/

## Install on a phone

- Android: open the address in Chrome, tap the menu, then Install app.
- iPhone or iPad: open the address in Safari, tap Share, then Add to Home Screen.

## First use

Open Settings and enter the practitioner name, practice number, email and contact number. They print on every report.

## Updating

After changing any file, raise `VERSION` in `sw.js` (wrt-v2, wrt-v3) so installed phones pick up the new copy.

## Files

- `index.html`: the whole app
- `jspdf.umd.min.js`: jsPDF 2.5.1 (MIT licence), bundled for offline PDF export
- `manifest.webmanifest`, `icons/`, `sw.js`: install and offline support
