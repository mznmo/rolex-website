type InputProps = {
  type?: string;
  ref: React.Ref<HTMLInputElement>;
};

export default function Input({ type = "text", ref }: InputProps) {
  return (
    <input
      className="border border-gray-300 p-2 rounded font-thin"
      type={type}
      ref={ref}
    />
  );
}
