import type { LucideIcon } from "lucide-react";
import {
	BadgeCheck,
	Banknote,
	Building2,
	Cloud,
	Cross,
	Fingerprint,
	GraduationCap,
	Landmark,
	ScanSearch,
	Shield,
	ShieldAlert,
	Siren,
	TowerControl,
} from "lucide-react";

export type OfferingItem = {
	label: string;
	href: string;
	description: string;
	icon: LucideIcon;
};

export const serviceItems: readonly OfferingItem[] = [
	{
		label: "SOC as a Service",
		href: "/services#soc",
		description: "24/7 monitoring, triage, detection engineering, and analyst-led response.",
		icon: TowerControl,
	},
	{
		label: "VAPT",
		href: "/services#vapt",
		description: "Manual vulnerability assessment and penetration testing across apps and infrastructure.",
		icon: ScanSearch,
	},
	{
		label: "Cloud Security",
		href: "/services#cloud",
		description: "Posture hardening, identity review, and continuous cloud risk reduction.",
		icon: Cloud,
	},
	{
		label: "EDR",
		href: "/services#edr",
		description: "Endpoint visibility, behavioral detections, isolation, and rollback guidance.",
		icon: Shield,
	},
	{
		label: "GRC & Compliance",
		href: "/services#grc",
		description: "Control mapping and compliance preparation for real operational environments.",
		icon: BadgeCheck,
	},
	{
		label: "DFIR",
		href: "/services#dfir",
		description: "Containment, forensics, root-cause analysis, and recovery coordination.",
		icon: Siren,
	},
] as const;

export const solutionItems: readonly OfferingItem[] = [
	{
		label: "Banking & Finance",
		href: "/solutions#banking-finance",
		description: "Security operations aligned to high-trust financial environments and audit pressure.",
		icon: Landmark,
	},
	{
		label: "Insurance",
		href: "/solutions#insurance",
		description: "Claims, policy, and customer data protection with measurable response readiness.",
		icon: ShieldAlert,
	},
	{
		label: "Government",
		href: "/solutions#government",
		description: "Public-sector hardening, visibility, and continuity planning for critical services.",
		icon: Building2,
	},
	{
		label: "Telecom & ISPs",
		href: "/solutions#telecom-isps",
		description: "Carrier-grade monitoring and incident workflows for always-on networks.",
		icon: Fingerprint,
	},
	{
		label: "Healthcare",
		href: "/solutions#healthcare",
		description: "Patient-data protection, risk visibility, and incident response for care systems.",
		icon: Cross,
	},
	{
		label: "Education & NGOs",
		href: "/solutions#education-ngos",
		description: "Practical security programs for lean teams managing distributed users and devices.",
		icon: GraduationCap,
	},
] as const;

export const complianceItems = [
	{ label: "ISO 27001", href: "/compliance/iso-27001" },
	{ label: "NIA Guideline 2076", href: "/compliance/nia-guideline-2076" },
	{ label: "PCI-DSS", href: "/compliance/pci-dss" },
	{ label: "NIST CSF", href: "/compliance/nist-csf" },
	{ label: "NRB Directives", href: "/compliance/nrb-directives" },
] as const;

export const resourceItems = [
	{ label: "Blog & Insights", href: "/blog" },
	{ label: "Certifications", href: "/certifications" },
	{ label: "Brand Story", href: "/about" },
	{ label: "Downloads", href: "/downloads" },
] as const;

export const sectorHighlights = [
	"Incident readiness under regulatory pressure",
	"Coverage tuned for high-value systems and sensitive data",
	"Workflows adapted to operational realities in each industry",
] as const;

export const serviceHighlights = [
	"24/7 analyst-led monitoring and escalation",
	"Offensive validation across apps, cloud, and endpoints",
	"Response and compliance programs designed as one system",
] as const;
