# Azure Static Web Apps + Function Backend Demo

Eine vollständige Demo-Anwendung für **M346 - Azure Static Web Apps mit Azure Functions Backend**.

## 📋 Projekt-Übersicht

Dieses Projekt demonstriert die Integration von:
- ✅ **Frontend**: Statische Webseite (HTML, CSS, JavaScript)
- ✅ **Backend**: Azure Functions (Node.js)
- ✅ **CI/CD**: Automatisches Deployment via GitHub Actions
- ✅ **Hosting**: Azure Static Web Apps

## 🎯 Was ist Azure Static Web Apps?

Azure Static Web Apps ist ein Service, der:
- **Statische Webseiten** automatisch aus einem Git-Repository baut und bereitstellt
- **Serverlose APIs** (Azure Functions) nahtlos integriert
- **CI/CD** über GitHub Actions bereitstellt
- **Kostenlose SSL-Zertifikate** und **globales CDN** bietet
- **Staging-Umgebungen** für Pull Requests automatisch erstellt

## 🚀 Wofür wird es genutzt?

1. **Single-Page Applications** (React, Vue, Angular, Svelte)
2. **Progressive Web Apps** mit Offline-Funktionalität
3. **Blogs & Dokumentation** (Hugo, Jekyll, Gatsby, VuePress)
4. **Landing Pages & Marketing-Websites**
5. **E-Commerce Frontends** mit serverlosem Backend
6. **Portfolio-Websites** mit dynamischen Features

## 📁 Projekt-Struktur

```
M346/
├── index.html                  # Frontend HTML
├── styles.css                  # Frontend Styling
├── app.js                      # Frontend JavaScript
├── staticwebapp.config.json    # Azure Static Web App Konfiguration
├── .gitignore                  # Git Ignore-Datei
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # CI/CD Workflow
└── api/                        # Azure Functions Backend
    ├── host.json               # Functions Host-Konfiguration
    ├── package.json            # Node.js Dependencies
    ├── local.settings.json     # Lokale Einstellungen
    ├── .gitignore              # API Git Ignore
    └── src/
        └── functions/
            ├── message.js      # API Endpunkt: /api/message
            └── greet.js        # API Endpunkt: /api/greet
```

## 🔧 Voraussetzungen

