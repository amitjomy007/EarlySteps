import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vercel from 'vite-plugin-vercel';
 

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // This makes sure env variables are available in Vite config and plugins.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: process.env.PORT as unknown as number,
    },
    plugins: [vercel(),react(), mode === "development" && componentTagger()].filter(
      Boolean
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Optionally, expose env to define
    define: {
      "process.env": env,
    },
  };
});
