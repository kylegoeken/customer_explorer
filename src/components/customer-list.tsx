"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/types/customer"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { UserCircle } from "lucide-react"

interface CustomerListProps {
  customers: Customer[]
  isLoading: boolean
  onSelectCustomer: (customer: Customer) => void
  selectedCustomerId?: string
}

export function CustomerList({ customers, isLoading, onSelectCustomer, selectedCustomerId }: CustomerListProps) {
  if (isLoading) {
    return <CustomerListSkeleton />
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center">
            <UserCircle className="h-5 w-5 mr-2" />
            Customers
          </div>
          <Badge variant="outline">{customers.length} results</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {customers.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No customers found matching your filters.</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#71717A] uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#71717A] uppercase tracking-wider">Organization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#71717A] uppercase tracking-wider">Account</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#71717A] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr 
                      key={customer.id}
                      onClick={() => onSelectCustomer(customer)}
                      className={`
                        cursor-pointer transition-colors duration-150
                        hover:bg-[#F7F6FB]
                        ${selectedCustomerId === customer.id ? 'bg-[#F7F6FB]' : ''}
                      `}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[#1C0E52] font-medium hover:text-[#2d1875]">{customer.name}</div>
                        <div className="text-[#71717A] text-sm">{customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#71717A]">
                        {customer.organization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#71717A]">
                        {customer.accountNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`
                          px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${customer.status === 'Active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                        `}>
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CustomerListSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-[150px]" />
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-5 w-[180px]" />
                <Skeleton className="h-5 w-[100px]" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

