const appData = {
    phases: [
        {
            id: 0,
            title: "Übersicht (Dashboard)",
            description: "Zentrale Steuerung und Fortschrittsanalyse Ihres ICMR-Projekts.",
            tasks: []
        },
        {
            id: 1,
            title: "Vorbereitung (Preparation)",
            description: "Aktivierung der Lösung und Zuweisung von Rollen.",
            tasks: [
                {
                    id: "1-1",
                    title: "Aktivierung (Activation)",
                    desc: "Aktivierung der Business Function und Scope Items.",
                    tcode: "SFW5 / /n/SMB/BBI",
                    details: "<h3>Business Function</h3><p>Muss über Transaktion <b>SFW5</b> (Business Function <b>FIN_CS_ICR</b>) aktiviert werden.</p><h3>Scope Items</h3><p>Aktivierung über den Solution Builder (<b>/n/SMB/BBI</b>).<br>Für das Accounting-Modell ist <b>40Y</b> (Intercompany Reconciliation) relevant.<br>Für Group Reporting Integration ist <b>1SG</b> relevant.</p>",
                    searchQuery: "SAP S4HANA Activation FIN_CS_ICR Scope Item 40Y"
                },
                {
                    id: "1-2",
                    title: "Rollen (Roles)",
                    desc: "Zuweisung der notwendigen Benutzerrollen.",
                    tcode: "PFCG",
                    details: "<h3>Standard Role</h3><p><b>SAP_BR_RECON_ACCOUNTANT</b> (General Ledger Accountant – Intercompany) ist die zentrale Rolle für Konfiguration und Betrieb.</p><h3>Additional Roles</h3><p>Für Group Reporting wird zusätzlich <b>SAP_BR_CONSLDTN_SPECIALIST</b> benötigt.<br>Für erweiterte Konfigurationen in 'Manage Your Solution': <b>SAP_BR_BPC_EXPERT</b>.</p>",
                    searchQuery: "SAP S4HANA Roles SAP_BR_RECON_ACCOUNTANT"
                }
            ]
        },
        {
            id: 2,
            title: "Schritt 1: Datenquelle definieren",
            description: "Definition der Datenquellen und CDS Views.",
            tasks: [
                {
                    id: "2-1",
                    title: "Datenquellen definieren",
                    desc: "Konfiguration der CDS Views und Feld-Semantik.",
                    tcode: "ICADS",
                    details: "<h3>Technical Details</h3><p>Transaktion <b>ICADS</b>.</p><h3>Enhancements</h3><ul><li><b>Zuordnung von CDS Views:</b> z. B. <code>ICA_GENJOURNALENTRIES_2</code> für ACDOCA oder <code>ICA_CONSJOURNALENTRIES</code> für ACDOCU.</li><li><b>Field Semantics:</b> Festlegung von Leading Unit (z. B. RCOMP) und Partner Unit (z. B. RASSC).</li><li><b>Mandatory Filter Fields:</b> Konfiguration von zwingenden Filtern (z. B. Geschäftsjahr, Periode, Version).</li></ul>",
                    searchQuery: "SAP S4HANA ICADS Define Data Sources"
                }
            ]
        },
        {
            id: 3,
            title: "Schritt 2: Abstimmmethode definieren",
            description: "Konfiguriere die Logik für den Belegabgleich.",
            tasks: [
                {
                    id: "3-1",
                    title: "Abstimmmethode anlegen",
                    desc: "Definiere Regeln für die Belegpaarung.",
                    tcode: "F3862 / ICATRM",
                    details: "<h3>Technical Details</h3><p>App ID <b>F3862</b>. Transport über Transaktion <b>ICATRM</b>.</p><h3>Enhancements</h3><ul><li><b>Waterfall Logic:</b> Definition sequenzieller Matching-Regeln (z. B. Rule 1010: Exact Match, Rule 1020: Reversed Documents).</li><li><b>Data Slices:</b> Definition von Filtern (Slices) für die Sender- und Empfängerseite (z. B. AR vs. AP), um Überschneidungen zu vermeiden.</li></ul>",
                    searchQuery: "SAP S4HANA Matching Methods F3862"
                }
            ]
        },
        {
            id: 4,
            title: "Schritt 3: Abstimmfall definieren",
            description: "Gruppiere Handelspartner und weise Abstimmmethoden zu.",
            tasks: [
                {
                    id: "4-1",
                    title: "Abstimmfall anlegen",
                    desc: "Definiere die Eigenschaften des Abstimmfalls.",
                    tcode: "F3863 / ICATRC",
                    details: "<h3>Technical Details</h3><p>App ID <b>F3863</b>. Transport über Transaktion <b>ICATRC</b>.</p><h3>Enhancements</h3><ul><li><b>Tolerances:</b> Definition von Betrags- oder Prozentsatztoleranzen (z. B. 6.000 EUR), innerhalb derer Differenzen automatisch akzeptiert werden.</li><li><b>Display Groups:</b> Gruppierung von Konten für die Berichterstattung (z. B. AR/AP relevant).</li><li><b>With Balance Carryforward:</b> Aktivierung dieses Kennzeichens ist entscheidend für die korrekte YTD-Darstellung in den Saldenberichten.</li></ul>",
                    searchQuery: "SAP S4HANA Reconciliation Cases F3863"
                }
            ]
        },
        {
            id: 5,
            title: "Schritt 4: Grundcodes & Buchungsvorlagen",
            description: "Behandle Differenzen mit Reason Codes und automatischer Buchungslogik.",
            tasks: [
                {
                    id: "5-1",
                    title: "Reason Codes",
                    desc: "Steuern manuellen Workflow oder automatische Buchung.",
                    tcode: "ICARC",
                    details: "<h3>Technical Details</h3><p>Transaktion <b>ICARC</b>. Sie steuern, ob nach einem Matching ein manueller Workflow oder eine automatische Buchung folgt.</p>",
                    searchQuery: "SAP S4HANA Reason Codes ICARC"
                },
                {
                    id: "5-2",
                    title: "Posting Rules",
                    desc: "Definition von Buchungsregeln.",
                    tcode: "F4773 / ICAAPT",
                    details: "<h3>Wichtig</h3><ul><li><b>App ID F4773</b> zur Definition von Regeln (Szenario SA001 für Accounting, SC001 für Group Reporting).</li><li>Transaktion <b>ICAAPT</b> zur Zuweisung dieser Regeln zu Buchungskreisen/Reason Codes.</li><li><b>Korrektur:</b> Posting Rules haben die alten Dokumentenvorlagen (ICADT/ICAADT) seit Release 2020 ersetzt.</li></ul>",
                    searchQuery: "SAP S4HANA Posting Rules F4773"
                }
            ]
        },
        {
            id: 6,
            title: "Schritt 5: Teams und Zuständigkeiten",
            description: "Weise Benutzer spezifischen Aufgaben zu.",
            tasks: [
                {
                    id: "6-1",
                    title: "Teams verwalten (ICAM)",
                    desc: "Definition der Team-Kategorie und Funktionen.",
                    tcode: "F2412",
                    details: "<h3>Technical Details</h3><p>App ID <b>F2412</b>.</p><h3>Enhancements</h3><p>Definition der Team-Kategorie <b>ICAM</b> (Intercompany Assignment Management) und Zuweisung von Funktionen wie <b>ICAM_SV</b> (Check Variance) und <b>ICAM_SP</b> (Post Variance).</p>",
                    searchQuery: "SAP S4HANA Teams F2412 ICAM"
                }
            ]
        },
        {
            id: 7,
            title: "Schritt 6: Abstimmungsabschluss",
            description: "Schließe die Periode und sperre Daten.",
            tasks: [
                {
                    id: "7-1",
                    title: "Abschluss aktivieren",
                    desc: "Voraussetzungen und Workflow.",
                    tcode: "ICAARC / F4993",
                    details: "<h3>Activate Close</h3><p>Transaktion <b>ICAARC</b>. Hier wird festgelegt, welche Voraussetzungen für einen Abschluss gelten (z. B. 'All items matched').</p><h3>Workflow</h3><p>App ID <b>F4993</b> (Workflow-Szenario WS78500026).</p><h3>Teams</h3><p>Für den Abschluss wird oft die separate App/Transaktion <b>F3932</b> (Teams for Reconciliation Close) genutzt.</p>",
                    searchQuery: "SAP S4HANA Reconciliation Close ICAARC"
                }
            ]
        },
        {
            id: 8,
            title: "Benutzerhandbuch",
            description: "Day-to-Day Operations",
            tasks: [
                {
                    id: "8-1",
                    title: "Schedule Matching",
                    desc: "Startet den automatischen Abgleichslauf.",
                    tcode: "F1240 / F5011 (ICARM)",
                    details: "<h3>Activity</h3><p>Schedule Matching</p><h3>Notes</h3><p>Startet den automatischen Abgleichslauf.</p>",
                    searchQuery: "SAP S4HANA F1240 Schedule Matching"
                },
                {
                    id: "8-2",
                    title: "Monitor Status",
                    desc: "Status Overview und Balances.",
                    tcode: "F3865",
                    details: "<h3>Activity</h3><p>Monitor Status</p><h3>Notes</h3><p>Status Overview (Ampelsystem) und Balances (Saldenprüfung).</p>",
                    searchQuery: "SAP S4HANA F3865 Monitor Status"
                },
                {
                    id: "8-3",
                    title: "Manage Assignments",
                    desc: "Manuelle Klärung und Zuweisung.",
                    tcode: "F3870",
                    details: "<h3>Activity</h3><p>Manage Assignments</p><h3>Notes</h3><p>Zentrale App zur manuellen Klärung und Zuweisung von Reason Codes. (T-Code: By Recon Case)</p>",
                    searchQuery: "SAP S4HANA F3870 Manage Assignments"
                },
                {
                    id: "8-4",
                    title: "Display Items",
                    desc: "Drill-down auf Einzelbelegebene.",
                    tcode: "F3869",
                    details: "<h3>Activity</h3><p>Display Items</p><h3>Notes</h3><p>Drill-down auf Einzelbelegebene zur Detailanalyse.</p>",
                    searchQuery: "SAP S4HANA F3869 Display Items"
                },
                {
                    id: "8-5",
                    title: "Verify Adjustments",
                    desc: "Genehmigungspostkorb für Korrekturen.",
                    tcode: "F0862",
                    details: "<h3>Activity</h3><p>Verify Adjustments</p><h3>Notes</h3><p>Genehmigungspostkorb (My Inbox) für Varianzkorrekturen.</p>",
                    searchQuery: "SAP S4HANA F0862 Verify Adjustments"
                }
            ]
        },
        {
            id: 9,
            title: "Best Practices (DOs & DON'Ts)",
            description: "Empfehlungen für den operativen Betrieb (aus Slide 14).",
            tasks: [
                {
                    id: "9-1",
                    title: "DO: Continuous Accounting",
                    desc: "Führen Sie das Matching wöchentlich durch.",
                    tcode: "Best Practice",
                    details: "<h3>Why?</h3><p>Vermeidet Arbeitsspitzen am Monatsende ('Period-End Crunch').</p>",
                    searchQuery: "SAP S4HANA Continuous Accounting"
                },
                {
                    id: "9-2",
                    title: "DO: Kommentare pflegen",
                    desc: "Dokumentieren Sie jede manuelle Zuordnung.",
                    tcode: "Best Practice",
                    details: "<h3>Why?</h3><p>Sorgt für Transparenz und erleichtert Audits. Nutzen Sie die Notiz-Funktion am Beleg.</p>",
                    searchQuery: "SAP S4HANA ICMR Comments"
                },
                {
                    id: "9-3",
                    title: "DO: Data Quality prüfen",
                    desc: "Prüfen Sie regelmäßig 'Unassigned Items' auf fehlende VBUND.",
                    tcode: "Best Practice",
                    details: "<h3>Why?</h3><p>Fehlende Trading Partner IDs (VBUND) verhindern automatisches Matching.</p>",
                    searchQuery: "SAP S4HANA Trading Partner ID VBUND"
                },
                {
                    id: "9-4",
                    title: "DON'T: Blindes Vertrauen",
                    desc: "Verlassen Sie sich nicht allein auf Auto-Match – Stichproben sind wichtig.",
                    tcode: "Warning",
                    details: "<h3>Risk</h3><p>Falsche Regeldefinitionen können zu falschen Zuordnungen führen. Regelmäßige Kontrolle ist notwendig.</p>",
                    searchQuery: "SAP S4HANA ICMR Validation"
                },
                {
                    id: "9-5",
                    title: "DON'T: Logs ignorieren",
                    desc: "Ignorieren Sie nicht die 'Matching Runs' Jobs – prüfen Sie die Logs bei Fehlern.",
                    tcode: "Warning",
                    details: "<h3>Risk</h3><p>Technische Fehler oder Datenprobleme werden im Job-Log protokolliert.</p>",
                    searchQuery: "SAP S4HANA Job Log Analysis"
                }
            ]
        },
        {
            id: 10,
            title: "Go-Live Checkliste",
            description: "Technische und Fachliche Checkliste vor dem Go-Live (aus Slide 15).",
            tasks: [
                {
                    id: "10-1",
                    title: "Tech: Scope Item 40Y aktiviert",
                    desc: "SFW5 Switches & Scope Item 40Y geprüft.",
                    tcode: "SFW5",
                    details: "Technical Checklist (Consultant)",
                    searchQuery: "SAP S4HANA Scope Item 40Y Activation"
                },
                {
                    id: "10-2",
                    title: "Tech: Datenquellen & Regeln",
                    desc: "Datenquellen & Matching-Regeln konfiguriert.",
                    tcode: "ICADS / F3862",
                    details: "Technical Checklist (Consultant)",
                    searchQuery: "SAP S4HANA ICMR Configuration"
                },
                {
                    id: "10-3",
                    title: "Tech: Fiori-Rollen",
                    desc: "Rolle SAP_BR_RECON_ACCOUNTANT zugewiesen.",
                    tcode: "PFCG",
                    details: "Technical Checklist (Consultant)",
                    searchQuery: "SAP S4HANA PFCG Role Assignment"
                },
                {
                    id: "10-4",
                    title: "Biz: Training absolviert",
                    desc: "Training 'Manage Assignments' absolviert.",
                    tcode: "Training",
                    details: "Business Checklist (User)",
                    searchQuery: "SAP S4HANA Manage Assignments Training"
                },
                {
                    id: "10-5",
                    title: "Biz: Teams gepflegt",
                    desc: "Teams & Verantwortlichkeiten gepflegt.",
                    tcode: "F2412",
                    details: "Business Checklist (User)",
                    searchQuery: "SAP S4HANA ICMR Teams"
                },
                {
                    id: "10-6",
                    title: "Biz: Testlauf erfolgreich",
                    desc: "Erster Testlauf (Mock Close) erfolgreich durchgeführt.",
                    tcode: "Testing",
                    details: "Business Checklist (User)",
                    searchQuery: "SAP S4HANA Mock Close"
                }
            ]
        },
        {
            id: 99,
            title: "PDF Guide",
            description: "Original ICMR Implementation and Operation Guide.",
            tasks: [],
            isPdf: true
        }
    ],
    state: {
        activePhase: 0,
        completedTasks: new Set()
    }
};


