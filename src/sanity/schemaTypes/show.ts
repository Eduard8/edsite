import { defineField, defineType } from "sanity";

export const showType = defineType({
  name: "show",
  title: "Show",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "start",
      title: "Start",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "end",
      title: "End",
      type: "datetime",
    }),
    defineField({
      name: "allDay",
      title: "All day",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "poster",
      title: "Poster",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "mapsUrl",
      title: "Map link",
      type: "url",
      description: "Optional. A venue name alone does not create a map link.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket link",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  orderings: [
    {
      title: "Start date",
      name: "startAsc",
      by: [{ field: "start", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "start",
      media: "poster",
    },
  },
});
