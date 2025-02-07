document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const articles = document.querySelectorAll('article');
    const noResults = document.getElementById('no-results');
  
    function filterArticles(category) {
      let visibleCount = 0;
  
      articles.forEach(article => {
        const categories = Array.from(article.querySelectorAll('.bg-emerald-100'))
          .map(span => span.textContent.trim().toLowerCase());
        
        if (category === 'all' || categories.includes(category.toLowerCase())) {
          article.style.display = 'block';
          visibleCount++;
        } else {
          article.style.display = 'none';
        }
      });
  
      // Toon/verberg "geen resultaten" bericht
      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }
  
    // Event listeners voor filter knoppen
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state van knoppen
        filterButtons.forEach(btn => {
          btn.classList.remove('bg-emerald-600', 'text-white');
          btn.classList.add('bg-white', 'text-gray-700');
        });
        button.classList.remove('bg-white', 'text-gray-700');
        button.classList.add('bg-emerald-600', 'text-white');
  
        // Filter artikelen
        filterArticles(button.dataset.filter);
      });
    });
  });
  