import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";


// Replace with your repo name (with leading & trailing slash)
const REPO_BASE = "/janapriya3/";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
 // Use repo base only for production builds (GitHub Pages); keep `/` for dev server
 const base = mode === "production" ? REPO_BASE : "/";


 return {
   base:"/janapriya3",
   server: {
     host: "::",
     port: 8080,
   },
   plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
   resolve: {
     alias: {
       "@": path.resolve(__dirname, "./src"),
     },
   },
 };
});
