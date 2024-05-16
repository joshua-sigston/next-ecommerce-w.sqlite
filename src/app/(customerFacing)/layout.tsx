import { Header, NavLink } from '@/components/Header';
import Nav from './_components/Nav';

export const dynamic = 'force-dynamic';

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="px-3">{children}</div>
    </>
  );
}
