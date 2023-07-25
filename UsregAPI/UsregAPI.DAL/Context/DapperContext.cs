using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;


namespace UsregAPI.DAL.Context
{
	public class DapperContext
	{
		private readonly  IConfiguration _configuration;
		private readonly string? _connectionString;

		public DapperContext(IConfiguration configuration)
		{
			_configuration = configuration;
			_connectionString = _configuration.GetConnectionString("UserDbConnection");
		}

		public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
	}
}
