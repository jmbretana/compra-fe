import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { capitalizeFirstLetter } from "@utils/utils";

import OrdersTableComponent from "./OrdersTable";
import { ORDER_GETALL_SUCCESS } from "@OrderActionTypes";
import { GetAllOrders } from "@actions/ordersActions";
import { Order } from "@interfaces";
import { Loading, TittleHeader } from "@common";

const OrdersComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  let first = true;

  const dispatch = useDispatch<AppDispatch>();
  const { orders, statusOrder } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    if (first) {
      if (orders.length > 0) loadOrders();
      else {
        try {
          dispatch(GetAllOrders());
        } catch (error) {
          console.error("Error al cargar los pedidos", error);
          dispatch(GetAllOrders());
        }
      }
      first = false;
    }
  }, []);

  useEffect(() => {
    if (statusOrder === ORDER_GETALL_SUCCESS) {
      loadOrders();
    }
  }, [orders]);

  const loadOrders = () => {
    const arrayData = Array.isArray(orders)
      ? orders.map((order) => {
          return {
            _id: order._id,
            order_id: order.order_id,
            proveedor: capitalizeFirstLetter(order.proveedor),
            fecha: order.fecha,
            total: order.total,
            productsList: order.productsList,
          };
        })
      : [];
    arrayData.sort((a, b) => a.proveedor.localeCompare(b.proveedor));
    setData(arrayData);
    setLoading(false);
  };

  const handlerEditOrder = (id: string) => {
    navigate("/orders/" + id);
  };

  return (
    <Box mb={5}>
      {" "}
      <TittleHeader title="Pedidos realizados" />
      {loading && <Loading />}
      {!loading && data.length > 0 && (
        <OrdersTableComponent
          data={data}
          onEdit={(id) => handlerEditOrder(id)}
        />
      )}
    </Box>
  );
};

export default OrdersComponent;
