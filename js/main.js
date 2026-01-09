// --- DATA SECTION (STRICTLY CHECKED) ---

const protocols = [
    {type: "physical", title:"PHYSICAL DEFORMITIES", desc:"IDENTIFICATION: Extra or missing limbs, multiple heads, distorted facial features.<br>PROTOCOL: Deny service immediately. Do not make direct eye contact."},
    {type: "physical", title:"PROPORTIONAL ABNORMALITIES", desc:"IDENTIFICATION: Height/width deviate from norms. Head-to-body ratio incorrect.<br>PROTOCOL: Cross-reference ID appearance details."},
    {type: "physical", title:"VISUAL DISTORTIONS", desc:"IDENTIFICATION: Pixelated appearance, flickering body parts, unnatural skin colors.<br>PROTOCOL: Focus on ID card appearance description."},
    {type: "identity", title:"FRAUDULENT IDENTIFICATION", desc:"IDENTIFICATION: Misspelled names, impossible birth dates (future dates, 1800s).<br>PROTOCOL: Cross-reference name and DOB with registry."},
    {type: "identity", title:"IDENTITY THEFT", desc:"IDENTIFICATION: Valid ID but physical appearance does not match registry description.<br>PROTOCOL: Compare physical traits to registry description."},
    {type: "behavior", title:"BEHAVIORAL ABERRATIONS", desc:"IDENTIFICATION: Unnatural movement (teleportation), distorted speech, no breathing.<br>PROTOCOL: Complete verification quickly. Avoid conversation."},
    {type: "behavior", title:"IMPOSSIBLE REQUESTS", desc:"IDENTIFICATION: Requests for human body parts, abstract concepts, non-existent products.<br>PROTOCOL: Deny calmly."},
    {type: "identity", title:"MISSING STATUS", desc:"IDENTIFICATION: Registry shows resident as MISSING: YES.<br>PROTOCOL: Deny service. Alert authorities immediately."}
];

const residents = [
    {name:"PATTERSON, MICHAEL", dob:"06/14/1956", id:"487-29-6153", occupation:"BANKER", missing:"NO"},
    {name:"HAYES, ROBERT", dob:"03/22/1952", id:"651-43-8927", occupation:"MECHANIC", missing:"NO"},
    {name:"MORRISON, DAVID", dob="11/08/1949", id:"159-82-4736", occupation:"TEACHER", missing:"NO"},
    {name:"FOSTER, JAMES", dob="09/30/1954", id:"917-54-2638", occupation:"ELECTRICIAN", missing:"NO"},
    {name:"LEE, CHRISTOPHER", dob="04/17/1947", id:"264-78-9145", occupation:"PLUMBER", missing:"NO"},
    {name:"COOPER, DANIEL", dob="12/25/1950", id:"925-48-1637", occupation:"ACCOUNTANT", missing:"NO"},
    {name:"WRIGHT, MATTHEW", dob="08/11/1966", id:"384-72-5916", occupation:"DELIVERY DRIVER", missing:"YES"},
    {name:"BENNETT, JOSHUA", dob="02/19/1953", id:"862-51-4398", occupation:"CONSTRUCTION WORKER", missing:"NO"},
    {name:"KELLY, BRANDON", dob="07/05/1951", id:"743-94-2156", occupation:"WAREHOUSE MANAGER", missing:"NO"},
    {name:"MURPHY, KEVIN", dob="10/28/1948", id:"439-17-5624", occupation:"STORE CLERK", missing:"NO"},
    {name:"BARNES, TYLER", dob="01/14/1965", id:"821-43-9562", occupation="LANDSCAPER", missing:"NO"},
    {name:"HILL, GREGORY", dob="05/09/1945", id:"952-34-6813", occupation="SECURITY GUARD", missing:"YES"},
    {name:"STEWART, NATHAN", dob="09/23/1967", id:"647-21-8534", occupation="COOK", missing:"NO"},
    {name:"PARKER, RYAN", dob="03/16/1944", id:"863-42-5178", occupation="TRUCK DRIVER", missing:"NO"},
    {name:"COOK, AUSTIN", dob="11/30/1958", id:"683-91-2564", occupation="LIBRARIAN", missing:"NO"}
];


// --- LOGIC SECTION ---

