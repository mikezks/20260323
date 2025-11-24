import { InjectionToken, signal } from "@angular/core";

export type MenuItem = {
  label: string;
  route: string;
  icon: string;
  open?: boolean;
  items?: MenuItem[];
};

export type NavigationConfig = MenuItem[];

export const NAVIGATION_CONFIG = new InjectionToken<NavigationConfig>('NAVIGATION_CONFIG');

export abstract class AbstractNavigationService {
  state = signal<NavigationConfig>([]);

  abstract toggleMenu(menuItem: string, active?: boolean): void;
}

export type EntityState<T> = { entities: Record<string, T>, ids: string[] };
