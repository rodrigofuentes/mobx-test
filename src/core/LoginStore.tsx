import { action, makeObservable, observable, runInAction } from "mobx"
import { CoreStore } from "./CoreStore"

export class AuthStore {
  @observable
  user: { id: number; token: string } = { id: null!, token: null! }

  constructor(private coreStore: CoreStore) {
    makeObservable(this)
  }

  @action
  async login(data: { email: string; password: string }) {
    console.log("login arguments passed in:", data)

    try {
      // make fetch call
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const user = await response.json()
      // change the observed user object
      runInAction(() => {
        // since login is async...
        // this setter needs to be inside runInAction
        // or passed into a separate method
        this.user = user
      })

      // the following won't work
      // this.user = user

      // calling a separate method to set the state would also work:
      // this.setUser(user)

      return user
    } catch (e) {
      console.error(e)
    }
  }
}
