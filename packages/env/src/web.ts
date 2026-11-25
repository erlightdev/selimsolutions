import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_SERVER_URL: z.string().url().optional(),
	},
	runtimeEnv: (import.meta as any).env,
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});

const viteMetaEnv = (import.meta as unknown as { env?: { DEV?: boolean } }).env;

export const SERVER_URL = (
	env.VITE_SERVER_URL ??
	(typeof window !== "undefined" && !viteMetaEnv?.DEV
		? window.location.origin
		: "http://localhost:3000")
).replace(/\/$/, "");
