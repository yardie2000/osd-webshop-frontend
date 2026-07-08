# OSD Webshop Frontend

Statisches Conversion-Frontend für den OSD-Anlageverkauf unter:

```text
https://webshop.osd-bln.com/
```

Der eigentliche Shop, Warenkorb und Checkout laufen weiterhin über den STRATO Webshop mit Store-ID `137903522`.

## Cloudflare Pages

```text
Build command: npm run build
Build output directory: dist
```

## STRATO Shop Embed

Die Shop-Integration befindet sich in `index.html` und nutzt:

```text
https://app.ecp.strato.de/script.js?137903522&data_platform=code&data_date=2026-07-08
```

Weitere Schritte stehen in `DEPLOYMENT.md`.
