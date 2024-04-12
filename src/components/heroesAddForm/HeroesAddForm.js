

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться - done
// Уникальный идентификатор персонажа можно сгенерировать через uiid - done
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST - done
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе - done
// данных из фильтров
import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { filtersFetched, filtersFetching, filtersFetchingError } from "../../actions";
import { useDispatch, useSelector } from 'react-redux';
import { heroesAdding, heroesFetchingError } from '../../actions';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import * as Yup from "yup"

import {useHttp} from '../../hooks/http.hook';

const HeroesAddForm = () => {
	const {filters, filtersLoadingStatus} = useSelector(state => state);
	const {request} = useHttp();
	const dispatch = useDispatch();

	let filterName;

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
                filterName = 'огонь';
                break;
            case 'water':
                filterName = 'вода';
                break;
            case 'wind':
                filterName = 'ветер';
                break;
            case 'earth':
                filterName = 'земля';
                break;
            default:
                filterName = 'Я владею элементом...';
		}

		return <option value={item}>{filterName}</option>
	})

    return ( 
		<Formik
			initialValues={{ 
				name: '', 
				text: '',
				element: '' }}				
			onSubmit =  {values => {				
				let req = {
					id: uuidv4(),
					name: values.name,
					description: values.text,
					element: values.element
				};				
				request("http://localhost:3001/heroes", 'POST', JSON.stringify(req, null, 2))
					.then(data => dispatch(heroesAdding(data)))
					.catch(() => dispatch(heroesFetchingError()));
				
			}}
		>		
			<Form className="border p-4 shadow-lg rounded">
				
				<div className="mb-3">											
					<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
					<Field 
						id="name"
						name="name"
						type="text" 
						className="form-control"  
						placeholder="Как меня зовут?"                  
					/>
					<ErrorMessage className="error" name="amount" component="div"/>					
				</div>

				<div className="mb-3">
					<label htmlFor="text" className="form-label fs-4">Описание</label>
					
					<Field
						as="textarea"
						id="text"
						name="text"
						type="textArea" 
						className="form-control"  
						placeholder="Что я умею?"
						style={{"height": '130px'}}                 
					/>
					<ErrorMessage className="error" name="amount" component="div"/>		
				</div>

				<div className="mb-3">
					<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
					<Field 
						as="select" 
						id="element" 
						name="element"
						className="form-select">
							{filterValues}
						{/* <option >Я владею элементом...</option>
						<option value="fire">Огонь</option>
						<option value="water">Вода</option>
						<option value="wind">Ветер</option>
						<option value="earth">Земля</option> */}
					</Field>					
				</div>

				<button type="submit" className="btn btn-primary">Создать</button>
			</Form>			

		</Formik> 
	)
}

export default HeroesAddForm;