export const sql = {
    createUser: 'INSERT INTO users (email, name, password) values ($1, $2, $3) returning *',
    fetchAllUsersQuery: 'SELECT * FROM users',
    fetchSingleUser: 'SELECT id, email, password FROM users WHERE email || id LIKE $1',
    createPost: 'INSERT INTO posts (user_id, content) values ($1, $2) returning *',
    fetchUserPosts: 'SELECT * FROM posts WHERE user_id = $1',
    findPost: 'SELECT * FROM posts WHERE id = $1',
    createComment: 'INSERT INTO comments (post_id, user_id, content) values ($1, $2, $3) returning *',
    fetchPostComments: 'SELECT * FROM comments WHERE post_id = $1',
    unOptimizedQuery: `SELECT users.id, users.name, posts.content, comments.content
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    LEFT JOIN comments ON posts.id = comments.post_id
    WHERE comments.created_at = (SELECT MAX(created_at) FROM comments WHERE post_id = posts.id)
    ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.user_id = users.id) DESC
    LIMIT 3;
    `,

    // EXPLANATION OF QUERY OPTIMIZATION TASK

    /**
     * Create Optimal Indexes
      - Index was created on posts table(idx_user_id) on user_id column and on comments table(idx_post_id) on post_id column
     
      * Avoid Subselect When Selecting MAX/MIN Per Group
      - Constant subquery results are usually not cached by the database, especially in non-recent database versions. Therefore, a constant subquery in a WHERE clause will be fully evaluated for every row the WHERE clause will examine, which can significantly impact query performance.
     */
    optimisedQuery: `SELECT
    users.id,
    users.name,
    posts.content,
    comments2.content 
FROM
    users 
LEFT JOIN
    posts 
        ON users.id = posts.user_id 
LEFT JOIN
    comments AS comments2 
        ON posts.id = comments2.post_id 
LEFT JOIN
    comments AS comments3 
        ON (
            comments3.post_id = posts.id
        ) 
        AND (
            comments2.created_at < comments3.created_at
        ) 
WHERE
    (
        1 = 1
    ) 
    AND (
        comments3.created_at IS NULL
    ) 
ORDER BY
    (SELECT
        COUNT(posts.id) 
    FROM
        posts 
    WHERE
        posts.user_id = users.id) DESC LIMIT 3`
};