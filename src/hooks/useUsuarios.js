import { useQuery, useMutation } from '@apollo/client';
import {
  USUARIOS,
  OBTENER_USUARIOS,
  USUARIO,
  MI_PERFIL,
  ACTUALIZAR_PERFIL,
  ACTUALIZAR_USUARIO,
  CAMBIAR_ROL_USUARIO,
  ASIGNAR_ROLES,
  ELIMINAR_USUARIO,
} from '../services/graphql/usuarios.queries';

export const useUsuarios = () => {
  const { data, loading, error, refetch } = useQuery(OBTENER_USUARIOS);

  const [actualizarUsuarioMutation] = useMutation(ACTUALIZAR_USUARIO);
  const [asignarRolesMutation] = useMutation(ASIGNAR_ROLES);
  const [cambiarRolMutation] = useMutation(CAMBIAR_ROL_USUARIO);
  const [eliminarUsuarioMutation] = useMutation(ELIMINAR_USUARIO);

  const actualizarUsuario = async (id, nombre, email, activo) => {
    const result = await actualizarUsuarioMutation({
      variables: {
        id,
        input: { nombre, email, activo },
      },
    });
    refetch();
    return result.data.actualizarUsuario;
  };

  const asignarRoles = async (id, rolId) => {
    const result = await asignarRolesMutation({
      variables: {
        id,
        input: { rolId },
      },
    });
    refetch();
    return result.data.asignarRoles;
  };

  const cambiarRol = async (id, rolId) => {
    const result = await cambiarRolMutation({
      variables: {
        id,
        input: { rolId },
      },
    });
    refetch();
    return result.data.cambiarRolUsuario;
  };

  const eliminarUsuario = async (id) => {
    await eliminarUsuarioMutation({
      variables: { id },
    });
    refetch();
    return true;
  };

  return {
    usuarios: data?.obtenerUsuarios || [],
    loading,
    error,
    refetch,
    actualizarUsuario,
    asignarRoles,
    cambiarRol,
    eliminarUsuario,
  };
};

export const useUsuario = (id) => {
  const { data, loading, error } = useQuery(USUARIO, {
    variables: { id },
    skip: !id,
  });

  return {
    usuario: data?.usuario,
    loading,
    error,
  };
};

export const useMiPerfil = () => {
  const { data, loading, error, refetch } = useQuery(MI_PERFIL);

  const [actualizarPerfilMutation] = useMutation(ACTUALIZAR_PERFIL);

  const actualizarPerfil = async (nombre, email) => {
    const result = await actualizarPerfilMutation({
      variables: {
        input: { nombre, email },
      },
    });
    refetch();
    return result.data.actualizarPerfil;
  };

  return {
    perfil: data?.miPerfil,
    loading,
    error,
    refetch,
    actualizarPerfil,
  };
};