### Lokale Entwicklung:
- [Node.js](https://nodejs.org/) (v18 oder höher)
- [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Static Web Apps Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)

### Deployment:
- [Azure Account](https://azure.microsoft.com/free/) (kostenlos)
- [GitHub Account](https://github.com/)

## 🛠️ Setup-Anleitung

### Schritt 1: Repository einrichten

1. Erstellen Sie ein neues GitHub Repository
2. Initialisieren Sie Git in diesem Projekt:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit: Azure Static Web App Demo"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### Schritt 2: Azure Static Web App erstellen

#### Option A: Via VS Code Extension (Empfohlen)

1. Installieren Sie die **Azure Static Web Apps Extension** in VS Code
2. Öffnen Sie die Azure-Extension (Seitenleiste)
3. Klicken Sie auf **"+"** bei Static Web Apps
4. Folgen Sie dem Assistenten:
   - Wählen Sie Ihr Azure-Abonnement
   - Geben Sie einen Namen ein (z.B. `m346-demo`)
   - Wählen Sie eine Region (z.B. `West Europe`)
   - Wählen Sie **"Custom"** als Build-Preset
   - **App location**: `/` (root)
   - **API location**: `api`
   - **Output location**: `` (leer lassen)

#### Option B: Via Azure Portal

1. Gehen Sie zu [portal.azure.com](https://portal.azure.com)
2. Erstellen Sie eine neue **Static Web App**
3. Verbinden Sie Ihr GitHub Repository
4. Konfigurieren Sie:
   - **App location**: `/`
   - **API location**: `api`
   - **Output location**: `` (leer)

### Schritt 3: Automatisches Deployment

Nach der Erstellung wird automatisch:
- Ein GitHub Actions Workflow in `.github/workflows/` erstellt
- Ein Deployment-Token als GitHub Secret hinzugefügt
- Die App bei jedem Push automatisch deployt

### Schritt 4: Lokale Entwicklung (Optional)

1. **Azure Functions Core Tools installieren**:
   ```powershell
   npm install -g azure-functions-core-tools@4 --unsafe-perm true
   ```

2. **Static Web Apps CLI installieren**:
   ```powershell
   npm install -g @azure/static-web-apps-cli
   ```

3. **App lokal starten**:
   ```powershell
   swa start . --api-location api
   ```

4. Öffnen Sie: `http://localhost:4280`

## 🎨 Features der Demo-App

### Frontend Features:
- 📱 Responsive Design
- 🎨 Modernes UI mit Gradients und Animationen
- 📊 Informative Architektur-Diagramme
- ✨ Interaktive API-Tests

### Backend API Endpunkte:

#### GET `/api/message`
Gibt eine einfache Nachricht mit Timestamp zurück.

**Response:**
```json
{
  "message": "Hallo von Azure Functions! 🚀",
  "timestamp": "2025-12-10T10:30:00.000Z",
  "backend": "Azure Functions",
  "status": "success"
}
```

#### GET `/api/greet?name=Max`
Gibt eine personalisierte Begrüßung zurück.

**Response:**
```json
{
  "greeting": "Willkommen, Max! 👋",
  "name": "Max",
  "timestamp": "2025-12-10T10:30:00.000Z",
  "backend": "Azure Functions"
}
```

## 📊 Architektur

```
┌─────────────────────┐
│ GitHub Repository   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ GitHub Actions      │ (CI/CD)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Azure Static Web    │
│      Apps           │
└──────┬──────────┬───┘
       │          │
       ▼          ▼
┌──────────┐  ┌──────────┐
│ Frontend │  │   API    │
│  (CDN)   │  │(Functions)│
└──────────┘  └──────────┘
```

## 🌐 Deployment & URLs

Nach dem Deployment erhalten Sie:
- **Production URL**: `https://<app-name>.azurestaticapps.net`
- **Staging URLs**: Automatisch für jeden Pull Request

## 💰 Kosten

Azure Static Web Apps bietet:
- **Free Tier**: 
  - 100 GB Bandbreite/Monat
  - 0.5 GB Speicher
  - 2 Custom Domains
  - Azure Functions Integration (500.000 Requests/Monat)
  - **Ideal für Demos und kleine Projekte!**

## 📚 Zusätzliche Ressourcen

- [Azure Static Web Apps Dokumentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Functions Dokumentation](https://docs.microsoft.com/azure/azure-functions/)
- [GitHub Actions Dokumentation](https://docs.github.com/actions)

## 🎓 M346 Team-Präsentation

### Wichtige Punkte für die Präsentation:

1. **Was ist es?**
   - Hosting-Service für moderne Web-Apps
   - Kombiniert statisches Frontend mit serverlosem Backend
   - Automatisches CI/CD

2. **Wofür wird es genutzt?**
   - SPAs, PWAs, Blogs, Landing Pages
   - Schnelle und kostengünstige Web-Deployments
   - Prototyping und Production-Apps

3. **Vorteile:**
   - ✅ Einfaches Setup (wenige Klicks)
   - ✅ Automatisches Deployment
   - ✅ Kostenloser Free Tier
   - ✅ Globales CDN (schnell weltweit)
   - ✅ HTTPS automatisch
   - ✅ Staging-Umgebungen für PRs

4. **Demo:**
   - Zeigen Sie die Live-Website
   - Demonstrieren Sie die API-Funktionalität
   - Zeigen Sie das Azure Portal
   - Zeigen Sie GitHub Actions Workflow

## 🐛 Troubleshooting

### API funktioniert nicht lokal?
- Stellen Sie sicher, dass Azure Functions Core Tools installiert sind
- Verwenden Sie `swa start` statt direkt die `index.html` zu öffnen

### Deployment schlägt fehl?
- Prüfen Sie die GitHub Actions Logs
- Stellen Sie sicher, dass das API Token korrekt ist
- Überprüfen Sie die `staticwebapp.config.json`

### CORS-Fehler?
- Lokale Entwicklung: Verwenden Sie `swa start`
- Production: Static Web Apps handhabt CORS automatisch

## 👥 Team-Information

- **Projekt**: M346 - Azure Cloud Services
- **Thema**: Azure Static Web Apps + Function Backend
- **Erstellt**: Dezember 2025

## 📝 Lizenz

Dieses Demo-Projekt ist für Bildungszwecke erstellt.

---

**Viel Erfolg bei Ihrer Präsentation! 🚀**
