export async function fetchPoster(title: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://localhost:5000/api/poster/${encodeURIComponent(title)}`
    );
    const data = await response.json();
    return data.url || null;
  } catch (err) {
    console.error(`Error fetching poster for ${title}:`, err);
    return null;
  }
}
