import Order from "./order"
import OrderItem from "./order-item"

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", [])
    }).toThrowError("Id is required")
  })

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", [])
    }).toThrowError("CustomerId is required")
  })

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("123", "123", [])
    }).toThrowError("Items are required")
  })

  it("should calculate total", () => {
    const item = new OrderItem("1", "1", "Item 1", 100, 1)
    const item2 = new OrderItem("2", "2", "Item 2", 200, 2)
    const order = new Order("1", "123", [item, item2])

    expect(order.total()).toBe(500)
  })

  it("should check if the item quantity is greater than zero", () => {
    expect(() => {
      const item = new OrderItem("1", "1", "Item 1", 100, 0)
      const order = new Order("1", "123", [item])
    }).toThrowError("Quantity must be greater than zero")
  })
})
