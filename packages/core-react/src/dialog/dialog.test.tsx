import { describe, it, expect } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "./dialog";

describe("Dialog", () => {
  it("opens and closes content on trigger click", () => {
    const { getByText, queryByText } = render(
      <Dialog>
        <DialogTrigger>Buka Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Judul Modal</DialogTitle>
          <DialogDescription>Isi dialog modal</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(queryByText("Judul Modal")).not.toBeInTheDocument();
    fireEvent.click(getByText("Buka Dialog"));
    expect(getByText("Judul Modal")).toBeInTheDocument();
  });

  it("passes axe-core accessibility when open", async () => {
    const { container } = render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>A11y Dialog</DialogTitle>
          <DialogDescription>Description text</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
