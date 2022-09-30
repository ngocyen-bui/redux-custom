export default function createStore(reducer){
    if(typeof(reducer) !== 'function'){
        throw new Error('Reducer phải là function')
    }
    //Lấy lại reducer 
    let currentReducer = reducer; 
    //Chạy reducer lần đầu để lấy init state 
    let currentState = reducer()
    //tạo biến danh sách action listener
    let currentListeners = [];
    //Tạo biến để lắng nghe sự kiện subcribe
    let nextListeners = currentListeners   
    return {
        // Hàm này trả về các state (trạng thái) hiện tại
        getState(){
            return currentState
        },
        // Hàm này gửi đi action (hành động) để cập nhật state (trạng thái)
        dispatch(action){  
            currentState = currentReducer(currentState, action) 
            const listeners = (currentListeners = nextListeners) 
            // Vòng lặp này nhằm chạy lại các hành động đã được lắng nghe 
            for (let i = 0; i < listeners.length; i++) {
              const listener = listeners[i] 
              listener()
            }
        
            return action
        },
        // Hàm này gửi lên các hành động đã và đang đăng ký hành động 
        subscribe(listener){
            nextListeners.push(listener)  
            return function unsubscribe() {
                const index = nextListeners.indexOf(listener)
                nextListeners.splice(index, 1)
                currentListeners = null
              }
        }
    }
}