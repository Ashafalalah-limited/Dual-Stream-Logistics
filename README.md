# Dual Stream Logistics

Safe. Secure. Temperature-Controlled.

Enterprise dark-mode logistics intelligence app built with Expo Router.

## Demo modules included

- Splash + secure authentication flow
- Shipment Lifecycle Management
- Cold Chain Compliance Monitoring
- Fleet Visibility & Asset Control
- Route / Network Visibility Map
- Operational Intelligence & Reporting
- Customer dashboard
- Driver dashboard
- Support pages (About, Contact, Help, Privacy, Terms)

## Roles and access

- Public signup roles: `customer`, `driver`
- Admin is hidden and only available through internal credentials
- Role cannot be changed after signup

Demo admin login:

- Email: `ops.admin@dualstreamlogistics.com`
- Password: `DSL-Internal-2026`

## Run locally

```bash
npm install
npm run start
```

## Build Android APK (EAS)

1. Install EAS CLI:

```bash
npm install -g eas-cli
```

2. Login and configure project:

```bash
eas login
eas build:configure
```

3. Build APK (internal preview profile):

```bash
npm run build:apk
```

4. Build Play Store AAB:

```bash
npm run build:aab
```

## Lint

```bash
npm run lint
```
# Dual-Stream-Logistics
