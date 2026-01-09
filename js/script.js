document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CONFIGURATION ---
    const bootSpeed = 30; // ms per line
    const bootLines = [
        "BIOS DATE 01/01/88 14:22:56 VER 1.02",
        "CPU: NEC V20, SPEED: 8 MHz",
        "640K RAM SYSTEM... OK",
        "INITIALIZING VIDEO ADAPTER... CGA OK",
        "LOADING FERNDALE_OS...",
        "MOUNTING DRIVE A: ... FAILED",
        "MOUNTING DRIVE C: ... SUCCESS",
        "ACCESSING CLASSIFIED ARCHIVES...",
        "DECRYPTING SECURE FILES...",
        "ACCESS GRANTED."
    ];

    const bootScreen = document.getElementById('boot-screen');
    const bootTextContainer = document.getElementById('boot-text');
    const mainInterface = document.getElementById('main-interface');

    // --- GAME DATA (FROM LUA) ---
    const residents = [
        {name:"PATTERSON, MICHAEL", dob:"06/14/1956", address:"142 MAPLE AVENUE", id:"487-29-6153", occupation:"BANKER", missing:"NO"},
        {name:"HAYES, ROBERT", dob="03/22/1952", address="567 PINE ROAD", id="651-43-8927", occupation="MECHANIC", missing="NO"},
        {name:"MORRISON, DAVID", dob="11/08/1949", address="234 CEDAR LANE", id="159-82-4736", occupation="TEACHER", missing="NO"},
        {name:"FOSTER, JAMES", dob="09/30/1954", address="321 1ST STREET", id="917-54-2638", occupation="ELECTRICIAN", missing="NO"},
        {name:"LEE, CHRISTOPHER", dob="04/17/1947", address="156 5TH STREET", id="264-78-9145", occupation="PLUMBER", missing="NO"},
        {name:"COOPER, DANIEL", dob="12/25/1950", address="847 NORTH MAIN STREET", id="925-48-1637", occupation="ACCOUNTANT", missing="NO"},
        {name:"WRIGHT, MATTHEW", dob="08/11/1966", address="412 SOUTH PARK AVENUE", id="384-72-5916", occupation="DELIVERY DRIVER", missing="NO"},
        {name:"BENNETT, JOSHUA", dob="02/19/1953", address="756 EAST RIVER ROAD", id="862-51-4398", occupation="CONSTRUCTION WORKER", missing="NO"},
        {name:"KELLY, BRANDON", dob="07/05/1951", address="673 RIVER VIEW DRIVE", id="743-94-2156", occupation="WAREHOUSE MANAGER", missing="NO"},
        {name="MURPHY, KEVIN", dob="10/28/1948", address="345 CHURCH STREET", id="439-17-5624", occupation="STORE CLERK", missing="NO"},
        {name="BARNES, TYLER", dob="01/14/1965", address="267 STATION AVENUE", id="821-43-9562", occupation="LANDSCAPER", missing="NO"},
        {name="HILL, GREGORY", dob="05/09/1945", address="689 BRIDGE STREET", id="952-34-6813", occupation="SECURITY GUARD", missing="NO"},
        {name="STEWART, NATHAN", dob="09/23/1967", address="756 DEAD END LANE", id="647-21-8534", occupation="COOK", missing="NO"},
        {name="PARKER, RYAN", dob="03/16/1944", address="812 LAST MILE DRIVE", id="863-42-5178", occupation="TRUCK DRIVER", missing="NO"},
        {name="COOK, AUSTIN", dob="11/30/1958", address="934 PINE ROAD", id="683-91-2564", occupation="LIBRARIAN", missing="NO"},
        {name="THOMPSON, HAROLD", dob="02/12/1912", address="145 MAIN STREET", id="241-89-7356", occupation="RETIRED", missing="NO"},
        {name="JENKINS, WALTER", dob="08/07/1910", address="89 OAK DRIVE", id="293-84-7261", occupation="RETIRED", missing="NO"},
        {name="ANDERSON, GEORGE", dob="04/22/1907", address="78 ELM STREET", id="528-67-3941", occupation="RETIRED", missing="NO"},
        {name="MITCHELL, FRANK", dob="12/15/1909", address="378 MAPLE AVENUE", id="795-16-4823", occupation="RETIRED", missing="NO"},
        {name="COLLINS, SARAH", dob="05/18/1959", address="445 BIRCH WAY", id="736-21-5984", occupation="NURSE", missing="NO"},
        {name="WALSH, JENNIFER", dob="09/30/1953", address="912 WILLOW COURT", id="482-95-6371", occupation="ACCOUNTANT", missing="NO"},
        {name="BROOKS, AMANDA", dob="01/11/1956", address="689 9TH STREET", id="538-16-7492", occupation="TEACHER", missing="NO"},
        {name="STONE, MICHELLE", dob="07/24/1951", address="203 12TH STREET", id="671-39-8254", occupation="RECEPTIONIST", missing="NO"},
        {name="RODRIGUEZ, REBECCA", dob="03/08/1954", address="194 SUNSET BOULEVARD", id="517-26-8943", occupation="HAIR STYLIST", missing="NO"},
        {name="PRICE, EMILY", dob="11/16/1947", address="921 VALLEY PATH", id="286-65-7831", occupation="DENTAL HYGIENIST", missing="NO"},
        {name="SCOTT, RACHEL", dob="06/28/1952", address="812 SCHOOL ROAD", id="694-82-3179", occupation="OFFICE MANAGER", missing="NO"},
        {name="ADAMS, NICOLE", dob="02/14/1955", address="538 MILL ROAD", id="175-96-4287", occupation="LIBRARIAN", missing="NO"},
        {name="HUGHES, AMBER", dob="10/05/1950", address="423 FOREST LANE", id="318-67-2945", occupation="CASHIER", missing="NO"},
        {name="REED, MELISSA", dob="04/19/1948", address="194 EMPTY ROAD", id="529-74-1692", occupation="WAITRESS", missing="NO"},
        {name="GARCIA, HEATHER", dob="08/12/1957", address="621 OAK DRIVE", id="426-58-9137", occupation="BANK TELLER", missing="NO"},
        {name="MORGAN, BRITTANY", dob="12/20/1946", address="287 CEDAR LANE", id="159-37-6842", occupation="SECRETARY", missing="NO"},
        {name="COLEMAN, VANESSA", dob="05/03/1958", address="845 BIRCH WAY", id="342-85-7926", occupation="SOCIAL WORKER", missing="NO"},
        {name="LONG, TIFFANY", dob="09/17/1945", address="196 WILLOW COURT", id="618-29-4573", occupation="FLORIST", missing="NO"},
        {name="HENDERSON, SAMANTHA", dob="01/26/1952", address="729 1ST STREET", id="937-54-2186", occupation="PHARMACIST", missing="NO"},
        {name="PERRY, JESSICA", dob="07/09/1954", address="463 5TH STREET", id="254-76-8941", occupation="REAL ESTATE AGENT", missing="NO"},
        {name="WILLIAMS, DOROTHY", dob="03/15/1911", address="851 9TH STREET", id="786-13-5624", occupation="RETIRED", missing="NO"},
        {name="BAILEY, MARGARET", dob="11/22/1908", address="318 12TH STREET", id="425-89-3167", occupation="RETIRED", missing="NO"},
        {name="SANDERS, BARBARA", dob="06/08/1913", address="642 NORTH MAIN STREET", id="571-46-9238", occupation="RETIRED", missing="NO"},
        {name="EVANS, HELEN", dob="10/30/1906", address="195 SOUTH PARK AVENUE", id="893-27-4651", occupation="RETIRED", missing="NO"},
        {name="ROSS, DEREK", dob="04/12/1950", address="478 EAST RIVER ROAD", id="316-94-7582", occupation="POLICE OFFICER", missing="NO"},
        {name="WATSON, KYLE", dob="08/25/1953", address="724 WEST HILL DRIVE", id="649-52-1834", occupation="POLICE OFFICER", missing="NO"},
        {name="PHILLIPS, MARCUS", dob="02/07/1947", address="261 SUNSET BOULEVARD", id="182-78-6349", occupation="POLICE OFFICER", missing="NO"},
        {name="HOWARD, TREVOR", dob="12/19/1954", address="539 RIVER VIEW DRIVE", id="754-31-9276", occupation="POLICE OFFICER", missing="NO"},
        {name="RIVERA, BLAKE", dob="06/14/1949", address="816 VALLEY PATH", id="428-69-5813", occupation="SWAT OFFICER", missing="NO"},
        {name="MARTIN, DYLAN", dob="10/28/1951", address="372 CHURCH STREET", id="691-24-8457", occupation="SWAT OFFICER", missing="NO"},
        {name="POWELL, JACOB", dob="03/21/1952", address="945 SCHOOL ROAD", id="237-85-1962", occupation="FIREFIGHTER", missing="NO"},
        {name="RUSSELL, CAMERON", dob="09/04/1948", address="584 STATION AVENUE", id="816-43-7295", occupation="FIREFIGHTER", missing="NO"},
        {name="GRIFFIN, STEVEN", dob="01/17/1955", address="287 MILL ROAD", id="549-67-3128", occupation="CONTAINMENT SPECIALIST", missing="NO"},
        {name="TURNER, ERIC", dob="05/09/1946", address="724 BRIDGE STREET", id="892-34-6751", occupation="CONTAINMENT SPECIALIST", missing="NO"},
        {name="CLARK, ANTHONY", dob="11/23/1944", address="156 FOREST LANE", id="375-91-4826", occupation="DOCTOR", missing="NO"},
        {name="WARD, BENJAMIN", dob="07/16/1950", address="489 DEAD END LANE", id="628-54-1973", occupation="DOCTOR", missing="NO"},
        {name="DAVIS, LAUREN", dob="02/28/1952", address="612 EMPTY ROAD", id="741-28-5936", occupation="POLICE OFFICER", missing="NO"},
        {name="WHITE, COURTNEY", dob="08/15/1954", address="357 LAST MILE DRIVE", id="493-67-2841", occupation="POLICE OFFICER", missing="NO"},
        {name="HARRIS, DANIELLE", dob="04/03/1949", address="928 MAIN STREET", id="154-89-6372", occupation="POLICE OFFICER", missing="NO"},
        {name="YOUNG, MONICA", dob="12/11/1956", address="245 MAPLE AVENUE", id="867-32-4195", occupation="POLICE OFFICER", missing="NO"},
        {name="KING, ASHLEY", dob="06/07/1951", address="573 OAK DRIVE", id="329-74-5618", occupation="SWAT OFFICER", missing="NO"},
        {name="THOMAS, STEPHANIE", dob="10/22/1953", address="891 PINE ROAD", id="715-48-9263", occupation="SWAT OFFICER", missing="NO"},
        {name="JOHNSON, CRYSTAL", dob="03/14/1955", address="427 CEDAR LANE", id="582-93-1746", occupation="FIREFIGHTER", missing="NO"},
        {name="MARTINEZ, DIANA", dob="09/28/1947", address="765 ELM STREET", id="946-27-3581", occupation="FIREFIGHTER", missing="NO"},
        {name="MOORE, REBECCA", dob="01/05/1950", address="318 BIRCH WAY", id="674-51-8329", occupation="CONTAINMENT SPECIALIST", missing="NO"},
        {name="LEWIS, VICTORIA", dob="05/19/1958", address="592 WILLOW COURT", id="283-96-4715", occupation="CONTAINMENT SPECIALIST", missing="NO"},
        {name="MILLER, KAREN", dob="11/08/1945", address="841 9TH STREET", id="457-62-9138", occupation="DOCTOR", missing="NO"}
    ];

    const protocolCategories = [
        {title:"PHYSICAL DEFORMITIES", desc:"<b>IDENTIFICATION:</b> <u>Extra or missing limbs</u>, <u>multiple heads</u>, <u>distorted facial features</u>.<br><br><b>PROTOCOL:</b> <u>Deny service immediately</u>. Do not make direct eye contact."},
        {title:"PROPORTIONAL ABNORMALITIES", desc:"<b>IDENTIFICATION:</b> <u>Height, width, or body proportions</u> deviate significantly from human norms.<br><br><b>PROTOCOL:</b> <u>Cross-reference ID appearance details</u>."},
        {title:"VISUAL DISTORTIONS", desc:"<b>IDENTIFICATION:</b> <u>Pixelated or low-resolution appearance</u>, <u>flickering body parts</u>.<br><br><b>PROTOCOL:</b> Focus on <u>ID card appearance description</u>. Complete transaction quickly."},
        {title:"FRAUDULENT IDENTIFICATION", desc:"<b>IDENTIFICATION:</b> <u>Misspelled names</u>, <u>impossible birth dates</u>.<br><br><b>PROTOCOL:</b> <u>Cross-reference name and DOB</u> with city registry database."},
        {title:"IDENTITY THEFT", desc:"<b>IDENTIFICATION:</b> Valid ID but <u>physical appearance does not match</u> registry.<br><br><b>PROTOCOL:</b> <u>Compare physical traits to registry description</u>."},
        {title:"BEHAVIORAL ABERRATIONS", desc:"<b>IDENTIFICATION:</b> <u>Unnatural movement patterns</u>, <u>distorted speech</u>.<br><br><b>PROTOCOL:</b> Complete verification quickly. <u>Avoid prolonged conversation</u>."},
        {title:"IMPOSSIBLE REQUESTS", desc:"<b>IDENTIFICATION:</b> Requests for <u>human body parts</u>, <u>abstract concepts</u>.<br><br><b>PROTOCOL:</b> <u>Deny calmly</u>. State item is not in stock."},
        {title:"MISSING STATUS", desc:"<b>IDENTIFICATION:</b> Registry shows resident as <u>MISSING: YES</u>.<br><br><b>PROTOCOL:</b> <u>Deny service</u>. <u>Alert authorities immediately</u>."}
    ];

    // --- 2. BOOT SEQUENCE LOGIC ---
    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < bootLines.length) {
            const p = document.createElement('p');
            p.textContent = "> " + bootLines[lineIndex];
            bootTextContainer.appendChild(p);
            
            // Randomize typing speed slightly for realism
            const randomDelay = Math.random() * 50 + 50;
            
            lineIndex++;
            setTimeout(typeLine, randomDelay);
        } else {
            // Boot finished
            setTimeout(startMainSite, 1000);
        }
    }

    function startMainSite() {
        // Collapse boot screen
        bootScreen.style.display = 'none';
        
        // Show main interface
        mainInterface.classList.remove('hidden');
        
        // Generate Dynamic Content
        populateRegistry();
        populateProtocols();

        // Trigger scroll observer
        setupObserver();
    }

    // --- 3. DYNAMIC CONTENT GENERATION ---
    function populateRegistry() {
        const registrySection = document.getElementById('registry-list');
        
        // Just take first 5 residents for the demo site to keep it clean
        // You could add a search bar simulation here later
        const demoResidents = residents.slice(0, 5);

        demoResidents.forEach(res => {
            const entry = document.createElement('div');
            entry.classList.add('file-entry', 'reveal');
            entry.innerHTML = `
                <div class="file-header">
                    <span class="file-id">${res.name}</span>
                    <span class="file-status">[VERIFIED]</span>
                </div>
                <div class="type-body">
                    <p>ID: ${res.id}</p>
                    <p>DOB: ${res.dob}</p>
                    <p>JOB: ${res.occupation}</p>
                    <p>ADDR: ${res.address}</p>
                </div>
            `;
            registrySection.appendChild(entry);
        });
    }

    function populateProtocols() {
        const protocolSection = document.getElementById('protocol-list');

        protocolCategories.forEach(proto => {
            const entry = document.createElement('div');
            entry.classList.add('file-entry', 'reveal', 'alert-entry'); // Added alert-entry for red styling potential
            entry.innerHTML = `
                <div class="file-header">
                    <span class="file-id">PROTOCOL: ${proto.title}</span>
                    <span class="file-status" style="color:red">[MANDATORY]</span>
                </div>
                <div class="type-body">
                    <p>${proto.desc}</p>
                </div>
            `;
            protocolSection.appendChild(entry);
        });
    }

    // --- 4. SCROLL REVEAL LOGIC ---
    function setupObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of item is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements that exist now (static) and wait for dynamic ones
        setTimeout(() => {
            const elements = document.querySelectorAll('.reveal');
            elements.forEach(el => observer.observe(el));
        }, 100);
    }

    // Start the sequence
    setTimeout(typeLine, 500);
});
