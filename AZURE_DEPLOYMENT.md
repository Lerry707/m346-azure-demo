# 🚀 Azure Static Web App Deployment - Schritt-für-Schritt

## Übersicht
Diese Anleitung zeigt Ihnen, wie Sie Ihre Web-App in Azure bereitstellen - ähnlich wie GitLab Pages, aber mit Azure Static Web Apps.

## 📋 Voraussetzungen

1. **Azure Account** (kostenlos):
   - Gehen Sie zu: https://azure.microsoft.com/free/
   - Registrieren Sie sich mit Ihrer E-Mail
   - Erhalten Sie $200 Guthaben + 12 Monate kostenlose Services

2. **GitHub Account** (kostenlos):
   - https://github.com/
   - Azure Static Web Apps nutzt GitHub für CI/CD

3. **VS Code Extension**:
   - Installieren Sie: "Azure Static Web Apps" Extension

---

## 🎯 Methode 1: Via VS Code Extension (EINFACHSTE METHODE)

### Schritt 1: Extension installieren
1. Öffnen Sie VS Code
2. Gehen Sie zu Extensions (Ctrl+Shift+X)
3. Suchen Sie: **"Azure Static Web Apps"**
4. Klicken Sie auf **Install**

### Schritt 2: Azure Sign-In
1. Drücken Sie `F1` oder `Ctrl+Shift+P`
2. Suchen Sie: **"Azure: Sign In"**
3. Melden Sie sich mit Ihrem Azure-Account an

### Schritt 3: Repository zu GitHub pushen
```powershell
# Terminal öffnen in VS Code (Ctrl + `)
git init
git add .
git commit -m "Initial commit: Azure Static Web App"
git branch -M main

# Erstellen Sie ein neues Repository auf GitHub.com
# Dann verbinden Sie es:
git remote add origin https://github.com/IhrUsername/IhrRepoName.git
git push -u origin main
```

### Schritt 4: Static Web App erstellen
1. Öffnen Sie die **Azure Extension** in VS Code (Sidebar)
2. Erweitern Sie **"Static Web Apps"**
3. Klicken Sie auf das **"+"** Symbol
4. Folgen Sie dem Wizard:
   - **Subscription**: Wählen Sie Ihr Azure-Abonnement
   - **Name**: z.B. `m346-demo-webapp`
   - **Region**: `West Europe` (oder `Switzerland North`)
   - **Build Preset**: Wählen Sie **"Custom"**
   - **App location**: `/` (Eingabe: ein einzelner Slash)
   - **API location**: `api`
   - **Output location**: `` (leer lassen - einfach Enter drücken)

### Schritt 5: Warten auf Deployment
- VS Code erstellt automatisch die GitHub Actions Workflow-Datei
- GitHub Actions startet automatisch das Deployment
- Nach 2-3 Minuten ist Ihre App live!

### Schritt 6: URL abrufen
1. In VS Code → Azure Extension → Static Web Apps
2. Rechtsklick auf Ihre App → **"Browse Site"**
3. Oder im Azure Portal die URL kopieren

---

## 🎯 Methode 2: Via Azure Portal (Web-Interface)

### Schritt 1: GitHub Repository erstellen
1. Gehen Sie zu https://github.com/
2. Klicken Sie auf **"New Repository"**
3. Name: z.B. `m346-azure-demo`
4. **Public** Repository (für Free Tier)
5. Erstellen Sie das Repository

### Schritt 2: Code zu GitHub pushen
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/IhrUsername/m346-azure-demo.git
git push -u origin main
```

### Schritt 3: Azure Portal öffnen
1. Gehen Sie zu: https://portal.azure.com/
2. Melden Sie sich an

### Schritt 4: Static Web App erstellen
1. Klicken Sie auf **"+ Create a resource"** (oben links)
2. Suchen Sie nach: **"Static Web App"**
3. Klicken Sie auf **"Create"**

### Schritt 5: Konfiguration
**Basics Tab:**
- **Subscription**: Ihre Azure-Subscription
- **Resource Group**: Neu erstellen → z.B. `rg-m346-demo`
- **Name**: `m346-webapp` (global eindeutig!)
- **Plan type**: **Free** (für Demos perfekt)
- **Region**: `West Europe` oder `Switzerland North`

**Deployment details:**
- **Source**: **GitHub**
- Klicken Sie auf **"Sign in with GitHub"**
- Autorisieren Sie Azure
- **Organization**: Ihr GitHub-Username
- **Repository**: Wählen Sie Ihr Repository
- **Branch**: `main`

**Build Details:**
- **Build Presets**: **Custom**
- **App location**: `/`
- **Api location**: `api`
- **Output location**: `` (leer lassen)

### Schritt 6: Erstellen
1. Klicken Sie auf **"Review + create"**
2. Klicken Sie auf **"Create"**
3. Warten Sie 2-3 Minuten

### Schritt 7: Deployment überwachen
1. Nach der Erstellung klicken Sie auf **"Go to resource"**
2. Sie sehen die **URL** Ihrer App
3. Klicken Sie auf **"GitHub Action runs"** um das Deployment zu sehen

