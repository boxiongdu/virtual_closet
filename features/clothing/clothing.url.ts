export type ClothingLinkSource = 'Taobao' | 'Tmall';

const trailingSharePunctuation = /[\])}>,.;!?，。；！？】」』]+$/u;

export function getClothingLinkSource(value: string) {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return undefined;
    }

    const hostname = url.hostname.toLowerCase();
    if (
      hostname === 'tmall.com' ||
      hostname.endsWith('.tmall.com')
    ) {
      return 'Tmall' satisfies ClothingLinkSource;
    }

    if (
      hostname === 'taobao.com' ||
      hostname.endsWith('.taobao.com') ||
      hostname === 'tb.cn' ||
      hostname.endsWith('.tb.cn')
    ) {
      return 'Taobao' satisfies ClothingLinkSource;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function extractClothingUrl(value: string) {
  const candidates = value.match(/https?:\/\/[^\s]+/giu) ?? [];

  for (const candidate of candidates) {
    const normalizedUrl = candidate.replace(trailingSharePunctuation, '');
    if (getClothingLinkSource(normalizedUrl)) {
      return normalizedUrl;
    }
  }

  return undefined;
}

export function extractClothingShareTitle(value: string) {
  const extractedUrl = extractClothingUrl(value);
  if (!extractedUrl) {
    return undefined;
  }

  const withoutMarker = value.replace(/【[^】]*】/gu, ' ');
  const withoutUrl = withoutMarker.replace(extractedUrl, ' ').trim();
  const withoutShareCode = withoutUrl.replace(
    /^[A-Z]{1,4}\d{2,}\s+/iu,
    '',
  );

  return withoutShareCode.trim() || undefined;
}

function isTaobaoShortUrl(value: string) {
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return (
      hostname === 'e.tb.cn' ||
      hostname === 'tb.cn' ||
      hostname.endsWith('.e.tb.cn')
    );
  } catch {
    return false;
  }
}

export async function resolveClothingUrl(originalUrl: string) {
  if (!isTaobaoShortUrl(originalUrl)) {
    return undefined;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    for (const method of ['HEAD', 'GET'] as const) {
      try {
        const response = await fetch(originalUrl, {
          method,
          redirect: 'follow',
          signal: controller.signal,
        });
        const resolvedUrl = response.url;

        if (
          resolvedUrl &&
          resolvedUrl !== originalUrl &&
          getClothingLinkSource(resolvedUrl)
        ) {
          return resolvedUrl;
        }
      } catch {
        // Redirect resolution is best effort; saving the original is valid.
      }
    }
  } finally {
    clearTimeout(timeout);
  }

  return undefined;
}
