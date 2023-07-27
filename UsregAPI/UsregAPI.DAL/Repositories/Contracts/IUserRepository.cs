using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsregAPI.Shared.Models;

namespace UsregAPI.DAL.Repositories.Contracts
{
	public interface IUserRepository
	{
		public Task<User?> GetSingleUserAsync(int id);
		public Task<User?> CreateNewUserAsync(User new_user);
		public Task<User?> UpdateUserAsync(User existing_user);
		public Task RemoveUserAsync(int id);
	}
}
