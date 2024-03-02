import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [phonebook, setPhonebook] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/get-phone')
      .then(res => {
        setPhonebook(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const addNewNumber = () => {
    axios.post('http://localhost:8080/add-phone', { name, phone })
      .then(res => {
        setPhonebook([...phonebook, res.data.data]);
      })
      .catch(err => console.log(err));
  };

  const deleteNumber = (id) => {
    axios.delete(`http://localhost:8080/delete-phone/${id}`)
      .then(res => {
        setPhonebook(phonebook.filter(item => item._id !== id));
      })
      .catch(err => console.log(err));
  };

  const updateNumber = (id) => {
    const newName = prompt('Enter new name:');
    const newPhone = prompt('Enter new phone number:');
    axios.put(`http://localhost:8080/update-phone/${id}`, { name: newName, phone: newPhone })
      .then(res => {
        setPhonebook(phonebook.map(item => item._id === id ? res.data.data : item));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <h1>PhoneBook</h1>
      {
        phonebook.map((val, key) => (
          <div key={key} className="card">
            <p>Name: {val.name}</p>
            <p>Number: {val.phone}</p>
            <button onClick={() => updateNumber(val._id)}>Update</button>
            <button onClick={() => deleteNumber(val._id)}>Delete</button>
          </div>
        ))
      }
      <hr />
      <label htmlFor="">Name: </label>
      <input type="text" onChange={(e) => setName(e.target.value)} /><br /><br />
      <label htmlFor=" ">Phone: </label>
      <input type="number" onChange={(e) => setPhone(e.target.value)} /><br /><br />
      <button onClick={addNewNumber}>Add New Number</button>
    </div>
  );
}

export default App;
