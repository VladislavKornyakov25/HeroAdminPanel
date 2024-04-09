

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

const HeroesAddForm = () => {
    return (     
      
		<Formik
			initialValues={{ 
				name: '', 
				text: '',
				element: '' }}				
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));						
				}, 400);
			}}
		>
		
				<Form className="border p-4 shadow-lg rounded">
					<div className="mb-3">											
						<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
						<input 
							required
							type="text" 
							name="name" 
							className="form-control" 
							id="name" 
							placeholder="Как меня зовут?"/>
						{/*  */}
					</div>

					<div className="mb-3">
						<label htmlFor="text" className="form-label fs-4">Описание</label>
						<textarea
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
							required
							className="form-select" 
							id="element" 
							name="element">
							<option >Я владею элементом...</option>
							<option value="fire">Огонь</option>
							<option value="water">Вода</option>
							<option value="wind">Ветер</option>
							<option value="earth">Земля</option>
						</select>
					</div>

					<button type="submit" className="btn btn-primary">Создать</button>
				</Form>			

		</Formik> 
	)
}

export default HeroesAddForm;