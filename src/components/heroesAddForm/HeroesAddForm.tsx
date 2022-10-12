import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { ListService } from "../../service/ListService";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";

import { heroesAddFromForm} from "../heroesList/heroesSlice";

// interface FormData { 
//     id: string,
//     name: string,
//     description: string,
//     element: string
// }

export interface Options { 
    id: string,
    value: string,
    label: string,
    colored: string,
    active: boolean
}
interface FormDataItem { 
    id: string,
    name: string,
    description: string,
    element: string
}

const HeroesAddForm = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [element, setElement] = useState('')
    const [options, setOptions]= useState<Options[]>([])
    
    const id =  uuidv4();
    const {requestFilter, requestHeroes} = ListService();

    const formData:FormDataItem = 
    {
        id,
        name,
        description,
        element
    }

    const {filtersLoadingStatus} = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch()

    const formSubmit = (event: React.ChangeEvent<HTMLFormElement>) => { 
        event.preventDefault();
        event.target.reset();
        requestHeroes('http://localhost:3001/heroes', 'POST', JSON.stringify(formData))
        // .then(dispatch(heroesAddFromForm(formData)))
        // 
            dispatch(heroesAddFromForm(formData))
       
    }

    useEffect(() => { 
        requestFilter('http://localhost:3001/filters')
            .then((res) => setOptions(res))
    },[])

    const renderSelect = (options:Options[], status:string) => { 
        if(status === 'loading') { 
            return <option>Загрузка элементов</option>
        } else if (status === 'error') { 
            return <option>Ошибка загрузки</option>
        }
        
        if(options.length > 0) { 
            const item = options.slice(1).map((item) => { 
                return ( 
                    <option value={item.value} key={item.id}>{item.label}</option>
                )
            })
            return item    
        }
    }

    const selectContent = renderSelect(options, filtersLoadingStatus)
    const load = options ? <Spinner/> : null

    return (
        <form 
            id = 'form'
            className="border p-4 shadow-lg rounded"
            onSubmit={formSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    onChange={e => setName(e.target.value)}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={e => setDescription(e.target.value)}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={e => setElement(e.target.value)}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {selectContent}
                    {load}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;