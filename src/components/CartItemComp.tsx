import { ChangeEvent } from "react";
import {
	CartItemType,
	REDUCER_ACTION_TYPE,
	ReducerAction,
} from "../context/CartProvider";

type PropsType = {
	item: CartItemType;
	dispatch: React.Dispatch<ReducerAction>;
	REDUCER_ACTION_TYPE: typeof REDUCER_ACTION_TYPE;
};

const CartItemComp = ({ item, dispatch, REDUCER_ACTION_TYPE }: PropsType) => {
	const img = new URL(`../assets/${item.sku}.jpg`, import.meta.url).href;
	const lineTotal = item.qty * item.price;
	const optionValeus = [...new Array(20 > item.qty ? 20 : item.qty).keys()].map(
		(i) => i + 1
	);
	const options = optionValeus.map((option) => (
		<option key={option}>{option}</option>
	));

	const handleQtyChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const qty = Number(e.target.value);
		dispatch({ type: REDUCER_ACTION_TYPE.QUANTITY, payload: { ...item, qty } });
	};

	const onRemoveFromCart = () => {
		dispatch({ type: REDUCER_ACTION_TYPE.REMOVE, payload: item });
	};

	return (
		<li className="cart__item">
			<img src={img} alt={item.name} className="cart__img" />
			<div aria-label="Item Name">{item.name}</div>
			<div aria-label="Price Per Item">
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(item.price)}
			</div>

			<label htmlFor="itemQty" className="offscreen">
				Item Quantity
			</label>
			<select
				name="itemQty"
				id="itemQty"
				className="cart__select"
				value={item.qty}
				aria-label="Item Quantity"
				onChange={handleQtyChange}
			>
				{options}
			</select>

			<div className="cart__item-subtotal" aria-label="Line Item Subtotal">
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(lineTotal)}
			</div>

			<button
				className="cart__button"
				aria-label="Remove Item From Cart"
				title="Remove Item From Cart"
				onClick={onRemoveFromCart}
			>
				❌
			</button>
		</li>
	);
};

export default CartItemComp;
