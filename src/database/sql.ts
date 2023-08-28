export const sql = {
    createUser: 'INSERT INTO users (email, name, password) values ($1, $2, $3) returning *',
    fetchAllUsersQuery: 'SELECT * FROM users',
    fetchSingleUser: 'SELECT id, email, password FROM users WHERE email || id LIKE $1',
    createPost: 'INSERT INTO posts (user_id, content) values ($1, $2) returning *',
    fetchUserPosts: 'SELECT * FROM posts WHERE user_id = $1',
    findPost: 'SELECT * FROM posts WHERE id = $1',
    createComment: 'INSERT INTO comments (post_id, user_id, content) values ($1, $2, $3) returning *',
    fetchPostComments: 'SELECT * FROM comments WHERE post_id = $1',
};