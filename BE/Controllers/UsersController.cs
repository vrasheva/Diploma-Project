using BE.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly SchoolDbContext _db;
    public UsersController(SchoolDbContext db) => _db = db;

    // GET /api/users/exists?username=ani
    // GET /api/users/exists?email=a@b.com
    [HttpGet("exists")]
    public async Task<IActionResult> Exists([FromQuery] string? username, [FromQuery] string? email)
    {
        if (string.IsNullOrWhiteSpace(username) && string.IsNullOrWhiteSpace(email))
            return BadRequest("Provide username or email.");

        bool exists =
            (!string.IsNullOrWhiteSpace(username) && await _db.Users.AnyAsync(u => u.Username == username))
            || (!string.IsNullOrWhiteSpace(email) && await _db.Users.AnyAsync(u => u.Email == email));

        return Ok(new { exists });
    }
}
