import { action, makeObservable, observable } from "mobx"
import { CoreStore } from "./CoreStore"

export class LayoutStore {
  constructor(private coreStore: CoreStore) {
    makeObservable(this)
  }

  @observable
  newGreeting = "Changed from LayoutStore"

  @action
  changeGreeting() {
    this.coreStore.greeting = this.newGreeting
  }
}
