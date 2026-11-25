export const PAGE_CONTENT_BY_SLUG: Record<string, object> = {
	"/": {
		hero: {
			eyebrow: "SOC operational",
			headline: "Clarity from the highest ground.",
			subheadline:
				"Selim Solution guards your digital frontier — a 24/7 SOC with threat detection, incident response and compliance.",
			ctaLabel: "Get Free Assessment",
			ctaHref: "/free-assessment",
			secondaryCtaLabel: "Explore services",
			secondaryCtaHref: "/services",
		},
		stats: [
			{ value: "24/7", label: "Monitoring" },
			{ value: "<15m", label: "Avg response" },
			{ value: "6+", label: "Core services" },
			{ value: "ISO", label: "27001 ready" },
		],
	},
	"/about": {
		hero: {
			eyebrow: "Brand Story & Security Command",
			headline: "Built to defend Nepal's critical digital frontier.",
			subheadline:
				"We are a premier Managed Cyber Security Service Provider (MSSP) delivering 24/7 sovereign SOC, VAPT, and threat-containment services.",
		},
		stats: [
			{ value: "2021", label: "Year Founded" },
			{ value: "24/7/365", label: "SOC Command" },
			{ value: "<15m", label: "Containment SLA" },
			{ value: "100%", label: "Sovereign Engineers" },
		],
	},
	"/certifications": {
		hero: {
			eyebrow: "Trust & Compliance",
			headline: "Verified standards and operational accountability.",
			subheadline:
				"Our security operations and governance frameworks are audited against international information security benchmarks.",
		},
	},
	"/contact": {
		hero: {
			eyebrow: "Contact",
			headline: "Talk directly with our security engineers.",
			subheadline:
				"Reach our Kathmandu SOC for posture assessments, penetration testing scopes, or immediate incident response.",
		},
	},
	"/free-assessment": {
		hero: {
			eyebrow: "Free Assessment",
			headline: "Identify critical gaps before attackers do.",
			subheadline:
				"Request a complimentary review of monitoring coverage, incident readiness, and priority risks.",
			ctaLabel: "Request Assessment",
			ctaHref: "mailto:contact@selim.solutions",
		},
	},
	"/privacy": {
		legalMeta: {
			eyebrow: "Privacy Policy",
			intro:
				"This page explains what information we collect on the public website, how we use it, and the choices you have when you contact Selim Solution or browse our site.",
			updated: "June 29, 2026",
			renderCustomBody: false,
		},
	},
	"/terms": {
		legalMeta: {
			eyebrow: "Terms & Conditions",
			intro:
				"These terms set expectations for how visitors can use the Selim Solution website, its content, and the contact channels linked from it.",
			updated: "June 29, 2026",
			renderCustomBody: false,
		},
	},
	"/services": {
		hero: {
			eyebrow: "Services",
			headline: "Security operations built as one unified defense layer.",
			subheadline:
				"Explore Selim Solution's coverage: 24/7 SOC, VAPT pentesting, cloud hardening, EDR integration, GRC compliance, and DFIR.",
		},
	},
	"/solutions": {
		hero: {
			eyebrow: "Solutions",
			headline: "Security programs tuned to how each sector actually operates.",
			subheadline:
				"We shape monitoring, escalation, and control priorities around industry-specific systems, operational pressure, and data sensitivity.",
		},
	},
	"/services/soc-as-a-service": {
		hero: {
			eyebrow: "Core Security Operations",
			headline: "Round-the-clock analyst-led defense.",
			subheadline:
				"We run persistent security operations, log aggregation, and real-time SIEM correlation, backed by certified security analysts who monitor and lock down threats 24/7/365.",
			ctaLabel: "Request SOC Trial",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "3 AM Compromise Mitigation",
				description:
					"Our active night analysts identify credential-stuffing or remote privilege escalations and instantly coordinate endpoint lockdowns to isolate infected nodes.",
				metric: "< 15 Min MTTR",
			},
			{
				number: "02",
				title: "Multi-Source Telemetry Aggregation",
				description:
					"Unify system outputs across firewalls, cloud containers, active directories, and local databases into one central correlation pipeline.",
				metric: "Unified Console",
			},
			{
				number: "03",
				title: "Log Integrity & Masking",
				description:
					"Filter, mask, and securely forward database syslogs, ensuring absolute data privacy while satisfying local audit retention laws.",
				metric: "Sovereign Logging",
			},
		],
		steps: [
			{
				number: "01",
				title: "Collector Agent Rollout",
				subtitle:
					"Install lightweight log aggregation collectors and establish secure API connections to cloud workspace systems.",
			},
			{
				number: "02",
				title: "Rule Calibration & Tuning",
				subtitle:
					"Calibrate parsing rules and alert thresholds specifically mapped to match your company's normal active network levels.",
			},
			{
				number: "03",
				title: "24/7 Operations Coverage",
				subtitle:
					"Continuous threat monitoring begins. Our active triaging queues isolate threats and assist with incident recovery.",
			},
		],
		testimonial: {
			quote:
				"Selim's SOC flagged a credential-stuffing attack at 3 AM and contained it before a single account fell. Their team feels like an extension of ours.",
			author: "Aarav Shrestha",
			role: "CISO, Himalayan Bank",
		},
		faqs: [
			{
				question: "How does your SOC team coordinate escalations?",
				answer:
					"We filter noisy events and only escalate verified, prioritized alerts. During critical incidents, we reach out immediately via your preferred hotlines, providing step-by-step containment guides.",
			},
			{
				question: "What types of telemetry can your SIEM ingest?",
				answer:
					"We ingest standard syslogs, endpoint events, cloud access tokens (Google, O365, AWS, Azure), database queries, and custom application server transactional logs.",
			},
			{
				question: "Do you provide on-premises log hosting options?",
				answer:
					"Yes. We configure and manage localized log aggregates that compile, filter, and mask logs locally, routing only structured threat indicators to our SOC center.",
			},
		],
	},
	"/services/vapt": {
		hero: {
			eyebrow: "Offensive Security Validation",
			headline: "Identify and eliminate zero-day risks.",
			subheadline:
				"We manually probe your boundaries. Our certified ethical hacking team isolates architectural flaws, logical bypasses, and endpoint vulnerabilities before malicious actors can exploit them.",
			ctaLabel: "Request Vulnerability Test",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Web & Mobile API Penetration Audits",
				description:
					"We manually reverse engineer API endpoints and logical workflows to intercept business logic bypasses, SQL injections, and horizontal privilege escalations.",
				metric: "4.2x More Findings",
			},
			{
				number: "02",
				title: "Active Directory & Lateral Checks",
				description:
					"Simulate a local network compromise to map internal lateral migration capabilities, identifying misconfigured privileges and insecure kerberos setups.",
				metric: "In-Depth Lateral maps",
			},
			{
				number: "03",
				title: "Compliance-Mandated VAPT Scans",
				description:
					"Conduct standard-ready vulnerability cycles satisfying PCI-DSS requirement 11, NRB directives, and ISO Annex A control standards, generating board-ready reports.",
				metric: "100% Audit Success",
			},
		],
		steps: [
			{
				number: "01",
				title: "Reconnaissance & Mapping",
				subtitle:
					"Scan and map entire external threat surfaces, identifying active endpoints, ports, and exposed database indices.",
			},
			{
				number: "02",
				title: "Exploitation & Logic Auditing",
				subtitle:
					"Certified ethical hackers manually execute custom payloads to bypass logical configurations and escalate system privileges.",
			},
			{
				number: "03",
				title: "Remediation & Report Verification",
				subtitle:
					"Compile a detailed reporting card with exact code-fix blocks and run re-test validations to confirm mitigations are verified.",
			},
		],
		faqs: [
			{
				question: "How do your manual pentests differ from automated scanning?",
				answer:
					"Scanners only search for known signatures. Our certified hackers write customized scripts, map application business logic, and construct chains of low-severity exploits to achieve administrative domain access.",
			},
			{
				question:
					"How long does a standard web application VAPT engagement take?",
				answer:
					"A standard assessment ranges from 5 to 10 business days depending on API complexity. We deliver complete, verified technical draft reports within 3 days of completion.",
			},
			{
				question: "Do you provide code-level remediation guidance?",
				answer:
					"Yes. Every finding in our board-ready reporting packages contains exact line-of-code fix samples, secure configuration blocks, and architectural isolation instructions.",
			},
		],
	},
	"/services/cloud-security": {
		hero: {
			eyebrow: "Cloud Infrastructure Defense",
			headline: "Defend and harden cloud infrastructure.",
			subheadline:
				"We secure distributed cloud clusters, protect transaction nodes, and defend databases from configuration drifts, credential hijacks, and lateral pivots.",
			ctaLabel: "Audit Cloud Security",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Continuous Configuration Drift Scanning",
				description:
					"Automatically scan infrastructure-as-code registers and production nodes to flag unauthorized permission changes or exposed database buckets.",
				metric: "Zero Configuration Drift",
			},
			{
				number: "02",
				title: "Cloud Identity & Token Reviews",
				description:
					"Map and trace directory roles, administrative sessions, and active API access keys to shut down credential hijacking and lateral account shifts.",
				metric: "Identity-Hardened",
			},
			{
				number: "03",
				title: "Sovereign Cloud Data Control",
				description:
					"Review data flow configurations and localized syslog repositories to fulfill regional financial auditing standards and retain data on-premises.",
				metric: "Sovereign-Ready",
			},
		],
		steps: [
			{
				number: "01",
				title: "Cloud Posture Mapping",
				subtitle:
					"Scan cloud accounts (AWS, Azure, Google Cloud) using read-only APIs to compile a complete controls gap list.",
			},
			{
				number: "02",
				title: "Security Group Hardening",
				subtitle:
					"Remediate open ports, tighten API gateways, align multi-factor settings, and restrict root account operations.",
			},
			{
				number: "03",
				title: "Persistent Compliance Audits",
				subtitle:
					"Initialize automated scanning templates to flag configuration drift and deliver audit logs to central panels.",
			},
		],
		faqs: [
			{
				question: "Which public clouds and workspace platforms do you secure?",
				answer:
					"We provide complete coverage for Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), Google Workspace, and Microsoft Office 365 environments.",
			},
			{
				question: "How do your automated audits affect active system latency?",
				answer:
					"They have zero impact. Our checks run out-of-band via read-only cloud metadata APIs, auditing configurations and access rules without introducing any latency.",
			},
			{
				question: "How do you secure third-party integration tokens?",
				answer:
					"We review and log API access permissions, tracking outbound calls and identifying overly broad administrative privileges to minimize integration exposure.",
			},
		],
	},
	"/services/edr": {
		hero: {
			eyebrow: "Endpoint Security Operations",
			headline: "Uncompromising workstation security.",
			subheadline:
				"We deploy, configure, and monitor advanced endpoint detection and response (EDR) systems to isolate compromised devices, terminate ransomware in memory, and defend off-network systems.",
			ctaLabel: "Request EDR Demo",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Ransomware Behavioral Interception",
				description:
					"EDR monitors trace process behavior in memory. If any unknown utility attempts to mass-encrypt files, the sensor terminates the process and rolls back modifications instantly.",
				metric: "< 5 Min Containment",
			},
			{
				number: "02",
				title: "Off-Network Endpoint Monitoring",
				description:
					"Workstations and laptops remain secure even when disconnected from corporate firewalls, updating telemetry via encrypted cloud log aggregators.",
				metric: "Always-Protected",
			},
			{
				number: "03",
				title: "In-Depth Post-Incident Forensics",
				description:
					"EDR preserves exact memory snapshots, process execution timelines, and file hashes, simplifying forensic root-cause analysis during audits.",
				metric: "Forensic-Ready",
			},
		],
		steps: [
			{
				number: "01",
				title: "Silent Agent Rollout",
				subtitle:
					"Deploy light, optimized EDR agents across all workstations silently using standard directory installation tools.",
			},
			{
				number: "02",
				title: "Heuristic Baseline Tuning",
				subtitle:
					"Establish behavioral rules, whitelisting corporate utilities to prevent false indicators of compromise.",
			},
			{
				number: "03",
				title: "SOC Triaging Active",
				subtitle:
					"Connect the endpoint log feed to our active 24/7 Kathmandu operations room for instant threat containment.",
			},
		],
		faqs: [
			{
				question: "How does EDR differ from standard antivirus software?",
				answer:
					"Antivirus only scans for known static signatures. EDR tracks live runtime behavioral heuristics, detecting zero-days and memory exploitation patterns that static tools completely miss.",
			},
			{
				question: "Does the EDR sensor slow down user workstations?",
				answer:
					"No. Our agents are highly optimized, averaging less than 1% CPU utilization and minimal memory allocations, ensuring zero impact on daily operations.",
			},
			{
				question: "Can you isolate a compromised workstation remotely?",
				answer:
					"Yes. In case of verified threats, our SOC can isolate the node with a single click, cutting off lateral network paths while maintaining a secure troubleshooting shell.",
			},
		],
	},
	"/services/grc-compliance": {
		hero: {
			eyebrow: "GRC & COMPLIANCE PREPARATION",
			headline: "Standard compliance built for operations.",
			subheadline:
				"We translate compliance guidelines into clean technical controls. Map operations, automate log audits, and generate structured evidence files to clear external inspections with zero friction.",
			ctaLabel: "Request Compliance Prep",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Continuous Mapping & Gap Audits",
				description:
					"Automatically correlate configurations and logging states, matching raw parameters to expected ISO, SOC 2, or NRB standard controls.",
				metric: "Zero Posture Drift",
			},
			{
				number: "02",
				title: "Operational Policy Drafting",
				description:
					"Build and compile custom internal policy guidelines, data handling logs, and incident playbook documentation mapped to pass external audits.",
				metric: "100% Policy Compliant",
			},
			{
				number: "03",
				title: "Interactive Evidence Aggregation",
				description:
					"Aggregate real-time configuration snapshots and VAPT reports, compiling them into a single, clean dashboard to fast-track external auditor walkthroughs.",
				metric: "Auditor-Ready Data",
			},
		],
		steps: [
			{
				number: "01",
				title: "Framework Baseline Selection",
				subtitle:
					"Select and establish baseline parameters matching your targeted auditing standards (ISO 27001, PCI, SOC 2).",
			},
			{
				number: "02",
				title: "Control Analysis & Remediation",
				subtitle:
					"Audit system configurations, user access levels, and logs, closing critical technical gaps on subnets.",
			},
			{
				number: "03",
				title: "External Audit Representation",
				subtitle:
					"Generate read-only evidence cards and walkthrough guides, coordinating with third-party certification bodies during inspections.",
			},
		],
		faqs: [
			{
				question: "Which compliance standards can you prepare us for?",
				answer:
					"We offer comprehensive preparation and control mapping for ISO 27001, PCI-DSS, SOC 2, NIST CSF, and Nepal Rastra Bank (NRB) IT Guidelines.",
			},
			{
				question: "How do your tools automate evidence aggregation?",
				answer:
					"We integrate light read-only API connectors with cloud workspaces, servers, and endpoint monitors, compiling configuration evidence blocks automatically.",
			},
			{
				question: "Do you supply customized corporate security templates?",
				answer:
					"Yes. We provide complete, bespoke internal procedures templates, business continuity plans, disaster recovery blueprints, and access privilege sheets.",
			},
		],
	},
	"/services/dfir": {
		hero: {
			eyebrow: "Emergency Incident Response",
			headline: "Fast, decisive threat resolution.",
			subheadline:
				"We contain breaches and restore system sanity. Our certified digital forensics and incident response (DFIR) specialists halt active compromises, decompile malware, and reconstruct systems securely under heavy pressure.",
			ctaLabel: "Contact DFIR Emergency",
			ctaHref: "mailto:contact@selim.solutions",
		},
		useCases: [
			{
				number: "01",
				title: "Emergency Root-Cause Diagnostics",
				description:
					"Execute deep network and system forensics to trace breach entrance locations, identify compromised admin tokens, and verify exfiltrated directories.",
				metric: "Fast Root-Cause",
			},
			{
				number: "02",
				title: "Malware Reverse Engineering",
				description:
					"Isolate and decompile custom payloads inside sandbox labs to identify command-and-control IP coordinates, encryption routines, and lateral movement methods.",
				metric: "Sandbox Labs",
			},
			{
				number: "03",
				title: "Legal Forensic Data Isolation",
				description:
					"Isolate and sign event logs and file-integrity check hashes, creating immutable, legally binding digital evidence packages ready for GRC requirements.",
				metric: "Chain-of-Custody Secure",
			},
		],
		steps: [
			{
				number: "01",
				title: "Containment & Isolation",
				subtitle:
					"Immediately isolate compromised servers, lock administrative sessions, and block malware callbacks to prevent exfiltration.",
			},
			{
				number: "02",
				title: "Forensic Investigation",
				subtitle:
					"Examine registry tables, volatile system memory, and log trails to reconstruct the attacker's timeline.",
			},
			{
				number: "03",
				title: "System Restoration & Hardening",
				subtitle:
					"Rebuild baseline servers, rotate corporate credentials, patch zero-days, and restore clean backups.",
			},
		],
		faqs: [
			{
				question: "How fast is your emergency incident response mobilization?",
				answer:
					"Our dedicated 24/7 incident hotline is continuously active. Emergency response triaging and remote containment starts within 15 minutes of initial mobilization.",
			},
			{
				question: "Can we engage your DFIR team if we don't have a retainer?",
				answer:
					"Yes. We support emergency ad-hoc incident contracts, mobilizing immediate remote assistance to contain active breaches and isolate local systems.",
			},
			{
				question:
					"What is your data recovery success rate after ransomware attacks?",
				answer:
					"We identify and restore untouched volume shadow copies and system logs to reconstruct files. Where safe, clean backups exist, we guarantee 100% complete restoration.",
			},
		],
	},
	"/solutions/banking-finance": {
		hero: {
			eyebrow: "Banking & Finance",
			headline: "Security calibrated to high-value transactions.",
			subheadline:
				"We defend financial institutions with zero-day threat detection, SWIFT-compliant event monitoring, and continuous offensive assessments designed to exceed rigorous audit pressures.",
			ctaLabel: "Request Financial Audit",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Core Banking Integrity Monitoring",
				description:
					"Continuous telemetry correlation across core databases, transaction interfaces, and ledger configurations to detect internal and external fraud or unauthorized access patterns in real-time.",
				metric: "99.999% Visibility",
			},
			{
				number: "02",
				title: "SWIFT & Payment Gateway Hardening",
				description:
					"Dedicated threat-detection rules tailored for SWIFT terminal logs, card processors, and digital banking APIs, identifying out-of-bounds administrative activity and anomalous session timings.",
				metric: "< 5 Min Containment",
			},
			{
				number: "03",
				title: "NRB IT Guidelines & Compliance Mapping",
				description:
					"Automated alignment of continuous monitoring, access controls, and logging practices directly to Nepal Rastra Bank guidelines, simplifying reporting and third-party audit readiness.",
				metric: "Audit-Ready Logs",
			},
		],
		steps: [
			{
				number: "01",
				title: "Log Aggregation & Local Isolation",
				subtitle:
					"Sovereign log aggregation agents collect and parse events from SWIFT nodes, core AS400 tables, and identity gateways locally, masking all PII.",
			},
			{
				number: "02",
				title: "NRB & Threat Pattern Correlation",
				subtitle:
					"Our SIEM engine correlates events against known financial fraud vectors, credential-stuffing patterns, and specific NRB logging directives.",
			},
			{
				number: "03",
				title: "Analyst Triaging & Action",
				subtitle:
					"Our 24/7 Kathmandu SOC identifies verified indicators of compromise, immediately initiating account lockdown or terminal isolation workflows.",
			},
		],
		faqs: [
			{
				question:
					"How does your SOC map log monitoring to Nepal Rastra Bank (NRB) directives?",
				answer:
					"We integrate continuous security log aggregation, parsing, and correlation routines designed around NRB requirements. We provide standard dashboards and monthly automated audit templates that can be handed directly to regulatory examiners.",
			},
			{
				question:
					"Can your team monitor legacy AS400 or proprietary core-banking platforms?",
				answer:
					"Yes. Our log collection agents and orchestration integrations ingest, parse, and monitor transaction database updates, OS-level event changes, and administrator activities on specialized core banking environments.",
			},
			{
				question:
					"What guarantees do you provide regarding banking customer data privacy?",
				answer:
					"We support localized log aggregators, on-premises syslog forwarding, and strict field-level masking. This ensures that personally identifiable customer financial data remains entirely within your sovereign network boundaries.",
			},
		],
	},
	"/solutions/insurance": {
		hero: {
			eyebrow: "Insurance",
			headline: "Defending policyholders and safeguarding claims.",
			subheadline:
				"We secure distributed broker channels, protect massive customer databases, and defend claims processing workflows from ransomware and fraudulent digital manipulation.",
			ctaLabel: "Request Vulnerability Audit",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Securing Digital Claims Portals",
				description:
					"Offensive penetration audits and runtime threat logging designed to block SQL injections, API manipulation, and credential hijacking on customer-facing policy portals.",
				metric: "Zero-Day Hardened",
			},
			{
				number: "02",
				title: "Claim Fraud & Insider Threat Monitoring",
				description:
					"Establishing behavioral baselines for internal administrative profiles, flagging massive data exports or unauthorized modifications to policy settlement parameters.",
				metric: "Anomalous Log Audits",
			},
			{
				number: "03",
				title: "Distributed Agent & Broker Protection",
				description:
					"Deploying lightweight EDR telemetry to ensure independent field adjusters and third-party broker machines remain secure, blocking ransomware before it pivots to core files.",
				metric: "Isolated Endpoints",
			},
		],
		steps: [
			{
				number: "01",
				title: "EDR & Portal Integration",
				subtitle:
					"Deploy lightweight, low-footprint EDR endpoints on broker systems and establish secure threat-event logging on digital claim interfaces.",
			},
			{
				number: "02",
				title: "Behavioral Baseline Analysis",
				subtitle:
					"Establish clean operational maps for broker activity, immediately flagging bulk document downloads or out-of-region claims adjustments.",
			},
			{
				number: "03",
				title: "Decisive Containment",
				subtitle:
					"Our 24/7 SOC steps in within minutes to isolate a hijacked laptop or block malicious API traffic before it can breach policy databases.",
			},
		],
		faqs: [
			{
				question:
					"How do you secure highly sensitive medical and personal policy records?",
				answer:
					"We implement egress telemetry monitoring and deep file access auditing. If any administrative account or broker endpoint starts downloading policyholder files in bulk, our SOC isolates the machine and flags the transaction immediately.",
			},
			{
				question:
					"We use hundreds of independent agents. Can you secure non-corporate laptops?",
				answer:
					"Yes. We configure and manage light EDR and identity integrations that protect assets off-network. Our platform registers and monitors security metrics on endpoints, shutting down local network vectors without intruding on user privacy.",
			},
			{
				question:
					"Do you help align with national Insurance Authority security standards?",
				answer:
					"Absolutely. We supply comprehensive quarterly penetration test reports, policy review assistance, and continuous logging dashboards configured specifically around Insurance Regulatory Authority cybersecurity directives.",
			},
		],
	},
	"/solutions/government": {
		hero: {
			eyebrow: "Government",
			headline: "Hardening digital state services.",
			subheadline:
				"We protect public-sector infrastructure with continuous threat modeling, sovereign data boundaries, and 24/7 defense protocols tailored for federal, regional, and national utilities.",
			ctaLabel: "Request State Assessment",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Securing Public & Civil Registries",
				description:
					"Continuous penetration auditing and deep log correlation across citizen databases and identification registries, preventing unauthorized modifications and massive registry exfiltration.",
				metric: "Sovereign Log Control",
			},
			{
				number: "02",
				title: "Critical Utility & Utility Infrastructure Monitoring",
				description:
					"Aggregating and correlating logs from SCADA interfaces, building systems, and critical state-owned grid logs, flagging coordinated sabotage or lateral movement indicators.",
				metric: "24/7 Core Continuity",
			},
			{
				number: "03",
				title: "Ministerial Web Portal Hardening",
				description:
					"Securing high-visibility public-facing government portals against state-sponsored defacement, distributed denial of service (DDoS) campaigns, and API-based record scraping.",
				metric: "Defacement Shielded",
			},
		],
		steps: [
			{
				number: "01",
				title: "Sovereign Collector Deployment",
				subtitle:
					"Install localized log forwarding sensors inside air-gapped agency subnets, isolating all metadata in compliance with sovereign policies.",
			},
			{
				number: "02",
				title: "Advanced Threat Detection",
				subtitle:
					"Correlate portal and server events against advanced persistent threat (APT) indicators and state-sponsored intrusion signatures.",
			},
			{
				number: "03",
				title: "Joint-Agency Mobilization",
				subtitle:
					"Coordinate rapid blocklists and host containment in unison with federal CERT administrators and system operations directors.",
			},
		],
		faqs: [
			{
				question:
					"Can you provide entirely on-premises security log hosting for state networks?",
				answer:
					"Yes. We support localized syslog aggregation appliances, offline analysis setups, and highly secure local forwarding configurations, ensuring that sensitive state telemetry never exits sovereign borders.",
			},
			{
				question:
					"What security clearance and vetting do your threat analyst teams have?",
				answer:
					"All analysts and engineers operating on public-sector queues undergo strict multi-tiered background verification, sign comprehensive national security NDAs, and hold advanced professional certifications (OSCP, CISSP).",
			},
			{
				question:
					"How does your team coordinate with national cybersecurity centers (CERT)?",
				answer:
					"We maintain direct, standardized notification channels and export threat telemetry in structured STIX/TAXII formats. This allows for immediate, automated distribution of incident indicators to national agencies.",
			},
		],
	},
	"/solutions/telecom-isps": {
		hero: {
			eyebrow: "Telecom & ISPs",
			headline: "Carrier-scale monitoring for always-on networks.",
			subheadline:
				"We defend telecommunication providers and major ISPs with high-velocity log analysis, critical core network audits, and automated incident triage designed for massive scales.",
			ctaLabel: "Audit Core Networks",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Edge Routing & BGP Node Hardening",
				description:
					"Continuous security configuration reviews and active vulnerability assessments of edge routers, core switch configurations, and administrative control channels.",
				metric: "Carrier-Grade Audits",
			},
			{
				number: "02",
				title: "High-Volume DNS & DHCP Threat Isolation",
				description:
					"Parsing millions of system logs in real-time to isolate dynamic command-and-control (C2) domains, DNS tunneling attempts, and rogue internal DHCP leases.",
				metric: "Million-EPS Parsing",
			},
			{
				number: "03",
				title: "Subscriber API & Web Protection",
				description:
					"Thorough VAPT reviews on subscriber management portals and customer APIs, stopping credit fraud, billing bypass, and sensitive data exposure.",
				metric: "Protected Portals",
			},
		],
		steps: [
			{
				number: "01",
				title: "Pre-Filter Ingest",
				subtitle:
					"Deploy ultra-fast pre-filters at DNS and DHCP server outputs, pruning noisy normal transactions before central analysis.",
			},
			{
				number: "02",
				title: "High-Velocity Parsing",
				subtitle:
					"Correlate compacted system logs across high-throughput security event managers, searching for active botnets and tunneling protocols.",
			},
			{
				number: "03",
				title: "Non-Intrusive Mitigation",
				subtitle:
					"Alert infrastructure engineers with exact upstream blocklists and flow-spec rule coordinates, mitigating attacks without interrupting traffic flow.",
			},
		],
		faqs: [
			{
				question:
					"How do you handle the extreme volume of logging telemetry generated by an ISP?",
				answer:
					"We deploy pre-filter aggregation points that compress and parse infrastructure logs locally. This isolates critical access events and high-priority infrastructure modifications before routing to the main correlation engine, optimizing throughput and response speeds.",
			},
			{
				question:
					"Does your offering align with National Information Authority (NIA) Guideline 2076?",
				answer:
					"Yes. Our monitoring baselines, incident management playbooks, and continuous VAPT cycles are meticulously mapped to meet all cybersecurity and log retention protocols listed under Nepal's NIA Guideline 2076.",
			},
			{
				question:
					"What support do you offer during large-scale network DDoS events?",
				answer:
					"While we are not a primary inline DDoS scrubbing service, our SOC and DFIR teams analyze real-time netflow telemetry, identify source vectors, isolate compromised internal endpoints, and help configure precise upstream mitigation configurations.",
			},
		],
	},
	"/solutions/healthcare": {
		hero: {
			eyebrow: "Healthcare",
			headline: "Securing clinical systems and patient records.",
			subheadline:
				"We protect hospitals, laboratories, and health networks with HIPAA-aligned logging, connected medical device boundary guards, and rapid ransomware containment systems.",
			ctaLabel: "Request Clinical Audit",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Protecting Electronic Health Records (EHR)",
				description:
					"Continuous access tracking and correlation surrounding medical records databases, immediately shutting down abnormal mass record export or unauthorized administrative lookups.",
				metric: "Patient Data Shielded",
			},
			{
				number: "02",
				title: "IoMT & Medical Device Security Isolation",
				description:
					"Boundary telemetry monitoring for network-connected clinical instruments (MRI, CT scanners, ICU monitors), shutting down lateral movement vectors at the subnet level.",
				metric: "Subnet-Level Guard",
			},
			{
				number: "03",
				title: "Ransomware Prevention in Clinical Environments",
				description:
					"Behavioral endpoint telemetry configured to identify active file encryptor signatures within milliseconds, safeguarding ICU, pharmacy, and laboratory workstations.",
				metric: "< 5 Min Containment",
			},
		],
		steps: [
			{
				number: "01",
				title: "Clinical Profiling & Mapping",
				subtitle:
					"Locate and register all active IoMT instruments, clinical workstations, and patient database query paths across hospital subnets.",
			},
			{
				number: "02",
				title: "Boundary Sensor Configuration",
				subtitle:
					"Establish localized network-switch monitoring filters to track VLAN movement and block unauthorized outbound device queries.",
			},
			{
				number: "03",
				title: "Life-Safety Action",
				subtitle:
					"Our analysts triage logs instantly, triggering remote agent locks on ransomware vectors before they can pivot to active clinical beds.",
			},
		],
		faqs: [
			{
				question:
					"How do you protect legacy medical equipment that cannot host security agents?",
				answer:
					"We utilize passive network telemetry and advanced segment boundary logging. By tracking interactions at the clinical VLAN switch, we instantly identify and alert on anomalous outbound connections or internal port scanning originating from legacy medical hardware.",
			},
			{
				question:
					"How do your logging policies and reports support healthcare compliance (HIPAA)?",
				answer:
					"We map our continuous aggregation, audit trail retention, and VAPT assessments directly to HIPAA administrative and technical safeguards, generating regular board-ready compliance reports.",
			},
			{
				question:
					"Can your 24/7 SOC interface directly with our clinical emergency night staff?",
				answer:
					"Yes. We configure dedicated high-priority escalations via phone, SMS, and secure messaging channels to notify your active hospital IT shift during critical, time-sensitive events.",
			},
		],
	},
	"/solutions/education-ngos": {
		hero: {
			eyebrow: "Education & NGOs",
			headline: "Practical security built for distributed, lean teams.",
			subheadline:
				"We defend educational institutions and non-profits with cost-effective threat visibility, strong remote-work identities, and 24/7 managed detection and response.",
			ctaLabel: "Request NGO Assessment",
			ctaHref: "/free-assessment",
		},
		useCases: [
			{
				number: "01",
				title: "Protecting Donor & Student Databases",
				description:
					"Offensive security testing and access-control validation to prevent leaks of student directories, grades, academic records, and confidential donor billing info.",
				metric: "Database Hardened",
			},
			{
				number: "02",
				title: "Securing Distributed Remote Teams",
				description:
					"Deploying lightweight cloud-managed EDR telemetry to secure remote field adjusters, researchers, and administrators working on public networks.",
				metric: "Low-Bandwidth Sync",
			},
			{
				number: "03",
				title: "Email Security & Spoofing Defense",
				description:
					"Implementing aggressive DMARC, DKIM, and SPF validation checks to block phishing, Business Email Compromise (BEC), and wire-transfer fraud attempts.",
				metric: "Phish-Mitigated",
			},
		],
		steps: [
			{
				number: "01",
				title: "Low-Friction Configuration",
				subtitle:
					"Integrate email records and cloud directories using non-disruptive automated API scripts, keeping setup simple for lean teams.",
			},
			{
				number: "02",
				title: "Log Normalization & Pruning",
				subtitle:
					"Aggregate events inside cloud endpoints, compression-filtering telemetry to safeguard remote-office bandwidth overheads.",
			},
			{
				number: "03",
				title: "Phish & Threat Interception",
				subtitle:
					"Our SOC actively tracks phishing lures, spoofed executives, and compromised credentials, locking threats before money can move.",
			},
		],
		faqs: [
			{
				question:
					"Our IT team is tiny. How much support do you provide during onboarding?",
				answer:
					"We take care of the heavy lifting. Our engineers configure the collectors, design the monitoring playbooks, and provide complete, copy-paste deployment scripts to make setup seamless.",
			},
			{
				question:
					"Do you offer special licensing models or discounts for non-profits and schools?",
				answer:
					"Yes. We offer special pricing plans and multi-year contract flexibility designed to fit comfortably within non-profit, humanitarian, and educational budget cycles.",
			},
			{
				question:
					"How do your endpoint security agents handle extremely remote work regions?",
				answer:
					"Our sensors are highly optimized to run silently, using minimal bandwidth. In areas with spotty 3G/4G connectivity, sensors queue event telemetry locally and securely upload once network connections stabilize.",
			},
		],
	},
};
