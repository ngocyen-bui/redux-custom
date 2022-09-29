import React from "react";
import "./styles/base.css"
import "./styles/style.css"
import Header from "./components/header";
import Footer from "./components/footer";
import Todos from "./components/todos";  


function App() {
  
  return (
    <>
      <section className="todoapp">
        <Header />
        <Todos/> 
      </section>
      <Footer />
    </>
  );
}

export default App;
