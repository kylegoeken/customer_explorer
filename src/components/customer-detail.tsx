"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/types/customer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerInfo } from "@/components/customer-info"
import { CustomerConnections } from "@/components/customer-connections"
import { User } from "lucide-react"

interface CustomerDetailProps {
  customer: Customer
  allCustomers: Customer[]
}

export function CustomerDetail({ customer, allCustomers }: CustomerDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <User className="h-5 w-5 mr-2" />
          {customer.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Customer Info</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <CustomerInfo customer={customer} />
          </TabsContent>
          
          <TabsContent value="connections">
            <CustomerConnections customer={customer} allCustomers={allCustomers} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

