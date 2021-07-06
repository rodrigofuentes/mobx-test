import { CoreProvider } from "./core/CoreStore"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Content } from "./App"

test("renders", () => {
  render(
    <CoreProvider>
      <Content />
    </CoreProvider>
  )
  const h1 = screen.getByRole("heading", { name: /my greeting/i })
  expect(h1).toHaveTextContent("My Greeting")
  const button = screen.getByRole("button", { name: /change the greeting/i })
  userEvent.click(button)
  expect(h1).toHaveTextContent("Changed from LayoutStore")
  screen.debug()
})
