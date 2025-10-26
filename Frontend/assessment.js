document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("assessmentForm");
  const resultBox = document.getElementById("resultBox");
  const riskLevel = document.getElementById("riskLevel");
  const treatmentList = document.getElementById("treatmentList");
  const logoutBtn = document.getElementById("logoutBtn");

  // ✅ Logout handler
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("patientId");
    window.location.href = "landing.html";
  });

  // ✅ On form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('input[name="symptom"]:checked');
    const symptoms = Array.from(checkboxes).map(cb => cb.value);

    if (symptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    // Get the patientId from local storage (you can set this during login)
    const patientId = localStorage.getItem("patientId");
    if (!patientId) {
      alert("No patient ID found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/createAssessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, symptoms })
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Something went wrong.");
        return;
      }

      // ✅ Display results
      riskLevel.textContent = data.data.riskLevel;
      treatmentList.innerHTML = "";
      data.data.treatments.forEach(treatment => {
        const li = document.createElement("li");
        li.textContent = treatment;
        treatmentList.appendChild(li);
      });

      resultBox.style.display = "block";

      // ✅ Optional: Save to history in local storage
      saveAssessmentToHistory(data.data);

    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
    }
  });

  // 🕒 Save history locally (optional)
  function saveAssessmentToHistory(assessment) {
    let history = JSON.parse(localStorage.getItem("assessmentHistory")) || [];
    history.push({
      date: new Date().toLocaleString(),
      riskLevel: assessment.riskLevel,
      summary: assessment.symptoms.join(", ")
    });
    localStorage.setItem("assessmentHistory", JSON.stringify(history));
  }
});
