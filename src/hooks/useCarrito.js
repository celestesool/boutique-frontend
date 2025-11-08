import { useQuery, useMutation } from '@apollo/client';
import {
  MI_CARRITO,
  CARRITO,
  CONTAR_ITEMS_CARRITO,
  AGREGAR_AL_CARRITO,
  ACTUALIZAR_CANTIDAD_CARRITO,
  ELIMINAR_DEL_CARRITO,
  LIMPIAR_CARRITO,
  APLICAR_DESCUENTO_CARRITO,
  REMOVER_DESCUENTO_CARRITO,
} from '../services/graphql/carrito.queries';

export const useCarrito = (usuarioId) => {
  const { data, loading, error, refetch } = useQuery(MI_CARRITO, {
    variables: { usuarioId },
    skip: !usuarioId,
  });

  const [agregarAlCarritoMutation] = useMutation(AGREGAR_AL_CARRITO);
  const [actualizarCantidadMutation] = useMutation(ACTUALIZAR_CANTIDAD_CARRITO);
  const [eliminarDelCarritoMutation] = useMutation(ELIMINAR_DEL_CARRITO);
  const [limpiarCarritoMutation] = useMutation(LIMPIAR_CARRITO);
  const [aplicarDescuentoMutation] = useMutation(APLICAR_DESCUENTO_CARRITO);
  const [removerDescuentoMutation] = useMutation(REMOVER_DESCUENTO_CARRITO);

  const agregarAlCarrito = async (productoId, cantidad = 1) => {
    const result = await agregarAlCarritoMutation({
      variables: {
        input: {
          usuarioId,
          productoId,
          cantidad,
        },
      },
    });
    refetch();
    return result.data.agregarAlCarrito;
  };

  const actualizarCantidad = async (itemId, cantidad) => {
    const result = await actualizarCantidadMutation({
      variables: {
        input: {
          itemId,
          cantidad,
        },
      },
    });
    refetch();
    return result.data.actualizarCantidadCarrito;
  };

  const eliminarDelCarrito = async (itemId) => {
    const result = await eliminarDelCarritoMutation({
      variables: {
        input: {
          itemId,
        },
      },
    });
    refetch();
    return result.data.eliminarDelCarrito;
  };

  const limpiarCarrito = async () => {
    const result = await limpiarCarritoMutation({
      variables: { usuarioId },
    });
    refetch();
    return result.data.limpiarCarrito;
  };

  const aplicarDescuento = async (carritoId, codigoDescuento) => {
    const result = await aplicarDescuentoMutation({
      variables: {
        input: {
          carritoId,
          codigoDescuento,
        },
      },
    });
    refetch();
    return result.data.aplicarDescuentoCarrito;
  };

  const removerDescuento = async (carritoId) => {
    const result = await removerDescuentoMutation({
      variables: { carritoId },
    });
    refetch();
    return result.data.removerDescuentoCarrito;
  };

  return {
    carrito: data?.miCarrito,
    loading,
    error,
    refetch,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
    aplicarDescuento,
    removerDescuento,
  };
};

export const useContarItemsCarrito = (usuarioId) => {
  const { data, loading, error } = useQuery(CONTAR_ITEMS_CARRITO, {
    variables: { usuarioId },
    skip: !usuarioId,
  });

  return {
    cantidadItems: data?.contarItemsCarrito || 0,
    loading,
    error,
  };
};
