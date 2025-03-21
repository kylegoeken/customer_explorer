"use client"

import { useEffect, useRef, useState } from "react"
import type { Customer, Connection } from "@/types/customer"
import { Card, CardContent } from "@/components/ui/card"
import { findCustomerConnections } from "@/lib/connections"
import { Network, Search, Filter, ChevronDown } from "lucide-react"

interface CustomerConnectionsProps {
  customer: Customer
  allCustomers: Customer[]
  onSelectCustomer: (customer: Customer) => void
}

interface ConnectionWithCustomer extends Connection {
  connectedCustomer?: Customer
}

export default function CustomerConnections({ customer, allCustomers, onSelectCustomer }: CustomerConnectionsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [hoveredConnection, setHoveredConnection] = useState<number | null>(null)

  const connections: ConnectionWithCustomer[] = (customer.connections || []).map(conn => ({
    ...conn,
    connectedCustomer: allCustomers.find(c => c.id === conn.customerId)
  }))

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.connectedCustomer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.connectedCustomer?.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = !filterType || connection.type === filterType
    return matchesSearch && matchesFilter
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set fixed canvas height
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = 600  // Fixed height
    }

    // Handle mouse move for hover effects
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      // Update radius calculation to match drawNetworkGraph exactly
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const padding = 45 * 2  // nodeRadius * 2 to match drawNetworkGraph
      const radius = Math.min(canvas.width - padding * 4, canvas.height - padding * 4) * 0.72
      
      let hoveredIndex = null
      const angleStep = (Math.PI * 2) / connections.length
      
      connections.forEach((_, index) => {
        const angle = index * angleStep
        const nodeX = centerX + Math.cos(angle) * radius
        const nodeY = centerY + Math.sin(angle) * radius
        
        const distance = Math.sqrt(
          Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2)
        )
        
        if (distance < 45) { // Updated to match current nodeRadius
          hoveredIndex = index
        }
      })
      
      if (hoveredIndex !== hoveredConnection) {
        setHoveredConnection(hoveredIndex)
        drawNetworkGraph(ctx, canvas.width, canvas.height, customer, connections, hoveredIndex)
      }
    }

    const handleMouseLeave = () => {
      setHoveredConnection(null)
      drawNetworkGraph(ctx, canvas.width, canvas.height, customer, connections, null)
    }

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Initial draw
    drawNetworkGraph(ctx, canvas.width, canvas.height, customer, connections, null)

    // Update resize handler
    const handleResize = () => {
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = 600  // Fixed height
        drawNetworkGraph(ctx, canvas.width, canvas.height, customer, connections, hoveredConnection)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [customer, connections, hoveredConnection])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.42
      
      const angleStep = (Math.PI * 2) / connections.length
      
      connections.forEach((connection, index) => {
        const angle = index * angleStep
        const nodeX = centerX + Math.cos(angle) * radius
        const nodeY = centerY + Math.sin(angle) * radius
        
        const distance = Math.sqrt(
          Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2)
        )
        
        if (distance < 45) { // nodeRadius
          const connectedCustomer = allCustomers.find(c => c.id === connection.customerId)
          if (connectedCustomer) {
            onSelectCustomer(connectedCustomer)
          }
        }
      })
    }

    canvas.addEventListener('click', handleClick)
    
    return () => {
      canvas.removeEventListener('click', handleClick)
    }
  }, [customer, connections, allCustomers, onSelectCustomer])

  return (
    <div className="space-y-6">
      {/* Header with count */}
      <div className="flex items-center">
        <div className="flex items-center gap-2 text-[#71717A]">
          <Network className="h-4 w-4" />
          <span>{connections.length} connections found</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E4E4E7] rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
              hover:border-[#1C0E52] transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="pl-10 pr-8 py-2 border border-[#E4E4E7] rounded-lg
              focus:outline-none focus:ring-2 focus:ring-[#1C0E52] focus:border-transparent
              hover:border-[#1C0E52] transition-colors appearance-none"
          >
            <option value="">All Types</option>
            <option value="Same Organization">Same Organization</option>
            <option value="Organization Member">Organization Member</option>
            <option value="Business Partner">Business Partner</option>
            <option value="Vendor">Vendor</option>
            <option value="Guarantor">Guarantor</option>
          </select>
        </div>
      </div>

      {/* Main content area */}
      <div className="space-y-6">
        {/* Network Visualization */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <canvas 
            ref={canvasRef} 
            className="w-full" 
            height="600"
            style={{ background: 'white' }}
          />
        </div>

        {/* Connection Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#1C0E52] flex items-center gap-2">
            Connection Details
            {filteredConnections.length !== connections.length && (
              <span className="text-sm font-normal text-[#71717A]">
                ({filteredConnections.length} of {connections.length})
              </span>
            )}
          </h3>
          
          {filteredConnections.length === 0 ? (
            <div className="text-center py-6 text-[#71717A] bg-[#F7F6FB] rounded-lg">
              No connections match your search criteria.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredConnections.map((connection) => {
                const connectedCustomer = allCustomers.find(c => c.id === connection.customerId)
                if (!connectedCustomer) return null

                return (
                  <Card 
                    key={connection.customerId}
                    className="p-4 cursor-pointer hover:border-[#1C0E52] transition-colors"
                    onClick={() => onSelectCustomer(connectedCustomer)}
                  >
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-[#F7F6FB] text-[#1C0E52] mb-3">
                      {connection.type}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium">{connectedCustomer.name}</h3>
                      <p className="text-gray-500 text-sm">{connectedCustomer.organization}</p>
                      <p className="text-gray-600 text-sm mt-2">{connection.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function drawNetworkGraph(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mainCustomer: Customer,
  connections: ConnectionWithCustomer[],
  hoveredIndex: number | null
) {
  // Colors and sizes
  const mainNodeColor = "#1C0E52"
  const connectionNodeColor = "#2d1875"
  const hoveredNodeColor = "#3d2485"
  const lineColor = "#E4E4E7"
  const mainNodeRadius = 60
  const nodeRadius = 45
  const padding = nodeRadius * 3

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Calculate positions
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) * 0.42
  const angleStep = (Math.PI * 2) / connections.length

  // Draw connections (lines)
  connections.forEach((connection, index) => {
    const angle = index * angleStep
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    // Draw line with gradient
    const gradient = ctx.createLinearGradient(centerX, centerY, x, y)
    gradient.addColorStop(0, "#E4E4E7")
    gradient.addColorStop(1, "#E4E4E7")
    
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(x, y)
    ctx.strokeStyle = gradient
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Draw connection type
    if (connection.type) {
      const labelX = centerX + Math.cos(angle) * (radius * 0.52)
      const labelY = centerY + Math.sin(angle) * (radius * 0.52)
      
      ctx.font = "13px FS Koopman"
      const textWidth = ctx.measureText(connection.type).width
      const padding = 8
      
      // Draw pill-shaped background
      const pillWidth = textWidth + (padding * 2)
      const pillHeight = 20
      const pillRadius = pillHeight / 2
      
      ctx.beginPath()
      ctx.moveTo(labelX - (pillWidth/2) + pillRadius, labelY - pillHeight/2)
      ctx.lineTo(labelX + (pillWidth/2) - pillRadius, labelY - pillHeight/2)
      ctx.arc(labelX + (pillWidth/2) - pillRadius, labelY, pillRadius, -Math.PI/2, Math.PI/2)
      ctx.lineTo(labelX - (pillWidth/2) + pillRadius, labelY + pillHeight/2)
      ctx.arc(labelX - (pillWidth/2) + pillRadius, labelY, pillRadius, Math.PI/2, -Math.PI/2)
      ctx.fillStyle = "white"
      ctx.fill()
      
      ctx.fillStyle = "#71717A"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(connection.type, labelX, labelY)
    }
  })

  // Draw connection nodes and labels
  connections.forEach((connection, index) => {
    const angle = index * angleStep
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    // Draw node with gradient
    const nodeGradient = ctx.createRadialGradient(
      x, y - nodeRadius/3, 0,
      x, y, nodeRadius
    )
    nodeGradient.addColorStop(0, "#4a3497")
    nodeGradient.addColorStop(1, index === hoveredIndex ? hoveredNodeColor : connectionNodeColor)

    ctx.beginPath()
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2)
    ctx.fillStyle = nodeGradient
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = "white"
    ctx.stroke()

    if (connection.connectedCustomer) {
      // Draw name with increased line spacing
      ctx.font = "bold 16px FS Koopman"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      
      const name = connection.connectedCustomer.name.split(" ")
      ctx.fillText(name[0], x, y - 9)
      if (name.length > 1) {
        ctx.fillText(name.slice(1).join(" "), x, y + 9)
      }
    }
  })

  // Draw main customer node with gradient
  const mainGradient = ctx.createRadialGradient(
    centerX, centerY - mainNodeRadius/3, 0,
    centerX, centerY, mainNodeRadius
  )
  mainGradient.addColorStop(0, "#2d1875")
  mainGradient.addColorStop(1, mainNodeColor)

  ctx.beginPath()
  ctx.arc(centerX, centerY, mainNodeRadius, 0, Math.PI * 2)
  ctx.fillStyle = mainGradient
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "white"
  ctx.stroke()

  // Draw main customer name
  ctx.font = "bold 18px FS Koopman"
  ctx.fillStyle = "white"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  const mainName = mainCustomer.name.split(" ")
  ctx.fillText(mainName[0], centerX, centerY - 10)
  if (mainName.length > 1) {
    ctx.fillText(mainName.slice(1).join(" "), centerX, centerY + 10)
  }
}

