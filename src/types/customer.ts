export type ConnectionType = 'Same Organization' | 'Business Partner' | 'Vendor' | 'Family Member'

export interface Connection {
  type: ConnectionType
  description: string
  customerId: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  organization: string
  accountNumber: string
  status: string
  connections?: Connection[]
} 