import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Modal from './Modal';
import '../styles/Nav.css';

const Nav = ({result, setResult}) => {
  const [modalActive, setModalActive] = useState(false);
  let [responsibleUniq, setResponsibleUniq] = useState([]);
  let [value, setValue] = useState('');

  useEffect(() => {
        fetch('/data/getResponsible', {
                  method: "Get",
                  headers: {
                  'Content-Type': 'application/json'
                  },
              }).then(rs => {
                rs.json().then(rs => {
                  console.log('result', rs)
                  setResponsibleUniq(rs)
                  console.log(responsibleUniq)
               })
              })
  },[]);

  function showModal() {
    setModalActive(true)
  }

  function sortDate() {
    setResult(result.sort((a, b) => {
      return a.updated_at > b.updated_at ? 1 : -1
    }));
  }

  function sortDateWeek() {

  }

  function sortResponsible(event) {
    setValue(event.target.value)
    console.log(value)
    setResult(result.filter(elem => (elem.responsible === value)))
      console.log(result)
  }

  return (
    <div>
      <div className="nav justify-content-between align-items-center">
        <div className="nav__logo ms-5">
          <img className="nav__logo_img" src="assets/img/todo.png" alt="exit" />
        </div>
        <div className="nav__menu d-flex">
            <div className="nav__menu-item me-3 px-3">
              <select
                  className="form-select"
                  aria-label="Disabled select example"
                  onСhange={sortDateWeek}
                  >
                <option disabled>Сортировать по дате завершения</option>
                <option>на сегодня</option>
                <option>на неделю</option>
                <option>на будущее</option>
              </select>
            </div>
            {(localStorage.getItem('role_id') === '1')
              ?
            <div className="nav__menu-item me-3 px-3">
              <select
                  className="form-select"
                  aria-label="Disabled select example"
                  onChange={sortResponsible}
                  value={value}
                  >
                <option disabled>Сортировать по ответсвенным</option>
                {responsibleUniq.map((elem, idx) => (
                <option
                  key={elem.idx}
                  >
                    {elem.responsible}
                </option>
                  ))}
              </select>
            </div>
             :
             ""
            }
            <div className="nav__menu-item me-3 px-3">
            <select
                className="form-select"
                aria-label="Disabled select example"
                onСhange={sortDate}
                >
              <option disabled>Сортировать</option>
              <option value="dateUpdate">по дате последнего обновления</option>
            </select>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={showModal}
                >
                  Новая задача
              </button>
            </div>
        </div>
            <Link to="/" className="nav__menu-link">
              <div className="nav__exit me-5">
                <img className="nav__img" src="assets/img/exit.png" alt="exit" />
              </div>
            </Link>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        />
    </div>
  );
};

export default Nav;
