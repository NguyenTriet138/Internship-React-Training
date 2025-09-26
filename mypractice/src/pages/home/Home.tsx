import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Product, ProductFilter, ProductStatus, ProductType } from 'types/product.types';
import { useProducts } from '@hooks/useProducts';
import ProductTable from '@components/home/ProductTable';
import Pagination from '@components/home/Pagination';
import Heading from 'Share/Components_bk/Heading';
import Button from 'Share/Components_bk/Button';
import Modal from '@components/Modals_bk';
import ErrorMessage from 'Share/Components_bk/ErrorMessage';
import '@assets/styles/main.css';
import ProductForm from '@components/home/ProductForm';
import { toast } from 'react-toastify';

const Home: React.FC = () => {
  const {
    products,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    currentFilters,
    handleFilter,
    handlePageChange,
    handleItemsPerPageChange,
    getProductById,
    refreshProducts,
    deleteProduct,
    initializeWithFilters,
    updateLocalProduct,
    removeLocalProduct,
    addLocalProduct,
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const itemsParam = searchParams.get('items');

    const pageFromUrl = pageParam ? Number(pageParam) : 1;
    const itemsFromUrl = itemsParam ? Number(itemsParam) : 10;

    const filtersFromUrl: ProductFilter = {
      name: searchParams.get('search') || undefined,
      brand: searchParams.get('brand') || undefined,
      status: (searchParams.get('status') as ProductStatus | 'All') || undefined,
      type: (searchParams.get('type') as ProductType | 'All') || undefined,
    };

    initializeWithFilters(filtersFromUrl, pageFromUrl, itemsFromUrl);
  }, []);

  const handleAddProduct = () => {
    setShowCreateProduct(true);
  };

  const handleEditProduct = async (id: string) => {
    try {
      const product = await getProductById(id);
      setEditingProduct(product);
      setShowEditProduct(true);
    } catch (error) {
      console.error('Failed to load product for editing:', error);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        const newLength = products.length - 1;
        removeLocalProduct(productToDelete);
        setShowDeleteConfirm(false);
        setProductToDelete(null);

        if (newLength <= 0 && currentPage > 1) {
          await handlePageChange(currentPage - 1);
        }

        toast.success('Product deleted successfully!', { position: 'top-center' });
      } catch (error) {
        toast.error('Failed to delete product!', { position: 'top-center' });
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
    navigate(
      `/productdetail/${product.id}?name=${encodeURIComponent(
        product.name,
      )}&returnUrl=${encodeURIComponent(returnUrl)}`,
    );
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

  const handleFilterWithURL = (filters: ProductFilter) => {
    const newParams: any = {};

    const existingPage = searchParams.get('page');
    const existingItems = searchParams.get('items');

    if (existingPage) newParams.page = existingPage;
    if (existingItems) newParams.items = existingItems;

    if (filters.name) newParams.search = filters.name;
    if (filters.brand) newParams.brand = filters.brand;
    if (filters.status) newParams.status = filters.status;
    if (filters.type) newParams.type = filters.type;

    setSearchParams(newParams);
    handleFilter(filters);
  };

  const updateURLParams = (page: number, items: number) => {
    const newSearchParams: any = {};

    if (currentFilters.name) newSearchParams.search = currentFilters.name;
    if (currentFilters.brand) newSearchParams.brand = currentFilters.brand;
    if (currentFilters.status) newSearchParams.status = currentFilters.status;
    if (currentFilters.type) newSearchParams.type = currentFilters.type;

    if (page > 1) newSearchParams.page = page.toString();
    if (items !== 10) newSearchParams.items = items.toString();
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
        onFilter={handleFilterWithURL}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onRowClick={handleRowClick}
        initialFilters={{
          name: searchParams.get('search') || undefined,
          brand: searchParams.get('brand') || undefined,
          status: (searchParams.get('status') as ProductStatus | 'All') || undefined,
          type: (searchParams.get('type') as ProductType | 'All') || undefined,
        }}
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
          <Heading as="h2" size="md" value="Delete product" className="modal-title" />
          <p className="text text-info text-description">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <div className="modal-actions">
            <Button
              type="button"
              className="secondary-btn cancel-modal-confirm"
              onClick={cancelDelete}
            >
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
          onSave={(savedProduct) => {
            closeModals();
            updateLocalProduct(savedProduct);
          }}
        />
      )}
    </main>
  );
};

export default Home;
