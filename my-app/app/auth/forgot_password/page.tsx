import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export function ForgotPassword() {
  const [email, setEmail] = useState(" ");
  const router = useRouter();
  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/forgot-password/getCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // setUser(result.data);
      console.log("Success get email:", result.data);
      localStorage.setItem("email", email);
      router.push("/auth/code_for_reset");
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Enter your email</Label>
              <Input
                id="name"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="Name of your project"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleForgotPassword}>Send</Button>
      </CardFooter>
    </Card>
  );
}
