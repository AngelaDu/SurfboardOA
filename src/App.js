import { useState, createRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

let exampleData = [
  {
    title: 'topic one',
    timeEstimate: 5,
    textDescription: 'this is topic 1 description',
    complete: false,
  },
  {
    title: 'topic2',
    timeEstimate: 10,
    textDescription: 'this is topic 2 description',
    complete: false,
  },
  {
    title: 'topic3',
    timeEstimate: 15,
    textDescription: 'this is topic 3 description blabdlabdlbwa ahwjkdh awjhd awjwdh hwajk dwja dhwja dwhaj dawj',
    complete: false,
  },
];

function App() {
  const emptyTopic = { title: 'new topic', timeEstimate: 'time required', textDescription: 'description', complete: false };
  const [agendaData, setAgendaData] = useState(exampleData);
  const [showEdit, setShowEdit] = useState(false);
  const [curElm, setCurElm] = useState(emptyTopic);
  const [curIndex, setCurIndex] = useState(undefined);

  const editDataModal = () => {
    let newData = { title: undefined, timeEstimate: undefined, textDescription: undefined };
    return (
      <div>
        <Form id='modify-modal__container'>
          <Form.Group>
            <Form.Label>Meeting Topic</Form.Label>
            <Form.Control type='text' placeholder={curElm.title} onChange={(e) => (newData.title = e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time Estimate</Form.Label>
            <Form.Control type='text' placeholder={curElm.timeEstimate} onChange={(e) => (newData.timeEstimate = e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Text Description</Form.Label>
            <Form.Control type='text' placeholder={curElm.textDescription} onChange={(e) => (newData.textDescription = e.target.value)} />
          </Form.Group>

          <Button
            variant='success'
            type='button'
            style={{ backgroundColor: '#5a935ab7' }}
            onClick={() => {
              if (curIndex === -1) {
                setAgendaData((item) => [
                  ...item,
                  {
                    title: newData.title !== undefined ? newData.title : '',
                    timeEstimate: newData.timeEstimate !== undefined ? newData.timeEstimate : '',
                    textDescription: newData.textDescription !== undefined ? newData.textDescription : '',
                    complete: false,
                  },
                ]);
              } else {
                setAgendaData(
                  agendaData.map((item, id) =>
                    id === curIndex
                      ? {
                          title: newData.title !== undefined ? newData.title : item.title,
                          timeEstimate: newData.timeEstimate !== undefined ? newData.timeEstimate : item.timeEstimate,
                          textDescription: newData.textDescription !== undefined ? newData.textDescription : item.textDescription,
                          complete: item.complete,
                        }
                      : item,
                  ),
                );
              }
              setShowEdit(false);
            }}
          >
            Submit
          </Button>

          <Button
            variant='secondary'
            type='reset'
            style={{ marginLeft: '1vmin' }}
            onClick={() => {
              setShowEdit(false);
            }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    );
  };

  return (
    <div id='App'>
      {showEdit && editDataModal(curElm, curIndex)}

      <div id='agenda__container'>
        <div id='top-bar__container'>
          <h2>Agenda Plan</h2>
          {/* ADD */}
          <Button
            variant='danger'
            style={{ backgroundColor: '#F4673C', fontFamily: 'MuseoSans_500' }}
            onClick={() => {
              setCurElm(emptyTopic);
              setCurIndex(-1);
              setShowEdit(true);
            }}
          >
            Add
          </Button>
        </div>

        {agendaData.map((elm, index) => {
          return (
            <div id={elm.title + index} key={elm.title + index}>
              <div
                className='agenda-topic__container'
                style={agendaData[index]['complete'] === true ? { backgroundColor: '#74bec254' } : { backgroundColor: '#64bfc4af' }}
              >
                <h4 style={{ gridColumnStart: 'col1' }}>{elm.title}</h4>
                <p style={{ textAlign: 'center', color: '#5a585C' }}>{elm.timeEstimate + 'mins'}</p>
                <p>{elm.textDescription}</p>

                {/* CHECKBOX */}
                <Form>
                  <Form.Check
                    type='checkbox'
                    aria-label='checkbox'
                    onChange={() => {
                      setAgendaData(
                        agendaData.map((item, id) =>
                          id === index
                            ? {
                                title: item.title,
                                timeEstimate: item.timeEstimate,
                                textDescription: item.textDescription,
                                complete: !item.complete,
                              }
                            : item,
                        ),
                      );
                    }}
                  />
                </Form>

                {/* MODIFY // DELETE */}
                <DropdownButton title='' drop='end' size='sm' id='dropdown' variant='Secondary'>
                  <Dropdown.Item
                    eventKey='1'
                    onClick={() => {
                      setCurElm(elm);
                      setCurIndex(index);
                      setShowEdit(true);
                    }}
                  >
                    Modify
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey='2'
                    onClick={() => {
                      document.getElementById(elm.title + index).setAttribute('style', 'display:none');
                    }}
                  >
                    Delete
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
