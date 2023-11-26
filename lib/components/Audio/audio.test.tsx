import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Audio } from "./index";

describe("AtButton", () => {
  it("should render", async () => {
    const label = "test button";
    render(<Audio audioSrc="" />);
    expect(screen.getByText(label)).toBeDefined();
  });
});
