import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type NavigateFn = (to: string, replace?: boolean) => void;

const RouterContext = createContext<{ path: string; navigate: NavigateFn } | null>(null);

export const BrowserRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate: NavigateFn = (to, replace = false) => {
    if (to === path) return;
    if (replace) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }
    setPath(to);
  };

  const value = useMemo(() => ({ path, navigate }), [path]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('Router context not found. Wrap with BrowserRouter.');
  return ctx;
};

type RouteProps = {
  path: string;
  element: React.ReactNode;
};

const matchPath = (routePath: string, pathname: string): { ok: boolean; params: Record<string, string> } => {
  if (routePath === '*') return { ok: true, params: {} };
  const routeParts = routePath.split('/').filter(Boolean);
  const pathParts = pathname.split('/').filter(Boolean);
  if (routeParts.length !== pathParts.length) return { ok: false, params: {} };

  const params: Record<string, string> = {};
  for (let i = 0; i < routeParts.length; i += 1) {
    const routePart = routeParts[i];
    const pathPart = pathParts[i];
    if (routePart.startsWith(':')) {
      params[routePart.slice(1)] = decodeURIComponent(pathPart);
    } else if (routePart !== pathPart) {
      return { ok: false, params: {} };
    }
  }
  return { ok: true, params };
};

const ParamsContext = createContext<Record<string, string>>({});

export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { path } = useRouter();
  const routeNodes = React.Children.toArray(children) as React.ReactElement<RouteProps>[];

  let fallback: React.ReactNode = null;
  for (const node of routeNodes) {
    const result = matchPath(node.props.path, path);
    if (node.props.path === '*') fallback = node.props.element;
    if (result.ok) {
      return <ParamsContext.Provider value={result.params}>{node.props.element}</ParamsContext.Provider>;
    }
  }
  return <>{fallback}</>;
};

export const Route: React.FC<RouteProps> = () => null;

export const Navigate: React.FC<{ to: string; replace?: boolean }> = ({ to, replace = true }) => {
  const { navigate } = useRouter();
  useEffect(() => {
    navigate(to, replace);
  }, [navigate, to, replace]);
  return null;
};

export const NavLink: React.FC<{ to: string; className?: string | ((v: { isActive: boolean }) => string); children: React.ReactNode }> = ({ to, className, children }) => {
  const { path, navigate } = useRouter();
  const isActive = path === to;
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <a
      href={to}
      className={resolvedClassName}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};

export const useNavigate = () => {
  const { navigate } = useRouter();
  return (to: string, options?: { replace?: boolean }) => navigate(to, options?.replace);
};

export const useParams = <T extends Record<string, string>>() => useContext(ParamsContext) as T;

export const Outlet: React.FC = () => null;
