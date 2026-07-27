# JS Engineering Portfolio

Ein statisches, responsives Engineering-Portfolio mit heller
Hardware-Ästhetik, dezenten technischen Zeichnungen und umschaltbarem
Dark Mode. Die Seite benötigt weder ein Framework noch einen Build-Schritt.

## Lokal starten

### Variante 1: Python

1. PowerShell in diesem Ordner öffnen.
2. Den lokalen Server starten:

   ```powershell
   python -m http.server 8080
   ```

3. Im Browser `http://localhost:8080` öffnen.
4. Beenden mit `Strg + C`.

### Variante 2: Visual Studio Code

Die Erweiterung **Live Server** installieren, anschließend auf `index.html`
rechtsklicken und **Open with Live Server** wählen.

`index.html` nicht nur per Doppelklick öffnen: Ein lokaler Server verhält sich
genauso wie das spätere Onlinehosting und vermeidet Probleme mit Browser-
Sicherheitsregeln.

## Inhalte anpassen

- Texte, Projekte und Navigation: `index.html`
- Farben, Abstände und Layout: `styles.css`
- Maus-, Scroll- und Aufklapp-Interaktionen: `script.js`
- Freigestellte Projektvisuals: `assets/simwheel-v2.png` und `assets/vtol-v3.png`
- Logo: `assets/brand-mark.jpg`

Im Kontaktbereich steht aktuell bewusst keine erfundene E-Mail-Adresse. Für
einen echten Kontaktbutton kann in `index.html` zum Beispiel Folgendes
eingesetzt werden:

```html
<a href="mailto:deine-adresse@example.com">Projekt besprechen</a>
```

## Online veröffentlichen

Da die Website rein statisch ist, kann der gesamte Ordner direkt veröffentlicht
werden. Wichtig: `index.html` muss im obersten veröffentlichten Verzeichnis
liegen.

### [GitHub Pages](https://docs.github.com/de/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

1. Ein neues GitHub-Repository anlegen.
2. Den kompletten Inhalt dieses Ordners committen und pushen.
3. Im Repository **Settings → Pages** öffnen.
4. Unter **Build and deployment** die Option **Deploy from a branch** wählen.
5. Branch `main` und Ordner `/ (root)` auswählen und speichern.
6. Nach dem Deployment erscheint dort die öffentliche URL.

Für eine eigene Domain in Pages unter **Custom domain** die Domain eintragen
und die dort angezeigten DNS-Einträge beim Domainanbieter setzen.

### [Netlify](https://docs.netlify.com/deploy/create-deploys/#drag-and-drop)

1. Bei Netlify anmelden.
2. Unter **Add new site** entweder das GitHub-Repository importieren oder den
   Website-Ordner per Drag-and-drop bereitstellen.
3. Für diese Seite sind Build command und Publish directory nicht nötig; beim
   Repository-Import ist das Projekt-Root das Veröffentlichungsverzeichnis.
4. Nach dem Deployment kann unter **Domain management** eine eigene Domain
   verbunden werden.

### [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/direct-upload/)

1. In Cloudflare unter **Workers & Pages** die Option **Create application**
   öffnen.
2. **Get started → Drag and drop your files** wählen.
3. Den Website-Ordner oder ein ZIP mit seinem Inhalt hochladen und **Deploy
   site** wählen. Ein Build ist für dieses Projekt nicht nötig.
4. Unter **Custom domains** kann anschließend die eigene Domain verbunden
   werden.

## Vor dem Veröffentlichen

- Eigene Kontaktdaten und gegebenenfalls Social-Links ergänzen.
- Projektbeschreibungen und Statusangaben final prüfen.
- Seitentitel und Beschreibung im `<head>` von `index.html` personalisieren.
- Falls gewünscht Datenschutz/Impressum als eigene Seiten ergänzen.
- Die Website einmal auf Smartphone und Desktop testen.

## Optimierung

Die generierten PNGs sind bewusst hochauflösend. Für einen besonders schnellen
Produktivbetrieb können sie später als WebP/AVIF exportiert und die Dateiverweise
in `index.html` angepasst werden.
