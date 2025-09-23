import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductStatus, ProductType } from '../../types/product.types';
import { useProducts } from '../../hooks/useProducts';
import Heading from '../../Share/Components/Heading';
import ErrorMessage from '../../Share/Components/ErrorMessage';
import { toast } from 'react-toastify';
import Button from '../../Share/Components/Button';
import '../../assets/styles/pages/product-style.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();

  const productImageInputRef = useRef<HTMLInputElement>(null);
  const brandImageInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price: 0,
    status: ProductStatus.Available,
    type: ProductType.Bravo,
    brand: '',
    productImage: '',
    brandImage: '',
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        setFormData({
          name: productData.name,
          quantity: productData.quantity,
          price: productData.price,
          status: productData.status,
          type: productData.type as ProductType,
          brand: productData.brand,
          productImage: productData.productImage,
          brandImage: productData.brandImage,
        });
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, getProductById]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    quantity: Yup.number().min(0, "Must be >= 0").required("Required"),
    price: Yup.number().min(0, "Must be >= 0").required("Required"),
    brand: Yup.string().required("Required"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (!product) return;
    try {
      await updateProduct(product.id, formData);
      toast.success("Product updated successfully!", { position: "top-center" });
      // Reload product data to ensure we have the latest data
      const updatedProduct = await getProductById(product.id);
      setProduct(updatedProduct);
      setFormData({
        name: updatedProduct.name,
        quantity: updatedProduct.quantity,
        price: updatedProduct.price,
        status: updatedProduct.status,
        type: updatedProduct.type as ProductType,
        brand: updatedProduct.brand,
        productImage: updatedProduct.productImage,
        brandImage: updatedProduct.brandImage,
      });
    } catch (err) {
      toast.error("Failed to update product!", { position: "top-center" });
    }
  };

  const handleBack = () => navigate("/home");

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Selected product image file:', file);
    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      productImage: imageUrl,
    }));

    // Here you would typically upload to your backend
    const formData = new FormData();
    formData.append('file', file);
    // TODO: Implement actual upload to backend if needed
  };

  // Handle brand image upload
  const handleBrandImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Selected brand image file:', file);
    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      brandImage: imageUrl,
    }));

    // Here you would typically upload to your backend
    const formData = new FormData();
    formData.append('file', file);
    // TODO: Implement actual upload to backend if needed
  };

  if (loading) {
    return (
      <div className="container-detail-page">
        <div>Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-detail-page">
        <ErrorMessage message={error || 'Product not found'} />
        <Button className="secondary-btn mt-4" onClick={handleBack}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <main className="container-detail-page">
      <header className="header">
        <Heading as="h1" size="lg" className="product-title">
          {product.name}
        </Heading>
      </header>

      <section className="content">
        <form className="left-section">
          <fieldset className="form-group">
            <label className="text text-title-lg" htmlFor="productName">
              Name
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <label className="text text-title-lg" htmlFor="productQuantity">
              Quantity
            </label>
            <input
              type="number"
              id="productQuantity"
              name="quantity"
              className="form-input"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <label className="text text-title-lg" htmlFor="productPrice">
              Price
            </label>
            <input
              type="number"
              id="productPrice"
              name="price"
              className="form-input"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
            />
          </fieldset>

          <div className="form-row">
            <fieldset className="form-group">
              <label className="text text-title-lg" htmlFor="productStatus">
                Status
              </label>
              <select
                id="productStatus"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value={ProductStatus.Available}>Available</option>
                <option value={ProductStatus.SoldOut}>Sold out</option>
              </select>
            </fieldset>

            <fieldset className="form-group">
              <label className="text text-title-lg" htmlFor="productType">
                Types
              </label>
              <select
                id="productType"
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value={ProductType.Bravo}>Bravo</option>
                <option value={ProductType.Alfa}>Alfa</option>
                <option value={ProductType.Gold}>Gold</option>
              </select>
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset className="form-group">
              <label className="text text-title-lg" htmlFor="brandName">
                Brand
              </label>
              <div className="brand-input-group">
                <input
                  type="text"
                  id="brandName"
                  name="brand"
                  className="form-input"
                  style={{ flex: 1 }}
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>

            <fieldset className="form-group">
              <label className="text text-title-lg">Brand Image</label>
              <div className="upload-section">
                <img
                  src={formData.brandImage || '/placeholder-brand.png'}
                  alt="Brand"
                  className="brand-avatar-detail"
                  id="brandImagePreview"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBrandImageUpload}
                  style={{ display: 'none' }}
                  ref={brandImageInputRef}
                />
                <button
                  type="button"
                  className="upload-btn text text-info"
                  onClick={() => brandImageInputRef.current?.click()}
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  Upload photo
                </button>
              </div>
            </fieldset>
          </div>

          <nav className="action-buttons">
            <Button type="button" className="secondary-btn" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" className="primary-btn" onClick={handleSave}>
              Save
            </Button>
          </nav>
        </form>

        <aside className="right-section">
          <img
            className="product-image-large"
            id="productImageLarge"
            src={formData.productImage || '/placeholder-product.png'}
            alt={product.name}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleProductImageUpload}
            style={{ display: 'none' }}
            ref={productImageInputRef}
          />
          <div className="upload-area" onClick={() => productImageInputRef.current?.click()}>
            <i className="fa-solid fa-cloud-arrow-up"></i>
            <div className="upload-text">Click to upload</div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ProductDetail;
