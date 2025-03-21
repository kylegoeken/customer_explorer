"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CustomerInfo from "@/components/customer-info"
import CustomerConnections from "@/components/customer-connections"
import type { Customer } from "@/types/customer"

interface CustomerDetailProps {
  customer: Customer
  allCustomers: Customer[]
  onSelectCustomer: (customer: Customer) => void
}

export default function CustomerDetail({ customer, allCustomers, onSelectCustomer }: CustomerDetailProps) {
  if (!customer) return null

  return (
    <Card className="p-4">
      <Tabs defaultValue="info">
        <div className="bg-[#F7F6FB] p-1 rounded-lg mb-4">
          <TabsList className="grid w-full grid-cols-2 !bg-transparent !p-0 gap-1">
            <TabsTrigger 
              value="info"
              className="rounded-md px-6 py-2 text-[#71717A] 
                data-[state=active]:bg-[#1C0E52] 
                data-[state=active]:text-white 
                transition-colors"
            >
              Customer Info
            </TabsTrigger>
            <TabsTrigger 
              value="connections"
              className="rounded-md px-6 py-2 text-[#71717A] 
                data-[state=active]:bg-[#1C0E52] 
                data-[state=active]:text-white 
                transition-colors"
            >
              Connections
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4">
          <TabsContent value="info">
            <CustomerInfo customer={customer} />
          </TabsContent>

          <TabsContent value="connections">
            <CustomerConnections 
              customer={customer} 
              allCustomers={allCustomers} 
              onSelectCustomer={onSelectCustomer}
            />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  )
}

