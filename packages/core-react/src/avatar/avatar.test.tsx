import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("renders image and fallback", () => {
    const { getByText } = render(
      <Avatar>
        <AvatarImage src="/avatar.png" alt="User" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
    expect(getByText("CN")).toBeInTheDocument();
  });
});

describe("Avatar accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/avatar.png" alt="User" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
