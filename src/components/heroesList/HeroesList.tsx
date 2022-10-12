import React from 'react'

import { createSelector } from '@reduxjs/toolkit'
import { useEffect } from 'react';
import { CSSTransition, TransitionGroup  } from 'react-transition-group';
import { RootState } from '../../store/store'; 
import { useAppSelector, useAppDispatch } from '../app/hooks'

import { useSelector } from 'react-redux';

import { fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { HeroesItem } from './heroesSlice';

import './heroesList.css'

interface FiltersActiveFilter { 
    activeFilter: string
}
interface StateFilters { 
    filters: FiltersActiveFilter,
    heroes: HeroesInterface,
}
interface HeroesInterface { 
    heroes: HeroesItem[]
}

const HeroesList = () => {
    // Функция мемоизации
    const filteredHeroesSelector = createSelector(
        // получение из стейта текущего активного фильтра и всех героев
        (state:StateFilters) => state.filters.activeFilter,
        (state:StateFilters) => state.heroes.heroes,
        (filter, heroes) => { 
            if(filter === 'all') { 
                return heroes
            } else { 
                return heroes.filter(item => item.element === filter);
            }
        }
    );

    
    // const filteredHeroes = useAppSelector(filteredHeroesSelector);
    const filteredHeroes = useAppSelector(filteredHeroesSelector);

    const  heroesLoadingStatus = useAppSelector(state => state.heroes.heroesLoadingStatus);
    
    const dispatch = useAppDispatch();
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
    
    const renderHeroesList = (arr:HeroesItem[]) => {
        if (arr.length === 0) {
            console.log(arr)
            return (
                <CSSTransition
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