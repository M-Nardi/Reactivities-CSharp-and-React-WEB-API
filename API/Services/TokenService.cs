using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{ // Utilizado no controlador do account para a tokenizaçao
    public class TokenService
    {
        private readonly IConfiguration _config;

        // INJEÇÃO DE DEPENDENCIA PARA OBTENÇÃO DE KEY NO appsettings.json
        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // chave de segurança 
            // quando a key é criptografada ou descriptografada, a mesma chave será utilizada para as 2 ações
            // a chave nunca deve ser exposta externamente
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));

            // token passado para credencial
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // variavel definição e armazenamento de token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims), // Tipos de claims
                Expires = DateTime.UtcNow.AddDays(7), // Expiração
                SigningCredentials = creds // credencial
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            // Criação do token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}