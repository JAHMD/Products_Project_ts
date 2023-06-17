import {
	CartItemType,
	REDUCER_ACTION_TYPE,
	ReducerAction,
} from "../context/CartProvider";
import { ProductType } from "../context/ProductsProvider";

type ProductPropsType = {
	product: ProductType;
	dispatch: React.Dispatch<ReducerAction>;
	REDUCER_ACTION_TYPE: typeof REDUCER_ACTION_TYPE;
	cartItem: CartItemType | undefined;
};

function Product({
	product,
	dispatch,
	REDUCER_ACTION_TYPE,
	cartItem,
}: ProductPropsType) {
	const { name, price, sku } = product;
	const img = new URL(`../assets/${sku}.jpg`, import.meta.url).href;
	const itemInCart = cartItem ? " → Item in Cart: ✔️" : null;

	const addToCart = () => {
		dispatch({
			type: REDUCER_ACTION_TYPE.ADD,
			payload: { ...product, qty: cartItem?.qty || 1 },
		});
	};

	return (
		<article key={sku}>
			<img src={img} alt={`${name}`} className="product__img" />
			<h2>{name}</h2>
			<p>
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(price)}
				{itemInCart}
			</p>
			<button onClick={addToCart}>Add to cart</button>
		</article>
	);
}

export default Product;
