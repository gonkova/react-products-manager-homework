import React, { useState } from 'react';

export default function Product({ product, deleteProduct, startEdit }) {

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.description}</td>
      <td>
        <button className='btn btn-warning text-white me-3' onClick={() => startEdit(product)}>
          <i className='fa fa-pencil'></i>
        </button>
        <button className='btn btn-danger text-white' onClick={() => deleteProduct(product.id)}>
          <i className='fa fa-times'></i>
        </button>
      </td>
    </tr>
  );
}