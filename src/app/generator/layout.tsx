import Header from "@/components/header/Header";

export default async function Generator({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header type="generator" />
      {children}
    </>
  );
}
