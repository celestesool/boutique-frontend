import { gql } from '@apollo/client';

// ============================================
// QUERIES
// ============================================

export const ROLES = gql`
  query Roles {
    roles {
      id
      nombre
      descripcion
      activo
      createdAt
      updatedAt
      permisos {
        id
        nombre
        codigo
        descripcion
        modulo
      }
    }
  }
`;

export const ROL = gql`
  query Rol($id: ID!) {
    rol(id: $id) {
      id
      nombre
      descripcion
      activo
      permisos {
        id
        nombre
        codigo
        descripcion
        modulo
      }
    }
  }
`;

export const PERMISOS = gql`
  query Permisos {
    permisos {
      id
      nombre
      codigo
      descripcion
      modulo
      activo
    }
  }
`;

export const PERMISO = gql`
  query Permiso($id: ID!) {
    permiso(id: $id) {
      id
      nombre
      codigo
      descripcion
      modulo
      activo
    }
  }
`;

// ============================================
// MUTATIONS
// ============================================

export const CREAR_ROL = gql`
  mutation CrearRol($input: CreateRolInput!) {
    crearRol(input: $input) {
      id
      nombre
      descripcion
      activo
      permisos {
        id
        nombre
        codigo
      }
    }
  }
`;

export const ACTUALIZAR_ROL = gql`
  mutation ActualizarRol($id: ID!, $input: UpdateRolInput!) {
    actualizarRol(id: $id, input: $input) {
      id
      nombre
      descripcion
      activo
      permisos {
        id
        nombre
        codigo
      }
    }
  }
`;

export const ELIMINAR_ROL = gql`
  mutation EliminarRol($id: ID!) {
    eliminarRol(id: $id)
  }
`;

export const INICIALIZAR_PERMISOS_BASICOS = gql`
  mutation InicializarPermisosBasicos {
    inicializarPermisosBasicos {
      id
      nombre
      codigo
      modulo
    }
  }
`;
