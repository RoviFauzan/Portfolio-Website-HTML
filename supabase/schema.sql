-- Articles table to store blog articles
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    featured_image VARCHAR(500),
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    published BOOLEAN DEFAULT FALSE,
    category VARCHAR(50) NOT NULL DEFAULT 'uncategorized', -- Added category field
    tags TEXT[] -- Added tags field as an array
);

-- Comments table to store user comments on articles - updated to approve comments by default
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved BOOLEAN DEFAULT TRUE, -- Changed to default TRUE so comments appear immediately
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE -- For nested comments/replies
);

-- Create index for faster lookups of comments by article
CREATE INDEX comments_article_id_idx ON comments(article_id);

-- Create indexes for faster category and tag lookups
CREATE INDEX articles_category_idx ON articles(category);
CREATE INDEX articles_tags_idx ON articles USING GIN(tags);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update the timestamp
CREATE TRIGGER update_articles_timestamp
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Row Level Security policies
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Public read access for articles
CREATE POLICY "Public can view published articles" 
    ON articles FOR SELECT 
    USING (published = TRUE);

-- Public read access for approved comments
CREATE POLICY "Public can view approved comments" 
    ON comments FOR SELECT 
    USING (approved = TRUE);

-- Public can insert comments, but they'll need approval
CREATE POLICY "Public can insert comments" 
    ON comments FOR INSERT 
    WITH CHECK (true);
