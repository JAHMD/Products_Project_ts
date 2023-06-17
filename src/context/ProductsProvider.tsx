import { ReactElement, createContext, useEffect, useState } from "react";

type ProductsProviderProps = {
	children?: ReactElement | ReactElement[];
};

export type ProductType = {
	name: string;
	sku: string;
	price: number;
};

export type ProductsStateType = { products: ProductType[] };

const initContextState: ProductsStateType = { products: [] };

export const ProductsContext =
	createContext<ProductsStateType>(initContextState);

const ProductsProvider = ({ children }: ProductsProviderProps) => {
	const [products, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		fetch("../../data/products.json")
			.then((res) => res.json())
			.then(({ products }) => setProducts(products))
			.catch((err) => {
				if (err instanceof Error) console.log(err.message);
			});
	}, []);

	return (
		<ProductsContext.Provider value={{ products }}>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsProvider;
