import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Product } from 'types/product.types';
import { useProducts } from '@hooks/useProducts';
import ProductTable from './_ProductTable';
import Pagination from './_Pagination';
import Heading from '@share/Components/Heading';
import Button from '@share/Components/Button/index';
import Modal from '@components/Modals/index';
import ErrorMessage from '@share/Components/ErrorMessage';
import '@assets/styles/main.css';
import ProductForm from './_ProductForm';
import { toast } from "react-toastify";

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
    getProductById,
    refreshProducts,
    deleteProduct,
    initializePagination,
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    const todoType = searchParams.get('todo');
    const productId = searchParams.get('id');

    if (todoType === 'edit' && productId) {
      handleEditProductFromURL(productId);
    } else if (todoType === 'delete' && productId) {
      handleDeleteProductFromURL(productId);
    }
  }, [searchParams]);

  useEffect(() => {
  const pageParam = searchParams.get("page");
  const itemsParam = searchParams.get("items");

  const pageFromUrl = pageParam ? Number(pageParam) : 1;
  const itemsFromUrl = itemsParam ? Number(itemsParam) : 10;

  initializePagination(pageFromUrl, itemsFromUrl);
}, []);

  const handleEditProductFromURL = async (id: string) => {
    try {
      if (!showEditProduct && !editingProduct) {
        const product = await getProductById(id);
        setEditingProduct(product);
        setShowEditProduct(true);
      }
    } catch (error) {
      console.error('Failed to load product for editing:', error);
    }
  };

  const handleDeleteProductFromURL = (id: string) => {
    if (!showDeleteConfirm && !productToDelete) {
      setProductToDelete(id);
      setShowDeleteConfirm(true);
    }
  };

  const handleAddProduct = () => {
    setShowCreateProduct(true);
  };

  const handleEditProduct = async (id: string) => {
    try {
      const product = await getProductById(id);
      setSearchParams({
        todo: 'edit',
        id: id,
        name: encodeURIComponent(product.name)
      });
      setEditingProduct(product);
      setShowEditProduct(true);
    } catch (error) {
      console.error('Failed to load product for editing:', error);
    }
  };

  const handleDeleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSearchParams({
        todo: 'delete',
        id: id,
        name: encodeURIComponent(product.name)
      });
    }
    setProductToDelete(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
    setSearchParams({});
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setShowDeleteConfirm(false);
        setProductToDelete(null);
        // Clear URL parameters after successful deletion
        setSearchParams({});
        await refreshProducts();
        toast.success("Product deleted successfully!", {
          position: "top-center"
        });
      } catch (error) {
        toast.error("Failed to delete product!", {
          position: "top-center"
        });
      }
    }
  };

  const handleRowClick = (product: Product) => {
    const currentParams = new URLSearchParams();
    if (currentPage > 1) {
      currentParams.set('page', currentPage.toString());
    }
    if (itemsPerPage !== 10) {
      currentParams.set('items', itemsPerPage.toString());
    }
    const returnUrl = `/home${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
    navigate(`/productdetail/${product.id}?name=${encodeURIComponent(product.name)}&returnUrl=${encodeURIComponent(returnUrl)}`);
  };

  const closeModals = () => {
    setShowEditProduct(false);
    setShowCreateProduct(false);
    setEditingProduct(null);
    const newParams: any = {};
    if (currentPage > 1) newParams.page = currentPage.toString();
    if (itemsPerPage !== 10) newParams.items = itemsPerPage.toString();

    setSearchParams(newParams);
  };

  const handlePageChangeWithURL = (page: number) => {
    updateURLParams(page, itemsPerPage);
    handlePageChange(page);
  };

  const handleItemsPerPageChangeWithURL = (items: number) => {
    updateURLParams(1, items);
    handleItemsPerPageChange(items);
  };

  // Helper function to update URL parameters
  const updateURLParams = (page: number, items: number) => {
    const newSearchParams: any = {};

    const existingTodo = searchParams.get('todo');
    const existingId = searchParams.get('id');
    const existingName = searchParams.get('name');

    if (existingTodo) newSearchParams.todo = existingTodo;
    if (existingId) newSearchParams.id = existingId;
    if (existingName) newSearchParams.name = existingName;

    if (page > 1) {
      newSearchParams.page = page.toString();
    }
    if (items !== 10) {
      newSearchParams.items = items.toString();
    }
    setSearchParams(newSearchParams);
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
      <Heading as="h1" size="lg" className="header-title" value="Management" />

      <div className="button-container">
        <Button onClick={handleAddProduct}>Add New Product</Button>
      </div>

      <ProductTable
        products={products}
        loading={loading}
        onFilter={handleFilter}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onRowClick={handleRowClick}
      />

      {!loading && products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChangeWithURL}
          onItemsPerPageChange={handleItemsPerPageChangeWithURL}
        />
      )}

      {showDeleteConfirm && (
        <Modal
          title=""
          isActive={true}
          onClose={cancelDelete}
          customHeader={
            <>
              <div className="modal-icon">
                <i className="fa-regular fa-trash-can"></i>
              </div>
              <button className="close-btn" onClick={cancelDelete}>
                ×
              </button>
            </>
          }
        >
          <Heading as="h2" size="md" value="Delete product" className="modal-title"/>
          <p className="text text-info text-description">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <div className="modal-actions">
            <Button type="button" className="secondary-btn cancel-modal-confirm" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button className="delete-product" id="deleteProduct" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </Modal>
      )}

      {showCreateProduct && (
        <ProductForm
          mode="add"
          onClose={() => setShowCreateProduct(false)}
          onSave={async (values) => {
            setShowCreateProduct(false);
            await refreshProducts();
          }}
        />
      )}

      {showEditProduct && editingProduct && (
        <ProductForm
          mode="edit"
          productId={editingProduct.id}
          initialValues={{
            productName: editingProduct.name,
            productQuantity: editingProduct.quantity,
            productPrice: editingProduct.price,
            productStatus: editingProduct.status,
            productType: editingProduct.type,
            brandName: editingProduct.brand,
            productImage: editingProduct.productImage,
            brandImage: editingProduct.brandImage,
          }}
          onClose={closeModals}
          onSave={async (values) => {
            closeModals();
            await refreshProducts();
          }}
        />
      )}
    </main>
  );
};

export default Home;
