
/**
 * Checks if a URL is a Cloudinary URL.
 */
export function isCloudinaryUrl(src: string): boolean {
  return src.includes("res.cloudinary.com");
}

/**
 * Injects Cloudinary transformations into a URL.
 * 
 * Input:  https://res.cloudinary.com/xxx/image/upload/v123/folder/image.jpg
 * Output: https://res.cloudinary.com/xxx/image/upload/q_auto,f_auto,w_800/v123/folder/image.jpg
 */
function injectTransformations(src: string, transformations: string): string {
  // Find "/upload/" and inject transformations right after it
  const uploadSegment = "/upload/";
  const uploadIndex = src.indexOf(uploadSegment);

  if (uploadIndex === -1) return src;

  const before = src.slice(0, uploadIndex + uploadSegment.length);
  const after = src.slice(uploadIndex + uploadSegment.length);

  // If there are already transformations (not starting with "v" + digits), 
  // prepend our transformations with a comma chain
  return `${before}${transformations}/${after}`;
}

/**
 * Custom image loader for next/image.
 * Replaces Next.js built-in optimization with Cloudinary's CDN transformations.
 * 
 * Usage: <Image loader={cloudinaryLoader} src={url} ... />
 */
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!isCloudinaryUrl(src)) return src;

  const q = (quality && quality !== 75) ? `q_${quality}` : "q_auto:eco";
  const transformations = `${q},f_auto,w_${width}`;

  return injectTransformations(src, transformations);
}

/**
 * Generates a tiny, blurred Cloudinary URL for use as blurDataURL.
 * Returns a 10px wide, quality 1, blurred Cloudinary image URL.
 * 
 * For non-Cloudinary URLs, returns a generic transparent placeholder.
 */
export function getBlurDataURL(src: string): string {
  if (!isCloudinaryUrl(src)) {
    // 1x1 transparent pixel as fallback
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==";
  }

  return injectTransformations(src, "w_10,q_1,f_auto,e_blur:1000");
}
