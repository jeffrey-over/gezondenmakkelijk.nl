// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('recipe-search');
    const recipeCards = document.querySelectorAll('.recipe-card');
    let currentFilter = 'all';
  
    // Search function
    function filterRecipes() {
      const searchTerm = searchInput.value.toLowerCase();
      let visibleCount = 0;
      
      recipeCards.forEach(card => {
        const title = card.querySelector('.recipe-title').textContent.toLowerCase();
        const description = card.querySelector('.recipe-description').textContent.toLowerCase();
        const categories = Array.from(card.querySelectorAll('.recipe-category'))
          .map(cat => cat.textContent.trim().toLowerCase());
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesFilter = currentFilter === 'all' || categories.includes(currentFilter.toLowerCase());
        
        const shouldShow = matchesSearch && matchesFilter;
        card.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) visibleCount++;
      });
  
      // Show/hide no results message
      const noResults = document.getElementById('no-results');
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }
  
    // Filter function
    function setFilter(filter) {
      currentFilter = filter;
      
      // Update button styles
      document.querySelectorAll('.filter-button').forEach(btn => {
        if (btn.dataset.filter === filter) {
          btn.classList.remove('bg-white', 'text-gray-700');
          btn.classList.add('bg-emerald-600', 'text-white');
        } else {
          btn.classList.remove('bg-emerald-600', 'text-white');
          btn.classList.add('bg-white', 'text-gray-700');
        }
      });
  
      filterRecipes();
    }
  
    // Event listeners
    if (searchInput) {
      searchInput.addEventListener('input', filterRecipes);
    }
    
    document.querySelectorAll('.filter-button').forEach(button => {
      button.addEventListener('click', () => setFilter(button.dataset.filter));
    });
  
    // Initialize with "all" filter
    setFilter('all');
  });