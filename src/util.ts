import { action, makeObservable, observable } from "mobx"
class Test {
  what = "hi"
  constructor() {
    this.what = "hello"
  }
}
