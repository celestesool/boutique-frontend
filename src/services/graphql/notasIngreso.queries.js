import { gql } from '@apollo/client';

// ============================================
// QUERIES
// ============================================

export const NOTAS_INGRESO = gql`
  query NotasIngreso {
    notasIngreso {
      id
      numero
      proveedor
      total
      estado
      observaciones
      createdAt
      updatedAt
      detalles {
        id
        cantidad
        precioUnitario
        subtotal
        producto {
          id
          nombre
          precio
        }
      }
    }
  }
`;

export const NOTA_INGRESO = gql`
  query NotaIngreso($id: ID!) {
    notaIngreso(id: $id) {
      id
      numero
      proveedor
      total
      estado
      observaciones
      createdAt
      updatedAt
      detalles {
        id
        cantidad
        precioUnitario
        subtotal
        producto {
          id
          nombre
          precio
          stock
        }
      }
    }
  }
`;

export const NOTAS_INGRESO_POR_PROVEEDOR = gql`
  query NotasIngresoPorProveedor($proveedor: String!) {
    notasIngresoPorProveedor(proveedor: $proveedor) {
      id
      numero
      proveedor
      total
      estado
      createdAt
    }
  }
`;

// ============================================
// MUTATIONS
// ============================================

export const CREAR_NOTA_INGRESO = gql`
  mutation CrearNotaIngreso($input: CreateNotaIngresoInput!) {
    crearNotaIngreso(input: $input) {
      id
      numero
      proveedor
      total
      estado
      observaciones
      detalles {
        id
        cantidad
        precioUnitario
        subtotal
        producto {
          id
          nombre
        }
      }
    }
  }
`;

export const PROCESAR_NOTA_INGRESO = gql`
  mutation ProcesarNotaIngreso($id: ID!) {
    procesarNotaIngreso(id: $id) {
      id
      numero
      estado
      updatedAt
    }
  }
`;

export const ACTUALIZAR_ESTADO_NOTA_INGRESO = gql`
  mutation ActualizarEstadoNotaIngreso($id: ID!, $input: UpdateNotaIngresoInput!) {
    actualizarEstadoNotaIngreso(id: $id, input: $input) {
      id
      estado
      observaciones
    }
  }
`;

export const ELIMINAR_NOTA_INGRESO = gql`
  mutation EliminarNotaIngreso($id: ID!) {
    eliminarNotaIngreso(id: $id)
  }
`;
