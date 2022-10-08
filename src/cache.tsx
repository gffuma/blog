import { createContext } from 'react'

export interface Resource<T> {
  read(): T
}

export type ResourceCache = Map<string, Resource<unknown>>

export const ResourceCacheContext = createContext<ResourceCache>(new Map())
