/* ==========================================================================
   ClassmatePlus — Dashboard
   Tabs: My Skills / Potential Matches / Swap Requests / My Swaps.
   Matching logic (demo): a student is a "potential match" if any skill they
   WANT appears in CURRENT_USER's OFFERED list, or vice versa.
   All state lives in data.js for now — a real backend would replace this
   with actual API calls, but the shape stays the same.
   ========================================================================== */

function renderMe(){
  document.getElementById("me-avatar").textContent = CURRENT_USER.initials;
  document.getElementById("me-name").textContent = CURRENT_USER.name;
  document.getElementById("me-campus").textContent = CURRENT_USER.campus;
  document.getElementById("me-bio").textContent = CURRENT_USER.bio;
}

function renderMySkills(){
  const offeredEl = document.getElementById("my-offered");
  const wantedEl = document.getElementById("my-wanted");

  offeredEl.innerHTML = CURRENT_USER.skillsOffered.map(s => `
    <li>${s} <button class="btn btn-sm btn-outline" onclick="removeSkill('offered','${s}')">Remove</button></li>
  `).join("") || `<li style="color:var(--ink-soft);">Nothing listed yet.</li>`;

  wantedEl.innerHTML = CURRENT_USER.skillsWanted.map(s => `
    <li>${s} <button class="btn btn-sm btn-outline" onclick="removeSkill('wanted','${s}')">Remove</button></li>
  `).join("") || `<li style="color:var(--ink-soft);">Nothing listed yet.</li>`;
}

function removeSkill(kind, skillName){
  const list = kind === "offered" ? CURRENT_USER.skillsOffered : CURRENT_USER.skillsWanted;
  const idx = list.indexOf(skillName);
  if (idx > -1) list.splice(idx, 1);
  renderMySkills();
  renderMatches(); // matches depend on my skill list
  showToast(`Removed "${skillName}" from your ${kind} skills.`);
}

document.getElementById && document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-skill-btn");
  if (addBtn){
    addBtn.addEventListener("click", () => {
      const input = document.getElementById("new-skill");
      const value = input.value.trim();
      if (!value) { showToast("Type a skill name first."); return; }
      CURRENT_USER.skillsOffered.push(value);
      input.value = "";
      renderMySkills();
      renderMatches();
      showToast(`Added "${value}" to your offered skills.`);
    });
  }
});

function findOverlap(listA, listB){
  return listA.filter(item => listB.includes(item));
}

function renderMatches(){
  const container = document.getElementById("matches-list");
  const matches = STUDENTS.map(st => {
    const theyWantWhatIOffer = findOverlap(st.skillsWanted, CURRENT_USER.skillsOffered);
    const iWantWhatTheyOffer = findOverlap(CURRENT_USER.skillsWanted, st.skillsOffered);
    return { student: st, theyWantWhatIOffer, iWantWhatTheyOffer };
  }).filter(m => m.theyWantWhatIOffer.length > 0 && m.iWantWhatTheyOffer.length > 0);

  if (!matches.length){
    container.innerHTML = `
      <div class="empty-state" style="background:var(--card); border-radius:var(--radius); box-shadow:var(--shadow-card);">
        <h3 style="color:var(--board);">No matches yet</h3>
        <p style="color:var(--ink-soft);">Add more skills you offer or want — matches need overlap on both sides.</p>
      </div>`;
    return;
  }

  container.innerHTML = matches.map(m => `
    <div class="match-row">
      <div>
        <div class="who">${m.student.name} — ${m.student.campus}</div>
        <div class="why">They want <strong>${m.theyWantWhatIOffer.join(", ")}</strong> ·
          You want <strong>${m.iWantWhatTheyOffer.join(", ")}</strong></div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="location.href='student-profile.html?id=${m.student.id}'">View profile</button>
    </div>
  `).join("");
}

function renderRequests(){
  const container = document.getElementById("requests-list");
  const pending = SWAP_REQUESTS.filter(r => r.status === "pending");

  if (!pending.length){
    container.innerHTML = `
      <div class="empty-state" style="background:var(--card); border-radius:var(--radius); box-shadow:var(--shadow-card);">
        <h3 style="color:var(--board);">Nothing pending</h3>
        <p style="color:var(--ink-soft);">Requests you send or receive will show up here.</p>
      </div>`;
    return;
  }

  container.innerHTML = pending.map(r => {
    const other = getOwner(r.withId);
    const label = r.direction === "sent"
      ? `You offered <strong>${r.offered}</strong> for their <strong>${r.wanted}</strong>`
      : `${other.name} offered <strong>${r.offered}</strong> for your <strong>${r.wanted}</strong>`;
    const actions = r.direction === "received"
      ? `<button class="btn btn-sm btn-primary" onclick="respondRequest('${r.id}','accepted')">Accept</button>
         <button class="btn btn-sm btn-outline" onclick="respondRequest('${r.id}','declined')">Decline</button>`
      : `<button class="btn btn-sm btn-outline" onclick="respondRequest('${r.id}','cancelled')">Cancel</button>`;
    return `
      <div class="match-row">
        <div>
          <div class="who">${other.name} <span class="status-pill status-pending">Pending · ${r.direction}</span></div>
          <div class="why">${label}</div>
        </div>
        <div style="display:flex; gap:8px;">${actions}</div>
      </div>
    `;
  }).join("");
}

function respondRequest(id, newStatus){
  const req = SWAP_REQUESTS.find(r => r.id === id);
  if (!req) return;
  if (newStatus === "declined" || newStatus === "cancelled"){
    const idx = SWAP_REQUESTS.indexOf(req);
    SWAP_REQUESTS.splice(idx, 1);
    showToast(`Request ${newStatus}.`);
  } else {
    req.status = newStatus;
    showToast(`Swap accepted — check My Swaps.`);
  }
  renderRequests();
  renderSwaps();
}

function renderSwaps(){
  const container = document.getElementById("swaps-list");
  const swaps = SWAP_REQUESTS.filter(r => r.status === "accepted" || r.status === "done");

  if (!swaps.length){
    container.innerHTML = `
      <div class="empty-state" style="background:var(--card); border-radius:var(--radius); box-shadow:var(--shadow-card);">
        <h3 style="color:var(--board);">No swaps yet</h3>
        <p style="color:var(--ink-soft);">Accept a pending request to see it here.</p>
      </div>`;
    return;
  }

  container.innerHTML = swaps.map(r => {
    const other = getOwner(r.withId);
    const pillClass = r.status === "done" ? "status-done" : "status-accepted";
    const pillLabel = r.status === "done" ? "Completed" : "Active";
    return `
      <div class="match-row">
        <div>
          <div class="who">${other.name} <span class="status-pill ${pillClass}">${pillLabel}</span></div>
          <div class="why">${r.offered} ↔ ${r.wanted}</div>
        </div>
        ${r.status === "accepted" ? `<button class="btn btn-sm btn-outline" onclick="respondRequest('${r.id}','done')">Mark complete</button>` : ""}
      </div>
    `;
  }).join("");
}

function initTabs(){
  const buttons = document.querySelectorAll(".dash-tabs button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".dash-panel").forEach(p => p.classList.remove("active"));
      document.getElementById(`panel-${btn.dataset.tab}`).classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMe();
  renderMySkills();
  renderMatches();
  renderRequests();
  renderSwaps();
  initTabs();
});
