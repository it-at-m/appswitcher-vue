import { shallowMount } from "@vue/test-utils";
import { AppSwitcher } from "../src/components/index";
import { nextTick } from "vue";
import { createVuetify } from "vuetify";
import { beforeEach, describe, it, vi, expect } from "vitest";
import { config } from "@vue/test-utils";

// see https://test-utils.vuejs.org/migration/#shallowMount-and-renderStubDefaultSlot
config.global.renderStubDefaultSlot = true;

global.fetch = vi.fn();

describe("AppSwitcher.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify();
    global.fetch.mockReset();
  });

  it("Test Display Error Page", async () => {
    fetch.mockImplementation(() => Promise.reject("API is down"));
    let wrapper = shallowMount(AppSwitcher, {
      vuetify,
      props: {
        baseUrl: "https://example.com",
        appswitcherDownText: "custom down text value"
      }
    });
    expect(fetch).toHaveBeenCalledWith("https://example.com/actuator/health");
    await nextTick();

    expect(wrapper.find("#appswitcher").text()).toContain(
      "custom down text value"
    );
    expect(wrapper.find("#appswitcher-iframe").exists()).toBe(false);
  });

  it("Test Display Frame", async () => {
    fetch.mockResolvedValue({
      ok: true
    });
    let wrapper = shallowMount(AppSwitcher, {
      vuetify,
      props: {
        id: "custom-id",
        baseUrl: "https://example.com",
        width: "200",
        height: "250"
      }
    });
    expect(fetch).toHaveBeenCalledWith("https://example.com/actuator/health");
    await nextTick();
    await nextTick();
    await nextTick();
    console.log(wrapper.html());
    const iframe = wrapper.find("#custom-id-iframe");
    expect(iframe.exists()).toBeTruthy();
    expect(iframe.attributes("src")).toBe("https://example.com");
    expect(iframe.attributes("width")).toBe("200");
    expect(iframe.attributes("height")).toBe("250");
  });

  it("Test Tags", async () => {
    let wrapper = shallowMount(AppSwitcher, {
      vuetify,
      props: {
        baseUrl: "http://example.com",
        tags: ["rbs", "global"]
      }
    });
    expect(wrapper.vm.uriWithTags).toBe("http://example.com/?tags=rbs,global");
  });
});
