import { Pencil, ToggleLeft, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TodoState, deleteTodo, toggleStatus } from '../redux/slices/crudTodoSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

type TodoSingle = {
    todo: TodoState,
}

const TodoItem = ({todo}:TodoSingle,index:number) => {
    const todos = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch()
  return (
    <tr 
            draggable={true} 
            className={todo.completed ? 'completed' : 'default'}>
              <td>{index+1}</td>
              <td>{todo.name}</td>
              <td>
                <div className="btns">
                <Link to={`/edit/${todo.id}`}>
                  <button 
                  title="Редактировать" 
                  className="btn btn-edit"
                  >
                    <Pencil size={18}/>
                  </button>
                </Link>
                <button 
                title="Удалить"
                className="btn btn-delete"
                onClick={() => dispatch(deleteTodo(todo.id))}>
                  <Trash2 size={18} />
                </button>
                <button
                title="Поменять статус"
                className="btn btn-done"
                onClick={()=> dispatch(toggleStatus({id:todo.id, completed:!todo.completed}))}
                >
                  <ToggleLeft size={18}/>
                </button>
                </div>
              </td>
            </tr>
  )
}

export default TodoItem