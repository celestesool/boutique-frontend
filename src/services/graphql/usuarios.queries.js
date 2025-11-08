import { gql } from '@apollo/client';

// ============================================
// QUERIES
// ============================================

export const USUARIOS = gql`
  query Usuarios {
    usuarios {
      id
      email
      nombre
      rolNombre
      activo
      createdAt
      rol {
        id
        nombre
        descripcion
      }
    }
  }
`;

export const OBTENER_USUARIOS = gql`
  query ObtenerUsuarios {
    obtenerUsuarios {
      id
      email
      nombre
      rolNombre
      activo
      createdAt
      rol {
        id
        nombre
        descripcion
      }
    }
  }
`;

export const USUARIO = gql`
  query Usuario($id: ID!) {
    usuario(id: $id) {
      id
      email
      nombre
      rolNombre
      activo
      createdAt
      rol {
        id
        nombre
        descripcion
        permisos {
          id
          nombre
          codigo
        }
      }
    }
  }
`;

export const MI_PERFIL = gql`
  query MiPerfil {
    miPerfil {
      id
      email
      nombre
      rolNombre
      activo
      createdAt
      rol {
        id
        nombre
        permisos {
          codigo
        }
      }
    }
  }
`;

// ============================================
// MUTATIONS
// ============================================

export const ACTUALIZAR_PERFIL = gql`
  mutation ActualizarPerfil($input: UpdateUserInput!) {
    actualizarPerfil(input: $input) {
      id
      nombre
      email
    }
  }
`;

export const ACTUALIZAR_USUARIO = gql`
  mutation ActualizarUsuario($id: ID!, $input: UpdateUserInput!) {
    actualizarUsuario(id: $id, input: $input) {
      id
      nombre
      email
      activo
    }
  }
`;

export const CAMBIAR_ROL_USUARIO = gql`
  mutation CambiarRolUsuario($id: ID!, $input: UpdateUserRoleInput!) {
    cambiarRolUsuario(id: $id, input: $input) {
      id
      rolNombre
      rol {
        id
        nombre
      }
    }
  }
`;

export const ASIGNAR_ROLES = gql`
  mutation AsignarRoles($id: ID!, $input: UpdateUserRoleInput!) {
    asignarRoles(id: $id, input: $input) {
      id
      rolNombre
      rol {
        id
        nombre
      }
    }
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation EliminarUsuario($id: ID!) {
    eliminarUsuario(id: $id)
  }
`;
