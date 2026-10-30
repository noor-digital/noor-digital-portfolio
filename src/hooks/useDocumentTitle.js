import { useEffect } from 'react';

// Met à jour le titre de l’onglet et la méta-description à chaque changement de page.
// Usage : useDocumentTitle(getRoute('/projets'))
export default function useDocumentTitle(meta) {
  const title = meta?.title;
  const description = meta?.description;

  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
