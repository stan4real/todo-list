import { useEffect,useState } from 'react'
import { TodoState } from '../redux/slices/crudTodoSlice'

const useFilter = (selectedFilter:string,todo:TodoState[]) => {
    const [newList, setNewList] = useState<TodoState[]>(todo)

    useEffect(() => {
        const filterList = todo.filter(todo => {
          if (selectedFilter==='true'){
              return todo.completed === true
          } else if (selectedFilter === 'false'){
              return todo.completed === false
          } else {
              return todo
          }
        })
        setNewList(filterList)
      }, [selectedFilter,todo])

  return newList
}

export default useFilter