using Microsoft.AspNetCore.Mvc;
using UsregAPI.DAL.Repositories.Contracts;
using UsregAPI.Shared.Models;
using UsregAPI.Shared.DTO;
using UsregAPI.Shared.Services;
using UsregAPI.Shared.Services.Contracts;

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
		public IActionResult Find(string search_q)
		{
			
			return Ok(new { search_q });
		}

		[HttpPost("save")]
		public IActionResult BadFind(UserDTO user) 
		{ 
			return Ok(user.ToUser());
		}

		[HttpGet("test")]
		public async Task<IActionResult> Test() 
		{ 
			var res = await _userRepository.GetSingleUserAsync();
			UserDTO user_dto = new UserDTO().ToDTO(res);
			return await Task.FromResult(Ok(user_dto));
		}
	}
}
