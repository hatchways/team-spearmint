import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback } from 'react';

interface ISitterSearchContext {
  updateSitterSearchInfo: (location: string, start: Date, end: Date) => void;
  location: string | null;
  start: Date | null;
  end: Date | null;
}

export const SitterSearchContext = createContext<ISitterSearchContext>({
  updateSitterSearchInfo: () => null,
  location: null,
  start: null,
  end: null,
});

export const SitterSearchProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [location, setLocation] = useState<string | null>(null);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  const updateSitterSearchInfo = useCallback((location: string, start: Date, end: Date) => {
    setLocation(location);
    setStart(start);
    setEnd(end);
  }, []);

  return (
    <SitterSearchContext.Provider value={{ updateSitterSearchInfo, location, start, end }}>
      {children}
    </SitterSearchContext.Provider>
  );
};

export function useSitterSearch(): ISitterSearchContext {
  return useContext(SitterSearchContext);
}
