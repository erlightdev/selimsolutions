export interface CmsHeroData {
	eyebrow?: string;
	headline?: string;
	subheadline?: string;
	ctaLabel?: string;
	ctaHref?: string;
	secondaryCtaLabel?: string;
	secondaryCtaHref?: string;
}

export interface CmsUseCaseItem {
	number: string;
	title: string;
	description: string;
	metric: string;
}

export interface CmsStepItem {
	number: string;
	title: string;
	subtitle: string;
}

export interface CmsFaqItem {
	question: string;
	answer: string;
}

export interface CmsStatItem {
	value: string;
	label: string;
}

export interface CmsTestimonialData {
	quote?: string;
	author?: string;
	role?: string;
}

export interface CmsLegalMetaData {
	eyebrow?: string;
	intro?: string;
	updated?: string;
	renderCustomBody?: boolean;
}

export interface CmsPageContentJson {
	hero?: CmsHeroData;
	stats?: CmsStatItem[];
	useCases?: CmsUseCaseItem[];
	steps?: CmsStepItem[];
	testimonial?: CmsTestimonialData;
	faqs?: CmsFaqItem[];
	legalMeta?: CmsLegalMetaData;
}

export function mergeCmsPageData(
	rawJson: unknown,
	defaults: CmsPageContentJson,
): CmsPageContentJson {
	if (!rawJson || typeof rawJson !== "object" || Array.isArray(rawJson)) {
		return defaults;
	}
	const src = rawJson as CmsPageContentJson;
	return {
		hero: src.hero ? { ...defaults.hero, ...src.hero } : defaults.hero,
		stats:
			Array.isArray(src.stats) && src.stats.length > 0
				? src.stats
				: defaults.stats,
		useCases:
			Array.isArray(src.useCases) && src.useCases.length > 0
				? src.useCases
				: defaults.useCases,
		steps:
			Array.isArray(src.steps) && src.steps.length > 0
				? src.steps
				: defaults.steps,
		testimonial: src.testimonial
			? { ...defaults.testimonial, ...src.testimonial }
			: defaults.testimonial,
		faqs:
			Array.isArray(src.faqs) && src.faqs.length > 0 ? src.faqs : defaults.faqs,
		legalMeta: src.legalMeta
			? { ...defaults.legalMeta, ...src.legalMeta }
			: defaults.legalMeta,
	};
}
