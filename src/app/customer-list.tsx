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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className={`cursor-pointer ${selectedCustomerId === customer.id ? "bg-muted" : ""}`}
                    onClick={() => onSelectCustomer(customer)}
                  >
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.organization}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

