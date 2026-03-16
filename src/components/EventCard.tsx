import Image from "next/image";
import { presentEventCard } from "@/application/presenters/presentEventCard";
import { MapPinIcon } from "@/components/icons/MapPinIcon";
import type { ShowEvent } from "@/domain/event";
import {
  UiAnimatedContainer,
  UiCard,
  UiCardDescription,
  UiCardTitle,
} from "@/ui/facade";

type EventCardProps = {
  event: ShowEvent;
};

export function EventCard({ event }: EventCardProps) {
  const viewModel = presentEventCard(event);

  return (
    <UiAnimatedContainer>
      <UiCard className="event-card">
        {viewModel.imageUrl ? (
          <div className="event-card-media">
            <Image
              src={viewModel.imageUrl}
              alt={viewModel.imageAlt}
              width={1200}
              height={675}
              unoptimized
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="card-image event-card-image"
            />
          </div>
        ) : null}

        <div className="event-card-content">
          <UiCardTitle className="card-title">{viewModel.title}</UiCardTitle>
          <p className="card-subtitle">{viewModel.subtitle}</p>
          {viewModel.description ? (
            <UiCardDescription className="card-description">{viewModel.description}</UiCardDescription>
          ) : null}
        </div>

        <div className="card-actions event-card-actions">
          {viewModel.mapsUrl ? (
            <a
              href={viewModel.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="link-inline link-inline--icon"
            >
              <MapPinIcon className="h-4 w-4" />
              {viewModel.venueLabel}
            </a>
          ) : null}
          {viewModel.ticketUrl ? (
            <a
              href={viewModel.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className="link-inline"
            >
              Tickets
            </a>
          ) : null}
        </div>
      </UiCard>
    </UiAnimatedContainer>
  );
}