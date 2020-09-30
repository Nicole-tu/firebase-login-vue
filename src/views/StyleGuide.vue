<template>
  <section class="is-fullheight">
    <nav-bar />
    <div class="hero-body main-content">
      <div class="box container">
        <div class="tabs is-boxed">
          <ul>
            <li v-for="(t,i) in tabComponents" :key="i" :class="{'is-active':currentTab === t.id}">
              <a @click="changeTab(t.id)">
                <i :class="t.icon" />
                {{ t.name }}
              </a>
            </li>
          </ul>
        </div>
        <div class="tab-contents">
          <div class="tab-content" :class="{'is-active':currentTab === 0}">
            <ul class="color-list mt-6">
              <li class="color-card">
                <div class="card">
                  <div class="card-content" style="background-color:#83888B">
                    <span>#83888B</span>
                  </div>
                  <footer class="card-footer">Background</footer>
                </div>
              </li>
              <li class="color-card">
                <div class="card">
                  <div class="card-content" style="background-color:#A58E80">
                    <span>#A58E80</span>
                  </div>
                  <footer class="card-footer">Body Background</footer>
                </div>
              </li>
            </ul>
            <ul class="color-list mt-5">
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-primary">
                    <span>#174B81</span>
                  </div>
                  <footer class="card-footer">Primary</footer>
                </div>
              </li>
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-link">
                    <span>#263056</span>
                  </div>
                  <footer class="card-footer">Link</footer>
                </div>
              </li>
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-info">
                    <span>#A6B8D0</span>
                  </div>
                  <footer class="card-footer">Info</footer>
                </div>
              </li>
            </ul>
            <ul class="color-list mt-5">
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-dark">
                    <span>#2A2A34</span>
                  </div>
                  <footer class="card-footer">Dark</footer>
                </div>
              </li>
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-grey-dark">
                    <span>#363837</span>
                  </div>
                  <footer class="card-footer">Grey Dark</footer>
                </div>
              </li>
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-grey-light">
                    <span>#A49E9E</span>
                  </div>
                  <footer class="card-footer">Grey Light</footer>
                </div>
              </li>
            </ul>
            <ul class="color-list mt-5">
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-white">
                    <span class="has-text-black">#F0EDE4</span>
                  </div>
                  <footer class="card-footer">White</footer>
                </div>
              </li>
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-danger">
                    <span>#77202F</span>
                  </div>
                  <footer class="card-footer">Danger</footer>
                </div>
              </li>
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-warning">
                    <span>#BA9238</span>
                  </div>
                  <footer class="card-footer">Warning</footer>
                </div>
              </li>
              <li class="color-card">
                <div class="card">
                  <div class="card-content has-background-success">
                    <span>#255958</span>
                  </div>
                  <footer class="card-footer">Success</footer>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-content" :class="{'is-active':currentTab === 1}">
            <h1>H1 Heading</h1>3rem
            <h2>H2 Heading</h2>2.5rem
            <h3>H3 Heading</h3>2rem
            <h4>H4 Heading</h4>1.5rem
            <h5>H5 Heading</h5>1.25rem
            <h6>H6 Heading</h6>1rem
            <div class="is-size-7">H7 Heading</div>0.75rem
          </div>
          <div class="tab-content" :class="{'is-active':currentTab == 2}">
            <h5 class="mb-5"># Default</h5>
            <div class="buttons mb-5">
              <a class="button">Anchor</a>
              <button class="button">Button</button>
              <input class="button" type="submit" value="Submit input" />
              <input class="button" type="reset" value="Reset input" />
            </div>
            <h5 class="mb-5"># Colors</h5>
            <div class="buttons">
              <button class="button is-white">White</button>
              <button class="button is-light">Light</button>
              <button class="button is-dark">Dark</button>
              <button class="button is-black">Black</button>
              <button class="button is-text">Text</button>
            </div>
            <div class="buttons">
              <button class="button is-primary">Primary</button>
              <button class="button is-link">Link</button>
              <button class="button is-info">Info</button>
              <button class="button is-success">Success</button>
              <button class="button is-warning">Warning</button>
              <button class="button is-danger">Danger</button>
            </div>
            <div class="buttons mb-5">
              <button class="button is-primary is-light">Primary</button>
              <button class="button is-link is-light">Link</button>
              <button class="button is-info is-light">Info</button>
              <button class="button is-success is-light">Success</button>
              <button class="button is-warning is-light">Warning</button>
              <button class="button is-danger is-light">Danger</button>
            </div>
            <h5 class="mb-5"># Styles</h5>
            <div class="buttons mb-5">
              <button class="button is-outlined">Outlined</button>
              <button class="button is-primary is-inverted">Inverted</button>
              <button class="button is-primary is-inverted is-outlined">Invert Outlined</button>
              <button class="button is-rounded">Rounded</button>
            </div>
          </div>
          <div class="tab-content" :class="{'is-active':currentTab == 3}">Components</div>
          <div class="tab-content" :class="{'is-active':currentTab == 4}">Form</div>
          <div class="tab-content" :class="{'is-active':currentTab == 5}">Table</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from '@views/layouts/NavBar';

export default {
  name: 'StyleGuide',
  components: { NavBar },
  data() {
    return {
      currentTab: 0,
      tabComponents: [
        { id: 0, name: 'Color Palette', icon: 'fas fa-palette' },
        { id: 1, name: 'Typography', icon: 'fas fa-i-cursor' },
        { id: 2, name: 'Buttons', icon: 'fas fa-hand-point-up' },
        { id: 3, name: 'Components', icon: 'far fa-object-group' },
        { id: 4, name: 'Form', icon: 'fab fa-wpforms' },
        { id: 5, name: 'Table', icon: 'fas fa-table' }
      ]
    }
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    }
  },
}
</script>
