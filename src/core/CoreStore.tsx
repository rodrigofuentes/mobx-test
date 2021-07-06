import { createContext, useContext, FC } from "react"
import { makeObservable, observable } from "mobx"
import { LayoutStore } from "./LayoutStore"
import { AuthStore } from "./LoginStore"

export class CoreStore {
  @observable
  greeting = "My Greeting"
  @observable
  layoutStore!: LayoutStore
  @observable
  loginStore!: AuthStore

  constructor() {
    makeObservable(this)
    this.initializePage()
  }

  private initializePage() {
    this.layoutStore = new LayoutStore(this)
    this.loginStore = new AuthStore(this)
  }
}

const CoreContext = createContext<CoreStore>({} as CoreStore)

export const CoreProvider: FC<{ value?: CoreStore }> = ({
  children,
  ...rest
}) => {
  const coreStore = new CoreStore()
  return (
    <CoreContext.Provider value={coreStore} {...rest}>
      {children}
    </CoreContext.Provider>
  )
}

export const useCoreStore = () => {
  const store = useContext(CoreContext)
  if (!store) {
    throw new Error("store hook must be used within CoreProvider")
  }
  return store
}

export const useLayoutStore = () => useCoreStore().layoutStore
export const useLoginStore = () => useCoreStore().loginStore
