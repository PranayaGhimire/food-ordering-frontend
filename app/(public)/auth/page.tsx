import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Auth"
}
const Auth = () => {
  return (
    <div className="flex justify-center my-10">
      <Tabs defaultValue="Log In" className="w-[90%] md:w-100">
        <TabsList>
          <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
          <TabsTrigger value="Log In">Log In</TabsTrigger>
        </TabsList>
        <TabsContent value="Sign Up" className="mt-2">
          <Card className="shadow-xl border-t-4 border-t-cyan-500">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create your account here. Click submit when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm/>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Log In" className="mt-2">
          <Card className="shadow-xl border-t-4 border-t-cyan-500">
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>
                Log in to your account here. After clicking on submit,
                you&apos;ll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
