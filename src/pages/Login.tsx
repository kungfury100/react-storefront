import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"

import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext"
import { useContext, useState } from "react"


function Login() {
  const {handleLogin} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const login = () => {
    if (!username.trim() || !password.trim()) {
      alert("Please fill in both fields");
      return;
    }
    handleLogin();
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-demo-api-key">Password</FieldLabel>
        <Input id="input-demo-api-key" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      <Button onClick={login}>Login</Button>
    </div>
  )
}

export default Login