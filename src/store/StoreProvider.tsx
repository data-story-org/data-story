import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  ReactElement,
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

// HOC to be used with both class and functional components
export const withStore =
  (Component) => (props) => {
    return <Component {...props} store={useStore()} />;
  };
