import { useId, useState } from 'react';
import { projectsPage } from '../../data/site.js';
import { techIcon } from '../home/techIcons.jsx';
import { techIconKey } from '../../lib/projectsUtil.js';
import ServicesIcon from '../services/ServicesIcons.jsx';

// Barre d’outils collante, sur UNE ligne : catégories (compteurs), recherche instantanée, technologies (panneau
// repliable, multi-sélection), tri (seulement si une année est renseignée) et bascule Grille / Liste.
// Le nombre de résultats et « Réinitialiser » sont affichés au-dessus de la liste (voir Projects.jsx).
export default function ProjectToolbar({
  categories,
  category,
  onCategory,
  techOptions,
  techs,
  onToggleTech,
  query,
  onQuery,
  view,
  onView,
  sort,
  onSort,
  hasSort,
}) {
  const t = projectsPage.toolbar;
  const uid = useId();
  const [open, setOpen] = useState(techs.length > 0);
  const panelId = `${uid}-techs`;

  return (
    <div className="nh-pj-bar" role="region" aria-label={t.label}>
      <div className="container">
        <div className="nh-pj-bar__row">
          <div className="nh-pj-cats" role="group" aria-label={t.categoryLabel}>
            {categories.map((option) => (
              <button
                key={option.value}
                type="button"
                className="nh-pj-tab"
                aria-pressed={category === option.value}
                onClick={() => onCategory(option.value)}
              >
                {option.label}
                <span className="nh-pj-tab__n">{option.count}</span>
              </button>
            ))}
          </div>

          <div className="nh-pj-tools">
            <div className="nh-pj-search">
              <ServicesIcon name="search" size={18} className="nh-pj-search__ico" />
              <label className="visually-hidden" htmlFor={`${uid}-q`}>
                {t.searchLabel}
              </label>
              <input
                id={`${uid}-q`}
                type="search"
                inputMode="search"
                autoComplete="off"
                placeholder={t.searchPlaceholder}
                value={query}
                onChange={(event) => onQuery(event.target.value)}
              />
              {query && (
                <button type="button" className="nh-pj-search__clear" onClick={() => onQuery('')} aria-label={t.clearSearch}>
                  <ServicesIcon name="close" size={16} />
                </button>
              )}
            </div>

            <button
              type="button"
              className="nh-pj-techtoggle"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              {t.techLabel}
              {techs.length > 0 && <span className="nh-pj-techtoggle__n">{techs.length}</span>}
              <ServicesIcon name="chevron" size={16} className="nh-pj-techtoggle__chev" />
            </button>

            {hasSort && (
              <label className="nh-pj-sort">
                <span className="visually-hidden">{t.sortLabel}</span>
                <select value={sort} onChange={(event) => onSort(event.target.value)}>
                  <option value="default">{t.sortDefault}</option>
                  <option value="recent">{t.sortRecent}</option>
                </select>
              </label>
            )}

            <div className="nh-pj-view" role="group" aria-label={t.viewLabel}>
              <button type="button" aria-pressed={view === 'grid'} onClick={() => onView('grid')}>
                <ServicesIcon name="grid" size={18} />
                <span>{t.grid}</span>
              </button>
              <button type="button" aria-pressed={view === 'list'} onClick={() => onView('list')}>
                <ServicesIcon name="list" size={18} />
                <span>{t.list}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Panneau des technologies : la hauteur passe de 0 à 1fr (CSS), le contenu fermé sort de la tabulation. */}
        <div className="nh-pj-techpanel" id={panelId} data-open={open} inert={!open}>
          <div className="nh-pj-techpanel__clip">
            <div className="nh-pj-techs" role="group" aria-label={t.techLabel}>
              {techOptions.map(({ name }) => {
                const key = techIconKey(name);
                const icon = key ? techIcon(key) : null;
                return (
                  <button
                    key={name}
                    type="button"
                    className="nh-pj-tech"
                    aria-pressed={techs.includes(name)}
                    style={icon ? { '--brand': icon.color } : undefined}
                    onClick={() => onToggleTech(name)}
                  >
                    {icon?.node && <span className="nh-pj-tech__ico">{icon.node}</span>}
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
