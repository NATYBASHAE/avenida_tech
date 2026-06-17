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
		if (!siteKey || !containerRef.current || hasRendered.current) return;

		const render = () => {
			if (!window.turnstile || !containerRef.current || hasRendered.current) return;

			try {
				widgetIdRef.current = window.turnstile.render(containerRef.current, {
					sitekey: siteKey,
					theme: "dark",
					callback: (token: string) => {
						onVerify(token);
					},
					"expired-callback": () => {
						onExpire?.();
					},
					"error-callback": () => {
						// Reset widget on error to allow retry
						if (widgetIdRef.current && window.turnstile) {
							window.turnstile.reset(widgetIdRef.current);
						}
					},
				});
				hasRendered.current = true;
			} catch {
				// Silently handle render errors - widget will retry on next render
			}
		};

		const loadScript = async () => {
			if (window.turnstile) {
				render();
				return;
			}

			if (!scriptLoadPromise) {
				scriptLoadPromise = new Promise((resolve) => {
					const script = document.createElement("script");
					script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
					script.async = true;
					script.defer = true;
					script.onload = () => resolve();
					script.onerror = () => {
						scriptLoadPromise = null;
						resolve();
					};
					document.head.appendChild(script);
				});
			}

			await scriptLoadPromise;
			await new Promise((resolve) => setTimeout(resolve, 50));

			if (window.turnstile) {
				render();
			}
		};

		loadScript();

		return () => {
			if (window.turnstile && widgetIdRef.current) {
				try {
					window.turnstile.remove(widgetIdRef.current);
					hasRendered.current = false;
				} catch {
					// Silently handle cleanup errors
				}
			}
		};
	}, [onVerify, onExpire]);

	return <div ref={containerRef} className="mt-2" />;
}
