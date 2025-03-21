"use client"

import type React from "react"
import { useState } from 'react'

import type { Customer } from "@/types/customer"
import { Building, CreditCard, MapPin, Mail, Phone, Calendar, Tag, Hash, TrendingUp, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CustomerInfoProps {
  customer: Customer
}

export default function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <InfoItem
          icon={<Hash className="h-4 w-4" />}
          label="Customer ID"
          value={customer.customerId}
          isMono={true}
        />
        <InfoItem
          icon={<FileText className="h-4 w-4" />}
          label="TIN"
          value={customer.tin}
          isMono={true}
        />
        <InfoItem
          icon={<Building className="h-4 w-4" />}
          label="Organization"
          value={customer.organization}
        />
        <InfoItem
          icon={<TrendingUp className="h-4 w-4" />}
          label="Credit Score"
          value={customer.creditScore.toString()}
          isCreditScore={true}
        />
        <InfoItem
          icon={<Tag className="h-4 w-4" />}
          label="Account Number"
          value={customer.accountNumber}
        />
        <InfoItem
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={customer.email}
          href={`mailto:${customer.email}`}
        />
        <InfoItem
          icon={<Phone className="h-4 w-4" />}
          label="Phone"
          value={customer.phone}
          href={`tel:${customer.phone}`}
        />
        <InfoItem
          icon={<MapPin className="h-4 w-4" />}
          label="Address"
          value={customer.address}
        />
        <InfoItem
          icon={<Calendar className="h-4 w-4" />}
          label="Status"
          value={customer.status}
          isStatus={true}
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
  isMono?: boolean
  isCreditScore?: boolean
}

function InfoItem({ icon, label, value, href, isStatus, isMono, isCreditScore }: InfoItemProps) {
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

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600"
    if (score >= 650) return "text-yellow-600"
    return "text-red-600"
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
        ) : isCreditScore ? (
          <p className={`font-medium ${getCreditScoreColor(parseInt(value))}`}>
            {value}
          </p>
        ) : href ? (
          <a 
            href={href} 
            className="text-[#1C0E52] hover:text-[#2d1875] transition-colors font-medium"
          >
            {value}
          </a>
        ) : (
          <p className={`text-[#1C0E52] font-medium ${isMono ? 'font-mono text-sm' : ''}`}>
            {value}
          </p>
        )}
      </div>
    </div>
  )
}

