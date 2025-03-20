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
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <User className="h-5 w-5 mr-2" />
          Customer Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="info">Information</TabsTrigger>
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

