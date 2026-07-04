export const VERSION = Date.now();

export const isDevelopment = process.env.NODE_ENV === "production";

export const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL ||
	(isDevelopment
		? "http://localhost:3001"
		: "https://portfolio-neon-three-4ccjzq9p4z.vercel.app");

// export const API_BASE_URL = "https://admin.talktoayo.xyz/api/public";

export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL ||
	(isDevelopment
		? "http://localhost:3000/api/public"
		: // : "http://localhost:8080");
			"https://portfolio-cms-peach.vercel.app/api/public");
