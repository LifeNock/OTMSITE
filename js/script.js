document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CONFIGURATION ---
    const bootSpeed = 50; // ms per line
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

    // --- 2. BOOT SEQUENCE LOGIC ---
    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < bootLines.length) {
            const p = document.createElement('p');
            p.textContent = "> " + bootLines[lineIndex];
            bootTextContainer.appendChild(p);
            
            // Randomize typing speed slightly for realism
            const randomDelay = Math.random() * 100 + 100;
            
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
        
        // Trigger scroll observer
        setupObserver();
    }

    // --- 3. SCROLL REVEAL LOGIC ---
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
                    // Play a tiny beep sound logic could go here
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
    }

    // Start the sequence
    setTimeout(typeLine, 500);
});
