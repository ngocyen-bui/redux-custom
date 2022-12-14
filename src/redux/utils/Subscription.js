 
export function createSubscription(store) {
  let unsubscribe; 
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange() 
    }
  }
  function trySubscribe() {
    if (!unsubscribe) {
      // gọi hàm subscribe từ store và gán cho biến unsubscribe
      unsubscribe = store.subscribe(handleChangeWrapper)
    }
  } 
  function tryUnsubscribe() {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = undefined
    }
  }

  const subscription = {
    handleChangeWrapper,
    trySubscribe,
    tryUnsubscribe,
  }

  return subscription
}
