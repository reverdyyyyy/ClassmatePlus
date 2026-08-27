/* ==========================================================================
   ClassmatePlus — Browse Skills / Browse Students
   Client-side search + filter over the sample data arrays in data.js.
   Also drives the "Request Swap" modal used from Browse Skills.
   ========================================================================== */

function skillCardHtml(skill){
  const owner = getOwner(skill.ownerId);
  return `
    <div class="skill-card" data-skill-id="${skill.id}">
      <span class="tag">${skill.category}</span>
      <h3>${skill.name}</h3>
      <p>${skill.description}</p>
      <div class="owner">Offered by ${owner.name}</div>
      <button class="btn btn-primary btn-sm btn-block" style="margin-top:12px;"
        onclick="event.stopPropagation(); openSwapModal('${skill.id}')">Request Swap</button>
    </div>
  `;
}

function studentCardHtml(student){
  return `
    <div class="student-card" onclick="location.href='student-profile.html?id=${student.id}'">
      <span class="tag">${student.campus}</span>
      <h3>${student.name}</h3>
      <div class="swap-preview">
        <div><span class="label">Offers</span>${student.skillsOffered.join(", ")}</div>
        <div><span class="label">Wants</span>${student.skillsWanted.join(", ")}</div>
      </div>
      <p>${student.bio}</p>
    </div>
  `;
}

function initBrowseSkills(){
  const grid = document.getElementById("skills-grid");
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");
  const emptyState = document.getElementById("empty-state");
  const resultCount = document.getElementById("result-count");

  CATEGORIES.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat; opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  function render(){
    const q = searchInput.value.trim().toLowerCase();
    const cat = categorySelect.value;
    const filtered = SKILLS.filter(skill => {
      const owner = getOwner(skill.ownerId);
      const matchesQuery = !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        owner.name.toLowerCase().includes(q);
      const matchesCategory = !cat || skill.category === cat;
      return matchesQuery && matchesCategory;
    });

    grid.innerHTML = filtered.map(skillCardHtml).join("");
    emptyState.style.display = filtered.length ? "none" : "block";
    resultCount.textContent = `${filtered.length} skill${filtered.length === 1 ? "" : "s"} pinned`;
  }

  searchInput.addEventListener("input", render);
  categorySelect.addEventListener("change", render);
  render();
}

function initBrowseStudents(){
  const grid = document.getElementById("students-grid");
  const searchInput = document.getElementById("search");
  const emptyState = document.getElementById("empty-state");
  const resultCount = document.getElementById("result-count");

  function render(){
    const q = searchInput.value.trim().toLowerCase();
    const filtered = STUDENTS.filter(st => {
      if (!q) return true;
      const haystack = [st.name, st.campus, ...st.skillsOffered, ...st.skillsWanted]
        .join(" ").toLowerCase();
      return haystack.includes(q);
    });
    grid.innerHTML = filtered.map(studentCardHtml).join("");
    emptyState.style.display = filtered.length ? "none" : "block";
    resultCount.textContent = `${filtered.length} student${filtered.length === 1 ? "" : "s"}`;
  }

  searchInput.addEventListener("input", render);
  render();
}

/* ---------------- Swap request modal (UI only — no backend yet) ---------------- */
let _swapTargetSkillId = null;

function openSwapModal(skillId){
  _swapTargetSkillId = skillId;
  const skill = SKILLS.find(s => s.id === skillId);
  const owner = getOwner(skill.ownerId);

  document.getElementById("modal-context").textContent =
    `You're requesting "${skill.name}" from ${owner.name}. What will you offer in return?`;

  const offerSelect = document.getElementById("offer-select");
  offerSelect.innerHTML = CURRENT_USER.skillsOffered
    .map(s => `<option value="${s}">${s}</option>`).join("");

  document.getElementById("swap-modal").classList.add("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("swap-modal");
  if (!overlay) return;

  document.getElementById("modal-close").addEventListener("click", () => {
    overlay.classList.remove("open");
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
  });
  document.getElementById("modal-send").addEventListener("click", () => {
    const skill = SKILLS.find(s => s.id === _swapTargetSkillId);
    const owner = getOwner(skill.ownerId);
    const offered = document.getElementById("offer-select").value;
    overlay.classList.remove("open");
    showToast(`Request sent to ${owner.name}: ${offered} for ${skill.name}`);
  });
});
