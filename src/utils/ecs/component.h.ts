import { Entity } from './entity'
//import { IUpdate } from '../update.h.ts_'
//import { IAwake } from '../awake.h'
import { IAwake, IUpdate } from '@/utils'
export interface IComponent extends IAwake, IUpdate {
    Entity: Entity | null
}