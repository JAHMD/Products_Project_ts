/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useReducer } from "react";

type PropsType = {
	children: ReactNode;
};

export type CartItemType = {
	name: string;
	sku: string;
	price: number;
	qty: number;
};

type CartStateType = {
	cart: CartItemType[];
};

export type RActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
	type: REDUCER_ACTION_TYPE;
	payload?: CartItemType;
};

const inintContextState: CartStateType = { cart: [] };

export enum REDUCER_ACTION_TYPE {
	ADD,
	REMOVE,
	QUANTITY,
	SUBMIT,
}

const reducer = (
	state: CartStateType,
	action: ReducerAction
): CartStateType => {
	switch (action.type) {
		case REDUCER_ACTION_TYPE.ADD: {
			if (!action.payload) throw new Error("There is no action payload");

			const item: CartItemType = action.payload;
			const filteredCart: CartItemType[] = state.cart.filter(
				(cart) => cart.sku !== item?.sku
			);
			const isItemExists: CartItemType | undefined = state.cart.find(
				(cartItem) => cartItem.sku === item?.sku
			);
			const qty = isItemExists ? item.qty + 1 : 1;
			return { ...state, cart: [...filteredCart, { ...item, qty }] };
		}

		case REDUCER_ACTION_TYPE.REMOVE: {
			if (!action.payload) throw new Error("There is no action payload");

			const item: CartItemType = action.payload;
			const filteredCart: CartItemType[] = state.cart.filter(
				(cartItem) => cartItem.sku !== item?.sku
			);
			return { ...state, cart: [...filteredCart] };
		}

		case REDUCER_ACTION_TYPE.QUANTITY: {
			if (!action.payload) throw new Error("There is no action payload");

			const { sku, qty } = action.payload;
			const itemExists: CartItemType | undefined = state.cart.find(
				(item) => item.sku === sku
			);

			if (!itemExists) {
				throw new Error("Item must exist in order to update quantity");
			}

			const updatedItem: CartItemType = { ...itemExists, qty };
			const filteredCart: CartItemType[] = state.cart.filter(
				(item) => item.sku !== sku
			);
			return { ...state, cart: [...filteredCart, updatedItem] };
		}

		case REDUCER_ACTION_TYPE.SUBMIT: {
			return { ...state, cart: [] };
		}

		default:
			throw new Error("Unknown action type");
	}
};

const useCartContext = (inintContextState: CartStateType) => {
	const [state, dispatch] = useReducer(reducer, inintContextState);

	const totalItems = state.cart.reduce((acc, item) => acc + item.qty, 0);

	const totalPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(state.cart.reduce((acc, item) => acc + item.qty * item.price, 0));

	return {
		dispatch,
		totalPrice,
		totalItems,
		cart: state.cart,
		REDUCER_ACTION_TYPE,
	};
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContext: UseCartContextType = {
	dispatch: () => {},
	totalPrice: "0",
	totalItems: 0,
	cart: [],
	REDUCER_ACTION_TYPE,
};

export const CartContext = createContext<UseCartContextType>(initCartContext);

export const CartProvider = ({ children }: PropsType) => {
	const value = useCartContext(inintContextState);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
