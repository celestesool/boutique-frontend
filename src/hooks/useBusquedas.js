import { useQuery, useMutation } from '@apollo/client';
import {
  MIS_BUSQUEDAS,
  PRODUCTOS_POPULARES,
  HISTORIAL_BUSQUEDAS,
  CREAR_BUSQUEDA,
} from '../services/graphql/busquedas.queries';

export const useBusquedas = (usuarioId) => {
  const { data, loading, error, refetch } = useQuery(MIS_BUSQUEDAS, {
    variables: { usuarioId },
    skip: !usuarioId,
  });

  const [crearBusquedaMutation] = useMutation(CREAR_BUSQUEDA);

  const crearBusqueda = async (productoId, terminoBusqueda = '') => {
    const result = await crearBusquedaMutation({
      variables: {
        input: {
          usuarioId,
          productoId,
          terminoBusqueda,
        },
      },
    });
    refetch();
    return result.data.crearBusqueda;
  };

  return {
    busquedas: data?.misBusquedas || [],
    loading,
    error,
    refetch,
    crearBusqueda,
  };
};

export const useProductosPopulares = (limite = 10) => {
  const { data, loading, error } = useQuery(PRODUCTOS_POPULARES, {
    variables: { limite },
  });

  return {
    productosPopulares: data?.productosPopulares || [],
    loading,
    error,
  };
};

export const useHistorialBusquedas = (usuarioId, limite = 50) => {
  const { data, loading, error } = useQuery(HISTORIAL_BUSQUEDAS, {
    variables: { usuarioId, limite },
    skip: !usuarioId,
  });

  return {
    historial: data?.historialBusquedas || [],
    loading,
    error,
  };
};
