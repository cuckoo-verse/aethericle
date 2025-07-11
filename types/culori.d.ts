declare module "culori" {
  export function parse(input: string): unknown | undefined;
  export function formatHex(color: unknown): string;
  export function converter(format: string): (color: unknown) => string | undefined;
} 