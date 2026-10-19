document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) menuButton.addEventListener("click", () => nav.classList.toggle("open"));

  // Property filtering
  const grid = document.querySelector("#propertyGrid");
  if (grid) {
    const cards = [...grid.querySelectorAll(".listing")];
    const search = document.querySelector("#propertySearch");
    const type = document.querySelector("#typeFilter");
    const status = document.querySelector("#statusFilter");
    const count = document.querySelector("#resultCount");
    const empty = document.querySelector("#noResults");

    function filterProperties() {
      const term = (search.value || "").toLowerCase().trim();
      let visible = 0;
      cards.forEach(card => {
        const matchesText = card.dataset.name.includes(term);
        const matchesType = type.value === "all" || card.dataset.type === type.value;
        const matchesStatus = status.value === "all" || card.dataset.status === status.value;
        const show = matchesText && matchesType && matchesStatus;
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      count.textContent = `${visible} ${visible === 1 ? "property" : "properties"} found`;
      empty.hidden = visible !== 0;
    }
    [search, type, status].forEach(el => el.addEventListener("input", filterProperties));
    filterProperties();
  }

  // Home search sends users to the property page with filters in the URL.
  const homeSearch = document.querySelector("#homeSearch");
  if (homeSearch) {
    homeSearch.addEventListener("submit", e => {
      e.preventDefault();
      const type = document.querySelector("#homeType").value;
      const location = document.querySelector("#homeLocation").value.trim();
      window.location.href = `properties.html?type=${encodeURIComponent(type)}&location=${encodeURIComponent(location)}`;
    });
  }

  // Read filters from home search URL.
  const params = new URLSearchParams(window.location.search);
  const typeFilter = document.querySelector("#typeFilter");
  const propertySearch = document.querySelector("#propertySearch");
  if (typeFilter && params.get("type")) typeFilter.value = params.get("type");
  if (propertySearch && params.get("location")) propertySearch.value = params.get("location");
  if (typeFilter && params.toString()) typeFilter.dispatchEvent(new Event("input"));

  // Contact form validation/demo submission.
  const form = document.querySelector("#contactForm");
  const message = document.querySelector("#formMessage");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        message.textContent = "Please complete all required fields correctly.";
        message.style.color = "#b23b3b";
        form.reportValidity();
        return;
      }
      message.textContent = "Thank you! Your message has been received. Our team will contact you soon.";
      message.style.color = "#2d6a4f";
      form.reset();
    });
  }
});