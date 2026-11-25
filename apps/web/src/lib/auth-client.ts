import { SERVER_URL } from "@selimsolutions/env/web";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: SERVER_URL,
});
