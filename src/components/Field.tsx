import type { ReactNode } from "react";

type Props = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

export default function Field({ label, htmlFor, error, children }: Props) {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}