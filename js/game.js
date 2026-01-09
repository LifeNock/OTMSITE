document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. BOOT SEQUENCE ---
    const bootLines = [
        "BIOS DATE 01/01/88",
        "CPU: NEC V20... OK",
        "LOADING FERNDALE_GAS_AND_GO_OS...",
        "CHECKING REGISTER... ONLINE",
        "CHECKING CCTV... ONLINE",
        "MOUNTING DRIVE C: ... SUCCESS",
        "SYSTEM READY."
    ];

    const bootScreen = document.getElementById('boot-layer');
    const bootConsole = document.getElementById('boot-console');
    const globalHeader = document.getElementById('global-header');
    const landingPage = document.getElementById('landing-page');
    const databasePage = document.getElementById('database-page');
    
    // Buttons & Controls
    const enterDbBtn = document.getElementById('enter-db-btn');
    const backBtn = document.getElementById('back-btn');
    const audioBtn = document.getElementById('audio-btn');
    
    // State
    let lineIndex = 0;
    let isMuted = true;

    // --- 2. BOOT SEQUENCE ---
    function runBoot() {
        if (lineIndex < bootLines.length) {
            const p = document.createElement('p');
            p.textContent = "> " + bootLines[lineIndex];
            bootConsole.appendChild(p);
            lineIndex++;
            setTimeout(runBoot, 200); 
        } else {
            setTimeout(showLanding, 800);
        }
    }

    function showLanding() {
        bootScreen.classList.add('hidden');
        globalHeader.classList.remove('hidden');
        landingPage.classList.remove('hidden');
        
        // Start scroll animations
        setupObserver();
    }

    // --- 3. EVENT LISTENERS ---
    
    // Navigation
    enterDbBtn.addEventListener('click', () => {
        landingPage.classList.add('hidden');
        databasePage.classList.remove('hidden');
        renderAllData(); // Load data only when needed
    });

    backBtn.addEventListener('click', () => {
        databasePage.classList.add('hidden');
        landingPage.classList.remove('hidden');
    });

    // Audio Toggle
    audioBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        audioBtn.innerText = isMuted ? "[ AUDIO: OFF ]" : "[ AUDIO: ON ]";
    });

    // Filters
    document.getElementById('proto-select').addEventListener('change', (e) => {
        renderProtocols(e.target.value);
    });

    const searchInput = document.getElementById('search-input');
    const statusSelect = document.getElementById('status-select');

    searchInput.addEventListener('input', (e) => {
        renderResidents(statusSelect.value, e.target.value.toUpperCase());
    });

    statusSelect.addEventListener('change', (e) => {
        renderResidents(e.target.value, searchInput.value.toUpperCase());
    });

    // Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', { hour12: false });
    }, 1000);

    // --- 4. GAME DATA ---
    
    const protocols = [
        {
            type: "physical", 
            title: "PHYSICAL DEFORMITIES", 
            desc: "IDENTIFICATION: Impossible physical traits (extra limbs).<br>ACTION: Deny service. Avoid eye contact."
        },
        {
            type: "physical", 
            title: "VISUAL DISTORTIONS", 
            desc: "IDENTIFICATION: Pixelated skin, unnatural colors.<br>ACTION: Focus on ID description."
        },
        {
            type: "identity", 
            title: "FRAUDULENT ID", 
            desc: "IDENTIFICATION: Incorrect personal details or format.<br>ACTION: Verify against registry."
        },
        {
            type: "behavior", 
            title: "BEHAVIORAL ABNORMALITIES", 
            desc: "IDENTIFICATION: Wrong behavior, robotic movement.<br>ACTION: Complete transaction quickly."
        },
        {
            type: "special", 
            title: "RECURRING ENTITY (CLOWN)", 
            desc: "IDENTIFICATION: Clown attire. Shouldn't exist.<br>ACTION: COMPLY. Serve immediately. Do not deny."
        },
        {
            type: "identity", 
            title: "MISSING PERSON", 
            desc: "IDENTIFICATION: Status marked as MISSING in DB.<br>ACTION: Deny service. Silent alarm."
        }
    ];

    const residents = [
        { name: "PATTERSON, MICHAEL", id: "487-29-6153", job: "BANKER", missing: "NO" },
        { name: "HAYES, ROBERT", id: "651-43-8927", job: "MECHANIC", missing: "NO" },
        { name: "MORRISON, DAVID", id: "159-82-4736", job: "TEACHER", missing: "NO" },
        { name: "FOSTER, JAMES", id: "917-54-2638", job: "ELECTRICIAN", missing: "NO" },
        { name: "LEE, CHRISTOPHER", id: "264-78-9145", job: "PLUMBER", missing: "NO" },
        { name: "COOPER, DANIEL", id: "925-48-1637", job: "ACCOUNTANT", missing: "NO" },
        { name: "WRIGHT, MATTHEW", id: "384-72-5916", job: "DRIVER", missing: "YES" },
        { name: "BENNETT, JOSHUA", id: "862-51-4398", job: "CONSTRUCTION", missing: "NO" },
        { name: "KELLY, BRANDON", id: "743-94-2156", job: "MANAGER", missing: "NO" },
        { name: "MURPHY, KEVIN", id: "439-17-5624", job: "CLERK", missing: "NO" },
        { name: "BARNES, TYLER", id: "821-43-9562", job: "LANDSCAPER", missing: "NO" },
        { name: "HILL, GREGORY", id: "952-34-6813", job: "SECURITY", missing: "YES" },
        { name: "STEWART, NATHAN", id: "647-21-8534", job: "COOK", missing: "NO" },
        { name: "PARKER, RYAN", id: "863-42-5178", job: "DRIVER", missing: "NO" },
        { name: "COOK, AUSTIN", id: "683-91-2564", job: "LIBRARIAN", missing: "NO" },
        { name: "THOMPSON, HAROLD", id: "241-89-7356", job: "RETIRED", missing: "NO" },
        { name: "JENKINS, WALTER", id: "293-84-7261", job: "RETIRED", missing: "NO" },
        { name: "ANDERSON, GEORGE", id: "528-67-3941", job: "RETIRED", missing: "NO" },
        { name: "MITCHELL, FRANK", id: "795-16-4823", job: "RETIRED", missing: "NO" },
        { name: "COLLINS, SARAH", id: "736-21-5984", job: "NURSE", missing: "NO" },
        { name: "WALSH, JENNIFER", id: "482-95-6371", job: "ACCOUNTANT", missing: "NO" },
        { name: "BROOKS, AMANDA", id: "538-16-7492", job: "TEACHER", missing: "NO" },
        { name: "STONE, MICHELLE", id: "671-39-8254", job: "RECEPTIONIST", missing: "YES" },
        { name: "RODRIGUEZ, REBECCA", id: "517-26-8943", job: "STYLIST", missing: "NO" },
        { name: "PRICE, EMILY", id: "286-65-7831", job: "DENTIST", missing: "NO" },
        { name: "SCOTT, RACHEL", id: "694-82-3179", job: "MANAGER", missing: "NO" },
        { name: "ADAMS, NICOLE", id: "175-96-4287", job: "LIBRARIAN", missing: "NO" },
        { name: "HUGHES, AMBER", id: "318-67-2945", job: "CASHIER", missing: "NO" },
        { name: "REED, MELISSA", id: "529-74-1692", job: "WAITRESS", missing: "NO" },
        { name: "GARCIA, HEATHER", id: "426-58-9137", job: "TELLER", missing: "NO" },
        { name: "MORGAN, BRITTANY", id: "159-37-6842", job: "SECRETARY", missing: "NO" },
        { name: "COLEMAN, VANESSA", id: "342-85-7926", job: "SOCIAL WORKER", missing: "NO" },
        { name: "LONG, TIFFANY", id: "618-29-4573", job: "FLORIST", missing: "NO" },
        { name: "HENDERSON, SAMANTHA", id: "937-54-2186", job: "PHARMACIST", missing: "NO" },
        { name: "PERRY, JESSICA", id: "254-76-8941", job: "REAL ESTATE", missing: "NO" },
        { name: "WILLIAMS, DOROTHY", id: "786-13-5624", job: "RETIRED", missing: "NO" },
        { name: "BAILEY, MARGARET", id: "425-89-3167", job: "RETIRED", missing: "NO" },
        { name: "SANDERS, BARBARA", id: "571-46-9238", job: "RETIRED", missing: "NO" },
        { name: "EVANS, HELEN", id: "893-27-4651", job: "RETIRED", missing: "YES" }
    ];

    // --- 5. RENDER FUNCTIONS ---

    function renderAllData() {
        // Only render if empty to prevent duplicates
        if(document.getElementById('protocol-display').children.length === 0) {
            renderProtocols("all");
            renderResidents("all", "");
        }
    }

    // Render Protocols
    const protoContainer = document.getElementById('protocol-display');
    
    function renderProtocols(filter) {
        protoContainer.innerHTML = "";
        
        protocols.forEach(p => {
            if (filter === "all" || p.type === filter) {
                const div = document.createElement('div');
                div.className = "data-card";
                
                // Set color based on type
                let colorClass = "status-ok";
                if(p.type === "identity") colorClass = "danger-text";
                if(p.type === "special") colorClass = "highlight"; // Special color for Clown

                div.innerHTML = `
                    <div class="data-header">
                        <span>${p.title}</span>
                        <span class="${colorClass}">[${p.type.toUpperCase()}]</span>
                    </div>
                    <div class="data-body">${p.desc}</div>
                `;
                protoContainer.appendChild(div);
            }
        });
    }

    // Render Residents
    const regContainer = document.getElementById('registry-display');

    function renderResidents(statusFilter, searchText) {
        regContainer.innerHTML = "";

        residents.forEach(r => {
            // Text Match
            const textMatch = r.name.includes(searchText) || r.id.includes(searchText);
            
            // Status Match
            let statusMatch = false;
            if (statusFilter === "all") statusMatch = true;
            if (statusFilter === "safe" && r.missing === "NO") statusMatch = true;
            if (statusFilter === "missing" && r.missing === "YES") statusMatch = true;

            if (textMatch && statusMatch) {
                const div = document.createElement('div');
                div.className = "data-card";
                
                const isMissing = r.missing === "YES";
                const statusLabel = isMissing ? "MISSING" : "VERIFIED";
                const statusClass = isMissing ? "status-missing" : "status-ok";

                div.innerHTML = `
                    <div class="data-header">
                        <span>${r.name}</span>
                        <span class="${statusClass}">[${statusLabel}]</span>
                    </div>
                    <div class="data-body">
                        ID: ${r.id} | JOB: ${r.job}<br>
                        STATUS: ${r.missing === "YES" ? "UNKNOWN" : "ACTIVE"}
                    </div>
                `;
                regContainer.appendChild(div);
            }
        });
    }

    // Intersection Observer for scroll animations
    function setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // START
    runBoot();
});
