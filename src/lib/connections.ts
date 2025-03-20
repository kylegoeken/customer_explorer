import type { Customer } from "@/types/customer"

export interface CustomerConnection {
  customer: Customer
  type: string
  description: string
}

export function findCustomerConnections(
  customer: Customer,
  allCustomers: Customer[]
): CustomerConnection[] {
  // This is a sample implementation - replace with your actual connection logic
  return allCustomers
    .filter(c => c.id !== customer.id)
    .filter(c => c.organization === customer.organization)
    .map(c => ({
      customer: c,
      type: "Same Organization",
      description: `${c.name} is in the same organization (${c.organization})`
    }))
}

// Find bidirectional connections
export function findBidirectionalConnections(customers: Customer[]): Array<{
  customer1: Customer
  customer2: Customer
  type1: string
  type2: string
}> {
  const bidirectionalConnections = []

  for (const customer1 of customers) {
    if (!customer1.connections) continue

    for (const connection of customer1.connections) {
      const customer2 = customers.find((c) => c.id === connection.customerId)
      if (!customer2 || !customer2.connections) continue

      const reverseConnection = customer2.connections.find((c) => c.customerId === customer1.id)
      if (reverseConnection) {
        bidirectionalConnections.push({
          customer1,
          customer2,
          type1: connection.type,
          type2: reverseConnection.type,
        })
      }
    }
  }

  return bidirectionalConnections
}

