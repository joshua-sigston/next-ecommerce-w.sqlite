import { ReactNode } from 'react';

export default function PageHeader({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl md:text-4xl">{children}</h1>;
}
