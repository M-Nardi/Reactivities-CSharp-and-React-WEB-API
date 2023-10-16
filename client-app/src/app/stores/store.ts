import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
}


export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

//react hook para permitir o uso dos stores nos componentes
export function useStore() {
    return useContext(StoreContext);
}