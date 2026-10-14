# PROJECT COOL-LECTIVE — Final PWA V3

This build is designed to remain usable in portrait orientation on phones.

Key revisions:
- Removed the embedded desktop-oriented iHeatMAP frame; HEAT NOW opens the official DOST-PAGASA iHeatMAP full-screen.
- Mobile title and quick-action buttons reflow automatically; no rotation is required for the app layout.
- Feature navigation is more prominent.
- Replaced the weaker hero sidebar with: “COOL-LECTIVE begins where a weather alert ends.”
- Extra Care has temporary, non-saved guidance profiles for general extra caution, breathing/asthma, heart/blood-pressure/circulation, and medication-related heat sensitivity.
- Heat-Smart mini lesson now covers hydration, heat symptoms, shade/cooler timing, vegetation, heat-absorbing/reflective surfaces, and community action.
- Dashboard now records possible contributing factors and possible responses. A metal-roof reflection should remain “TO VERIFY” until evidence supports it.
- SDG area now shows only the four goal icons without repeating their full names in adjacent text.
- PWA manifest, service worker, privacy page, icons, and Android Digital Asset Links placeholder remain included.

GitHub Pages:
Upload the contents of this folder to the repository root and enable Pages from main/root.

Google Play:
Confirm the final web origin and Android package name, then replace the placeholder Play App Signing SHA-256 fingerprint in `.well-known/assetlinks.json` before generating/releasing the TWA/AAB.
