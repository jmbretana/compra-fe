import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_"] });

console.log("Loaded env vars:", publicVars);

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      REACT_APP_API_URL: JSON.stringify(
        process.env.REACT_APP_API_URL ||
          "https://appsalve-api.netlify.app/.netlify/functions/api"
      ),
    },
  },
});
