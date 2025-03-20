export interface Customer {
  id: string
  name: string
  organization: string
  accountNumber: string
  address: string
  email: string
  phone: string
  customerSince: string
  status: string
  notes?: string
  connections?: Array<{
    customerId: string
    type: string
  }>
}

