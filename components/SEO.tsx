
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
  const canonicalUrl = `https://maximusquotes.org${location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    if (document.title !== title) {
        document.title = title;
    }

    // Helper to update or create meta tags
    const updateMeta = (selector: string, content: string, attrName: string = 'name', attrValue: string = '') => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (attrName === 'property') {
            tag.setAttribute('property', attrValue);
        } else {
            tag.setAttribute('name', attrValue);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Standard Meta
    updateMeta('meta[name="description"]', description, 'name', 'description');

    // 3. Open Graph
    updateMeta('meta[property="og:title"]', title, 'property', 'og:title');
    updateMeta('meta[property="og:description"]', description, 'property', 'og:description');
    updateMeta('meta[property="og:image"]', image, 'property', 'og:image');
    updateMeta('meta[property="og:url"]', canonicalUrl, 'property', 'og:url');
    updateMeta('meta[property="og:type"]', type || 'website', 'property', 'og:type');

    // 4. Twitter
    updateMeta('meta[name="twitter:title"]', title, 'name', 'twitter:title');
    updateMeta('meta[name="twitter:description"]', description, 'name', 'twitter:description');
    updateMeta('meta[name="twitter:image"]', image, 'name', 'twitter:image');

    // 5. Robots
    updateMeta('meta[name="robots"]', noindex ? 'noindex' : 'index, follow', 'name', 'robots');

    // 6. Canonical
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // 7. Schema.org (JSON-LD)
    // We target the existing script tag or create one
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
