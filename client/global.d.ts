declare module "*.css" {
  const content: { [className: string]: string } | string;
  export default content;
}

declare module "react-phone-number-input/style.css";
