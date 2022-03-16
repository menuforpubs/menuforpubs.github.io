import React, { useState } from 'react';
import set from 'lodash/fp/set';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';

import css from './SubSectionEditor.module.scss';

import { ReactComponent as HideIcon } from 'assets/images/hide.svg';

const cx = classNames.bind(css);

const SubSectionEditor = ({ subSection: { subSection }, onCancel, onSave }) => {
  const [title, setTitle] = useState(subSection.title);

  const handleSave = async () => {
    const subSectionObject = set('title', title, subSection);

    await onSave({
      ...subSectionObject,
      id: subSection.id === 'new' ? uuidv4() : subSection.id,
    });
  };

  const toggleIsHidden = () => {};

  return (
    <div className={css['container']}>
      {subSection.id !== 'new' && (
        <div className={css['header']}>
          {/* <HideIcon className={css['hide-icon']} onClick={toggleIsHidden} /> */}
        </div>
      )}
      <div className={css['field-container']}>
        <div className={css['field-label']}>שם הקטגוריה:</div>
        <input
          type="text"
          value={title}
          className={css['input']}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={css['footer']}>
        <div className={css['cancel-button']} onClick={onCancel}>
          ביטול
        </div>
        <div
          className={cx('save-button', { 'disabled-button': !title })}
          onClick={handleSave}
        >
          שמור
        </div>
      </div>
    </div>
  );
};

export default SubSectionEditor;
