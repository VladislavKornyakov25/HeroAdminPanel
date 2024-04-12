
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных - done
// Фильтры должны отображать только нужных героев при выборе - done
// Активный фильтр имеет класс active - done
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { filtersFetched, filtersFetching, filtersFetchingError, heroesFetched, heroesFetching, heroesFetchingError } from "../../actions";
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    let elementClassName;
    
    useEffect(() => {
        dispatch(filtersFetching());             
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));
        // eslint-disable-next-line
    }, []); 

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
       
    const filterValues = filters.map((item, i) => {        
        switch (item) {
            case 'fire':
                elementClassName = 'btn btn-danger active';
                break;
            case 'water':
                elementClassName = 'btn btn-primary';
                break;
            case 'wind':
                elementClassName = 'btn btn-success';
                break;
            case 'earth':
                elementClassName = 'btn btn-success';
                break;
            default:
                elementClassName = 'btn btn-outline-dark ';
        }

        const buttonClick = (event) => {
            dispatch(heroesFetching());
            request("http://localhost:3001/heroes")
                .then(data => {
                    if (item !== 'all') {
                        dispatch(heroesFetched(data.filter(hero => hero.element === item)));
                    } else {
                        dispatch(heroesFetched(data));
                    }                                
                })
                .catch(() => dispatch(heroesFetchingError()));            
            const buttons = document.querySelectorAll('.btn');
            console.log(buttons);
            buttons.forEach(item => {                
                item.classList.remove('active');
                event.currentTarget.classList.add('active');
                
            });          
           
        }

        return  <button 
                    onClick={buttonClick}
                    key={i} 
                    style={{
                        'marginRight': '5px',
                        'borderRadius': '6px',
                        'width': '70px'
                        }} 
                    className={elementClassName}>
                        {item}
                </button>
    })
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterValues}                    
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    
                    <button className="btn btn-danger">Огонь</button>
                    <button  className="btn btn-primary">Вода</button>
                    <button  className="btn btn-success">Ветер</button>
                    <button  className="btn btn-success">Земля</button>  */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;