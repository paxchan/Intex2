export default function fetchPoster(title: string): string {
  return `/posters/${title}.jpg`;
}