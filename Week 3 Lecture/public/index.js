document.getElementById('loadProducts').addEventListener('click', () => {
  // Step 1: Ask the server for data
  fetch('/api/products')
    .then(response => response.json()) // Step 2: Convert response to JSON
    .then(data => {
      // Step 3: Show it on the page
      let html = '<ul>';
      data.forEach(p => {
        html += `<li>${p.name} — ${p.manufacturer} (£${p.price})</li>`;
      });
      html += '</ul>';
      document.getElementById('results').innerHTML = html;
    });
});
