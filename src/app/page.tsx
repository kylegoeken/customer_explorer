import CustomerExplorer from "@/components/customer-explorer"
import Image from "next/image"
import './globals.css'

export default function Home() {
  return (
    <main className="bg-[#F7F6FB] min-h-screen font-[FS_Koopman]">
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-[200px] h-[48px]">
            <Image 
              src="/logo.png"
              alt="LiveOakBank Logo" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="text-gray-300 text-3xl font-light">|</div>
          <h1 className="text-3xl font-bold text-[#1C0E52]">Customer Explorer</h1>
        </div>
        
        <div key="explorer-wrapper">
          <CustomerExplorer />
        </div>
      </div>
    </main>
  )
}

