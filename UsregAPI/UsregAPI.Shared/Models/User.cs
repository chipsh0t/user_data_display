using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UsregAPI.Shared.Models
{
	public class User
	{
		public int Id { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		public string Email { get; set; }

		[Required]
		public string Status { get; set; }

		[Required]
		public string Roles { get; set; }
	}
}