document.addEventListener("DOMContentLoaded", () => {
    
    const bootLines = [
        "BIOS DATE 01/01/88 14:22:56 VER 1.02",
        "CPU: NEC V20, SPEED: 8 MHz",
        "640K RAM SYSTEM... OK",
        "LOADING FERNDALE_OS...",
        "MOUNTING DRIVE C: ... SUCCESS",
        "ACCESSING CLASSIFIED ARCHIVES...",
        "LOADING RESIDENT DATABASE...",
        "LOADING THREAT PROTOCOLS...",
        "ACCESS GRANTED."
    ];

    const bootScreen = document.getElementById('boot-screen');
    const bootTextContainer = document.getElementById('boot-text');
    const mainInterface = document.getElementById('main-interface');
    
    // Audio Toggle
    const soundBtn = document.getElementById('sound-toggle');
    let soundEnabled = false;

    // 1. BOOT ANIMATION
    let lineIndex = 0;
    function typeLine() {
        if (lineIndex < bootLines.length) {
            const p = document.createElement('p');
            p.textContent = "> " + bootLines[lineIndex];
            bootTextContainer.appendChild(p);
            lineIndex++;
            setTimeout(typeLine, 50);
        } else {
            setTimeout(startMainSite, 800);
        }
    }

    function startMainSite() {
        bootScreen.style.display = 'none';
        mainInterface.classList.remove('hidden');
        
        // Initial Render
        renderProtocols("all");
        renderResidents("all", "");
        
        // Start Reveal Animations
        setupObserver();
    }

    // 2. RENDER FUNCTIONS
    function renderProtocols(filterType) {
        const container = document.getElementById('protocol-container');
        container.innerHTML = ""; 

        protocols.forEach(p => {
            if (filterType === 'all' || p.type === filterType) {
                const div = document.createElement('div');
                div.className = 'file-entry reveal';
                
                // Color coding
                let statusColor = "#33ff33"; // Green
                if (p.type === 'behavior') statusColor = "#ffcc00"; // Yellow
                if (p.title.includes("MISSING")) statusColor = "#ff3333"; // Red

                div.innerHTML = `
                    <div class="file-header">
                        <span>ANOMALY: ${p.title}</span>
                        <span style="color:${statusColor}">[READ_ONLY]</span>
                    </div>
                    <div class="protocol-desc">${p.desc}</div>
                `;
                container.appendChild(div);
            }
        });
        setupObserver();
    }

    function renderResidents(filterStatus, searchText) {
        const container = document.getElementById('registry-container');
        container.innerHTML = "";

        residents.forEach(r => {
            const matchesText = r.name.includes(searchText) || r.id.includes(searchText);
            
            let matchesFilter = false;
            if (filterStatus === 'all') matchesFilter = true;
            if (filterStatus === 'safe' && r.missing === 'NO') matchesFilter = true;
            if (filterStatus === 'missing' && r.missing === 'YES') matchesFilter = true;

            if (matchesText && matchesFilter) {
                const div = document.createElement('div');
                div.className = 'file-entry reveal';
                
                const isMissing = r.missing === 'YES';
                const statusText = isMissing ? '[MISSING]' : '[VERIFIED]';
                const statusClass = isMissing ? 'missing-alert' : '';
                const statusValClass = isMissing ? 'missing-alert' : 'resident-val';

                div.innerHTML = `
                    <div class="file-header">
                        <span>${r.name}</span>
                        <span class="${statusClass}">${statusText}</span>
                    </div>
                    <div class="resident-card">
                        <div><span class="resident-data">ID:</span> <span class="resident-val">${r.id}</span></div>
                        <div><span class="resident-data">DOB:</span> <span class="resident-val">${r.dob}</span></div>
                        <div><span class="resident-data">JOB:</span> <span class="resident-val">${r.occupation}</span></div>
                        <div><span class="resident-data">MISSING:</span> <span class="${statusValClass}">${r.missing}</span></div>
                    </div>
                `;
                container.appendChild(div);
            }
        });
        setupObserver();
    }

    // 3. EVENT LISTENERS
    document.getElementById('protocol-filter').addEventListener('change', (e) => {
        renderProtocols(e.target.value);
    });

    document.getElementById('resident-search').addEventListener('input', (e) => {
        const filterVal = document.getElementById('missing-filter').value;
        renderResidents(filterVal, e.target.value.toUpperCase());
    });

    document.getElementById('missing-filter').addEventListener('change', (e) => {
        const searchVal = document.getElementById('resident-search').value.toUpperCase();
        renderResidents(e.target.value, searchVal);
    });

    soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundBtn.textContent = soundEnabled ? "[ SOUND: ON ]" : "[ SOUND: OFF ]";
    });

    // 4. ANIMATION OBSERVER
    function setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.05 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // START
    setTimeout(typeLine, 500);
});
