function classifyResponse(html) {
  if (!html || typeof html !== "string") return false;

  const lowered = html.toLowerCase();

  const signatures = [
    "securly",
    "this site is blocked",
    "blocked by your administrator",
    "web filter",
    "access denied",
  ];

  return signatures.some((sig) => lowered.includes(sig));
}

module.exports = { classifyResponse };
