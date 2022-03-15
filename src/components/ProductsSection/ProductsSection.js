import React from 'react';
import size from 'lodash/fp/size';
import classNames from 'classnames/bind';

import css from './ProductsSection.module.scss';

import { usePermissons } from 'hooks/usePermissions';

import Product from 'components/Product/Product';
import AdminUser from 'components/AdminUser/AdminUser';

const cx = classNames.bind(css);

const ProductsSection = ({
  subSection,
  index,
  onSelectProduct,
  onSelectSubSection,
}) => {
  const { isAdmin } = usePermissons();

  const addEmptyProduct = () => {
    const emptyProduct = {
      product: '',
      description: '',
      price: '',
      id: 'new',
    };
    onSelectProduct({
      product: emptyProduct,
      productIndex: size(subSection.products),
      subSectionIndex: index,
      subSection,
    });
  };

  return (
    <div key={subSection.title} className={css['section']}>
      <div
        className={cx('title', { link: isAdmin })}
        onClick={() =>
          onSelectSubSection({ subSection, subSectionIndex: index })
        }
      >
        {subSection.title}
      </div>
      <div className={css['section-content']}>
        {subSection.products.map((product, i) => (
          <Product
            product={product}
            key={i}
            onSelect={(product) =>
              onSelectProduct({
                product,
                productIndex: i,
                subSectionIndex: index,
                subSection,
              })
            }
          />
        ))}
      </div>
      <AdminUser>
        <div className={css['add-product-button-container']}>
          <div className={css['add-product-button']} onClick={addEmptyProduct}>
            הוספת מוצר +
          </div>
        </div>
      </AdminUser>
    </div>
  );
};

export default ProductsSection;
