import ResetPasswordForm from "@/components/auth/ResetPasswordForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"

const ResetPassword = () => {
  return (
    <div className="px-5 md:px-20 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
                  <ResetPasswordForm/>
            </Suspense>
          </CardContent>
        </Card>
    </div>
  )
}

export default ResetPassword