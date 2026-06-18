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




emailjs.init('mbD_tQOnc0gz0ko6N');

const fields = {
  name:    { el: document.getElementById('name'),    err: document.getElementById('name-error') },
  email:   { el: document.getElementById('email'),   err: document.getElementById('email-error') },
  message: { el: document.getElementById('message'), err: document.getElementById('message-error') }
};

const statusMsg = document.getElementById('status-msg');
const submitBtn = document.getElementById('submit-btn');

function showError(field, msg) {
  field.el.classList.add('error');
  field.err.textContent = msg;
}

function clearError(field) {
  field.el.classList.remove('error');
  field.err.textContent = '';
}

function validate() {
  let valid = true;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fields.name.el.value.trim()) {
    showError(fields.name, 'Name is required.'); valid = false;
  } else clearError(fields.name);

  if (!fields.email.el.value.trim()) {
    showError(fields.email, 'Email is required.'); valid = false;
  } else if (!emailRe.test(fields.email.el.value.trim())) {
    showError(fields.email, 'Please enter a valid email.'); valid = false;
  } else clearError(fields.email);

  if (!fields.message.el.value.trim()) {
    showError(fields.message, 'Message is required.'); valid = false;
  } else clearError(fields.message);

  return valid;
}

// Clear errors as the user types
Object.values(fields).forEach(f => f.el.addEventListener('input', () => clearError(f)));

submitBtn.addEventListener('click', () => {
  statusMsg.style.display = 'none';
  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const templateParams = {
    from_name:  fields.name.el.value.trim(),
    from_email: fields.email.el.value.trim(),
    phone:      document.getElementById('phone').value.trim(),
    message:    fields.message.el.value.trim()
  };

  emailjs.send('service_2tpdk1q', 'template_mm3n8sk', templateParams)
    .then(() => {
      statusMsg.className = 'status-msg success';
      statusMsg.textContent = "Thanks! Your message has been sent. We'll be in touch soon.";
      statusMsg.style.display = 'block';

      fields.name.el.value = '';
      fields.email.el.value = '';
      document.getElementById('phone').value = '';
      fields.message.el.value = '';
    })
    .catch(() => {
      statusMsg.className = 'status-msg error';
      statusMsg.textContent = 'Something went wrong. Please try again.';
      statusMsg.style.display = 'block';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
});