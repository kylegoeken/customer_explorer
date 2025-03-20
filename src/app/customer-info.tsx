"use client"

import type React from "react"

import type { Customer } from "@/types/customer"
import { Building, CreditCard, MapPin, Mail, Phone, Calendar, Tag } from "lucide-react"

interface CustomerInfoProps {
  customer: Customer
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-2xl font-semibold">{customer.name}</h3>
        <p className="text-muted-foreground">Customer ID: {customer.id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem icon={<Building className="h-5 w-5" />} label="Organization" value={customer.organization} />

        <InfoItem icon={<CreditCard className="h-5 w-5" />} label="Account Number" value={customer.accountNumber} />

        <InfoItem icon={<MapPin className="h-5 w-5" />} label="Address" value={customer.address} />

        <InfoItem icon={<Mail className="h-5 w-5" />} label="Email" value={customer.email} />

        <InfoItem icon={<Phone className="h-5 w-5" />} label="Phone" value={customer.phone} />

        <InfoItem
          icon={<Calendar className="h-5 w-5" />}
          label="Customer Since"
          value={new Date(customer.customerSince).toLocaleDateString()}
        />

        <InfoItem icon={<Tag className="h-5 w-5" />} label="Status" value={customer.status} isStatus />
      </div>

      {customer.notes && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Notes</h4>
          <div className="p-3 bg-muted rounded-md text-sm">{customer.notes}</div>
        </div>
      )}
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
  isStatus?: boolean
}

function InfoItem({ icon, label, value, isStatus }: InfoItemProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="flex items-start space-x-3">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        {isStatus ? (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
            {value}
          </span>
        ) : (
          <p className="font-medium">{value}</p>
        )}
      </div>
    </div>
  )
}

