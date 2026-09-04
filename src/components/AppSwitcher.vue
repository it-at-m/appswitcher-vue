<script setup lang="ts">
import { mdiAlert, mdiApps } from "@mdi/js";
import { computed, defineOptions, onBeforeMount, ref, watch } from "vue";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  baseUrl?: string;
  id?: string;
  unavailableText?: string;
  tags?: string[];
  width?: string;
  height?: string;
  icon?: string;
}

const {
  baseUrl = undefined,
  id = "appswitcher",
  unavailableText = "Your apps could not be retrieved from appswitcher-server. Please try again later.",
  tags = [],
  width = "315",
  height = "300",
  icon = mdiApps,
} = defineProps<Props>();

const serverAvailable = ref(false);

async function isAvailable() {
  if (!baseUrl) {
    return;
  }

  const healthUrl = `${baseUrl}/actuator/health`;

  try {
    const response = await fetch(healthUrl);
    serverAvailable.value = response.ok;
  } catch (error) {
    serverAvailable.value = false;
    console.error(
      "Appswitcher: Error occurred while checking availability.",
      error
    );
  }

  console.debug(
    `Appswitcher: checked availability of ${healthUrl} - available: ${serverAvailable.value}`
  );
}

onBeforeMount(async () => {
  await isAvailable();
});

const uriWithTags = computed(() =>
  tags.length ? `${baseUrl}/?tags=${tags.join(",")}` : baseUrl
);

watch(
  () => baseUrl,
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
        <v-icon-btn
          v-bind="{ ...props, ...$attrs }"
          :icon="icon"
        />
      </slot>
    </template>
    <v-card
      :width="width"
      :height="height"
    >
      <iframe
        v-if="serverAvailable"
        :id="id + '-iframe'"
        title="Appswitcher Frame"
        :src="uriWithTags"
        class="border-0"
      />
      <div
        v-else
        class="d-flex flex-column align-center justify-center fill-height"
      >
        <v-icon
          :icon="mdiAlert"
          color="red"
          size="large"
          class="mb-4"
        />
        <v-card-text class="flex-grow-0 text-center">
          {{ unavailableText }}
        </v-card-text>
      </div>
    </v-card>
  </v-menu>
</template>
