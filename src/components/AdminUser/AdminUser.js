import { usePermissons } from 'hooks/usePermissions';

const AdminUser = ({ children = null, fallback = null }) => {
  const { isAdmin } = usePermissons();
  return isAdmin ? children : fallback;
};

export default AdminUser;
