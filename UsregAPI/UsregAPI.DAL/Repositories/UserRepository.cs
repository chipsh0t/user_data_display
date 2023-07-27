﻿using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
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

		//save user
		//return new user id
		public async Task<User?> CreateNewUserAsync(User new_user)
		{
			//var stored_procedure_name = "EXEC saveNewUser @FirstName, @LastName, @Email, @Status, @Roles";
			var stored_procedure_name = "saveNewUser";
			using (var connection = _dapperContext.CreateConnection()) 
			{ 
				var res = await connection.QuerySingleOrDefaultAsync<User>(stored_procedure_name, new 
				{ 
					FirstName = new_user.FirstName,
					LastName = new_user.LastName,
					Email = new_user.Email,
					Status = new_user.Status,
					Roles = new_user.Roles,
				},commandType:CommandType.StoredProcedure);
				//return await Task.FromResult(res.First());
				//int inserted_user_id = res.First();
				//return inserted user
				return await Task.FromResult(res);
			}
		}

		//single user
		public async Task<User?> GetSingleUserAsync(int id)
		{
			var query = "SELECT ID, FirstName, LastName, Email, Status, Roles FROM Users WHERE ID = @id";
			using (var connection = _dapperContext.CreateConnection()) 
			{ 
				var user = await connection.QuerySingleOrDefaultAsync<User>(query, new {ID=id});
				return await Task.FromResult(user);
			}
		}

		public async Task<User?> UpdateUserAsync(User user_to_edit)
		{
			string stored_procedure_name = "updateUser";
			using (var connection = _dapperContext.CreateConnection())
			{
				//connection.ExecuteAsync !!!!!!
				var res = await connection.QueryFirstOrDefaultAsync<User>(stored_procedure_name, new { 
					ID = user_to_edit.Id,
					FirstName = user_to_edit.FirstName,
					LastName = user_to_edit.LastName,
					Email = user_to_edit.Email,
					Status = user_to_edit.Status,
					Roles = user_to_edit.Roles,
				}, commandType:CommandType.StoredProcedure);
				return await Task.FromResult(res);
			}
		}

		public async Task RemoveUserAsync(int id) 
		{
			string stored_procedure_name = "removeUser";
			using (var connection = _dapperContext.CreateConnection()) 
			{
				var res = await connection.ExecuteAsync(stored_procedure_name, new { ID = id }, commandType: CommandType.StoredProcedure);
			}
		}
	}
}