document.getElementById("scanBtn").addEventListener("click", async () => {
  const raw = document.getElementById("urlInput").value.trim();
  if (!raw) return alert("Enter at least one URL");

  const urls = raw
    .split("\n")
    .map((u) => u.trim())
    .filter((u) => u.length > 0);

  document.getElementById("status").textContent = "Scanning...";

  const res = await fetch("/api/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls }),
  });

  const data = await res.json();

  const tbody = document.querySelector("#resultsTable tbody");
  tbody.innerHTML = "";

  data.results.forEach((r) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${r.url}</td>
        <td>${r.status}</td>
        <td class="${r.blocked ? "blocked" : "ok"}">
          ${r.blocked ? "Blocked" : "OK"}
        </td>
      `;

    tbody.appendChild(row);
  });

  document.getElementById("status").textContent = "Done.";
});
