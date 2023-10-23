import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './Product';

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    quantity: '',
    description: ''
  });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    if (products.length == 0) {
      setCurrentId(1);
    }
  }, [products]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (editProduct) {
      setEditProduct(prev => ({ ...prev, [name]: value }));
    }
    else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  }

  function startEdit(product) {
    setEditProduct(product);
    setShowAddForm(true);
  }

  function completeEdit() {
    setProducts(prevProducts => prevProducts.map(p =>
      p.id == editProduct.id ? editProduct : p));
    setEditProduct(null);
    setShowAddForm(false);
  }

  function addProduct() {
    const productToAdd = { ...newProduct, id: currentId };
    setProducts([...products, productToAdd]);
    setCurrentId(currentId + 1);
    setShowAddForm(false);
    setNewProduct({ title: '', price: '', quantity: '', description: '' });
  }

  function deleteProduct(productId) {
    const remainingProducts = products.filter(product => product.id !== productId);
    setProducts(remainingProducts);
  }

  return (
    <div className='container-fluid'>
      <div className='container mt-3'>
        <button onClick={() => setShowAddForm(true)} className='btn btn-primary'>
          Добави продукт
        </button>
        {showAddForm && (
          <form
            className='row mt-3'
            onSubmit={(e) => {
              e.preventDefault();
              if (editProduct) {
                completeEdit();
              }
              else {
                addProduct();
              }
            }}
          >
            <input
              type='text'
              name='title'
              placeholder='Име на продукта'
              value={editProduct ? editProduct.title : newProduct.title}
              onChange={handleInputChange}
              className="mb-3"
            />
            <input
              type='text'
              name='price'
              placeholder='Цена'
              value={editProduct ? editProduct.price : newProduct.price}
              onChange={handleInputChange}
              className="mb-3"
            />
            <input
              type='text'
              name='quantity'
              placeholder='Количество'
              value={editProduct ? editProduct.quantity : newProduct.quantity}
              onChange={handleInputChange}
              className="mb-3"
            />
            <textarea
              name='description'
              placeholder='Описание'
              value={editProduct ? editProduct.description : newProduct.description}
              onChange={handleInputChange}
              className="mb-3"
            />
            <button type="submit" className='btn btn-primary'
            >Запази продукт</button>
          </form>
        )}
        <div className='row'>
          <div className="table-responsive">
            {products.length > 0 && (
              <table className="table table-bordered table-hover mt-3">
                <thead >
                  <tr>
                    <th>ИД</th>
                    <th>Име на продукта</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Описание</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <Product
                      key={product.id}
                      product={product}
                      deleteProduct={deleteProduct}
                      startEdit={startEdit}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


