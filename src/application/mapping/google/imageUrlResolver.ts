type Attachment = {
  fileUrl?: string;
  title?: string;
  mimeType?: string;
};

function toSafeHttpUrl(raw?: string): string | undefined {
  if (!raw) {
    return undefined;
  }

  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function extractGoogleDriveFileId(url: URL): string | undefined {
  const idFromQuery = url.searchParams.get("id");
  if (idFromQuery) {
    return idFromQuery;
  }

  const resourceKeyFromQuery = url.searchParams.get("resourcekey");
  if (resourceKeyFromQuery) {
    const idFromResourceKey = resourceKeyFromQuery.split("/")[0];
    if (idFromResourceKey) {
      return idFromResourceKey;
    }
  }

  const match = url.pathname.match(/\/file\/d\/([^/]+)/i);
  if (match?.[1]) {
    return match[1];
  }

  const openMatch = url.pathname.match(/\/open/i);
  if (openMatch) {
    const idFromOpen = url.searchParams.get("id");
    if (idFromOpen) {
      return idFromOpen;
    }
  }

  return undefined;
}

function normalizeImageUrl(raw?: string): string | undefined {
  const safeUrl = toSafeHttpUrl(raw);
  if (!safeUrl) {
    return undefined;
  }

  const parsed = new URL(safeUrl);
  const host = parsed.hostname.toLowerCase();
  const isGoogleDriveHost = host === "drive.google.com" || host === "docs.google.com";

  if (!isGoogleDriveHost) {
    return safeUrl;
  }

  const fileId = extractGoogleDriveFileId(parsed);
  if (!fileId) {
    return safeUrl;
  }

  return `https://lh3.googleusercontent.com/d/${encodeURIComponent(fileId)}=w1600`;
}

export class ImageUrlResolver {
  resolve(attachments?: Attachment[], description?: string): string | undefined {
    const imageAttachment = attachments?.find((attachment) => {
      if (attachment.mimeType?.toLowerCase().startsWith("image/")) {
        return true;
      }

      return /\.(png|jpe?g|gif|webp|svg)$/i.test(attachment.title ?? "");
    });

    const attachmentUrl = normalizeImageUrl(imageAttachment?.fileUrl);
    if (attachmentUrl) {
      return attachmentUrl;
    }

    if (!description) {
      return undefined;
    }

    const links = description.match(/https?:\/\/[^\s)]+/gi) ?? [];
    const imageLink = links.find((link) => /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(link));

    return normalizeImageUrl(imageLink);
  }
}