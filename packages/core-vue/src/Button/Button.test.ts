import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import Button from "./Button.vue";

describe("Button", () => {
  describe("variants", () => {
    it.each([
      { variant: "default" as const, expectedClass: "bg-primary" },
      { variant: "destructive" as const, expectedClass: "bg-destructive" },
      { variant: "outline" as const, expectedClass: "border" },
      { variant: "ghost" as const, expectedClass: "hover:bg-accent" },
      { variant: "link" as const, expectedClass: "text-primary" },
    ])("renders $variant variant with correct classes", ({ variant, expectedClass }) => {
      const wrapper = mount(Button, { props: { variant } });
      const button = wrapper.find("button");
      expect(button.classes()).toContain(expectedClass);
    });

    it("defaults to default variant", () => {
      const wrapper = mount(Button);
      expect(wrapper.find("button").classes()).toContain("bg-primary");
    });
  });

  describe("sizes", () => {
    it.each([
      { size: "sm" as const, expectedClass: "h-8" },
      { size: "lg" as const, expectedClass: "h-10" },
      { size: "icon" as const, expectedClass: "w-9" },
      { size: "md" as const, expectedClass: "h-9" },
    ])("renders $size size with correct classes", ({ size, expectedClass }) => {
      const wrapper = mount(Button, { props: { size } });
      expect(wrapper.find("button").classes()).toContain(expectedClass);
    });

    it("defaults to md size", () => {
      const wrapper = mount(Button);
      expect(wrapper.find("button").classes()).toContain("h-9");
    });
  });

  describe("disabled state", () => {
    it("does not trigger click when disabled", async () => {
      const onClick = vi.fn();
      const wrapper = mount(Button, { props: { disabled: true }, attrs: { onClick } });
      await wrapper.find("button").trigger("click");
      expect(onClick).not.toHaveBeenCalled();
    });

    it("has aria-disabled when disabled", () => {
      const wrapper = mount(Button, { props: { disabled: true } });
      expect(wrapper.find("button").attributes("aria-disabled")).toBe("true");
    });

    it("is disabled", () => {
      const wrapper = mount(Button, { props: { disabled: true } });
      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });
  });

  describe("loading state", () => {
    it("sets aria-busy=true when loading", () => {
      const wrapper = mount(Button, { props: { loading: true } });
      expect(wrapper.find("button").attributes("aria-busy")).toBe("true");
    });

    it("is disabled when loading", () => {
      const wrapper = mount(Button, { props: { loading: true } });
      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });
  });

  describe("slot content", () => {
    it("renders slot content", () => {
      const wrapper = mount(Button, { slots: { default: "Click me" } });
      expect(wrapper.text()).toContain("Click me");
    });
  });
});

describe("Button accessibility", () => {
  it("passes axe-core accessibility check", async () => {
    const wrapper = mount(Button, { slots: { default: "Click" } });
    // Need to attach to document body for axe-core to find elements
    document.body.appendChild(wrapper.element);
    const results = (await axe.run(document.body)) as AxeResults;
    expect(results.violations).toEqual([]);
    document.body.removeChild(wrapper.element);
  });
});
