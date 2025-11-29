import { describe, expect, it } from "vitest"

import {
  defaultColumnResizeMode,
  defaultColumnSizing,
  defaultPageSize,
  defaultTableState,
} from "../table-config"

describe("table-config", () => {
  it("exposes sensible defaults", () => {
    expect(defaultColumnResizeMode).toBe("onChange")
    expect(defaultPageSize).toBeGreaterThan(0)
    expect(defaultColumnSizing.minSize).toBeLessThan(
      defaultColumnSizing.maxSize
    )
  })

  it("sets pagination defaults", () => {
    expect(defaultTableState.pagination?.pageIndex).toBe(0)
    expect(defaultTableState.pagination?.pageSize).toBe(defaultPageSize)
  })
})
