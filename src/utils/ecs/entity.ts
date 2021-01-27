import { IComponent } from './component.h'
import { IUpdate } from '../update.h'

type TConstr<T> = {
  new(...args: unknown[]): T
}
// 抽象クラス（abstract class）を使うと、あるプロパティ値の定義を必ず行ってほしいことを継承先のクラスへ伝えることができます。
// 抽象クラスは、単体では使うことができません。必ずクラスで継承して使います。
// インターフェース（interface）との違いは、抽象クラスは共通になりそうな部分はプロパティ値を入れたりやメソッドを実装した状態で用意できる点です。
export abstract class Entity implements IUpdate {
  protected _components: IComponent[] = []
  public get Components(): IComponent[] {
    return this._components
  }
  public AddComponent(component: IComponent): void {
    this._components.push(component)
    component.Entity = this
  }

  public GetComponent<C extends IComponent>(constr: TConstr<C>): C {
    for (const component of this._components) {   //for ofは列挙
      if (component instanceof constr) {
        return component as C
      }
    }
    throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
  }
  public RemoveComponent<C extends IComponent>(constr: TConstr<C>): void {
    let toRemove: IComponent | undefined
    let index: number | undefined
    for (let i = 0; i < this._components.length; i++) {
      const component = this._components[i]
      if (component instanceof constr) {
        toRemove = component
        index = i
        break
      }
    }
    if (toRemove && index) {
      toRemove.Entity = null
      this._components.splice(index, 1)
    }
  }
  public HasComponent<C extends IComponent>(constr: TConstr<C>): boolean {
    for (const component of this._components) {   //for ofは列挙
      if (component instanceof constr) {
        return true
      }
    }

    return false
  }
  public Update(deltaTime: number): void {
    for (const component of this._components) {
      component.Update(deltaTime)
    }
  }



}

