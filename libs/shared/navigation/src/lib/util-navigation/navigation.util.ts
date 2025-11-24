import { NavigationConfig, EntityState, MenuItem } from "../model-navigation/navigation.model";


export function mergeNavigationStates(
  state: NavigationConfig,
  additionalState: NavigationConfig[]
): NavigationConfig {
  const additionalFlat = additionalState.reduce<EntityState<MenuItem>>((acc, cur) => {
    const innerState = cur.reduce((a, c) => {
      a.entities[c.route] = c;
      a.ids.push(c.route);
      return a;
    }, acc);

    return innerState;
  }, { entities: {}, ids: [] });

  return state.map(item => {
    if (additionalFlat.entities[item.route]) {
      const presentItem = additionalFlat.entities[item.route];
      delete additionalFlat.entities[item.route];
      return presentItem;
    }

    return item;
  }).concat(
    additionalFlat.ids
      .reduce<NavigationConfig>((acc, cur) => {
        const item = additionalFlat.entities[cur];
        if (item) {
          acc.push(item);
        }

        return acc;
      }, [])
  );
}
