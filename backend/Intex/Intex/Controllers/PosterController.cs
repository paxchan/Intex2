using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class PosterController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public PosterController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    [HttpGet("{title}")]
    public async Task<IActionResult> GetPoster(string title)
    {
        var apiKey = _configuration["TMDB_API_KEY"];
        if (string.IsNullOrEmpty(apiKey))
            return BadRequest("TMDB API key is missing.");

        var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var response = await client.GetAsync(
            $"https://api.themoviedb.org/3/search/movie?api_key={apiKey}&query={Uri.EscapeDataString(title)}");

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "Error fetching poster.");

        using var stream = await response.Content.ReadAsStreamAsync();
        using var doc = await JsonDocument.ParseAsync(stream);

        var results = doc.RootElement.GetProperty("results");
        if (results.GetArrayLength() == 0 || !results[0].TryGetProperty("poster_path", out var posterPath))
            return NotFound("Poster not found.");

        var posterUrl = $"https://image.tmdb.org/t/p/w500{posterPath.GetString()}";
        return Ok(new { url = posterUrl });
    }
}