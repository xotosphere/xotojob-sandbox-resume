/*** PAGE-BREAK */

Vue.component("page-break", {template: "<div class='page-break'></div>"});

/*** PAGE */

Vue.component("page", {template: "<div class='page'><slot></slot></div>"});

/*** CV-CONTENT */

Vue.component("cv-content", {template: "<div :class='{grid:true}'><slot></slot></div>"});

/*** SIMPLE-SECTION */

Vue.component("simple-section", {props: ["title"], template: `<div class="section"><h2 class="header float-in-up">{{title}}</h2><slot></slot></div>`});

/*** COLUMN */

Vue.component("column", { props: ["width"], template: '<div class="column" :style=\'{ flexBasis: width + "%" }\'><slot></slot></div>' });

/*** DROP-TARGET */

Vue.component("drop-target", { props: ["visible"], template: '<div v-if="visible" class="drop-target">FullStack Software Engineer</div>' });

/*** WAVE-FOOTER */

Vue.component("page-footer", { template: ` <div class="page-footer"> <slot></slot></div>`});

/*** EXPERIENCES */

Vue.component("experience-section", {
  props: ["data", "expand", "more"],
  template: `
	<div class='section'>
		<h2 class="header float-in-up">Experience&nbsp;
			<span><div id="typewriter" ><span class="cursor-c"> |</span></div>
			</span>
		</h2>
		<span class="sub-section expand" @click="toggleOpen()">{{more}}
		<span v-if="expand">▶️</span><span v-else>🔽</span></span>
		<div v-for='job in data' class='sub-section'>
			<h3 class="header">{{job.title}}</h3>
			<p class="sub-header">
			<p>@</span>{{job.company}} &middot; {{job.location}} &middot; {{job.from}} - {{job.to}}</p>
			<p class="sub-header">⚡️ {{job.description}}</p>
			<p class="sub-header">⚡️ {{job.summary}}</p>
			<ul class="sub-section sub-section-list" v-if="expand" :style='{ height: 2.1 + "rem" }'><li v-for="r in job.results">&nbsp;{{r}}</li></ul>
			<ul class="sub-section sub-section-list" v-if="!expand"><li v-for="r in job.results">&nbsp;{{r}}</li></ul>
			<div class="sub-section"><medium style="display: inline-block" v-if="job.technologies">TECH USED : </medium><small v-for="tech in job.technologies" class="tag">{{tech}}</small>
			</div>
		</div>
	</div>`,

  methods: {
    toggleOpen: function () {
      this.expand = !this.expand;
    },
  },
});

/*** PROJECTS */

Vue.component("project-section", {
  props: ["data", "title"],
  template: `
	<div class='section'>
		<h2 class="header float-in-up">{{title}}</h2>
		<div v-for='project in data' class='sub-section'>
			<h3 class="header"><a class="no-decorate" :href="project.url">{{project.title}} &middot; {{project.category}}</a></h3>
			<p class="sub-header">⚡️ {{project.description}}</p>
			<div class="sub-section"><h4 class="sub-header">KEY FEATURES</h4><ul class="results-list"><li v-for="r in project.features"><span>{{r}}</span></li></ul></div>
			<div class="sub-section"><medium style="display: inline-block" v-if="project.technologies">TECH USED : </medium><small v-for="tech in project.technologies" class="tag">{{tech}}</small></div>
		</div>
	</div>`,
});

/*** EDUCATIONS */

Vue.component("education-section", {
  props: ["data", "title"],
  template: `
	<div class='section'>
		<h2 class="header float-in-up">{{title}}</h2>
		<div v-for='degree in data' class='sub-section'>
			<h3 class="header">{{degree.type}} · {{degree.subject}}</h3>
			<span class="sub-header"><span >@</span>{{degree.school}} &middot; {{degree.location}} &middot; {{degree.date}}</span>
			<p class="sub-header">⚡️ {{degree.summary}}</p>
			<div class="sub-section"><ul class="results-inline"><li v-for="r in degree.modules" >{{r}}</li></ul></div>
		</div>
	</div>`,
});

