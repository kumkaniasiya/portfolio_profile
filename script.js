// Improved script.js

// Selectors for dynamic elements
const constellationBackground = document.getElementById("constellation-background");
const typingTextElement = document.getElementById("typing-text");

// Create a constellation
function createConstellation(x, y) {
    if (!constellationBackground) return;

    const constellation = document.createElement("div");
    constellation.classList.add("constellation");

    // Set random size and position near the mouse pointer
    const size = Math.random() * 4 + 2; // Random size between 2px and 6px
    constellation.style.width = `${size}px`;
    constellation.style.height = `${size}px`;
    constellation.style.left = `${x}px`;
    constellation.style.top = `${y}px`;

    // Animate lines between points
    for (let i = 0; i < 3; i++) {
        const line = document.createElement("div");
        line.style.position = "absolute";
        line.style.background = "white";
        line.style.height = "2px";
        line.style.width = `${Math.random() * 50 + 30}px`; // Line length
        line.style.transformOrigin = "left";
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.opacity = "0.6";
        constellation.appendChild(line);
    }

    constellationBackground.appendChild(constellation);

    // Remove the constellation after animation
    setTimeout(() => constellation.remove(), 3000);
}

if (constellationBackground) {
    document.addEventListener("mousemove", (e) => {
        createConstellation(e.clientX, e.clientY);
    });
}

// Text typing effect
const text = `
Hi, I'm Solomon Asiya, a highly experienced Nature Conservationist with a passion for combining environmental conservation and technology. 
With over five years of experience in conservation management and advanced skills in programming and web technologies, I strive to develop innovative solutions to environmental challenges.

I hold an Advanced Diploma in Nature Conservation from the Cape Peninsula University of Technology and certifications in Software Development and Cyber Threat Management. 
My expertise spans conservation policy implementation, natural resource management, and digital mapping tools like QGIS.
`;

let index = 0;
function typeText() {
    if (typingTextElement && index < text.length) {
        typingTextElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 50); // Adjust typing speed here
    }
}

// Smooth scrolling for navbar links
document.addEventListener("DOMContentLoaded", () => {
    // Navbar interactions
    const navbarLinks = document.querySelectorAll(".navbar li a");
    navbarLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            } else {
                window.location.href = link.getAttribute("href");
            }
        });
    });

    // Trigger typing effect
    if (typingTextElement) typeText();

    // Skill block hover effects
    const skillBlocks = document.querySelectorAll(".skill");
    skillBlocks.forEach(skillBlock => {
        skillBlock.addEventListener("mouseenter", () => {
            skillBlock.style.transform = "translateY(-5px)";
            skillBlock.style.transition = "transform 0.3s ease";
            skillBlock.style.cursor = "pointer";
        });

        skillBlock.addEventListener("mouseleave", () => {
            skillBlock.style.transform = "translateY(0)";
            skillBlock.style.transition = "transform 0.3s ease";
            skillBlock.style.cursor = "default";
        });
    });

    // Adjust initial view for devices
    adjustViewForDevices();
});

// Responsive design adjustments
function adjustViewForDevices() {
    const projectsGrid = document.querySelector(".projects-grid");
    const projectCards = document.querySelectorAll(".project-card");

    if (!projectsGrid || projectCards.length === 0) return;

    if (window.innerWidth < 768) {
        projectsGrid.style.gridTemplateColumns = "1fr"; // Single-column layout for small devices
    } else if (window.innerWidth < 1024) {
        projectsGrid.style.gridTemplateColumns = "repeat(2, 1fr)"; // Two-column layout for medium devices
    } else {
        projectsGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))"; // Default layout
    }

    projectCards.forEach(card => {
        card.style.padding = window.innerWidth < 768 ? "15px" : "20px"; // Adjust padding
    });
}

window.addEventListener("resize", adjustViewForDevices);

// Send mail function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendMail() {
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const subject = document.getElementById("subject")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !subject || !message) {
        alert("All fields must be filled out.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const submitButton = document.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const params = { name, email, subject, message };

    if (!window.emailjs) {
        alert("EmailJS library is not loaded.");
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        return;
    }

    emailjs.send("service_nrn2lnl", "template_u52bz18", params)
        .then(response => {
            alert("Message Sent Successfully");
            document.getElementById("confirmation-message").style.display = "block";
            document.getElementById("confirmation-message").textContent = "Thank you for reaching out. I will respond soon!";

            // Clear the form fields after successful submission
            document.getElementById("name").value = '';
            document.getElementById("email").value = '';
            document.getElementById("subject").value = '';
            document.getElementById("message").value = '';
        })
        .catch(error => {
            console.error("FAILED...", error);
            alert("Message failed to send.");
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        });
}

