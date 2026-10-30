const menu = document.querySelector(".menu"),
  links = document.querySelector(".links");
const themeToggle = document.querySelector(".theme-toggle"),
  themeToggleLabel = document.querySelector(".theme-toggle-label"),
  themeToggleIcon = document.querySelector(".theme-toggle-icon"),
  themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  const isDark = theme === "dark",
    nextTheme = isDark ? "terang" : "gelap";

  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    `Mode ${isDark ? "gelap" : "terang"} aktif. Beralih ke mode ${nextTheme}`,
  );
  themeToggle.title = `Beralih ke mode ${nextTheme}`;
  themeToggleLabel.textContent = `Mode ${nextTheme}`;
  themeToggleIcon.textContent = isDark ? "☼" : "☾";
  themeColor.content = isDark ? "#071a33" : "#f4f7fa";
}

applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);

  try {
    localStorage.setItem("lajuweb-theme", nextTheme);
  } catch (error) {
    console.error("Preferensi tema tidak dapat disimpan.", error);
  }
});

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
  contactService = document.querySelector("#contact-service"),
  contactDetails = document.querySelector("#contact-details");
let packageDetailsPrefill = "";
document.querySelectorAll(".package-select, .service-select").forEach((link) => {
  link.addEventListener("click", () => {
    contactService.value = link.dataset.service;
    if (
      link.dataset.details &&
      (!contactDetails.value || contactDetails.value === packageDetailsPrefill)
    ) {
      packageDetailsPrefill = link.dataset.details;
      contactDetails.value = packageDetailsPrefill;
    }
  });
});
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm),
    email = data.get("email").trim(),
    message = [
      `Halo LajuWeb, saya ${data.get("name")}.`,
      email ? `Email: ${email}` : "",
      `Kebutuhan: ${data.get("service")}`,
      data.get("details") ? `Detail: ${data.get("details")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  const whatsappUrl = `https://wa.me/6281212539450?text=${encodeURIComponent(message)}`;
  contactStatus.textContent =
    "WhatsApp dibuka dengan pesan yang sudah disiapkan. Tekan Kirim di WhatsApp untuk mengirimnya.";
  window.location.assign(whatsappUrl);
});