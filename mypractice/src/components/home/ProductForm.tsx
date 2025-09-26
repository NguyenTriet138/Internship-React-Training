import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useProducts } from '@hooks/useProducts';
import { ProductStatus, ProductType, Product } from 'types/product.types';
import '@assets/styles/main.css';
import Modal from '@components/modals/index';
import { toast } from "react-toastify";
import Button from 'share/components/button/index';

interface ProductFormValues {
  productName: string;
  productQuantity: number;
  productPrice: number;
  productStatus: string;
  productType: string;
  brandName: string;
  productImage: string;
  brandImage: string;
}

const ProductModal: React.FC<{
  mode?: 'add' | 'edit';
  productId?: string;
  initialValues?: Partial<ProductFormValues>;
  onClose: () => void;
  onSave: (savedProduct: Product) => void;
}> = ({ mode = 'add', productId, initialValues, onClose, onSave }) => {
  const defaultValues: ProductFormValues = {
    productName: '',
    productQuantity: 0,
    productPrice: 0,
    productStatus: 'Available',
    productType: 'Bravo',
    brandName: '',
    productImage: 'https://i.ibb.co/LXgvW3hj/image-display.png',
    brandImage: 'https://i.ibb.co/LXgvW3hj/image-display.png',
    ...initialValues,
  };

  const { createProduct, updateProduct } = useProducts();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefBrandImg = useRef<HTMLInputElement>(null);

  const validationSchema = Yup.object({
    productName: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    productQuantity: Yup.number()
      .required('Quantity is required')
      .min(0, 'Quantity must be 0 or greater')
      .integer('Quantity must be an integer'),
    productPrice: Yup.number()
      .required('Price is required')
      .min(0, 'Price must be 0 or greater'),
    productStatus: Yup.string().required('Status is required'),
    productType: Yup.string().required('Type is required'),
    brandName: Yup.string()
      .required('Brand is required')
      .min(2, 'Brand must be at least 2 characters')
      .max(50, 'Brand must be at most 50 characters'),
  });

  return (
    <Modal
      title={mode === 'add' ? 'Add New Product' : 'Products Information'}
      isActive={true}
      onClose={onClose}
    >
      {/* Formik Form */}
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const productData = {
              name: values.productName,
              quantity: values.productQuantity,
              price: values.productPrice,
              status: values.productStatus as ProductStatus,
              type: values.productType as ProductType,
              brand: values.brandName,
              productImage: values.productImage,
              brandImage: values.brandImage,
            };

            let savedProduct;
            if (mode === 'edit' && productId) {
              savedProduct = await updateProduct(productId, productData);
              toast.success("Product updated successfully!", { position: "top-center" });
            } else {
              savedProduct = await createProduct(productData);
              toast.success("Product created successfully!", { position: "top-center" });
            }

            onClose();
            onSave(savedProduct);
          } catch (error) {
            toast.error(mode === 'edit' ? "Update product failed!" : "Create product failed!", {
              position: "top-center"
            });
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="input-form">
            {/* Upload product image */}
            <div className="product-upload">
              <img className="product-img-modal" src={values.productImage} alt="Product" />
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = reader.result as string;
                      setFieldValue('productImage', base64String);
                    };
                    reader.readAsDataURL(file);
                }}
                className="upload-area"
                style={{ display: 'none' }}
                ref={inputRef}
              >
              </input>

              <div
                onClick={() => {
                  const inputImage = inputRef.current;

                  if (inputImage !== null) {
                    
                    inputImage.click();
                  }
                }}
                className="upload-area"
              >
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <div className="upload-text">Click to upload</div>
              </div>

            </div>

            {/* Name */}
            <fieldset className="form-group">
              <label className="text text-title-lg" htmlFor="productName">
                Name
              </label>
              <Field
                type="text"
                id="productName"
                name="productName"
                className="form-input"
                placeholder="Enter name..."
                maxLength={55}
              />
              <ErrorMessage name="productName" component="div" className="error-message" />
            </fieldset>

            {/* Quantity */}
            <fieldset className="form-group">
              <label className="text text-title-lg" htmlFor="productQuantity">
                Quantity
              </label>
              <Field
                type="number"
                id="productQuantity"
                name="productQuantity"
                className="form-input"
                placeholder="0"
              />
              <ErrorMessage name="productQuantity" component="div" className="error-message" />
            </fieldset>

            {/* Price */}
            <fieldset className="form-group">
              <label className="text text-title-lg" htmlFor="productPrice">
                Price
              </label>
              <Field
                type="number"
                step="0.01"
                id="productPrice"
                name="productPrice"
                className="form-input"
                placeholder="0"
              />
              <ErrorMessage name="productPrice" component="div" className="error-message" />
            </fieldset>

            {/* Row: Status + Type */}
            <div className="form-row">
              <fieldset className="form-group">
                <label className="text text-title-lg" htmlFor="productStatus">Status</label>
                <Field as="select" id="productStatus" name="productStatus" className="form-select">
                  <option value="Available">Available</option>
                  <option value="Sold out">Sold out</option>
                </Field>
              </fieldset>

              <fieldset className="form-group">
                <label className="text text-title-lg" htmlFor="productType">Types</label>
                <Field as="select" id="productType" name="productType" className="form-select">
                  <option value="Bravo">Bravo</option>
                  <option value="Alfa">Alfa</option>
                  <option value="Gold">Gold</option>
                </Field>
              </fieldset>
            </div>

            {/* Row: Brand + Brand Image */}
            <div className="form-row">
              <fieldset className="form-group">
                <label className="text text-title-lg" htmlFor="brandName">Brand</label>
                <Field
                  type="text"
                  id="brandName"
                  name="brandName"
                  className="form-input"
                  placeholder="Enter Brand..."
                  maxLength={55}
                />
                <ErrorMessage name="brandName" component="div" className="error-message" />
              </fieldset>

              <fieldset className="form-group">
                <label className="text text-title-lg">Brand Image</label>
                <div className="upload-section">
                  <img src={values.brandImage} alt="Brand" className="brand-avatar-detail" />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64String = reader.result as string;
                        setFieldValue('brandImage', base64String);
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="upload-area"
                    style={{ display: 'none' }}
                    ref={inputRefBrandImg}
                  >
                  </input>

                  <button
                    type="button"
                    className="upload-btn"
                    onClick={() => {
                      const inputImage = inputRefBrandImg.current;

                      if (inputImage !== null) {
                        
                        inputImage.click();
                      }
                    }}
                  >
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    Upload photo
                  </button>
                </div>
              </fieldset>
            </div>

            {/* Actions */}
            <div className="action-buttons modal-active">
              <Button type="button" className="secondary-btn" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="primary-btn">
                Confirm
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProductModal;
