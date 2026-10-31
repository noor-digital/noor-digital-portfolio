import { contactPage } from '../../data/site.js';
import useDakarTime from '../../hooks/useDakarTime.js';
import { rng } from '../../lib/prng.js';

// Ciel de Dakar en direct : le dégradé change avec le moment de la journée, le soleil (le jour) puis la lune
// (la nuit) parcourent l’arc selon l’heure locale, une horloge géante tourne à la minute, et un signal part de la
// ville vers l’extérieur (« me joindre »). Seuls transform et opacity bougent. Décoratif, sauf l’heure en texte.

const W = 600;
const H = 300;
const HORIZON = 244;
const CX = 300;
const RX = 250;
const RY = 176;

function partOf(hour) {
  if (hour >= 5.5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17.5) return 'afternoon';
  if (hour >= 17.5 && hour < 20) return 'evening';
  return 'night';
}

// Position sur l’arc (0 à 1) : le soleil de 6 h à 19 h, la lune de 19 h à 6 h.
function arcPosition(hour) {
  const day = hour >= 6 && hour < 19;
  const p = day ? (hour - 6) / 13 : ((hour >= 19 ? hour - 19 : hour + 5) / 11);
  return {
    day,
    x: CX - Math.cos(p * Math.PI) * RX,
    y: HORIZON - Math.sin(p * Math.PI) * RY,
  };
}

const STARS = (() => {
  const rand = rng(404);
  return Array.from({ length: 28 }, (_, i) => ({
    key: i,
    x: Math.round(rand() * W),
    y: Math.round(rand() * 150),
    r: rand() < 0.2 ? 1.6 : 1,
    delay: (rand() * 5).toFixed(2),
  }));
})();

const CITY = (() => {
  const rand = rng(77);
  const list = [];
  let x = 0;
  while (x < W) {
    const w = 18 + Math.round(rand() * 34);
    const h = 10 + Math.round(rand() * 38);
    list.push({ x, w, h });
    x += w + 2;
  }
  return list;
})();

export default function DakarSky() {
  const t = contactPage.where;
  const { hh, mm, hour } = useDakarTime();
  const part = partOf(hour);
  const { day, x, y } = arcPosition(hour);

  return (
    <div className="nh-ct-sky" data-part={part} role="group" aria-label={t.skyLabel}>
      <div className="nh-ct-sky__bg" aria-hidden="true">
        {['night', 'dawn', 'morning', 'afternoon', 'evening'].map((name) => (
          <span key={name} className={`nh-ct-sky__layer nh-ct-sky__layer--${name}`} data-on={part === name} />
        ))}
      </div>

      <svg className="nh-ct-sky__art" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
        <g className="nh-ct-sky__stars" data-on={!day}>
          {STARS.map((star) => (
            <circle key={star.key} className="nh-ct-star" cx={star.x} cy={star.y} r={star.r} fill="#D7E0EA" style={{ animationDelay: `${star.delay}s` }} />
          ))}
        </g>

        <path
          d={`M${CX - RX} ${HORIZON}A${RX} ${RY} 0 0 1 ${CX + RX} ${HORIZON}`}
          fill="none"
          stroke="#D7E0EA"
          strokeOpacity="0.28"
          strokeWidth="1.5"
          strokeDasharray="3 8"
        />

        {/* Astre : déplacé par transform (transition lente quand la minute change). */}
        <g className="nh-ct-sky__body" style={{ transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)` }}>
          {day ? (
            <>
              <circle r="30" fill="#16B8B0" fillOpacity="0.16" />
              <circle r="15" fill="#16B8B0" fillOpacity="0.3" />
              <circle r="8" fill="#F1F5F9" />
            </>
          ) : (
            <>
              <circle r="26" fill="#D7E0EA" fillOpacity="0.12" />
              <circle r="10" fill="#D7E0EA" />
              <circle cx="5" cy="-3" r="9" fill="#0b1628" />
            </>
          )}
        </g>

        {/* Silhouette de la ville et signal */}
        <g fill="#0a1830">
          {CITY.map((b) => (
            <rect key={b.x} x={b.x} y={HORIZON - b.h} width={b.w} height={b.h + H - HORIZON} />
          ))}
        </g>
        <rect x="0" y={HORIZON + 14} width={W} height={H - HORIZON} fill="#08142a" />
        <g className="nh-ct-sky__ping">
          <circle className="nh-ct-ring" cx={CX} cy={HORIZON - 4} r="10" />
          <circle className="nh-ct-ring nh-ct-ring--b" cx={CX} cy={HORIZON - 4} r="10" />
          <circle cx={CX} cy={HORIZON - 4} r="4" fill="#16B8B0" />
        </g>
      </svg>

      <div className="nh-ct-sky__hud">
        <p className="nh-ct-sky__now">{t.now}</p>
        <p className="nh-ct-sky__clock">
          <span>{hh}</span>
          <span className="nh-ct-sky__colon" aria-hidden="true">
            :
          </span>
          <span>{mm}</span>
        </p>
        <p className="nh-ct-sky__meta">
          {t.dayparts[part]} · {t.gmt}
        </p>
      </div>
    </div>
  );
}
