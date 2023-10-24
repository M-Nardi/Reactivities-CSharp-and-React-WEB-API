namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
    }
}

// Utilizado no identity
// Conterá propriedades que retornaremos quando o cliente logar ou se registrar com sucesso