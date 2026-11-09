document.addEventListener("DOMContentLoaded", () => {
    
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll("nav li");
    const toolSections = document.querySelectorAll(".tool-section");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove("active"));
            toolSections.forEach(section => section.classList.remove("active"));
            
            // Add active class to clicked
            item.classList.add("active");
            const targetId = item.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
        });
    });

    // --- Tool 1: URL Encoder / Decoder ---
    const urlInput = document.getElementById("url-input");
    const urlOutput = document.getElementById("url-output");

    document.getElementById("url-encode").addEventListener("click", () => {
        urlOutput.value = encodeURIComponent(urlInput.value);
    });

    document.getElementById("url-decode").addEventListener("click", () => {
        try {
            urlOutput.value = decodeURIComponent(urlInput.value);
        } catch (e) {
            urlOutput.value = "Error: Invalid URI sequence.";
        }
    });

    document.getElementById("url-clear").addEventListener("click", () => {
        urlInput.value = "";
        urlOutput.value = "";
    });

    // --- Tool 2: HTML Entity Converter ---
    const htmlInput = document.getElementById("html-input");
    const htmlOutput = document.getElementById("html-output");

    document.getElementById("html-encode").addEventListener("click", () => {
        const div = document.createElement('div');
        div.textContent = htmlInput.value;
        htmlOutput.value = div.innerHTML;
    });

    document.getElementById("html-decode").addEventListener("click", () => {
        const div = document.createElement('div');
        div.innerHTML = htmlInput.value;
        htmlOutput.value = div.textContent;
    });

    document.getElementById("html-clear").addEventListener("click", () => {
        htmlInput.value = "";
        htmlOutput.value = "";
    });

    // --- Tool 3: Timestamp Converter ---
    const unixInput = document.getElementById("unix-input");
    const humanInput = document.getElementById("human-input");

    document.getElementById("get-current-time").addEventListener("click", () => {
        unixInput.value = Math.floor(Date.now() / 1000);
        convertTime();
    });

    function convertTime() {
        if (!unixInput.value) return;
        // Multiply by 1000 to convert seconds to milliseconds
        const date = new Date(unixInput.value * 1000);
        if (isNaN(date.getTime())) {
            humanInput.value = "Invalid Timestamp";
        } else {
            humanInput.value = date.toLocaleString();
        }
    }
    document.getElementById("time-convert").addEventListener("click", convertTime);

    // --- Tool 4: Regex Tester ---
    const regexPattern = document.getElementById("regex-pattern");
    const regexText = document.getElementById("regex-text");
    const regexOutput = document.getElementById("regex-output");

    document.getElementById("regex-test").addEventListener("click", () => {
        const pattern = regexPattern.value;
        const text = regexText.value;

        if (!pattern) {
            regexOutput.innerHTML = "Please enter a pattern.";
            return;
        }

        try {
            const regex = new RegExp(pattern, 'g');
            // Escape HTML to prevent XSS
            const safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            
            // Highlight matches
            const highlighted = safeText.replace(regex, match => {
                return `<span class="highlight">${match}</span>`;
            });

            regexOutput.innerHTML = highlighted || "No matches found.";
        } catch (e) {
            regexOutput.innerHTML = `<span style="color: #ff3333">Invalid Regex: ${e.message}</span>`;
        }
    });

    // --- Tool 5: Placeholder Image Generator ---
    const canvas = document.getElementById("image-canvas");
    const ctx = canvas.getContext("2d");

    document.getElementById("img-generate").addEventListener("click", () => {
        const width = parseInt(document.getElementById("img-width").value) || 600;
        const height = parseInt(document.getElementById("img-height").value) || 400;
        const color = document.getElementById("img-color").value;
        const text = document.getElementById("img-text").value || `${width} x ${height}`;

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        // Draw background
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);

        // Draw border for styling
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, width, height);

        // Draw Text
        ctx.fillStyle = "#ffffff";
        // Calculate font size based on canvas width
        const fontSize = Math.floor(width / 10);
        ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Add text shadow for readability
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(text, width / 2, height / 2);
        
        // Reset shadow
        ctx.shadowColor = "transparent";
    });

    // Generate an initial image on load
    document.getElementById("img-generate").click();
});