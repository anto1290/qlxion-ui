import { describe, it, expect } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

describe("Accordion", () => {
  it("expands and collapses item content", () => {
    const { getByText, queryByText } = render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Bagian 1</AccordionTrigger>
          <AccordionContent>Konten 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(queryByText("Konten 1")).not.toBeInTheDocument();
    fireEvent.click(getByText("Bagian 1"));
    expect(getByText("Konten 1")).toBeInTheDocument();
  });
});

describe("Accordion accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Bagian 1</AccordionTrigger>
          <AccordionContent>Konten 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
