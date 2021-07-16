import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  ReactElement,
} from 'react';
import { Store } from './main';

const StoreContext = createContext<Store>();
export const useStore = (): Store => useContext(StoreContext);

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
