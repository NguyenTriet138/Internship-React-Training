import React, { useState } from 'react';
import { Product } from '../types/product.types';
import { useProducts } from '../hooks/useProducts';
import Heading from '../components/Heading';
import PrimaryButton from '../components/Button/index';
import Modal from '../components/Modals/index';
import ErrorMessage from '../components/ErrorMessage';
import '../../src/assets/styles/main.css';

const Home: React.FC = () => {
  const {
    products,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    handleFilter,
    handlePageChange,
    handleItemsPerPageChange,
    // deleteProduct,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleAddProduct = () => {
    // TODO: Open add product modal
    console.log('Add product clicked');
  };

  const handleEditProduct = (id: string) => {
    // TODO: Open edit product modal
    console.log('Edit product:', id);
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    console.log('Product clicked:', product);
  };

  if (error) {
    return (
      <div className="container">
        <ErrorMessage title="Error Loading Products" message={error} />
      </div>
    );
  }

  return (
    <main className="container">
      <header>
        <Heading as="h1" size="lg" className="header-title" value="Management" />
      </header>

      <div className="button-container">
        <PrimaryButton onClick={handleAddProduct}>Add New Product</PrimaryButton>
      </div>

      {showDeleteConfirm && (
        <Modal
          title="Confirm Delete"
          onClose={cancelDelete}
          footer={
            <>
              <button className="button" onClick={cancelDelete}>
                Cancel
              </button>
              <PrimaryButton className="delete-btn">
                Delete
              </PrimaryButton>
            </>
          }
        >
          <p>Are you sure you want to delete this product? This action cannot be undone.</p>
        </Modal>
      )}
    </main>
  );
};

export default Home;
