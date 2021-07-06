import { CoreStore } from "./core/CoreStore"
import { render, screen } from "test-utils"
import userEvent from "@testing-library/user-event"
import { Content, Login, User } from "./App"

test("renders with a new CoreStore", () => {
  render(<Content />, { store: new CoreStore() })
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
    <div>
      <Login />
      <User />
    </div>
  )

  expect(screen.getByText(/not authenticated/i)).toBeInTheDocument()

  const email = screen.getByLabelText(/email/i)
  userEvent.type(email, "test@test.com")

  const password = screen.getByLabelText(/password/i)
  userEvent.type(password, "myTestPassword111")

  const button = screen.getByRole("button", { name: /submit/i })
  userEvent.click(button)

  expect(await screen.findByText(/42/i)).toBeInTheDocument()
  expect(await screen.findByText(/TheTestToken/i)).toBeInTheDocument()
  // uncomment to print dom to console
  // screen.debug()
})
