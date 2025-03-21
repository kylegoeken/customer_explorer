import CustomerExplorer from "@/components/customer-explorer"
import Image from "next/image"
import './globals.css'

export default function Home() {
  return (
    <main className="font-['FS_Koopman']">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 pt-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16">
            <Image 
              src="/logo.png"
              alt="Company Logo" 
              width={160} 
              height={36} 
              priority
            />
            <div className="h-6 w-px bg-gray-200 mx-6"></div>
            <h1 className="text-2xl font-bold text-[#1C0E52] font-['FS_Koopman']">Customer Explorer</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <CustomerExplorer />
      </div>
    </main>
  )
}

