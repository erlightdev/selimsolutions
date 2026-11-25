const RESERVED_SLUGS = new Set([
	"/dashboard",
	"/login",
	"/api",
	"/rpc",
	"/api-reference",
	"/sitemap.xml",
	"/robots.txt",
]);

export function assertValidPageSlug(slug: string): string {
	const normalized = slug.startsWith("/") ? slug.trim() : `/${slug.trim()}`;
	if (RESERVED_SLUGS.has(normalized.toLowerCase())) {
		throw new Error(`Slug "${normalized}" is reserved by the application.`);
	}
	return normalized;
}

/**
 * Strips dangerous tags, event handlers, and javascript: URIs from TipTap HTML
 * before persisting to MySQL.
 */
export function sanitizeTipTapHtml(html: string): string {
	return html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
		.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
		.replace(/<(object|embed|style)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, "")
		.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
		.replace(/\s(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, ' $1="#"');
}
