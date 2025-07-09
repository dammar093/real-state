import Container from "@/components/layout/container/container";
import Header from "@/components/layout/header/header";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <footer>skjfsdhkfl</footer>
    </>
  );
}
