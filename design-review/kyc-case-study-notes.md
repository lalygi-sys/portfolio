# KYC/KYB case: editorial implementation

The dedicated presentation is in `src/components/portfolio/KycCaseStudy.tsx`; its styles are scoped in `kyc-case-study.css`. Other cases retain the shared renderer. Admin draft previews retain the editable generic case renderer.

## Source material

- User account: old broker registration → application → waiting → interview → approval → portal; new main journey gives earlier portal access and requires application/document verification for withdrawal. User led legal collaboration, operational changes, handoff and implementation oversight.
- Figma design file: https://www.figma.com/design/v5RtEFFbIjFlkZpxMqEDDx/IB-KYC-onboarding--Copy-?node-id=0-1
- Brief case: https://www.figma.com/design/1S4Mzx3eukoGHvP452UMok/Tatiana-Kapkaeva--lastest-?node-id=2471-69
- Miro board: https://miro.com/app/board/uXjVH5AXiqE=/ (before widget 3458764685883706453; after 3458764685883706767; older screens 3458764685884999337; visual reduction 3458764685884999339).
- User-supplied simplified process map and compressed PDF.

## Exported Figma screens

All images in `public/images/projects/kyc` are unmodified node exports at the node's configured/default resolution. No generated UI is used.

| File | Figma node | Content |
| --- | --- | --- |
| registration.png | 1:39747 | IB signup |
| profile.png | 95:16376 | Personal details and agreement |
| experience.png | 1:27046 | Experience branching question |
| acquisition-channels.png | 1:27555 | Acquisition channels question |
| verification.png | 399:123841 | Consent to begin verification |
| rejection.png | 1:44512 | Application declined |
| dashboard.jpg | 1:41386 | Portal before approval |

The hero crops the dashboard preview; its viewer always starts with the complete image fitted to the screen. Other images are shown without cropping. The viewer offers actual size, fit, and opening the original in a new tab, with keyboard close and focus restoration.

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
