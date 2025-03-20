"use client"

import type React from "react"

import type { Customer } from "@/types/customer"
import { Building, CreditCard, MapPin, Mail, Phone, Calendar, Tag } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CustomerInfoProps {
  customer: Customer
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <div key={customer.id} className="grid gap-6">
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        <InfoItem
          icon={<Building className="h-4 w-4" />}
          label="Organization"
          value={customer.organization}
        />
        <InfoItem
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={customer.email}
          href={`mailto:${customer.email}`}
        />
        <InfoItem
          icon={<CreditCard className="h-4 w-4" />}
          label="Account Number"
          value={customer.accountNumber}
        />
        <InfoItem
          icon={<Phone className="h-4 w-4" />}
          label="Phone"
          value={customer.phone}
          href={`tel:${customer.phone}`}
        />
        <InfoItem
          icon={<Tag className="h-4 w-4" />}
          label="Status"
          value={customer.status}
          isStatus
        />
        <InfoItem
          icon={<MapPin className="h-4 w-4" />}
          label="Address"
          value={customer.address}
        />
      </div>

      {customer.notes && (
        <div className="mt-2">
          <h4 className="text-sm font-medium text-[#71717A] mb-2">Notes</h4>
          <div className="p-4 bg-[#F7F6FB] rounded-lg text-sm text-[#1C0E52]">
            {customer.notes}
          </div>
        </div>
      )}
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  isStatus?: boolean
}

function InfoItem({ icon, label, value, href, isStatus }: InfoItemProps) {
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
    <div className="flex items-start gap-3">
      <div className="text-[#71717A] mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-[#71717A] mb-1">{label}</p>
        {isStatus ? (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
            {value}
          </span>
        ) : href ? (
          <a 
            href={href} 
            className="text-[#1C0E52] hover:text-[#2d1875] transition-colors font-medium"
          >
            {value}
          </a>
        ) : (
          <p className="text-[#1C0E52] font-medium">{value}</p>
        )}
      </div>
    </div>
  )
}

