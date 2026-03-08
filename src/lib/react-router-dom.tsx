import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);
const OutletContext = createContext<ReactNode>(null);

interface BrowserRouterProps {
  children: ReactNode;
}

export function BrowserRouter({ children }: BrowserRouterProps) {
  const [pathname, setPathname] = useState(window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to);
      setPathname(to);
    }
  };

  const value = useMemo(() => ({ pathname, navigate }), [pathname]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

interface RouteProps {
  key?: string;
  path?: string;
  element: ReactElement;
  children?: ReactNode;
}

export function Route(_: RouteProps) {
  return null;
}

interface RoutesProps {
  children: ReactNode;
}

function joinPaths(base: string, child: string) {
  if (child.startsWith('/')) {
    return child;
  }
  const normalizedBase = base === '/' ? '' : base;
  return `${normalizedBase}/${child}`.replace(/\/+/g, '/');
}

function flattenRoutes(children: ReactNode, parentPath = ''): Array<{ path: string; element: ReactElement }> {
  const items: Array<{ path: string; element: ReactElement }> = [];

  for (const child of (Array.isArray(children) ? children : [children])) {
    if (!child || typeof child !== 'object') continue;
    const element = child as ReactElement<RouteProps>;
    if (element.type !== Route) continue;

    const routePath = element.props.path ?? '';
    const fullPath = routePath ? joinPaths(parentPath || '/', routePath) : parentPath || '/';

    const nested = element.props.element;
    if (nested?.type === OutletLayout) {
      const nestedChildren = (nested.props as { children?: ReactNode }).children;
      items.push(...flattenRoutes(nestedChildren, fullPath));
      continue;
    }

    const nestedChildren = (element.props as { children?: ReactNode }).children;
    if (nestedChildren) {
      const nestedRoutes = flattenRoutes(nestedChildren, fullPath);
      for (const nestedRoute of nestedRoutes) {
        items.push({
          path: nestedRoute.path,
          element: <OutletContext.Provider value={nestedRoute.element}>{element.props.element}</OutletContext.Provider>,
        });
      }
      continue;
    }

    items.push({ path: fullPath, element: element.props.element });
  }

  return items;
}

function OutletLayout({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: RoutesProps) {
  const router = useContext(RouterContext);
  if (!router) throw new Error('Routes must be used within BrowserRouter.');

  const routes = flattenRoutes(children);
  const exactMatch = routes.find((route) => route.path === router.pathname);
  const rootMatch = routes.find((route) => route.path === '/');
  return exactMatch?.element ?? rootMatch?.element ?? null;
}

export function Outlet() {
  const outlet = useContext(OutletContext);
  return <>{outlet}</>;
}

export function useLocation() {
  const router = useContext(RouterContext);
  if (!router) throw new Error('useLocation must be used within BrowserRouter.');
  return { pathname: router.pathname };
}

export function useNavigate() {
  const router = useContext(RouterContext);
  if (!router) throw new Error('useNavigate must be used within BrowserRouter.');
  return router.navigate;
}

interface NavLinkProps {
  key?: string;
  to: string;
  children: ReactNode | ((arg: { isActive: boolean }) => ReactNode);
  className?: string | ((arg: { isActive: boolean }) => string);
  onClick?: () => void;
}

export function NavLink({ to, children, className, onClick }: NavLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;

  const resolvedClassName =
    typeof className === 'function' ? className({ isActive }) : className;
  const content = typeof children === 'function' ? children({ isActive }) : children;

  return (
    <a
      href={to}
      className={resolvedClassName}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
        navigate(to);
      }}
    >
      {content}
    </a>
  );
}
