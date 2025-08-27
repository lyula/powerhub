// Fetches placeholder video thumbnails from the Unsplash API
// Returns an array of Unsplash Source URLs for dummy video thumbnails (no API key needed)
export async function fetchThumbnails(count = 6) {
  // Each URL will be unique by adding a random query param
  return Array.from({ length: count }, (_, i) => `https://source.unsplash.com/400x225/?video&sig=${Math.random()*10000}_${i}`);
}
