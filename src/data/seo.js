// Données structurées (JSON-LD) de la page Services. Aucun champ financier dans ces données structurées.
// Utilisé par le composant ServicesJsonLd (navigateur) et par scripts/postbuild.js (HTML statique).

export function servicesJsonLd({ site, services, faq, url }) {
  const provider = { '@id': `${url}#business` };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${url}#business`,
        name: site.name,
        description: 'Développement de sites web, intégration d’interfaces responsive et fonctionnalités dynamiques.',
        url: site.siteUrl,
        slogan: site.signature,
        email: site.email,
        founder: { '@type': 'Person', name: site.owner, jobTitle: site.jobTitle },
        address: { '@type': 'PostalAddress', addressLocality: 'Dakar', addressCountry: 'SN' },
        areaServed: 'Sénégal et à distance',
        knowsLanguage: 'fr',
      },
      ...services.map((service) => ({
        '@type': 'Service',
        '@id': `${url}#${service.id}`,
        name: service.title,
        description: service.description,
        serviceType: service.title,
        provider,
        areaServed: 'Sénégal et à distance',
      })),
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

// Page Contact : ContactPage + ProfessionalService. Aucun champ financier ; seuls les canaux confirmés apparaissent.
export function contactJsonLd({ site, url }) {
  const sameAs = [site.github, site.linkedin].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${url}#page`,
        url,
        name: `Contact — ${site.name}`,
        inLanguage: 'fr',
        about: { '@id': `${url}#business` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${url}#business`,
        name: site.name,
        url: site.siteUrl,
        email: site.email,
        slogan: site.signature,
        address: { '@type': 'PostalAddress', addressLocality: 'Dakar', addressCountry: 'SN' },
        areaServed: 'Sénégal et à distance',
        knowsLanguage: 'fr',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: site.email,
          availableLanguage: 'fr',
        },
        ...(sameAs.length ? { sameAs } : {}),
      },
    ],
  };
}

// Page Projets : CollectionPage listant chaque projet (SoftwareSourceCode, avec le lien du dépôt). Aucun champ financier.
export function projectsJsonLd({ site, projects, url }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: `Projets — ${site.name}`,
        inLanguage: 'fr',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: projects.length,
          itemListElement: projects.map((project, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'SoftwareSourceCode',
              '@id': `${url}#${project.slug}`,
              name: project.name,
              description: project.description,
              url: `${url}#${project.slug}`,
              ...(project.github ? { codeRepository: project.github } : {}),
              programmingLanguage: project.tech,
              inLanguage: 'fr',
              author: { '@type': 'Person', name: site.owner },
              ...(project.demo ? { sameAs: [project.demo] } : {}),
              ...(project.year ? { dateCreated: String(project.year) } : {}),
            },
          })),
        },
      },
    ],
  };
}

// Page À propos : ProfilePage + Person. Uniquement des faits présents dans data/site.js ; aucun champ financier.
export function aboutJsonLd({ site, url }) {
  const sameAs = [site.github, site.linkedin].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: `À propos — ${site.name}`,
        inLanguage: 'fr',
        mainEntity: { '@id': `${url}#person` },
      },
      {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: site.owner,
        jobTitle: site.jobTitle,
        url: site.siteUrl,
        email: site.email,
        address: { '@type': 'PostalAddress', addressLocality: 'Dakar', addressCountry: 'SN' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'UVS' },
        knowsAbout: ['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'Laravel', 'MySQL'],
        worksFor: { '@type': 'Organization', name: site.name },
        ...(sameAs.length ? { sameAs } : {}),
      },
    ],
  };
}
