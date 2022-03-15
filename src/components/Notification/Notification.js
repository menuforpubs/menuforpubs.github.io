import React, { useState, useContext } from 'react';
import noop from 'lodash/fp/noop';
import Modal from 'react-modal';

import css from './Notification.module.scss';

import { MenuContext } from 'components/MenuProvider/MenuProvider';

import NotificationEditor from 'components/NotificationEditor/NotificationEditor';
import AdminUser from 'components/AdminUser/AdminUser';
import { ReactComponent as PencilIcon } from 'assets/images/pencil.svg';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Notification = ({ notification, pubName }) => {
  const [selectedNotification, setSelectedNotification] = useState();

  const { updateMenuData } = useContext(MenuContext);

  return (
    <>
      {notification ? (
        <div className={css['container']}>
          <div className={css['title']}>{notification.title}</div>
          <div className={css['content']}>{notification.content}</div>
          <AdminUser>
            <PencilIcon
              onClick={() => setSelectedNotification(notification)}
              className={css['edit-button']}
            />
          </AdminUser>
        </div>
      ) : (
        <AdminUser>
          <div className={css['add-notification-button-container']}>
            <div
              onClick={() => setSelectedNotification({})}
              className={css['add-notification-button']}
            >
              הוספת הודעה +
            </div>
          </div>
        </AdminUser>
      )}
      <Modal
        isOpen={!!selectedNotification}
        onAfterOpen={noop}
        onRequestClose={() => setSelectedNotification()}
        style={customStyles}
        contentLabel="עריכת מוצר"
      >
        {!!selectedNotification && (
          <NotificationEditor
            notification={selectedNotification}
            onCancel={() => setSelectedNotification()}
            onSave={(updatedSubSection) => {
              updateMenuData(pubName, updatedSubSection);
              setSelectedNotification();
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default Notification;
