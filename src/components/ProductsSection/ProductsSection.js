import React, { useMemo } from 'react';
import size from 'lodash/fp/size';
import orderBy from 'lodash/fp/orderBy';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import toNumber from 'lodash/fp/toNumber';
import classNames from 'classnames/bind';

import css from './ProductsSection.module.scss';

import { usePermissons } from 'hooks/usePermissions';
import { useFeature } from 'hooks/useFeature';

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
  const { sortBySalePrice } = useFeature();

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

  const products = useMemo(
    () =>
      sortBySalePrice
        ? flow([
            get('products'),
            orderBy(({ salePrice }) => toNumber(salePrice || ''), 'desc'),
          ])(subSection)
        : subSection.products,
    [subSection]
  );

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
        {products &&
          products.map((product, i) => (
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
