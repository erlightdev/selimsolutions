import path from "node:path";
import dotenv from "dotenv";

dotenv.config({
	path: path.resolve(import.meta.dirname, "../../../apps/server/.env"),
});

import prisma from "../src/index";
import { PAGE_CONTENT_BY_SLUG } from "./seed-pages-data";

async function main() {
	// 1. Site Config (General, Appearance, Header Announcement, Footer, Global SEO)
	await prisma.cmsSiteConfig.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			siteName: "Selim Solutions",
			tagline: "Secure, confident, enterprise defense.",
			siteUrl: "https://selim.solutions",
			adminEmail: "admin@selim.solutions",
			permalinkStyle: "/blog/:slug",
			accentColor: "#0069eb",
			defaultTheme: "dark",
			containerWidth: "standard",
			showAnnouncementBar: true,
			stickyHeader: true,
			logoLightUrl: "/selim-logo-light.svg",
			logoDarkUrl: "/selim-logo-white.svg",
			announcementText:
				"ISO/IEC 27001:2022 Certified Managed SOC — Request your free posture assessment",
			announcementHref: "/free-assessment",
			footerCtaTitle: "Ready to strengthen your security posture?",
			footerCtaSubtitle:
				"Partner with Kathmandu's 24/7 SOC and security engineering team for measurable resilience.",
			footerCtaLabel: "Get Free Assessment",
			footerCtaHref: "/free-assessment",
			contactEmail: "contact@selim.solutions",
			contactPhone: "+977-1-4000000",
			contactAddress: "Kathmandu, Nepal",
			isoBadgeText: "ISO/IEC 27001:2022 Certified",
			copyrightText: "Selim Solutions. All rights reserved.",
			titleSeparator: "—",
			siteTitle: "Selim Solutions",
			defaultDescription:
				"Managed SOC, VAPT, Cloud Security, EDR, DFIR, and GRC Compliance for modern enterprises.",
			canonicalBase: "https://selim.solutions",
			robotsIndex: true,
			sitemapEnabled: true,
			structuredData: true,
			ogTitle: "Selim Solutions — Managed SOC & Enterprise Cybersecurity",
			ogDescription:
				"24/7 threat detection, offensive validation, and continuous compliance readiness.",
			ogImageUrl: "/selim-logo-white.svg",
		},
	});

	// 2. Navigation & Megamenus
	const navItems = [
		// Header primary
		{
			id: "nav-hdr-about",
			location: "HEADER_PRIMARY" as const,
			label: "About",
			href: "/about",
			description: "Our story from Seim Lake",
			sortOrder: 0,
		},
		{
			id: "nav-hdr-insights",
			location: "HEADER_PRIMARY" as const,
			label: "Insights",
			href: "/blog",
			description: "Read our security blog",
			sortOrder: 1,
		},
		{
			id: "nav-hdr-contact",
			location: "HEADER_PRIMARY" as const,
			label: "Contact",
			href: "/contact",
			description: "Talk to our SOC team",
			sortOrder: 2,
		},
		// Megamenu Services
		{
			id: "nav-mega-soc",
			location: "MEGA_SERVICES" as const,
			label: "SOC as a Service",
			href: "/services/soc-as-a-service",
			description:
				"24/7 monitoring, triage, detection engineering, and analyst-led response.",
			iconName: "TowerControl",
			sortOrder: 0,
		},
		{
			id: "nav-mega-vapt",
			location: "MEGA_SERVICES" as const,
			label: "VAPT",
			href: "/services/vapt",
			description:
				"Manual vulnerability assessment and penetration testing across apps and infrastructure.",
			iconName: "ScanSearch",
			sortOrder: 1,
		},
		{
			id: "nav-mega-cloud",
			location: "MEGA_SERVICES" as const,
			label: "Cloud Security",
			href: "/services/cloud-security",
			description:
				"Posture hardening, identity review, and continuous cloud risk reduction.",
			iconName: "Cloud",
			sortOrder: 2,
		},
		{
			id: "nav-mega-edr",
			location: "MEGA_SERVICES" as const,
			label: "EDR",
			href: "/services/edr",
			description:
				"Endpoint visibility, behavioral detections, isolation, and rollback guidance.",
			iconName: "Shield",
			sortOrder: 3,
		},
		{
			id: "nav-mega-grc",
			location: "MEGA_SERVICES" as const,
			label: "GRC & Compliance",
			href: "/services/grc-compliance",
			description:
				"Control mapping and compliance preparation for real operational environments.",
			iconName: "BadgeCheck",
			sortOrder: 4,
		},
		{
			id: "nav-mega-dfir",
			location: "MEGA_SERVICES" as const,
			label: "DFIR",
			href: "/services/dfir",
			description:
				"Containment, forensics, root-cause analysis, and recovery coordination.",
			iconName: "Siren",
			sortOrder: 5,
		},
		// Megamenu Solutions
		{
			id: "nav-sol-bank",
			location: "MEGA_SOLUTIONS" as const,
			label: "Banking & Finance",
			href: "/solutions/banking-finance",
			description: "Core banking, payments, and NRB-aligned cyber resilience.",
			iconName: "Banknote",
			sortOrder: 0,
		},
		{
			id: "nav-sol-ins",
			location: "MEGA_SOLUTIONS" as const,
			label: "Insurance",
			href: "/solutions/insurance",
			description: "Policyholder data protection and claims workflow security.",
			iconName: "ShieldAlert",
			sortOrder: 1,
		},
		{
			id: "nav-sol-gov",
			location: "MEGA_SOLUTIONS" as const,
			label: "Government",
			href: "/solutions/government",
			description:
				"Sovereign citizen infrastructure and public-sector defense.",
			iconName: "Landmark",
			sortOrder: 2,
		},
		{
			id: "nav-sol-telco",
			location: "MEGA_SOLUTIONS" as const,
			label: "Telecom & ISPs",
			href: "/solutions/telecom-isps",
			description: "Carrier backbone protection and subscriber telemetry.",
			iconName: "Building2",
			sortOrder: 3,
		},
		{
			id: "nav-sol-health",
			location: "MEGA_SOLUTIONS" as const,
			label: "Healthcare",
			href: "/solutions/healthcare",
			description: "Clinical systems, EHR privacy, and medical device safety.",
			iconName: "Cross",
			sortOrder: 4,
		},
		{
			id: "nav-sol-edu",
			location: "MEGA_SOLUTIONS" as const,
			label: "Education & NGOs",
			href: "/solutions/education-ngos",
			description: "Research networks, donor trust, and campus identity.",
			iconName: "GraduationCap",
			sortOrder: 5,
		},
		// Footer columns
		{
			id: "nav-ft-srv-1",
			location: "FOOTER_SERVICES" as const,
			label: "SOC as a Service",
			href: "/services/soc-as-a-service",
			sortOrder: 0,
		},
		{
			id: "nav-ft-srv-2",
			location: "FOOTER_SERVICES" as const,
			label: "VAPT",
			href: "/services/vapt",
			sortOrder: 1,
		},
		{
			id: "nav-ft-srv-3",
			location: "FOOTER_SERVICES" as const,
			label: "Cloud Security",
			href: "/services/cloud-security",
			sortOrder: 2,
		},
		{
			id: "nav-ft-srv-4",
			location: "FOOTER_SERVICES" as const,
			label: "EDR",
			href: "/services/edr",
			sortOrder: 3,
		},
		{
			id: "nav-ft-srv-5",
			location: "FOOTER_SERVICES" as const,
			label: "GRC & Compliance",
			href: "/services/grc-compliance",
			sortOrder: 4,
		},
		{
			id: "nav-ft-srv-6",
			location: "FOOTER_SERVICES" as const,
			label: "DFIR",
			href: "/services/dfir",
			sortOrder: 5,
		},
		{
			id: "nav-ft-co-1",
			location: "FOOTER_COMPANY" as const,
			label: "About Us",
			href: "/about",
			sortOrder: 0,
		},
		{
			id: "nav-ft-co-2",
			location: "FOOTER_COMPANY" as const,
			label: "Blog & Insights",
			href: "/blog",
			sortOrder: 1,
		},
		{
			id: "nav-ft-co-3",
			location: "FOOTER_COMPANY" as const,
			label: "Contact Team",
			href: "/contact",
			sortOrder: 2,
		},
		{
			id: "nav-ft-leg-1",
			location: "FOOTER_LEGAL" as const,
			label: "Privacy",
			href: "/privacy",
			sortOrder: 0,
		},
		{
			id: "nav-ft-leg-2",
			location: "FOOTER_LEGAL" as const,
			label: "Terms",
			href: "/terms",
			sortOrder: 1,
		},
		{
			id: "nav-ft-leg-3",
			location: "FOOTER_LEGAL" as const,
			label: "Certifications",
			href: "/certifications",
			sortOrder: 2,
		},
		{
			id: "nav-ft-soc-1",
			location: "FOOTER_SOCIALS" as const,
			label: "LinkedIn",
			href: "https://linkedin.com",
			iconName: "Globe",
			target: "_blank",
			sortOrder: 0,
		},
		{
			id: "nav-ft-soc-2",
			location: "FOOTER_SOCIALS" as const,
			label: "Email",
			href: "mailto:contact@selim.solutions",
			iconName: "Mail",
			target: "_blank",
			sortOrder: 1,
		},
	];

	for (const item of navItems) {
		await prisma.cmsNavItem.upsert({
			where: { id: item.id },
			update: {},
			create: item,
		});
	}

	// 3. Categories & Blog Posts
	const catThreat = await prisma.cmsCategory.upsert({
		where: { slug: "threat-intel" },
		update: {},
		create: { name: "Threat Intel", slug: "threat-intel" },
	});
	const catCloud = await prisma.cmsCategory.upsert({
		where: { slug: "cloud-security" },
		update: {},
		create: { name: "Cloud Security", slug: "cloud-security" },
	});
	const catCompliance = await prisma.cmsCategory.upsert({
		where: { slug: "compliance" },
		update: {},
		create: { name: "Compliance", slug: "compliance" },
	});

	const posts = [
		{
			slug: "cyber-security-soc-threat-detection-stops-credential-stuffing",
			title:
				"Inside a 3 AM Credential Stuffing Cyber Attack — And How Our SOC Stopped It",
			excerpt:
				"A real timeline of detection, triage, and rapid containment. Learn how Kathmandu's security analysts block high-velocity cyber attacks at machine speed.",
			contentHtml:
				"<h2>The Attack Timeline</h2><p>Our automated log ingestion monitors recorded a sudden, sharp spike in authentication failures on a core enterprise application gateway, rising from 400 EPS to <strong>94.3K EPS</strong>.</p><h2>How the SOC Analyst Responded</h2><ol><li><strong>Behavioral Fingerprinting:</strong> Grouped bot requests by headers and cryptographic signatures.</li><li><strong>Adaptive Challenge Enforcement:</strong> Served dynamic WAF security challenges.</li><li><strong>Active Host Isolation:</strong> Blocked confirmed botnet gateway nodes at the edge router level within five minutes.</li></ol>",
			coverImage:
				"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80&auto=format&fit=crop",
			readTime: "8 min read",
			featured: true,
			status: "PUBLISHED" as const,
			categoryId: catThreat.id,
			seoTitle: "SOC Threat Detection: Blocking Credential Stuffing Attacks",
			seoDesc:
				"Read a real-world case study of how a 24/7 Security Operations Center (SOC) triages, investigates, and isolates credential stuffing cyber attacks.",
			publishedAt: new Date("2026-06-12T03:15:00Z"),
		},
		{
			slug: "zero-trust-iam-multi-cloud",
			title: "Zero-Trust IAM Patterns for Multi-Cloud Teams",
			excerpt:
				"Practical short-lived credential workflows that eliminate standing admin privileges.",
			contentHtml:
				"<p>Standing cloud credentials remain one of the fastest paths to lateral movement. By adopting OIDC federation and just-in-time role assumption, teams cut blast radius without slowing deployments.</p>",
			coverImage:
				"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop",
			readTime: "6 min read",
			featured: false,
			status: "PUBLISHED" as const,
			categoryId: catCloud.id,
			seoTitle: "Zero-Trust IAM Patterns for Multi-Cloud Teams",
			seoDesc:
				"Eliminate standing admin privileges with short-lived OIDC credentials and just-in-time IAM access.",
			publishedAt: new Date("2026-11-20T09:00:00Z"),
		},
		{
			slug: "iso-27001-annex-a-readiness",
			title: "Preparing for ISO 27001:2022 Annex A Audits",
			excerpt:
				"A structured checklist for automating evidence collection and control mapping.",
			contentHtml:
				"<p>Continuous control monitoring turns annual audit fire drills into a predictable weekly review.</p>",
			coverImage:
				"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80&auto=format&fit=crop",
			readTime: "5 min read",
			featured: false,
			status: "PUBLISHED" as const,
			categoryId: catCompliance.id,
			seoTitle: "ISO 27001:2022 Annex A Audit Readiness Guide",
			seoDesc:
				"Streamline ISO 27001:2022 evidence collection with automated control mapping.",
			publishedAt: new Date("2026-11-23T10:00:00Z"),
		},
	];

	for (const post of posts) {
		await prisma.cmsPost.upsert({
			where: { slug: post.slug },
			update: {},
			create: post,
		});
	}

	// 4. Pages + Page Sections
	const pages = [
		{
			slug: "/",
			title: "Home",
			template: "LANDING" as const,
			status: "PUBLISHED" as const,
			isSystem: true,
			contentHtml:
				"<p>Enterprise cybersecurity, managed SOC, and cloud posture engineering for regulated teams.</p>",
			seoTitle: "Selim Solutions — Managed SOC & Cloud Security",
			seoDesc:
				"24/7 threat detection, cloud posture management, and ISO 27001 compliance for modern enterprises.",
			publishedAt: new Date(),
			sections: [
				{
					type: "HERO",
					title: "Security that moves at machine speed",
					subtitle:
						"24/7 Managed SOC, offensive VAPT, and continuous cloud posture engineering built for regulated enterprises.",
					sortOrder: 0,
				},
				{
					type: "FEATURE_SHOWCASE",
					title: "Unified Detection & Response",
					subtitle:
						"Correlate identity, endpoint, and cloud telemetry in one operating layer.",
					sortOrder: 1,
				},
				{
					type: "SERVICES_TABS",
					title: "Core Security Services",
					subtitle: "End-to-end defensive and offensive capabilities.",
					sortOrder: 2,
				},
				{
					type: "TESTIMONIALS",
					title: "Trusted by Security Leaders",
					subtitle:
						"Measured outcomes across banking, telecom, and healthcare.",
					sortOrder: 3,
				},
				{
					type: "FAQ",
					title: "Frequently Asked Questions",
					subtitle: "Clear answers on onboarding, SLAs, and compliance.",
					sortOrder: 4,
				},
			],
		},
		{
			slug: "/about",
			title: "About Us",
			template: "STANDARD" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml:
				"<h2>Our Story</h2><p>Founded by security engineers to bring clarity, speed, and measurable resilience to enterprise defense.</p>",
			seoTitle: "About Selim Solutions",
			seoDesc:
				"Meet the security architects and SOC analysts behind Selim Solutions.",
			publishedAt: new Date(),
			sections: [
				{
					type: "RICH_TEXT",
					title: "Engineering-First Security",
					subtitle: "Built in Kathmandu, protecting global workloads.",
					sortOrder: 0,
				},
			],
		},
		{
			slug: "/services",
			title: "Services",
			template: "SERVICE" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml:
				"<p>SOC as a Service, VAPT, Cloud Security, EDR, GRC Compliance, and DFIR.</p>",
			seoTitle: "Security Services — Selim Solutions",
			seoDesc:
				"Explore managed SOC, penetration testing, incident response, and compliance advisory.",
			publishedAt: new Date(),
			sections: [],
		},
		{
			slug: "/solutions",
			title: "Solutions",
			template: "SOLUTION" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml:
				"<p>Industry-tailored cyber resilience for Banking, Insurance, Government, Telecom, Healthcare, and Education.</p>",
			seoTitle: "Industry Solutions — Selim Solutions",
			seoDesc:
				"Sector-specific cybersecurity architectures for regulated industries.",
			publishedAt: new Date(),
			sections: [],
		},
		{
			slug: "/certifications",
			title: "Certifications",
			template: "STANDARD" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml:
				"<p>ISO/IEC 27001:2022 certified operations with continuous control verification.</p>",
			seoTitle: "Certifications & Trust — Selim Solutions",
			seoDesc:
				"Verify Selim Solutions security certifications and attestations.",
			publishedAt: new Date(),
			sections: [],
		},
		{
			slug: "/privacy",
			title: "Privacy Policy",
			template: "LEGAL" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml:
				"<h2>Data Handling</h2><p>Transparent data handling, retention schedules, and GDPR/ISO 27001 privacy commitments.</p>",
			seoTitle: "Privacy Policy — Selim Solutions",
			seoDesc:
				"How Selim Solutions collects, processes, and safeguards customer and visitor data.",
			publishedAt: new Date(),
			sections: [],
		},
		{
			slug: "/terms",
			title: "Terms of Service",
			template: "LEGAL" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml:
				"<h2>Terms</h2><p>Standard service terms governing engagement with Selim Solutions.</p>",
			seoTitle: "Terms of Service — Selim Solutions",
			seoDesc: "Terms and conditions for Selim Solutions services and website.",
			publishedAt: new Date(),
			sections: [],
		},
		{
			slug: "/contact",
			title: "Contact",
			template: "STANDARD" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml:
				"<p>Reach our Kathmandu SOC and security engineering team 24/7.</p>",
			seoTitle: "Contact Us — Selim Solutions",
			seoDesc:
				"Talk to Selim Solutions for managed SOC, VAPT, or incident response.",
			publishedAt: new Date(),
			sections: [],
		},
		{
			slug: "/free-assessment",
			title: "Free Security Assessment",
			template: "LANDING" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml:
				"<p>Request a complimentary external attack surface & posture review.</p>",
			seoTitle: "Free Security Assessment — Selim Solutions",
			seoDesc:
				"Book a complimentary cybersecurity posture assessment with Selim Solutions.",
			publishedAt: new Date(),
			sections: [],
		},
		// Sub-pages: Services
		...[
			{
				slug: "/services/soc-as-a-service",
				title: "SOC as a Service",
				seoDesc:
					"24/7 monitoring, triage, detection engineering, and response.",
			},
			{
				slug: "/services/vapt",
				title: "VAPT Penetration Testing",
				seoDesc:
					"Manual vulnerability assessment and penetration testing across apps and infrastructure.",
			},
			{
				slug: "/services/cloud-security",
				title: "Cloud Security",
				seoDesc:
					"Posture hardening, identity review, and continuous cloud risk reduction.",
			},
			{
				slug: "/services/edr",
				title: "Endpoint Detection & Response (EDR)",
				seoDesc:
					"Endpoint visibility, behavioral detections, isolation, and rollback.",
			},
			{
				slug: "/services/grc-compliance",
				title: "GRC & Compliance",
				seoDesc:
					"Control mapping and ISO 27001 / SOC 2 compliance preparation.",
			},
			{
				slug: "/services/dfir",
				title: "Digital Forensics & Incident Response (DFIR)",
				seoDesc:
					"Rapid containment, forensics, root-cause analysis, and recovery.",
			},
		].map((s) => ({
			slug: s.slug,
			title: s.title,
			template: "SERVICE" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml: `<p>${s.seoDesc}</p>`,
			seoTitle: `${s.title} — Selim Solutions`,
			seoDesc: s.seoDesc,
			publishedAt: new Date(),
			sections: [],
		})),
		// Sub-pages: Solutions
		...[
			{
				slug: "/solutions/banking-finance",
				title: "Banking & Finance Security",
				seoDesc: "Core banking, payments, and NRB-aligned cyber resilience.",
			},
			{
				slug: "/solutions/insurance",
				title: "Insurance Security",
				seoDesc: "Policyholder data protection and claims workflow security.",
			},
			{
				slug: "/solutions/government",
				title: "Government Security",
				seoDesc: "Sovereign citizen infrastructure and public-sector defense.",
			},
			{
				slug: "/solutions/telecom-isps",
				title: "Telecom & ISPs Security",
				seoDesc: "Carrier backbone protection and subscriber telemetry.",
			},
			{
				slug: "/solutions/healthcare",
				title: "Healthcare Security",
				seoDesc: "Clinical systems, EHR privacy, and medical device safety.",
			},
			{
				slug: "/solutions/education-ngos",
				title: "Education & NGOs Security",
				seoDesc: "Research networks, donor trust, and campus identity.",
			},
		].map((s) => ({
			slug: s.slug,
			title: s.title,
			template: "SOLUTION" as const,
			status: "PUBLISHED" as const,
			isSystem: false,
			contentHtml: `<p>${s.seoDesc}</p>`,
			seoTitle: `${s.title} — Selim Solutions`,
			seoDesc: s.seoDesc,
			publishedAt: new Date(),
			sections: [],
		})),
	];

	for (const p of pages) {
		const { sections, ...pageData } = p;
		const contentJson = PAGE_CONTENT_BY_SLUG[pageData.slug];
		const existing = await prisma.cmsPage.findUnique({
			where: { slug: pageData.slug },
		});
		if (!existing) {
			await prisma.cmsPage.create({
				data: {
					...pageData,
					...(contentJson ? { contentJson } : {}),
					sections: {
						create: sections,
					},
				},
			});
		} else if (!existing.contentJson && contentJson) {
			await prisma.cmsPage.update({
				where: { id: existing.id },
				data: { contentJson },
			});
		}
	}

	// 5. Media Assets
	const mediaAssets = [
		{
			id: "med-logo-white",
			name: "selim-logo-white.svg",
			url: "/selim-logo-white.svg",
			type: "IMAGE" as const,
			mimeType: "image/svg+xml",
			sizeLabel: "1 KB",
			altText: "Selim Solutions white logo",
		},
		{
			id: "med-logo-light",
			name: "selim-logo-light.svg",
			url: "/selim-logo-light.svg",
			type: "IMAGE" as const,
			mimeType: "image/svg+xml",
			sizeLabel: "1 KB",
			altText: "Selim Solutions dark logo",
		},
		{
			id: "med-globe-dots",
			name: "globe-dots.svg",
			url: "/globe-dots.svg",
			type: "IMAGE" as const,
			mimeType: "image/svg+xml",
			sizeLabel: "54 KB",
			altText: "Dotted globe graphic",
		},
		{
			id: "med-hero-video",
			name: "hero-video.mp4",
			url: "/hero-video.mp4",
			type: "VIDEO" as const,
			mimeType: "video/mp4",
			sizeLabel: "14.5 MB",
			altText: "Hero background video",
		},
	];

	for (const asset of mediaAssets) {
		await prisma.cmsMedia.upsert({
			where: { id: asset.id },
			update: {},
			create: asset,
		});
	}

	console.log("CMS seed completed successfully.");
}

main()
	.catch((err) => {
		console.error("Seed failed:", err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