function renderSidebar() {
    const nav = document.getElementById('nav-items');
    nav.innerHTML = appData.phases.map(p => {
        let prefix = '';
        if (p.id === 0) {
            prefix = '🏠 Hub';
        } else if (p.isPdf) {
            prefix = 'Dokumentation';
        } else if (p.id <= 7) {
            prefix = 'Basis ' + (p.id === 1 ? '0' : p.id - 1);
        } else if (p.id === 8) {
            prefix = 'Handbuch';
        } else if (p.id === 9) {
            prefix = 'Info';
        } else if (p.id === 10) {
            prefix = 'Checkliste';
        } else {
            prefix = 'Extra';
        }

        return `
        <div class="nav-item ${appData.state.activePhase === p.id ? 'active' : ''}" 
             onclick="loadPhase(${p.id})">
            ${prefix}: ${p.title}
        </div>
    `}).join('');
}

function loadPhase(id) {
    appData.state.activePhase = id;
    renderSidebar();

    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }

    const phase = appData.phases.find(p => p.id === id);
    const container = document.getElementById('content-area');

    if (id === 0) {
        renderDashboard(container);
        return;
    }

    if (phase.isPdf) {
        container.innerHTML = `
            <div class="animate" style="height: calc(100vh - 200px); display: flex; flex-direction: column;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
                    <div>
                        <h1 style="margin:0;">${phase.title}</h1>
                        <p class="phase-description" style="margin:0.5rem 0 0 0;">${phase.description}</p>
                    </div>
                    <a href="./ICMR_Implementation_and_Operation_Guide.pdf" download class="print-btn" style="text-decoration:none; font-size:0.9rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>⬇</span> Download Original PDF
                    </a>
                </div>
                <div style="flex: 1; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: #fff;">
                    <embed src="./ICMR_Implementation_and_Operation_Guide.pdf" type="application/pdf" width="100%" height="100%" />
                    <noembed>
                        <div style="padding: 2rem; text-align: center;">
                            <p>Ihr Browser unterstützt das Einbetten von PDFs nicht.</p>
                            <a href="./ICMR_Implementation_and_Operation_Guide.pdf" target="_blank" class="print-btn">PDF in neuem Tab öffnen</a>
                        </div>
                    </noembed>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="animate">
            <h1>${phase.title}</h1>
            <p class="phase-description">${phase.description}</p>
            <div class="task-list">
                ${phase.tasks.map(t => {
        const isGuide = phase.id === 8;
        const detailsHtml = t.details ? `<div class="task-details" style="margin-top:1rem; border-top:1px solid var(--border-color); padding-top:1rem; display:none;" id="details-${t.id}">
                        ${t.details}
                        ${t.searchQuery ? `<br><a href="https://www.google.com/search?q=${encodeURIComponent(t.searchQuery)}" target="_blank" class="video-link">🔍 Im Web suchen</a>` : ''}
                    </div>` : '';

        const expandBtn = t.details ? `<button onclick="toggleDetails('${t.id}', event)" class="expand-btn">Details anzeigen</button>` : '';

        return `
                    <div class="task-card ${appData.state.completedTasks.has(t.id) ? 'completed' : ''}" 
                         ${!isGuide ? `onclick="toggleTask('${t.id}')"` : ''}>
                        <div class="checkbox" ${isGuide ? `onclick="toggleTask('${t.id}')"` : ''}></div>
                        <div class="task-text" style="width:100%">
                            <div style="display:flex; justify-content:space-between; align-items:start;">
                                <div>
                                    <h3>${t.title}</h3>
                                    <p>${t.desc}</p>
                                    <span class="t-code">${t.tcode}</span>
                                </div>
                                ${expandBtn}
                            </div>
                            ${detailsHtml}
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    `;
}

function toggleDetails(id, event) {
    event.stopPropagation();
    const el = document.getElementById(`details-${id}`);
    if (!el) return;

    const btn = event.target;
    if (el.style.display === 'none') {
        el.style.display = 'block';
        btn.innerText = 'Details verbergen';
    } else {
        el.style.display = 'none';
        btn.innerText = 'Details anzeigen';
    }
}

function toggleTask(id) {
    if (appData.state.completedTasks.has(id)) {
        appData.state.completedTasks.delete(id);
    } else {
        appData.state.completedTasks.add(id);
    }
    loadPhase(appData.state.activePhase);
    updateProgress();
}

function updateProgress() {
    const totalTasks = appData.phases.reduce((acc, p) => acc + p.tasks.length, 0);
    const completed = appData.state.completedTasks.size;
    const percent = Math.round((completed / totalTasks) * 100);

    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');

    if (progressText) progressText.innerText = `${percent}% Abgeschlossen`;
    if (progressBar) progressBar.style.width = `${percent}%`;
}

// Login Logic
function checkLogin() {
    const input = document.getElementById('password-input');
    const error = document.getElementById('login-error');
    if (input.value === 'admin') {
        document.getElementById('login-overlay').style.display = 'none';
    } else {
        error.style.display = 'block';
    }
}

// PDF Generation Logic
function generatePDF() {
    const reportContainer = document.getElementById('print-report');

    // Generate Report HTML
    let html = `<h1>ICMR Implementierung & Training Report</h1>
                <p>Generiert am: ${new Date().toLocaleDateString()}</p>`;

    appData.phases.forEach(phase => {
        html += `<h2>${phase.title}</h2>
                 <p>${phase.description}</p>`;

        phase.tasks.forEach(task => {
            const isCompleted = appData.state.completedTasks.has(task.id);
            html += `<div class="print-task ${isCompleted ? 'completed' : ''}">
                        <h3>${isCompleted ? '☑' : '☐'} ${task.title} <span style="font-size:0.8em; color:#666;">(${task.tcode})</span></h3>
                        <p>${task.desc}</p>
                        <div class="print-status">${isCompleted ? 'Erledigt' : 'Offen'}</div>
                     </div>`;
        });
    });

    reportContainer.innerHTML = html;
    window.print();
}

// Mobile Toggle Logic
function toggleSidebar() {
    const sidebar = document.querySelector('aside');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar || !overlay) return;

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function renderDashboard(container) {
    const totalTasks = appData.phases.reduce((acc, p) => acc + p.tasks.length, 0);
    const completedTasks = appData.state.completedTasks.size;
    const overallPercent = Math.round((completedTasks / totalTasks) * 100);

    // Extract all T-Codes and Fiori Apps for the table
    const allTransactions = [];
    appData.phases.forEach(phase => {
        phase.tasks.forEach(task => {
            if (task.tcode && !['Best Practice', 'Warning', 'Testing', 'Training'].includes(task.tcode)) {
                allTransactions.push({
                    phase: phase.title,
                    task: task.title,
                    tcode: task.tcode,
                    id: task.id,
                    phaseId: phase.id
                });
            }
        });
    });

    const transactionRows = allTransactions.map(tr => {
        const parts = tr.tcode.split(' / ');
        const badges = parts.map(p => {
            const isFiori = p.startsWith('F') && !p.startsWith('FIN');
            return `<span class="${isFiori ? 'badge-fiori' : 'badge-tcode'}">${isFiori ? 'App' : 'T-Code'}: ${p}</span>`;
        }).join(' ');

        return `
            <tr onclick="loadPhase(${tr.phaseId})" style="cursor:pointer;">
                <td style="font-weight:600;">${tr.task}</td>
                <td>${badges}</td>
                <td style="color:var(--text-secondary); font-size:0.8rem;">${tr.phase}</td>
            </tr>
        `;
    }).join('');

    // Filter T-Codes for the cloud (unique only)
    const tCodes = new Set();
    allTransactions.forEach(tr => {
        tr.tcode.split(' / ').forEach(code => tCodes.add(code.split(' ')[0]));
    });

    const phaseCards = appData.phases.filter(p => p.id > 0 && !p.isPdf).map(p => {
        const pTotal = p.tasks.length;
        const pDone = p.tasks.filter(t => appData.state.completedTasks.has(t.id)).length;
        const pPercent = Math.round((pDone / pTotal) * 100);

        return `
            <div class="phase-mini-card" onclick="loadPhase(${p.id})">
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <h3>${p.title}</h3>
                    <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary);">${pPercent}%</span>
                </div>
                <div class="mini-progress-bar">
                    <div class="mini-progress-fill" style="width: ${pPercent}%"></div>
                </div>
                <p style="font-size:0.8rem; color:var(--text-secondary); margin:0;">${pDone} von ${pTotal} Aufgaben erledigt</p>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="animate">
            <h1 style="margin-bottom: 2rem;">Projekt Dashboard</h1>
            
            <div class="dashboard-grid">
                <div class="kpi-card">
                    <h4>Gesamtfortschritt</h4>
                    <div class="kpi-value">${overallPercent}%</div>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin:0;">Status der Implementierung</p>
                </div>
                <div class="kpi-card">
                    <h4>Erledigte Aufgaben</h4>
                    <div class="kpi-value">${completedTasks} / ${totalTasks}</div>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin:0;">Aktueller Workload</p>
                </div>
            </div>

            <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem;">
                <h3 style="margin-top:0; color:var(--primary-color);">Zentrale T-Codes & Apps</h3>
                <div class="tcode-cloud">
                    ${Array.from(tCodes).slice(0, 15).map(code => `<span class="tcode-badge">${code}</span>`).join('')}
                    <span class="tcode-badge" style="background:var(--accent-color); color:white; border:none; cursor:pointer;" onclick="loadPhase(8)">Alle anzeigen...</span>
                </div>
            </div>

            <h3 style="margin-bottom: 1rem; color:var(--primary-color);">Transaktions- & App-Übersicht</h3>
            <div class="dashboard-table-container">
                <table class="dashboard-table">
                    <thead>
                        <tr>
                            <th>Aufgabe / Aktivität</th>
                            <th>Transaktion / Fiori App</th>
                            <th>Phase</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactionRows}
                    </tbody>
                </table>
            </div>

            <h3 style="margin-bottom: 1rem; color:var(--primary-color);">Phasen Übersicht</h3>
            <div class="phase-summary-grid">
                ${phaseCards}
            </div>
        </div>
    `;
}

function init() {
    renderSidebar();
    loadPhase(0); // Start on Dashboard
    updateProgress();

    // Allow login with Enter key
    document.getElementById('password-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkLogin();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
