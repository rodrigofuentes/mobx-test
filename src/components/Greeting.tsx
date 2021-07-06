import { observer } from "mobx-react-lite"
import { useCoreStore } from "../core/CoreStore"

export const Greeting = observer(() => {
  const coreStore = useCoreStore()
  const { greeting } = coreStore
  return <h1>{greeting}</h1>
})
