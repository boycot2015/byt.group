import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import vue from "@astrojs/vue";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

// import * as Unocss from 'unocss/vite';
import UnoCSS from 'unocss/astro';
import { presetAttributify, presetIcons, presetUno } from 'unocss';
import { presetIkun, getCSSPreflights, getSafeList } from '@ikun-ui/preset';

// https://astro.build/config
export default defineConfig({
    site: 'https://web-group.boycot.top/',
    server: {
        port: 8000,
        // host: '192.168.5.105',
    },
    integrations: [
        vue(),
        react(),
        svelte(),
        UnoCSS({
            presets: [
                presetAttributify({}),
                presetUno(),
                presetIcons(),
                presetIkun('@ikun-ui/preset', '#1677ff')
            ],
            safelist: [...getSafeList()],
            preflights: [
                {
                    layer: 'base',
                    getCSS: () => `:root {${getCSSPreflights()}}`
                }
            ]
        }),
        sitemap()
    ]
});