import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState(false);

  function getStudent() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setStudents(data);
      });
  }

  function createStudent() {
    let fname = prompt('First name')
    let lname = prompt('Last name');
    let email = prompt('Email');
    let password = prompt('Password');
    fetch('http://localhost:3001/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname, lname, email, password }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getStudent();
      });
  }

  function deleteStudent() {
    let id = prompt('Enter student id');
    fetch(`http://localhost:3001/students/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getStudent();
      });
  }

  function updateStudent() {
    let id = prompt('Enter student id');
    let fname = prompt('Enter new first name');
    let lname = prompt('Enter new last name');
    let email = prompt('Enter new email');
    let password = prompt('Enter new password');
    fetch(`http://localhost:3001/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname, lname, email, password }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getStudent();
      });
  }

  useEffect(() => {
    getStudent();
  }, []);
  return (
    <div>
      {students ? students : 'No student data available'}
      <br />
      <button onClick={createStudent}>Add student</button>
      <br />
      <button onClick={deleteStudent}>Delete student</button>
      <br />
      <button onClick={updateStudent}>Update student</button>
    </div>
  );
}
export default App;
