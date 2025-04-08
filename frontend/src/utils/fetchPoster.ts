export default function fetchPoster(title: string): string {
  const encodedTitle = encodeURIComponent(title.trim());
  return `https://moviesforintex.blob.core.windows.net/movies/${encodedTitle}.jpg`;
}
