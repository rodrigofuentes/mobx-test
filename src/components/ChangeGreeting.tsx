import { useLayoutStore } from "../core/CoreStore"

export const ChangeGreeting = () => {
  const layoutStore = useLayoutStore()
  const handleClick = () => {
    layoutStore.changeGreeting()
  }
  return (
    <>
      <button onClick={handleClick}>Change the greeting</button>
    </>
  )
}
