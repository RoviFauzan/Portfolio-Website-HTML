document.addEventListener('DOMContentLoaded', function() {
    // Get post ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        // Redirect to blog listing if no ID is provided
        window.location.href = 'blog.html';
        return;
    }
    
    // Wait for blog data to be available
    // This assumes blog.js is loaded before this script
    const checkDataInterval = setInterval(() => {
        if (window.blogData) {
            clearInterval(checkDataInterval);
            loadBlogPost(postId);
        }
    }, 100);
    
    function loadBlogPost(id) {
        const post = window.blogData.getPostById(parseInt(id));
        
        if (!post) {
            displayError('Post not found');
            return;
        }
        
        // Set page title
        document.title = `${post.title} | Rovi Fauzan's Blog`;
        
        // Update header with Bootstrap classes
        const headerEl = document.getElementById('article-header');
        if (headerEl) {
            headerEl.innerHTML = `
                <h1 class="display-4 fw-bold">${post.title}</h1>
                <div class="post-meta d-flex flex-wrap justify-content-center mb-3">
                    <span class="me-3 mb-2"><i class="far fa-user me-2"></i> ${post.author}</span>
                    <span class="me-3 mb-2"><i class="far fa-calendar-alt me-2"></i> ${post.date}</span>
                    <span class="me-3 mb-2"><i class="far fa-clock me-2"></i> ${post.readTime}</span>
                    <span class="mb-2"><i class="far fa-folder me-2"></i> ${formatCategory(post.category)}</span>
                </div>
                <img src="${post.image}" alt="${post.title}" class="featured-image img-fluid rounded shadow">
            `;
        }
        
        // Update content
        const contentEl = document.getElementById('post-content');
        if (contentEl) {
            contentEl.innerHTML = post.content;
        }
        
        // Add syntax highlighting to code blocks
        document.querySelectorAll('pre').forEach(block => {
            highlightCode(block);
        });
        
        // Load recent posts in sidebar
        loadRecentPosts(post.id);
    }
    
    // Format category name for display
    function formatCategory(category) {
        return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    // Load recent posts with Bootstrap styling
    function loadRecentPosts(currentPostId) {
        const recentPostsContainer = document.getElementById('recent-posts');
        if (!recentPostsContainer) return;
        
        const recentPosts = window.blogData.getRecentPosts(3, currentPostId);
        
        recentPostsContainer.innerHTML = '';
        
        recentPosts.forEach(post => {
            // Create a Bootstrap card for each recent post
            const postEl = document.createElement('div');
            postEl.className = 'col-md-12 mb-3';
            postEl.innerHTML = `
                <div class="recent-post card h-100">
                    <div class="row g-0">
                        <div class="col-4">
                            <img src="${post.image}" alt="${post.title}" class="img-fluid rounded-start h-100 recent-post-img">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title"><a href="article.html?id=${post.id}" class="text-decoration-none">${post.title}</a></h5>
                                <p class="card-text"><small class="text-muted">${post.date}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            recentPostsContainer.appendChild(postEl);
        });
    }
    
    // Simple syntax highlighting function
    function highlightCode(block) {
        let html = block.innerHTML;
        
        // Replace keywords with colored spans
        const keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'true', 'false', 'null', 'undefined'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            html = html.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        html = html.replace(/(["'`])(.*?)\1/g, '<span class="string">$1$2$1</span>');
        
        // Highlight comments
        html = html.replace(/\/\/(.*)/g, '<span class="comment">//$1</span>');
        
        block.innerHTML = html;
    }
    
    // Display error message with Bootstrap styling
    function displayError(message) {
        const headerEl = document.getElementById('article-header');
        const contentEl = document.getElementById('post-content');
        
        if (headerEl) {
            headerEl.innerHTML = `<h1 class="text-danger">Error</h1>`;
        }
        
        if (contentEl) {
            contentEl.innerHTML = `
                <div class="alert alert-danger error-message" role="alert">
                    <h4 class="alert-heading">${message}</h4>
                    <p>The blog post you're looking for might have been removed or is temporarily unavailable.</p>
                    <hr>
                    <a href="blog.html" class="btn btn-outline-primary">
                        <i class="fas fa-arrow-left me-2"></i>Back to Blog
                    </a>
                </div>`;
        }
    }
    
    // Setup comment form
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const comment = document.getElementById('comment').value;
            
            // In a real application, you would send this data to a server
            alert(`Thank you for your comment, ${name}! In a real application, this would be saved to a database.`);
            
            // Reset the form
            commentForm.reset();
        });
    }
    
    // Handle reply buttons in comments
    document.querySelectorAll('.reply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Get the comment author name
            const commentHeader = this.closest('.comment-content').querySelector('.comment-header');
            const authorName = commentHeader ? commentHeader.querySelector('h4').textContent : '';
            
            // Focus on comment form and add @mention
            const commentTextarea = document.getElementById('comment');
            if (commentTextarea) {
                commentTextarea.focus();
                commentTextarea.value = `@${authorName} `;
                
                // Scroll to comment form
                const commentForm = document.querySelector('.comment-form');
                if (commentForm) {
                    commentForm.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Add code styling for better readability of code blocks
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            pre {
                background-color: #f7f7f7;
                padding: 1rem;
                border-radius: 5px;
                overflow-x: auto;
                font-family: 'Courier New', Courier, monospace;
                line-height: 1.4;
                font-size: 0.9rem;
                tab-size: 4;
            }
            .keyword {
                color: #0077aa;
                font-weight: bold;
            }
            .string {
                color: #cc5500;
            }
            .comment {
                color: #009900;
                font-style: italic;
            }
        </style>
    `);
    
    // Share functionality with Bootstrap icons
    function createShareButtons() {
        const post = window.blogData.getPostById(parseInt(postId));
        if (!post) return;
        
        const shareContainer = document.createElement('div');
        shareContainer.className = 'share-buttons card mb-4';
        shareContainer.innerHTML = `
            <div class="card-body text-center">
                <h4 class="card-title mb-3">Share this article</h4>
                <div class="share-icons d-flex justify-content-center">
                    <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}" 
                       class="btn btn-outline-primary rounded-circle mx-1" target="_blank" aria-label="Share on Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                       class="btn btn-outline-primary rounded-circle mx-1" target="_blank" aria-label="Share on Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}" 
                       class="btn btn-outline-primary rounded-circle mx-1" target="_blank" aria-label="Share on LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${window.location.href}`)}" 
                       class="btn btn-outline-primary rounded-circle mx-1" aria-label="Share via Email">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <button class="copy-link btn btn-outline-primary rounded-circle mx-1" aria-label="Copy link">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Insert share buttons before the author section
        const authorSection = document.querySelector('.post-author');
        if (authorSection && authorSection.parentNode) {
            authorSection.parentNode.insertBefore(shareContainer, authorSection);
        }
        
        // Handle copy link button
        const copyLinkBtn = shareContainer.querySelector('.copy-link');
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalIcon = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    this.classList.add('bg-success', 'text-white');
                    
                    setTimeout(() => {
                        this.innerHTML = originalIcon;
                        this.classList.remove('bg-success', 'text-white');
                    }, 2000);
                });
            });
        }
    }
    
    // Function to handle reading progress with Bootstrap styling
    function setupReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress reading-progress fixed-top';
        progressBar.style.height = '4px';
        progressBar.innerHTML = '<div class="progress-bar bg-primary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>';
        document.body.appendChild(progressBar);
        
        const progressBarInner = progressBar.querySelector('.progress-bar');
        
        window.addEventListener('scroll', () => {
            const article = document.getElementById('post-content');
            if (!article) return;
            
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const articleTop = article.getBoundingClientRect().top;
            
            // Calculate reading progress
            let readingProgress = 0;
            if (articleTop <= 0) {
                const articleBottom = articleTop + articleHeight;
                if (articleBottom <= windowHeight) {
                    readingProgress = 100; // Article fully read
                } else {
                    readingProgress = (Math.abs(articleTop) / (articleHeight - windowHeight)) * 100;
                }
            }
            
            progressBarInner.style.width = `${readingProgress}%`;
            progressBarInner.setAttribute('aria-valuenow', Math.round(readingProgress));
        });
    }
    
    // Table of contents generator with Bootstrap styling
    function generateTableOfContents() {
        const contentEl = document.getElementById('post-content');
        if (!contentEl) return;
        
        // Get all headings in the content
        const headings = contentEl.querySelectorAll('h2');
        if (headings.length < 3) return; // Only create TOC if there are enough headings
        
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents card mb-4';
        tocContainer.innerHTML = '<div class="card-header"><h3>Table of Contents</h3></div><div class="card-body"><ul class="list-group list-group-flush toc-list"></ul></div>';
        
        const tocList = tocContainer.querySelector('.toc-list');
        
        // Add IDs to headings and create TOC items
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.className = 'text-decoration-none';
            link.textContent = heading.textContent;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
            
            // Scroll behavior
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById(id).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Insert TOC at the beginning of the content
        contentEl.insertBefore(tocContainer, contentEl.firstChild);
    }
    
    // Initialize additional features after blog post is loaded
    function initAdditionalFeatures() {
        createShareButtons();
        setupReadingProgress();
        generateTableOfContents();
    }
    
    // Set up a timer to initialize additional features after post content is loaded
    const featuresTimer = setInterval(() => {
        const contentEl = document.getElementById('post-content');
        if (contentEl && contentEl.innerHTML.trim() !== '') {
            clearInterval(featuresTimer);
            initAdditionalFeatures();
        }
    }, 100);
});
