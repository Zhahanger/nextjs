import Head from 'next/head';
import Calculator from './components/calculator';

export default function Home() {
	return (
		<div>
			<Calculator value={20000} />
		</div>
	);
}
