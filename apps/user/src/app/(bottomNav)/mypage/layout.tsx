export const metadata = {
  requireAuth: true,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
