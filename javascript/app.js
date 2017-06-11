const app = {
	init(backgroundArray, selectors, transitionInfo) {
		this.backgrounds = backgroundArray;
		this.fadeOutDiv = $(selectors.fadeOutSelector);
		this.fadeInDiv = $(selectors.fadeInSelector);
		this.index = 0;
		this.fadeLength = transitionInfo.fadeLength;
		this.pause = transitionInfo.pause;

		// Sets initial linear gradient based on current time
		this.setHourBackground();
		// Sets initial linear gradient to the first gradient in backgrounds
		//this.setGeneralBackground();

		this.setParticleVisibility();
		this.transitionGradients();
		setInterval(this.transitionGradients.bind(this), this.fadeLength + this.pause);
	},

	setHourBackground() {
		const hour = (new Date()).getHours();
		this.index = hour + 1;

		this.fadeOutDiv.css('background', this.backgrounds[hour]);
		if (hour === this.backgrounds.length - 1) {
			this.fadeInDiv.css('background', this.backgrounds[0]);
		} else {
			this.fadeInDiv.css('background', this.backgrounds[hour + 1]);
		}
	},

	setGeneralBackground() {
		this.fadeOutDiv.css('background', this.backgrounds[0]);
		this.fadeInDiv.css('background', this.backgrounds[1]);
	},

	transitionGradients() {
		console.log(this.index);

		let oldBG = this.fadeOutDiv.css('background');
		let newBG = this.fadeInDiv.css('background');

		this.fadeOutDiv.fadeOut(this.fadeLength, () => {
			this.fadeOutDiv.css('background', this.backgrounds[this.index]);
      this.fadeOutDiv.css('display', 'block');
			this.fadeOutDiv.css('opacity', '1');

			if (this.index + 1 === this.backgrounds.length) {
				this.fadeInDiv.css('background', this.backgrounds[0]);
			} else {
				this.fadeInDiv.css('background', this.backgrounds[this.index + 1]);
			}

			this.index++;
			if (this.index >= this.backgrounds.length) {
				this.index = 0;
			}
		});
		this.fadeParticles();
	},

	setParticleVisibility() {
		if (this.index - 1 > 6 && this.index - 1 < 22) {
			$('#particles-js').hide();
		}
	},

	fadeParticles() {
		if (this.index > 5 && this.index < 22) {
			$('#particles-js').fadeOut(this.fadeLength / 2);
		} else {
			$('#particles-js').fadeIn(this.fadeLength / 2);
		}
	},
}

const backgrounds = ["#00000c",
	"linear-gradient(to bottom, #020111 85%,#191621 100%)",
	"linear-gradient(to bottom, #020111 85%,#191621 100%)",
	"linear-gradient(to bottom, #020111 85%,#191621 100%)",
	"linear-gradient(to bottom, #020111 60%,#20202c 100%)",
	"linear-gradient(to bottom, #020111 60%,#20202c 100%)",
	"linear-gradient(to bottom, #020111 10%,#3a3a52 100%)",
	"linear-gradient(to bottom, #20202c 0%,#515175 100%)",
	"linear-gradient(to bottom, #40405c 0%,#6f71aa 80%,#8a76ab 100%)",
	"linear-gradient(to bottom, #4a4969 0%,#7072ab 50%,#cd82a0 100%)",
	"linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)",
	"linear-gradient(to bottom, #82addb 0%,#ebb2b1 100%)",
	"linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)",
	"linear-gradient(to bottom, #b7eaff 0%,#94dfff 100%)",
	"linear-gradient(to bottom, #9be2fe 0%,#67d1fb 100%)",
	"linear-gradient(to bottom, #90dffe 0%,#38a3d1 100%)",
	"linear-gradient(to bottom, #57c1eb 0%,#246fa8 100%)",
	"linear-gradient(to bottom, #2473ab 0%,#1e528e 70%,#5b7983 100%)",
	"linear-gradient(to bottom, #1e528e 0%,#728a7c 50%,#e9ce5d 100%)",
	"linear-gradient(to bottom, #154277 0%,#576e71 30%,#e1c45e 70%,#b26339 100%)",
	"linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%)",
	"linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%)",
	"linear-gradient(to bottom, #090401 50%,#4B1D06 100%)",
	"linear-gradient(to bottom, #00000c 80%,#150800 100%)"];
const selectors = {
	fadeOutSelector: '#fade-out',
	fadeInSelector: '#fade-in',
}
const transitionInfo = {
	fadeLength: 5000,
	pause: 50,
}

app.init(backgrounds, selectors, transitionInfo);

particlesJS.load('particles-js', 'javascript/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});