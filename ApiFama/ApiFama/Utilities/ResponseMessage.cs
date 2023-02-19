using System.Net;

namespace ApiFama.Utilities
{
    public class ResponseMessage
    {
        public static object Error(HttpStatusCode statusCode, string error)
        {
            return new { statusCode = statusCode, message = error };
        }

        public static object Ok(HttpStatusCode statusCode, string message)
        {
            return new { statusCode = statusCode, message = message };
        }
    }
}
