import { useQuery, useMutation } from '@apollo/client';
import {
  ROLES,
  ROL,
  PERMISOS,
  PERMISO,
  CREAR_ROL,
  ACTUALIZAR_ROL,
  ELIMINAR_ROL,
  INICIALIZAR_PERMISOS_BASICOS,
} from '../services/graphql/roles.queries';

export const useRoles = () => {
  const { data, loading, error, refetch } = useQuery(ROLES);

  const [crearRolMutation] = useMutation(CREAR_ROL);
  const [actualizarRolMutation] = useMutation(ACTUALIZAR_ROL);
  const [eliminarRolMutation] = useMutation(ELIMINAR_ROL);
  const [inicializarPermisosMutation] = useMutation(INICIALIZAR_PERMISOS_BASICOS);

  const crearRol = async (nombre, descripcion, permisoIds) => {
    const result = await crearRolMutation({
      variables: {
        input: {
          nombre,
          descripcion,
          permisoIds,
        },
      },
    });
    refetch();
    return result.data.crearRol;
  };

  const actualizarRol = async (id, nombre, descripcion, permisoIds) => {
    const result = await actualizarRolMutation({
      variables: {
        id,
        input: {
          nombre,
          descripcion,
          permisoIds,
        },
      },
    });
    refetch();
    return result.data.actualizarRol;
  };

  const eliminarRol = async (id) => {
    await eliminarRolMutation({
      variables: { id },
    });
    refetch();
    return true;
  };

  const inicializarPermisos = async () => {
    const result = await inicializarPermisosMutation();
    return result.data.inicializarPermisosBasicos;
  };

  return {
    roles: data?.roles || [],
    loading,
    error,
    refetch,
    crearRol,
    actualizarRol,
    eliminarRol,
    inicializarPermisos,
  };
};

export const useRol = (id) => {
  const { data, loading, error } = useQuery(ROL, {
    variables: { id },
    skip: !id,
  });

  return {
    rol: data?.rol,
    loading,
    error,
  };
};

export const usePermisos = () => {
  const { data, loading, error } = useQuery(PERMISOS);

  return {
    permisos: data?.permisos || [],
    loading,
    error,
  };
};

export const usePermiso = (id) => {
  const { data, loading, error } = useQuery(PERMISO, {
    variables: { id },
    skip: !id,
  });

  return {
    permiso: data?.permiso,
    loading,
    error,
  };
};
