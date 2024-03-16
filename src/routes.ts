import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  AGE: 'form-with-age-guess',
  FACTS: 'form-with-facts',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.AGE, `/${DEFAULT_VIEW_PANELS.AGE}`, []),
      createPanel(DEFAULT_VIEW_PANELS.FACTS, `/${DEFAULT_VIEW_PANELS.FACTS}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
