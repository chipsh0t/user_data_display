using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsregAPI.Shared.Services.Contracts;

namespace UsregAPI.Shared.Services
{
	public class UserStatusesService:IUserStatusesService
	{
		public string[] Statuses => new string[] { "Active", "Inactive" };
	}
}
