import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}


export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

//react hook para permitir o uso dos stores nos componentes
export function useStore() {
    return useContext(StoreContext);
}