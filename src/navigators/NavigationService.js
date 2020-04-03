const config = {};
export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}
export function navigate(routeName, params) {
  if (config.navigator && routeName) {
    config.navigator.navigate(routeName, params);
  }
}
export function goBack() {
  if (config.navigator) {
    config.navigator.goBack();
  }
}
