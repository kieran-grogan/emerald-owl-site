/**
 * Interface for defining benefits or features of services
 */

export interface BenefitOrFeature {
  /** Title of the benefit or feature */
  title: string;
  
  /** Description explaining the benefit or feature */
  description: string;
}

/**
 * Type for an array of benefit objects
 */
export type Benefits = BenefitOrFeature[];

/**
 * Type for an array of feature objects
 */
export type Features = BenefitOrFeature[]; 