/* ==========================================================================
   ClassmatePlus — Login/Register
   Client-side validation only (no backend yet, per Milestone 1 scope).
   Successful "submit" just shows a toast and redirects to Dashboard,
   standing in for what a real auth flow will do later.
   ========================================================================== */

function switchTab(which){
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");

  if (which === "login"){
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    tabLogin.classList.remove("active");
    tabRegister.classList.add("active");
  }
}

function markField(fieldEl, isValid){
  fieldEl.classList.toggle("invalid", !isValid);
  return isValid;
}

function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");

    const emailOk = markField(document.getElementById("login-email-field"), isValidEmail(email.value));
    const passOk = markField(document.getElementById("login-password-field"), password.value.length >= 8);

    if (emailOk && passOk){
      showToast(`Welcome back! Redirecting to your dashboard...`);
      setTimeout(() => { window.location.href = "dashboard.html"; }, 900);
    }
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name");
    const email = document.getElementById("reg-email");
    const password = document.getElementById("reg-password");
    const offer = document.getElementById("reg-offer");
    const want = document.getElementById("reg-want");

    const nameOk = markField(document.getElementById("reg-name-field"), name.value.trim().length > 0);
    const emailOk = markField(document.getElementById("reg-email-field"), isValidEmail(email.value));
    const passOk = markField(document.getElementById("reg-password-field"), password.value.length >= 8);
    const offerOk = markField(document.getElementById("reg-offer-field"), offer.value.trim().length > 0);
    const wantOk = markField(document.getElementById("reg-want-field"), want.value.trim().length > 0);

    if (nameOk && emailOk && passOk && offerOk && wantOk){
      showToast(`Account created — welcome to ClassmatePlus, ${name.value.split(" ")[0]}!`);
      setTimeout(() => { window.location.href = "dashboard.html"; }, 900);
    }
  });

  // Clear the error state as soon as the person starts fixing a field.
  document.querySelectorAll(".field input").forEach(input => {
    input.addEventListener("input", () => {
      input.closest(".field").classList.remove("invalid");
    });
  });
});
