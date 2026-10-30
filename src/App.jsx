import { MotionConfig } from 'motion/react';
import SiteLayout from './layout/SiteLayout.jsx';

export default function App() {
  // reducedMotion="user" : si le système demande moins d’animations, Motion désactive
  // automatiquement les déplacements (les fondus restent, plus doux).
  return (
    <MotionConfig reducedMotion="user">
      <SiteLayout />
    </MotionConfig>
  );
}
