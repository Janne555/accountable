type Callback<T> = (error: null | Error, data?: T) => void
type KeysOfUnion<T> = T extends T ? keyof T : never;

export {
  Callback,
  KeysOfUnion
}