
document.addEventListener("DOMContentLoaded", function() {
    // Sticky Header
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            navToggle.classList.toggle("active");
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                navToggle.classList.remove("active");
            });
        });
    }

    // Custom Select Dropdown Logic
    const selectWrappers = document.querySelectorAll(".custom-select-wrapper");

    selectWrappers.forEach(wrapper => {
        const trigger = wrapper.querySelector(".custom-select-trigger");
        const optionsContainer = wrapper.querySelector(".custom-options");
        const nativeSelect = wrapper.querySelector("select");
        const nativeOptions = nativeSelect.querySelectorAll("option");

        // Create custom options
        nativeOptions.forEach(option => {
            const customOption = document.createElement("span");
            customOption.classList.add("custom-option");
            customOption.textContent = option.textContent;
            customOption.dataset.value = option.value;
            if (option.disabled) {
                customOption.classList.add("disabled");
            }
            if (option.selected) {
                customOption.classList.add("selected");
                trigger.textContent = option.textContent;
            }
            optionsContainer.appendChild(customOption);
        });

        const customOptions = optionsContainer.querySelectorAll(".custom-option");

        // Toggle dropdown
        trigger.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent click from closing immediately
            wrapper.classList.toggle("open");
        });

        // Handle option selection
        customOptions.forEach(option => {
            option.addEventListener("click", () => {
                if (option.classList.contains("disabled")) return;

                // Update native select value
                nativeSelect.value = option.dataset.value;

                // Update trigger text
                trigger.textContent = option.textContent;

                // Update selected class
                customOptions.forEach(opt => opt.classList.remove("selected"));
                option.classList.add("selected");

                // Close dropdown
                wrapper.classList.remove("open");

                // Trigger change event on native select if needed
                const changeEvent = new Event("change");
                nativeSelect.dispatchEvent(changeEvent);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", () => {
            if (wrapper.classList.contains("open")) {
                wrapper.classList.remove("open");
            }
        });
    });

    // Formspree AJAX Submission
    const form = document.getElementById("contact-form");
    const statusElement = form.querySelector(".form-status");

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        // IMPORTANT: Replace YOUR_FORM_ID with the actual Formspree form ID
        const formspreeEndpoint = event.target.action;
        if (!formspreeEndpoint || formspreeEndpoint.includes("YOUR_FORM_ID")) {
            statusElement.textContent = "Error: Formspree Form ID not set!";
            statusElement.className = "form-status error";
            console.error("Formspree endpoint is not configured correctly. Please replace YOUR_FORM_ID in index.html.");
            return; // Stop submission if ID is not set
        }

        statusElement.textContent = "Sending...";
        statusElement.className = "form-status"; // Reset class

        try {
            const response = await fetch(formspreeEndpoint, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                statusElement.textContent = "Thanks for your submission!";
                statusElement.className = "form-status success";
                form.reset();
                // Reset custom select trigger text after form reset
                selectWrappers.forEach(wrapper => {
                    const trigger = wrapper.querySelector(".custom-select-trigger");
                    const nativeSelect = wrapper.querySelector("select");
                    const firstEnabledOption = Array.from(nativeSelect.options).find(opt => !opt.disabled);
                    if (firstEnabledOption) {
                        trigger.textContent = firstEnabledOption.textContent; // Or the placeholder text
                    } else {
                         trigger.textContent = "Select Budget Currency..."; // Default placeholder
                    }
                    // Also reset selected state in custom options
                    wrapper.querySelectorAll(".custom-option").forEach(opt => opt.classList.remove("selected"));
                    const defaultCustomOption = wrapper.querySelector(".custom-option:not(.disabled)");
                    if (defaultCustomOption) {
                       // Optionally mark the first selectable option as selected visually if needed
                       // defaultCustomOption.classList.add("selected");
                    }
                });
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, "errors")) {
                        statusElement.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        statusElement.textContent = "Oops! There was a problem submitting your form";
                    }
                    statusElement.className = "form-status error";
                });
            }
        } catch (error) {
            statusElement.textContent = "Oops! There was a problem submitting your form";
            statusElement.className = "form-status error";
            console.error("Form submission error:", error);
        }
    }

    form.addEventListener("submit", handleSubmit);
});

