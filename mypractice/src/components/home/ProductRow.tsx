import React from 'react';
import { Product } from 'types/product.types';
import ImageInfo from '@components/ImageInfo_bk/index';
import StatusBadge from '@components/StatusBadge_bk/index';
import ActionMenu from 'Share_bk/Components_bk/ActionMenu_bk/index';

interface ProductRowProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRowClick: (product: Product) => void;
}

const truncateText = (text: string, maxLength: number = 30) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
};

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  return (
    <tr onClick={() => onRowClick(product)}>
      <td>
        <ImageInfo
          imageSrc={product.productImage}
          fallbackSrc="/placeholder-product.png"
          alt={product.name}
          text={<span title={product.name}>{truncateText(product.name, 30)}</span>}
          variant="product"
        />
      </td>
      <td>
        <StatusBadge status={product.status} />
      </td>
      <td>
        <span className="product-type">{product.type}</span>
      </td>
      <td>
        <span className="product-quantity">{product.quantity}</span>
      </td>
      <td>
        <ImageInfo
          imageSrc={product.brandImage}
          fallbackSrc="/placeholder-brand.png"
          alt={product.brand}
          text={<span title={product.brand}>{truncateText(product.brand, 30)}</span>}
          variant="brand"
        />
      </td>
      <td>
        <span className="product-price">{product.formatPrice()}</span>
      </td>
      <td onClick={(e) => e.stopPropagation()}>
        <ActionMenu
          onEdit={() => onEdit(product.id)}
          onDelete={() => onDelete(product.id)}
        />
      </td>
    </tr>
  );
};

export default ProductRow;
