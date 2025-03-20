"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomerInfo } from "./customer-info"
import { CustomerConnections } from "./customer-connections"
import { Search, Filter, X } from "lucide-react"
import { useState } from "react"
import type { Customer, Connection, ConnectionType } from "@/types/customer"

// Mock data
const mockCustomer = {
  id: "1",
  name: "John Smith",
  email: "john@example.com",
  phone: "(555) 123-4567",
  address: "123 Main St, City, State 12345",
  organization: "Acme Corp",
  accountNumber: "ACM-001",
  status: "Active"
}

// Update mockCustomers to include connections
const mockCustomers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Austin, TX 78701",
    organization: "Acme Corp",
    accountNumber: "ACM-001",
    status: "Active",
    connections: [
      {
        type: "Same Organization",
        description: "Works in the same department",
        customerId: "2"
      },
      {
        type: "Business Partner",
        description: "Collaborating on Project Alpha",
        customerId: "4"
      },
      {
        type: "Vendor",
        description: "Primary contact for software services",
        customerId: "8"
      }
    ]
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@techinc.com",
    phone: "(555) 234-5678",
    address: "456 Oak St, Austin, TX 78702",
    organization: "Tech Inc",
    accountNumber: "TEC-002",
    status: "Active",
    connections: [
      {
        type: "Same Organization",
        description: "Team lead in the same department",
        customerId: "1"
      },
      {
        type: "Business Partner",
        description: "Collaborating on Project Beta",
        customerId: "3"
      },
      {
        type: "Vendor",
        description: "Hardware supplier contact",
        customerId: "4"
      },
      {
        type: "Same Organization",
        description: "Works on cross-functional initiatives",
        customerId: "5"
      }
    ]
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@gammallc.com",
    phone: "(555) 345-6789",
    address: "789 Pine St, Houston, TX 77001",
    organization: "Gamma LLC",
    accountNumber: "GAM-003",
    status: "Inactive"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@deltagroup.com",
    phone: "(555) 456-7890",
    address: "321 Elm St, San Antonio, TX 78205",
    organization: "Delta Group",
    accountNumber: "DEL-004",
    status: "Active"
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "r.wilson@epsilontech.com",
    phone: "(555) 567-8901",
    address: "654 Maple Ave, Fort Worth, TX 76102",
    organization: "Epsilon Tech",
    accountNumber: "EPS-005",
    status: "Active"
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "l.anderson@zetasys.com",
    phone: "(555) 678-9012",
    address: "987 Cedar Blvd, Austin, TX 78702",
    organization: "Zeta Systems",
    accountNumber: "ZET-006",
    status: "Inactive"
  },
  {
    id: "7",
    name: "David Martinez",
    email: "d.martinez@etainc.com",
    phone: "(555) 789-0123",
    address: "741 Birch Ln, Dallas, TX 75202",
    organization: "Eta Inc",
    accountNumber: "ETA-007",
    status: "Active"
  },
  {
    id: "8",
    name: "Jennifer Taylor",
    email: "j.taylor@thetagroup.com",
    phone: "(555) 890-1234",
    address: "852 Walnut St, Houston, TX 77002",
    organization: "Theta Group",
    accountNumber: "THE-008",
    status: "Active"
  },
  {
    id: "9",
    name: "William Clark",
    email: "w.clark@iotacorp.com",
    phone: "(555) 901-2345",
    address: "963 Spruce Dr, San Antonio, TX 78206",
    organization: "Iota Corp",
    accountNumber: "IOT-009",
    status: "Inactive"
  },
  {
    id: "10",
    name: "Amanda White",
    email: "a.white@kappatech.com",
    phone: "(555) 012-3456",
    address: "159 Pine St, Fort Worth, TX 76103",
    organization: "Kappa Tech",
    accountNumber: "KAP-010",
    status: "Active"
  }
]

// Add connections property to all other customers (empty array if no connections)
mockCustomers.forEach(customer => {
  if (!customer.connections) {
    customer.connections = []
  }
})

