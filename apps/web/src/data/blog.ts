export type BlogPost = {
	slug: string;
	category: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	img: string;
	seoTitle: string;
	seoDesc: string;
	content: string; // Markdown or clean structured string we can render
	featured?: boolean;
};

const IMG = "https://images.unsplash.com/photo-PLACEHOLDER?w=1200&q=80&auto=format&fit=crop";

export const blogPosts: BlogPost[] = [
	{
		slug: "cyber-security-soc-threat-detection-stops-credential-stuffing",
		category: "Threat Intel",
		title: "Inside a 3 AM Credential Stuffing Cyber Attack — And How Our SOC Stopped It",
		excerpt: "A real timeline of detection, triage, and rapid containment. Learn how Kathmandu's security analysts block high-velocity cyber attacks at machine speed.",
		date: "June 12, 2026",
		readTime: "8 min read",
		img: IMG.replace("PLACEHOLDER", "1550751827-4bd374c3f58b"),
		featured: true,
		seoTitle: "SOC Threat Detection: Blocking Credential Stuffing Attacks",
		seoDesc: "Read a real-world case study of how a 24/7 Security Operations Center (SOC) triages, investigates, and isolates credential stuffing cyber attacks at machine speed.",
		content: `
# Inside a 3 AM Credential Stuffing Cyber Attack

Credential stuffing attacks represent one of the highest-velocity cyber threats faced by modern digital enterprises. By leveraging millions of compromised usernames and passwords leaked from historical data breaches, automated botnets attempt brute-force authentications at a massive scale.

In this deep dive, we walk through a real-world intrusion attempt detected and neutralized by the **Selim Solution Security Operations Center (SOC)**.

---

## The Attack Timeline

### 03:14:02 AM — The Initial Ingestion Spike
Our automated log ingestion monitors recorded a sudden, sharp spike in authentication failures on a core enterprise application gateway.

*   **Metric:** Log ingestion rate rose from an average of 400 events per second (EPS) to **94.3K EPS**.
*   **Vector**: Distributed requests utilizing hundreds of unique IP addresses, bypassing standard rate-limit thresholds by mimicking human user intervals.

### 03:16:45 AM — Automated Triage & Identification
The threat hunting engine flagged the event as a suspected **high-velocity credential stuffing campaign**. 

Within seconds, the active incident was escalated to our Tier-2 security analysts. The attacker’s strategy was identified as targeting client account portals to perform unauthorized session acquisitions.

---

## How the SOC Analyst Responded

Rather than manually reviewing thousands of IP logs, our team deployed a pre-configured orchestration playbook:

1.  **Behavioral Fingerprinting**: Grouped bot requests by headers and cryptographic signatures instead of IPs alone.
2.  **Adaptive Challenge Enforcement**: Instructed the web application firewall (WAF) to dynamically serve rate-limited security challenges to any browser session matching the footprint.
3.  **Active Host Isolation**: Blocked confirmed botnet gateway nodes at the edge router level, stopping 99.8% of the malicious traffic stream.

Within **five minutes**, the attack was completely contained. No client credentials were compromised, and normal service metrics were fully restored.

---

## Core Security Recommendations

To protect your enterprise assets against automated authentication threats, we recommend implementing the following baseline controls:

*   **Multi-Factor Authentication (MFA)**: Restricts attackers even if they obtain valid credentials.
*   **WAF Rate Limiting**: Block requests that exceed human limits.
*   **Continuous Log Ingestion**: Ensure all gateway authentications are logged and analyzed in real-time.
		`
	},
	{
		slug: "vapt-testing-penetration-audit-finds-critical-vulnerabilities",
		category: "VAPT",
		title: "The Security Vulnerability Three Vendors Missed: A Manual VAPT Testing Playbook",
		excerpt: "How a chained API misconfiguration slipped past automated scanners — and why manual penetration testing is critical for secure cloud applications.",
		date: "June 4, 2026",
		readTime: "6 min read",
		img: IMG.replace("PLACEHOLDER", "1563013544-824ae1b704d3"),
		seoTitle: "Manual VAPT Testing vs Automated Vulnerability Scanners",
		seoDesc: "Discover why automated vulnerability scanners miss critical logical security flaws and how manual penetration testing (VAPT) protects your cloud APIs and networks.",
		content: `
# The Security Vulnerability Three Vendors Missed

Automated vulnerability scanners are excellent for finding known software bugs and outdated server packages. However, they lack the logical context necessary to detect complex, chained API business logic vulnerabilities.

In this article, we share a manual Vulnerability Assessment and Penetration Testing (VAPT) playbook that uncovered a critical security gap previously missed by three separate automated compliance scans.

---

## The Misconfiguration Chain

The vulnerability lived at the intersection of three standard system features, none of which flagged an error on their own:

1.  **Public Registration**: A SaaS application allowed public signup with any email domain.
2.  **Subdomain Authorization**: The authentication API trusted any user registered under an internal domain name (e.g., \`@client-corp.com\`).
3.  **Logical Parameter Pollution**: By submitting a specially crafted JSON payload during registration, an external actor could override their account metadata, linking their login directly to an internal corporate tenant.

Because each API endpoint operated correctly under geometric software scans, no signature-based alert was ever triggered.

---

## How Manual Penetration Testing Caught It

Our offensive security team approached the application with an attacker’s mindset, seeking to chain logically benign parameters into an unauthorized exploit path:

*   **Discovery**: Inspected client-side JavaScript bundles to identify hidden endpoints and payload parameters.
*   **Simulated Intrusion**: Injected custom metadata parameters during the registration handshake to test for missing server-side sanitization.
*   **Privilege Escalation**: Successfully gained complete administrator read/write access to the internal corporate directory.

The vulnerability was fully documented, and a comprehensive remediation plan was delivered to the engineering team.

---

## Key Takeaway: Scanners Aren't Enough

Relying solely on automated scanners creates a false sense of security. To ensure comprehensive threat mitigation, organizations should:

*   Combine automated scanning with deep, human-led manual **VAPT assessments**.
*   Conduct logical API contract reviews.
*   Enforce server-side inputs validation for all client-submitted parameters.
		`
	},
	{
		slug: "iso-27001-compliance-audit-readiness-playbook-fast-track",
		category: "Compliance",
		title: "ISO 27001 Compliance and Audit Readiness in Weeks: The Agile Playbook",
		excerpt: "A pragmatic control-mapping approach that turns complex compliance audits from dread into a simple, trusted, automated checklist.",
		date: "May 28, 2026",
		readTime: "5 min read",
		img: IMG.replace("PLACEHOLDER", "1518770660439-4636190af475"),
		seoTitle: "ISO 27001 Compliance Playbook: Secure Audit Readiness",
		seoDesc: "Learn how to fast-track your ISO 27001 compliance audit with a streamlined, control-mapping playbook designed for modern cloud infrastructure.",
		content: `
# ISO 27001 Compliance and Audit Readiness in Weeks

Achieving ISO 27001 certification has historically been seen as a bureaucratic marathon, requiring months of manual spreadsheet tracking, policy writing, and endless control testing.

By adopting a modern, agile compliance playbook, companies can map controls directly to cloud infrastructure, turning certification from a chore into a highly secure, automated asset.

---

## The Agile Compliance Strategy

The secret to fast-tracking your compliance lies in **continuous evidence collection**:

1.  **Map Once, Use Multiples**: Align your existing security controls simultaneously to ISO 27001, SOC 2, and GDPR criteria.
2.  **Continuous Automated Ingestion**: Connect compliance engines directly to cloud audit logs, eliminating manual screenshots.
3.  **Practical Security over Paper Policies**: Draft concise, realistic policies that developers actually read and follow, rather than heavy templates.

---

## Preparing for the Audit Handshake

During Stage 1 and Stage 2 audits, your auditor looks for proof that your declared policies are actually active in daily operations.

*   **Access Reviews**: Ensure employee authentication pathways use role-based controls and active MFA.
*   **Vulnerability Remediation**: Provide signed proof of regular external penetration testing reports.
*   **Incident Response Logs**: Show documented proof of triage timelines and SOC activity logs.

With this structured playbook, you can achieve audit readiness in weeks, proving operational trust to enterprise partners.
		`
	}
];
