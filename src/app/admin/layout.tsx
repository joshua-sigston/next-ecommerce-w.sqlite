import { Header, NavLink } from '@/components/Header';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Prodcuts</NavLink>
        <NavLink href="/admin/users">Users</NavLink>
        <NavLink href="/admin/orders">Orders</NavLink>
      </Header>
      <div className="container my-6">{children}</div>
    </>
  );
}
