using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Senha muito fraca")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}

// Utilizado no identity
// Conterá propriedades que retornaremos quando o o cliente for se registrar