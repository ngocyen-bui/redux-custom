import { useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { ReduxContext } from "../../context";
import { createSubscription } from "../utils/Subscription";
import { useReduxContextDefault } from "./useDispatch";


function useSelectorWithStoreAndSubscription(
  selector,
  store
) {
  //Dùng reducer để rerender 
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const subscription = useMemo(
    () => createSubscription(store),
    [store]
  );
  const latestSelector = useRef();
  const latestStoreState = useRef();
  const latestSelectedState = useRef();

  // Lấy object state từ store 
  const storeState = store.getState();
  let selectedState;

  try {
    //kiểm tra selector và state hiện tại có đang trùng với dữ liệu mới nhất không?
     // Nếu trùng thì không hoạt động và trả về select cũ 
    if (
      selector !== latestSelector.current ||
      storeState !== latestStoreState.current
    ) {
      const newSelectedState = selector(storeState);
      if (
        latestSelectedState.current === undefined 
      ) {
        selectedState = newSelectedState;
      } else {
        selectedState = latestSelectedState.current;
      }
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    throw err;
  }

  useEffect(() => {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
  });

  useEffect(() => {
    function checkForUpdates() {
      try {
        const newStoreState = store.getState();
        if (newStoreState === latestStoreState.current) {
          return;
        }
        const newSelectedState = latestSelector.current(newStoreState);
        latestSelectedState.current = newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        throw err;
      }
      forceRender();
    }
    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();

    checkForUpdates();

    return () => subscription.tryUnsubscribe();
  }, [store, subscription]);

  return selectedState;
}

export function createSelectorHook(context = ReduxContext) {
  const useReduxContext =
    context === ReduxContext
      ? useReduxContextDefault
      : () => useContext(context);
  return function useSelector(selector) {
    const { store } = useReduxContext();

    const selectedState = useSelectorWithStoreAndSubscription(
      selector,
      store,
    );

    return selectedState;
  };
}

export const useSelector = createSelectorHook();
