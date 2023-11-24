/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins

// Types
import type { App } from "vue";

import vuetify from "./vuetify";

export function registerPlugins(app: App) {
  app.use(vuetify);
}
