
import AdminHeader from '@/components/admin/AdminHeader'
import { AppSidebar } from '@/components/admin/AppSidebar'
import { CustomTrigger } from '@/components/admin/CustomTrigger'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const AdminLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <SidebarProvider>
      <div className='w-full flex h-screen'>
          <div className=''>
              <AppSidebar/>  
          </div>
          <div className='w-full  flex flex-col'>
              <AdminHeader/>
              <main className=''>
                {children}
              </main>
          </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout