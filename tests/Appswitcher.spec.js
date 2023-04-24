import { shallowMount, createLocalVue } from "@vue/test-utils";
import { Appswitcher } from "../src/components/index";
import Vuetify from 'vuetify';
import Vue from "vue";
import { vi } from "vitest";


global.fetch = vi.fn();

describe("Appswitcher.vue", () => {
  const localVue = createLocalVue()
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    global.fetch.mockReset();
  });

  it("Test Display Error Page", async () => {
    fetch.mockImplementation(() => Promise.reject("API is down"));
    let wrapper = shallowMount(Appswitcher, {
      localVue,
      vuetify,
      propsData: {
        baseUrl: "https://example.com",
        appswitcherDownText: "custom down text value"
      }
    });
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/actuator/health"
    );
    await Vue.nextTick();
    expect(wrapper.find("#appswitcher").text()).toContain(
      "custom down text value"
    );
    expect(wrapper.find("#appswitcher-iframe").exists()).toBe(false);
  });

  it("Test Display Frame", async () => {
    fetch.mockResolvedValue({
      ok: true
    });
    let wrapper = shallowMount(Appswitcher, {
      localVue,
      vuetify,
      propsData: {
        id: "custom-id",
        baseUrl: "https://example.com",
        width: "200",
        height: "250"
      }
    });
    await Vue.nextTick();
    await Vue.nextTick();
    await Vue.nextTick();
    const iframe = wrapper.find("#custom-id-iframe");
    expect(iframe.exists()).toBeTruthy();
    expect(iframe.attributes("src")).toBe("https://example.com");
    expect(iframe.attributes("width")).toBe("200");
    expect(iframe.attributes("height")).toBe("250");
  });

  it("Test Tags", async () => {
    let wrapper = shallowMount(Appswitcher, {
      localVue,
      vuetify,
      propsData: {
        baseUrl: "http://example.com",
        tags: ["rbs", "global"],
      },
    });
    expect(wrapper.vm.uriWithTags).toBe(
      "http://example.com/?tags=rbs,global"
    );
  });
});
