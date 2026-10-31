import { motion, useTransform } from 'motion/react';

// Une couche de la scène : elle se décale légèrement avec le curseur (plus la couche est « proche »,
// plus elle bouge). Seul `transform` est animé. `parallax` = false : la couche reste immobile.
function Layer({ depth, mx, my, parallax, className, children }) {
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div className={`nh-sv-layer ${className}`} style={parallax ? { x, y } : undefined}>
      {children}
    </motion.div>
  );
}

// Scène du hero : un navigateur, un téléphone et le schéma PHP / Laravel / MySQL, en trois profondeurs.
// Illustration purement décorative (masquée aux lecteurs d’écran), construite en HTML/CSS : aucune image.
export default function HeroScene({ mx, my, parallax }) {
  return (
    <div className="nh-sv-scene" aria-hidden="true">
      <div className="nh-sv-scene__ring" />

      <Layer depth={10} mx={mx} my={my} parallax={parallax} className="nh-sv-layer--back">
        <div className="nh-sv-float" style={{ '--dur': '9s', '--del': '-3s' }}>
          <div className="nh-sv-schema">
            <span className="nh-sv-schema__node">PHP</span>
            <span className="nh-sv-schema__link">
              <i />
            </span>
            <span className="nh-sv-schema__node nh-sv-schema__node--hot">Laravel</span>
            <span className="nh-sv-schema__link">
              <i />
            </span>
            <span className="nh-sv-schema__node nh-sv-schema__node--db">MySQL</span>
          </div>
        </div>
      </Layer>

      <Layer depth={22} mx={mx} my={my} parallax={parallax} className="nh-sv-layer--mid">
        <div className="nh-sv-float" style={{ '--dur': '8s', '--del': '0s' }}>
          <div className="nh-sv-browser">
            <div className="nh-sv-browser__bar">
              <i />
              <i />
              <i />
              <span />
            </div>
            <div className="nh-sv-browser__body">
              <div className="nh-sv-browser__nav">
                <b />
                <span />
                <span />
                <span />
              </div>
              <div className="nh-sv-browser__hero">
                <div className="nh-sv-browser__text">
                  <em />
                  <em />
                  <em />
                  <u />
                </div>
                <div className="nh-sv-browser__img" />
              </div>
              <div className="nh-sv-browser__cards">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </Layer>

      <Layer depth={38} mx={mx} my={my} parallax={parallax} className="nh-sv-layer--front">
        <div className="nh-sv-float" style={{ '--dur': '7s', '--del': '-1.5s' }}>
          <div className="nh-sv-phone">
            <div className="nh-sv-phone__notch" />
            <div className="nh-sv-phone__screen">
              <em />
              <em />
              <div className="nh-sv-phone__block" />
              <u />
            </div>
          </div>
        </div>
      </Layer>
    </div>
  );
}
