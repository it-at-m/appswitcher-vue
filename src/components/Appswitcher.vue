<script setup lang="ts">
import { ref, useAttrs, computed, onBeforeMount } from "vue";

interface Props {
  baseUrl?: string;
  id?: string;
  appswitcherDownHeader?: any;
  appswitcherDownText?: string;
  tags?: string[];
  width?: string;
  height?: string;
  icon?: string;
}
const props: Props = withDefaults(defineProps<Props>(), {
  id: "appswitcher",
  appswitcherDownHeader: "appswitcher-server is not available",
  appswitcherDownText: "Your apps could not be retrieved from appswitcher-server. Please try again later.",
  width: "315",
  height: "300",
  icon: "mdi-apps",
  tags: () => []
});

const appAvailable = ref(false);

async function isAvailable() {
  try {
    const response = await fetch(props.baseUrl + "/actuator/health");
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

onBeforeMount(async () => {
  appAvailable.value = await isAvailable();
  console.log("Available: " + appAvailable.value);
})


const uriWithTags = computed(() => {
  if (props.tags?.length === 0) {
    return props.baseUrl;
  } else {
    return props.baseUrl + "/?tags=" + props.tags?.join(",");
  }
});

defineExpose({ uriWithTags });
</script>

<template>
  <v-menu eager :id="id" offset-y rounded="xl">
    <template v-slot:activator="{ on: on }">
      <v-btn :dark="$attrs.dark" icon v-on="on">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-card v-if="appAvailable">
      <iframe :id="id + '-iframe'" frameborder="0" :src="uriWithTags" :width="width" :height="height" />
    </v-card>
    <v-card v-else :width="width" :height="height">
      <v-card-title>{{ props.appswitcherDownHeader }}</v-card-title>
      <v-card-text>{{ props.appswitcherDownText }}</v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal;
  /* maybe !important  */
}
</style>
