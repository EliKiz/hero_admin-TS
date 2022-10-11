
import {filtersFetched, filterClick, fetchFilters} from '../heroesFilters/heroesFiltersSlice';

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const HeroesFilters = () => {
    
    const {request} = useHttp();
    // const [button, setButton] = useState(null)

    const dispatch = useDispatch()
    const {filters, activeFilter} = useSelector(state => state.filters)

    useEffect(() => { 
        // 
        dispatch(fetchFilters(request));
    }, [])
    console.log('render')

    

    const renderButton = (button) => { 
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