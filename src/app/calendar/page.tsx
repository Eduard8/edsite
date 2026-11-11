import { getCalendarPageViewModel } from "@/app/calendar/controller";
import { EventCard } from "@/components/EventCard";
import { UiAnimatedContainer } from "@/ui/facade";

export default async function CalendarPage() {
  const viewModel = await getCalendarPageViewModel();
  const hasEvents = viewModel.events.length > 0;
  const eventCountLabel = `${viewModel.events.length} upcoming show${viewModel.events.length === 1 ? "" : "s"}`;

  if (viewModel.setupMessage) {
    return (
      <main className="page page--compact">
        <UiAnimatedContainer>
          <section className="calendar-shell">
            <h1 className="page-title">Shows</h1>
            <p className="text-muted-sm scrolling-subheader">Upcoming shows, ticket links, and venue details.</p>
          </section>
        </UiAnimatedContainer>
        <UiAnimatedContainer delay={0.05}>
          <div className="state-panel state-panel--setup state-panel--calendar">
            <p className="state-panel-title">Shows setup needed</p>
            <p className="text-muted">{viewModel.setupMessage}</p>
          </div>
        </UiAnimatedContainer>
      </main>
    );
  }

  return (
    <main className="page">
      <UiAnimatedContainer>
        <section className="calendar-shell">
          <div className="calendar-heading-row">
            <h1 className="page-title">Shows</h1>
            <p className="calendar-meta" aria-live="polite">
              {hasEvents ? eventCountLabel : "No scheduled shows yet"}
            </p>
          </div>
          <p className="text-muted-sm scrolling-subheader">Upcoming shows, ticket links, and venue details.</p>
        </section>
      </UiAnimatedContainer>

      {viewModel.errorMessage ? (
        <UiAnimatedContainer delay={0.05}>
          <div className="state-panel state-panel--error state-panel--calendar">
            <p className="state-panel-title">Could not load shows</p>
            <p className="status-error">{viewModel.errorMessage}</p>
          </div>
        </UiAnimatedContainer>
      ) : null}

      {!viewModel.errorMessage && !hasEvents ? (
        <UiAnimatedContainer delay={0.05}>
          <div className="state-panel state-panel--empty state-panel--calendar">
            <p className="state-panel-title">No shows posted yet</p>
            <p className="text-muted">Check back soon for new dates and ticket links.</p>
          </div>
        </UiAnimatedContainer>
      ) : null}

      <ul className="card-list">
        {viewModel.events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </main>
  );
}
