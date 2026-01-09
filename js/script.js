document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. BOOT SEQUENCE ---
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
    
    const soundBtn = document.getElementById('sound-toggle');
    let soundEnabled = false;

    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < bootLines.length) {
            const p = document.createElement('p');
            p.textContent = "> " + bootLines[lineIndex];
            bootTextContainer.appendChild(p);
            lineIndex++;
            setTimeout(typeLine, Math.random() * 50 + 30);
        } else {
            setTimeout(startMainSite, 800);
        }
    }

    function startMainSite() {
        bootScreen.style.display = 'none';
        mainInterface.classList.remove('hidden');
        
        renderProtocols("all");
        renderResidents("all", "");
        
        setupObserver();
    }

    // --- 2. GAME DATA (FIXED SYNTAX) ---
    // Objects use COLONS (:), not EQUALS (=). 
    
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
        {name:"COOK, AUSTIN", dob="11/30/1958", id:"683-91-2564", occupation="LIBRARIAN", missing:"NO"},
        {name:"THOMPSON, HAROLD", dob="02/12/1912", id:"241-89-7356", occupation="RETIRED", missing:"NO"},
        {name:"JENKINS, WALTER", dob="08/07/1910", id:"293-84-7261", occupation="RETIRED", missing:"NO"},
        {name:"ANDERSON, GEORGE", dob="04/22/1907", id:"528-67-3941", occupation="RETIRED", missing:"NO"},
        {name:"MITCHELL, FRANK", dob="12/15/1909", id:"795-16-4823", occupation="RETIRED", missing:"NO"},
        {name:"COLLINS, SARAH", dob="05/18/1959", id:"736-21-5984", occupation="NURSE", missing:"NO"},
        {name:"WALSH, JENNIFER", dob="09/30/1953", id:"482-95-6371", occupation="ACCOUNTANT", missing:"NO"},
        {name="BROOKS, AMANDA", dob="01/11/1956", id:"538-16-7492", occupation="TEACHER", missing:"NO"},
        {name="STONE, MICHELLE", dob="07/24/1951", id:"671-39-8254", occupation="RECEPTIONIST", missing:"YES"},
        {name="RODRIGUEZ, REBECCA", dob="03/08/1954", id:"517-26-8943", occupation="HAIR STYLIST", missing:"NO"},
        {name="PRICE, EMILY", dob="11/16/1947", id:"286-65-7831", occupation="DENTAL HYGIENIST", missing:"NO"},
        {name="SCOTT, RACHEL", dob="06/28/1952", id:"694-82-3179", occupation="OFFICE MANAGER", missing:"NO"},
        {name="ADAMS, NICOLE", dob="02/14/1955", id:"175-96-4287", occupation="LIBRARIAN", missing:"NO"},
        {name="HUGHES, AMBER", dob="10/05/1950", id:"318-67-2945", occupation="CASHIER", missing:"NO"},
        {name="REED, MELISSA", dob="04/19/1948", id:"529-74-1692", occupation="WAITRESS", missing:"NO"},
        {name="GARCIA, HEATHER", dob="08/12/1957", id:"426-58-9137", occupation="BANK TELLER", missing:"NO"},
        {name="MORGAN, BRITTANY", dob="12/20/1946", id:"159-37-6842", occupation="SECRETARY", missing:"NO"},
        {name="COLEMAN, VANESSA", dob="05/03/1958", id:"342-85-7926", occupation="SOCIAL WORKER", missing:"NO"},
        {name="LONG, TIFFANY", dob="09/17/1945", id:"618-29-4573", occupation="FLORIST", missing:"NO"},
        {name="HENDERSON, SAMANTHA", dob="01/26/1952", id:"937-54-2186", occupation="PHARMACIST", missing:"NO"},
        {name="PERRY, JESSICA", dob="07/09/1954", id:"254-76-8941", occupation="REAL ESTATE AGENT", missing:"NO"},
        {name="WILLIAMS, DOROTHY", dob="03/15/1911", id:"786-13-5624", occupation="RETIRED", missing:"NO"},
        {name="BAILEY, MARGARET", dob="11/22/1908", id:"425-89-3167", occupation="RETIRED", missing:"NO"},
        {name="SANDERS, BARBARA", dob="06/08/1913", id:"571-46-9238", occupation="RETIRED", missing:"NO"},
        {name="EVANS, HELEN", dob="10/30/1906", id:"893-27-4651", occupation="RETIRED", missing:"YES"},
        {name="ROSS, DEREK", dob="04/12/1950", id:"316-94-7582", occupation="POLICE OFFICER", missing:"NO"},
        {name="WATSON, KYLE", dob="08/25/1953", id:"649-52-1834", occupation="POLICE OFFICER", missing:"NO"},
        {name="PHILLIPS, MARCUS", dob="02/07/1947", id:"182-78-6349", occupation="POLICE OFFICER", missing:"NO"},
        {name="HOWARD, TREVOR", dob="12/19/1954", id:"754-31-9276", occupation="POLICE OFFICER", missing:"NO"},
        {name="RIVERA, BLAKE", dob="06/14/1949", id:"428-69-5813", occupation="SWAT OFFICER", missing:"NO"},
        {name="MARTIN, DYLAN", dob="10/28/1951", id:"691-24-8457", occupation="SWAT OFFICER", missing:"NO"},
        {name="POWELL, JACOB", dob="03/21/1952", id:"237-85-1962", occupation="FIREFIGHTER", missing:"NO"},
        {name="RUSSELL, CAMERON", dob="09/04/1948", id:"816-43-7295", occupation="FIREFIGHTER", missing:"NO"},
        {name="GRIFFIN, STEVEN", dob="01/17/1955", id:"549-67-3128", occupation="CONTAINMENT SPECIALIST", missing:"NO"},
        {name="TURNER, ERIC", dob="05/09/1946", id:"892-34-6751", occupation="CONTAINMENT SPECIALIST", missing:"NO"},
        {name="CLARK, ANTHONY", dob="11/23/1944", id:"375-91-4826", occupation="DOCTOR", missing:"NO"},
        {name="WARD, BENJAMIN", dob="07/16/1950", id:"628-54-1973", occupation="DOCTOR", missing:"NO"},
        {name="DAVIS, LAUREN", dob="02/28/1952", id:"741-28-5936", occupation="POLICE OFFICER", missing:"NO"},
        {name="WHITE, COURTNEY", dob="08/15/1954", id:"493-67-2841", occupation="POLICE OFFICER", missing:"NO"},
        {name="HARRIS, DANIELLE", dob="04/03/1949", id:"154-89-6372", occupation="POLICE OFFICER", missing:"NO"},
        {name="YOUNG, MONICA", dob="12/11/1956", id:"867-32-4195", occupation="POLICE OFFICER", missing:"NO"},
        {name="KING, ASHLEY", dob="06/07/1951", id:"573-04-5618", occupation="SWAT OFFICER", missing:"NO"},
        {name="THOMAS, STEPHANIE", dob="10/22/1953", id:"715-48-9263", occupation="SWAT OFFICER", missing:"NO"},
        {name="JOHNSON, CRYSTAL", dob="03/14/1955", id:"582-93-1746", occupation="FIREFIGHTER", missing:"NO"},
        {name="MARTINEZ, DIANA", dob="09/28/1947", id:"946-27-3581", occupation="FIREFIGHTER", missing:"NO"},
        {name="MOORE, REBECCA", dob="01/05/1950", id:"674-51-8329", occupation="CONTAINMENT SPECIALIST", missing:"NO"},
        {name="LEWIS, VICTORIA", dob="05/19/1958", id:"283-96-4715", occupation="CONTAINMENT SPECIALIST", missing:"NO"},
        {name="MILLER, KAREN", dob="11/08/1945", id:"457-62-9138", occupation="DOCTOR", missing:"NO"}
    ];

    // --- 3. FILTER LOGIC & RENDERING ---
    
    const protoFilter = document.getElementById('protocol-filter');
    protoFilter.addEventListener('change', () => {
        renderProtocols(protoFilter.value);
    });

    function renderProtocols(filterType) {
        const container = document.getElementById('protocol-container');
        container.innerHTML = ""; 

        protocols.forEach(p => {
            if (filterType === 'all' || p.type === filterType) {
                const div = document.createElement('div');
                div.className = 'file-entry reveal';
                div.innerHTML = `
                    <div class="file-header">
                        <span>ANOMALY: ${p.title}</span>
                        <span style="color:${p.type === 'behavior' ? '#ffcc00' : '#33ff33'}">[READ_ONLY]</span>
                    </div>
                    <div class="protocol-desc">${p.desc}</div>
                `;
                container.appendChild(div);
            }
        });
        
        setupObserver();
    }

    const resSearch = document.getElementById('resident-search');
    const resFilter = document.getElementById('missing-filter');

    resSearch.addEventListener('input', () => {
        renderResidents(resFilter.value, resSearch.value.toUpperCase());
    });
    
    resFilter.addEventListener('change', () => {
        renderResidents(resFilter.value, resSearch.value.toUpperCase());
    });

    function renderResidents(filterStatus, searchText) {
        const container = document.getElementById('registry-container');
        container.innerHTML = "";

        residents.forEach(r => {
            const matchesText = r.name.includes(searchText) || r.id.includes(searchText);
            const matchesFilter = filterStatus === 'all' || 
                                  (filterStatus === 'missing' && r.missing === 'YES') ||
                                  (filterStatus === 'safe' && r.missing === 'NO');

            if (matchesText && matchesFilter) {
                const div = document.createElement('div');
                div.className = 'file-entry reveal';
                
                const missingStyle = r.missing === 'YES' ? 'class="missing-alert"' : '';
                const verifiedStatus = r.missing === 'YES' ? '[MISSING]' : '[VERIFIED]';

                div.innerHTML = `
                    <div class="file-header">
                        <span>${r.name}</span>
                        <span ${missingStyle}>${verifiedStatus}</span>
                    </div>
                    <div class="resident-card">
                        <div><span class="resident-data">ID:</span> <span class="resident-val">${r.id}</span></div>
                        <div><span class="resident-data">DOB:</span> <span class="resident-val">${r.dob}</span></div>
                        <div><span class="resident-data">JOB:</span> <span class="resident-val">${r.occupation}</span></div>
                        <div><span class="resident-data">MISSING:</span> <span class="resident-val" ${missingStyle}>${r.missing}</span></div>
                    </div>
                `;
                container.appendChild(div);
            }
        });
        setupObserver();
    }

    // --- 4. UTILITIES ---
    
    soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundBtn.textContent = soundEnabled ? "[ SOUND: ON ]" : "[ SOUND: OFF ]";
    });

    function setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.05 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    setTimeout(typeLine, 500);
});
