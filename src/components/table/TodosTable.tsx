import { Pencil, ToggleLeft, Trash2 } from "lucide-react"
import { useAppSelector,useAppDispatch } from "../../redux/hooks"
import { deleteTodo, toggleStatus } from "../../redux/slices/crudTodoSlice"
import './TodosTable.css'
import { Link } from "react-router-dom"


const TodosTable = () => {
  const todo = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  //const [selectedFilter,setSelectedFilter] = useState('default')


  return (
    <div className="container">
      <div className="header-btns">
      <Link to='/create'>
        <button className="btn-add">
          Добавить...
        </button>
      </Link>
      {/* <select 
        value={selectedFilter}
        onChange={(event) => {
          setSelectedFilter(event.target.value)
          }}>
        <option value='true'>Complete</option>
        <option value="false">Incomplete</option>
        <option value="all">All</option>
      </select>  */}
      </div>
      { todo.length ? 
        <table className="table">
            <thead>
                <tr>
                    <th>№</th>
                    <th style={{minWidth:200}}>Название</th>
                    <th></th>
                </tr>
            </thead>
        <tbody>
          {todo.map((item,index) => (
            <tr 
            key={item.id}
            draggable={true}
            className={item.completed ? 'completed' : 'default'}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>
                <div className="btns">
                <Link to={`/edit/${item.id}`}>
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