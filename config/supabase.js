import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://exymhsbgyxbbuwzxevpp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eW1oc2JneXhiYnV3enhldnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTU2NzUsImV4cCI6MjA2MDk5MTY3NX0.sovF5U-IVcgQVfMsAwcTzojBiAWqixTfpZcwFa0t354';

// Create object for easier imports
const supabase = {
    url: supabaseUrl,
    key: supabaseAnonKey,
    
    // Helper function to create headers
    getHeaders() {
        return {
            'apikey': this.key,
            'Authorization': `Bearer ${this.key}`,
            'Content-Type': 'application/json'
        };
    },
    
    // Helper function to fetch data with better error handling
    async fetch(endpoint, options = {}) {
        const url = `${this.url}/rest/v1/${endpoint}`;
        const defaultOptions = {
            headers: this.getHeaders()
        };
        
        const mergedOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...(options.headers || {})
            }
        };
        
        try {
            const response = await fetch(url, mergedOptions);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Supabase API error ${response.status}: ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Supabase fetch error (${endpoint}):`, error);
            throw error;
        }
    },
    
    // Test connection method
    async testConnection() {
        try {
            const result = await this.fetch('articles?select=count');
            console.log('Supabase connection test successful');
            return true;
        } catch (error) {
            console.error('Supabase connection test failed:', error);
            return false;
        }
    }
};

// Make available globally
window.supabase = supabase;

// Export for ES module usage
export default supabase;
