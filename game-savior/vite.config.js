import { defineConfig } from 'vite';
import ViteReact from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [ViteReact()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.football-data.org/v4/competitions/CL',
        changeOrigin: true,
        headers: {
          'X-Auth-Token': '11476ea25dc240e3896d3c993c233c5f',
        },
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
