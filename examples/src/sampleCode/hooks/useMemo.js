import { useMemo, useState } from 'react';

function CanculateProducts() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [products, setProducts] = useState([]);

  const handleSubmit = () => {
    setProducts([...products, { name, price: Number(price) }]);
    setName('');
    setPrice('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Canculated Products</h1>
      <input value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
      <br />
      <input value={price} placeholder="Price" type="number" onChange={e => setPrice(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Add</button>
      <br />
      Total: {useMemo(() => products.reduce((result, prod) => result + prod.price, 0), [products])}
      <ul>
        {products.map((prod, index) => (
          <li key={index}>
            {prod.name} - ${prod.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CanculateProducts;
