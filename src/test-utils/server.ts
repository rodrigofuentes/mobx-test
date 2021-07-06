import { rest } from "msw"
import { setupServer } from "msw/node"
import { handlers } from "./handlers"

const server = setupServer(...handlers)

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen()
})

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers()
})

afterAll(() => {
  // Clean up once the tests are done.
  server.close()
})

export { server, rest }
