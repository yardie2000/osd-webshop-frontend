# OSD Webshop Frontend Deployment

Stand: 2026-07-08

## Zielarchitektur

- Frontend: Cloudflare Pages
- Öffentliche Domain: `https://webshop.osd-bln.com/`
- DNS: STRATO Domainverwaltung
- Shop-Backend, Warenkorb, Checkout und Bestellungen: STRATO Webshop / Store-ID `137903522`
- Aktuelle öffentliche Shop-Seite: `https://osd-bln.com/`
- Geplante Frontend-/Shop-Subdomain: `https://webshop.osd-bln.com/`

Hinweis: `webshop.osd-bln.com` ist vor dem Cloudflare/STRATO-DNS-Schritt erwartbar noch nicht online. Das Frontend nutzt die STRATO-Embed-Integration, damit Warenkorb und Checkout weiterhin im STRATO-Shop laufen.

## Cloudflare Pages

1. In Cloudflare `Workers & Pages` öffnen.
2. `Create application` und `Pages` wählen.
3. Repository verbinden oder diesen Ordner als Direct Upload verwenden.
4. Build konfigurieren:
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: Projektwurzel
   - Environment variables: keine erforderlich
5. Deploy ausführen.
6. Nach erfolgreichem Deploy die `*.pages.dev` URL kurz prüfen.

## Custom Domain

1. Im Cloudflare-Pages-Projekt `Custom domains` öffnen.
2. `Set up a custom domain` wählen.
3. `webshop.osd-bln.com` eintragen.
4. Den von Cloudflare angezeigten CNAME-Zielwert notieren, z. B. `osd-webshop-frontend.pages.dev`.
5. Setup nicht abbrechen; Cloudflare erwartet, dass die Custom Domain im Pages-Projekt registriert ist.

## STRATO DNS

1. STRATO Kunden-Login öffnen.
2. `Domains` > `Domainverwaltung` öffnen.
3. Domain `osd-bln.com` auswählen.
4. Subdomain `webshop` anlegen, falls sie noch nicht existiert.
5. DNS-Einstellungen der Subdomain öffnen.
6. `TXT- und CNAME-Records` bzw. `CNAME-Record` verwalten.
7. CNAME für `webshop.osd-bln.com` auf den von Cloudflare angezeigten Pages-Zielwert setzen.
8. Änderungen speichern.
9. DNS-Ausbreitung abwarten und prüfen:
   - `Resolve-DnsName webshop.osd-bln.com`
   - Browser: `https://webshop.osd-bln.com/`
   - SSL-Zertifikat muss von Cloudflare/Google Trust Services bzw. Cloudflare-kompatibler CA ausgeliefert werden.

Kein STRATO Wildcard-SSL einplanen. SSL läuft für diese Subdomain über Cloudflare Pages Custom Domain.

## Canonical, Redirects und SEO

- Canonical: `https://webshop.osd-bln.com/`
- Sitemap: `https://webshop.osd-bln.com/sitemap.xml`
- Robots: `https://webshop.osd-bln.com/robots.txt`
- `_headers` setzt sichere Basis-Header ohne harte CSP, damit STRATO-Shop-Skripte nicht blockiert werden.
- `_redirects` leitet einfache Alias-Pfade `/shop`, `/katalog`, `/produkte` auf die Startseite.

## Backendseitig vor Go-live prüfen

- Öffentliche Produktdetail-URLs im STRATO-Shop öffnen und prüfen.
- Warenkorb: Produkt hinzufügen, Menge prüfen, wieder entfernen.
- Checkout: bis zur Zahlungs-/Kundendatenstufe testen, keine Testbestellung auslösen.
- Lagerbestand je Einzelstück im STRATO-Backend auf realistische verfügbare Menge setzen.
- Verkaufte Produkte im STRATO-Shop deaktivieren oder als nicht verfügbar markieren.
- Impressum, Datenschutz, AGB und Widerrufs-/B2B-Hinweise im STRATO-Shop prüfen.
- Nach DNS-Aktivierung `https://webshop.osd-bln.com/` als Shop-Webadresse im STRATO-Backend prüfen, damit Rechnungen und E-Mail-Benachrichtigungen die korrekte öffentliche URL zeigen.

## Aktualisierung Produktkatalog

Produktdaten bleiben im STRATO-Shop die Single Source of Truth. Änderungen an Produkten, Preisen, Bildern, Verfügbarkeit und Checkout werden im STRATO-Backend gepflegt. Das Cloudflare-Frontend lädt den Katalog über das STRATO-Script:

```html
<script src="https://app.ecp.strato.de/script.js?137903522&data_platform=code&data_date=2026-07-08"></script>
```

Nach größeren Produktänderungen im STRATO-Backend die Cloudflare-Seite im Inkognito-Fenster prüfen und bei Bedarf Cloudflare Cache leeren.
