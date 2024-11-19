import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Administrativo - SUED",
  description: "Ficha técnica!",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
