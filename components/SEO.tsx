
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: object;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://maximusquotes.org/logo.png', 
  type = 'website',
  schema,
  noindex = false
}) => {
  const location = useLocation();
  // FIX: For HashRouter, the canonical URL must include the '/#' prefix.
  // location.pathname provides the path inside the hash (e.g., '/explore').
  const canonicalUrl = `https://maximusquotes.org/#${location.pathname}${location.search}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Tags
    const updateMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:image', image);
    updateMeta('og:url', canonicalUrl);
    updateMeta('og:type', type);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // 3. Update Robots Meta (Soft 404 Prevention)
    let robots = document.querySelector("meta[name='robots']");
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', noindex ? 'noindex' : 'index, follow');

    // 4. Update Canonical Link
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // 5. Inject Schema.org JSON-LD
    if (schema) {
      let script = document.querySelector("#seo-schema") as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('id', 'seo-schema');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    }

  }, [title, description, image, type, canonicalUrl, schema, noindex]);

  return null;
};

export default SEO;