/*** SKILLS */

Vue.component("skill-section", {
  props: ["data", "title"],
  template: `
    <div class='section'>
			<h2 class="header float-in-up">{{title}} </h2>
			<div class="sub-section" v-for="skills in data" :key="skills">
				<h3 class="header">{{skills.title}}<span v-if="skills.level" class="proficiency-level animated-underline"><span class="proficiency-bar" :style="{width:(skills.level*20)+'%'}"></span></span></h3>
				<p class="sub-header">{{skills.description}}</p>
			</div>
    </div>`,

  computed: {
    skillsHaveExperience: function () {
      if (this.data) {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].value) {
            return true;
          }
        }
      }
      return false;
    },
  },
});

/*** CIRCLE-CALLOUT */

Vue.component("circle-callout", {
  props: { size: Number, info: Boolean, open: Boolean, },
  template: `
    <div @click="toggleOpen()" :class="{circle:true, open:open, openable:!!true}" :style="{ height:size + 'px', width:(size) + 'px', fontSize: (size/25) + 'em'}">
    	<div><slot></slot></div>
			<div class="circle-icon-info">{{info.appVersion}}</div>
    </div>`,

  methods: {
    toggleOpen: function () {
      if (!this.info) return;
      this.open = !this.open;
    },
  },
});

/*** CIRCLE-MENU */

Vue.component("circle-menu", { props: { size: Number, info: Object, },
  template: `
	<div @click="toggleOpen()" :class="{circle:true, open:open, openable:true}" :style="{height:size + 'px', width:size + 'px', fontSize: (size/25) + 'em'}">
		<div v-if="!open"><slot></slot></div>
		<div v-if="open" title="Close" >
			<img class="entity-yeti-circle" autoplay loop muted playsinline src='./img/entity/entity-yeti-hello.gif'>
		</div>
		<div v-if="open" class="circle-icon-info">
			<h5>CV Version</h5>
			<h5>{{info.version}} 🎉</h5>
		</div>
	</div>`,

  data: function () {
    return { open: false, clicks: 0, decrementInterval: null, };
  },

  methods: {
    toggleOpen: function () {
      if (!this.info) return;
      if (this.open) {
        this.open = false;
      } else {
        this.clicks++;
        if (this.clicks >= 1) {
          this.open = true;
        } else {
          if (this.decrementInterval) clearInterval(this.decrementInterval);
          this.decrementInterval = setTimeout(() => this.clicks = 0, 1000);
        }
      }
    },
  },
});

Vue.component("letter-content", { template: "<div :class='{grid:true}'><slot></slot></div>", });

Vue.component("letter-section", { props: ["letter"], template: ` <div class="section"> <div class="sub-section"><slot></div> </div> `, });

Vue.component("candid-section", { props: ["letter"], template: `<div class="section"><h2 class="header">{{letter.candidature}}</h2></div>`, });

Vue.component("contact-section", {
  props: ["config"],
  template: `
	<div class="section">
		<h1>{{config.contact.role}}</h1>
		<h1>{{config.contact.applicant}}</h1>
		<h1>{{config.contact.phone}}</h1>
	</div>
  `,
});

Vue.component("fairwell-section", {
  props: ["letter"],
  template: `<div class="section"><p class="sub-header">{{letter.letterFairwell}}</p><slot></div>`,
});

Vue.component("social-section", {
  props: ["letter"],
  template: `
	<div class="section">
		<div class="social">
			<a :href="letter.phone">{{letter.phone.prefix}} {{letter.phone}}<img src="./img/social/social-phone-icon.png"/></a>
			<a :href="'https://'+letter.urls.github">{{letter.username}}github.com<img src="./img/social/social-github-icon.png"/></a>
			<a :href="'mailto:'+letter.email">{{letter.username}}@gmail.com <img src="./img/social/social-email-icon.png"/></a>
		</div>
	</div>
  `,
});
