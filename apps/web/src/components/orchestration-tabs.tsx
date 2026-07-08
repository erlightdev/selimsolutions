import { cn } from "@selimsolutions/ui/lib/utils";
import {
	Activity,
	CheckCircle2,
	Cpu,
	Eye,
	Minus,
	Plus,
	Shield,
	Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";

type TabItem = {
	id: string;
	title: string;
	description: string;
	subtext: string;
	icon: any;
	shortTitle: string;
};

const capabilities: readonly TabItem[] = [
	{
		id: "soc",
		title: "24/7 Managed Security & Threat Detection",
		description:
			"Our security operations center (SOC) monitors your systems around the clock to stop cyber threats before they cause damage.",
		subtext:
			"Real-time security monitoring, immediate alert verification, and rapid incident response.",
		icon: Eye,
		shortTitle: "Threat Detection",
	},
	{
		id: "vapt",
		title: "Expert Penetration Testing & Risk Audits",
		description:
			"We simulate real-world cyber attacks to find and fix vulnerabilities in your applications, networks, and cloud infrastructure.",
		subtext:
			"Manual security evaluations, deep code audits, and practical remediation roadmaps.",
		icon: Terminal,
		shortTitle: "Pen Testing",
	},
	{
		id: "grc",
		title: "Automated Compliance & Security Standards",
		description:
			"Get audit-ready for frameworks like SOC 2, ISO 27001, and GDPR with automated controls and fast evidence tracking.",
		subtext:
			"Continuous control monitoring, policy generation templates, and fast certification paths.",
		icon: Shield,
		shortTitle: "Compliance",
	},
];

export default function OrchestrationTabs() {
	const [activeTab, setActiveTab] = useState<string>("soc");
	const activeCap =
		capabilities.find((cap) => cap.id === activeTab) || capabilities[0];

	return (
		<section className="relative overflow-hidden bg-background py-20 sm:py-28">
			{/* Background Ambient Glow */}
			<div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

			<div className="mx-auto max-w-7xl px-6 lg:px-10">
				{/* Section Header */}
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<p className="font-bold font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
						Security Operations
					</p>
					<h2 className="mt-4 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
						Complete cyber security made simple
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
						Protect your business with 24/7 active threat monitoring, expert
						penetration testing, and automated compliance tracking in one
						unified platform.
					</p>
				</div>

				<div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
					{/* Left Column: Mobile horizontal badge tabs & active info box */}
					<div className="col-span-1 block w-full lg:hidden">
						<div className="scrollbar-none mb-6 flex gap-2 overflow-x-auto border-border/20 border-b pb-4">
							{capabilities.map((cap) => {
								const isActive = activeTab === cap.id;
								const Icon = cap.icon;
								return (
									<button
										key={cap.id}
										type="button"
										onClick={() => setActiveTab(cap.id)}
										className={cn(
											"flex shrink-0 items-center gap-2 rounded-none border px-3.5 py-2 font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.96]",
											isActive
												? "border-primary bg-primary text-primary-foreground shadow-sm"
												: "border-border bg-muted/10 text-muted-foreground hover:border-foreground/20 hover:text-foreground",
										)}
									>
										<Icon className="h-3.5 w-3.5" />
										{cap.shortTitle}
									</button>
								);
							})}
						</div>

						{/* Active Info Box on Mobile */}
						<div
							className="anim-fade-up rounded-none border border-border bg-card p-5"
							key={activeTab}
						>
							<h3 className="font-bold text-foreground text-sm leading-snug tracking-tight sm:text-base">
								{activeCap.title}
							</h3>
							<p className="mt-3 text-pretty text-foreground/80 text-xs leading-relaxed sm:text-sm">
								{activeCap.description}
							</p>
							<p className="mt-2 text-pretty text-[10px] text-muted-foreground leading-relaxed sm:text-xs">
								{activeCap.subtext}
							</p>
						</div>
					</div>

					{/* Left Column: Accordion Tabs (Desktop Only) */}
					<div className="hidden flex-col lg:col-span-5 lg:flex">
						{capabilities.map((cap, idx) => {
							const isActive = activeTab === cap.id;
							const Icon = cap.icon;

							return (
								<div
									key={cap.id}
									className="group border-border/40 border-t py-6 transition-colors duration-300 last:border-b"
								>
									<button
										type="button"
										onClick={() => setActiveTab(cap.id)}
										className="flex w-full items-start justify-between gap-4 text-left focus:outline-none"
									>
										<div className="flex gap-4">
											<div
												className={cn(
													"mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-none border transition-colors duration-200",
													isActive
														? "border-primary/30 bg-primary/10 text-primary"
														: "border-border bg-muted/20 text-muted-foreground group-hover:border-foreground/20 group-hover:text-foreground",
												)}
											>
												<Icon className="h-4 w-4" />
											</div>
											<span
												className={cn(
													"font-semibold text-base leading-snug tracking-tight transition-colors duration-200 sm:text-lg",
													isActive
														? "text-foreground"
														: "text-muted-foreground group-hover:text-foreground",
												)}
											>
												{cap.title}
											</span>
										</div>

										<div
											className={cn(
												"mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-none border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground/20 group-hover:text-foreground",
												isActive &&
													"rotate-180 border-primary/30 bg-primary/5 text-primary",
											)}
										>
											{isActive ? (
												<Minus className="h-3 w-3" />
											) : (
												<Plus className="h-3 w-3" />
											)}
										</div>
									</button>

									{/* Smooth Height Expand Accordion */}
									<div
										className={cn(
											"grid overflow-hidden transition-all duration-300 ease-out-strong",
											isActive
												? "mt-4 grid-rows-[1fr] pl-11 opacity-100"
												: "grid-rows-[0fr] opacity-0",
										)}
									>
										<div className="overflow-hidden">
											<p className="max-w-[45ch] text-pretty text-foreground/80 text-sm leading-relaxed">
												{cap.description}
											</p>
											<p className="mt-2 max-w-[45ch] text-pretty text-muted-foreground text-xs leading-relaxed">
												{cap.subtext}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Right Column: Dynamic Micro-Element Visual */}
					<div className="flex items-center justify-center lg:col-span-7">
						<div className="relative flex aspect-square w-full max-w-xl items-center justify-center overflow-hidden border border-border bg-[#030303] p-6 shadow-2xl sm:p-10">
							{/* Outer Grid Overlay */}
							<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

							{/* Dynamic Interactive Visuals */}
							{activeTab === "soc" && <SocVisual />}
							{activeTab === "vapt" && <VaptVisual />}
							{activeTab === "grc" && <GrcVisual />}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ─────────────────────────────────────────────────────────────────────────────
   TAB 1 VISUAL: 24/7 Managed SOC (The Guardian Core)
   ───────────────────────────────────────────────────────────────────────────── */
function SocVisual() {
	const [activeNodes, setActiveNodes] = useState<number[]>([0, 2]);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveNodes((prev) => {
				const count = Math.floor(Math.random() * 3) + 1;
				const next: number[] = [];
				while (next.length < count) {
					const r = Math.floor(Math.random() * 5);
					if (!next.includes(r)) next.push(r);
				}
				return next;
			});
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="anim-fade-up relative flex h-full w-full items-center justify-center">
			{/* Glowing central core representing the Security Operations Core */}
			<div className="absolute flex items-center justify-center">
				<div className="flex h-28 w-28 animate-pulse items-center justify-center rounded-full border border-primary/30 bg-primary/5 shadow-[0_0_50px_rgba(0,98,227,0.15)] dark:shadow-[0_0_50px_rgba(0,105,235,0.15)]" />
				<div className="absolute h-16 w-16 animate-pulse rounded-full bg-linear-to-tr from-primary to-blue-400 opacity-30 blur-xl" />
				<div className="absolute flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-foreground text-background">
					<Activity className="h-4 w-4 animate-pulse text-primary" />
				</div>
			</div>

			{/* Connected Rays & Floating Telemetry Panels */}
			<svg
				className="pointer-events-none absolute inset-0 h-full w-full"
				viewBox="0 0 400 400"
			>
				<defs>
					<linearGradient id="ray-grad" x1="0.5" y1="1" x2="0.5" y2="0">
						<stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
						<stop offset="100%" stopColor="#00f2fe" stopOpacity="0.8" />
					</linearGradient>
				</defs>

				{/* Connecting Pulse Lines */}
				{[
					{ x: 80, y: 100 },
					{ x: 320, y: 90 },
					{ x: 330, y: 280 },
					{ x: 70, y: 290 },
					{ x: 200, y: 40 },
				].map((target, idx) => {
					const isActive = activeNodes.includes(idx);
					return (
						<g key={idx}>
							{/* Background Static Connection Path */}
							<line
								x1="200"
								y1="200"
								x2={target.x}
								y2={target.y}
								stroke="var(--primary)"
								strokeWidth="1"
								strokeDasharray="4 4"
								className="opacity-20 transition-all duration-500"
							/>

							{/* Active Dynamic Flow Ingestion Stream */}
							{isActive && (
								<line
									x1="200"
									y1="200"
									x2={target.x}
									y2={target.y}
									stroke="url(#ray-grad)"
									strokeWidth="2"
									strokeDasharray="8 12"
									className="anim-pulse-flow opacity-80"
								/>
							)}

							{/* Telemetry Sensor Node Beacon */}
							{isActive && (
								<g>
									<circle cx={target.x} cy={target.y} r="3" fill="#00f2fe" />
									<circle
										cx={target.x}
										cy={target.y}
										r="8"
										fill="none"
										stroke="#00f2fe"
										strokeWidth="1"
										className="animate-ping opacity-35"
									/>
								</g>
							)}
						</g>
					);
				})}
			</svg>

			{/* Translucent floating telemetry panels representing client assets */}
			<div className="absolute top-[18%] left-[8%] select-none rounded-none border border-border/60 bg-[#08080b]/90 px-3 py-2 font-mono text-[10px] tracking-wider shadow-lg transition-all duration-300 hover:border-foreground/20">
				<p className="font-bold text-foreground">AWS WORKLOADS</p>
				<p className="mt-1 text-emerald-500">● SECURE</p>
			</div>

			<div className="absolute top-[14%] right-[8%] select-none rounded-none border border-border/60 bg-[#08080b]/90 px-3 py-2 font-mono text-[10px] tracking-wider shadow-lg transition-all duration-300 hover:border-foreground/20">
				<p className="font-bold text-foreground">SOC SENSOR #07</p>
				<p className="mt-1 text-blue-400">94.3K EPS</p>
			</div>

			<div className="absolute right-[6%] bottom-[16%] select-none rounded-none border border-border/60 bg-[#08080b]/90 px-3 py-2 font-mono text-[10px] tracking-wider shadow-lg transition-all duration-300 hover:border-foreground/20">
				<p className="font-bold text-foreground">THREAT INDEX</p>
				<p className="mt-1 font-bold text-primary">0.02 (LOW)</p>
			</div>

			<div className="absolute bottom-[20%] left-[5%] select-none rounded-none border border-primary/20 bg-[#08080b]/90 px-3 py-2 font-mono text-[10px] tracking-wider shadow-lg transition-all duration-300 hover:border-foreground/20">
				<p className="font-bold text-foreground">ENDPOINT SENSORS</p>
				<p className="mt-1 text-[#00f2fe]">● ACTIVE</p>
			</div>

			<div className="absolute top-[4%] left-1/2 -translate-x-1/2 select-none rounded-none border border-border/60 bg-[#08080b]/90 px-3 py-1.5 font-mono text-[9px] tracking-wider shadow-lg">
				<span className="text-muted-foreground">
					REAL-TIME INGESTION IN PROGRESS
				</span>
			</div>
		</div>
	);
}

/* ─────────────────────────────────────────────────────────────────────────────
   TAB 2 VISUAL: Offensive VAPT (Exploit Graph Simulation)
   ───────────────────────────────────────────────────────────────────────────── */
function VaptVisual() {
	const [activeStep, setActiveStep] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % 4);
		}, 2500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="anim-fade-up relative flex h-full w-full flex-col items-center justify-center">
			{/* Network Attack Nodes Graph */}
			<div className="relative flex h-4/5 w-full items-center justify-center">
				<svg
					className="pointer-events-none absolute inset-0 h-full w-full"
					viewBox="0 0 400 300"
				>
					<defs>
						<linearGradient id="exploit-grad" x1="0" y1="0" x2="1" y2="1">
							<stop
								offset="0%"
								stopColor="var(--destructive)"
								stopOpacity="0.1"
							/>
							<stop
								offset="50%"
								stopColor="var(--destructive)"
								stopOpacity="0.7"
							/>
							<stop
								offset="100%"
								stopColor="var(--primary)"
								stopOpacity="0.1"
							/>
						</linearGradient>
					</defs>

					{/* Attack Paths */}
					<g stroke="white" strokeWidth="1" strokeOpacity="0.15">
						<line x1="50" y1="150" x2="150" y2="80" />
						<line x1="50" y1="150" x2="150" y2="220" />
						<line x1="150" y1="80" x2="250" y2="150" />
						<line x1="150" y1="220" x2="250" y2="150" />
						<line x1="250" y1="150" x2="350" y2="150" />
					</g>

					{/* Animated Vulnerability Attack Vector Path */}
					{activeStep >= 1 && (
						<path
							d={
								activeStep === 1
									? "M50,150 L150,80"
									: activeStep === 2
										? "M50,150 L150,80 L250,150"
										: "M50,150 L150,80 L250,150 L350,150"
							}
							fill="none"
							stroke="url(#exploit-grad)"
							strokeWidth="2.5"
							className="transition-all duration-700 ease-in-out"
						/>
					)}

					{/* Target Node Highlights */}
					{[
						{ x: 50, y: 150, label: "Entry" },
						{ x: 150, y: 80, label: "Pivot" },
						{ x: 150, y: 220, label: "Sandbox" },
						{ x: 250, y: 150, label: "Asset" },
						{ x: 350, y: 150, label: "Target", target: true },
					].map((node, idx) => {
						const isCompleted = activeStep >= idx;
						return (
							<g key={idx}>
								<circle
									cx={node.x}
									cy={node.y}
									r={node.target ? "10" : "6"}
									fill={
										isCompleted
											? node.target
												? "var(--destructive)"
												: "var(--primary)"
											: "#1c1c1f"
									}
									stroke={
										isCompleted
											? node.target
												? "var(--destructive)"
												: "var(--primary)"
											: "#3a3a3c"
									}
									strokeWidth="2"
									className="transition-all duration-500"
								/>
								{isCompleted && (
									<circle
										cx={node.x}
										cy={node.y}
										r={node.target ? "18" : "12"}
										fill="none"
										stroke={
											node.target ? "var(--destructive)" : "var(--primary)"
										}
										strokeWidth="1.5"
										className="animate-ping opacity-30"
									/>
								)}
								<text
									x={node.x}
									y={node.y + (node.target ? 28 : 20)}
									fill="currentColor"
									fontSize="8"
									className="text-center font-medium font-mono text-muted-foreground"
									textAnchor="middle"
								>
									{node.label.toUpperCase()}
								</text>
							</g>
						);
					})}
				</svg>
			</div>

			{/* Exploit Progress Code Terminal overlay */}
			<div className="mt-2 w-full select-none rounded-none border border-border/60 bg-[#08080b]/90 p-4 font-mono text-[10px] tracking-wide shadow-lg">
				<div className="mb-2 flex items-center justify-between border-border/40 border-b pb-2">
					<span className="font-bold text-destructive">
						● VAPT SIMULATOR ACTIVE
					</span>
					<span className="text-[8px] text-muted-foreground">PORT 443</span>
				</div>
				<div className="space-y-1">
					<p className="text-primary">
						$ ./exploit_payload --host 192.168.1.105
					</p>
					<p
						className={cn(
							"transition-all duration-300",
							activeStep >= 1 ? "text-[#00f2fe]" : "text-muted-foreground/30",
						)}
					>
						{activeStep >= 1
							? "▶ [STAGE 1] Entry verified. Buffer bounds overrun. "
							: "⌛ [STAGE 1] Scanning vectors..."}
					</p>
					<p
						className={cn(
							"transition-all duration-300",
							activeStep >= 2 ? "text-emerald-500" : "text-muted-foreground/30",
						)}
					>
						{activeStep >= 2
							? "▶ [STAGE 2] Memory footprint alignment success. Pivoting..."
							: "⌛ [STAGE 2] Pivot stage pending..."}
					</p>
					<p
						className={cn(
							"transition-all duration-300",
							activeStep >= 3
								? "font-semibold text-destructive"
								: "text-muted-foreground/30",
						)}
					>
						{activeStep >= 3
							? "▶ [STAGE 3] SYSTEM PRIVILEGES ESCALATED. FLAG READ SUCCESSFULLY."
							: "⌛ [STAGE 3] Target compromise verification..."}
					</p>
				</div>
			</div>
		</div>
	);
}

/* ─────────────────────────────────────────────────────────────────────────────
   TAB 3 VISUAL: Continuous GRC (The Compliance Shield)
   ───────────────────────────────────────────────────────────────────────────── */
function GrcVisual() {
	return (
		<div className="anim-fade-up relative flex h-full w-full flex-col items-center justify-center">
			{/* Compliance Circular Shield System */}
			<div className="relative flex h-3/5 w-full items-center justify-center">
				{/* Inner Glowing Shield Container */}
				<div className="absolute flex items-center justify-center">
					{/* Animated Outer Concentric Rings */}
					<div className="h-44 w-44 animate-[spin_12s_linear_infinite] rounded-full border border-emerald-500/15 bg-transparent" />
					<div className="absolute h-32 w-32 animate-[spin_8s_linear_infinite_reverse] rounded-full border border-emerald-500/20 border-dashed bg-transparent" />
					<div className="absolute flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.1)]" />
					<CheckCircle2 className="absolute h-8 w-8 stroke-[1.5] text-emerald-500" />
				</div>
			</div>

			{/* Compliance Framework Scorecards Grid */}
			<div className="mt-4 grid w-full grid-cols-3 gap-3">
				{[
					{
						name: "SOC 2 Type II",
						status: "Operational",
						progress: "100%",
						color: "text-blue-500 border-blue-500/20 bg-blue-500/5",
					},
					{
						name: "ISO 27001:2022",
						status: "Certified",
						progress: "100%",
						color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/5",
					},
					{
						name: "PCI-DSS v4.0",
						status: "Compliant",
						progress: "100%",
						color: "text-amber-500 border-amber-500/20 bg-amber-500/5",
					},
				].map((fw) => (
					<div
						key={fw.name}
						className={cn(
							"flex select-none flex-col justify-between rounded-none border px-3 py-3 font-mono text-[10px] tracking-wide transition-all duration-300",
							fw.color,
						)}
					>
						<div>
							<p className="truncate text-center font-bold text-foreground">
								{fw.name}
							</p>
							<p className="mt-1.5 text-center font-semibold text-[8px] uppercase tracking-widest">
								{fw.status}
							</p>
						</div>
						<div className="mt-2.5 flex items-center justify-between border-current/10 border-t pt-2 font-bold text-[8px]">
							<span>CONTROLS</span>
							<span>{fw.progress}</span>
						</div>
					</div>
				))}
			</div>

			{/* Continuous Evidence Collection status logs */}
			<div className="mt-4 w-full select-none rounded-none border border-border/60 bg-[#08080b]/90 p-4 font-mono text-[9px] tracking-wide shadow-lg">
				<div className="mb-2 flex items-center justify-between border-border/40 border-b pb-2 text-primary">
					<span className="font-bold">● CONTINUOUS COMPLIANCE ENGINE</span>
					<span className="animate-pulse">● FEED ACTIVE</span>
				</div>
				<div className="space-y-1.5 text-muted-foreground">
					<p className="flex items-center gap-2">
						<span className="text-emerald-500">✔</span> [04:12] IAM password
						policy checklist verification passed.
					</p>
					<p className="flex items-center gap-2">
						<span className="text-emerald-500">✔</span> [05:30] AWS cloudtrail
						audit logs snapshot captured & encrypted.
					</p>
					<p className="flex items-center gap-2">
						<span className="text-emerald-500">✔</span> [06:45] Vulnerability
						assessment scan run signed by VAPT key.
					</p>
				</div>
			</div>
		</div>
	);
}
