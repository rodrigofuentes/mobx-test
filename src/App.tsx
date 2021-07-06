import "./App.css"
import { useState } from "react"
import { ChangeGreeting, Greeting } from "components"
import { CoreProvider, useLoginStore } from "./core/CoreStore"
import { observer } from "mobx-react-lite"

export const User = observer(function User() {
  const auth = useLoginStore()

  if (!auth.user.token) {
    return (
      <div>
        <p>Not Authenticated</p>
        <button onClick={() => console.log(JSON.stringify(auth.user))}>
          console log user
        </button>
      </div>
    )
  }
  return (
    <div>
      <p>User Id: {auth.user.id}</p>
      <p>User Token: {auth.user.token}</p>
      <button onClick={() => console.log(JSON.stringify(auth.user))}>
        console log user
      </button>
    </div>
  )
})

export function Login() {
  const auth = useLoginStore()
  const [state, setState] = useState({ email: "", password: "" })

  // this along with the state above is a simplified version of how Formik handles forms
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    auth.login(state)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" onChange={handleChange} />
      <br />
      <label htmlFor="password">password</label>
      <input id="password" name="password" onChange={handleChange} />
      <button type="submit">submit</button>
    </form>
  )
}

export function Content() {
  return (
    <div className="App">
      <header className="App-header">
        <Greeting />
        <ChangeGreeting />
        {/* Do not use `br` tags, this is only for mock display purposes */}
        {/* The real solution is to leverage css to get the visual results desired */}
        <br />
        <p>
          Only emails shown in <a href="https://reqres.in">https://reqres.in</a>{" "}
          will work
        </p>
        <User />
        <Login />
      </header>
    </div>
  )
}

function App() {
  return (
    <>
      <CoreProvider>
        <Content />
      </CoreProvider>
    </>
  )
}

export default App
