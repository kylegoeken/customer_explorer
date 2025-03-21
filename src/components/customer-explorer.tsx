"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CustomerInfo from "@/components/customer-info"
import CustomerConnections from "@/components/customer-connections"
import { Search, Filter, X } from "lucide-react"
import { useState, useEffect } from "react"
import type { Customer, Connection, ConnectionType } from "@/types/customer"
import CustomerDetail from "@/components/customer-detail"

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
const mockCustomers: Customer[] = [
  {
    id: "1",
    customerId: "0013k00003Pr12jAAB",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Austin, TX 78701",
    organization: "Acme Corp",
    accountNumber: "ACM-001",
    status: "Active",
    creditScore: 785,
    tin: "84-4833647",
    connections: [
      {
        type: "Organization Member" as ConnectionType,
        description: "Board Member since 2022",
        customerId: "2"
      },
      {
        type: "Business Partner" as ConnectionType,
        description: "Collaborating on Project Alpha",
        customerId: "4"
      },
      {
        type: "Vendor" as ConnectionType,
        description: "Primary contact for software services",
        customerId: "8"
      }
    ]
  },
  {
    id: "2",
    customerId: "0013k00003Pr13kAAC",
    name: "Sarah Johnson",
    email: "sarah.johnson@techinc.com",
    phone: "(555) 234-5678",
    address: "456 Oak St, Austin, TX 78702",
    organization: "Tech Inc",
    accountNumber: "TEC-002",
    status: "Active",
    creditScore: 720,
    tin: "85-3922556",
    connections: [
      {
        type: "Organization Member" as ConnectionType,
        description: "Executive Director",
        customerId: "1"
      },
      {
        type: "Organization Member" as ConnectionType,
        description: "Advisory Board Member",
        customerId: "3"
      },
      {
        type: "Business Partner" as ConnectionType,
        description: "Strategic Partnership Lead",
        customerId: "4"
      }
    ]
  },
  {
    id: "3",
    name: "Michael Brown",
    customerId: "0013k00003Pr14lAAD",
    email: "m.brown@gammallc.com",
    phone: "(555) 345-6789",
    address: "789 Pine St, Houston, TX 77001",
    organization: "Gamma LLC",
    accountNumber: "GAM-003",
    status: "Inactive",
    creditScore: 650,
    tin: "86-2938445",
    connections: [
      {
        type: "Business Partner" as ConnectionType,
        description: "Joint venture on Project Omega",
        customerId: "2"
      },
      {
        type: "Vendor" as ConnectionType,
        description: "Provides consulting services",
        customerId: "5"
      }
    ]
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@deltagroup.com",
    phone: "(555) 456-7890",
    address: "321 Elm St, San Antonio, TX 78205",
    organization: "Delta Group",
    accountNumber: "DEL-004",
    status: "Active",
    creditScore: 810,
    tin: "87-5647382",
    connections: [
      {
        type: "Business Partner" as ConnectionType,
        description: "Strategic alliance partner",
        customerId: "1"
      },
      {
        type: "Vendor" as ConnectionType,
        description: "Technology service provider",
        customerId: "6"
      }
    ]
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "r.wilson@epsilontech.com",
    phone: "(555) 567-8901",
    address: "654 Maple Ave, Fort Worth, TX 76102",
    organization: "Epsilon Tech",
    accountNumber: "EPS-005",
    status: "Active",
    creditScore: 745,
    tin: "88-9283746",
    connections: [
      {
        type: "Same Organization" as ConnectionType,
        description: "Department head",
        customerId: "2"
      },
      {
        type: "Business Partner" as ConnectionType,
        description: "Co-development project",
        customerId: "7"
      }
    ]
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "l.anderson@zetasys.com",
    phone: "(555) 678-9012",
    address: "987 Cedar Blvd, Austin, TX 78702",
    organization: "Zeta Systems",
    accountNumber: "ZET-006",
    status: "Inactive",
    creditScore: 680,
    tin: "89-1029384",
    connections: [
      {
        type: "Vendor" as ConnectionType,
        description: "Software integration partner",
        customerId: "4"
      },
      {
        type: "Business Partner" as ConnectionType,
        description: "Research collaboration",
        customerId: "8"
      }
    ]
  },
  {
    id: "7",
    name: "David Martinez",
    email: "d.martinez@etainc.com",
    phone: "(555) 789-0123",
    address: "741 Birch Ln, Dallas, TX 75202",
    organization: "Eta Inc",
    accountNumber: "ETA-007",
    status: "Active",
    creditScore: 790,
    tin: "90-7654321",
    connections: [
      {
        type: "Business Partner" as ConnectionType,
        description: "Innovation project lead",
        customerId: "5"
      },
      {
        type: "Guarantor" as ConnectionType,
        description: "Loan guarantor",
        customerId: "2"
      }
    ]
  },
  {
    id: "8",
    name: "Jennifer Taylor",
    email: "j.taylor@thetagroup.com",
    phone: "(555) 890-1234",
    address: "852 Walnut St, Houston, TX 77002",
    organization: "Theta Group",
    accountNumber: "THE-008",
    status: "Active",
    creditScore: 735,
    tin: "91-2345678",
    connections: [
      {
        type: "Vendor" as ConnectionType,
        description: "Cloud services provider",
        customerId: "1"
      },
      {
        type: "Business Partner" as ConnectionType,
        description: "Market research partnership",
        customerId: "6"
      }
    ]
  },
  {
    id: "9",
    name: "William Clark",
    email: "w.clark@iotacorp.com",
    phone: "(555) 901-2345",
    address: "963 Spruce Dr, San Antonio, TX 78206",
    organization: "Iota Corp",
    accountNumber: "IOT-009",
    status: "Inactive",
    creditScore: 640,
    tin: "92-8765432",
    connections: [
      {
        type: "Same Organization" as ConnectionType,
        description: "Team member",
        customerId: "7"
      },
      {
        type: "Business Partner" as ConnectionType,
        description: "Product development",
        customerId: "10"
      }
    ]
  },
  {
    id: "10",
    name: "Amanda White",
    email: "a.white@kappatech.com",
    phone: "(555) 012-3456",
    address: "159 Pine St, Fort Worth, TX 76103",
    organization: "Kappa Tech",
    accountNumber: "KAP-010",
    status: "Active",
    creditScore: 825,
    tin: "93-1357924",
    connections: [
      {
        type: "Business Partner" as ConnectionType,
        description: "AI research collaboration",
        customerId: "9"
      },
      {
        type: "Vendor" as ConnectionType,
        description: "Hardware supplier",
        customerId: "3"
      }
    ]
  }
]

