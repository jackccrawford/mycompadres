/**
 * Simple event emitter for cross-component communication
 */

type EventHandler = (...args: any[]) => void;

class EventEmitter {
  private events: Record<string, EventHandler[]> = {};

  // Subscribe to an event
  on(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  // Unsubscribe from an event
  off(event: string, handler: EventHandler): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(h => h !== handler);
  }

  // Emit an event with optional data
  emit(event: string, ...args: any[]): void {
    if (!this.events[event]) return;
    this.events[event].forEach(handler => {
      try {
        handler(...args);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }
}

// Create a singleton instance
export const eventEmitter = new EventEmitter();

// Event constants
export const EVENTS = {
  OPEN_PALETTE_MODAL: 'open_palette_modal',
  NAVIGATE_TO_SALES_INTELLIGENCE: 'navigate_to_sales_intelligence',
  NAVIGATE_TO_HOME: 'navigate_to_home',
  NAVIGATE_TO_WINDSURF: 'navigate_to_windsurf',
};
