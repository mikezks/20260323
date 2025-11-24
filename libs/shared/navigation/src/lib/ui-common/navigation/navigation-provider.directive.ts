import { Directive, effect, inject, input } from "@angular/core";
import { NavigationService, provideNavigationService } from "../../logic-navigation/provider/navigation.provider";
import { NavigationConfig } from "../../model-navigation/navigation.model";


@Directive({
  selector: '[navConfig]',
  standalone: true,
  providers: [
    provideNavigationService([])
  ]
})
export class NavigationProviderDirective {
  navService = inject(NavigationService);
  navConfig = input.required<NavigationConfig>();

  constructor() {
    effect(() =>
      this.navService.state.set(this.navConfig())
    );
  }
}
