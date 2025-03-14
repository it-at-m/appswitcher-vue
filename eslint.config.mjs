import vuePrettierEslintConfigSkipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import vuetify from "eslint-plugin-vuetify";

export default [
  ...pluginVue.configs["flat/base"],
  ...vueTsEslintConfig({
    extends: [
      // By default, only the recommended rules are enabled.
      "recommended",
    ],
    ...vuetify.configs["flat/base"],
    ...vuePrettierEslintConfigSkipFormatting,
  }),
  {
    ignores: [
      "dist",
      "dist-demo",
      "target",
      "coverage",
      "node_modules",
      "env.d.ts",
      "src/vite-env.d.ts",
    ],
  },
];

// export default defineConfigWithVueTs(
//   //   ...ESLint.defaultConfig,
//   // js.configs.recommended,
//   ...pluginVue.configs["flat/recommended"],
//   vuetify.configs["flat/base"],
//   vueTsConfigs.recommended,
//   vuePrettierEslintConfigSkipFormatting,
//   {
//     ignores: [
//       "dist",
//       "dist-demo",
//       "target",
//       "coverage",
//       "node_modules",
//       "env.d.ts",
//     ],
//   }
// );
