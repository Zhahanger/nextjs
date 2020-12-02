import React, { useState } from 'react';
import styled from 'styled-components';
// import ChevronIcon from 'components/icons/chevron';

import { Field, Form, Formik, FormikProps } from 'formik';

const CalculatorWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	h2,
	h3 {
		text-align: center;
		margin-bottom: 1.5rem;
	}
	h3 {
		margin-bottom: 1rem;
	}
`;

const CalculateWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 2rem;
`;

const OffersWrapper = styled.div``;

const BlockWithRange = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: rgb(239, 242, 246);
	border-radius: 0.5rem;
	padding: 1.5rem 1.5rem;

	input {
		font-weight: 500;
	}
	input[type='text'] {
		background-color: transparent;
		font-size: 1.5rem;
		border: none;
		padding: 0.3rem 0;
	}
	&:first-child > input[type='text'] {
		margin-left: 1.3rem;
	}
	&:nth-of-type(1) > input:nth-of-type(1)::before {
		content: '₽';
	}
	input[type='text']:focus,
	input[type='text']:active {
		border: none;
		outline: none;
	}
	input[type='range'] {
		position: absolute;
		bottom: -1.05rem;
		left: 4%;
		background-color: transparent;
		width: 92%;
		padding: 5px 0 5px 0;
		overflow: hidden;
		margin: 0;
		transform-style: preserve-3d;
	}
	input[type='range']:focus {
		outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
	}
	input[type='range']::-webkit-slider-runnable-track {
		height: 0.12rem;
		background: rgb(251, 219, 84);
		border: none;
		border-radius: 3px;
	}
	input[type='range']::-moz-range-track {
		height: 0.12rem;
		background: rgb(251, 219, 84);
		border: none;
		border-radius: 3px;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: none;
		height: 1.5em;
		width: 1.5em;
		border-radius: 50%;
		border: 1px solid #ccc;
		background: #fff;
		margin-top: -0.7rem;
	}
	input[type='range']::-moz-range-thumb {
		border: none;
		height: 1.5rem;
		width: 1.5rem;
		border-radius: 50%;
		border: 1px solid #ccc;
		background: #fff;
		margin-top: -0.7rem;
		cursor: pointer;
	}
	&:first-child::after {
		content: 'от 10% до 90%';
		position: absolute;
		font-size: 0.8rem;
		opacity: 0.7;
		bottom: -2rem;
		left: 0.3rem;
	}
	&:last-child::after {
		content: 'от 1 до 5 лет';
		position: absolute;
		font-size: 0.8rem;
		opacity: 0.7;
		bottom: -2rem;
		left: 0.3rem;
	}
	b {
		position: absolute;
		top: 3.194rem;
		font-size: 1.5rem;
	}
`;

const bankInfo = [
	{
		name: 'Русфинанс Банк',
		description: 'БУ Gold для дорогих авто(СЖ 2,5)',
		rate: 10.9,
	},
	{
		name: 'Русфинанс Банк',
		description: 'БУ Gold для дорогих авто без КАСКО (СЖ 2,5)',
		rate: 11.4,
	},
	{
		name: 'Русфинанс Банк',
		description: 'БУ Gold для дорогих авто без КАСКО',
		rate: 10.3,
	},
	{
		name: 'Русфинанс Банк',
		description: 'БУ Gold+ для дорогих (СЖ 2,5)',
		rate: 12.4,
	},
];

const BankOffersContainer = styled.div`
	opacity: ${({ blur }) => (blur ? '0.3' : '1')};
	& > span {
		position: relative;
		text-align: center;
		svg {
			position: absolute;
			top: 0.35rem;
			transform: ${({ open }) =>
				open
					? 'rotate(-90deg) translateY(0.3em) translateX(0.1em)'
					: 'rotate(90deg) translateY(-0.3em) translateX(-0.1em)'};
			/* transform: rotate(90deg) translateY(-0.3em) translateX(-0.1em); */
			width: 0.7em;
			transition: all 0.3s ease;
		}
	}
	transition: all 0.3s ease;
	margin: 3rem 0;
	display: grid;
	grid-template-rows: repeat(1fr);
	grid-gap: 1rem;

	.bold-text {
		font-size: 1.5rem;
		font-weight: 600;
		padding-bottom: 1rem;
	}
	small {
		padding-top: 1rem;
	}
`;

const BankItem = styled.div`
	display: grid;
	display: ${({ show }) => (show ? 'grid' : 'none')};
	&:nth-of-type(1) {
		display: grid;
	}
	grid-template-columns: 1.5fr 1fr 1fr;
	grid-gap: 10rem;
	background: rgb(239, 242, 246);
	padding: 2rem 1.4rem 2rem 1.4rem;
`;

const BankInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const Text = styled.span`
	font-size: ${({ bold }) => (bold ? '1.5rem' : '1')};
	font-weight: ${({ bold }) => (bold ? '600' : 'normal')};
	padding-bottom: ${({ bold }) => (bold ? '1rem' : 'auto')};
	${({ bold }) => (bold ? '1rem' : 'auto')};
	cursor: ${({ toggle }) => (toggle ? 'pointer' : 'auto')};
