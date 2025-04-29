'use client';

import { useBrandStyles } from '../hooks/useBrandStyles';

export default function StyleGuide() {
  const styles = useBrandStyles();
  const { config } = styles;

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Emerald Owl Style Guide</h1>

      {/* Colors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Colors</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl mb-4">Primary Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-6 rounded-lg bg-emerald-600 text-white">Primary</div>
              <div className="p-6 rounded-lg bg-emerald-400 text-white">Light</div>
              <div className="p-6 rounded-lg bg-emerald-800 text-white">Dark</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-4">Secondary Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-6 rounded-lg bg-owl-500 text-white">Secondary</div>
              <div className="p-6 rounded-lg bg-owl-300 text-white">Light</div>
              <div className="p-6 rounded-lg bg-owl-700 text-white">Dark</div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Typography</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl mb-4">Headings</h3>
            <div className="space-y-4">
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-4">Text Styles</h3>
            <div className="space-y-2">
              <p className={styles.getTextStyle('xs')}>Extra Small Text</p>
              <p className={styles.getTextStyle('sm')}>Small Text</p>
              <p className={styles.getTextStyle('base')}>Base Text</p>
              <p className={styles.getTextStyle('lg')}>Large Text</p>
              <p className={styles.getTextStyle('xl')}>Extra Large Text</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-4">Font Weights</h3>
            <div className="space-y-2">
              <p className={styles.getTextStyle('base', 'light')}>Light Text</p>
              <p className={styles.getTextStyle('base', 'normal')}>Normal Text</p>
              <p className={styles.getTextStyle('base', 'medium')}>Medium Text</p>
              <p className={styles.getTextStyle('base', 'semibold')}>Semibold Text</p>
              <p className={styles.getTextStyle('base', 'bold')}>Bold Text</p>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl mb-4">Variants</h3>
            <div className="space-x-4">
              <button className={styles.getButtonStyle('primary')}>Primary Button</button>
              <button className={styles.getButtonStyle('secondary')}>Secondary Button</button>
              <button className={styles.getButtonStyle('outline')}>Outline Button</button>
              <button className={styles.getButtonStyle('ghost')}>Ghost Button</button>
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-4">Sizes</h3>
            <div className="space-x-4">
              <button className={styles.getButtonStyle('primary', 'sm')}>Small</button>
              <button className={styles.getButtonStyle('primary', 'md')}>Medium</button>
              <button className={styles.getButtonStyle('primary', 'lg')}>Large</button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Cards</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className={styles.getCardStyle('elevated')}>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
              <p>This is an elevated card with shadow.</p>
            </div>
          </div>

          <div className={styles.getCardStyle('outlined')}>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
              <p>This is an outlined card with border.</p>
            </div>
          </div>

          <div className={styles.getCardStyle('filled')}>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Filled Card</h3>
              <p>This is a filled card with background.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Animations & Effects</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className={styles.getAnimationStyle('normal', ['scale'])}>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Hover Scale</h3>
              <p>Hover to see scale effect</p>
            </div>
          </div>

          <div className={styles.getAnimationStyle('normal', ['lift'])}>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Hover Lift</h3>
              <p>Hover to see lift effect</p>
            </div>
          </div>

          <div className={styles.getAnimationStyle('normal', ['glow'])}>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Hover Glow</h3>
              <p>Hover to see glow effect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradients */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Gradients</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className={styles.getStyle('effects.gradient.primary') + ' p-6 rounded-lg text-white'}>
            <h3 className="text-lg font-semibold">Primary Gradient</h3>
          </div>

          <div className={styles.getStyle('effects.gradient.secondary') + ' p-6 rounded-lg text-white'}>
            <h3 className="text-lg font-semibold">Secondary Gradient</h3>
          </div>

          <div className={styles.getStyle('effects.gradient.subtle') + ' p-6 rounded-lg border'}>
            <h3 className="text-lg font-semibold">Subtle Gradient</h3>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Form Elements</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl mb-4">Input Variants</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Outlined Input" 
                className={styles.getInputStyle('outlined')}
              />
              <input 
                type="text" 
                placeholder="Filled Input" 
                className={styles.getInputStyle('filled')}
              />
              <input 
                type="text" 
                placeholder="Standard Input" 
                className={styles.getInputStyle('standard')}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 