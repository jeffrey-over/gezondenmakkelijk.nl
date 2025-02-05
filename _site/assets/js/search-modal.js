// Modal Search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchModal = document.getElementById('search-modal');
    const searchButton = document.getElementById('header-search-button');
    const closeButton = document.getElementById('close-search');
    const searchInput = document.getElementById('modal-search');
    const recipeCards = document.querySelectorAll('.modal-recipe-card');
    const noResults = document.getElementById('modal-no-results');
  
    // Only initialize if all required elements exist
    if (searchModal && searchButton && closeButton && searchInput) {
      // Toggle modal
      function toggleModal() {
        const isHidden = searchModal.classList.contains('hidden');
        searchModal.classList.toggle('hidden');
        
        // If opening modal, focus search input
        if (isHidden) {
          setTimeout(() => searchInput.focus(), 100);
        }
        
        // Toggle body scroll
        document.body.style.overflow = isHidden ? 'hidden' : '';
      }
  
      // Filter recipes
      function filterRecipes() {
        if (!recipeCards.length) return;
        
        const searchTerm = searchInput.value.toLowerCase();
        let visibleCount = 0;
        
        recipeCards.forEach(card => {
          const title = card.querySelector('.modal-recipe-title')?.textContent.toLowerCase() || '';
          const description = card.querySelector('.modal-recipe-description')?.textContent.toLowerCase() || '';
          const shouldShow = title.includes(searchTerm) || description.includes(searchTerm);
          
          card.style.display = shouldShow ? 'block' : 'none';
          if (shouldShow) visibleCount++;
        });
  
        // Show/hide no results message
        if (noResults) {
          noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      }
  
      // Event listeners
      searchButton.addEventListener('click', toggleModal);
      closeButton.addEventListener('click', toggleModal);
      searchInput.addEventListener('input', filterRecipes);
      
      // Close on backdrop click
      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
          toggleModal();
        }
      });
  
      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
          toggleModal();
        }
      });
    }
  });