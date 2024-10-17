import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order-item"
import OrderService from "./order.service"

describe("Order Service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "Customer 1")
    const order_item1 = new OrderItem("1", "Item 1", "Product 1", 100, 1)
    const order_item2 = new OrderItem("2", "Item 2", "Product 2", 200, 1)
    
    const order = OrderService.placeOrder(customer, [order_item1, order_item2])

    expect(customer.rewardPoints).toBe(150)
    expect(order.total()).toBe(300)
  })

  it("should get total of all orders", () => {
    const order_item1 = new OrderItem("1", "Product 1", "Item 1", 100, 2)
    const order_item2 = new OrderItem("2", "Product 2", "Item 2", 200, 2)
    const order_item3 = new OrderItem("3", "Product 3", "Item 3", 300, 2)
    const order_item4 = new OrderItem("4", "Product 4", "Item 4", 400, 2)

    const order = new Order("1", "123", [order_item1, order_item2])
    const order2 = new Order("2", "123", [order_item3, order_item4])

    const total = OrderService.total([order, order2])

    expect(total).toBe(2000)
  })
})