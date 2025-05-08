document.addEventListener('DOMContentLoaded', async function() {
    // Get article ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    // Elements
    const postTitle = document.getElementById('post-title');
    const articleHeader = document.getElementById('article-header');
    const postContent = document.getElementById('post-content');
    const recentPostsContainer = document.getElementById('recent-posts');
    const articleTags = document.getElementById('article-tags');
    
    // Comment form elements
    const commentForm = document.getElementById('commentForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentInput = document.getElementById('comment');
    
    // Supabase configuration
    const SUPABASE_URL = 'https://exymhsbgyxbbuwzxevpp.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eW1oc2JneXhiYnV3enhldnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTU2NzUsImV4cCI6MjA2MDk5MTY3NX0.sovF5U-IVcgQVfMsAwcTzojBiAWqixTfpZcwFa0t354';
    
    if (!articleId) {
        // Show error if no ID is provided
        showError('No article ID provided in the URL.');
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Add reference to comments section elements
    const commentsSection = document.querySelector('.post-comments');
    const commentsList = document.querySelector('.comments-list');
    const commentsCountElement = document.querySelector('.post-comments .card-header h3');
    
    try {
        // Fetch article data from Supabase
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/articles?id=eq.${articleId}&published=eq.true&select=*`, 
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`Failed to fetch article. Status: ${response.status}`);
        }
        
        const articles = await response.json();
        console.log('Article data:', articles);
        
        if (!articles || articles.length === 0) {
            // Article not found or not published
            showError('Post not found. The blog post you\'re looking for might have been removed or is temporarily unavailable.');
            return;
        }
        
        // We have the article data
        const article = articles[0];
        
        // Update page title
        document.title = `${article.title} | Rovi Fauzan`;
        if (postTitle) {
            postTitle.textContent = article.title;
        }
        
        // Render article header
        if (articleHeader) {
            articleHeader.innerHTML = `
                <h1>${article.title}</h1>
                <div class="article-meta">
                    <span class="article-date">
                        <i class="far fa-calendar-alt"></i> 
                        ${formatDate(article.created_at)}
                    </span>
                    <span class="article-author">
                        <i class="fas fa-user"></i> 
                        ${article.author || 'Rovi Fauzan'}
                    </span>
                    <span class="article-category">
                        <i class="fas fa-folder"></i> 
                        <a href="blog.html?category=${article.category}">
                            ${formatCategory(article.category || 'uncategorized')}
                        </a>
                    </span>
                </div>
                ${article.featured_image ? 
                    `<div class="article-featured-image">
                        <img src="${article.featured_image}" alt="${article.title}" class="img-fluid rounded">
                    </div>` : 
                    ''}
            `;
        }
        
        // Render article content
        if (postContent) {
            postContent.innerHTML = article.content;
            
            // Apply syntax highlighting to code blocks if Prism.js is available
            if (window.Prism) {
                window.Prism.highlightAll();
            }
        }
        
        // Render article tags with improved visibility
        if (articleTags && article.tags && article.tags.length > 0) {
            let tagsHTML = '<div class="tags-container"><h5>Tags:</h5>';
            article.tags.forEach(tag => {
                tagsHTML += `<a href="blog.html?tag=${encodeURIComponent(tag)}" class="badge m-1">${tag}</a>`;
            });
            tagsHTML += '</div>';
            articleTags.innerHTML = tagsHTML;
        } else if (articleTags) {
            articleTags.style.display = 'none';
        }
        
        // Setup comment form with hidden article ID
        if (commentForm) {
            // Create a hidden input field for article ID if it doesn't exist
            let articleIdInput = document.getElementById('article-id');
            if (!articleIdInput) {
                articleIdInput = document.createElement('input');
                articleIdInput.type = 'hidden';
                articleIdInput.id = 'article-id';
                articleIdInput.name = 'article_id';
                commentForm.appendChild(articleIdInput);
            }
            articleIdInput.value = articleId;
            
            // Handle comment form submission
            commentForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                if (!nameInput.value || !emailInput.value || !commentInput.value) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Get the parent comment ID if any
                const parentCommentId = document.getElementById('parent-comment-id') ? 
                    document.getElementById('parent-comment-id').value : null;
                
                try {
                    // Submit comment to Supabase - now with approved set to true by default
                    const response = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`
                        },
                        body: JSON.stringify({
                            article_id: articleId,
                            name: nameInput.value,
                            email: emailInput.value,
                            content: commentInput.value,
                            approved: true, // Set comments as approved by default
                            parent_id: parentCommentId || null
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to submit comment');
                    }
                    
                    // Clear form
                    commentForm.reset();
                    
                    // Remove reply info if exists
                    const replyInfo = document.getElementById('reply-info');
                    if (replyInfo) {
                        replyInfo.remove();
                    }
                    
                    // Clear parent comment ID
                    if (document.getElementById('parent-comment-id')) {
                        document.getElementById('parent-comment-id').value = '';
                    }
                    
                    // Show success message and reload comments to show the new comment
                    alert('Thank you for your comment! It has been posted successfully.');
                    
                    // Reload comments to show the new comment
                    await loadArticleComments(articleId);
                    
                } catch (error) {
                    console.error('Error submitting comment:', error);
                    alert('An error occurred while submitting your comment. Please try again later.');
                }
            });
        }
        
        // Load comments for this article
        await loadArticleComments(articleId);
        
        // Load recent posts
        await loadRecentPosts(articleId);
        
        // Load categories and tags for the sidebar
        await loadCategories();
        await loadTags();
        
    } catch (error) {
        console.error('Error fetching article:', error);
        showError('An error occurred while loading the article. Please try again later.');
    }
    
    // Function to load recent posts
    async function loadRecentPosts(excludeId) {
        if (!recentPostsContainer) return;
        
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/articles?published=eq.true&order=created_at.desc&limit=3`, 
                {
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch recent posts');
            }
            
            const posts = await response.json();
            
            // Filter out current post and limit to 3 posts
            const recentPosts = posts
                .filter(post => post.id !== excludeId)
                .slice(0, 3);
            
            if (recentPosts.length === 0) {
                recentPostsContainer.innerHTML = '<p class="text-center">No other posts available.</p>';
                return;
            }
            
            let recentPostsHTML = '';
            
            recentPosts.forEach(post => {
                const excerpt = post.content 
                    ? post.content.replace(/<[^>]*>/g, '').substring(0, 80) + '...'
                    : 'No content available';
                
                recentPostsHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            ${post.featured_image ? 
                                `<img src="${post.featured_image}" class="card-img-top" alt="${post.title}">` : 
                                ''}
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${excerpt}</p>
                                <a href="article.html?id=${post.id}" class="btn btn-sm btn-outline-primary">Read More</a>
                            </div>
                            <div class="card-footer text-muted">
                                <small>${formatDate(post.created_at)}</small>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            recentPostsContainer.innerHTML = recentPostsHTML;
            
        } catch (error) {
            console.error('Error loading recent posts:', error);
            recentPostsContainer.innerHTML = '<p class="text-center text-secondary">Failed to load recent posts.</p>';
        }
    }
    
    // Function to load comments for the article
    async function loadArticleComments(articleId) {
        if (!commentsList || !commentsCountElement) return;
        
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/comments?article_id=eq.${articleId}&approved=eq.true&select=*&order=created_at.desc`, 
                {
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            
            const comments = await response.json();
            console.log('Comments data:', comments);
            
            // Update comments count in the header
            const commentCount = comments.length;
            commentsCountElement.textContent = `Comments (${commentCount})`;
            
            // If no comments, show a message
            if (comments.length === 0) {
                commentsList.innerHTML = `
                    <div class="no-comments text-center py-4">
                        <p class="text-muted">No comments yet. Be the first to comment!</p>
                    </div>
                `;
                return;
            }
            
            // Group comments into parent comments and replies
            const parentComments = comments.filter(c => !c.parent_id);
            const replies = comments.filter(c => c.parent_id);
            
            // Clear existing hardcoded comments
            commentsList.innerHTML = '';
            
            // Render parent comments and their replies
            parentComments.forEach(comment => {
                // Find all replies to this parent comment
                const commentReplies = replies.filter(reply => reply.parent_id === comment.id);
                
                // Create the comment element
                const commentElement = createCommentElement(comment, false);
                commentsList.appendChild(commentElement);
                
                // Add replies if any
                commentReplies.forEach(reply => {
                    const replyElement = createCommentElement(reply, true);
                    commentsList.appendChild(replyElement);
                });
            });
            
            // Set up reply buttons functionality
            setupReplyButtons();
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsList.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Failed to load comments. Please try again later.
                </div>
            `;
        }
    }
    
    // Function to create a comment element
    function createCommentElement(comment, isReply) {
        const formattedDate = formatRelativeTime(new Date(comment.created_at));
        
        const commentDiv = document.createElement('div');
        commentDiv.className = isReply 
            ? 'comment reply' 
            : 'comment';
        
        commentDiv.innerHTML = `
            <div class="comment-header">
                <h4>${comment.name}</h4>
                <span class="comment-date"><i class="far fa-clock"></i> ${formattedDate}</span>
            </div>
            <div class="comment-content">
                ${comment.content}
            </div>
            <button class="reply-btn"><i class="fas fa-reply"></i> Reply</button>
        `;
        
        // Add data attributes to reply button
        const replyBtn = commentDiv.querySelector('.reply-btn');
        replyBtn.setAttribute('data-comment-id', comment.id);
        replyBtn.setAttribute('data-commenter-name', comment.name);
        
        return commentDiv;
    }
    
    // Function to setup reply buttons
    function setupReplyButtons() {
        const replyButtons = document.querySelectorAll('.reply-btn');
        
        replyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const commentId = this.getAttribute('data-comment-id');
                const commenterName = this.getAttribute('data-commenter-name');
                
                try {
                    // Create reply info element if it doesn't exist
                    let replyInfo = document.getElementById('reply-info');
                    
                    if (!replyInfo) {
                        replyInfo = document.createElement('div');
                        replyInfo.id = 'reply-info';
                        replyInfo.className = 'alert alert-info d-flex justify-content-between align-items-center mb-3';
                    } else if (replyInfo.parentNode) {
                        // If it exists and has a parent, remove it first to avoid DOM issues
                        replyInfo.parentNode.removeChild(replyInfo);
                    }
                    
                    // Insert it before the comment form with safe checking
                    if (commentForm && commentForm.parentNode) {
                        commentForm.parentNode.insertBefore(replyInfo, commentForm);
                        
                        // Create hidden field for parent comment ID if it doesn't exist
                        let parentCommentInput = document.getElementById('parent-comment-id');
                        if (!parentCommentInput) {
                            parentCommentInput = document.createElement('input');
                            parentCommentInput.type = 'hidden';
                            parentCommentInput.id = 'parent-comment-id';
                            parentCommentInput.name = 'parent_comment_id';
                            
                            if (commentForm) {
                                commentForm.appendChild(parentCommentInput);
                            }
                        }
                        
                        // Set the parent comment ID
                        parentCommentInput.value = commentId;
                        
                        // Show the reply info
                        replyInfo.innerHTML = `
                            <div>
                                <strong>Replying to ${commenterName}</strong>
                            </div>
                            <button type="button" id="cancel-reply" class="btn btn-sm btn-outline-secondary">Cancel</button>
                        `;
                        
                        // Setup cancel reply button with better event handling
                        const cancelReplyBtn = document.getElementById('cancel-reply');
                        if (cancelReplyBtn) {
                            // Use once: true to ensure the event handler is automatically removed after executing once
                            cancelReplyBtn.addEventListener('click', function() {
                                if (replyInfo && replyInfo.parentNode) {
                                    replyInfo.parentNode.removeChild(replyInfo);
                                }
                                if (parentCommentInput) {
                                    parentCommentInput.value = '';
                                }
                            }, { once: true });
                        }
                        
                        // Scroll to the comment form
                        if (commentForm) {
                            commentForm.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                } catch (error) {
                    console.error('Error setting up reply functionality:', error);
                    // Silent fail to prevent breaking the application
                }
            });
        });
    }
    
    // Function to load categories
    async function loadCategories() {
        try {
            const categoryList = document.getElementById('category-list');
            if (!categoryList) return;
            
            const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=category&published=eq.true`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            
            const data = await response.json();
            
            // Extract unique categories that actually exist in published articles
            const categories = [...new Set(data.map(item => item.category))].filter(Boolean);
            
            // Sort categories alphabetically
            categories.sort();
            
            categoryList.innerHTML = '';
            
            // Add "All" option
            categoryList.innerHTML += `
                <li class="list-group-item">
                    <a href="blog.html">All Categories</a>
                </li>
            `;
            
            // Add each category
            categories.forEach(category => {
                categoryList.innerHTML += `
                    <li class="list-group-item">
                        <a href="blog.html?category=${category}">${formatCategory(category)}</a>
                    </li>
                `;
            });
            
            // If no categories found, show a message
            if (categories.length === 0) {
                categoryList.innerHTML += `
                    <li class="list-group-item text-muted">No categories available</li>
                `;
            }
        } catch (error) {
            console.error('Error loading categories:', error);
            const categoryList = document.getElementById('category-list');
            if (categoryList) {
                categoryList.innerHTML = `
                    <li class="list-group-item">
                        <a href="blog.html">All Categories</a>
                    </li>
                    <li class="list-group-item text-danger">Failed to load categories</li>
                `;
            }
        }
    }
    
    // Function to load tags with improved visibility
    async function loadTags() {
        try {
            const tagsCloud = document.getElementById('tags-cloud');
            if (!tagsCloud) return;
            
            const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=tags&published=eq.true`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch tags. Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Tags data:', data);
            
            // Safely extract tags
            const allTags = [];
            data.forEach(item => {
                if (item.tags && Array.isArray(item.tags)) {
                    item.tags.forEach(tag => {
                        if (tag && typeof tag === 'string') {
                            allTags.push(tag);
                        }
                    });
                }
            });
            
            // Count tag occurrences
            const tagCounts = {};
            allTags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
            
            // Sort tags by occurrence count (descending)
            const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
            
            // Take the top 15 tags
            const topTags = sortedTags.slice(0, 15);
            
            // Update the tags cloud with safe DOM manipulation and improved styling
            tagsCloud.innerHTML = '';
            if (topTags.length === 0) {
                tagsCloud.innerHTML = '<p class="text-muted">No tags available</p>';
            } else {
                topTags.forEach(tag => {
                    // Create tag element safely with improved styling
                    const tagLink = document.createElement('a');
                    tagLink.href = `blog.html?tag=${encodeURIComponent(tag)}`;
                    tagLink.className = 'badge m-1';
                    tagLink.textContent = tag;
                    
                    // Add to tags cloud
                    tagsCloud.appendChild(tagLink);
                });
            }
        } catch (error) {
            console.error('Error loading tags:', error);
            const tagsCloud = document.getElementById('tags-cloud');
            if (tagsCloud) {
                tagsCloud.innerHTML = '<p class="text-danger">Failed to load tags</p>';
            }
        }
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
    
    // Helper function to format relative time (e.g., "2 days ago")
    function formatRelativeTime(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        
        if (diffDays > 30) {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } else if (diffDays > 0) {
            return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
        } else if (diffHours > 0) {
            return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
        } else if (diffMinutes > 0) {
            return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
        } else {
            return 'Just now';
        }
    }
    
    // Function to show loading state
    function showLoading() {
        if (postContent) {
            postContent.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3">Loading article...</p>
                </div>
            `;
        }
    }
    
    // Function to show error
    function showError(message) {
        if (articleHeader) {
            articleHeader.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <h2 class="alert-heading">Error</h2>
                    <p>${message}</p>
                </div>
            `;
        }
        
        if (postContent) {
            postContent.innerHTML = `
                <div class="text-center">
                    <a href="blog.html" class="btn btn-primary mt-3">
                        <i class="fas fa-arrow-left me-2"></i>Return to Blog
                    </a>
                </div>
            `;
        }
    }
});
