# Fidelity
1. Unzip the package
1. Open a terminal: cd path/to/fidelity
1. Run: npm install
1. Update the file in src/environments/environment.prod.ts/.ts with the proper data
1. If you want add a language go to assets/i18n and copy/paste en.json with the country code you want to translate
1. Run: ng build && npx cap sync
1. Now is ready to generate IPA or APK/BUNDLE with the respective software (xCode/Android Studio).
