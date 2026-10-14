# Google Play / TWA release guide — PROJECT COOL-LECTIVE

Suggested package name: `io.github.mamevelyn.coollective`

1. Publish the PWA over HTTPS (GitHub Pages is acceptable for testing/release if the URL is stable).
2. Verify manifest, service worker, installability, privacy page and external iHeatMAP/map links.
3. Generate the Android wrapper/AAB with Bubblewrap or PWABuilder.
4. Enable Google Play App Signing.
5. Copy the SHA-256 fingerprint from the Play app-signing certificate.
6. Replace `REPLACE_WITH_PLAY_APP_SIGNING_SHA256` in `.well-known/assetlinks.json`.
7. The Digital Asset Links file must be reachable at the **origin root**. If using a GitHub project page such as `https://mamevelyn.github.io/cool-lective/`, the origin-level file is normally `https://mamevelyn.github.io/.well-known/assetlinks.json`.
8. Test first through Internal testing, then follow the Play Console testing/release requirements applicable to the account.
9. Before release, prepare the Play listing: 512×512 icon, 1024×500 feature graphic, screenshots, short/full descriptions, public privacy-policy URL, Data Safety declaration, content rating and target audience.

### Privacy / permissions
Current web build does not require login, diagnosis entry, precise GPS, or a shared backend. If any of those are added later, update the privacy policy, permissions and Play Data Safety answers before publishing the new build.
