import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [updateItem, setUpdateItem] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/data/');
      setData(response.data);
      console.log(response.data)

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  const createItem = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/data/', { title: newItem });
      setNewItem('');
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemData = async (itemId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/data/${itemId}/`, { title: updateItem });
      setEditingItem(null);
      setUpdateItem('');
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/data/${itemId}/`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2> Taskify Project using React Js and Rest API on Python</h2>
      <hr/>
       <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {editingItem === item.id ? (
                <>
                  <input
                    type="text"
                    value={updateItem}
                    onChange={(e) => setUpdateItem(e.target.value)}
                  />
                  <button onClick={() => updateItemData(item.id)}>Update</button>
                </>
              ) : (
                <>
                  {item.title}
                  <button onClick={() => setEditingItem(item.id)}>Edit</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={createItem}>Add</button>
      </div>
      
    </div>

      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.title}
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default MyComponent;
