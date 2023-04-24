<script setup lang="ts">
import { reactive, ref } from "vue";
import { Appswitcher } from "./components/index";
import { vuetify } from "./vuetify";



const defaultState = {
  baseUrl: "",
  appswitcherDownHeader: "appswitcher-server is not available",
  appswitcherDownText: "Your apps could not be retrieved from appswitcher-server. Please try again later.",
  width: "315",
  height: "300",
  icon: "mdi-apps",
  tags: () => []
};

const configDrawer = ref(true);

const state = reactive({
  baseUrl: defaultState.baseUrl,
  appswitcherDownHeader: defaultState.appswitcherDownHeader,
  appswitcherDownText: defaultState.appswitcherDownText,
  width: defaultState.width,
  height: defaultState.height,
  icon: defaultState.icon,
  tags: defaultState.tags
});


function resetDemoSettings() {
  Object.assign(state, defaultState);
  toggleDarkMode();
}


function toggleDarkMode() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    console.log("change default light to dark theme");
    // need to set 0 sec timeout to set the dark more after mounted event, due to some bug in the framework
    setTimeout(() => (vuetify.framework.theme.dark = true), 0);
  }
}

toggleDarkMode();
</script>

<template>
  <v-app>
    <v-app-bar app clipped-left clipped-right>
      <v-avatar size="32"><img src="./assets/logo.png" /></v-avatar>
      <v-toolbar-title class="ps-2">Appswitcher - Demo Page</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="configDrawer = !configDrawer">
        <v-icon>mdi-cog</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <v-row class="ma-8">
                  <Appswitcher :base-url="state.baseUrl" :icon="state.icon" :width="state.width" :height="state.height" />
                </v-row>
              </v-card-text>
              <v-card-actions>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="configDrawer" app right clipped width="30em">
      <v-card>
        <v-card-text>
          <v-text-field v-model="state.baseUrl" label="Base-URL" dense />
          <v-text-field v-model="state.icon" label="MDI Icon" dense />
          <v-text-field v-model="state.width" label="Width" dense />
          <v-text-field v-model="state.height" label="Height" dense />
          <v-divider />
          <v-switch v-model="vuetify.framework.theme.dark" dense label="Dark Mode"></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="primary" @click="resetDemoSettings"><v-icon>mdi-refresh</v-icon>Reset settings</v-btn>
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
