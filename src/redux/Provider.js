import { useMemo } from "react";
import { ReduxContext } from "../context";

export function Provider({ store, context, children }) {
    //Kiểm tra value để rerender store 
    const contextValue = useMemo(() => { 
        return {
            store, 
        };
    }, [store]);

    //kiểm tra context truyền vào hoặc lấy context default = null
    const Context = context || ReduxContext
    return (
        <Context.Provider value={contextValue}>{children}</Context.Provider>
    );
} 
 
