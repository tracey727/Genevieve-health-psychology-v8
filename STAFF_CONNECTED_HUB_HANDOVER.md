# GENEVIEVE HEALTH™ — Irene & Staff Connected Safety Hub V8

## Purpose

This controlled demonstration connects Irene’s whole-practice dashboard to a phone-first staff application. It is designed for Apple and Android through an installable Progressive Web App (PWA).

## What now works

- Irene can create a fictional staff access record, assign a role, pause access or revoke access during the demo.
- Irene and authorised Mother Board / Governance Board accounts can see the connected whole-practice communication stream.
- Staff see only their own messages, assignments, acknowledgements, role-specific modules and support controls.
- Staff can send operational messages, coverage questions, support requests, safety concerns and handovers to Irene.
- Irene can reply privately, send role-based announcements and assign work with a due time and priority.
- Staff can accept, decline, complete or request help with their own assignment.
- Messages, acknowledgements, access changes and assignment responses are timestamped for audit evidence.
- Shared state is stored in the server database rather than browser-only storage. Reliable phone-to-dashboard communication across separate devices requires the persistent Turso database setting described in `README.md`.

## Default privacy boundaries

- No staff-to-staff private-message access.
- No therapy notes, diagnoses, private health details or identifiable client information.
- Reception receives operational scheduling, callback, approved-script and transfer information only.
- Provisional psychologists receive their own work, supervision actions, scope reminders and support controls.
- Psychologists receive their own appointments, continuity actions, messages, tasks and support controls.
- Irene controls Mother Board / Governance Board access.
- All important restrictions are checked on the server; hiding a button is not treated as security.

## Phone installation

- iPhone/iPad: open the Staff Phone App in Safari, use **Share**, then **Add to Home Screen**.
- Android: open the Staff Phone App in Chrome, open the browser menu, then choose **Install app** or **Add to Home screen**.

## Controlled activation sequence

1. Deploy the private fictional demo through GitHub and Vercel.
2. Add persistent Turso storage before testing communication on separate devices.
3. Open Irene’s fictional view at `/irene?demo=director`.
4. Test the psychologist, provisional psychologist and reception views using only fictional or coded information.
5. Keep the repository and Vercel deployment private while the trial workflows are reviewed.
6. Select and implement a production identity provider before real accounts are enabled.
7. Complete privacy, cyber-security, clinical-governance, WHS, records-retention and incident-response review before real operational or health information is permitted.

## Safety boundary

GENEVIEVE does not diagnose, calculate a clinical risk score, make clinical decisions or automatically contact family, police, hospitals or emergency services. In an immediate emergency call 000 and follow the practice’s approved human-led procedure.
