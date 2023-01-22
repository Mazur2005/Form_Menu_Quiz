import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
	root,
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				form: resolve(root, "./Form/form.html"),
				menu: resolve(root, "./Menu/menu.html"),
				quiz: resolve(root, "./Quiz/quiz.html"),
			},
		},
	},
	server: {
		open: "/Form/form.html",
	},
	base: "./",
});
