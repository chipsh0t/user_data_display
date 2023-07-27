using Microsoft.AspNetCore.Mvc;
using UsregAPI.DAL.Repositories.Contracts;
using UsregAPI.Shared.Models;
using UsregAPI.Shared.DTO;
using UsregAPI.Shared.Services;
using UsregAPI.Shared.Services.Contracts;
using System.Diagnostics.CodeAnalysis;

namespace UsregAPI.Controllers
{
	[ApiController]
	[Route("api/v2/[controller]")]
	public class UserController : ControllerBase
	{
		//injecting services
		private IUserRolesService _userRolesService;
		private IUserRepository _userRepository;


		public UserController(IUserRolesService userRolesService, IUserRepository userRepository) 
		{ 
			_userRolesService = userRolesService;
			_userRepository = userRepository;	
		}


		[HttpGet("find")]
		public async Task<IActionResult> FindAsync(string? search_q)
		{
			IEnumerable<User>? users = await _userRepository.FindUsersFilteredAsync(search_q ?? "");
			if (users is not null)
			{
				return Ok(users);
			}
			return NotFound();
		}


		[HttpPost("save")]
		public async Task<IActionResult> AddUserAsync(UserDTO user_dto)
		{
			User new_user = user_dto.ToUser();
			User? user_inserted = await _userRepository.CreateNewUserAsync(new_user);
			if (user_inserted is not null) 
			{
				return Ok(new UserDTO().ToUserDTO(user_inserted));
			} 
			//if insert was not completed
			return BadRequest();
		}

		
		[HttpGet("find-one")]
		public async Task<IActionResult> GetUserByIdAsync(int id) 
		{ 
			var res = await _userRepository.GetSingleUserAsync(id);
			if (res is not null) 
			{
				UserDTO user_dto = new UserDTO().ToUserDTO(res);
				return Ok(user_dto);
			}
			return NotFound();
		}


		[HttpPut("update")]
		public async Task<IActionResult> UpdateUserAsync(UserDTO user_to_edit_dto) 
		{
			User user_requested_to_update = user_to_edit_dto.ToUser();
			User? updated_user = await _userRepository.UpdateUserAsync(user_requested_to_update);
			if (updated_user is not null) { return Ok(new UserDTO().ToUserDTO(updated_user)); }
			return NotFound();
		}


		[HttpDelete("remove")]
		public async Task<IActionResult> RemoveUserAsync(int id)
		{
			User? user_to_delete = await _userRepository.GetSingleUserAsync(id);
			if (user_to_delete is not null) 
			{
				await _userRepository.RemoveUserAsync(id);
				return NoContent();
			}
			return NotFound();
		}


		[HttpGet("reference-data/find")]
		public async Task<IActionResult> LoadUserRolesAsync() 
		{
			return await Task.FromResult(Ok(_userRolesService.Roles));
		}
	}
}
