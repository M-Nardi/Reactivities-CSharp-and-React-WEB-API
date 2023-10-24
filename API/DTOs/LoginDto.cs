namespace API.DTOs
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
// Utilizado no identity
// Conterá propriedades que retornaremos quando o cliente realizar log-in