import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import { getRoute, projectsPage, site } from '../data/site.js';
import { projectCategories, projects } from '../data/projects.js';
import { allFamilies, matches } from '../lib/projectsUtil.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import ProjectsHero from '../components/projects/ProjectsHero.jsx';
import ProjectToolbar from '../components/projects/ProjectToolbar.jsx';
import FeaturedProject from '../components/projects/FeaturedProject.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import ProjectList from '../components/projects/ProjectList.jsx';
import ProjectDrawer from '../components/projects/ProjectDrawer.jsx';
import EmptyState from '../components/projects/EmptyState.jsx';
import HowIWork from '../components/projects/HowIWork.jsx';
import ProjectsFloatingCta from '../components/projects/ProjectsFloatingCta.jsx';
import PageClose from '../components/home/PageClose.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

const ALL = 'all';
const VIEW_KEY = 'nh-pj-view';
const FAMILIES = allFamilies(projects);
const HAS_YEARS = projects.some((project) => project.year);

function readView() {
  try {
    return window.sessionStorage.getItem(VIEW_KEY) === 'list' ? 'list' : 'grid';
  } catch {
    return 'grid';
  }
}

// Projets : hero « showreel » → barre d’outils collante (catégories, recherche, technologies, vue, tri) →
// projet à la une → grille de cartes (ou liste) → comment je travaille → clôture. Un clic sur un projet ouvre
// sa fiche, synchronisée avec le hash (/projets#slug : même convention qu’avant, utilisée par l’accueil).
// Les filtres sont synchronisés avec l’URL (?cat=, ?tech=, ?q=) pour partager une vue filtrée.
// Données : data/projects.js ; textes : data/site.js (projectsPage). Aucune mention financière.
export default function Projects() {
  useDocumentTitle(getRoute('/projets'));
  const reduce = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();

  // ── Filtres, lus dans l’URL (catégorie et technologies) ; la recherche est locale puis reportée dans l’URL.
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const catParam = params.get('cat');
  const category = catParam && projectCategories.includes(catParam) ? catParam : ALL;
  const techs = (params.get('tech') ?? '').split(',').filter((name) => FAMILIES.some((family) => family.name === name));
  const [query, setQuery] = useState(() => params.get('q') ?? '');
  const [view, setViewState] = useState(readView);
  const [sort, setSort] = useState('default');

  const writeParams = useCallback(
    (changes) => {
      const next = new URLSearchParams(location.search);
      Object.entries(changes).forEach(([key, value]) => {
        if (value && value.length) next.set(key, Array.isArray(value) ? value.join(',') : value);
        else next.delete(key);
      });
      const search = next.toString();
      navigate({ pathname: location.pathname, search: search ? `?${search}` : '', hash: location.hash }, { replace: true, state: location.state });
    },
    [location.pathname, location.search, location.hash, location.state, navigate],
  );

  // La recherche s’applique tout de suite ; l’URL suit après une courte pause (pas d’historique encombré).
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const current = params.get('q') ?? '';
      if (current !== query.trim()) writeParams({ q: query.trim() });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [query, params, writeParams]);

  const setCategory = (value) => writeParams({ cat: value === ALL ? '' : value });
  const toggleTech = (name) => writeParams({ tech: techs.includes(name) ? techs.filter((t) => t !== name) : [...techs, name] });
  const setView = (value) => {
    setViewState(value);
    try {
      window.sessionStorage.setItem(VIEW_KEY, value);
    } catch {
      /* stockage indisponible : le choix vaut pour cette visite seulement */
    }
  };
  const reset = () => {
    setQuery('');
    setSort('default');
    writeParams({ cat: '', tech: '', q: '' });
  };

  const active = category !== ALL || techs.length > 0 || query.trim() !== '';

  const categories = useMemo(
    () => [
      { value: ALL, label: projectsPage.toolbar.all, count: projects.length },
      ...projectCategories.map((name) => ({ value: name, label: name, count: projects.filter((p) => p.category === name).length })),
    ],
    [],
  );

  const visible = useMemo(() => {
    const list = projects.filter((project) => matches(project, { category, techs, query }));
    if (sort === 'recent') return [...list].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    return list;
    // `techs` est recalculé à chaque rendu : on suit sa valeur sérialisée.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, techs.join(','), query, sort]);

  const featured = projects.find((project) => project.featured) ?? projects[0];
  const showFeatured = !active && view === 'grid' && sort === 'default';
  const gridItems = showFeatured ? visible.filter((project) => project !== featured) : visible;

  const countText = `${visible.length} ${visible.length > 1 ? 'projets affichés' : 'projet affiché'}${
    category !== ALL ? ` — ${category}` : ''
  }`;

  // ── Fiche détaillée, synchronisée avec le hash.
  const slug = decodeURIComponent(location.hash.slice(1));
  const index = projects.findIndex((project) => project.slug === slug);
  const current = index >= 0 ? projects[index] : null;
  const opener = useRef(null);
  const wasOpen = useRef(false);

  const openFrom = (element) => {
    opener.current = element;
  };
  const close = useCallback(() => {
    // Ouverte depuis une carte : on revient en arrière (le bouton Retour ferme donc la fiche aussi).
    if (location.state?.drawer) navigate(-1);
    else navigate({ pathname: location.pathname, search: location.search }, { replace: true });
  }, [location.pathname, location.search, location.state, navigate]);
  const goTo = (target) =>
    navigate({ pathname: location.pathname, search: location.search, hash: `#${target}` }, { replace: true, state: { drawer: true } });

  // Fermeture : le focus retourne sur la carte d’origine (si on vient d’une autre page, il reste sur le titre).
  useEffect(() => {
    if (current) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      const element = opener.current;
      if (element && element.isConnected) element.focus({ preventScroll: true });
      else document.querySelector('main h1')?.focus({ preventScroll: true });
    }
  }, [current]);

  function scrollToList() {
    document.getElementById('pj-list')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  const { closing } = projectsPage;

  return (
    <div className="home nh nh-pj">
      {/* La page entière devient inerte derrière la fiche ouverte : aucune tabulation ni lecture « derrière ». */}
      <div inert={Boolean(current)}>
        <ScrollRail />
        <ProjectsHero onScrollDown={scrollToList} />

        <section id="pj-list" className="nh-pj-list" aria-label="Liste des projets">
          <ProjectToolbar
            categories={categories}
            category={category}
            onCategory={setCategory}
            techOptions={FAMILIES}
            techs={techs}
            onToggleTech={toggleTech}
            query={query}
            onQuery={setQuery}
            view={view}
            onView={setView}
            sort={sort}
            onSort={setSort}
            hasSort={HAS_YEARS}
          />

          <div className="container nh-pj-results">
            <div className="nh-pj-resulthead">
              <p className="nh-pj-count" role="status" aria-live="polite">
                {countText}
              </p>
              {active && (
                <button type="button" className="nh-pj-reset" onClick={reset}>
                  {projectsPage.toolbar.reset}
                </button>
              )}
            </div>
            {visible.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              <>
                {showFeatured && <FeaturedProject project={featured} index={projects.indexOf(featured)} onOpen={openFrom} />}

                {view === 'grid' ? (
                  <ul className="nh-pj-grid">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {gridItems.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} index={i} onOpen={openFrom} />
                      ))}
                    </AnimatePresence>
                  </ul>
                ) : (
                  <ProjectList projects={visible} allProjects={projects} onOpen={openFrom} />
                )}
              </>
            )}
          </div>
        </section>

        <HowIWork />

        <PageClose
          id="projects-close"
          titleLines={closing.titleLines}
          actions={[
            { label: closing.primary, to: '/contact' },
            { label: closing.secondary, href: site.github, external: true, variant: 'ghost' },
          ]}
        />
        <ProjectsFloatingCta />
      </div>

      <AnimatePresence>
        {current && (
          <ProjectDrawer
            key="drawer"
            project={current}
            position={index}
            total={projects.length}
            previous={projects[(index - 1 + projects.length) % projects.length]}
            next={projects[(index + 1) % projects.length]}
            onClose={close}
            onGo={goTo}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
