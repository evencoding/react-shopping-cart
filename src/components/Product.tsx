import { styled } from 'styled-components';
import { CartIcon } from '../assets/svg';
import { useCart } from '../hooks/useCart';
import Stepper from './Stepper';

interface IProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Props {
  data: IProduct;
}

export default function Product({ data: { id, name, price, imageUrl } }: Props) {
  const { addToCart, findProductInCart } = useCart();
  const productInCart = findProductInCart(id);

  return (
    <Style.Container>
      <Style.ProductImage path={imageUrl} />
      <Style.ProductInfo>
        <div>
          <Style.ProductName>{name}</Style.ProductName>
          <Style.ProductPrice>{price.toLocaleString('ko-KR')}원</Style.ProductPrice>
        </div>
        {Boolean(productInCart) ? (
          <Style.StepperWrapper>
            <Stepper initCount={productInCart?.quantity} productId={id} />
          </Style.StepperWrapper>
        ) : (
          <Style.CartIconWrapper onClick={() => addToCart(id)}>
            <CartIcon fill="#AAAAAA" />
          </Style.CartIconWrapper>
        )}
      </Style.ProductInfo>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    width: 282px;
  `,

  ProductImage: styled.div<{ path: string }>`
    width: 282px;
    height: 282px;

    background-image: ${(props) => `url(${props.path})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `,

  ProductInfo: styled.div`
    display: flex;
    justify-content: space-between;

    padding: 18px 12px 0 12px;
    letter-spacing: 0.5px;
  `,

  ProductName: styled.p`
    margin-bottom: 8px;
  `,

  ProductPrice: styled.p`
    font-size: 20px;
  `,

  StepperWrapper: styled.div``,

  CartIconWrapper: styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background-color: inherit;
    height: fit-content;

    cursor: pointer;
  `,
};
