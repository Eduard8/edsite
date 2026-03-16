import { getContactFormAction } from "@/config/env";
import { UiAnimatedContainer, UiButton, UiCard, UiInput, UiTextarea } from "@/ui/facade";

const contactThankYouPath = "/contact/thanks";

export default function ContactPage() {
  const formAction = getContactFormAction();

  return (
    <main className="page">
      <UiAnimatedContainer>
        <section className="contact-shell">
          <h1 className="page-title">Contact</h1>
          <p className="text-muted-sm">Contact Ed!</p>
        </section>
      </UiAnimatedContainer>

      {!formAction ? (
        <UiAnimatedContainer delay={0.04}>
          <div className="state-panel state-panel--setup state-panel--contact">
            <p className="state-panel-title">Form endpoint missing</p>
            <p className="text-muted-sm">
              Set NEXT_PUBLIC_CONTACT_FORM_ACTION to your form provider endpoint.
            </p>
          </div>
        </UiAnimatedContainer>
      ) : null}

        <UiAnimatedContainer delay={0.1}>
          <UiCard className="contact-form-card">
            <form action={formAction ?? undefined} method="POST" className="contact-form">
              <input type="hidden" name="_next" value={contactThankYouPath} />

              <div className="contact-form-grid">
                <div className="stack-sm">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <UiInput id="name" name="name" required />
                </div>

                <div className="stack-sm">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <UiInput id="email" name="email" type="email" required />
                </div>
              </div>

              <div className="stack-sm">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <UiTextarea id="message" name="message" rows={6} required />
              </div>

              <div className="contact-actions">
                <UiButton type="submit" disabled={!formAction} className="btn-submit">
                  Send
                </UiButton>
              </div>

            </form>
          </UiCard>
        </UiAnimatedContainer>
    </main>
  );
}
