import { describe, it, expect } from "vitest";
import Amount from "./index";
import AmountsComponent from "./Amounts";

describe("Amount Component", () => {
  it("should re-export the AmountsComponent", () => {
    expect(Amount).toBe(AmountsComponent);
  });
});
