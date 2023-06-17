import { useContext } from "react";
import { CartItemType } from "../context/CartProvider";
import { ProductsContext } from "../context/ProductsProvider";
import useCart from "../hooks/useCart";
import Product from "./Product";

const ProductsList = () => {
	const { products } = useContext(ProductsContext);
	const { REDUCER_ACTION_TYPE, dispatch, cart } = useCart();

	return (
		<div className="main main--products">
			{products?.map((product) => {
				const cartItem: CartItemType | undefined = cart.find(
					(item) => item.sku === product.sku
				);

				return (
					<Product
						key={product.sku}
						product={product}
						dispatch={dispatch}
						REDUCER_ACTION_TYPE={REDUCER_ACTION_TYPE}
						cartItem={cartItem}
					/>
				);
			})}
		</div>
	);
};

export default ProductsList;
