import { Sequelize } from "sequelize-typescript"
import Order from "../../../../domain/checkout/entity/order"
import OrderItem from "../../../../domain/checkout/entity/order-item"
import Address from "../../../../domain/customer/value-object/address"
import Customer from "../../../../domain/customer/entity/customer"
import Product from "../../../../domain/product/entity/product"
import CustomerModel from "../../../customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository"
import ProductModel from "../../../product/repository/sequelize/product.model"
import ProductRepository from "../../../product/repository/sequelize/product.repository"
import OrderItemModel from "./order-item.model"
import OrderModel from "./order.model"
import OrderRepository from "./order.repository"

describe("Order repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 123, "Zipcode 1", "City 1")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    )

    const order = new Order("1", "123", [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: "1" },
      include: ["items"],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "123",
      total: 20,
      items: [
        {
          id: "1",
          product_id: "123",
          order_id: "1",
          quantity: 2,
          price: 10
        },
      ],
    })
  })
})
