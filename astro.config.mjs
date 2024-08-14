import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import { presetAttributify, presetIcons, presetUno } from 'unocss';
import { presetIkun, getCSSPreflights, getSafeList } from '@ikun-ui/preset';
import * as Unocss from 'unocss/vite';

// https://astro.build/config
export default defineConfig({
    // site: 'https://stargazers.club',
    integrations: [vue(), react(), svelte(), sitemap()],
    vite: {
        plugins: [
            ...Unocss.default({
                presets: [
                    presetAttributify({}),
                    presetUno(),
                    presetIcons(),
                    presetIkun()
                ],
                safelist: [...getSafeList()],
                preflights: [
                    {
                        layer: 'base',
                        getCSS: () => `:root {${getCSSPreflights()}}`
                    }
                ]
            }),
        ]
    },
});