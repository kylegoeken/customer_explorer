"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface CustomerFiltersProps {
  filters: {
    name: string
    organization: string
    account: string
    address: string
    email: string
    phone: string
  }
  onFilterChange: (name: string, value: string) => void
  onClearFilters: () => void
}

export function CustomerFilters({ filters, onFilterChange, onClearFilters }: CustomerFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onFilterChange(name, value)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[#1C0E52]">Filters</h2>
        <button 
          onClick={onClearFilters}
          className="text-sm text-[#1C0E52] hover:text-[#2d1875] transition-colors duration-150
            hover:underline focus:outline-none focus:ring-2 focus:ring-[#1C0E52] rounded-md px-2 py-1"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-4">
        {Object.entries(filters).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-[#71717A] mb-1 capitalize">
              {key}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => onFilterChange(key, e.target.value)}
              className="w-full px-4 py-2 border border-[#E4E4E7] rounded-lg 
                text-[#1C0E52] 
                placeholder-[#A1A1AA]
                focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
                hover:border-[#1C0E52] transition-colors duration-150"
              placeholder={`Filter by ${key.toLowerCase()}...`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

