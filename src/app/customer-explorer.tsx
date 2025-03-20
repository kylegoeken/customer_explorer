"use client"

import { useState, useEffect } from "react"
import { CustomerList } from "@/components/customer-list"
import { CustomerDetail } from "@/components/customer-detail"
import { CustomerFilters } from "@/components/customer-filters"
import type { Customer } from "@/types/customer"
import { fetchCustomers } from "@/lib/data"

export default function CustomerExplorer() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [filters, setFilters] = useState({
    name: "",
    organization: "",
    account: "",
    address: "",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCustomers()
        setCustomers(data)
        setFilteredCustomers(data)
      } catch (error) {
        console.error("Failed to fetch customers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCustomers()
  }, [])

  useEffect(() => {
    // Apply filters
    const filtered = customers.filter((customer) => {
      return (
        (filters.name === "" || customer.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.organization === "" ||
          customer.organization.toLowerCase().includes(filters.organization.toLowerCase())) &&
        (filters.account === "" || customer.accountNumber.toLowerCase().includes(filters.account.toLowerCase())) &&
        (filters.address === "" || customer.address.toLowerCase().includes(filters.address.toLowerCase())) &&
        (filters.email === "" || customer.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (filters.phone === "" || customer.phone.includes(filters.phone))
      )
    })

    setFilteredCustomers(filtered)
  }, [filters, customers])

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      name: "",
      organization: "",
      account: "",
      address: "",
      email: "",
      phone: "",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <CustomerFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      </div>
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 gap-6">
          <CustomerList
            customers={filteredCustomers}
            isLoading={isLoading}
            onSelectCustomer={handleSelectCustomer}
            selectedCustomerId={selectedCustomer?.id}
          />
          {selectedCustomer && <CustomerDetail customer={selectedCustomer} allCustomers={customers} />}
        </div>
      </div>
    </div>
  )
}

