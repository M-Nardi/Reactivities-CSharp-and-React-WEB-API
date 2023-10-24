using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true; // requere no registro email unico

            })
            .AddEntityFrameworkStores<DataContext>(); // Permite executar queries em nosso EF Store

            // mesma key do service
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            // configuração de autenticação
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        // validação da key assinada que o servidor emitiu e a chave do issuer
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            // TokenService adicionado no escopo de HTTP
            // quando realizarmos um request, o controlador utilizará este serviço
            // uma nova instância de token será criada no serviço
            // quando o http request terminar, será descartada a instancia
            services.AddScoped<TokenService>();

            return services;
        }
    }
}