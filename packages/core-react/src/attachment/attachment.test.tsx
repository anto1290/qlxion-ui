import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Attachment } from "./attachment";

describe("Attachment", () => {
  it("renders attachment file name and size", () => {
    const { getByText } = render(<Attachment name="document.pdf" size="2.4 MB" />);
    expect(getByText("document.pdf")).toBeInTheDocument();
    expect(getByText("2.4 MB")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const handleRemove = vi.fn();
    const { getByLabelText } = render(<Attachment name="photo.jpg" onRemove={handleRemove} />);
    fireEvent.click(getByLabelText("Hapus lampiran photo.jpg"));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});

describe("Attachment accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(<Attachment name="document.pdf" size="2.4 MB" />);
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
