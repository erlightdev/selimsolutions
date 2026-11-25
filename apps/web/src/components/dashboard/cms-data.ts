export type CmsView =
	| "overview"
	| "pages"
	| "posts"
	| "media"
	| "appearance"
	| "menus"
	| "settings";

export type ContentStatus = "published" | "draft";

export interface SeoMeta {
	metaTitle: string;
	metaDescription: string;
	noIndex?: boolean;
}

export interface CmsPage {
	id: string;
	title: string;
	slug: string;
	template: "Landing" | "Standard" | "Legal";
	status: ContentStatus;
	content: string;
	updatedAt: string;
	seo: SeoMeta;
}

export interface CmsPost {
	id: string;
	title: string;
	slug: string;
	category: "Security" | "Cloud" | "Compliance" | "Engineering";
	excerpt: string;
	content: string;
	status: ContentStatus;
	author: string;
	updatedAt: string;
	seo: SeoMeta;
}

export interface CmsMediaItem {
	id: string;
	name: string;
	url: string;
	type: "image" | "document" | "video";
	size: string;
	uploadedAt: string;
}

export type MenuLocation = "header" | "footer";

export interface CmsMenuItem {
	id: string;
	label: string;
	href: string;
	target: "_self" | "_blank";
}

export interface CmsAppearance {
	accentColor: string;
	defaultTheme: "dark" | "light" | "system";
	containerWidth: "standard" | "wide";
	showAnnouncementBar: boolean;
	stickyHeader: boolean;
}

export interface CmsSeoConfig {
	titleSeparator: string;
	siteTitle: string;
	defaultDescription: string;
	canonicalBase: string;
	robotsIndex: boolean;
	sitemapEnabled: boolean;
	structuredData: boolean;
	ogTitle: string;
	ogDescription: string;
}

export interface CmsGeneralSettings {
	siteName: string;
	tagline: string;
	siteUrl: string;
	adminEmail: string;
	permalinkStyle: "/blog/:slug" | "/:year/:slug" | "/:slug";
}

export const INITIAL_PAGES: CmsPage[] = [
	{
		id: "pg-1",
		title: "Home",
		slug: "/",
		template: "Landing",
		status: "published",
		content:
			"Enterprise cybersecurity, managed SOC, and cloud posture engineering for regulated teams.",
		updatedAt: "Today, 14:20",
		seo: {
			metaTitle: "Selim Solutions — Managed SOC & Cloud Security",
			metaDescription:
				"24/7 threat detection, cloud posture management, and ISO 27001 compliance for modern enterprises.",
		},
	},
	{
		id: "pg-2",
		title: "About Us",
		slug: "/about",
		template: "Standard",
		status: "published",
		content:
			"Founded by security engineers to bring clarity, speed, and measurable resilience to enterprise defense.",
		updatedAt: "Yesterday",
		seo: {
			metaTitle: "About Selim Solutions",
			metaDescription:
				"Meet the security architects and SOC analysts behind Selim Solutions.",
		},
	},
	{
		id: "pg-3",
		title: "Services",
		slug: "/services",
		template: "Landing",
		status: "published",
		content:
			"SOC as a Service, EDR, VAPT, Cloud Security, DFIR, and GRC Compliance.",
		updatedAt: "Nov 22",
		seo: {
			metaTitle: "Security Services — Selim Solutions",
			metaDescription:
				"Explore managed SOC, penetration testing, incident response, and compliance advisory.",
		},
	},
	{
		id: "pg-4",
		title: "Privacy Policy",
		slug: "/privacy",
		template: "Legal",
		status: "published",
		content:
			"Transparent data handling, retention schedules, and GDPR/ISO 27001 privacy commitments.",
		updatedAt: "Nov 18",
		seo: {
			metaTitle: "Privacy Policy — Selim Solutions",
			metaDescription:
				"How Selim Solutions collects, processes, and safeguards customer and visitor data.",
		},
	},
	{
		id: "pg-5",
		title: "Q1 Security Benchmark",
		slug: "/benchmark-2027",
		template: "Landing",
		status: "draft",
		content: "Draft landing page for upcoming annual cloud threat report.",
		updatedAt: "Nov 15",
		seo: {
			metaTitle: "2027 Cloud Security Benchmark",
			metaDescription: "",
		},
	},
];

