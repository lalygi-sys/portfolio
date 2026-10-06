# KYC/KYB case: editorial implementation

The dedicated presentation is in `src/components/portfolio/KycCaseStudy.tsx`; its styles are scoped in `kyc-case-study.css`. Other cases retain the shared renderer. Admin draft previews retain the editable generic case renderer.

## Source material

- User account: old broker registration → application → waiting → interview → approval → portal; new main journey gives earlier portal access and requires application/document verification for withdrawal. User led legal collaboration, operational changes, handoff and implementation oversight.
- Figma design file: https://www.figma.com/design/v5RtEFFbIjFlkZpxMqEDDx/IB-KYC-onboarding--Copy-?node-id=0-1
- Brief case: https://www.figma.com/design/1S4Mzx3eukoGHvP452UMok/Tatiana-Kapkaeva--lastest-?node-id=2471-69
- Miro board: https://miro.com/app/board/uXjVH5AXiqE=/ (before widget 3458764685883706453; after 3458764685883706767; older screens 3458764685884999337; visual reduction 3458764685884999339).
- User-supplied simplified process map and compressed PDF.

## Exported Figma screens

The original seven screens below are Figma exports. Earlier migration detail images are crops from the user-supplied migration map; the source overview remains available. No generated UI is used.

| File | Figma node | Content |
| --- | --- | --- |
| registration.png | 1:39747 | IB signup |
| profile.png | 95:16376 | Personal details and agreement |
| experience.png | 1:27046 | Experience branching question |
| acquisition-channels.png | 1:27555 | Acquisition channels question |
| verification.png | 399:123841 | Consent to begin verification |
| rejection.png | 1:44512 | Application declined |
| dashboard.jpg | 1:41386 | Portal before approval |

The hero now pairs signup and portal screenshots without cropping. Source maps use a full, contained overview and open fitted to the viewer. The viewer supports incremental zoom, 100%, fit, opening the original, keyboard close and focus restoration.

## Evidence boundaries

- 10–20% is the smaller-partner segment's share of program profit, not uplift from this work.
- No conversion uplift, revenue increase, numerical step-reduction percentage, or full rollout is claimed.
- Transparent/deferred signup variants are backlog. The timing of the country question is one of those variants.
- Country exceptions are described as part of the working map. Referral visibility, detailed permissions, risk triggers and provider coverage are not asserted as universally released rules.
- Screen examples focus on the individual IB path. They do not substitute for detailed business-document requirements.
- The PDF remains an optional archive link. It is not embedded or preloaded.

## Verification

Production build and targeted lint are required after edits. Browser checks cover light/dark desktop and phone layouts, section anchors, image fit/actual-size controls, close/focus restoration, archive disclosure and no page overflow.

The repository-wide TypeScript check currently reports errors in unchanged `src/lib/projects.ts`, `src/routes/__root.tsx` and `src/routes/work.$slug.tsx`; no errors were reported in the new case component.


## October 6 editorial revision

Sequence follows the user's supplied narrative: Context (two lead-loss barriers and Before), What I did (competitor analysis, three risk-based steps, After, small-partner contribution), service/operational design, migration overview + existing step-by-step explanation, account registration, personal details, early portal access, questionnaire branches, delivery and outcome.

The user supplied the findings **1 of 10 direct competitors with a similarly closed model**, **10–20% of IB-program profit from smaller partners**, the **fewer-than-five-client entry barrier**, and **a week or more before access**. These are attributed to project/PO research, not presented as independently verified benchmarks or post-launch uplift.

Only verified external research is used: https://www.signicat.com/the-battle-to-onboard-2022 reports 68% of 7,600 consumers from 14 countries abandoned a financial application in the prior year. It does NOT establish that 63% left because documents were requested early. The requested Baymard/McKinsey/Deloitte and provider-specific percentage claims were not added without matching sources.

### New source assets

Figma source file: `v5RtEFFbIjFlkZpxMqEDDx`.
- signup-new.png: `40002036:51224`; signup-mobile.png: `40002055:73819` (2x). Both are inside `40002039:68586`, titled future development. The display identifies these as signup evolution, not shipped functionality.
- portal-access.png: `40002039:59245`
- application-deadline.png: `40002039:63138`; application-reminder.png: `362:113834`
- risk-application.png: `496:44140`; risk-review.png: `277:30683`
- call-request.png: `1:29576`; review-contacts.png: `277:29899`
- experienced-markets.png: `284:41939`; new-partner-plan.png: `183:22455`

User-provided PNGs copied without pixel changes:
- migration-overview.png — attachment 1, 15150×3834
- registration-flow.png — attachment 2, 4257×5435
- account-details.png — attachment 3, 1280×1132
- account-details-flow.png — attachment 4, 5863×10918
- portal-overview.png / portal-status.png — attachments 5/6, 1280×736
- portal-followup-flow.png — attachment 7, 6798×5104

An operations-department diagram was mentioned as a forthcoming attachment; none of these seven images is that diagram. Do not mislabel the registration map as an operations flow. Add the operations diagram below the service-design copy when supplied.

Country rules and account follow-up text were checked against nodes `1:32398` and `1:41385`. N/X days are placeholders, not published deadlines. Coverage for manager calls is a separate routing condition from risk category. Notes in `131:18683` explain short-form + interview vs full written-form paths, with separate prior-experience branches and answers sent to CRM. Existing questionnaire diagrams are retained for the user's next revision.

Desktop/mobile signup reveal uses the existing useSectionReveal hook with reduced-motion support. Authentication credentials used for source reads are not stored in project files.

Verification of this revision: production build and targeted ESLint passed; desktop light and mobile dark screenshots checked. Mobile width 390px matched document width (no horizontal page overflow). Map viewer opened fitted, incremental zoom changed the displayed size, 100% remained within the mobile dialog bounds, and fit/close controls worked. Browser error log was empty. Temporary viewport override and theme change were restored.

### Existing-partner migration revision

The migration sequence now keeps its supporting communication beside the relevant interface state: consent includes both the modal and the in-product reminder; the internal licence-to-licence transfer is an explicit interim step; the old-area closure includes the late-consent route; and email callouts explain the portal link, sign-in confirmation and new-password reminder. The former separate “Two ways back to the main journey” group has been removed after its two screens were incorporated into the first two steps.

Verification: production build and targeted ESLint passed. The migration section was checked in the browser with four email communication cards, no delayed-route group, and a 390px-wide layout with no horizontal overflow. The preview viewport was restored after the check.
