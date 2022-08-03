import React from 'react';
import {useState, useEffect} from 'react';
import '../styles/Modal.css';

const Modal = ( {active, setActive, hidenModal, activeList} ) => {
  const [titleValue, setTitleValue] = useState('')
  const [authorValue, setAuthorValue] = useState('')
  const [responsibleValue, setResponsibleValue] = useState('')
  const [priorityValue, setPriorityValue] = useState('')
  const [dateCreation, setDateCreation] = useState('')
  const [dateFinish, setDateFinish] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')

  useEffect(() => {
      if(active === true) {
        setTitleValue(activeList.title)
        setAuthorValue(activeList.author)
        setResponsibleValue(activeList.responsible)
        setPriorityValue(activeList.priority)
        setDateCreation(activeList.finished_at)
        setDescriptionValue(activeList.description)
      }
  },[active]);

  function hiden() {
     setActive(false)
     console.log(activeList)
  }

  function chengeSelect(event) {
   setPriorityValue(event.target.value);
   console.log(priorityValue)
  }

  function postDataUpdate() {
    setActive(false)
    let data = {
           id: activeList.id,
           title : titleValue,
           author: authorValue,
           responsible : responsibleValue,
           description : descriptionValue,
           priority : priorityValue,
           finished_at : dateFinish
         }

 fetch('/data/updateList', {
           method: "POST",
           body:JSON.stringify(data),
           headers: {
          'Content-Type': 'application/json',
          },
      }).then(rs => {
        if(rs.status === 200) {
          alert("Задача успешно обновлена")
        }
        rs.json().then(rs => {
          console.log('result', rs)
        })
      })
  }

  return (
    <div
    className={active ? 'modalWindow active' : 'modalWindow'}
    onClick={hiden}
    >
      <div
      className={`text-center fs-4 ${active ? 'modal__content active' : 'modal__content'}`}
      onClick={event => event.stopPropagation()}
      >

      <div>

      <h2 className="text-primary text-decoration-underline">
        Редактировать задачу
      </h2>
      <div>
        <label htmlFor="rg__name" className="form-label"></label>
        <input
            type="text"
            className="form-control"
            placeholder="Заголовок"
            required
            value={titleValue}
            onChange={event => setTitleValue(event.target.value)}
            />
      </div>

      <div>
        <label htmlFor="rg__name" className="form-label"></label>
        <input
            type="text"
            className="form-control"
            placeholder="Создатель"
            required
            value={authorValue}
            onChange={event => setAuthorValue(event.target.value)}
            />
      </div>

      <div>
        <label htmlFor="rg__name" className="form-label"></label>
        <input
            type="text"
            className="form-control"
            placeholder="Ответственный"
            required
            value={responsibleValue}
            onChange={event => setResponsibleValue(event.target.value)}
            />
      </div>

      <div>
        <label htmlFor="rg__name" className="form-label"></label>
        <select
          className="form-select"
          aria-label="Disabled select example"
          value={priorityValue}
          onChange={chengeSelect}
          >
            <option selected>Приоритет</option>
            <option value="Высокий">Высокий</option>
            <option value="Средний">Средний</option>
            <option value="Низкий">Низкий</option>
        </select>
      </div>

      <div>
        <label htmlFor="rg__name" className="form-label"></label>
        <input
            type="date"
            className="form-control"
            placeholder="Дата окончания"
            required
            value={dateFinish}
            onChange={event => setDateFinish(event.target.value)}
            />
      </div>
      <div>
        <label htmlFor="rg__name" className="form-label"></label>
        <textarea
            type="text"
            className="form-control"
            placeholder="Описание задачи"
            required
            value={descriptionValue}
            onChange={event => setDescriptionValue(event.target.value)}
            />
      </div>
      <div className="pt-5">
        <button
          type="button"
          className="btn btn-primary"
          onClick={postDataUpdate}
          >
            Сохранить изменения
        </button>
      </div>

      </div>

      </div>
    </div>
  );
};

export default Modal;
