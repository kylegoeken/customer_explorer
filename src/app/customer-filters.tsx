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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Filters
          </div>
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2 text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Search by name" value={filters.name} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            name="organization"
            placeholder="Search by organization"
            value={filters.organization}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="account">Account Number</Label>
          <Input
            id="account"
            name="account"
            placeholder="Search by account"
            value={filters.account}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Search by address"
            value={filters.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Search by email"
            value={filters.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Search by phone"
            value={filters.phone}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}

