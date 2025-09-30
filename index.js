import { accessSync, constants as fsConstants } from "node:fs";
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";
import dictionary from "./importDictionary.js";
import { homedir } from "node:os";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { loadEnv } from "vite";

const virtualModuleId = "adminui";
const resolvedVirtualModuleId = "\0" + virtualModuleId;
let userConfig;

const getCdnUrl = (version, mode) => {
	// Vue 3 Development
	if (version === 3 && mode == "development") {
		return "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js";
	}
	// Vue 3 Production
	else if (version === 3) {
		return "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.min.js";
	}
	// Vue 2
	else {
		return "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.min.js";
	}
};

const resolveServer = (env) => {
	const watchOptions = {
		ignored: [
			"app/**",
			"database/**",
			"**/node_modules/**",
			"**/vendor/**",
			"packages/**",
			"public/**",
			"routes/**",
			"storage/**",
			"tests/**",
		],
	};

	const appUrl = env.APP_URL;
	const isLinux = process.platform === "linux";
	const isHttps = appUrl.startsWith("https");

	const serverConfig = {
		cors: true,
		watch: watchOptions,
	};

	// Resolve Valet-Linux HTTPS certificates
	if (isHttps && isLinux) {
		const appDomainURL = new URL(appUrl);
		const domain = appDomainURL.hostname;
		try {
			const home = homedir();
			const valetDir = join(home, ".valet", "Certificates");
			accessSync(`${valetDir}/${domain}.crt`, fsConstants.R_OK);
			serverConfig.host = env.VITE_SERVER_HOST ?? "127.0.0.1";
			serverConfig.https = {
				cert: readFileSync(`${valetDir}/${domain}.crt`),
				key: readFileSync(`${valetDir}/${domain}.key`),
			};
		} catch (err) {
			console.log("No certificate found for " + domain);
		}
	} else if (isHttps) {
		serverConfig.https = true;
		serverConfig.host = env.VITE_SERVER_HOST ?? "127.0.0.1";
	}

	return serverConfig;
};

export default function vitePluginAdminui({ version = "3", mode = "production" } = {}) {
	const vuePath = getCdnUrl(parseInt(version, 10), mode);
	const nodeEnv = process.env.NODE_ENV;
	const nodeHttpsMode = process.env.VITE_SERVER_HTTPS;

	return [
		{
			name: "vite-plugin-adminui",
			config(config, { mode }) {
				userConfig = config;
				const env = loadEnv(mode, userConfig.envDir || process.cwd(), "");

				return {
					resolve: {
						alias: {
							vue: vuePath,
						},
					},
					optimizeDeps: {
						exclude: ["vue"],
					},
					server: resolveServer(env),
				};
			},
			resolveId(id) {
				if (id === virtualModuleId) {
					return resolvedVirtualModuleId;
				}
			},
			load(id) {
				if (id === resolvedVirtualModuleId) {
					const intro = `const namespace = globalThis.$adminui;`;
					return dictionary.reduce((acc, curr) => {
						if (typeof curr === "object") {
							acc += `export const ${curr.as} = namespace.${curr.from};\n`;
						} else {
							acc += `export const ${curr} = namespace.${curr};\n`;
						}
						return acc;
					}, intro);
				}
			},
		},
		nodeEnv === "development" && nodeHttpsMode === "basic" ? viteBasicSslPlugin() : undefined,
	];
}