export default function CustomerExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    name: "",
    organization: "",
    account: "",
    address: "",
    email: "",
    phone: "",
    status: ""
  })
  const [selectedCustomer, setSelectedCustomer] = useState(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const customerId = params?.get('customer')
    if (customerId) {
      const customer = mockCustomers.find(c => c.id === customerId)
      if (customer) return customer
    }
    return mockCustomers[0]
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredCustomers = mockCustomers.filter(customer => {
    return (
      (filters.name ? customer.name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
      (filters.organization ? customer.organization.toLowerCase().includes(filters.organization.toLowerCase()) : true) &&
      (filters.account ? customer.accountNumber.toLowerCase().includes(filters.account.toLowerCase()) : true) &&
      (filters.address ? customer.address.toLowerCase().includes(filters.address.toLowerCase()) : true) &&
      (filters.email ? customer.email.toLowerCase().includes(filters.email.toLowerCase()) : true) &&
      (filters.phone ? customer.phone.includes(filters.phone) : true) &&
      (filters.status ? customer.status === filters.status : true)
    )
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      name: "",
      organization: "",
      account: "",
      address: "",
      email: "",
      phone: "",
      status: ""
    })
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div key={selectedCustomer.id} className="grid gap-4">
      {/* Search and Filters Toggle */}
      <div className="flex gap-4 items-center mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E4E4E7] rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
              hover:border-[#1C0E52] transition-colors bg-white"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-[#E4E4E7] rounded-lg
            hover:border-[#1C0E52] transition-colors bg-white"
        >
          <Filter className="h-4 w-4 text-[#71717A]" />
          <span className="text-[#71717A]">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#1C0E52] text-white text-xs rounded-full px-2 py-0.5">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <Card className="p-4 mb-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-[#1C0E52]">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-[#71717A] hover:text-[#1C0E52] flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#71717A]">Name</label>
              <input
                type="text"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="w-full px-3 py-1.5 border border-[#E4E4E7] rounded-md
                  focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
                  text-sm"
                placeholder="Filter by name..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#71717A]">Organization</label>
              <input
                type="text"
                value={filters.organization}
                onChange={(e) => handleFilterChange('organization', e.target.value)}
                className="w-full px-3 py-1.5 border border-[#E4E4E7] rounded-md
                  focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
                  text-sm"
                placeholder="Filter by organization..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#71717A]">Account</label>
              <input
                type="text"
                value={filters.account}
                onChange={(e) => handleFilterChange('account', e.target.value)}
                className="w-full px-3 py-1.5 border border-[#E4E4E7] rounded-md
                  focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
                  text-sm"
                placeholder="Filter by account..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#71717A]">Address</label>
              <input
                type="text"
                value={filters.address}
                onChange={(e) => handleFilterChange('address', e.target.value)}
                className="w-full px-3 py-1.5 border border-[#E4E4E7] rounded-md
                  focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
                  text-sm"
                placeholder="Filter by address..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#71717A]">Email</label>
              <input
                type="text"
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                className="w-full px-3 py-1.5 border border-[#E4E4E7] rounded-md
                  focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
                  text-sm"
                placeholder="Filter by email..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#71717A]">Phone</label>
              <input
                type="text"
                value={filters.phone}
                onChange={(e) => handleFilterChange('phone', e.target.value)}
                className="w-full px-3 py-1.5 border border-[#E4E4E7] rounded-md
                  focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
                  text-sm"
                placeholder="Filter by phone..."
              />
            </div>
          </div>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Customer Table */}
        <Card className="col-span-5 overflow-hidden">
          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full">
              <thead className="bg-[#F7F6FB] border-b border-[#E4E4E7] sticky top-0">
                <tr>
                  <th className="text-left text-sm font-medium text-[#71717A] px-6 py-3">Name</th>
                  <th className="text-left text-sm font-medium text-[#71717A] px-6 py-3">Organization</th>
                  <th className="text-left text-sm font-medium text-[#71717A] px-6 py-3">Email</th>
                  <th className="text-left text-sm font-medium text-[#71717A] px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4E7]">
                {filteredCustomers.map((customer) => (
                  <tr 
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className={`cursor-pointer hover:bg-[#F7F6FB] transition-colors
                      ${selectedCustomer.id === customer.id ? 'bg-[#F7F6FB]' : ''}`}
                  >
                    <td className="px-6 py-4 text-[#1C0E52] font-medium">{customer.name}</td>
                    <td className="px-6 py-4 text-[#71717A]">{customer.organization}</td>
                    <td className="px-6 py-4 text-[#71717A]">{customer.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                        ${customer.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Customer Details */}
        {selectedCustomer && (
          <Card className="col-span-7 p-4">
            <Tabs defaultValue="info">
              <div className="bg-[#F7F6FB] p-1 rounded-lg mb-4">
                <TabsList className="grid w-full grid-cols-2 !bg-transparent !p-0 gap-1">
                  <TabsTrigger 
                    value="info"
                    className="rounded-md px-6 py-2 text-[#71717A] data-[state=active]:bg-white data-[state=active]:text-[#1C0E52] data-[state=active]:shadow-sm transition-colors"
                  >
                    Customer Info
                  </TabsTrigger>
                  <TabsTrigger 
                    value="connections"
                    className="rounded-md px-6 py-2 text-[#71717A] data-[state=active]:bg-white data-[state=active]:text-[#1C0E52] data-[state=active]:shadow-sm transition-colors"
                  >
                    Connections
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="mt-4">
                <TabsContent value="info">
                  <CustomerInfo customer={selectedCustomer} />
                </TabsContent>

                <TabsContent value="connections">
                  <CustomerConnections 
                    customer={selectedCustomer} 
                    allCustomers={mockCustomers} 
                    onSelectCustomer={setSelectedCustomer}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  )
}

