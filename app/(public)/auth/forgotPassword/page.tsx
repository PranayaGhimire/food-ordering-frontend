
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const ForgotPassword = () => {
  return (
    <div className="px-5 md:px-20 py-10">
      <Card>
        <CardHeader>
            <CardTitle>Forgot Password ?</CardTitle>
            <CardDescription>Enter your registered email and we will send you a reset link</CardDescription>
        </CardHeader>
        <CardContent >
           <ForgotPasswordForm/>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword
