import { Injectable, signal } from "@angular/core";
import { AbstractNavigationService, NavigationConfig } from "../../model-navigation/navigation.model";


@Injectable()
export class DefaultNavigationService implements AbstractNavigationService {
  state = signal<NavigationConfig>([]);

  toggleMenu(menuItem: string, active?: boolean): void {
    this.state.update(
      state => state.map(
        item => item.route === menuItem
          ? { ...item, open: active ?? !item.open }
          : item
      )
    );
  }
}
