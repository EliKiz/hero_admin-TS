import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup,  } from 'react-transition-group';
import { createSelector } from '@reduxjs/toolkit'

import { fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.css'

const HeroesList = () => {
    // Функция мемоизации, которая запоминает значение в отдельных стейтах, что бы предотварить перерендер, 
    // когда кликается 1 и тот же фильтр
    const filteredHeroesSelector = createSelector(
        // результатом возврата будет получение из стейта текущего активного фильтра
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => { 
            if(filter === 'all') { 
                return heroes
            } else { 
                return heroes.filter(item => item.element === filter);
            }
        }
    );

    // const filteredHeroes = useSelector(state => { 

    //     if(state.filters.activeFilter === 'all') { 
    //          console.log('render')
    //         return state.heroes.heroes
    //     } else { 
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }

    // })
    
    const filteredHeroes = useSelector(filteredHeroesSelector);

    const  heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    
    const dispatch = useDispatch();
    // const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes()) 
        // eslint-disable-next-line
    }, []);



    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                key={arr.id}
                timeout={500}
                classNames="item">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }
        return arr.map(({...props}) => {
            return (
            <CSSTransition
              key={props.id}
              timeout={500}
              classNames="item">
                  <HeroesListItem
                    key={props.id} 
                    {...props}/>
            </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component='ul'>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;