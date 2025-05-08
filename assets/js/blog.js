document.addEventListener('DOMContentLoaded', function() {
    // Supabase configuration
    const SUPABASE_URL = 'https://exymhsbgyxbbuwzxevpp.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eW1oc2JneXhiYnV3enhldnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTU2NzUsImV4cCI6MjA2MDk5MTY3NX0.sovF5U-IVcgQVfMsAwcTzojBiAWqixTfpZcwFa0t354';

    // Global variables
    let blogPosts = [];
    let currentPage = 1;
    const postsPerPage = 4; // Changed from 6 to 4 articles per page
    const maxVisiblePages = 5;

    // Fetch blog posts when the page loads
    fetchBlogPosts();

    // Set up event listeners
    setupEventListeners();

    // Function to fetch blog posts from Supabase
    async function fetchBlogPosts() {
        try {
            // Show a loading state
            const blogGrid = document.getElementById('blogGrid');
            if (blogGrid) {
                blogGrid.innerHTML = `
                    <div class="text-center w-100 py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="mt-3">Loading blog posts...</p>
                    </div>`;
            }

            // Fetch data from Supabase - use 'articles' table
            const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=*,tags&published=eq.true&order=created_at.desc`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }

            // Parse the response
            blogPosts = await response.json();
            console.log('Blog posts loaded:', blogPosts);

            // Extract unique categories from blog posts for the filter
            const uniqueCategories = [...new Set(blogPosts.map(post => post.category))].filter(Boolean);

            // Update category filter dropdown with only available categories
            updateCategoryFilter(uniqueCategories);

            // Extract unique tags for the tag filter
            const allTags = [];
            blogPosts.forEach(post => {
                if (post.tags && Array.isArray(post.tags)) {
                    post.tags.forEach(tag => {
                        if (tag && typeof tag === 'string') {
                            allTags.push(tag);
                        }
                    });
                }
            });
            const uniqueTags = [...new Set(allTags)].sort();

            // Update tag filter dropdown
            updateTagFilter(uniqueTags);

            // Check URL parameters for filters
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get('category');
            const tagParam = urlParams.get('tag');
            const searchParam = urlParams.get('search');

            // Apply filters from URL parameters if present
            let filteredPosts = blogPosts;

            if (categoryParam && categoryParam !== 'all') {
                filteredPosts = filterByCategory(categoryParam);
                document.getElementById('categoryFilter').value = categoryParam;
                showFilterIndicator('category', categoryParam);
            }

            if (tagParam) {
                filteredPosts = filterByTag(tagParam, filteredPosts);
                document.getElementById('tagFilter').value = tagParam;
                showFilterIndicator('tag', tagParam);
            }

            if (searchParam) {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.value = searchParam;
                }
                filteredPosts = filterBySearch(searchParam, filteredPosts);
                showFilterIndicator('search', searchParam);
            }

            // Render the blog posts
            renderBlogPosts(filteredPosts, 1);

        } catch (error) {
            console.error('Error fetching blog posts:', error);
            const blogGrid = document.getElementById('blogGrid');
            if (blogGrid) {
                blogGrid.innerHTML = `
                    <div class="alert alert-danger w-100" role="alert">
                        <h4 class="alert-heading">Failed to load blog posts</h4>
                        <p>Please check your Supabase configuration and ensure your table structure is correct.</p>
                        <hr>
                        <p class="mb-0">Error: ${error.message}</p>
                    </div>`;
            }
        }
    }

    // Function to update category filter dropdown with available categories
    function updateCategoryFilter(categories) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (!categoryFilter) return;

        // Clear existing options except "All Categories"
        categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

        // Sort categories alphabetically
        categories.sort();

        // Add options for each unique category
        categories.forEach(category => {
            if (category) {
                const formattedCategory = formatCategory(category);
                categoryFilter.innerHTML += `
                    <option value="${category}">${formattedCategory}</option>
                `;
            }
        });
    }

    // Function to update tag filter dropdown
    function updateTagFilter(tags) {
        const tagFilter = document.getElementById('tagFilter');
        if (!tagFilter) return;

        // Clear existing options except "All Tags"
        tagFilter.innerHTML = `<option value="all">All Tags</option>`;

        // Add options for each unique tag
        tags.forEach(tag => {
            if (tag) {
                tagFilter.innerHTML += `
                    <option value="${tag}">${tag}</option>
                `;
            }
        });
    }

    // Function to render blog posts
    function renderBlogPosts(posts, page) {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) return;
        
        // Update current page
        currentPage = page;
        
        // Calculate start and end indices for the current page
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const currentPagePosts = posts.slice(startIndex, endIndex);
        
        // Clear existing content
        blogGrid.innerHTML = '';
        
        // If no posts, show a message
        if (currentPagePosts.length === 0) {
            blogGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h3>No blog posts found</h3>
                    <p>Try adjusting your search criteria or browse all posts.</p>
                    <button onclick="resetAllFilters()" class="btn btn-primary mt-3">
                        <i class="fas fa-sync-alt me-2"></i>Reset All Filters
                    </button>
                </div>`;

            // Hide pagination
            const pagination = document.getElementById('pagination');
            if (pagination) {
                pagination.style.display = 'none';
            }

            return;
        }
        
        // Render each blog post
        currentPagePosts.forEach(post => {
            // Format the date
            const formattedDate = formatDate(post.created_at);
            
            // Create excerpt from content by removing HTML tags
            const excerpt = post.content 
                ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                : 'No content available';
            
            // Create HTML for blog post tags if available
            let tagsHTML = '';
            if (post.tags && post.tags.length > 0) {
                tagsHTML = `<div class="blog-card-tags">`;
                post.tags.forEach(tag => {
                    tagsHTML += `<a href="blog.html?tag=${encodeURIComponent(tag)}" class="blog-tag-badge">${tag}</a>`;
                });
                tagsHTML += `</div>`;
            }
            
            // Ensure the category has a valid class for styling
            const categoryClass = post.category ? post.category.toLowerCase() : 'uncategorized';
            
            // Create a Bootstrap card for the blog post
            const postHTML = `
                <div class="blog-card">
                    ${post.featured_image ? 
                        `<img src="${post.featured_image}" class="blog-card-img" alt="${post.title}">` : 
                        ''}
                    <div class="blog-card-content">
                        <div class="blog-card-meta">
                            <span><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                            <a href="blog.html?category=${encodeURIComponent(post.category || 'uncategorized')}" class="category ${categoryClass}">${formatCategory(post.category || 'uncategorized')}</a>
                        </div>
                        <h3>${post.title}</h3>
                        ${tagsHTML}
                        <p>${excerpt}</p>
                        <a href="article.html?id=${post.id}" class="blog-card-link">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>`;
            
            blogGrid.innerHTML += postHTML;
        });
        
        // Update pagination
        updatePagination(posts.length);
    }

    // Function to update pagination
    function updatePagination(totalPosts) {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        // Calculate total pages
        const totalPages = Math.ceil(totalPosts / postsPerPage);

        // Show or hide pagination based on total pages
        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        } else {
            pagination.style.display = 'flex';
        }

        // Create pagination HTML
        let paginationHTML = '';

        // Previous button
        paginationHTML += `<button class="page-btn prev ${currentPage === 1 ? 'disabled' : ''}" aria-label="Previous page"><i class="fas fa-chevron-left"></i></button>`;

        // Calculate which page numbers to show
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Adjust start page if needed
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // First page button if not already showing
        if (startPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
        }

        // Page number buttons
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        // Last page button if not already showing
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        // Next button
        paginationHTML += `<button class="page-btn next ${currentPage === totalPages ? 'disabled' : ''}" aria-label="Next page"><i class="fas fa-chevron-right"></i></button>`;

        // Set the HTML
        pagination.innerHTML = paginationHTML;

        // Set up event listeners for pagination buttons
        document.querySelectorAll('.page-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Don't do anything if button is disabled
                if (this.classList.contains('disabled')) return;

                let newPage = currentPage;

                if (this.classList.contains('prev')) {
                    newPage = currentPage - 1;
                } else if (this.classList.contains('next')) {
                    newPage = currentPage + 1;
                } else {
                    newPage = parseInt(this.getAttribute('data-page'));
                }

                // Get current filters
                const categoryValue = document.getElementById('categoryFilter').value;
                const tagValue = document.getElementById('tagFilter').value;
                const searchValue = document.getElementById('searchInput').value.trim();

                // Apply filters
                let filteredPosts = blogPosts;

                if (categoryValue !== 'all') {
                    filteredPosts = filterByCategory(categoryValue);
                }

                if (tagValue !== 'all') {
                    filteredPosts = filterByTag(tagValue, filteredPosts);
                }

                if (searchValue) {
                    filteredPosts = filterBySearch(searchValue, filteredPosts);
                }

                // Render filtered posts with new page
                renderBlogPosts(filteredPosts, newPage);

                // Scroll to top of the blog posts
                document.querySelector('.article').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // Filter functions
    function filterByCategory(category) {
        return blogPosts.filter(post => post.category === category);
    }

    function filterByTag(tag, posts = blogPosts) {
        return posts.filter(post => post.tags && Array.isArray(post.tags) && post.tags.includes(tag));
    }

    function filterBySearch(query, posts = blogPosts) {
        query = query.toLowerCase();
        return posts.filter(post => {
            // Search in title
            if (post.title && post.title.toLowerCase().includes(query)) return true;

            // Search in content
            if (post.content && post.content.toLowerCase().includes(query)) return true;

            // Search in category
            if (post.category && post.category.toLowerCase().includes(query)) return true;

            // Search in tags
            if (post.tags && Array.isArray(post.tags)) {
                for (let tag of post.tags) {
                    if (tag.toLowerCase().includes(query)) return true;
                }
            }

            return false;
        });
    }

    // Helper function to format category name
    function formatCategory(category) {
        return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // Helper function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Function to show filter indicators
    function showFilterIndicator(type, value) {
        // Check if indicator already exists
        let indicator = document.querySelector('.tag-filter-indicator');

        // If not, create one
        if (!indicator) {
            const blogFilter = document.querySelector('.blog-filter');
            if (!blogFilter) return;

            indicator = document.createElement('div');
            indicator.className = 'tag-filter-indicator container mt-3';
            blogFilter.after(indicator);
        }

        // Create label based on filter type
        let label = '';
        switch(type) {
            case 'category':
                label = 'Category';
                value = formatCategory(value);
                break;
            case 'tag':
                label = 'Tag';
                break;
            case 'search':
                label = 'Search';
                break;
        }

        // Update indicator content
        indicator.innerHTML = `
            <div>
                <strong>${label}:</strong> 
                <span class="tag-name">${value}</span>
            </div>
            <a href="javascript:void(0)" class="clear-filter" onclick="resetAllFilters()">
                Clear Filters <i class="fas fa-times"></i>
            </a>
        `;
    }

    // Function to reset all filters
    function resetAllFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const tagFilter = document.getElementById('tagFilter');
        const searchInput = document.getElementById('searchInput');

        if (categoryFilter) categoryFilter.value = 'all';
        if (tagFilter) tagFilter.value = 'all';
        if (searchInput) searchInput.value = '';

        // Remove filter indicator
        const indicator = document.querySelector('.tag-filter-indicator');
        if (indicator) {
            indicator.remove();
        }

        // Reset URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);

        // Render all blog posts
        renderBlogPosts(blogPosts, 1);
    }

    // Make reset function available globally
    window.resetAllFilters = resetAllFilters;

    // Set up event listeners for filters
    function setupEventListeners() {
        const categoryFilter = document.getElementById('categoryFilter');
        const tagFilter = document.getElementById('tagFilter'); 
        const searchInput = document.getElementById('searchInput');
        const searchButton = searchInput ? searchInput.nextElementSibling : null;
        const resetButton = document.getElementById('resetFilters');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                const category = this.value;

                // Apply category filter
                let filteredPosts = blogPosts;

                if (category !== 'all') {
                    filteredPosts = filterByCategory(category);
                    showFilterIndicator('category', category);

                    // Update URL with category parameter
                    const url = new URL(window.location);
                    url.searchParams.set('category', category);
                    window.history.replaceState({}, '', url);
                } else {
                    // Remove category parameter from URL
                    const url = new URL(window.location);
                    url.searchParams.delete('category');
                    window.history.replaceState({}, '', url);

                    // Remove filter indicator if no other filters are active
                    if (tagFilter.value === 'all' && !searchInput.value.trim()) {
                        const indicator = document.querySelector('.tag-filter-indicator');
                        if (indicator) indicator.remove();
                    }
                }

                // Apply other filters if active
                if (tagFilter.value !== 'all') {
                    filteredPosts = filterByTag(tagFilter.value, filteredPosts);
                }

                if (searchInput.value.trim()) {
                    filteredPosts = filterBySearch(searchInput.value.trim(), filteredPosts);
                }

                renderBlogPosts(filteredPosts, 1);
            });
        }

        if (tagFilter) {
            tagFilter.addEventListener('change', function() {
                const tag = this.value;

                // Apply tag filter
                let filteredPosts = blogPosts;

                if (tag !== 'all') {
                    filteredPosts = filterByTag(tag);
                    showFilterIndicator('tag', tag);

                    // Update URL with tag parameter
                    const url = new URL(window.location);
                    url.searchParams.set('tag', tag);
                    window.history.replaceState({}, '', url);
                } else {
                    // Remove tag parameter from URL
                    const url = new URL(window.location);
                    url.searchParams.delete('tag');
                    window.history.replaceState({}, '', url);

                    // Remove filter indicator if no other filters are active
                    if (categoryFilter.value === 'all' && !searchInput.value.trim()) {
                        const indicator = document.querySelector('.tag-filter-indicator');
                        if (indicator) indicator.remove();
                    }
                }

                // Apply other filters if active
                if (categoryFilter.value !== 'all') {
                    filteredPosts = filterByCategory(categoryFilter.value);
                    filteredPosts = filterByTag(tag, filteredPosts);
                }

                if (searchInput.value.trim()) {
                    filteredPosts = filterBySearch(searchInput.value.trim(), filteredPosts);
                }

                renderBlogPosts(filteredPosts, 1);
            });
        }

        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const searchValue = searchInput.value.trim();

                if (!searchValue) {
                    // If search is empty, reset search filter
                    const url = new URL(window.location);
                    url.searchParams.delete('search');
                    window.history.replaceState({}, '', url);

                    // Remove filter indicator if no other filters are active
                    if (categoryFilter.value === 'all' && tagFilter.value === 'all') {
                        const indicator = document.querySelector('.tag-filter-indicator');
                        if (indicator) indicator.remove();
                    }

                    // Apply other filters if active
                    let filteredPosts = blogPosts;

                    if (categoryFilter.value !== 'all') {
                        filteredPosts = filterByCategory(categoryFilter.value);
                    }

                    if (tagFilter.value !== 'all') {
                        filteredPosts = filterByTag(tagFilter.value, filteredPosts);
                    }

                    renderBlogPosts(filteredPosts, 1);
                    return;
                }

                // Apply search filter
                let filteredPosts = filterBySearch(searchValue);
                showFilterIndicator('search', searchValue);

                // Update URL with search parameter
                const url = new URL(window.location);
                url.searchParams.set('search', searchValue);
                window.history.replaceState({}, '', url);

                // Apply other filters if active
                if (categoryFilter.value !== 'all') {
                    filteredPosts = filterByCategory(categoryFilter.value);
                    filteredPosts = filterBySearch(searchValue, filteredPosts);
                }

                if (tagFilter.value !== 'all') {
                    filteredPosts = filterByTag(tagFilter.value, filteredPosts);
                    filteredPosts = filterBySearch(searchValue, filteredPosts);
                }

                renderBlogPosts(filteredPosts, 1);
            });

            // Also handle Enter key on search input
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchButton.click();
                }
            });
        }

        if (resetButton) {
            resetButton.addEventListener('click', resetAllFilters);
        }
    }
});
