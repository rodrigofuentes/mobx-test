import { CoreProvider, CoreStore } from "./core/CoreStore"
import { render, screen, cleanup, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Content, Login, User } from "./App"

test("renders with a new CoreStore", () => {
  render(
    <CoreProvider value={new CoreStore()}>
      <Content />
    </CoreProvider>
  )
  const h1 = screen.getByRole("heading", { name: /my greeting/i })
  expect(h1).toHaveTextContent("My Greeting")
  const button = screen.getByRole("button", { name: /change the greeting/i })
  userEvent.click(button)
  expect(h1).toHaveTextContent("Changed from LayoutStore")
  // uncomment to print dom to console
  // screen.debug()
})

test("register a user", async () => {
  render(
    <CoreProvider>
      <User />
      <Login />
    </CoreProvider>
  )

  expect(screen.getByText(/not authenticated/i)).toBeInTheDocument()
  const email = screen.getByLabelText(/email/i)
  await userEvent.type(email, "test@test.com")
  const password = screen.getByLabelText(/password/i)
  await userEvent.type(password, "myTestPassword111")

  const button = screen.getByRole("button", { name: /submit/i })
  userEvent.click(button)

  expect(await screen.findByText(/42/i)).toBeInTheDocument()
  expect(await screen.findByText(/TheTestToken/i)).toBeInTheDocument()
  screen.debug()
})

xdescribe("LoginForm", () => {
  it("should allow a user to log in", async () => {
    render(
      <CoreProvider>
        <User />
        <Login />
      </CoreProvider>
    )

    await userEvent.type(
      screen.getByLabelText(/email/i),
      "mytestemail@test.com"
    )
    await userEvent.type(
      screen.getByLabelText(/password/i),
      "myTestPassword123"
    )
    userEvent.click(screen.getByRole("button", { name: /submit/i }))

    // test-utils/handlers.ts
    // these values come from MSW handler
    expect(await screen.findByText(/42/i)).toBeInTheDocument()
    expect(await screen.findByText(/TheTestToken/i)).toBeInTheDocument()

    // uncomment to print dom to console
    // screen.debug()
  })
})
