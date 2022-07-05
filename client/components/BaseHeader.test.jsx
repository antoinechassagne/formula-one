import { render, screen, within } from "@testing-library/react";
import BaseHeader from "./BaseHeader";

describe("BaseHeader component", () => {
  test("Should render correctly", () => {
    render(<BaseHeader />);
    expect(within(screen.getByRole("banner"))).toBeDefined();
  });
});
