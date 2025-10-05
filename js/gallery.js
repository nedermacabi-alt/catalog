// Gallery page JavaScript - handles filtering and card interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeGalleryFilters();
    initializeCardInteractions();
    handleURLParameters();
    initializeLoadMore();
});

// Gallery filtering functionality
function initializeGalleryFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const exampleCards = document.querySelectorAll('.product-card');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all filter pills
            filterPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter cards
            filterCards(exampleCards, filter);
            
            // Update URL parameter
            updateURLParameter('filter', filter === 'all' ? '' : filter);
        });
    });
}

function filterCards(cards, filter) {
    let visibleCount = 0;
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filter === 'all' || cardCategory === filter) {
            card.style.display = 'block';
            card.classList.add('fade-in');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
    
    // Show "no results" message if no cards match
    showNoResultsMessage(visibleCount === 0);
    
    // Update load more button visibility
    updateLoadMoreButton(visibleCount);
}

function showNoResultsMessage(show) {
    let noResultsEl = document.querySelector('.no-results-message');
    
    if (show && !noResultsEl) {
        noResultsEl = document.createElement('div');
        noResultsEl.className = 'no-results-message';
        noResultsEl.innerHTML = `
            <div class="no-results-content">
                <h3>לא נמצאו דוגמאות</h3>
                <p>נסו לבחור קטגוריה אחרת או לחזור לתצוגה של כל הדוגמאות</p>
                <button class="btn btn-primary" onclick="resetFilters()">הצג הכל</button>
            </div>
        `;
        
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            galleryGrid.parentNode.insertBefore(noResultsEl, galleryGrid.nextSibling);
        }
    } else if (!show && noResultsEl) {
        noResultsEl.remove();
    }
}

function resetFilters() {
    const allFilterPill = document.querySelector('.filter-pill[data-filter="all"]');
    const exampleCards = document.querySelectorAll('.product-card');
    
    if (allFilterPill) {
        allFilterPill.click();
    } else {
        // Manual reset
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        document.querySelector('.filter-pill').classList.add('active');
        filterCards(exampleCards, 'all');
    }
}

// Card interaction functionality
function initializeCardInteractions() {
    const exampleCards = document.querySelectorAll('.product-card');
    
    exampleCards.forEach(card => {
        // Skip empty cards
        if (card.classList.contains('empty-card')) {
            return;
        }
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });
}

// Remove this function as we're not using it anymore
// Products now link directly to external URLs

// URL parameter handling
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
        // Find and activate the corresponding filter pill
        const targetPill = document.querySelector(`.filter-pill[data-filter="${filterParam}"]`);
        if (targetPill) {
            targetPill.click();
        }
    }
}

function updateURLParameter(param, value) {
    const url = new URL(window.location);
    
    if (value) {
        url.searchParams.set(param, value);
    } else {
        url.searchParams.delete(param);
    }
    
    // Update URL without reloading page
    window.history.pushState({}, '', url);
}

// Load more functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreExamples);
        
        // Initially hide if not needed
        updateLoadMoreButton();
    }
}

function loadMoreExamples() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hideLoadingState = CatalogUtils.showLoadingState(loadMoreBtn, 'טוען דוגמאות נוספות...');
    
    // Simulate loading delay
    setTimeout(() => {
        // In a real application, this would fetch more data from a server
        const additionalExamples = generateAdditionalExamples();
        appendExamplesToGallery(additionalExamples);
        
        hideLoadingState();
        CatalogUtils.showNotification('נטענו דוגמאות נוספות בהצלחה!', 'success');
        
        // Update load more button visibility
        updateLoadMoreButton();
    }, 1500);
}

function generateAdditionalExamples() {
    // This would normally come from a server/API
    return [
        {
            id: 'advanced-simulation-1',
            category: 'lomda',
            title: 'סימולציה מתקדמת לרפואה',
            description: 'סימולציה רפואית מתקדמת המאפשרת תרגול פרוצדורות מורכבות בסביבה וירטואלית בטוחה.',
            tags: ['סימולציה', 'רפואה', 'VR'],
            image: 'סימולציה רפואית'
        },
        {
            id: 'corporate-training-1',
            category: 'video',
            title: 'סדרת הדרכות ארגוניות',
            description: 'סדרת וידאו מקצועית להדרכת עובדים חדשים בתרבות הארגון וערכי החברה.',
            tags: ['הדרכה ארגונית', 'אוריינטציה', 'תרבות ארגונית'],
            image: 'הדרכה ארגונית'
        },
        {
            id: 'language-learning-1',
            category: 'lomda',
            title: 'אפליקציית לימוד שפות',
            description: 'מערכת לימוד שפות אינטראקטיבית עם זיהוי קול, תרגילי שיחה ומעקב התקדמות אישי.',
            tags: ['שפות', 'זיהוי קול', 'AI'],
            image: 'לימוד שפות'
        }
    ];
}

