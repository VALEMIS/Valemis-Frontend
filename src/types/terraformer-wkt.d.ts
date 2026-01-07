declare module '@terraformer/wkt' {
  export class WKT {
    parse(wkt: string): any
    convert(obj: any): string
  }
}
