/**
 * MenuItem — Domain representation of a navigation menu item.
 */
export interface MenuItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly route?: string;
  readonly badge?: string;
  readonly badgeVariant?: string;
  readonly children?: readonly MenuItem[];
  readonly permissions?: readonly string[];
  readonly roles?: readonly string[];
  readonly sectionHeader?: string;
  readonly isDivider?: boolean;
}
