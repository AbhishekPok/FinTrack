-- Migration script to convert category from CharField to ForeignKey

-- Step 1: Rename existing category column
ALTER TABLE transactions_transaction RENAME COLUMN category TO category_old;

-- Step 2: Create the Category table
CREATE TABLE IF NOT EXISTS transactions_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) DEFAULT '📁',
    type VARCHAR(10) DEFAULT 'expense',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id BIGINT NOT NULL REFERENCES accounts_user(id) ON DELETE CASCADE,
    UNIQUE(user_id, name)
);

-- Step 3: Create index
CREATE INDEX idx_category_user_type ON transactions_category(user_id, type);

-- Step 4: Add new category_id column to transactions
ALTER TABLE transactions_transaction ADD COLUMN category_id BIGINT REFERENCES transactions_category(id) ON DELETE RESTRICT;

-- Step 5: Insert default categories for all users
INSERT INTO transactions_category (user_id, name, icon, type, created_at, updated_at)
SELECT u.id, c.name, c.icon, c.type, NOW(), NOW()
FROM accounts_user u
CROSS JOIN (VALUES 
    ('Food & Beverages', '🍔', 'expense'),
    ('Transportation', '🚗', 'expense'),
    ('Shopping', '🛍️', 'expense'),
    ('Utilities', '💡', 'expense'),
    ('Entertainment', '🎬', 'expense'),
    ('Health & Fitness', '⚕️', 'expense'),
    ('Income', '💰', 'income'),
    ('Other', '📁', 'expense')
) AS c(name, icon, type)
ON CONFLICT (user_id, name) DO NOTHING;

-- Step 6: Update existing transactions to link to new categories
UPDATE transactions_transaction t
SET category_id = (
    SELECT c.id 
    FROM transactions_category c
    WHERE c.user_id = t.user_id 
    AND c.name = t.category_old
    LIMIT 1
)
WHERE t.category_old IS NOT NULL;

-- Step 7: Drop old category column
ALTER TABLE transactions_transaction DROP COLUMN category_old;

-- Complete!
