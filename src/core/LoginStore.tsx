import { action, makeObservable, observable } from "mobx"
import { CoreStore } from "./CoreStore"

export class AuthStore {
  @observable
  user: { id: number; token: string } = { id: null!, token: null! }

  constructor(private coreStore: CoreStore) {
    makeObservable(this)
  }

  @action
  async login(data: { email: string; password: string }) {
    console.log(data)
    // make fetch call
    const response = await fetch("https://reqres.in/api/register", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const json = await response.json()
    this.user = json
    console.log(typeof json, json)
    return json
  }
}
