declare module 'mobx-devtools-mst' {
  type MakeInspectable = (store: any) => void

  declare const makeInspectable: MakeInspectable
  export default makeInspectable
}
