import { Pencil, ToggleLeft, Trash2 } from "lucide-react"
import { useAppSelector,useAppDispatch } from "../../redux/hooks"
import { TodoState, deleteTodo, toggleStatus } from "../../redux/slices/crudTodoSlice"
import './TodosTable.css'
import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import useFilter from "../../hooks/useFilter"

const TodosTable = () => {
  const todo = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  const [selectedFilter,setSelectedFilter] = useState('all')
  const filteredData = useFilter(selectedFilter, todo)
  const [todoList, setTodoList] = useState<TodoState[]>(filteredData)
  const dragPerson = useRef<number>(0)
  const draggedOverPerson = useRef<number>(0)

  useEffect(() => {
  setTodoList(filteredData)
}, [filteredData])

  function handleSort (){
    const todosClone = [...todoList]
    const temp = todosClone[dragPerson.current]
    todosClone[dragPerson.current] = todosClone[draggedOverPerson.current]
    todosClone[draggedOverPerson.current] = temp
    setTodoList(todosClone)
  }
  return (
    <div className="container">
      <div className="header-btns">
      <Link to='/todo-list/create'>
        <button className="btn-add">
          Добавить...
        </button>
      </Link>
      <select 
        value={selectedFilter}
        onChange={(event) => {
          setSelectedFilter(event.target.value)
          }}>
        <option value='true'>Выполненные</option>
        <option value="false">Не выполненные</option>
        <option value="all">Все</option>
      </select>  
      </div>
      { todo.length ? 
        <table className="table">
            <thead>
                <tr >
                    <th>№</th>
                    <th style={{minWidth:200}}>Название</th>
                    <th></th>
                </tr>
            </thead>
        <tbody>
          {todoList.map((item,index) => (
            <tr 
            key={item.id}
            draggable={true}
            onDragStart={() => dragPerson.current = index}
            onDragEnter={() => draggedOverPerson.current = index}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            
            className={item.completed ? 'completed' : 'default'}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>
                <div className="btns">
                <Link to={`/todo-list/edit/${item.id}`}>
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
                onClick={() => dispatch(deleteTodo(item.id))}>
                  <Trash2 size={18} />
                </button>
                <button
                title="Поменять статус"
                className="btn btn-done"
                onClick={()=> dispatch(toggleStatus({id:item.id, completed:!item.completed}))}
                >
                  <ToggleLeft size={18}/>
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table> 
        :
        <h4>Список пуст, добавьте запись !</h4>}
    </div>
  )
}

export default TodosTable