import { useEffect } from 'react';
import { styled } from 'styled-components';

import { useQuery } from '../hooks/useQuery';

import { Product, Skeleton } from './exporter';

import { Product as IProduct } from '../types';

export const ProductList = () => {
  const { isLoading, data: products, fetchData } = useQuery<IProduct[]>();

  useEffect(() => {
    fetchData('/products');
  }, []);

  return (
    <Style.Container>
      {isLoading
        ? Array.from({ length: 12 }).map(() => <Skeleton />)
        : products?.map((product) => (
            <li key={product.id}>
              <Product item={product} />
            </li>
          ))}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    margin-top: 60px;

    @media screen and (min-width: 501px) {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 45px;
      grid-row-gap: 60px;
    }

    @media screen and (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: center;

      margin-bottom: 40px;

      & > li:not(:last-child) {
        margin-bottom: 45px;
      }
    }
  `,
};
