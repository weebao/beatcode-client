export async function GET() {
    return new Response(
        `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			<url>
				<loc>https://beatcode.dev/</loc>
				<priority>1.0</priority>
			</url>
			<url>
				<loc>https://beatcode.dev/home</loc>
			</url>
			<url>
				<loc>https://beatcode.dev/login</loc>
			</url>
			<url>
				<loc>https://beatcode.dev/register</loc>
			</url>
			<url>
				<loc>https://beatcode.dev/register/success</loc>
			</url>
			<url>
				<loc>https://beatcode.dev/sign-out</loc>
			</url>
			<url>
				<loc>https://beatcode.dev/settings</loc>
			</url>
			<url>
				<loc>https://beatcode.dev/custom</loc>
			</url>
			<url>
				<loc>https://beatcode.dev/solo/ranked</loc>
			</url>
			<url>
				<loc>https://beatcode.dev/solo/unranked</loc>
			</url>
		</urlset>`.trim(),
        {
            headers: {
                "Content-Type": "application/xml"
            }
        }
    );
}
