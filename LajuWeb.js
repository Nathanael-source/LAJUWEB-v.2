const menu = document.querySelector(".menu"),
  links = document.querySelector(".links");
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal:not(.show)")
  .forEach((el) => observer.observe(el));
const contactForm = document.querySelector("#contact-form"),
  contactStatus = document.querySelector("#contact-status"),
  whatsappLink = document.querySelector("#contact-whatsapp-link"),
  contactService = document.querySelector("#contact-service"),
  contactDetails = document.querySelector("#contact-details");
let packageDetailsPrefill = "";
document.querySelectorAll(".package-select").forEach((link) => {
  link.addEventListener("click", () => {
    contactService.value = link.dataset.service;
    if (!contactDetails.value || contactDetails.value === packageDetailsPrefill) {
      packageDetailsPrefill = link.dataset.details;
      contactDetails.value = packageDetailsPrefill;
    }
  });
});
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm),
    message = [
      `Halo LajuWeb, saya ${data.get("name")}.`,
      `Email: ${data.get("email")}`,
      `Kebutuhan: ${data.get("service")}`,
      data.get("details") ? `Detail: ${data.get("details")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  whatsappLink.href = `https://wa.me/6281212539450?text=${encodeURIComponent(message)}`;
  whatsappLink.hidden = false;
  contactStatus.textContent =
    "Pesan sudah disiapkan. Buka WhatsApp melalui tautan di bawah, lalu tekan Kirim.";
  whatsappLink.focus();
});