import { createContext, useContext, useState } from "react";

// A "context" is shared memory that every page can read.
// Here it remembers which bikes the user picked for comparing.
const CompareContext = createContext(null);

export const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [selected, setSelected] = useState([]); // list of { id, name, brandName }

  const isSelected = (id) => selected.some((b) => b.id === id);

  const toggle = (bike) => {
    if (isSelected(bike.id)) {
      setSelected(selected.filter((b) => b.id !== bike.id));
    } else if (selected.length < MAX_COMPARE) {
      setSelected([...selected, { id: bike.id, name: bike.name, brandName: bike.brand.name }]);
    }
  };

  const remove = (id) => setSelected(selected.filter((b) => b.id !== id));
  const clear = () => setSelected([]);

  return (
    <CompareContext.Provider value={{ selected, isSelected, toggle, remove, clear }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);