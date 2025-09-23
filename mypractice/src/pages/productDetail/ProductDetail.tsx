import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductStatus, ProductType } from '../../types/product.types';
import { useProducts } from '../../hooks/useProducts';
import Heading from '../../Share/Components/Heading';
import ErrorMessage from '../../Share/Components/ErrorMessage';
import { toast } from 'react-toastify';
import Button from '../../Share/Components/Button';
import '../../assets/styles/pages/product-style.css';

interface ProductFormValues {
  name: string;
  quantity: number;
  price: number;
  status: ProductStatus;
  type: ProductType;
  brand: string;
  productImage: string;
  brandImage: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();

  const productImageInputRef = useRef<HTMLInputElement>(null);
  const brandImageInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [initialValues, setInitialValues] = useState<ProductFormValues>({
    name: '',
    quantity: 0,
    price: 0,
    status: ProductStatus.Available,
    type: ProductType.Bravo,
    brand: '',
    productImage: '',
    brandImage: '',
  });

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(0, 'Quantity must be 0 or greater')
      .integer('Quantity must be an integer'),
    price: Yup.number().required('Price is required').min(0, 'Price must be 0 or greater'),
    status: Yup.string().required('Status is required'),
    type: Yup.string().required('Type is required'),
    brand: Yup.string().required('Brand is required').min(2, 'Brand must be at least 2 characters'),
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
        setInitialValues({
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

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
  //   }));
  // };

  const handleSave = async (values: ProductFormValues) => {
    if (!product) return;
    try {
      await updateProduct(product.id, values);

      toast.success('Product updated successfully!', {
        position: 'top-center',
      });

      const updatedProduct = await getProductById(product.id);
      setProduct(updatedProduct);
      setInitialValues({
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
      toast.error('Failed to update product!', {
        position: 'top-center',
      });
    }
  };

  const handleBack = () => navigate('/home');

  const handleProductImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFieldValue('productImage', imageUrl);
    const formData = new FormData();

    formData.append('file', file);
  };

  // Handle brand image upload
  const handleBrandImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFieldValue('brandImage', imageUrl);

    const formData = new FormData();
    formData.append('file', file);
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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSave}
      >
        {({ setFieldValue, values }) => (
          <section className="content">
            <Form className="left-section">
              <fieldset className="form-group">
                <label className="text text-title-lg" htmlFor="productName">
                  Name
                </label>
                <Field type="text" id="productName" name="name" className="form-input" />
                <FormikError name="name" component="div" className="error-message" />
              </fieldset>

              <fieldset className="form-group">
                <label className="text text-title-lg" htmlFor="productQuantity">
                  Quantity
                </label>
                <Field type="number" id="productQuantity" name="quantity" className="form-input" />
                <FormikError name="quantity" component="div" className="error-message" />
              </fieldset>

              <fieldset className="form-group">
                <label className="text text-title-lg" htmlFor="productPrice">
                  Price
                </label>
                <Field
                  type="number"
                  id="productPrice"
                  name="price"
                  className="form-input"
                  step="0.01"
                />
                <FormikError name="price" component="div" className="error-message" />
              </fieldset>

              <div className="form-row">
                <fieldset className="form-group">
                  <label className="text text-title-lg" htmlFor="productStatus">
                    Status
                  </label>
                  <Field as="select" id="productStatus" name="status" className="form-select">
                    <option value={ProductStatus.Available}>Available</option>
                    <option value={ProductStatus.SoldOut}>Sold out</option>
                  </Field>
                  <FormikError name="status" component="div" className="error-message" />
                </fieldset>

                <fieldset className="form-group">
                  <label className="text text-title-lg" htmlFor="productType">
                    Types
                  </label>
                  <Field as="select" id="productType" name="type" className="form-select">
                    <option value={ProductType.Bravo}>Bravo</option>
                    <option value={ProductType.Alfa}>Alfa</option>
                    <option value={ProductType.Gold}>Gold</option>
                  </Field>
                  <FormikError name="type" component="div" className="error-message" />
                </fieldset>
              </div>

              <div className="form-row">
                <fieldset className="form-group">
                  <label className="text text-title-lg" htmlFor="brandName">
                    Brand
                  </label>
                  <div className="brand-input-group">
                    <Field
                      type="text"
                      id="brandName"
                      name="brand"
                      className="form-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                  <FormikError name="brand" component="div" className="error-message" />
                </fieldset>

                <fieldset className="form-group">
                  <label className="text text-title-lg">Brand Image</label>
                  <div className="upload-section">
                    <img
                      src={values.brandImage || '/placeholder-brand.png'}
                      alt="Brand"
                      className="brand-avatar-detail"
                      id="brandImagePreview"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBrandImageUpload(e, setFieldValue)}
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
                <Button type="submit" className="primary-btn">
                  Save
                </Button>
              </nav>
            </Form>

            <aside className="right-section">
              <img
                className="product-image-large"
                id="productImageLarge"
                src={values.productImage || '/placeholder-product.png'}
                alt={product.name}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleProductImageUpload(e, setFieldValue)}
                style={{ display: 'none' }}
                ref={productImageInputRef}
              />
              <div className="upload-area" onClick={() => productImageInputRef.current?.click()}>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <div className="upload-text">Click to upload</div>
              </div>
            </aside>
          </section>
        )}
      </Formik>
    </main>
  );
};

export default ProductDetail;
