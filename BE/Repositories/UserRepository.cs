using Dapper;
using SchoolPlatform.API.Data;
using SchoolPlatform.API.Models;

namespace SchoolPlatform.API.Repositories
{
    public class UserRepository
    {
        private readonly DatabaseConnection _dbConnection;

        public UserRepository(DatabaseConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            using var connection = _dbConnection.GetConnection();
            var sql = "SELECT * FROM users WHERE email = @Email AND is_active = 1";
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            using var connection = _dbConnection.GetConnection();
            var sql = "SELECT * FROM users WHERE user_id = @UserId AND is_active = 1";
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { UserId = userId });
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            using var connection = _dbConnection.GetConnection();
            var sql = "SELECT * FROM users WHERE is_active = 1";
            var users = await connection.QueryAsync<User>(sql);
            return users.ToList();
        }

        public async Task<int> CreateUserAsync(User user)
        {
            using var connection = _dbConnection.GetConnection();
            var sql = @"INSERT INTO users (username, email, password_hash, first_name, last_name, role_id) 
                       VALUES (@Username, @Email, @PasswordHash, @FirstName, @LastName, @RoleId);
                       SELECT LAST_INSERT_ID();";

            return await connection.ExecuteScalarAsync<int>(sql, user);
        }

        public async Task<bool> UpdateLastLoginAsync(int userId)
        {
            using var connection = _dbConnection.GetConnection();
            var sql = "UPDATE users SET last_login = NOW() WHERE user_id = @UserId";
            var result = await connection.ExecuteAsync(sql, new { UserId = userId });
            return result > 0;
        }
    }
}