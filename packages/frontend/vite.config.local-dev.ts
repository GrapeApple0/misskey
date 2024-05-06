import dns from 'dns';
import { readFile } from 'node:fs/promises';
import { defineConfig } from 'vite';
import * as yaml from 'js-yaml';
import locales from '../../locales/index.js';
import { getConfig } from './vite.config.js';

dns.setDefaultResultOrder('ipv4first');

const defaultConfig = getConfig();

const { port } = yaml.load(await readFile('../../.config/default.yml', 'utf-8'));

const httpUrl = `http://localhost:${port}/`;
const websocketUrl = `ws://localhost:${port}/`;

const devConfig = {
	// 基本の設定は vite.config.js から引き継ぐ
	...defaultConfig,
	root: 'src',
	publicDir: '../assets',
	base: './',
	server: {
		host: 'localhost',
		port: 5173,
		proxy: {
			'/api': {
				changeOrigin: true,
				target: httpUrl,
			},
			'/assets': httpUrl,
			'/static-assets': httpUrl,
			'/client-assets': httpUrl,
			'/files': httpUrl,
			'/twemoji': httpUrl,
			'/fluent-emoji': httpUrl,
			'/sw.js': httpUrl,
			'/streaming': {
				target: websocketUrl,
				ws: true,
			},
			'/favicon.ico': httpUrl,
			'/identicon': {
				target: httpUrl,
				rewrite(path) {
					return path.replace('@localhost:5173', '');
				},
			},
			'/url': httpUrl,
			'/proxy': httpUrl,
			'/emoji': httpUrl,
			'/_info_card_': httpUrl,
			'/bios': httpUrl,
			'/cli': httpUrl,
			'/inbox': httpUrl,
			'/notes': {
				target: httpUrl,
				headers: {
					'Accept': 'application/activity+json',
				},
			},
			'/users': {
				target: httpUrl,
				headers: {
					'Accept': 'application/activity+json',
				},
			},
			'/.well-known': {
				target: httpUrl,
			},
		},
	},
	build: {
		...defaultConfig.build,
		rollupOptions: {
			...defaultConfig.build?.rollupOptions,
			input: 'index.html',
		},
	},
};

export default defineConfig(({ command, mode }) => devConfig);

