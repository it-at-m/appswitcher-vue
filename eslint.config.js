import globals from "globals";
import jsEslintConfig from "@eslint/js";
import vuePrettierEslintConfigSkipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import { ESLint } from "eslint";
import vueEslintConfig from "eslint-plugin-vue";
import vuetify from "eslint-plugin-vuetify";
import { globalIgnores } from "eslint/config";

export default defineConfigWithVueTs(
  ESLint.defaultConfig,
  jsEslintConfig.configs.recommended,
  vueEslintConfig.configs["flat/recommended"],
  vuetify.configs["flat/base"],
  vueTsConfigs.recommended,
  vuePrettierEslintConfigSkipFormatting,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  globalIgnores([
    "dist",
    "dist-demo",
    "target",
    "coverage",
    "node_modules",
    "env.d.ts",
    "src/vite-env.d.ts",
  ])
);
