// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  site: 'https://veloriamag.com',
  output: 'static',
  outDir: './out',
  markdown: {
    processor: unified(),
  },
});
