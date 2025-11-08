import { useQuery } from '@apollo/client';
import {
  REPORTE_GENERAL,
  REPORTE_VENTAS,
  VENTAS_DEL_DIA,
  VENTAS_DEL_MES,
  VENTAS_DEL_ANIO,
  VENTAS_POR_FECHA,
  PRODUCTOS_MAS_VENDIDOS,
  USUARIOS_MAS_ACTIVOS,
  REPORTE_INVENTARIO,
  PRODUCTOS_BAJO_STOCK,
} from '../services/graphql/reportes.queries';

export const useReporteGeneral = () => {
  const { data, loading, error, refetch } = useQuery(REPORTE_GENERAL);

  return {
    reporte: data?.reporteGeneral,
    loading,
    error,
    refetch,
  };
};

export const useReporteVentas = (fechaInicio = null, fechaFin = null) => {
  const { data, loading, error } = useQuery(REPORTE_VENTAS, {
    variables: {
      input: fechaInicio && fechaFin ? { fechaInicio, fechaFin } : undefined,
    },
  });

  return {
    reporteVentas: data?.reporteVentas,
    loading,
    error,
  };
};

export const useVentasDelDia = () => {
  const { data, loading, error } = useQuery(VENTAS_DEL_DIA);

  return {
    ventasDelDia: data?.ventasDelDia,
    loading,
    error,
  };
};

export const useVentasDelMes = () => {
  const { data, loading, error } = useQuery(VENTAS_DEL_MES);

  return {
    ventasDelMes: data?.ventasDelMes,
    loading,
    error,
  };
};

export const useVentasDelAnio = () => {
  const { data, loading, error } = useQuery(VENTAS_DEL_ANIO);

  return {
    ventasDelAnio: data?.ventasDelAnio,
    loading,
    error,
  };
};

export const useVentasPorFecha = (fechaInicio = null, fechaFin = null) => {
  const { data, loading, error } = useQuery(VENTAS_POR_FECHA, {
    variables: {
      input: fechaInicio && fechaFin ? { fechaInicio, fechaFin } : undefined,
    },
  });

  return {
    ventasPorFecha: data?.ventasPorFecha || [],
    loading,
    error,
  };
};

export const useProductosMasVendidos = (limite = 10) => {
  const { data, loading, error } = useQuery(PRODUCTOS_MAS_VENDIDOS, {
    variables: {
      input: { limite },
    },
  });

  return {
    productosMasVendidos: data?.productosMasVendidos || [],
    loading,
    error,
  };
};

export const useUsuariosMasActivos = (limite = 10) => {
  const { data, loading, error } = useQuery(USUARIOS_MAS_ACTIVOS, {
    variables: {
      input: { limite },
    },
  });

  return {
    usuariosMasActivos: data?.usuariosMasActivos || [],
    loading,
    error,
  };
};

export const useReporteInventario = () => {
  const { data, loading, error } = useQuery(REPORTE_INVENTARIO);

  return {
    reporteInventario: data?.reporteInventario,
    loading,
    error,
  };
};

export const useProductosBajoStock = (stockMinimo = 10) => {
  const { data, loading, error } = useQuery(PRODUCTOS_BAJO_STOCK, {
    variables: { stockMinimo },
  });

  return {
    productosBajoStock: data?.productosBajoStock || [],
    loading,
    error,
  };
};
