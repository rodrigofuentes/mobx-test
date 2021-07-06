import {
  ComponentType,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement
} from "react"
import { render as rtlRender, cleanup } from "@testing-library/react"
import { CoreProvider, CoreStore } from "core/CoreStore"

type UI = ReactElement<any, string | JSXElementConstructor<any>>
interface Options {
  container?: Element
  baseElement?: Element
  hydrate?: boolean
  route?: string
  store?: CoreStore
  wrapper?: ComponentType<{}>
}

afterEach(cleanup)

function render(ui: UI, { store = new CoreStore(), ...options }: Options = {}) {
  function Wrapper(props: PropsWithChildren<{}>) {
    return <CoreProvider value={store} {...props} />
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from "@testing-library/react"
export { render }
