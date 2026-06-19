 // Initialize EmailJS
    emailjs.init({
        publicKey: "mbD_tQOnc0gz0ko6N"
    });

    function sendMail(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validation
        if (name === "" || name.length < 2) {
            alert("Please enter a valid name.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        const phoneRegex = /^[0-9+\-\s()]+$/;
        const digitsOnly = phone.replace(/\D/g, "");

        if (!phoneRegex.test(phone) || digitsOnly.length < 10) {
            alert("Please enter a valid phone number.");
            return false;
        }

        if (message.length < 10) {
            alert("Message must contain at least 10 characters.");
            return false;
        }

        const submitBtn = document.getElementById("submit-btn");
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        const templateParams = {
            name: name,
            email: email,
            phone: phone,
            message: message
        };

        emailjs.send(
            "service_2tpdk1q",
            "template_mm3n8sk",
            templateParams
        )
        .then(function () {
            alert("Thank you! Your message has been sent successfully.");
            document.getElementById("contact-form").reset();

            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        })
        .catch(function (error) {
            console.error("EmailJS Error:", error);

            alert("Failed to send message. Please try again later.");

            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        });

        return false;
    }
// Modal functionality for service images
    function openModal(imageSrc) {
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("modalImage").src = imageSrc;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
