import { useEffect, useReducer, useCallback, useState } from 'react'

export const useForm = <T>(initialState: T): [T, (fieldName: keyof T) => (value: T[keyof T]) => void] => {
  type K = keyof T

  const reducer = (prevState: T, current: Partial<T>): T => {
    return {
      ...prevState,
      ...current,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [key, setKey] = useState<K>()
  const [value, setValue] = useState<T[K]>()

  useEffect(() => {
    dispatch({ [`${key}`]: value } as Partial<T>)
  }, [key, value])

  const onValueChange = useCallback((val: T[K]) => setValue(val), [])

  const updateState = useCallback((fieldName: K) => {
    setKey(fieldName)
    return onValueChange
  }, [onValueChange])

  return [state, updateState]
}