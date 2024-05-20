function setColors() {
	let colors_light = ["rgba(0,113,156, 0.25)","rgba(0,44,162, 0.2)"];
	let colors_main = ["rgba(0,113,156, 0.7)","rgba(0,44,162, 0.6)"];
	
	const number = Math.floor(Math.random() * colors_main.length);
	function getColor_light(number) { return colors_light[number]; }
	function getColor_main(number) { return colors_main[number]; }
	document.documentElement.style.setProperty('--main-color-lighter', getColor_light(number));
	document.documentElement.style.setProperty('--main-color', getColor_main(number));
}

function setTypewriter() {
	let typewriter_delay = 700;
	let dataText = DATA.config.contact.scroll;
	let typewriter_element = document.getElementById("typewriter");
	typewriter_element.style.opacity = 1;
	setTimeout(() => {

		function typeWriter(text, i, fnCallback) {
			if (i < text.length) {
				typewriter_element.innerHTML = `${text.substring(0, i + 1)}<span class="cursor-c"> |</span>`;
				setTimeout(() => { typeWriter(text, i + 1, fnCallback); }, 100);
			} else if (typeof fnCallback == 'function') {
				setTimeout(fnCallback, 700);
			}
		}

		function StartTextAnimation(i) {
			if (typeof dataText[i] == 'undefined') {
				setTimeout(() => { StartTextAnimation(0); }, 20000);
			} else {
				if (i < dataText[i].length) typeWriter(dataText[i], 0, () => StartTextAnimation(i + 1));
			}
		}
		StartTextAnimation(0);
	}, typewriter_delay);
}