`;

const Icon = ({ ...props }) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 492 492' {...props}>
		<path d='M382.7 226.8l-219-219c-5-5-11.8-7.8-19-7.8s-14 2.8-19 7.9l-16.2 16a27 27 0 0 0 0 38.1L293.4 246l-184 184a26.8 26.8 0 0 0 0 38l16 16.2a26.9 26.9 0 0 0 38 0L382.8 265c5-5 7.8-11.9 7.8-19 0-7.3-2.7-14.1-7.8-19.2z' />
	</svg>
);

const numberFormat = (num) => {
	num = num.toString();
	num = num.replace(/\s/g, '');
	if (typeof num !== 'string') {
		return numberFormat(num.toString());
	} else {
		if (num.length < 4) {
			return num;
		} else {
			return (
				numberFormat(num.slice(0, num.length - 3)) +
				' ' +
				num.slice(num.length - 3)
			);
		}
	}
};

const calculate = (num, rate, term) => {
	rate = rate / 100 / 12;
	let result = (num * rate) / (1 - Math.pow(1 + rate, -term));
	return Math.round(result);
};

const priceFormat = (price) =>
	new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
// Reverse array
export const reverseArr = (input) => {
	var ret = [];
	for (let i = input.length - 1; i >= 0; i--) {
		ret.push(input[i]);
	}
	return ret;
};

const BankInfoComponent = (props) => {
	let [showAllItems, toggleAllItems] = useState(false);
	return (
		<BankOffersContainer blur={props.blur} open={showAllItems}>
			<h3>Мы подобрали самые выгодные предложения для вас</h3>
			{bankInfo.map(({ name, description, rate }) => {
				return (
					<BankItem key={description} show={showAllItems}>
						<BankInfo>
							<Text bold>{name}</Text>
							<Text>{description}</Text>
							<small>
								{priceFormat(
									calculate(props.amount, rate, props.term * 12) *
										props.term *
										12
								)}
							</small>
						</BankInfo>
						<BankInfo className='credit-sum-wrapper'>
							<Text bold>
								{priceFormat(calculate(props.amount, rate, props.term * 12))}
							</Text>
							<Text>в месяц</Text>
						</BankInfo>
						<BankInfo className='credit-rate-wrapper'>
							<Text bold>{rate}%</Text>
							<Text>ставка</Text>
						</BankInfo>
					</BankItem>
				);
			})}
			<Text
				toggle
				onClick={(e) => {
					toggleAllItems(!showAllItems);
				}}>
				{showAllItems ? 'Скрыть' : 'Показать ещё банки'}
				<Icon />
			</Text>
		</BankOffersContainer>
	);
};

const Calculator = ({ value }) => {
	let [amountValueText, setAmountValueText] = useState(value * 0.1);
	let [amountValueRange, setAmountValueRange] = useState(value * 0.1);
	let [termValueText, setCreditTerm] = useState(1);
	let [termValueRange, setTermValueRange] = useState(1);
	let [blur, setBlur] = useState(false);
	const price = value;
	return (
		<CalculatorWrapper>
			<h2>Выберите самый удобный кредит</h2>
			<Formik
				initialValues={{}}
				// onSubmit={(values, actions) => {
				// 	setTimeout(() => {
				// 		alert(JSON.stringify(values, null, 2));
				// 		actions.setSubmitting(false);
				// 	}, 1000);
				// }}
			>
				<Form>
					<CalculateWrapper>
						<BlockWithRange>
							<span>Первый платеж </span>
							<Field
								type='text'
								name='amount_value_text'
								value={numberFormat(amountValueText)}
								onChange={(e) =>
									setAmountValueText(
										parseInt(e.currentTarget.value.replace(/[\s₽]/g, '') || 0)
									)
								}
							/>
							{/* <b>₽</b> */}
							<Field
								type='range'
								name='amount_value_range'
								min={`${price * 0.1}`}
								max={`${price * 0.9}`}
								value={`${amountValueRange}`}
								onChange={(e) =>
									setAmountValueRange(
										parseInt(e.currentTarget.value.replace(/\s/g, '') || 0)
									)
								}
								onMouseDown={() => {
									setBlur(true);
									console.log('hi');
								}}
								onMouseUp={() => {
									setAmountValueText(amountValueRange);
									setBlur(false);
									console.log('HIhi');
								}}
							/>
						</BlockWithRange>
						<BlockWithRange>
							<span>Срок кредита</span>
							<Field
								type='text'
								name='term_value_text'
								value={termValueText || 0}
								onChange={(e) =>
									setCreditTerm(
										parseInt(e.currentTarget.value.replace(/\s/g, '') || 0)
									)
								}
							/>
							<Field
								type='range'
								name='term_value_range'
								min='1'
								max='5'
								value={`${termValueRange}`}
								onChange={(e) => setTermValueRange(e.currentTarget.value)}
								onMouseDown={() => {
									setBlur(true);
								}}
								onMouseUp={() => {
									setCreditTerm(termValueRange);
									setBlur(false);
								}}
							/>
						</BlockWithRange>
					</CalculateWrapper>
					<OffersWrapper>
						<BankInfoComponent
							amount={value - amountValueText}
							term={termValueText || 1}
							blur={blur}
						/>
					</OffersWrapper>
				</Form>
			</Formik>
		</CalculatorWrapper>
	);
};
export default Calculator;
