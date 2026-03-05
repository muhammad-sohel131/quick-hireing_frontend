type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full border rounded-lg px-4 py-2 outline-none
      focus:ring-2 focus:ring-black/10"
    />
  );
}
