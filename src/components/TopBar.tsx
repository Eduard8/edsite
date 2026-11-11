import Link from "next/link";
import { StyleLabPanel } from "@/components/StyleLabPanel";
import { UiAnimatedContainer, UiNavLink } from "@/ui/facade";

export function TopBar() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <UiAnimatedContainer className="mb-8">
      <header className="topbar">
        <Link href="/" className="topbar-brand">
          EdSite
        </Link>
        <nav className="topbar-nav" aria-label="Primary">
          <UiNavLink href="/videos">
            Videos
          </UiNavLink>
          <UiNavLink href="/calendar">
            Shows
          </UiNavLink>
          <UiNavLink href="/contact">
            Contact
          </UiNavLink>
        </nav>
        <div className="topbar-controls">
          {isDevelopment ? <StyleLabPanel /> : null}
        </div>
      </header>
    </UiAnimatedContainer>
  );
}