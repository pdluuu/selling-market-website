"use client";
import { useEffect, useState } from "react";

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

export default function CodeForRegistration() {
  const router = useRouter();
  const [code, setCode] = useState(" ");

  useEffect(() => {
    const handle = async () => {
      try {
        // const { username, email, password } = values;
        // console.log(JSON.stringify({ username, email, password }))
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/sendCode",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({ email: localStorage.getItem("email") }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("user enter code:");
      } catch (e) {
        console.log(e);
      }
    };
    handle();
  }, []);

  const handleSendCode = async () => {
    const response = await fetch(
      "http://localhost:8080/api/v1/auth/verifyUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          code: code,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.json()}`);
    }

    const result = await response.json();
    // setUser(result.data);
    console.log("Success verifiy user:", result.data);
    localStorage.setItem("user", JSON.stringify(result.data));
    localStorage.remove("email");
    router.push("/");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Validate User</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Enter code for validation</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSendCode}>Send code</Button>
      </CardFooter>
    </Card>
  );
}
