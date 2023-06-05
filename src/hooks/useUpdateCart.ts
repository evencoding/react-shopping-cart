import { useSetCartState } from '../recoils/recoilCart';
import { useMutation } from './useMutation';
import { useApiBaseUrlValue } from '../recoils/recoilApiBaseUrl';

import { FETCH_METHOD } from './useMutation';
import { FETCH_URL, QUANTITY } from '../constants';

export const useUpdateCart = () => {
  const baseUrl = useApiBaseUrlValue();

  const { mutation: updateQuantityMutation } = useMutation(FETCH_METHOD.PATCH, {
    Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
    'Content-Type': 'application/json',
  });
  const { mutation: deleteCartMutation } = useMutation(FETCH_METHOD.DELETE, {
    Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
    'Content-Type': 'application/json',
  });

  const setCart = useSetCartState();

  const increaseProductQuantity = (cartItemId: number, quantity: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === cartItemId) return { ...item, quantity };

        return item;
      });
    });

    updateQuantityMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`, {
      quantity,
    });
  };

  const decreaseProductQuantity = (cartItemId: number, quantity: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === cartItemId) return { ...item, quantity };

        return item;
      });
    });

    updateQuantityMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`, {
      quantity,
    });
  };

  const updateProductQuantity = (cartItemId: number, quantity: number) => {
    const count = quantity > QUANTITY.MAX ? QUANTITY.MAX : quantity;

    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: count };
        }
        return item;
      });
    });

    updateQuantityMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`, {
      quantity: count,
    });
  };

  const deleteCartItem = (...cartId: number[]) => {
    setCart((prev) => prev.filter((item) => !cartId.includes(item.id)));

    cartId.forEach((id) => {
      deleteCartMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${id}`);
    });
  };

  return {
    deleteCartItem,
    increaseProductQuantity,
    decreaseProductQuantity,
    updateProductQuantity,
  };
};
