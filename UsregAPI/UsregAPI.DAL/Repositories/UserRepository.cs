using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsregAPI.DAL.Context;
using UsregAPI.DAL.Repositories.Contracts;
using UsregAPI.Shared.Models;

namespace UsregAPI.DAL.Repositories
{
	public class UserRepository:IUserRepository
	{
		private DapperContext _dapperContext;

		public UserRepository(DapperContext dapperContext)
		{
			_dapperContext = dapperContext;
		}

		//just testing DB connection !!!!!!!
		public async Task<User> GetSingleUserAsync()
		{
			var query = "SELECT * FROM Users WHERE ID = 1";
			using (var connection = _dapperContext.CreateConnection()) 
			{ 
				var test_con_user = await connection.QuerySingleAsync<User>(query);
				return await Task.FromResult(test_con_user);
			}
		}
	}
}
