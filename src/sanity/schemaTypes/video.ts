import { defineField, defineType } from "sanity";

export const videoType = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Leave blank to use the title from YouTube.",
    }),
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      description: "A YouTube watch, share, or shorts link. The video stays on YouTube.",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      description: "Optional. If empty, the site uses the YouTube thumbnail.",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      description: "Optional. Newest dates are listed first.",
    }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
      media: "thumbnail",
    },
  },
});
