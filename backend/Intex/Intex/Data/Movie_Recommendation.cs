namespace Intex.Data;

public class Recommendation
{
    public string? original_title { get; set; }
    public string? recommended_title { get; set; }
    public double? similarity_score { get; set; }
}