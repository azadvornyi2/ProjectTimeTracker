using Microsoft.AspNetCore.Http;

namespace common.tracker
{
    public sealed class FileFormData
    {
        public IFormFile File { get; set; }
    }
}
