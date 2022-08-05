import React from "react";
import Header from "./layouts/Header";
import AddTodos from "./features/add-todos/AddTodos";
import TodoFilter from "./features/todo-filter/TodoFilter";
import Footer from "./layouts/Footer";
import TodoList from "./features/todo-list/TodoList";

function App({ status }) {
  return (
      <>
        <div className="todoapp" data-testid="todoapp">
          <Header>
            <AddTodos />
          </Header>
          <main className="main">
              <TodoList status={status} />
          </main>
          <TodoFilter />
        </div>
        <Footer/>
      </>
  );
}

export default App;
