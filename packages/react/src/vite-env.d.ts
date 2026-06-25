// Asset imports are resolved by Vite (Storybook) to a URL string. Declare the
// module shapes so `tsc` typechecks story/component asset imports.
declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
