# Wound Report Tracker

A web app for wound management reports with photo tracking. It produces the report a medical scheme needs for authorisation, as a PDF.

- Record patient, medical aid and wound details.
- Add visits with photos, dimensions and a wound assessment.
- Follow wound area over time on a chart and a photo timeline.
- Download the report as a PDF.

## Privacy

The code is open source. The data is private.

- Patient records and photos are stored in the browser on the device in use, and nowhere else.
- The app has no server, no accounts, no analytics and no tracking.
- A Content Security Policy in `index.html` tells the browser to block every outgoing data connection, so the app has no way to send records out.
- The app loads no fonts, scripts or images from other websites.
- This repository holds code only. Never commit patient records, photos or backup files here.
- Backups are files you download yourself with Settings, Download backup. Store them somewhere safe, because they hold patient data.

## Use it on your own PC without the website

1. Press Code, then Download ZIP on GitHub, and unzip the folder.
2. Open `index.html` in Chrome, Edge or Firefox.

The app then runs from your own disk with no internet connection. Records made this way stay in the browser on your PC, separate from records made on the website address.

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

## Licence

MIT. See `LICENSE`. You are free to use, copy, change and share the code.

This software is a record keeping aid. The practitioner remains responsible for clinical decisions and for meeting POPIA or other privacy law that applies to them.
