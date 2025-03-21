export type ConnectionType = "Same Organization" | "Business Partner" | "Vendor" | "Guarantor" | "Organization Member"

export interface Connection {
  type: ConnectionType
  description: string
  customerId: string
}

export interface Customer {
  id: string
  customerId: string
  name: string
  email: string
  phone: string
  address: string
  organization: string
  accountNumber: string
  status: string
  creditScore: number
  tin: string
  connections: Connection[]
} 