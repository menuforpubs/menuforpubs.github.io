import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import css from './Category.module.scss';

import { getQueryParamsStr } from 'utils/queryString.utils';

import { usePermissons } from 'hooks/usePermissions';

import AdminUser from 'components/AdminUser/AdminUser';
import { ReactComponent as PencilIcon } from 'assets/images/pencil.svg';

const cx = classNames.bind(css);

const Category = ({
  path,
  title,
  imagePath,
  pubName,
  imageUrl,
  onLoadImage,
  onSelectEdit,
  isHidden = false,
}) => {
  const { key, isAdmin } = usePermissons();

  const onEditClick = (e) => {
    console.log('clicked on pencil');
    e.preventDefault();
    e.stopPropagation();
    onSelectEdit();
  };

  return (
    <Link
      className={cx('category-container-link', {
        'hidden-category': isHidden && !isAdmin,
        'grayed-category': isHidden && isAdmin,
      })}
      to={`/${pubName}/section/${path}${
        key
          ? getQueryParamsStr({
              key,
            })
          : ''
      }`}
    >
      <AdminUser>
        <PencilIcon onClick={onEditClick} className={css['edit-icon']} />
      </AdminUser>
      <div className={css['category-container']}>
        {imageUrl && (
          <img
            src={imageUrl}
            className={css['category-image']}
            alt={imagePath}
            onLoad={onLoadImage}
          />
        )}
        <div className={css['label']}>{title}</div>
      </div>
    </Link>
  );
};

export default Category;
