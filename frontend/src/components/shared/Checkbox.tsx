interface Props {
  label: string;
  checked: boolean;
  onFilterChange: (v: boolean) => void;
}
function Checkbox({ label, checked, onFilterChange }: Props) {
  return (
    <label className="flex items-center cursor-pointer gap-2 mt-1">
      <input
        className="sr-only peer"
        type="checkbox"
        checked={checked}
        onChange={(e) => onFilterChange(e.target.checked)}
      />
      <div className="relative w-9 h-5  rounded-full peer dark:bg-shade peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:ringternary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-accent after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary dark:peer-checked:bg-secondary"></div>
      <span className="select-none ms-3 text-sm font-medium text-heading text-quaternary">
        {checked ? "" : "No"} {label}
      </span>
    </label>
  );
}

export default Checkbox;
