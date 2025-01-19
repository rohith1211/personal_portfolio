// Detect request animation frame
const scroll =
  window.requestAnimationFrame ||
  // IE Fallback
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
const elementsToShow = document.querySelectorAll(".show-on-scroll");

function loop() {
  elementsToShow.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add("is-visible");
    } else {
      element.classList.remove("is-visible");
    }
  });

  scroll(loop);
}

// Call the loop for the first time
loop();
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  const rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  );
}

// Smooth scroll function
const headerBtn = document.getElementById("header-btn");
const socialContact = document.getElementById("social-contact");
const contactForm = document.getElementById("contact");

function scrollToForm() {
  contactForm.scrollIntoView({ behavior: "smooth" }); // Top
}

headerBtn.addEventListener("click", scrollToForm);
socialContact.addEventListener("click", scrollToForm);

// No bots!
const contactFormNoBots = document.getElementById("contact-form-no-bots");
contactFormNoBots.parentNode.removeChild(contactFormNoBots);

function showDescription(project) {
  const descriptions = document.querySelectorAll('.description');
  descriptions.forEach(desc => {
      desc.style.display = 'none'; // Hide all descriptions
  });

  const description = document.getElementById(project + '-description');
  description.style.display = 'block'; // Show the specific project description
}

(function () {
  const projects = document.querySelectorAll(".project");
  const detailsText = document.getElementById("details-text"); // Project details in chatbot

  projects.forEach((project) => {
    let typingEffect;

    project.addEventListener("mouseover", () => {
      const details = project.getAttribute("data-details");
      detailsText.innerHTML = ""; // Clear existing text using innerHTML
      let i = 0;

      // Clear any previous typing effect
      clearInterval(typingEffect);

      // Start new typing effect
      typingEffect = setInterval(() => {
        if (i < details.length) {
          detailsText.innerHTML += details[i];
          i++;
          // Check if the text exceeds the container width
          if (detailsText.scrollHeight > detailsText.clientHeight) {
            detailsText.innerHTML += "<br/>"; // Add line break when text exceeds the container height
          }
        } else {
          clearInterval(typingEffect);
        }
      }, 20);
    });

    // Clear details when the mouse leaves
    project.addEventListener("mouseleave", () => {
      clearInterval(typingEffect);
      detailsText.innerHTML = ""; // Clear text on mouse leave
    });
  });
})();

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    const submitButton = document.getElementById("contact-form-submit");

    if (form && submitButton) {
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior
        submitButton.textContent = "Sending..."; // Update button text to indicate submission

        const formData = new FormData(form);
        const actionUrl = form.action;

        // Submit the form data using Fetch API
        fetch(actionUrl, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              // Clear form fields
              form.reset();
              // Display success message
              alert("Successfully submitted!");
            } else {
              // Display error message
              alert("Error: Could not submit the form. Please try again.");
            }
          })
          .catch((error) => {
            // Handle fetch errors
            console.error("Error submitting form:", error);
            alert("An unexpected error occurred. Please try again.");
          })
          .finally(() => {
            // Reset button text
            submitButton.textContent = "Send Message";
          });
      });
    }
  });
})();
