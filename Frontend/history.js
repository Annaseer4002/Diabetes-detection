document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#historyTable tbody");

  // --- 1️⃣ Fetch patient history from backend ---
  let historyData = [];
  try {
    const res = await fetch("http://localhost:5000/api/assessment/history/123"); // Replace 123 with logged-in patient ID
    if (res.ok) {
      historyData = await res.json();
    } else {
      console.warn("Backend returned no data — using demo history.");
    }
  } catch (err) {
    console.warn("Backend not available — using demo history.");
  }

  // --- 2️⃣ Fallback demo data if backend fails ---
  if (!historyData.length) {
    historyData = [
      { date: "2025-10-01", riskLevel: "Moderate", summary: "Mild symptoms observed" },
      { date: "2025-09-20", riskLevel: "Low", summary: "No significant risk" },
      { date: "2025-09-05", riskLevel: "High", summary: "Multiple high-risk symptoms" },
    ];
  }

  // --- 3️⃣ Render table dynamically ---
  tableBody.innerHTML = ""; // Clear loading row
  historyData.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.riskLevel}</td>
      <td>${entry.summary || "N/A"}</td>
    `;
    tableBody.appendChild(row);
  });
});

  // 🚪 Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });
