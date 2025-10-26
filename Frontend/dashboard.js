document.addEventListener("DOMContentLoaded", () => {
  const patientId = localStorage.getItem("patientId");
  const token = localStorage.getItem("token");
  const fullname = localStorage.getItem("userName"); 
  const gender = localStorage.getItem("gender");
  const dateOfBirth = localStorage.getItem("dateOfBirth");

  if (!patientId || !token) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  // 🧩 Populate user info
  document.getElementById("patientName").textContent = fullname || "User";
  document.getElementById("patientFullname").textContent = fullname || "N/A";
  document.getElementById("patientGender").textContent = gender || "N/A";
  document.getElementById("patientAge").textContent = calculateAge(dateOfBirth);

  // 🩺 Go to assessment
  document.getElementById("goToAssessment").addEventListener("click", () => {
    window.location.href = "assessment.html";
  });

  // 🚪 Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });

  // 🔢 Helper: calculate age
  function calculateAge(dob) {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
  }
});
