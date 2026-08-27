/* ==========================================================================
   ClassmatePlus — shared navbar/footer + small utilities
   Copy-paste-once pattern: every page includes this file and calls
   renderChrome('<page-id>') so nav/footer stay consistent site-wide.
   ========================================================================== */

function chromePaths(){
  // Figure out whether we're at root or inside /pages/ so links resolve either way.
  const inPages = window.location.pathname.includes("/pages/");
  return inPages ? "" : "pages/";
}

function renderChrome(activeId){
  const base = chromePaths();
  const root = base === "" ? "index.html" : "../index.html";

  const links = [
    { id: "how-it-works", label: "How It Works", href: base + "how-it-works.html" },
    { id: "browse-skills", label: "Browse Skills", href: base + "browse-skills.html" },
    { id: "browse-students", label: "Browse Students", href: base + "browse-students.html" },
    { id: "dashboard", label: "Dashboard", href: base + "dashboard.html" }
  ];

  const navHtml = links.map(l =>
    `<a href="${l.href}" class="${l.id === activeId ? "active" : ""}">${l.label}</a>`
  ).join("");

  const navbar = document.createElement("div");
  navbar.className = "navbar";
  navbar.innerHTML = `
    <div class="container">
      <a href="${root}" class="brand"><span class="pin"></span>ClassmatePlus</a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
      <nav>
        ${navHtml}
        <a href="${base}login-register.html" class="cta">Log In</a>
      </nav>
    </div>
  `;
  document.body.insertBefore(navbar, document.body.firstChild);

  const toggle = navbar.querySelector(".menu-toggle");
  const nav = navbar.querySelector("nav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <span>ClassmatePlus — a campus project. No money changes hands, just skills.</span>
      <span><a href="${root}">Home</a> · <a href="${base}how-it-works.html">How It Works</a></span>
    </div>
  `;
  document.body.appendChild(footer);
}

function showToast(message){
  let toast = document.querySelector(".toast");
  if (!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  const pageId = document.body.getAttribute("data-page") || "";
  renderChrome(pageId);
});
