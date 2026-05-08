interface StepInputProps {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
}

export default function StepInput({ label, name, value, onChange }: StepInputProps) {
  return (
    <label className="field-group">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(name, event.target.value)} />
    </label>
  )
}
