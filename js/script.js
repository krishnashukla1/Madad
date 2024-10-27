// Function to handle content display and active button switching
function showContent(event) {
    const target = event.target.getAttribute("data-target");

    // Hide all content sections
    const contents = document.querySelectorAll(".content");
    contents.forEach((content) => content.classList.remove("active"));

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll(".button-group button");
    buttons.forEach((button) => button.classList.remove("active"));

    // Show the clicked section
    document.getElementById(target).classList.add("active");

    // Add 'active' class to the clicked button
    event.target.classList.add("active");
}

// Attach event listeners to buttons
const buttons = document.querySelectorAll(".button-group button");
buttons.forEach((button) => {
    button.addEventListener("click", showContent);
});

document.addEventListener("DOMContentLoaded", () => {
    const process = document.querySelector(".process");
    const steps = document.querySelectorAll(".step");
    const solidLine = document.querySelector(".solid-line");
    const arrow = document.querySelector(".arrow");
    const section3 = document.querySelector(".section-3");

    let isSection3Visible = false;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isSection3Visible = true;
                    updateProgress();
                } else {
                    isSection3Visible = false;
                    solidLine.style.height = "0";
                    arrow.style.top = "0";
                }
            });
        },
        { threshold: 0.1 }
    );

    observer.observe(section3);

    function updateProgress() {
        if (!isSection3Visible) return;

        const scrollPosition = window.scrollY;
        const section3Top = section3.offsetTop;
        const section3Height = section3.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrollPercentage = Math.max(
            0,
            Math.min(
                100,
                ((scrollPosition - section3Top + windowHeight) / section3Height) * 100
            )
        );

        solidLine.style.height = `${scrollPercentage}%`;
        arrow.style.top = `${scrollPercentage}%`;

        steps.forEach((step, index) => {
            const stepTop = step.offsetTop - process.offsetTop;
            const stepHeight = step.offsetHeight;
            const stepMiddle = stepTop + stepHeight / 2;
            const stepPercentage = (stepMiddle / process.offsetHeight) * 100;

            if (scrollPercentage >= stepPercentage) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    updateProgress();
});






// Function to toggle collapsible content and rotate the arrow
function toggleContent(arrow) {
    const content = arrow.parentElement.nextElementSibling; // Get the related content
    const isOpen = content.style.display === 'block'; // Check if content is already open
  
    // Toggle visibility
    content.style.display = isOpen ? 'none' : 'block';
  
    // Rotate the arrow
    arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  }
  


  function adjustContent() {
    var invoiceText = document.getElementById('invoiceText');
    if (window.innerWidth < 768) { // Mobile breakpoint
        // Set margin for mobile
        invoiceText.style.marginLeft = '5px';
        // Remove <br> elements
        invoiceText.innerHTML = invoiceText.innerHTML.replace(/<br\s*\/?>/gi, '');
    } else {
        // Set margin for desktop
        invoiceText.style.marginLeft = '160px';
        // Restore original content with <br> elements
        invoiceText.innerHTML = `
            When you send an invoice to a customer, you have to wait 30, 60, 90 or even 120 days to get paid.
            <br><br>
            But with invoice discounting on Madad, you don't have to wait! We give you most of the invoice amount upfront, so you can use that money to keep your business running smoothly—whether it's paying bills, or taking on new projects.
            <br><br>
            Once your customer pays the invoice, the rest is settled, and you're ready to move forward, without any complicated process or paperwork.
        `;
    }
}

// Adjust content on page load
adjustContent();

// Adjust content on window resize
window.onresize = adjustContent;




document.getElementById('hamburger').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

