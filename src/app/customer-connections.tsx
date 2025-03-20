"use client"

import { useEffect, useRef } from "react"
import type { Customer } from "@/types/customer"
import { Card, CardContent } from "@/components/ui/card"
import { findCustomerConnections } from "@/lib/connections"
import { Network } from "lucide-react"

interface CustomerConnectionsProps {
  customer: Customer
  allCustomers: Customer[]
}

export function CustomerConnections({ customer, allCustomers }: CustomerConnectionsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const connections = findCustomerConnections(customer, allCustomers)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = 500
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections
    drawNetworkGraph(ctx, canvas.width, canvas.height, customer, connections)

    // Handle window resize
    const handleResize = () => {
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = 500
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawNetworkGraph(ctx, canvas.width, canvas.height, customer, connections)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [customer, connections])

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Network className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Connections Found</h3>
        <p className="text-muted-foreground mt-2">
          This customer doesn't have any detected connections with other customers.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Connection Summary</h3>
        <p className="text-sm text-muted-foreground">
          {customer.name} has {connections.length} connection{connections.length !== 1 ? "s" : ""} with other customers.
        </p>
      </div>

      <div className="border rounded-md overflow-hidden">
        <canvas ref={canvasRef} className="w-full" height="500" />
      </div>

      <div className="space-y-3 mt-4">
        <h3 className="font-medium">Connection Details</h3>
        {connections.map((connection, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{connection.customer.name}</h4>
                  <p className="text-sm text-muted-foreground">{connection.customer.organization}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {connection.type}
                  </span>
                </div>
              </div>
              <p className="text-sm mt-2">{connection.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function drawNetworkGraph(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mainCustomer: Customer,
  connections: Array<{
    customer: Customer
    type: string
    description: string
  }>,
) {
  // Colors
  const mainNodeColor = "#3b82f6"
  const connectionNodeColor = "#64748b"
  const lineColor = "#e2e8f0"
  const textColor = "#1e293b"

  // Node sizes
  const mainNodeRadius = 40
  const connectionNodeRadius = 30

  // Calculate positions
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) * 0.35

  // Draw main customer node
  ctx.beginPath()
  ctx.arc(centerX, centerY, mainNodeRadius, 0, Math.PI * 2)
  ctx.fillStyle = mainNodeColor
  ctx.fill()

  // Draw main customer name
  ctx.font = "bold 14px sans-serif"
  ctx.fillStyle = "white"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Wrap text for main node
  const mainName = mainCustomer.name
  const mainNameParts = mainName.split(" ")
  if (mainNameParts.length === 1) {
    ctx.fillText(mainName, centerX, centerY)
  } else {
    const firstName = mainNameParts[0]
    const lastName = mainNameParts.slice(1).join(" ")
    ctx.fillText(firstName, centerX, centerY - 7)
    ctx.fillText(lastName, centerX, centerY + 7)
  }

  // Draw connections
  const angleStep = (Math.PI * 2) / connections.length

  connections.forEach((connection, index) => {
    const angle = index * angleStep
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    // Draw line
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(x, y)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw connection type
    const midX = centerX + Math.cos(angle) * (radius / 2)
    const midY = centerY + Math.sin(angle) * (radius / 2)

    ctx.font = "12px sans-serif"
    ctx.fillStyle = textColor
    ctx.fillText(connection.type, midX, midY)

    // Draw connection node
    ctx.beginPath()
    ctx.arc(x, y, connectionNodeRadius, 0, Math.PI * 2)
    ctx.fillStyle = connectionNodeColor
    ctx.fill()

    // Draw connection name
    ctx.font = "bold 12px sans-serif"
    ctx.fillStyle = "white"

    // Wrap text for connection nodes
    const name = connection.customer.name
    const nameParts = name.split(" ")
    if (nameParts.length === 1) {
      ctx.fillText(name, x, y)
    } else {
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(" ")
      ctx.fillText(firstName, x, y - 6)
      ctx.fillText(lastName, x, y + 6)
    }
  })
}

