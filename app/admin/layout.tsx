
import { AppSidebar } from '@/components/admin/AppSidebar'
import { CustomTrigger } from '@/components/admin/CustomTrigger'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const AdminLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <SidebarProvider>
        <AppSidebar/>

        <CustomTrigger/>
        <main className='w-full'>
            {children}
        </main>
    </SidebarProvider>
  )
}

export default AdminLayout