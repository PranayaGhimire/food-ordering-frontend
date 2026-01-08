import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

const PublicLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <Navbar/>
        {children}
        <Footer/> 
    </>
  )
}

export default PublicLayout
