export default interface IInputProps {
  label: string;
  value: string|undefined;
  onChange: (val: any) => void;
  required?: boolean;
  type: string,
  readonly?: boolean;
}