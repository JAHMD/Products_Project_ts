import { useState } from "react";
import useCart from "../hooks/useCart";
import CartItemComp from "./CartItemComp";

const Cart = () => {
	const [confirm, setConfirm] = useState<boolean>(false);
	const { totalItems, totalPrice, cart, dispatch, REDUCER_ACTION_TYPE } =
		useCart();
	const cartElements = cart.map((item) => {
		return (
			<CartItemComp
				key={item.sku}
				item={item}
				dispatch={dispatch}
				REDUCER_ACTION_TYPE={REDUCER_ACTION_TYPE}
			/>
		);
	});

	const handleSubmit = () => {
		dispatch({ type: REDUCER_ACTION_TYPE.SUBMIT });
		setConfirm(true);
	};

	return (
		<div className="cart">
			{confirm ? (
				<h2>Thaks for your order.</h2>
			) : (
				<>
					<ul className="cart_list">{cartElements}</ul>
				</>
			)}
			<div className="cart__totals">
				<p>Total Items: {totalItems}</p>
				<p>Total Price: {totalPrice}</p>
				<button
					className="cart__submit"
					disabled={!totalItems}
					onClick={handleSubmit}
				>
					Place Order
				</button>
			</div>
		</div>
	);
};

export default Cart;
