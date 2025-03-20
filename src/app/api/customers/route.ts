import { NextResponse } from 'next/server'

// GET all customers
export async function GET() {
  try {
    // Here you would fetch from your database
    const customers = [
      { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active' },
    ]
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

// POST new customer
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Here you would insert into your database
    return NextResponse.json({ message: 'Customer created' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}

// PUT update customer
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    // Here you would update your database
    return NextResponse.json({ message: 'Customer updated' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 })
  }
}

// DELETE customer
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    // Here you would delete from your database
    return NextResponse.json({ message: 'Customer deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 })
  }
} 