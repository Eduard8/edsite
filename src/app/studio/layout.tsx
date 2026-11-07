import type { ReactNode } from "react";
import { StudioDocumentReset } from "@/app/studio/studio-document-reset";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <StudioDocumentReset />
      {children}
    </>
  );
}
