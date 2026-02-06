const axios = require("axios");
const { classifyResponse } = require("./classify");

function normalizeUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

async function fetchUrl(url) {
  const finalUrl = normalizeUrl(url);

  try {
    const response = await axios.get(finalUrl, {
      timeout: 5000,
      validateStatus: () => true,
    });

    return {
      url: finalUrl,
      status: response.status,
      blocked: classifyResponse(response.data),
    };
  } catch (err) {
    return {
      url: finalUrl,
      status: "error",
      blocked: false,
      error: err.message,
    };
  }
}

async function scanUrls(urls) {
  const batchSize = 10;
  const results = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fetchUrl));
    results.push(...batchResults);
  }

  return results;
}

module.exports = { scanUrls };
