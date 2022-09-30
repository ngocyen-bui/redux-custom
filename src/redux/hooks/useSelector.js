import { useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { ReduxContext } from "../../context";
import { createSubscription } from "../utils/Subscription"; 
import { useReduxContextDefault } from "./useReduxContext";


// Hàm trả về state muốn lấy từ store và rerender lại component nếu như có thay đổi state
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
  //selector mới nhất 
  const latestSelector = useRef();
  //state mới nhất trong store
  const latestStoreState = useRef();
  //selected state mới nhất 
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
      selectedState =
        latestSelectedState.current === undefined
          ? newSelectedState
          : latestSelectedState.current;
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    throw err;
  }

  //Gán dữ liệu và biến ref
  useEffect(() => {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
  });

  // Cập nhật khi store thay đổi 
  useEffect(() => {
    function checkForUpdates() {
      try {
        // lấy store
        const newStoreState = store.getState();
        if (newStoreState === latestStoreState.current) {
          return;
        }
        // chạy selector hiện tại 
        const newSelectedState = latestSelector.current(newStoreState);
        // gán lại state của select và store
        latestSelectedState.current = newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        throw err;
      }
      // Khi thay đổi store thì render lại component 
      forceRender();
    }
    // Gán lại onStateChange khi store thay đổi
    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    
    checkForUpdates();

    return () => subscription.tryUnsubscribe();
  }, [store, subscription]);  
  
  return selectedState;
}

export function createSelectorHook(context = ReduxContext) {
  //Lấy context, nếu có truyền vào context thì tạo context mới, ngược lại thì lấy default 
  const useReduxContext = context === ReduxContext ? useReduxContextDefault : () => useContext(context);
 
  return function useSelector(selector) {
    const { store } = useReduxContext(); 
    // Hàm trả về state muốn lấy từ store và rerender lại component nếu như có thay đổi state
    const selectedState = useSelectorWithStoreAndSubscription(
      selector,
      store,
    );

    return selectedState;
  };
}

export const useSelector = createSelectorHook();