function appendExamplesToGallery(examples) {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    examples.forEach(example => {
        const cardHTML = createExampleCardHTML(example);
        galleryGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
    
    // Re-initialize interactions for new cards
    initializeNewCardInteractions();
    
    // Add animation to new cards
    if (galleryGrid) {
        const newCards = galleryGrid.querySelectorAll('.product-card:not(.initialized)');
        newCards.forEach((card, index) => {
            card.classList.add('initialized');
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }
}

function createExampleCardHTML(example) {
    return `
        <a href="#" class="product-card" data-category="${example.category}" data-id="${example.id}">
            <div class="product-image">
                <img src="https://page.gensparksite.com/v1/base64_upload/4bec181d521ef31ec21ffa45fdbffc99" alt="${example.title}">
            </div>
            <div class="product-title">${example.title}</div>
            <div class="product-category ${example.category}">${getCategoryName(example.category)}</div>
        </a>
    `;
}

function getCategoryName(category) {
    switch(category) {
        case 'lomda': return 'לומדה';
        case 'video': return 'סרטון';
        case 'game': return 'משחק';
        default: return category;
    }
}

function initializeNewCardInteractions() {
    const newCards = document.querySelectorAll('.product-card:not(.initialized)');
    
    newCards.forEach(card => {
        card.classList.add('initialized');
        
        if (!card.classList.contains('empty-card')) {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hover-effect');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover-effect');
            });
        }
    });
}

function updateLoadMoreButton(visibleCount = null) {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const totalCards = document.querySelectorAll('.product-card').length;
    const displayedCards = visibleCount !== null ? visibleCount : 
                          document.querySelectorAll('.product-card[style*="block"], .product-card:not([style])').length;
    
    if (loadMoreBtn) {
        // Hide load more button if all cards are displayed or if there are too few cards
        if (displayedCards >= totalCards || displayedCards < 6) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Search functionality (bonus feature)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'חפש דוגמאות...';
    searchInput.className = 'gallery-search';
    searchInput.id = 'gallery-search';
    
    const filterSection = document.querySelector('.filter-section');
    if (filterSection) {
        filterSection.appendChild(searchInput);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchExamples(searchTerm);
        });
    }
}

function searchExamples(searchTerm) {
    const exampleCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    exampleCards.forEach(card => {
        const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
        const altText = card.querySelector('img')?.alt?.toLowerCase() || '';
        
        const matchesSearch = title.includes(searchTerm) || 
                             category.includes(searchTerm) || 
                             altText.includes(searchTerm);
        
        if (matchesSearch || searchTerm === '') {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    showNoResultsMessage(visibleCount === 0 && searchTerm !== '');
    updateLoadMoreButton(visibleCount);
}

// Add CSS for new functionality
const additionalCSS = `
    .hover-effect {
        transform: translateY(-5px) !important;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
    }
    
    .no-results-message {
        text-align: center;
        padding: 3rem 2rem;
        margin: 2rem 0;
    }
    
    .no-results-content h3 {
        color: #666;
        margin-bottom: 1rem;
    }
    
    .no-results-content p {
        color: #999;
        margin-bottom: 2rem;
    }
    
    .gallery-search {
        width: 100%;
        max-width: 300px;
        padding: 0.8rem 1rem;
        border: 2px solid #e1e5e9;
        border-radius: 25px;
        font-size: 1rem;
        margin-top: 1rem;
        transition: all 0.3s ease;
    }
    
    .gallery-search:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .load-more-section {
        text-align: center;
        margin: 3rem 0;
    }
    
    @media (max-width: 768px) {
        .gallery-search {
            max-width: 100%;
        }
    }
`;

// Add the CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Initialize search (optional feature)
// Uncomment the next line to enable search functionality
// document.addEventListener('DOMContentLoaded', initializeSearch);