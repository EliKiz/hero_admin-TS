
import { filterClick, fetchFilters} from './heroesFilterSlice';
import {Options} from '../heroesAddForm/HeroesAddForm'
import { useEffect } from "react"
import { ListService } from "../../service/ListService";
import classNames from 'classnames';
import { useAppSelector,useAppDispatch } from '../app/hooks';

const HeroesFilters = () => {
    
    const {requestFilter} = ListService();
    // const [button, setButton] = useState(null)

    const dispatch = useAppDispatch()
    const {filters, activeFilter} = useAppSelector(state => state.filters)

    useEffect(() => { 
        // 
        // requestFilter("http://localhost:3001/filters");
        dispatch(fetchFilters());
    }, [])
    console.log('render')

    const renderButton = (button:Options[]) => { 
        if (button.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }
        
        return button.map((btn) => { 
            const btnClass = classNames('btn', btn.colored, { 
                'active': btn.value === activeFilter
            });
            return ( 
                <button 
                key={btn.id}
                value = {btn.value}
                onClick={() => dispatch(filterClick(btn.value))}
                className={btnClass}>{btn.label}</button>
            )
        })
    }   
    
    const contentButton = renderButton(filters) 
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {contentButton}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;