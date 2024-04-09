

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from "yup"
import {useHttp} from '../../hooks/http.hook';

const HeroesAddForm = () => {
	const {request} = useHttp();
    return (     
		
      
		<Formik
			initialValues={{ 
				name: '', 
				text: '',
				element: '' }}				
			onSubmit =  {values => {
				console.log(JSON.stringify(values, null, 2));
				request("http://localhost:3001/heroes", 'POST', JSON.stringify(values, null, 2));
				console.log('30');
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
						<option >Я владею элементом...</option>
						<option value="fire">Огонь</option>
						<option value="water">Вода</option>
						<option value="wind">Ветер</option>
						<option value="earth">Земля</option>
					</Field>					
				</div>

				<button type="submit" className="btn btn-primary">Создать</button>
			</Form>			

		</Formik> 
	)
}

export default HeroesAddForm;