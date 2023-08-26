export const sql = {
    createUser: 'INSERT INTO users (email, password) values ($1, $2) returning *',
    fetchAllUsersQuery: 'SELECT * FROM users',
    fetchSingleUser: 'SELECT id, email, password FROM users WHERE email || id LIKE $1',
    fetchSingleUserById: 'SELECT * FROM users WHERE id = $1'
};