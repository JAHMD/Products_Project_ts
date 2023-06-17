import useCart from "../hooks/useCart";

type PropsType = {
	viewCart: boolean;
	setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
	const { totalItems, totalPrice } = useCart();

	const handleClick = () => {
		setViewCart((oldState) => !oldState);
	};

	return (
		<header className="header">
			<div className="header__title-bar">
				<h1>Acme Co.</h1>
				<div className="header__price-box">
					<p>Total Items: {totalItems}</p>
					<p>Total Price: {totalPrice}</p>
				</div>
			</div>
			<nav className="nav">
				<button onClick={handleClick}>
					{viewCart ? "Close Cart" : "View Cart"}
				</button>
			</nav>
		</header>
	);
};

export default Header;
