import './App.css';
import { useState } from 'react';

const OnCallOption = ({ props }) => {
  switch (props.key) {
    case 'date':
      return (
        <div>
          <span>Starting Date: </span>
          <input type={props.key} name="option" className='border-0 border-bottom ms-2 me-5' />
          <span>Ending Date: </span>
          <input type={props.key} name="option" className='border-0 border-bottom ms-2' />
        </div>
      )
    case 'dropdown':
      return (
        <div className='mb-3'>
          <span>{props.index + 1}.</span>
          <input type="text" placeholder='option' className='border-0 border-bottom ms-3 px-2 w-75' />
        </div>
      )
    case 'text':
      return (
        <div>
          <input type="text" placeholder='Answer text' className='border-0 border-bottom px-2 w-75' />
        </div>
      )
    default:
      return (
        <div className='mb-3'>
          <input type={props.key} name="option" className='border' />
          <input type="text" placeholder='option' className='border-0 border-bottom ms-3 px-2 w-75' />
        </div>
      )
  }
}

function App() {
  const [formData, setFormData] = useState([{ id: 1, ddValue: 'Select multiple choice', key: 'radio', options: ['option'], required: false }])
  const dropdownValues = [
    { name: 'Select multiple choice', key: 'radio' },
    { name: 'Select short answer', key: 'text' },
    { name: 'Select checkbox', key: 'checkbox' },
    { name: 'Select dropdown', key: 'dropdown' },
    { name: 'Select date', key: 'date' }
  ]

  const onInput = () => {
    let data = [...formData]
    data.push({ id: data.length + 1, ddValue: 'Select multiple choice', key: 'radio', options: ['option'], required: false })
    setFormData(data)
  }
  const onSelectOption = (k, index, name) => {
    let data = [...formData]
    data[index].ddValue = name
    data[index].key = k
    if (k === 'date') {
      data[index].options = ['option']
    }
    setFormData(data)
  }
  const onAddOption = (index) => {
    let data = [...formData]
    data[index].options.push('option')
    setFormData(data)
  }
  const onRequired = (status, index) => {
    let data = [...formData]
    data[index].required = !status
    setFormData(data)
  }

  return (
    <div className="container p-5">
      <div className='bg-light p-5 rounded'>
        <div className="form-floating">
          <textarea className="form-control" placeholder="Type here.." id="floatingTextarea" maxLength={60}></textarea>
          <label for="floatingTextarea">Title</label>
        </div>
        <div className="form-floating my-3">
          <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" maxLength={1000} style={{ height: '10rem', fontSize: '0.9rem' }}></textarea>
          <label for="floatingTextarea2">Description</label>
        </div>
        {formData.length && formData.map((item, index) => {
          return (
            <div key={index} className='bg-white p-4 my-5 rounded'>
              <div className='mb-3'>
                <span className='px-2 py-1 bg-light rounded'>{item.id}</span>
              </div>
              <div className='d-flex justify-content-between mb-4'>
                <div className="form-floating col-7">
                  <textarea className="form-control" placeholder="Type here.." id="floatingTextarea" minLength={20} maxLength={80}></textarea>
                  <label for="floatingTextarea">Question</label>
                </div>
                <div className="dropdown col-4">
                  <span className="btn btn-secondary dropdown-toggle py-3 w-100 bg-light text-dark border" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {item.ddValue}
                  </span>
                  <ul className="dropdown-menu py-3 w-100">
                    {dropdownValues.map((it, x) => {
                      return (
                        <li key={x}><span className="dropdown-item" onClick={() => onSelectOption(it.key, index, it.name)}>{it.name}</span></li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <div className='px-4 py-3'>
                {item.options.length && item.options.map((i, _i) => {
                  return (
                    <OnCallOption props={{ key: item.key, index: _i }} />
                  )
                })}
                {item.key === 'date' || item.key === 'text' ? null : <button type="button" onClick={() => onAddOption(index)} className="btn btn-sm btn-outline-primary mt-4">Add option</button>}
                <div className="form-check form-switch d-flex justify-content-start mt-4">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={item.required} onClick={() => onRequired(item.required, index)} />
                  <label className="form-check-label ps-2" for="flexSwitchCheckDefault">Required</label>
                </div>
              </div>
            </div>
          )
        })}
        <div className='d-flex justify-content-center'>
          <button type="button" onClick={onInput} className="btn btn-outline-success rounded fw-bold w-50">Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
