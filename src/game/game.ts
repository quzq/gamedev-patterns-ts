import { Entity } from '@/utils'    // @はsrcディレクトリのエイリアス（webpack）

export class Game extends Entity {
  public Entities: Entity[] = []

  constructor() {
    super()
    // start update loop
    this.Update()
  }

  private _lastTimestamp = 0

  public Awake(): void {
    super.Awake()

    // // set initial timestamp
    // this._lastTimestamp = Date.now()

    // // start update loop
    // this.Update()

    for (const entity of this.Entities) {
      entity.Awake()
    }

    // Make sure Update start after all entities are awaken
    window.requestAnimationFrame(() => {
      //set initial timestamp
      this._lastTimestamp = Date.now()

      // start update loop
      this.Update()
    })

  }

  public Update(): void {
    const now = Date.now()
    const deltaTime = (now - this._lastTimestamp) / 1000

    // update all components
    super.Update(deltaTime) //規定クラス(Entity)のUpdateメソッドを呼び出す（Entity.Update()は、コンポーネント群のUpdate()を呼び出す）

    // update all children
    for (const entity of this.Entities) {
      entity.Update(deltaTime)
    }
    // update the last timestamp
    this._lastTimestamp = now

    // invoke on next frame
    //this.Update()
    window.requestAnimationFrame(() => this.Update())   //どういう仕組み？
  }
}