export const INITIAL_POSTS: CmsPost[] = [
	{
		id: "pst-1",
		title: "Zero-Trust IAM Patterns for Multi-Cloud Teams",
		slug: "zero-trust-iam-multi-cloud",
		category: "Cloud",
		excerpt:
			"Practical short-lived credential workflows that eliminate standing admin privileges.",
		content:
			"Standing cloud credentials remain one of the fastest paths to lateral movement. By adopting OIDC federation and just-in-time role assumption, teams cut blast radius without slowing deployments.",
		status: "published",
		author: "Selim Admin",
		updatedAt: "Today, 11:05",
		seo: {
			metaTitle: "Zero-Trust IAM Patterns for Multi-Cloud Teams",
			metaDescription:
				"Eliminate standing admin privileges with short-lived OIDC credentials and just-in-time IAM access.",
		},
	},
	{
		id: "pst-2",
		title: "Preparing for ISO 27001:2022 Annex A Audits",
		slug: "iso-27001-annex-a-readiness",
		category: "Compliance",
		excerpt:
			"A structured checklist for automating evidence collection and control mapping.",
		content:
			"Continuous control monitoring turns annual audit fire drills into a predictable weekly review.",
		status: "published",
		author: "Selim Admin",
		updatedAt: "Nov 23",
		seo: {
			metaTitle: "ISO 27001:2022 Annex A Audit Readiness Guide",
			metaDescription:
				"Streamline ISO 27001:2022 evidence collection with automated control mapping.",
		},
	},
	{
		id: "pst-3",
		title: "Reducing SOC Alert Fatigue with Behavioral Correlation",
		slug: "reducing-soc-alert-fatigue",
		category: "Security",
		excerpt:
			"How grouping identity, endpoint, and ingress signals cuts triage time by 60%.",
		content:
			"Raw alerts overwhelm analysts. Correlating identity anomalies with endpoint process trees surfaces real incidents in seconds.",
		status: "draft",
		author: "Selim Admin",
		updatedAt: "Nov 20",
		seo: {
			metaTitle: "Reducing SOC Alert Fatigue",
			metaDescription:
				"Group identity and endpoint telemetry to cut SOC triage time.",
		},
	},
];

export const INITIAL_MEDIA: CmsMediaItem[] = [
	{
		id: "med-1",
		name: "selim-logo-white.svg",
		url: "/selim-logo-white.svg",
		type: "image",
		size: "1 KB",
		uploadedAt: "Nov 10",
	},
	{
		id: "med-2",
		name: "selim-logo-light.svg",
		url: "/selim-logo-light.svg",
		type: "image",
		size: "1 KB",
		uploadedAt: "Nov 10",
	},
	{
		id: "med-3",
		name: "globe-dots.svg",
		url: "/globe-dots.svg",
		type: "image",
		size: "54 KB",
		uploadedAt: "Nov 12",
	},
	{
		id: "med-4",
		name: "hero-video.mp4",
		url: "/hero-video.mp4",
		type: "video",
		size: "14.5 MB",
		uploadedAt: "Nov 14",
	},
];

export const INITIAL_MENUS: Record<MenuLocation, CmsMenuItem[]> = {
	header: [
		{ id: "m-1", label: "Services", href: "/services", target: "_self" },
		{ id: "m-2", label: "Solutions", href: "/solutions", target: "_self" },
		{ id: "m-3", label: "Blog", href: "/blog", target: "_self" },
		{ id: "m-4", label: "About", href: "/about", target: "_self" },
		{ id: "m-5", label: "Contact", href: "/contact", target: "_self" },
	],
	footer: [
		{ id: "f-1", label: "Privacy Policy", href: "/privacy", target: "_self" },
		{ id: "f-2", label: "Terms of Service", href: "/terms", target: "_self" },
		{
			id: "f-3",
			label: "Certifications",
			href: "/certifications",
			target: "_self",
		},
	],
};

export const INITIAL_APPEARANCE: CmsAppearance = {
	accentColor: "#0069eb",
	defaultTheme: "dark",
	containerWidth: "standard",
	showAnnouncementBar: true,
	stickyHeader: true,
};

export const INITIAL_SEO: CmsSeoConfig = {
	titleSeparator: "—",
	siteTitle: "Selim Solutions",
	defaultDescription:
		"Managed SOC, Cloud Security, VAPT, and GRC Compliance for modern enterprises.",
	canonicalBase: "https://selimsolutions.com",
	robotsIndex: true,
	sitemapEnabled: true,
	structuredData: true,
	ogTitle: "Selim Solutions | Enterprise Cybersecurity",
	ogDescription:
		"24/7 threat detection, cloud posture, and compliance readiness.",
};

export const INITIAL_SETTINGS: CmsGeneralSettings = {
	siteName: "Selim Solutions",
	tagline: "Secure, confident, enterprise defense.",
	siteUrl: "https://selimsolutions.com",
	adminEmail: "admin@selimsolutions.com",
	permalinkStyle: "/blog/:slug",
};
