/**
 * MenuItem — Domain representation of a navigation menu item.
 *
 * Menu items can be sourced from:
 * 1. Static TypeScript config (default)
 * 2. Backend API (dynamic menus)
 * 3. Role-based filtering (visibility)
 *
 * The MenuRepository abstracts the data source.
 */
export interface MenuItem {
  /** Unique identifier */
  readonly id: string;

  /** Display label */
  readonly label: string;

  /** Bootstrap icon class (e.g., 'bi-grid-fill') */
  readonly icon?: string;

  /** Route path (e.g., '/dashboard') */
  readonly route?: string;

  /** Optional badge text (e.g., 'MAIN', 'NEW', '3') */
  readonly badge?: string;

  /** Badge CSS color variant */
  readonly badgeVariant?: string;

  /** Child menu items (for accordion/submenu) */
  readonly children?: readonly MenuItem[];

  /** Required permissions to see this menu item */
  readonly permissions?: readonly string[];

  /** Required roles to see this menu item */
  readonly roles?: readonly string[];

  /** Section header label (used for section dividers like "Productivity Apps") */
  readonly sectionHeader?: string;

  /** Whether this item is a section divider (not clickable) */
  readonly isDivider?: boolean;
}
