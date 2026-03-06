import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"

import { Input } from "@/components/ui/input";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const USERS_API_URL = import.meta.env.VITE_DB_URL_2 + "/Users"


function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate();
  

  const signup = () => {
    if (!user.username.trim() || !user.password.trim()) {
      alert("Please fill in both fields");
      return;
    }
    fetch(USERS_API_URL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    navigate("/login");
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-demo-api-key">Password</FieldLabel>
        <Input id="input-demo-api-key" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
      </Field>
      <Button onClick={signup}>Sign up</Button>
    </div>
  )
}

export default Signup