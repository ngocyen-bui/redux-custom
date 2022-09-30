## Hướng đi của Project 
### 1 - Khởi tạo store với createStore(reducers) (bao gồm các Func: getState, dispatch, subscribe )
    a) getState: lấy object state trong store 
    b) dispatch: function dùng để chạy action 
    c) subscribe: function dùng để đăng ký hành động 
### 2 - Hàm combineReducer dùng để kết hợp các reducers 
    
- function combination: cập nhật state theo action trong reducer
### 3 - Component Provider
### 4 - Hook useStore: Trả về function useStoreHook là một hàm trả về func useStore trả về store hiện tại
### 5 - Hook useDispatch: Nhận vào một context và chạy hàm dispatch trong store đã khởi tạo bên trên 
### 6 - Hook useSelector: Nhận vào một context và chạy hàm useSelector và trong đó chúng ta sẽ kiểm tra dữ liệu trong store và đăng ký cho hành động đó, 
 - function useSelectorWithStoreAndSubscription nhận vào selector và store -> trong đó có reducer , useMemo, useEffect -> checkForUpdates (lấy state và trả về)
