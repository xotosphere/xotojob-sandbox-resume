const language = "lang"

window.addEventListener("load", () => {
				DATA = {...resumeFR, ...letterFR, ...configFR}
				document.title = `${DATA.config.contact.resumeName}`;
				EventBus = new Vue();
				Resume = new Vue({
					el: '#root',
					methods: { initials: function () { return this.applicant.split(' ')[0][0] + this.applicant.split(' ')[1][0]; } },
					data: () => { return {data: DATA} },
					mounted: function () {
						setColors();
						setTypewriter();
					},
					created() {
						let load_delay = 0;
						setTimeout(() => { document.querySelectorAll('.page').forEach((e) => { e.classList.add('loaded'); }); }, load_delay);
						EventBus.$on('resume-data', (data) => { this.data = data; });
					}
				});

				DropTarget = new Vue({
					el: '#drop-target',
					data: { visible: true, selectedLanguage: language },
					methods: {
						async changeResumeLanguage() {
              if (this.selectedLanguage === 'fr') {
                DATA = {...resumeFR, ...letterFR, ...configFR}
							  EventBus.$emit('resume-data', DATA);
              } else if (this.selectedLanguage === 'en') {
                DATA = {...resumeEN, ...letterEN, ...configEN}
							  EventBus.$emit('resume-data', DATA);
              }
             document.querySelector('#drop-target').style.display = 'none';
             document.querySelector('#root').style.filter = 'blur(0px)';
						}
					},
      });
  });

