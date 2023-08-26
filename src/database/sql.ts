export const sql = {
    createUser: 'INSERT INTO users (email, password) values ($1, $2) returning *',
    fetchAllUsersQuery: 'SELECT * FROM users',
    fetchSingleUser: 'SELECT * FROM users WHERE id = $1'
};