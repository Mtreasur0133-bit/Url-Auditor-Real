const axios = require("axios");
const { classifyResponse } = require("./classify");

async function fetchUrl(url) {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      validateStatus: () => true,
    });

    return {
      url,
      status: response.status,
      blocked: classifyResponse(response.data),
    };
  } catch (err) {
    return {
      url,
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
