import Address from "../value-object/address"
import Customer from "./customer"

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John Doe")
    }).toThrowError("Id is required")
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "")
    }).toThrowError("Name is required")
  })

  it("should change name", () => {
    const customer = new Customer("123", "John Doe")

    customer.changeName("Jane Doe")
    
    expect(customer.name).toBe("Jane Doe")
  })

  it("should activate customer", () => {
    const customer = new Customer("123", "John Doe")
    const address = new Address("Street 1", 123, "12345-678", "São Paulo")
    customer.Address = address

    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it("should throw error when address is undefined when activate a customer", () => {
    const customer = new Customer("123", "John Doe")
    expect(() => {
      customer.activate()
    }).toThrowError("Address is mandatory to activate a customer")
  })
  
  it("should deactivate customer", () => {
    const customer = new Customer("123", "John Doe")
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it("should add reward points", () => {
    const customer = new Customer("123", "John Doe")
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(100)
    expect(customer.rewardPoints).toBe(100)
  })
})