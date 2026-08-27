/* ==========================================================================
   ClassmatePlus — Student Profile
   Reads ?id=s1 (etc) from the URL and renders that student's data.
   ========================================================================== */

function getParam(name){
  return new URLSearchParams(window.location.search).get(name);
}

function renderProfile(){
  const id = getParam("id") || STUDENTS[0].id;
  const student = STUDENTS.find(s => s.id === id) || STUDENTS[0];
  const root = document.getElementById("profile-root");

  root.innerHTML = `
    <div class="profile-head">
      <div class="avatar">${student.initials}</div>
      <div>
        <h1>${student.name}</h1>
        <div class="campus-tag">${student.campus}</div>
      </div>
    </div>

    <div class="profile-cols">
      <div>
        <h3 style="font-family:var(--font-display); color:var(--board); font-size:1.3rem;">About</h3>
        <p style="color:var(--ink-soft); max-width:60ch;">${student.bio}</p>

        <h3 style="font-family:var(--font-display); color:var(--board); font-size:1.3rem; margin-top:28px;">Skills offered</h3>
        <ul class="skill-list">
          ${student.skillsOffered.map(s => `<li>${s} <span class="tag">Offered</span></li>`).join("")}
        </ul>

        <h3 style="font-family:var(--font-display); color:var(--board); font-size:1.3rem; margin-top:28px;">Skills wanted</h3>
        <ul class="skill-list">
          ${student.skillsWanted.map(s => `<li>${s} <span class="tag" style="background:var(--cork);">Wanted</span></li>`).join("")}
        </ul>
      </div>

      <div class="side-card">
        <h3>Propose a swap</h3>
        <p style="font-size:0.88rem; color:var(--ink-soft);">
          Offer something ${student.name.split(" ")[0]} wants, in exchange for a skill they offer.
        </p>
        <button class="btn btn-primary btn-block" onclick="openProfileSwapModal('${student.id}')">Request Swap</button>
      </div>
    </div>
  `;
}

function openProfileSwapModal(studentId){
  const student = STUDENTS.find(s => s.id === studentId);
  document.getElementById("modal-context").textContent =
    `Propose a trade with ${student.name}.`;

  const offerSelect = document.getElementById("offer-select");
  offerSelect.innerHTML = CURRENT_USER.skillsOffered
    .map(s => `<option value="${s}">${s}</option>`).join("");

  const wantSelect = document.getElementById("want-select");
  wantSelect.innerHTML = student.skillsOffered
    .map(s => `<option value="${s}">${s}</option>`).join("");

  document.getElementById("swap-modal").dataset.studentId = studentId;
  document.getElementById("swap-modal").classList.add("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();

  const overlay = document.getElementById("swap-modal");
  document.getElementById("modal-close").addEventListener("click", () => {
    overlay.classList.remove("open");
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
  });
  document.getElementById("modal-send").addEventListener("click", () => {
    const studentId = overlay.dataset.studentId;
    const student = STUDENTS.find(s => s.id === studentId);
    const offered = document.getElementById("offer-select").value;
    const wanted = document.getElementById("want-select").value;
    overlay.classList.remove("open");
    showToast(`Request sent to ${student.name}: ${offered} for ${wanted}`);
  });
});
