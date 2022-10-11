import { configureStore } from '@reduxjs/toolkit';
// import heroes from '../components/heroesList/heroesSlice';
import heroes from '../components/heroesList/heroesSlice'
import filters from '../components/heroesFilters/heroesFilterSlice';

// Механизм по добавлению и изменению работы dispatch, позвоялет в качестве action принимать не только объекты, но и строки или функции и т.д., Middleware служит местом для сайд эффектов
const stringMiddleware = () => (next) => (action) => { 
    // Аргумент next - слудующая функция из Middleware
    if(typeof action === 'string') { 
        return next({
            type: action
        })
    }

    return next(action)

}

// Механизм усиления стора, позволяет изменить любую часть стора 
const enhancer = (createStore) => (...args) => { 
    const store = createStore(...args);

    // Сохраняем оригинальный dispatch, который принимал для себя только объект
    const oldDispatch = store.dispatch;
    // Перезаписываем новой фунцией 
    store.dispatch = (action) => { 
        if(typeof action === 'string') { 
            return oldDispatch({
                type: action
            })
        }
        // Если action не строка, то мы возвращяем объект
        return oldDispatch(action)
    }
    return store
}
// обычный redux
// const store = createStore(
        // Функия позволяет собрать все редьюсеры в 1 объект (ключ: значение)
        // combineReducers({ heroes, filters}), 
        // Фунция для композиции различных фунции 
        // compose(enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) 
        // compose(applyMiddleware(ReduxThunk, stringMiddleware),));
        
// redux toolkit
const store = configureStore({ 
    reducer: { 
        heroes, filters
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
 
