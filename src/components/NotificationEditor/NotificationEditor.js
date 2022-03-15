import React, { useState } from 'react';

import css from './NotificationEditor.module.scss';

import { ReactComponent as TrashIcon } from 'assets/images/trash.svg';

const NotificationEditor = ({ notification = {}, onSave, onCancel }) => {
  const [title, setTitle] = useState(notification.title);
  const [content, setContent] = useState(notification.content);

  const handleSave = () => {
    const notificationObject =
      !title && !content
        ? { notifications: [] }
        : { notifications: [{ title, content }] };
    onSave(notificationObject);
  };

  const handleDelete = () => {
    onSave({ notifications: [] });
  };

  return (
    <div className={css['container']}>
      {notification.id !== 'new' && (
        <div className={css['header']}>
          <TrashIcon className={css['trash-icon']} onClick={handleDelete} />
        </div>
      )}
      <div className={css['field-container']}>
        <div className={css['field-label']}>כותרת:</div>
        <input
          value={title}
          type="text"
          className={css['input']}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={css['field-container']}>
        <div className={css['field-label']}>תוכן:</div>
        <textarea
          value={content}
          className={css['textarea']}
          onChange={(e) => setContent(e.target.value)}
          type="text"
        />
      </div>

      <div className={css['footer']}>
        <div className={css['cancel-button']} onClick={onCancel}>
          ביטול
        </div>
        <div className={css['save-button']} onClick={handleSave}>
          שמור
        </div>
      </div>
    </div>
  );
};

export default NotificationEditor;
