using Microsoft.AspNetCore.Mvc;
using SchoolPlatform.API.Models;
using SchoolPlatform.API.Repositories;

namespace SchoolPlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly ILogger<UsersController> _logger;

        public UsersController(UserRepository userRepository, ILogger<UsersController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            try
            {
                var users = await _userRepository.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all users");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user {UserId}", id);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                {
                    return BadRequest(new LoginResponse
                    {
                        Success = false,
                        Message = "Email и парола са задължителни"
                    });
                }

                var user = await _userRepository.GetUserByEmailAsync(request.Email);

                if (user == null)
                {
                    return Ok(new LoginResponse
                    {
                        Success = false,
                        Message = "Грешен email или парола"
                    });
                }

                // ВАЖНО: Тук трябва да добавиш проверка на хеширана парола (BCrypt)
                // За сега проста проверка (ВРЕМЕННО И НЕСИГУРНО!)
                if (user.PasswordHash == request.Password)
                {
                    // Обнови последен login
                    await _userRepository.UpdateLastLoginAsync(user.UserId);

                    return Ok(new LoginResponse
                    {
                        Success = true,
                        Message = "Успешен вход",
                        User = new UserDto
                        {
                            UserId = user.UserId,
                            Username = user.Username,
                            Email = user.Email,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            RoleId = user.RoleId,
                            FullName = user.FullName
                        }
                    });
                }

                return Ok(new LoginResponse
                {
                    Success = false,
                    Message = "Грешен email или парола"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, new LoginResponse
                {
                    Success = false,
                    Message = "Системна грешка"
                });
            }
        }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] User user)
        {
            try
            {
                // ВАЖНО: Тук трябва да хешираш паролата!
                var userId = await _userRepository.CreateUserAsync(user);

                if (userId > 0)
                {
                    return Ok(new { success = true, message = "Успешна регистрация", userId });
                }

                return BadRequest(new { success = false, message = "Неуспешна регистрация" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user");
                return StatusCode(500, new { success = false, message = "Системна грешка" });
            }
        }
    }
}