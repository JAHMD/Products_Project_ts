import { useState } from "react";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductsList from "./components/ProductsList";

const App = () => {
	const [viewCart, setViewCart] = useState<boolean>(false);

	return (
		<>
			<Header viewCart={viewCart} setViewCart={setViewCart} />
			<main>{viewCart ? <Cart /> : <ProductsList />}</main>
			<Footer />
		</>
	);
};

export default App;
