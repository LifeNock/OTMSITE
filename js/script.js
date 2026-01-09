document.addEventListener("DOMContentLoaded", () => {
    
    // --- BOOT SEQUENCE ---
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
        renderData(); // Inject Lua data
        setupObserver();
    }

    // --- GAME DATA (Converted from Lua) ---
    
    const protocols = [
        {title:"PHYSICAL DEFORMITIES", desc:"IDENTIFICATION: Extra or missing limbs, multiple heads, distorted facial features.<br>PROTOCOL: Deny service immediately. Do not make direct eye contact."},
        {title:"PROPORTIONAL ABNORMALITIES", desc:"IDENTIFICATION: Height/width deviate from norms. Head-to-body ratio incorrect.<br>PROTOCOL: Cross-reference ID appearance details."},
        {title:"VISUAL DISTORTIONS", desc:"IDENTIFICATION: Pixelated appearance, flickering body parts, unnatural skin colors.<br>PROTOCOL: Focus on ID card appearance description."},
        {title:"FRAUDULENT IDENTIFICATION", desc:"IDENTIFICATION: Misspelled names, impossible birth dates (future dates, 1800s).<br>PROTOCOL: Cross-reference name and DOB with registry."},
        {title:"IDENTITY THEFT", desc:"IDENTIFICATION: Valid ID but physical appearance does not match registry description.<br>PROTOCOL: Compare physical traits to registry description."},
        {title:"BEHAVIORAL ABERRATIONS", desc:"IDENTIFICATION: Unnatural movement (teleportation), distorted speech, no breathing.<br>PROTOCOL: Complete verification quickly. Avoid conversation."},
        {title:"IMPOSSIBLE REQUESTS", desc:"IDENTIFICATION: Requests for human body parts, abstract concepts, non-existent products.<br>PROTOCOL: Deny calmly."},
        {title:"MISSING STATUS", desc:"IDENTIFICATION: Registry shows resident as MISSING: YES.<br>PROTOCOL: Deny service. Alert authorities immediately."}
    ];

    const residents = [
        {name:"PATTERSON, MICHAEL", dob:"06/14/1956", id:"487-29-6153", occupation:"BANKER", missing:"NO"},
        {name:"HAYES, ROBERT", dob="03/22/1952", id:"651-43-8927", occupation:"MECHANIC", missing:"NO"},
        {name:"MORRISON, DAVID", dob="11/08/1949", id:"159-82-4736", occupation:"TEACHER", missing:"NO"},
        {name:"FOSTER, JAMES", dob="09/30/1954", id:"917-54-2638", occupation:"ELECTRICIAN", missing:"NO"},
        {name:"COOPER, DANIEL", dob="12/25/1950", id:"925-48-1637", occupation:"ACCOUNTANT", missing:"NO"},
        {name:"WRIGHT, MATTHEW", dob="08/11/1966", id:"384-72-5916", occupation="DELIVERY DRIVER", missing:"NO"},
        {name:"THOMPSON, HAROLD", dob="02/12/1912", id:"241-89-7356", occupation="RETIRED", missing:"NO"},
        {name:"COLLINS, SARAH", dob="05/18/1959", id:"736-21-5984", occupation="NURSE", missing:"NO"},
        {name:"WALSH, JENNIFER", dob="09/30/1953", id:"482-95-6371", occupation="ACCOUNTANT", missing="NO"},
        {name="BROOKS, AMANDA", dob="01/11/1956", id:"538-16-7492", occupation="TEACHER", missing:"NO"},
        {name="STONE, MICHELLE", dob="07/24/1951", id:"671-39-8254", occupation="RECEPTIONIST", missing:"NO"},
        {name="ROSS, DEREK", dob="04/12/1950", id:"316-94-7582", occupation="POLICE OFFICER", missing:"NO"},
        {name="RIVERA, BLAKE", dob="06/14/1949", id:"428-69-5813", occupation="SWAT OFFICER", missing:"NO"},
        {name="GRIFFIN, STEVEN", dob="01/17/1955", id:"549-67-3128", occupation="CONTAINMENT SPECIALIST", missing:"NO"}
    ];

    function renderData() {
        // 1. Render Protocols
        const protoContainer = document.getElementById('protocol-container');
        protocols.forEach(p => {
            const div = document.createElement('div');
            div.className = 'file-entry reveal';
            div.innerHTML = `
                <div class="file-header">
                    <span>ANOMALY: ${p.title}</span>
                    <span>[READ_ONLY]</span>
                </div>
                <div class="protocol-desc">${p.desc}</div>
            `;
            protoContainer.appendChild(div);
        });

        // 2. Render Residents (First 10 for demo)
        const regContainer = document.getElementById('registry-container');
        residents.forEach(r => {
            const div = document.createElement('div');
            div.className = 'file-entry reveal';
            div.innerHTML = `
                <div class="file-header">
                    <span>${r.name}</span>
                    <span>[VERIFIED]</span>
                </div>
                <div class="resident-card">
                    <div><span class="resident-data">ID:</span> <span class="resident-val">${r.id}</span></div>
                    <div><span class="resident-data">DOB:</span> <span class="resident-val">${r.dob}</span></div>
                    <div><span class="resident-data">JOB:</span> <span class="resident-val">${r.occupation}</span></div>
                    <div><span class="resident-data">MISSING:</span> <span class="resident-val">${r.missing}</span></div>
                </div>
            `;
            regContainer.appendChild(div);
        });
    }

    function setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    setTimeout(typeLine, 500);
});
