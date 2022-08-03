import React from 'react';
import {useState, useEffect} from 'react';
import '../styles/ToDoList.css';
import Nav from '../components/Nav';
import Modal from '../components/Modal';
import ModalUpdate from '../components/ModalUpdate';
import Preloader from '../components/Preloader';


const ToDoList = () => {
  const [modalUpdateActive, setModalUpdateActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(false);
  const [result, setResult] = useState([]);
  const [work, setWork] = useState(false);
  const [status, setStatus] = useState('');
  const [redaction, setRedaction] = useState('');
  let [activeList, setActiveList] = useState([]);
  let [idWork, setIdWork] = useState('');


  useEffect(() => {
    setPreloaderActive(() => setPreloaderActive(true))
    if(result !== []) {
      setTimeout(() => {
        setPreloaderActive(() => setPreloaderActive(false))
        fetch('/data/getList', {
                  method: "Get",
                  headers: {
                  'Content-Type': 'application/json'
                  },
              }).then(rs => {
                rs.json().then(rs => {
                  console.log('result', rs)
                  if(localStorage.getItem('role_id') === '2') {
                    setResult(rs.filter(elem => (elem.responsible === (localStorage.getItem('surname')))))
                  } else {
                    setResult(rs)
                  }
                  console.log(result)
               })
              })
      }, 1300);
    }
  },[]);

  function showModal() {
    setModalActive(true)
  }

  function takeWork(idx, event) {
    // event.preventDefault()
    setWork(true)
  }

  function dateNow() {
  let date = new Date();
  let timeMessage = String(date.getDate()).padStart(2, '0') + '.' +
  String(date.getMonth() + 1).padStart(2, '0') + '.' +
  date.getFullYear() + " " +
  new Date().toLocaleTimeString().slice(0,-3);
  return timeMessage;
}

  function redactionList(idx) {
    setModalUpdateActive(true)
    setActiveList(result[idx])
  }

  function getReady(idx, event) {
    // event.preventDefault()
    setIdWork(result[idx].id)
    setStatus('ready')
    console.log(status)
    console.log(idWork)
    let data = {
           id : idWork,
           status : status
         }
      fetch('/data/updateReady', {
                method: "POST",
                body:JSON.stringify(data),
                headers: {
               'Content-Type': 'application/json',
               },
           }).then(rs => {
             if(rs.status === 200) {
               alert("Задача успешно создана")
             }
             rs.json().then(rs => {
               console.log('result', rs)
             })
           })
    }



  return (
    <div>
      <Nav
        result={result}
        setResult={setResult}
      />
      <div className="wrap">
        {result.map((elem, idx) => (
          <div className="list__form m-5"
               key={elem.id}
               onClick={() => redactionList(idx)}
          >
            <div className={`list__title d-flex text-light justify-content-between px-3 align-items-center pt-2 bg-secondary
                ${(elem.finished_at[idx] > dateNow()) ? "bg-danger" : ""}
                ${(elem.status == 'ready') ? "bg-success" : ""}
                `
              }>
              <div>
                <div className="p-1">
                  <strong>
                    Заголовок:
                  </strong> {elem.title}
                </div>
                <div className="p-1">
                  <strong>
                    Создатель:
                  </strong> {elem.author}
                </div>
                <div className="p-1">
                  <strong>
                    Ответственный:
                  </strong> {elem.responsible}
                </div>
              </div>
              <div>
                <strong>
                  Приоритет:
                </strong> {elem.priority}
              </div>
            </div>
            <div className="p-3">
            <strong>
              Описание задачи:
            </strong>
              {elem.description}
            </div>
            <div className="d-flex px-3 justify-content-between pb-2">
            <div>
              <strong>
                Дата создания:
              </strong>
                {(elem.created_at).slice(0,-14)}
            </div>
            {(elem.updated_at === null)
              ?
                ""
              :
              <div>
                <strong>
                  Дата обновления:
                </strong>
                  {(elem.updated_at).slice(0,-14)}
              </div>
            }
            <div>
              <strong>
                 Дата окончания:
              </strong>
                {(elem.finished_at).slice(0,-14)}
            </div>
            </div>
            <div className="text-end p-2">
              <button
                type="button"
                className="btn btn-primary m-2"
                onClick={() => takeWork(idx)}
                >
                  Взять в работу
              </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => getReady(idx)}
                  >
                    Завершить работу
                </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        />
      <ModalUpdate
        active={modalUpdateActive}
        setActive={setModalUpdateActive}
        activeList={activeList}
          />
      <Preloader
        active={preloaderActive}
        setActive={setPreloaderActive}
      />
    </div>
  );
};

export default ToDoList;
