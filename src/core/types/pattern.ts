/**
 * @ai-pattern Core Pattern Types
 * Defines the base types for all patterns in the system
 */

/**
 * Unique identifier for any pattern instance
 * @ai-transform Can be adapted for different ID systems
 */
export type PatternId = string;

/**
 * Pattern lifecycle states that all patterns can potentially have
 */
export type PatternLifecycle = 
  | 'draft'      // Pattern is being created/edited
  | 'active'     // Pattern is in active use
  | 'archived'   // Pattern is no longer in active use
  | 'deleted';   // Pattern is marked for deletion

/**
 * Base metadata that all patterns share
 */
export interface PatternMetadata {
  id: PatternId;
  name: string;
  description?: string;
  created: number;      // Unix timestamp
  modified: number;     // Unix timestamp
  lifecycle: PatternLifecycle;
  version: number;      // For optimistic concurrency
  tags?: string[];      // For categorization and search
}

/**
 * Base interface that all patterns extend
 * @template T - The specific pattern's data type
 */
export interface Pattern<T> extends PatternMetadata {
  type: string;         // Discriminator for pattern type
  data: T;             // Pattern-specific data
}

/**
 * Pattern update operations
 * @template T - The specific pattern's data type
 */
export type PatternUpdate<T> = Partial<Pattern<T>>;

/**
 * Result of a pattern operation
 * @template T - The result data type
 */
export interface PatternResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;    // When the operation completed
}

/**
 * Pattern validation result
 */
export interface PatternValidation {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

/**
 * Pattern event types for tracking changes
 */
export type PatternEventType = 
  | 'created'
  | 'updated'
  | 'archived'
  | 'deleted'
  | 'restored'
  | 'validated'
  | 'transformed';

/**
 * Pattern event for audit and tracking
 */
export interface PatternEvent {
  id: PatternId;
  type: PatternEventType;
  timestamp: number;
  actor?: string;       // Who/what caused the event
  details?: unknown;    // Event-specific details
}
