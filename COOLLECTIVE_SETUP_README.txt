PROJECT COOL-LECTIVE: FORMS + PRIVATE SHAREPOINT + PUBLIC DASHBOARD

FILES
1) COOLLECTIVE_index_Forms_Connected.html — edited main HTML. Rename to index.html when uploading to GitHub repository root.
2) coollective-public-summary.json — privacy-safe public aggregate template. Upload beside index.html.

LIVE WORKING NOW
- REPORT A ZONE has a real SUBMIT REPORT ONLINE link to the provided Microsoft Forms response URL.
- Your successful Power Automate flow sends new Forms submissions to the private SharePoint list COOLLECTIVE_REPORTS.
- The prior on-device demonstration form remains in source but is hidden from public users.

DASHBOARD — IMPORTANT DISTINCTION
- A public GitHub Pages static website does NOT have permission to read private SharePoint list contents.
- The dashboard will show em dashes (—) until an approved aggregate snapshot is published.
- The older local browser dataset remains available inside a clearly labeled, collapsed demo section.
- For confidential actual submissions go to https://lists.microsoft.com/ in your authenticated DepEd work account.

HOW TO SHOW REAL, VERIFIED PUBLIC COUNTS (INITIAL MANUAL METHOD)
1) As an authorized coordinator, check COOLLECTIVE_REPORTS. Exclude DEMO/test records and any sensitive personal data.
2) Calculate actual reportsReceived, underReview, validated, actionsRecorded from your reviewed SharePoint records.
3) Edit coollective-public-summary.json and set published=true and updatedAt to an accurate date/time.
4) Replace null counts with accurate nonnegative integer counts. Example structure:
   {
     "published":true,
     "updatedAt":"2026-10-21 17:00 PHT",
     "reportsReceived":3,
     "underReview":2,
     "validated":1,
     "actionsRecorded":0
   }
   Numbers above are ILLUSTRATIVE ONLY. Never use them as actual project data.
5) Commit that JSON file to the root of the GitHub Pages repository. The dashboard Refresh status button reads it.

FOR AUTOMATIC UPDATES
- Build an authorized publication workflow that reads SharePoint Get items and writes *aggregate counts only* into the public JSON file by a secure server-side GitHub publishing mechanism.
- Do not paste SharePoint tokens, Power Automate secrets, Graph API credentials, personal data, or complete private list data into GitHub Pages HTML or JSON.
- The submitted Microsoft Forms URL may require DepEd school login depending on the form response permissions; public visitors cannot necessarily submit.
- Do not credit COOL POINTS or publish identified locations as verified until the school-approved validation workflow actually confirms them.
- Public JSON cannot be treated as proof of live, automatic synchronization until a controlled publishing flow has been tested.
