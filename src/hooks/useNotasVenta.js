import { useQuery, useMutation } from '@apollo/client';
import {
  NOTAS_VENTA,
  NOTA_VENTA,
  MIS_NOTAS_VENTA,
  ESTADISTICAS_VENTAS,
  CREAR_NOTA_VENTA,
  ACTUALIZAR_ESTADO_NOTA_VENTA,
  PROCESAR_NOTA_VENTA,
  CANCELAR_NOTA_VENTA,
  ELIMINAR_NOTA_VENTA,
} from '../services/graphql/notasVenta.queries';

export const useNotasVenta = () => {
  const { data, loading, error, refetch } = useQuery(NOTAS_VENTA);

  const [crearNotaVentaMutation] = useMutation(CREAR_NOTA_VENTA);
  const [actualizarEstadoMutation] = useMutation(ACTUALIZAR_ESTADO_NOTA_VENTA);
  const [procesarNotaVentaMutation] = useMutation(PROCESAR_NOTA_VENTA);
  const [cancelarNotaVentaMutation] = useMutation(CANCELAR_NOTA_VENTA);
  const [eliminarNotaVentaMutation] = useMutation(ELIMINAR_NOTA_VENTA);

  const crearNotaVenta = async (usuarioId, detalles, observaciones = '', ordenId = null) => {
    const result = await crearNotaVentaMutation({
      variables: {
        input: {
          usuarioId,
          ordenId,
          detalles,
          observaciones,
        },
      },
    });
    refetch();
    return result.data.crearNotaVenta;
  };

  const actualizarEstado = async (id, estado, observaciones) => {
    const result = await actualizarEstadoMutation({
      variables: {
        id,
        input: { estado, observaciones },
      },
    });
    refetch();
    return result.data.actualizarEstadoNotaVenta;
  };

  const procesarNotaVenta = async (id) => {
    const result = await procesarNotaVentaMutation({
      variables: { id },
    });
    refetch();
    return result.data.procesarNotaVenta;
  };

  const cancelarNotaVenta = async (id) => {
    const result = await cancelarNotaVentaMutation({
      variables: { id },
    });
    refetch();
    return result.data.cancelarNotaVenta;
  };

  const eliminarNotaVenta = async (id) => {
    await eliminarNotaVentaMutation({
      variables: { id },
    });
    refetch();
    return true;
  };

  return {
    notasVenta: data?.notasVenta || [],
    loading,
    error,
    refetch,
    crearNotaVenta,
    actualizarEstado,
    procesarNotaVenta,
    cancelarNotaVenta,
    eliminarNotaVenta,
  };
};

export const useNotaVenta = (id) => {
  const { data, loading, error } = useQuery(NOTA_VENTA, {
    variables: { id },
    skip: !id,
  });

  return {
    notaVenta: data?.notaVenta,
    loading,
    error,
  };
};

export const useMisNotasVenta = (usuarioId) => {
  const { data, loading, error } = useQuery(MIS_NOTAS_VENTA, {
    variables: { usuarioId },
    skip: !usuarioId,
  });

  return {
    notasVenta: data?.misNotasVenta || [],
    loading,
    error,
  };
};

export const useEstadisticasVentas = () => {
  const { data, loading, error } = useQuery(ESTADISTICAS_VENTAS);

  return {
    estadisticas: data?.estadisticasVentas,
    loading,
    error,
  };
};
