<script setup lang="ts">
import { mdiCog } from "@mdi/js";
import { reactive, ref, watch } from "vue";
import { useTheme } from "vuetify";

import { AppSwitcher } from "./components/index";

const theme = useTheme();

const defaultState = {
  baseUrl: "",
  appswitcherDownHeader: "appswitcher-server is not available",
  appswitcherDownText:
    "Your apps could not be retrieved from appswitcher-server. Please try again later.",
  width: "315",
  height: "300",
  tags: () => [],
};

const configDrawer = ref(true);

const state = reactive({
  baseUrl: defaultState.baseUrl,
  appswitcherDownHeader: defaultState.appswitcherDownHeader,
  appswitcherDownText: defaultState.appswitcherDownText,
  width: defaultState.width,
  height: defaultState.height,
  tags: defaultState.tags,
});

function resetDemoSettings() {
  Object.assign(state, defaultState);
  toggleDarkMode();
}

const darkMode = ref(theme.global.current.value.dark);

function toggleDarkMode() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    console.log("change default light to dark theme");
    darkMode.value = true;
  }
}
watch(darkMode, () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
});

toggleDarkMode();
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-avatar size="32"><img src="./assets/logo.png" /></v-avatar>
      <v-toolbar-title class="ps-2">Appswitcher - Demo Page</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="configDrawer = !configDrawer">
        <v-icon :icon="mdiCog" />
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <v-row class="ma-8">
                  <app-switcher
                    :base-url="state.baseUrl"
                    :width="state.width"
                    :height="state.height"
                  />
                </v-row>
                <v-row class="ma-8">
                  <app-switcher
                    :base-url="state.baseUrl"
                    :width="state.width"
                    :height="state.height"
                  >
                    <template #activator="{ props }">
                      <v-btn v-bind="props">CUSTOM activator</v-btn>
                    </template>
                  </app-switcher>
                </v-row>
              </v-card-text>
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="configDrawer"
      location="right"
      width="30em"
    >
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="state.baseUrl"
            label="Base-URL"
            density="compact"
          />
          <v-text-field
            v-model="state.width"
            label="Width"
            density="compact"
          />
          <v-text-field
            v-model="state.height"
            label="Height"
            density="compact"
          />
          <v-divider />
          <v-switch
            v-model="darkMode"
            density="compact"
            label="Dark Mode"
          ></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="bg-primary"
            @click="resetDemoSettings"
            ><v-icon>mdi-refresh</v-icon>Reset settings</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
.textarea {
  font-size: 0.8em;
  line-height: normal;
}
</style>
