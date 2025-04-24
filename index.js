const slider = document.getElementById("testimonial-slider");
let index = 0;
const testimonials = [
  {
    quote: '"Ryan is a young prodigy. His work ethic and output are top-tier."',
    author: "Uncle Mike",
  },
  {
    quote:
      '"Working with Ryan felt effortless. He understood our design vision instantly."',
    author: "Project Manager",
  },
  {
    quote: '"Clean code. Modern look. Fast delivery. Can\'t ask for more."',
    author: "Client A",
  },
];
function rotateTestimonials() {
  (index = (index + 1) % testimonials.length),
    (slider.innerHTML = `
  <div class="testimonial-slide transition-all duration-700">
    <p class="text-gray-300 italic">${testimonials[index].quote}</p>
    <span class="block mt-4 text-gray-500">${testimonials[index].author}</span>
  </div>
`);
}
setInterval(rotateTestimonials, 4e3);

// Contact

(function () {
  const accessKey = atob("ZjY1ZmViYzctMzdhNS00OTY0LWFjNWUtZmFmNDUyYzNhOTM4");
  const recaptchaChunks = [
    "NkxkOTdTSXI=",
    "QUFBQUFFa0dVd2sySExGX19nSUs5MkZa",
    "SmtFMGdTQ0Y=",
  ];

  // Fix: validate Base64 string length is multiple of 4
  const paddedString = recaptchaChunks
    .join("")
    .padEnd(Math.ceil(recaptchaChunks.join("").length / 4) * 4, "=");
  const recaptchaKey = atob(paddedString);

  document.getElementById("access_key").value = accessKey;

  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/api.js`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  window.addEventListener("load", () => {
    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.setAttribute("data-sitekey", recaptchaKey);
    }
  });
})();

const form = document.getElementById("contactForm");
const allowedDomains = ["gmail.com", "icloud.com", "yahoo.com"];
const blockedDomains = [
  "armspy.com",
  "cuvox.de",
  "dayrep.com",
  "einrot.com",
  "fleckens.hu",
  "gustr.com",
  "jourrapide.com",
  "rhyta.com",
  "supperrito.com",
  "teleworm.us",
  "linshiyouxiang.net",
  "gongjua.com",
  "deepyinc.com",
  "justdefinition.com",
  "mediaeast.uk",
  "swagpapa.com",
  "mailsbay.com",
  "besttempmail.com",
  "mediaholy.com",
  "123mails.org",
  "deepmails.org",
  "inctart.com",
];

const messages = document.getElementById("form-messages");

form.addEventListener("submit", function (e) {
  let valid = true;
  const inputs = form.querySelectorAll(".input-field");

  inputs.forEach((input) => {
    const errorEl = input.parentElement.querySelector(".error-message");
    input.classList.remove("border-red-400", "ring-2", "ring-red-400");
    errorEl.classList.add("hidden");
    errorEl.textContent = "";

    if (!input.value.trim()) {
      input.classList.add("border-red-400", "ring-2", "ring-red-400");
      errorEl.textContent = `${input.name[0].toUpperCase() + input.name.slice(1)} is required.`;
      errorEl.classList.remove("hidden");
      valid = false;
    }
  });

  const emailInput = form.email;
  const emailError = emailInput.parentElement.querySelector(".error-message");
  const email = emailInput.value.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    emailInput.classList.add("border-red-400", "ring-2", "ring-red-400");
    emailError.textContent = "Enter a valid email.";
    emailError.classList.remove("hidden");
    valid = false;
  } else if (email) {
    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      emailInput.classList.add("border-red-400", "ring-2", "ring-red-400");
      emailError.textContent =
        "Only gmail.com, icloud.com, and yahoo.com are allowed.";
      emailError.classList.remove("hidden");
      valid = false;
    }
    if (blockedDomains.includes(domain)) {
      emailInput.classList.add("border-red-400", "ring-2", "ring-red-400");
      emailError.textContent = "That email domain is blocked.";
      emailError.classList.remove("hidden");
      valid = false;
    }
  }

  const recaptchaResponse = document.getElementById(
    "g-recaptcha-response"
  ).value;
  if (!recaptchaResponse) {
    e.preventDefault();
    messages.classList.remove("hidden", "text-green-400");
    messages.classList.add("text-red-400");
    messages.textContent = "⚠️ Please complete the CAPTCHA.";
    return;
  }

  if (!valid) {
    e.preventDefault();
    return;
  }

  e.preventDefault();
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      messages.classList.remove("hidden", "text-red-400");
      messages.classList.add("text-green-400");
      messages.textContent = "✅ Message sent successfully!";
      form.reset();
      grecaptcha.reset();
    })
    .catch(() => {
      messages.classList.remove("hidden", "text-green-400");
      messages.classList.add("text-red-400");
      messages.textContent = "❌ Failed to send message. Try again later.";
    });
});
