import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'oCamlCase';
const BASE_URL = 'https://ocamlcase.dev';
const OG_IMAGE = `${BASE_URL}/flaticon.png`;

type Props = { title: string; description?: string };

function upsertMeta(attr: string, key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

const JSONLD_ID = 'page-jsonld';

// Per-page Article/LearningResource schema for concept and exercise routes,
// mirroring the global Course JSON-LD in index.html.
function upsertPageJsonLd(pathname: string, title: string, desc: string, url: string) {
  const existing = document.getElementById(JSONLD_ID);
  const isContent = pathname.startsWith('/concepts/') || pathname.startsWith('/exercises/');
  if (!isContent) {
    existing?.remove();
    return;
  }
  const payload = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'LearningResource'],
    headline: title.replace(/ \| oCamlCase$/, ''),
    description: desc,
    url,
    inLanguage: 'en',
    learningResourceType: pathname.startsWith('/exercises/') ? 'Exercise' : 'Article',
    isPartOf: { '@type': 'Course', name: 'Learn OCaml by Example', url: BASE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    isAccessibleForFree: true,
  };
  let el = existing as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = JSONLD_ID;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(payload);
}

export default function PageMeta({ title, description }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    const desc = description ?? '';
    const url = `${BASE_URL}${pathname}`;

    document.title = title;
    upsertMeta('name', 'description', desc);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:image', OG_IMAGE);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', OG_IMAGE);

    upsertLink('canonical', url);
    upsertPageJsonLd(pathname, title, desc, url);
  }, [title, description, pathname]);

  return null;
}
