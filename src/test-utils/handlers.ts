import { rest } from "msw"

export const handlers = [
  rest.post("https://reqres.in/api/register", (req, res, ctx) => {
    console.log("data passed in to test:", req.body)
    return res(ctx.status(200), ctx.json({ id: 42, token: "TheTestToken" }))
  })
]
