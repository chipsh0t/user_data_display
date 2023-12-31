﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsregAPI.Shared.Models;

namespace UsregAPI.Shared.DTO
{
	public class UserDTO
	{
		public int? Id { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName{ get; set; }

		[Required]
		public string Email{ get; set; }
		
		[Required]
		public string Status{ get; set; }
		
		[Required]
		public string[] Roles{ get; set; }

		
		public UserDTO ToUserDTO(User user) 
		{
			return new UserDTO
			{
				Id = user.Id,
				FirstName = user.FirstName,
				LastName = user.LastName,
				Email = user.Email,
				Status = user.Status,
				Roles = user.Roles.Split(','),
			};
		}

		public  User ToUser() 
		{
			return new User
			{
				Id = this.Id,
				FirstName = this.FirstName,
				LastName = this.LastName,
				Email = this.Email,
				Status = this.Status,
				Roles = string.Join(',',this.Roles),
			};
		}
	}
}
