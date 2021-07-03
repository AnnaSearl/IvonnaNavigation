import * as React from 'react';
import { StoreManagerProps } from './Store';

type StoreContextType = StoreManagerProps & { forceRender: () => void };

const StoreContext = React.createContext<StoreContextType>({
  forceRender: () => {},
});

export default StoreContext;
