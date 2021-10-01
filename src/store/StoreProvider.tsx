import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  ReactElement,
  ComponentType,
} from 'react';
import { Store } from './RootStore';

const StoreContext = createContext<Store>(null);
export const useStore = (): Store =>
  useContext(StoreContext);

export type StoreComponent = FC<{
  store: Store;
  children: ReactNode;
}>;

export const StoreProvider: StoreComponent = ({
  store,
  children,
}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export interface withStoreProps {
  store?: Store;
}

// HOC to be used with both class and functional components
export const withStore =
  <P extends object>(
    WrappedComponent: ComponentType<P & withStoreProps>,
  ) =>
  ({ ...props }: P) => {
    return (
      <WrappedComponent {...props} store={useStore()} />
    );
  };
