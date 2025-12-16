// Azure Static Web App Demo - Enhanced JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    initNavigation();
    
    // Initialize all API demos
    initMessageDemo();
    initGreetDemo();
    initTimeDemo();
    initRandomDemo();
});

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Demo 1: Simple Message API
function initMessageDemo() {
    const btn = document.getElementById('testApiBtn');
    const resultBox = document.getElementById('apiResult');
    
    btn.addEventListener('click', async () => {
        showLoading(resultBox, 'API wird aufgerufen...');
        
        try {
            const response = await fetch('/api/message');
            const data = await response.json();
            
            if (response.ok) {
                showSuccess(resultBox, `
                    <strong>✅ Erfolg!</strong><br>
                    <strong>Nachricht:</strong> ${data.message}<br>
                    <strong>Zeitstempel:</strong> ${new Date(data.timestamp).toLocaleString('de-DE')}<br>
                    <strong>Backend:</strong> ${data.backend}<br>
                    <strong>Status:</strong> ${data.status}
                    ${data.executionInfo ? `
                    <div style="margin-top: 15px; padding: 15px; background: rgba(102, 126, 234, 0.1); border-radius: 8px; border-left: 4px solid #667eea;">
                        <div style="font-weight: bold; margin-bottom: 10px; color: #667eea;">
                            🐳 Azure Container Informationen
                        </div>
                        <div style="font-size: 0.9em; text-align: left;">
                            <strong>Function Name:</strong> ${data.executionInfo.functionName}<br>
                            <strong>Invocation ID:</strong> <code style="background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 3px; font-size: 0.85em;">${data.executionInfo.invocationId}</code><br>
                            <strong>Execution Time:</strong> ${data.executionInfo.executionTime}<br>
                            <strong>Runtime:</strong> ${data.executionInfo.runtime}<br>
                            <strong>Platform:</strong> ${data.executionInfo.platform}<br>
                            <strong>Running In:</strong> <span style="color: #667eea; font-weight: bold;">${data.executionInfo.runningIn}</span>
                        </div>
                    </div>
                    ` : ''}
                `);
            } else {
                showError(resultBox, 'Fehler beim API-Aufruf: ' + data.message);
            }
        } catch (error) {
            showError(resultBox, `
                ⚠️ API-Endpunkt nicht erreichbar.<br>
                <small>Fehler: ${error.message}</small>
            `);
        }
    });
}

// Demo 2: Personalized Greeting
function initGreetDemo() {
    const btn = document.getElementById('greetBtn');
    const input = document.getElementById('nameInput');
    const resultBox = document.getElementById('greetResult');
    
    btn.addEventListener('click', async () => {
        const name = input.value.trim();
        
        if (!name) {
            showError(resultBox, 'Bitte geben Sie einen Namen ein!');
            return;
        }
        
        showLoading(resultBox, 'Begrüßung wird erstellt...');
        
        try {
            const response = await fetch(`/api/greet?name=${encodeURIComponent(name)}`);
            const data = await response.json();
            
            if (response.ok) {
                showSuccess(resultBox, `
                    <div style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px;">
                        ${data.greeting}
                    </div>
                    <small>Erstellt am: ${new Date(data.timestamp).toLocaleString('de-DE')}</small><br>
                    <small>${data.message}</small>
                    ${data.executionInfo ? `
                    <div style="margin-top: 15px; padding: 15px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 4px solid #10b981;">
                        <div style="font-weight: bold; margin-bottom: 10px; color: #10b981;">
                            🐳 Azure Container Informationen
                        </div>
                        <div style="font-size: 0.9em; text-align: left;">
                            <strong>Function Name:</strong> ${data.executionInfo.functionName}<br>
                            <strong>Invocation ID:</strong> <code style="background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 3px; font-size: 0.85em;">${data.executionInfo.invocationId}</code><br>
                            <strong>Execution Time:</strong> ${data.executionInfo.executionTime}<br>
                            <strong>Runtime:</strong> ${data.executionInfo.runtime}<br>
                            <strong>Platform:</strong> ${data.executionInfo.platform}<br>
                            <strong>Running In:</strong> <span style="color: #10b981; font-weight: bold;">${data.executionInfo.runningIn}</span>
                        </div>
                    </div>
                    ` : ''}
                `);
            } else {
                showError(resultBox, 'Fehler: ' + data.message);
            }
        } catch (error) {
            showError(resultBox, `
                ⚠️ API-Endpunkt nicht erreichbar.<br>
                <small>Fehler: ${error.message}</small>
            `);
        }
    });
    
    // Enter key support
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btn.click();
        }
    });
}

