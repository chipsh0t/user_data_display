using Microsoft.AspNetCore.Mvc;
using UsregAPI.DAL.Repositories.Contracts;
using UsregAPI.Shared.Models;
using UsregAPI.Shared.DTO;
using UsregAPI.Shared.Services;
using UsregAPI.Shared.Services.Contracts;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Cors;

namespace UsregAPI.Controllers
{
	[ApiController]
	[Route("api/v2/[controller]")]
	public class UserController : ControllerBase
	{
		//injecting services
		private IUserRolesService _userRolesService;
		private IUserRepository _userRepository;
		private IUserStatusesService _userStatusesService;

		public UserController(IUserRolesService userRolesService, IUserStatusesService userStatusesService, IUserRepository userRepository) 
		{ 
			_userRolesService = userRolesService;
			_userRepository = userRepository;	
			_userStatusesService = userStatusesService;
		}


		[HttpGet("find")]
		public async Task<IActionResult> FindAsync(string? search_q)
		{
			IEnumerable<User>? users = await _userRepository.FindUsersFilteredAsync(search_q ?? "");
			if (users is not null)
			{
				return Ok(users.Select(single => new UserDTO().ToUserDTO(single)));
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


		[HttpGet("reference-data/find/roles")]
		public async Task<IActionResult> LoadUserRolesAsync() 
		{
			return await Task.FromResult(Ok(_userRolesService.Roles));
		}


		[HttpGet("reference-data/find/statuses")]
		public async Task<IActionResult> LoadUserStatusesAsync()
		{
			return await Task.FromResult(Ok(_userStatusesService.Statuses));
		}


		//[HttpGet("generate-random-users")]
		//public async Task<IActionResult> GenerateRandomUsersAsync()
		//{
		//	//List<UserDTO> randUsers = new List<UserDTO>();	
		//	string[] firstnames = new [] { "John", "Jane", "Alice", "Bob", "Michael", "Laura", "Harry", "Kate"};
		//	string[] lastnames = new[] { "Smith", "Doe", "Johnson", "Williams", "Brown", "Miller", "Gates","Antler"};
		//	string[] roles = _userRolesService.Roles;
		//	string[] status = new string[] { "Active", "Inactive" };
		//	var rand = new Random();	
		//	//creating 50 users
		//	for (int i = 0; i < 50; ++i) 
		//	{
		//		string randFirstName = firstnames[rand.Next(firstnames.Length)];
		//		string randLastName = lastnames[rand.Next(lastnames.Length)];
		//		string randEmail = $"{randFirstName}.{randLastName}@example.com";
		//		string randStatus = status[rand.Next(status.Length)];
		//		int randrolescount = rand.Next(1,roles.Length + 1);
		//		List<string> randroles_list = new List<string>();
		//		for (int j = 0; j < randrolescount; ++j) 
		//		{
		//			string role = roles[rand.Next(roles.Length)];
		//			if (!randroles_list.Contains(role)) 
		//			{
		//				randroles_list.Add(role);
		//			}
		//		}
		//		string[] randroles_arr = randroles_list.ToArray();
		//		var rand_usr_dto = new UserDTO()
		//		{
		//			FirstName = randFirstName,
		//			LastName = randLastName,
		//			Email = randEmail,
		//			Status = randStatus,
		//			Roles = randroles_arr
		//		};
		//		await _userRepository.CreateNewUserAsync(rand_usr_dto.ToUser());
		//	}
		//	return await Task.FromResult(Ok());
		//}
	}
}
