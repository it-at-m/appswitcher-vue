<script setup lang="ts">
import { mdiApps } from "@mdi/js";
import { computed, onBeforeMount, ref, watch } from "vue";

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

const componentProps: Props = withDefaults(defineProps<Props>(), {
  baseUrl: undefined,
  id: "appswitcher",
  appswitcherDownHeader: "appswitcher-server is not available",
  appswitcherDownText:
    "Your apps could not be retrieved from appswitcher-server. Please try again later.",
  width: "315",
  height: "300",
  icon: undefined,
  tags: () => [],
});

const appAvailable = ref(false);

async function isAvailable() {
  let available = false;
  if (componentProps.baseUrl !== undefined) {
    try {
      const response = await fetch(componentProps.baseUrl + "/actuator/health");
      if (response.ok) {
        available = true;
      }
    } catch (error) {
      // no-op
    }
    appAvailable.value = available;
    console.log(
      "Appswitcher: checked availability of " +
        componentProps.baseUrl +
        "/actuator/health - available: " +
        appAvailable.value
    );
  }
}

onBeforeMount(async () => {
  await isAvailable();
});

const uriWithTags = computed(() => {
  if (componentProps.tags?.length === 0) {
    return componentProps.baseUrl;
  } else {
    return componentProps.baseUrl + "/?tags=" + componentProps.tags?.join(",");
  }
});

watch(
  () => componentProps.baseUrl,
  async () => {
    await isAvailable();
  }
);

defineExpose({ uriWithTags });
</script>

<template>
  <v-menu
    :id="id"
    eager
  >
    <template #activator="{ props }">
      <slot
        name="activator"
        :props="props"
      >
        <v-btn icon
          ><div
            v-if="icon == undefined || icon == ''"
            style="width: 24px; height: 24px"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              :d="mdiApps"
              fill="currentColor"
            >
              <path :d="mdiApps" />
            </svg>
          </div>
          <v-icon
            v-else
            :icon="icon"
          />
        </v-btn>
      </slot>
    </template>
    <v-card v-if="appAvailable">
      <iframe
        :id="id + '-iframe'"
        frameborder="0"
        :src="uriWithTags"
        :width="width"
        :height="height"
      />
    </v-card>
    <v-card
      v-else
      :width="width"
      :height="height"
    >
      <v-card-title>{{ componentProps.appswitcherDownHeader }}</v-card-title>
      <v-card-text>{{ componentProps.appswitcherDownText }}</v-card-text>
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