---

## 🎯 Methode 3: Via Azure CLI (Für Fortgeschrittene)

### Installation
```powershell
# Azure CLI installieren
winget install Microsoft.AzureCLI
```

### Login
```powershell
az login
```

### Static Web App erstellen
```powershell
# Resource Group erstellen
az group create --name rg-m346-demo --location westeurope

# Static Web App erstellen
az staticwebapp create \
  --name m346-webapp \
  --resource-group rg-m346-demo \
  --source https://github.com/IhrUsername/IhrRepo \
  --location westeurope \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "" \
  --login-with-github
```

---

## 📊 Vergleich: GitLab vs Azure Static Web Apps

| Feature | GitLab Pages | Azure Static Web Apps |
|---------|--------------|----------------------|
| **Hosting** | Statische Sites | Statische Sites + API |
| **Backend** | ❌ Nein | ✅ Azure Functions |
| **CI/CD** | GitLab CI | GitHub Actions |
| **SSL** | ✅ Kostenlos | ✅ Kostenlos |
| **Custom Domain** | ✅ | ✅ |
| **Staging** | Manual | ✅ Automatisch (PR) |
| **Kosten (Free)** | Unbegrenzt | 100GB/Monat |

---

## ✅ Nach dem Deployment

### Ihre App-URLs:
- **Production**: `https://<app-name>.azurestaticapps.net`
- **Staging**: Automatisch für jeden Pull Request

### App verwalten:
1. **Azure Portal**: portal.azure.com → Static Web Apps
2. **VS Code**: Azure Extension → Static Web Apps
3. **GitHub**: Actions Tab für Deployment-Logs

### Konfiguration ändern:
- Bearbeiten Sie `staticwebapp.config.json`
- Commit & Push → Automatisches Deployment

### Logs ansehen:
```powershell
# Via Azure CLI
az staticwebapp logs show --name m346-webapp --resource-group rg-m346-demo
```

---

## 🔧 Troubleshooting

### Problem: Deployment schlägt fehl
**Lösung:**
1. Überprüfen Sie GitHub Actions Logs
2. Gehen Sie zu: GitHub Repository → Actions Tab
3. Klicken Sie auf den fehlgeschlagenen Workflow
4. Lesen Sie die Fehlermeldung

### Problem: API funktioniert nicht
**Lösung:**
1. Überprüfen Sie die Struktur: `/api/src/functions/*.js`
2. Überprüfen Sie `api/package.json`
3. Schauen Sie in Azure Portal → Your Static Web App → Functions

### Problem: "Repository not found"
**Lösung:**
1. GitHub App Permissions überprüfen
2. Azure in GitHub Settings autorisieren
3. Settings → Applications → Azure Static Web Apps

### Problem: Site lädt nicht
**Lösung:**
1. Warten Sie 2-3 Minuten nach Deployment
2. Cache leeren (Ctrl+F5)
3. Überprüfen Sie den Deployment-Status in GitHub Actions

---

## 💡 Tipps für die M346-Präsentation

### Live-Demo vorbereiten:
1. ✅ App bereits deployed haben
2. ✅ URL in Präsentation einbauen
3. ✅ Azure Portal offen haben
4. ✅ GitHub Actions zeigen

### Was demonstrieren:
1. **Live-Website** aufrufen
2. **API-Funktionen** testen (Buttons klicken)
3. **Azure Portal** zeigen:
   - Resource Overview
   - URL und Settings
   - Functions Integration
4. **GitHub Actions** zeigen:
   - Automatisches Deployment
   - Build-Logs
5. **Staging-Umgebung** erklären (PR → automatische Preview)

### Vorteile hervorheben:
- ⚡ Schnelles Setup (10 Minuten)
- 🆓 Kostenloser Free Tier
- 🔄 Automatisches CI/CD
- 🌍 Globales CDN (schnell weltweit)
- 🔒 Automatisches HTTPS
- 🚀 Serverless Backend inklusive

---

## 📚 Weitere Ressourcen

- **Dokumentation**: https://docs.microsoft.com/azure/static-web-apps/
- **Preise**: https://azure.microsoft.com/pricing/details/app-service/static/
- **Tutorials**: https://docs.microsoft.com/learn/paths/azure-static-web-apps/
- **Support**: https://github.com/Azure/static-web-apps/issues

---

## 🎓 Checkliste für Ihr Team

- [ ] Azure Account erstellt
- [ ] GitHub Repository erstellt
- [ ] Code zu GitHub gepusht
- [ ] Static Web App in Azure erstellt
- [ ] Deployment erfolgreich
- [ ] Website getestet (Frontend)
- [ ] API getestet (Backend Functions)
- [ ] URL für Präsentation gespeichert
- [ ] Screenshots für Dokumentation gemacht
- [ ] Präsentation vorbereitet

---

**Viel Erfolg beim Deployment! 🚀**

Bei Fragen: Azure-Dokumentation konsultieren oder im Team besprechen.