// Quick way to update all remaining customers
mockCustomers.forEach((customer, index) => {
  if (!customer.creditScore) {
    customer.creditScore = 600 + Math.floor(Math.random() * 300) // Random score between 600-900
  }
  if (!customer.customerId) {
    customer.customerId = `0013k00003Pr${(index + 15).toString()}mAA${String.fromCharCode(65 + index)}`
  }
  if (!customer.tin) {
    // Generate random TIN in format XX-XXXXXXX
    const prefix = Math.floor(Math.random() * 90 + 10) // 10-99
    const suffix = Math.floor(Math.random() * 9000000 + 1000000) // 7 digits
    customer.tin = `${prefix}-${suffix}`
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
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(mockCustomers[0])
  const [showFilters, setShowFilters] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  const filteredCustomers = mockCustomers.filter(customer => {
    // Search term filtering
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = searchTerm === "" || (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.organization.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.accountNumber.toLowerCase().includes(searchLower) ||
      (customer.customerId?.toLowerCase().includes(searchLower) || false) ||
      (customer.tin?.toLowerCase().includes(searchLower) || false)
    )

    // Filters filtering
    const matchesName = !filters.name || customer.name.toLowerCase().includes(filters.name.toLowerCase())
    const matchesOrg = !filters.organization || customer.organization.toLowerCase().includes(filters.organization.toLowerCase())
    const matchesAccount = !filters.account || customer.accountNumber.toLowerCase().includes(filters.account.toLowerCase())
    const matchesAddress = !filters.address || customer.address.toLowerCase().includes(filters.address.toLowerCase())
    const matchesEmail = !filters.email || customer.email.toLowerCase().includes(filters.email.toLowerCase())
    const matchesPhone = !filters.phone || customer.phone.toLowerCase().includes(filters.phone.toLowerCase())
    const matchesStatus = !filters.status || customer.status.toLowerCase() === filters.status.toLowerCase()

    // Return true only if all conditions are met
    return matchesSearch && 
           matchesName && 
           matchesOrg && 
           matchesAccount && 
           matchesAddress && 
           matchesEmail && 
           matchesPhone && 
           matchesStatus
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
    <div key="customer-explorer" className="grid gap-4">
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
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors
            ${showFilters 
              ? 'bg-[#1C0E52] text-white border-[#1C0E52]' 
              : 'bg-white border-[#E4E4E7] hover:border-[#1C0E52]'
            }`}
        >
          <Filter className={`h-4 w-4 ${showFilters ? 'text-white' : 'text-[#71717A]'}`} />
          <span className={showFilters ? 'text-white' : 'text-[#71717A]'}>Filters</span>
          {activeFilterCount > 0 && (
            <span className={`text-xs rounded-full px-2 py-0.5 
              ${showFilters 
                ? 'bg-white text-[#1C0E52]' 
                : 'bg-[#1C0E52] text-white'
              }`}>
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
        <Card className="col-span-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E4E4E7]">
            <h3 className="text-lg font-medium text-[#1C0E52]">Recent Searches</h3>
          </div>
          <div className="overflow-x-auto max-h-[1000px]">
            <table className="w-full">
              <thead className="bg-[#E4E4E7] border-b border-[#E4E4E7] sticky top-0">
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
                    className={`border-b border-[#E4E4E7] cursor-pointer hover:bg-[#F7F6FB] transition-colors
                      ${selectedCustomer?.id === customer.id ? 'bg-[#F7F6FB]' : ''}`}
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
          <div className="col-span-6">
            <CustomerDetail 
              customer={selectedCustomer}
              allCustomers={mockCustomers}
              onSelectCustomer={setSelectedCustomer}
            />
          </div>
        )}
      </div>
    </div>
  )
}

