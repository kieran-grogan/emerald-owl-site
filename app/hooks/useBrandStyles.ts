import { brandConfig } from '../styles/brand';

type StyleConfig = typeof brandConfig;
type DeepKeys<T> = T extends object ? {
  [K in keyof T]: `${K & string}` | `${K & string}.${DeepKeys<T[K]> & string}`
}[keyof T] : never;

type StylePath = DeepKeys<StyleConfig>;

/**
 * Hook for accessing brand styles
 * Provides type-safe access to brand configuration
 */
export function useBrandStyles() {
  /**
   * Get a style value by its path
   * @param path Dot-notation path to style value
   * @returns Style value or class names
   */
  const getStyle = (path: StylePath): string => {
    return path.split('.').reduce((obj: any, key: string) => obj[key], brandConfig);
  };

  /**
   * Combine multiple style values
   * @param styles Array of style paths
   * @returns Combined class names
   */
  const combineStyles = (...styles: StylePath[]): string => {
    return styles.map(getStyle).join(' ');
  };

  /**
   * Get button styles with variants
   * @param variant Button variant
   * @param size Button size
   * @returns Combined button class names
   */
  const getButtonStyle = (
    variant: keyof typeof brandConfig.components.button.variants = 'primary',
    size: keyof typeof brandConfig.components.button.sizes = 'md'
  ): string => {
    return [
      brandConfig.components.button.base,
      brandConfig.components.button.variants[variant],
      brandConfig.components.button.sizes[size]
    ].join(' ');
  };

  /**
   * Get card styles with variants
   * @param variant Card variant
   * @returns Combined card class names
   */
  const getCardStyle = (
    variant: keyof typeof brandConfig.components.card.variants = 'elevated'
  ): string => {
    return [
      brandConfig.components.card.base,
      brandConfig.components.card.variants[variant]
    ].join(' ');
  };

  /**
   * Get input styles with variants
   * @param variant Input variant
   * @returns Combined input class names
   */
  const getInputStyle = (
    variant: keyof typeof brandConfig.components.input.variants = 'outlined'
  ): string => {
    return [
      brandConfig.components.input.base,
      brandConfig.components.input.variants[variant]
    ].join(' ');
  };

  /**
   * Get text styles with size and weight
   * @param size Text size
   * @param weight Font weight
   * @returns Combined text class names
   */
  const getTextStyle = (
    size: keyof typeof brandConfig.typography.sizes = 'base',
    weight: keyof typeof brandConfig.typography.weights = 'normal'
  ): string => {
    return [
      brandConfig.typography.sizes[size],
      brandConfig.typography.weights[weight]
    ].join(' ');
  };

  /**
   * Get animation styles
   * @param speed Animation speed
   * @param effects Additional effects (hover, etc.)
   * @returns Combined animation class names
   */
  const getAnimationStyle = (
    speed: keyof typeof brandConfig.animations.transition = 'normal',
    effects: (keyof typeof brandConfig.animations.hover)[] = []
  ): string => {
    return [
      brandConfig.animations.transition[speed],
      ...effects.map(effect => brandConfig.animations.hover[effect])
    ].join(' ');
  };

  return {
    getStyle,
    combineStyles,
    getButtonStyle,
    getCardStyle,
    getInputStyle,
    getTextStyle,
    getAnimationStyle,
    config: brandConfig
  };
} 