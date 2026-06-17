"use client";
import { useEffect, useRef } from "react";

declare global {
	interface Window {
		turnstile?: {
			render: (
				container: string | HTMLElement,
				params: {
					sitekey: string;
					theme?: "light" | "dark" | "auto";
					callback?: (token: string) => void;
					"expired-callback"?: () => void;
					"error-callback"?: () => void;
				},
			) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId?: string) => void;
		};
	}
}

interface TurnstileWidgetProps {
	onVerify: (token: string) => void;
	onExpire?: () => void;
}

let scriptLoadPromise: Promise<void> | null = null;

export function TurnstileWidget({ onVerify, onExpire }: TurnstileWidgetProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);
	const hasRendered = useRef(false);

	useEffect(() => {
		const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
		if (!siteKey) {
			console.error(
				"❌ Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY environment variable",
			);
			return;
		}
		if (!containerRef.current) {
			console.error("❌ Turnstile container ref not available");
			return;
		}

		// Prevent duplicate renders in the same container
		if (hasRendered.current) {
			console.warn(
				"⚠️ Turnstile widget already rendered in this container, skipping",
			);
			return;
		}

		const render = () => {
			if (!window.turnstile) {
				console.error("❌ Turnstile API not loaded");
				return;
			}

			if (!containerRef.current) {
				console.error("❌ Container lost, cannot render");
				return;
			}

			// Safety check: don't render if already rendered
			if (hasRendered.current) {
				console.warn("⚠️ Already rendered, skipping duplicate render");
				return;
			}

			try {
				widgetIdRef.current = window.turnstile.render(containerRef.current, {
					sitekey: siteKey,
					theme: "dark",
					callback: (token: string) => {
						console.log(
							"✅ Turnstile verified with token:",
							token.substring(0, 10) + "...",
						);
						onVerify(token);
					},
					"expired-callback": () => {
						console.log("⏰ Turnstile token expired");
						onExpire?.();
					},
					"error-callback": () => {
						console.error("❌ Turnstile error occurred");
						console.error(
							"This usually means: 1) Invalid site key, 2) Domain not whitelisted in Turnstile dashboard, or 3) Network issue",
						);
					},
				});
				hasRendered.current = true;
				console.log("✅ Turnstile widget rendered successfully");
			} catch (error) {
				console.error("❌ Error rendering Turnstile widget:", error);
			}
		};

		const loadScript = async () => {
			if (window.turnstile) {
				console.log("✅ Turnstile already loaded in window");
				render();
				return;
			}

			if (!scriptLoadPromise) {
				scriptLoadPromise = new Promise((resolve) => {
					const script = document.createElement("script");
					script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
					script.async = true;
					script.defer = true;

					script.onload = () => {
						console.log("✅ Turnstile script loaded from CDN");
						resolve();
					};

					script.onerror = () => {
						console.error("❌ Failed to load Turnstile script from CDN");
						scriptLoadPromise = null;
						resolve();
					};

					document.head.appendChild(script);
				});
			}

			await scriptLoadPromise;

			// Wait a tick for turnstile to be available
			await new Promise((resolve) => setTimeout(resolve, 50));

			if (window.turnstile) {
				render();
			} else {
				console.error("❌ Turnstile still not available after script load");
			}
		};

		loadScript();

		return () => {
			if (window.turnstile && widgetIdRef.current) {
				try {
					window.turnstile.remove(widgetIdRef.current);
					console.log("✅ Turnstile widget cleaned up");
					hasRendered.current = false;
				} catch (error) {
					console.error("❌ Error removing Turnstile widget:", error);
				}
			}
		};
	}, [onVerify, onExpire]);

	return <div ref={containerRef} className="mt-2" />;
}
