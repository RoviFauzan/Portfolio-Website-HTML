import supabase from '../config/supabase.js';

/**
 * Comment Service - Handles all comment-related operations
 */
class CommentService {
    /**
     * Post a new comment to an article
     * @param {string} articleId - UUID of the article
     * @param {string} name - Name of the commenter
     * @param {string} email - Email of the commenter
     * @param {string} content - Comment content
     * @param {string|null} parentId - Parent comment ID for replies (optional)
     * @returns {Promise} - Result of the operation
     */
    async postComment(articleId, name, email, content, parentId = null) {
        try {
            const { data, error } = await supabase
                .from('comments')
                .insert([
                    { 
                        article_id: articleId,
                        name,
                        email,
                        content,
                        parent_id: parentId
                    }
                ]);
                
            if (error) throw error;
            return {
                success: true,
                message: 'Comment submitted successfully and awaiting approval.',
                data
            };
        } catch (error) {
            console.error('Error posting comment:', error);
            return {
                success: false,
                message: 'Failed to post comment. Please try again.',
                error
            };
        }
    }
    
    /**
     * Get all approved comments for a specific article
     * @param {string} articleId - UUID of the article
     * @returns {Promise} - Comments for the article
     */
    async getComments(articleId) {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('article_id', articleId)
                .eq('approved', true)
                .order('created_at', { ascending: false });
                
            if (error) throw error;
            
            // Organize comments into threads (parent comments and their replies)
            const parentComments = data.filter(comment => !comment.parent_id);
            const commentThreads = parentComments.map(parent => {
                const replies = data.filter(comment => comment.parent_id === parent.id);
                return {
                    ...parent,
                    replies
                };
            });
            
            return {
                success: true,
                data: commentThreads
            };
        } catch (error) {
            console.error('Error fetching comments:', error);
            return {
                success: false,
                message: 'Failed to load comments',
                error
            };
        }
    }
    
    /**
     * Count comments for an article
     * @param {string} articleId - UUID of the article
     * @returns {Promise} - Number of approved comments
     */
    async countComments(articleId) {
        try {
            const { count, error } = await supabase
                .from('comments')
                .select('*', { count: 'exact' })
                .eq('article_id', articleId)
                .eq('approved', true);
                
            if (error) throw error;
            return {
                success: true,
                count
            };
        } catch (error) {
            console.error('Error counting comments:', error);
            return {
                success: false,
                count: 0,
                error
            };
        }
    }
}

// Export an instance of the comment service
const commentService = new CommentService();
export default commentService;
