import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * NavigationContext — a tiny in-memory router so the DMCI Homes Sales
 * CRF/RA screens can actually link to each other (sidebar, breadcrumbs,
 * project rows/cards, the Tower/Floor/Unit/Parking Slot/Service Area tabs)
 * without adding react-router as a dependency. Holds a simple history
 * stack so every screen's back button/breadcrumb behaves correctly
 * regardless of how the user arrived there.
 */

export type Screen =
  | "dashboard"
  | "properties"
  | "project-details"
  | "tower"
  | "floor"
  | "unit"
  | "parking-slot"
  | "service-area"
  | "unit-availability"
  | "unit-availability-details"
  | "unit-holding"
  | "unit-holding-details"
  | "clients"
  | "advance-commission"
  | "advance-commission-details"
  | "regular-commission"
  | "regular-commission-details"
  | "compliance"
  | "compliance-details"
  | "lottery-registration"
  | "lottery-unit-picker";

export interface Route {
  screen: Screen;
  /** Project name for context, used by Project Details and the five resource tables. */
  project?: string;
  /** Row identifier for context, used by the Unit Availability / Unit Holding detail screens. */
  itemId?: string;
}

interface NavigationContextValue {
  route: Route;
  navigate: (route: Route) => void;
  back: () => void;
  canGoBack: boolean;
}

const DEFAULT_ROUTE: Route = { screen: "dashboard" };

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children, initialRoute = DEFAULT_ROUTE }: { children: ReactNode; initialRoute?: Route }) {
  const [stack, setStack] = useState<Route[]>([initialRoute]);

  const navigate = useCallback((route: Route) => {
    setStack((prev) => [...prev, route]);
  }, []);

  const back = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({ route: stack[stack.length - 1], navigate, back, canGoBack: stack.length > 1 }),
    [stack, navigate, back]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return ctx;
}
