import { useCallback, useContext, useEffect, useState } from 'react'
import { Resource, ResourceCacheContext } from '../cache'

function wrapPromise<T>(promise: Promise<T>): Resource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending'
  let result: T
  let suspender = promise.then(
    (r) => {
      status = 'success'
      result = r
    },
    (e) => {
      status = 'error'
      result = e
    }
  )
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      }
      return result
    },
  }
}

export function useResource<T>(key: string, fn: () => Promise<T>): T {
  const cache = useContext(ResourceCacheContext)

  const createResource = useCallback(
    <T>(key: string, fn: () => Promise<T>, force = false) => {
      if (cache.has(key) && !force) {
        return cache.get(key)! as Resource<T>
      }
      const resource = wrapPromise(fn())
      cache.set(key, resource)
      return resource
    },
    [cache]
  )

  const [resource, setResource] = useState(() => createResource(key, fn))
  const content = resource.read()

  useEffect(() => {
    setResource(createResource(key, fn, true))
    // NOTE: We skip fn from deps cause we use key to detected if
    // underlying fn changes ...
  }, [key, createResource])

  return content
}
