document.addEventListener("DOMContentLoaded", function () {

    emailjs.init({
        publicKey: "mbD_tQOnc0gz0ko6N"
    });

    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const templateParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        };

        emailjs.send(
            "service_2tpdk1q",
            "template_mm3n8sk",
            templateParams
        )
        .then(function () {
            alert("Thank you! Your message has been sent.");
            form.reset();
        })
        .catch(function (error) {
            alert("Failed to send message. Please try again.");
            console.error("EmailJS Error:", error);
        });

    });

});