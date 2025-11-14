/**
 * @ai-pattern UI Pattern Types
 * Bridges between patterns and their visual representations
 */

import { PatternId } from './pattern';

/**
 * UI states that represent user interaction stages
 */
export type UIState = 
  | 'initial'     // First render
  | 'loading'     // Loading data
  | 'ready'       // Ready for interaction
  | 'busy'        // Processing
  | 'error'       // Error state
  | 'success';    // Success state

/**
 * Base props that all pattern components receive
 */
export interface PatternProps {
  id?: PatternId;
  className?: string;
  testId?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

/**
 * Interactive element states
 */
export interface InteractionState {
  isHovered?: boolean;
  isFocused?: boolean;
  isPressed?: boolean;
  isSelected?: boolean;
}

/**
 * Animation states for smooth transitions
 */
export interface AnimationState {
  isAnimating: boolean;
  direction?: 'in' | 'out';
  duration?: number;
}

/**
 * Responsive breakpoints for adaptive patterns
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Theme-aware color roles
 */
export type ColorRole = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

/**
 * Base interface for all UI patterns
 */
export interface UIPattern extends PatternProps {
  state?: UIState;
  interaction?: InteractionState;
  animation?: AnimationState;
  breakpoint?: Breakpoint;
  colorRole?: ColorRole;
}

/**
 * Pattern-specific analytics event
 */
export interface PatternAnalyticsEvent {
  patternId?: PatternId;
  eventName: string;
  properties?: Record<string, unknown>;
  timestamp: number;
}
