import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { orpc } from "@/utils/orpc";

export function useCmsPage(slug: string) {
	const query = useQuery({
		...orpc.cms.public.getPageBySlug.queryOptions({ input: { slug } }),
		staleTime: 60_000,
	});

	const page = query.data;

	useEffect(() => {
		if (!page) return;
		if (page.seoTitle) {
			document.title = page.seoTitle;
		}
		if (page.seoDesc) {
			let meta = document.querySelector('meta[name="description"]');
			if (!meta) {
				meta = document.createElement("meta");
				meta.setAttribute("name", "description");
				document.head.appendChild(meta);
			}
			meta.setAttribute("content", page.seoDesc);
		}
		if (page.canonicalUrl) {
			let link = document.querySelector('link[rel="canonical"]');
			if (!link) {
				link = document.createElement("link");
				link.setAttribute("rel", "canonical");
				document.head.appendChild(link);
			}
			link.setAttribute("href", page.canonicalUrl);
		}
		if (page.noIndex) {
			let robots = document.querySelector('meta[name="robots"]');
			if (!robots) {
				robots = document.createElement("meta");
				robots.setAttribute("name", "robots");
				document.head.appendChild(robots);
			}
			robots.setAttribute("content", "noindex, nofollow");
		}
	}, [page]);

	return query;
}
