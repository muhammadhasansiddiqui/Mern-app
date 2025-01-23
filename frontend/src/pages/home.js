import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState ('');
  const [products, setProducts] = useState ([]);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
    
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('user logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

const fetchProducts = async () => {

try {
  const uri = 'http://localhost:8080/products';
  const headers = {
    headers: {
    'Authorization': localStorage.getItem('token')}
  }
  const response = await fetch(uri,headers);
  const result = await response.json();
  console.log("🚀 ~ fetchProducts ~ result:", result);
  setProducts(result)
  
} catch (error) {
  handleError(error)
  
}

}

  useEffect(()=>{
    fetchProducts()
  },[]);

  return (
    <div>
<h1 className='home-container'>Hello {loggedInUser}</h1> 
<button onClick={handleLogout}>Logout</button>
<div>
  <h2>Products</h2>
  <ul>
    {products.map((product) => (
      <li key={product.id}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
      </li>
    ))}
  </ul>
</div>
<ToastContainer />
   </div>
  );
}

export default Home;
