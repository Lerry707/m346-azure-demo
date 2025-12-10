// Azure Static Web App Demo - Frontend JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // API Test Button
    const testApiBtn = document.getElementById('testApiBtn');
    const apiResult = document.getElementById('apiResult');

    testApiBtn.addEventListener('click', async () => {
        showLoading(apiResult, 'API wird aufgerufen...');
        
        try {
            const response = await fetch('/api/message');
            const data = await response.json();
            
            if (response.ok) {
                showSuccess(apiResult, `
                    <strong>✅ Erfolg!</strong><br>
                    <strong>Nachricht:</strong> ${data.message}<br>
                    <strong>Zeitstempel:</strong> ${new Date(data.timestamp).toLocaleString('de-DE')}<br>
                    <strong>Backend:</strong> Azure Functions
                `);
            } else {
                showError(apiResult, 'Fehler beim API-Aufruf: ' + data.message);
            }
        } catch (error) {
            showError(apiResult, `
                ⚠️ API-Endpunkt noch nicht verfügbar.<br>
                <small>Hinweis: Deployen Sie die App zu Azure, damit die Functions funktionieren.</small><br>
                <small>Fehler: ${error.message}</small>
            `);
        }
    });

    // Greet Button
    const greetBtn = document.getElementById('greetBtn');
    const nameInput = document.getElementById('nameInput');
    const greetResult = document.getElementById('greetResult');

    greetBtn.addEventListener('click', async () => {
        const name = nameInput.value.trim();
        
        if (!name) {
            showError(greetResult, 'Bitte geben Sie einen Namen ein!');
            return;
        }

        showLoading(greetResult, 'Nachricht wird erstellt...');
        
        try {
            const response = await fetch(`/api/greet?name=${encodeURIComponent(name)}`);
            const data = await response.json();
            
            if (response.ok) {
                showSuccess(greetResult, `
                    <strong>🎉 ${data.greeting}</strong><br>
                    <small>Erstellt am: ${new Date(data.timestamp).toLocaleString('de-DE')}</small>
                `);
            } else {
                showError(greetResult, 'Fehler: ' + data.message);
            }
        } catch (error) {
            showError(greetResult, `
                ⚠️ API-Endpunkt noch nicht verfügbar.<br>
                <small>Hinweis: Nach dem Deployment zu Azure wird diese Funktion aktiviert.</small><br>
                <small>Fehler: ${error.message}</small>
            `);
        }
    });

    // Enter key support for name input
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            greetBtn.click();
        }
    });
});

// Helper functions for result display
function showLoading(element, message) {
    element.className = 'result-box show loading';
    element.innerHTML = `<span>⏳ ${message}</span>`;
}

function showSuccess(element, message) {
    element.className = 'result-box show success';
    element.innerHTML = message;
}

function showError(element, message) {
    element.className = 'result-box show error';
    element.innerHTML = message;
}
