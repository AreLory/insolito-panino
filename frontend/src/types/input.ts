export default interface InputProps {
  label: string;
  value: string|undefined;
  onChange: (val: any) => void;
  required?: boolean;
  type: string,
  readonly?: boolean;
}