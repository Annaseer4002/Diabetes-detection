document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#historyTable tbody");

  // 🧠 1️⃣ Get the logged-in patient's ID
  const patientId = localStorage.getItem("patientId");

  if (!patientId) {
    alert("You must log in first!");
    window.location.href = "login.html";
    return;
  }

  // 🧩 2️⃣ Fetch assessment history from backend
  let historyData = [];
  try {
    const token = localStorage.getItem("token"); // get the auth token if required
    const res = await fetch(`http://localhost:3000/api/history/${patientId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      const result = await res.json();
      historyData = result.data || [];
    
    } else {
      console.warn("⚠️ Backend returned an error — using demo data instead.");
    }
  } catch (err) {
    console.warn("⚠️ Could not connect to backend. Using demo data.", err);
  }
 

  // 🪄 3️⃣ Use fallback demo data if no history is found
  if (!historyData.length) {
    historyData = [
      { date: "2025-10-01", riskLevel: "Moderate", symptoms: ["Mild thirst", "Fatigue"] },
      { date: "2025-09-20", riskLevel: "Low", symptoms: ["Normal levels"] },
      { date: "2025-09-05", riskLevel: "High", symptoms: ["Frequent urination", "Weight loss"] },
    ];
  }

  // 🧾 4️⃣ Render data into the table
  tableBody.innerHTML = "";
  historyData.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${new Date(entry.createdAt || entry.date).toLocaleDateString()}</td>
      <td>${entry.riskLevel}</td>
      <td>${entry.symptoms ? entry.symptoms.join(", ") : "N/A"}</td>
    `;
    tableBody.appendChild(row);
  });
});

// 🚪 5️⃣ Logout button functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
