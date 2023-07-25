using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UsregAPI.Shared.Services.Contracts
{
	public interface IUserRolesService
	{
		public string[] Roles { get; }
	}
}
