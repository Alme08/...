'use client';

import { createDynamicTrackingState } from 'next/dist/server/app-render/dynamic-rendering';
import styles from './page.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
	const [cipher, setCipher] = useState(
		'Boé rs iiqsvr, t gódh incki ah eswykbelb pszmcian vvttogmif iawu iyqccoij za úozcj ulx uog fiahs gowioy xrlwhdfrr yijwm wix br vosigí. Wié pm duwfqske, t tfk yaé gx avxnyy guaz grcwfef vnovv nv gqtvgblfxs e iy gnr sqamthvhf wm ywemavit, wssc dc cuvwqsr vdzzk g sckqe t lf pif. Efé yf qmsdfitz, c ghz wié lm fbesni icxi fi hipjvrv wvgbofmm fbn yiggfey, rxhsdjdeixrglu sg uv iehbs ysymncaczfj dz xvfxkftbhkax xiyqzhbcarmt. Huzvvkbk, gx avxnyy guaz mv pmrufia cetxz ioli rg tzm qgbzm, qekodnrr zp reug hífqqt qzy xkbri l qms ef rrhi jhtg dhzdne qy gubdorls gmcvr lyv xfogmmf.'
	);
	const [key1, setKey1] = useState('');
	const [key2, setKey2] = useState('');
	const [key3, setKey3] = useState('');
	const [key4, setKey4] = useState('');
	const [key5, setKey5] = useState('');

	const fullKey = `${key1.trim()}${key2.trim()}${key3.trim()}${key4.trim()}${key5.trim()}`;

	function isUpperCase(letter) {
		var l = letter.charCodeAt();
		if (l > 64 && l < 91) {
			return true;
		} else {
			return false;
		}
	}

	function isLowerCase(letter) {
		let l = letter.charCodeAt();
		if (l > 96 && l < 123) {
			return true;
		} else {
			return false;
		}
	}

	function isLetter(letter) {
		if (isLowerCase(letter) || isUpperCase(letter)) {
			return true;
		} else {
			return false;
		}
	}

	function mod(n, m) {
		return ((n % m) + m) % m;
	}

	// Ejecutar el descifrado cada vez que se actualice la fullKey
	useEffect(() => {
		let original =
			'Qué es querer, y cómo ahora no encuentro palabras realistas para escribir lo único que mis manos buscan deletrear desde que te conocí. Qué es quererte, y por qué se siente como mecerse entre un acantilado y un mar acolchado de silencio, como si pudiera vivir y morir a la vez. Qué es quererte, y por qué se siente como si pudiera sentirte sin tocarte, experimentando en mi pecho sensaciones de temperaturas desconocidas. Quererte, se siente como si pudiera hacer casa en tus manos, desarmar el alma tímida que tengo y que se arme sola porque le consuela saber que existes.';
		let text =
			'Boé rs iiqsvr, t gódh incki ah eswykbelb pszmcian vvttogmif iawu iyqccoij za úozcj ulx uog fiahs gowioy xrlwhdfrr yijwm wix br vosigí. Wié pm duwfqske, t tfk yaé gx avxnyy guaz grcwfef vnovv nv gqtvgblfxs e iy gnr sqamthvhf wm ywemavit, wssc dc cuvwqsr vdzzk g sckqe t lf pif. Efé yf qmsdfitz, c ghz wié lm fbesni icxi fi hipjvrv wvgbofmm fbn yiggfey, rxhsdjdeixrglu sg uv iehbs ysymncaczfj dz xvfxkftbhkax xiyqzhbcarmt. Huzvvkbk, gx avxnyy guaz mv pmrufia cetxz ioli rg tzm qgbzm, qekodnrr zp reug hífqqt qzy xkbri l qms ef rrhi jhtg dhzdne qy gubdorls gmcvr lyv xfogmmf.';

		function encrypt(plaintext, key) {
			let encrypted = '';
			let j = 0;
			for (let i = 0; i < plaintext.length; i++) {
				let currentLetter = plaintext[i];
				const A = 65;
				const a = 97;

				if (isUpperCase(currentLetter)) {
					let Pi = currentLetter.charCodeAt(0) - A;
					let Ki = key[j % key.length].toUpperCase().charCodeAt() - A;
					let upperLetter = mod(Pi + Ki, 26);

					encrypted += String.fromCharCode(upperLetter + A);

					j++;
				} else if (isLowerCase(currentLetter)) {
					let Pi = currentLetter.charCodeAt() - a;
					let Ki = key[j % key.length].toLowerCase().charCodeAt() - a;
					let lowerLetter = mod(Pi + Ki, 26);

					encrypted += String.fromCharCode(lowerLetter + a);

					j++;
				} else {
					encrypted += currentLetter;
				}
			}
			return encrypted;
		}

		function decrypt(enc, key) {
			let decrypted = '';
			let j = 0;
			for (let i = 0; i < enc.length; i++) {
				let currentLetter = enc[i];
				const A = 65;
				const a = 97;

				if (isUpperCase(currentLetter)) {
					let Ci = currentLetter.charCodeAt(0) - A;
					let Ki = key[j % key.length].toUpperCase().charCodeAt() - A;
					let upperLetter = mod(Ci - Ki, 26);

					decrypted += String.fromCharCode(upperLetter + A);

					j++;
				} else if (isLowerCase(currentLetter)) {
					let Ci = currentLetter.charCodeAt(0) - a;
					let Ki = key[j % key.length].toLowerCase().charCodeAt() - a;
					let lowerLetter = mod(Ci - Ki, 26);

					decrypted += String.fromCharCode(lowerLetter + a);

					j++;
				} else {
					decrypted += currentLetter;
				}
			}
			return decrypted;
		}

		if (fullKey.length > 0) {
			setCipher(decrypt(text, fullKey));
		}
		if (fullKey.length === 0) {
			setCipher(text);
		}
	}, [fullKey]);

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.container}>
					<p className={styles.text}>{cipher}</p>
				</div>
				<form className={styles.formContainer}>
					<input
						className={`${styles.input} ${
							key1.toUpperCase().trim() == 'LUNA'
								? styles.right
								: key1.toUpperCase() == ''
								? ''
								: styles.wrong
						}`}
						type='text'
						value={key1.toUpperCase()}
						onChange={e => {
							setKey1(e.target.value);
						}}
					/>
					<p>-</p>
					<input
						className={`${styles.input} ${
							key2.toUpperCase().trim() == 'SOMBRA'
								? styles.right
								: key2.toUpperCase() == ''
								? ''
								: styles.wrong
						}`}
						type='text'
						value={key2.toUpperCase()}
						onChange={e => {
							setKey2(e.target.value);
						}}
					/>
					<p>-</p>
					<input
						className={`${styles.input} ${
							key3.toUpperCase().trim() == 'VERTIGO'
								? styles.right
								: key3.toUpperCase() == ''
								? ''
								: styles.wrong
						}`}
						type='text'
						value={key3.toUpperCase()}
						onChange={e => {
							setKey3(e.target.value);
						}}
					/>
					<p>-</p>
					<input
						className={`${styles.input} ${
							key4.toUpperCase().trim() == 'TINTA'
								? styles.right
								: key4.toUpperCase() == ''
								? ''
								: styles.wrong
						}`}
						type='text'
						value={key4.toUpperCase()}
						onChange={e => {
							setKey4(e.target.value);
						}}
					/>
					<p>-</p>
					<input
						className={`${styles.input} ${
							key5.toUpperCase().trim() == 'FUEGO'
								? styles.right
								: key5.toUpperCase() == ''
								? ''
								: styles.wrong
						}`}
						type='text'
						value={key5.toUpperCase()}
						onChange={e => {
							setKey5(e.target.value);
						}}
					/>
				</form>
			</main>
		</div>
	);
}

