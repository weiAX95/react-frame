import type { Draft } from 'immer';
import { useAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

import { counterAtom } from '../states';

// 创建一个 immer atom
const todoAtom = atomWithImmer([
  { id: 1, text: 'Learn Jotai', done: false },
  { id: 2, text: 'Learn Immer', done: false },
]);

function TodoList() {
  const [count, setCount] = useAtom(counterAtom);
  const [todos, updateTodos] = useAtom(todoAtom);
  const inc = () =>
    setCount((draft: Draft<{ value: number }>) => {
      // eslint-disable-next-line no-param-reassign
      draft.value = 1;
    });
  // useEffect(() => {
  // }, [count])
  const toggleTodo = (id: number) => {
    updateTodos(draft => {
      const todo = draft.find(t => t.id === id);
      if (todo) todo.done = !todo.done;
    });
  };

  return (
    <>
      <button type="button" onClick={inc}>
        {count.value}
      </button>
      <ul>
        {todos.map(todo => (
          <button type="button" key={todo.id} onClick={() => toggleTodo(todo.id)}>
            {todo.text} -{todo.done ? 'Done' : 'Pending'}
          </button>
        ))}
      </ul>
    </>
  );
}

TodoList.whyDidYouRender = true;
export default TodoList;
