// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig(({ mode }) => {
//   // Load env file based on `mode` (e.g., development, production)
//   const env = loadEnv(mode, process.cwd());

//   return {
//     plugins: [react()],
//     server: {
//       proxy: {
//         '/api': {
//           target: env.VITE_API_BASE_URL, // ✅ Correct here
//           changeOrigin: true,
//           secure: false,
//         },
//       },
//     },
//     resolve: {
//       alias: {
//         '@': path.resolve(__dirname, 'src'),
//       },
//     },
//   };
// });
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist', // default, make sure it's used in Vercel
    },
  };
});