// Demo 3: Server Time
function initTimeDemo() {
    const btn = document.getElementById('timeBtn');
    const resultBox = document.getElementById('timeResult');
    
    btn.addEventListener('click', async () => {
        showLoading(resultBox, 'Zeit wird abgerufen...');
        
        try {
            const response = await fetch('/api/time');
            const data = await response.json();
            
            if (response.ok) {
                showSuccess(resultBox, `
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold; margin: 15px 0;">
                            ⏰ ${data.time}
                        </div>
                        <div style="font-size: 1.2em; margin-bottom: 10px;">
                            📅 ${data.date}
                        </div>
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #059669;">
                            <strong>Timezone:</strong> ${data.timezone}<br>
                            <strong>Unix Timestamp:</strong> ${data.unix}<br>
                            <strong>ISO:</strong> ${data.timestamp}
                        </div>
                        ${data.executionInfo ? `
                        <div style="margin-top: 15px; padding: 15px; background: rgba(5, 150, 105, 0.1); border-radius: 8px; border-left: 4px solid #059669;">
                            <div style="font-weight: bold; margin-bottom: 10px; color: #059669;">
                                🐳 Azure Container Informationen
                            </div>
                            <div style="font-size: 0.9em; text-align: left;">
                                <strong>Function Name:</strong> ${data.executionInfo.functionName}<br>
                                <strong>Invocation ID:</strong> <code style="background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 3px; font-size: 0.85em;">${data.executionInfo.invocationId}</code><br>
                                <strong>Execution Time:</strong> ${data.executionInfo.executionTime}<br>
                                <strong>Runtime:</strong> ${data.executionInfo.runtime}<br>
                                <strong>Platform:</strong> ${data.executionInfo.platform}<br>
                                <strong>Running In:</strong> <span style="color: #059669; font-weight: bold;">${data.executionInfo.runningIn}</span>
                            </div>
                        </div>
                        ` : ''}
                        <div style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;">
                            ${data.message}
                        </div>
                    </div>
                `);
            } else {
                showError(resultBox, 'Fehler beim Abrufen der Zeit');
            }
        } catch (error) {
            showError(resultBox, `
                ⚠️ API-Endpunkt nicht erreichbar.<br>
                <small>Fehler: ${error.message}</small>
            `);
        }
    });
}

// Demo 4: Random Number Generator
function initRandomDemo() {
    const btn = document.getElementById('randomBtn');
    const minInput = document.getElementById('minInput');
    const maxInput = document.getElementById('maxInput');
    const resultBox = document.getElementById('randomResult');
    
    btn.addEventListener('click', async () => {
        const min = parseInt(minInput.value) || 1;
        const max = parseInt(maxInput.value) || 100;
        
        if (min >= max) {
            showError(resultBox, 'Minimum muss kleiner als Maximum sein!');
            return;
        }
        
        showLoading(resultBox, 'Zufallszahl wird generiert...');
        
        try {
            const response = await fetch(`/api/random?min=${min}&max=${max}`);
            const data = await response.json();
            
            if (response.ok) {
                showSuccess(resultBox, `
                    <div style="text-align: center;">
                        <div style="font-size: 3em; font-weight: bold; color: #0078d4; margin: 20px 0;">
                            🎲 ${data.number}
                        </div>
                        <div style="font-size: 1.1em; margin: 15px 0;">
                            ${data.message}
                        </div>
                        <div style="margin-top: 15px; padding: 10px; background: white; border-radius: 8px;">
                            <strong>Bereich:</strong> ${data.min} - ${data.max}<br>
                            <strong>Generiert am:</strong> ${new Date(data.timestamp).toLocaleTimeString('de-DE')}
                        </div>
                        ${data.executionInfo ? `
                        <div style="margin-top: 15px; padding: 15px; background: rgba(245, 158, 11, 0.1); border-radius: 8px; border-left: 4px solid #f59e0b; text-align: left;">
                            <div style="font-weight: bold; margin-bottom: 10px; color: #f59e0b;">
                                🐳 Azure Container Informationen
                            </div>
                            <div style="font-size: 0.9em;">
                                <strong>Function Name:</strong> ${data.executionInfo.functionName}<br>
                                <strong>Invocation ID:</strong> <code style="background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 3px; font-size: 0.85em;">${data.executionInfo.invocationId}</code><br>
                                <strong>Execution Time:</strong> ${data.executionInfo.executionTime}<br>
                                <strong>Runtime:</strong> ${data.executionInfo.runtime}<br>
                                <strong>Platform:</strong> ${data.executionInfo.platform}<br>
                                <strong>Running In:</strong> <span style="color: #f59e0b; font-weight: bold;">${data.executionInfo.runningIn}</span>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                `);
                
                // Animation effect
                const numberDisplay = resultBox.querySelector('div[style*="font-size: 3em"]');
                if (numberDisplay) {
                    numberDisplay.style.transform = 'scale(0)';
                    setTimeout(() => {
                        numberDisplay.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                        numberDisplay.style.transform = 'scale(1)';
                    }, 100);
                }
            } else {
                showError(resultBox, data.error || 'Fehler beim Generieren der Zufallszahl');
            }
        } catch (error) {
            showError(resultBox, `
                ⚠️ API-Endpunkt nicht erreichbar.<br>
                <small>Fehler: ${error.message}</small>
            `);
        }
    });
}

// Helper Functions
function showLoading(element, message) {
    element.className = 'result-box show loading';
    element.innerHTML = `<div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 20px; height: 20px; border: 3px solid #3b82f6; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <span>${message}</span>
    </div>`;
    
    // Add spin animation if not exists
    if (!document.querySelector('#spin-animation')) {
        const style = document.createElement('style');
        style.id = 'spin-animation';
        style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }
}

function showSuccess(element, message) {
    element.className = 'result-box show success';
    element.innerHTML = message;
}

function showError(element, message) {
    element.className = 'result-box show error';
    element.innerHTML = message;
}

// Add some fun interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to demo cards
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#0078d4';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#e0e0e0';
        });
    });
});
