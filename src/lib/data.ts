import type { Customer } from "@/types/customer"

// Mock data for demonstration purposes
const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "John Smith",
    organization: "Acme Corporation",
    accountNumber: "ACM-10023",
    address: "123 Main St, New York, NY 10001",
    email: "john.smith@acmecorp.com",
    phone: "(212) 555-1234",
    customerSince: "2020-03-15",
    status: "Active",
    notes: "Key decision maker for enterprise accounts",
    connections: [
      { customerId: "C002", type: "Colleague" },
      { customerId: "C005", type: "Business Partner" },
    ],
  },
  {
    id: "C002",
    name: "Sarah Johnson",
    organization: "Acme Corporation",
    accountNumber: "ACM-10024",
    address: "123 Main St, New York, NY 10001",
    email: "sarah.johnson@acmecorp.com",
    phone: "(212) 555-5678",
    customerSince: "2020-04-22",
    status: "Active",
    connections: [{ customerId: "C001", type: "Colleague" }],
  },
  {
    id: "C003",
    name: "Michael Brown",
    organization: "TechStart Inc",
    accountNumber: "TSI-5432",
    address: "456 Innovation Ave, San Francisco, CA 94107",
    email: "michael.brown@techstart.com",
    phone: "(415) 555-9876",
    customerSince: "2021-01-10",
    status: "Active",
    notes: "Interested in expanding services",
  },
  {
    id: "C004",
    name: "Emily Davis",
    organization: "Global Solutions LLC",
    accountNumber: "GSL-7890",
    address: "789 Enterprise Blvd, Chicago, IL 60601",
    email: "emily.davis@globalsolutions.com",
    phone: "(312) 555-4321",
    customerSince: "2019-11-05",
    status: "Inactive",
    connections: [{ customerId: "C007", type: "Former Colleague" }],
  },
  {
    id: "C005",
    name: "David Wilson",
    organization: "Innovate Partners",
    accountNumber: "INP-2468",
    address: "321 Venture St, Austin, TX 78701",
    email: "david.wilson@innovatepartners.com",
    phone: "(512) 555-1357",
    customerSince: "2022-02-18",
    status: "Active",
    connections: [
      { customerId: "C001", type: "Business Partner" },
      { customerId: "C006", type: "Investor" },
    ],
  },
  {
    id: "C006",
    name: "Jessica Martinez",
    organization: "Capital Ventures",
    accountNumber: "CAV-3579",
    address: "555 Finance Way, Boston, MA 02110",
    email: "jessica.martinez@capitalventures.com",
    phone: "(617) 555-2468",
    customerSince: "2021-07-30",
    status: "Active",
    connections: [{ customerId: "C005", type: "Investment" }],
  },
  {
    id: "C007",
    name: "Robert Taylor",
    organization: "Taylor Consulting",
    accountNumber: "TAC-9753",
    address: "987 Advisory Rd, Seattle, WA 98101",
    email: "robert.taylor@taylorconsulting.com",
    phone: "(206) 555-8642",
    customerSince: "2020-09-12",
    status: "Pending",
    connections: [{ customerId: "C004", type: "Former Colleague" }],
  },
  {
    id: "C008",
    name: "Amanda Clark",
    organization: "Digital Solutions",
    accountNumber: "DIS-1593",
    address: "246 Tech Park, Denver, CO 80202",
    email: "amanda.clark@digitalsolutions.com",
    phone: "(303) 555-7531",
    customerSince: "2022-04-05",
    status: "Active",
  },
  {
    id: "C009",
    name: "Thomas Lee",
    organization: "Innovative Tech",
    accountNumber: "INT-8642",
    address: "753 Innovation Dr, Portland, OR 97201",
    email: "thomas.lee@innovativetech.com",
    phone: "(503) 555-9753",
    customerSince: "2021-11-20",
    status: "Active",
    connections: [{ customerId: "C010", type: "Supplier" }],
  },
  {
    id: "C010",
    name: "Olivia White",
    organization: "White Enterprises",
    accountNumber: "WHE-2468",
    address: "159 Business Cir, Miami, FL 33101",
    email: "olivia.white@whiteenterprises.com",
    phone: "(305) 555-1593",
    customerSince: "2020-06-28",
    status: "Active",
    connections: [{ customerId: "C009", type: "Client" }],
  },
]

// Simulate API call with delay
export async function fetchCustomers(): Promise<Customer[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCustomers)
    }, 800)
  })
}

export async function fetchCustomerById(id: string): Promise<Customer | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCustomers.find((customer) => customer.id === id))
    }, 300)
  })
}

