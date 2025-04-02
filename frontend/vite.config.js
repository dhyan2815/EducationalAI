import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  'process.env' : process.env, //expose env variables
  plugins: [react(), tailwindcss()],
});
