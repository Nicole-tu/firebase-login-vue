<template>
	<section class="is-fullheight">
		<nav-bar />
		<div class="hero-body main-content">
			<div class="box container">
				<div class="tabs is-boxed">
					<ul>
						<li
							v-for="(t,i) in tabComponents"
							:key="i"
							:class="{'is-active':currentTab === t.id}"
						>
							<a @click="changeTab(t.id)">
								<i :class="t.icon" />
								{{ t.name }}
							</a>
						</li>
					</ul>
				</div>
				<div class="tab-contents">
					<div
						class="tab-content"
						:class="{'is-active':currentTab === 0}"
					>
						<ul class="color-list mt-6">
							<li class="color-card">
								<div class="card">
									<div
										class="card-content"
										style="background-color:#83888B"
									>
										<span>#83888B</span>
									</div>
									<footer class="card-footer">Background</footer>
								</div>
							</li>
							<li class="color-card">
								<div class="card">
									<div
										class="card-content"
										style="background-color:#A58E80"
									>
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
									<div
										class="card-content"
										style="background-color:#A58E80"
									>
										<span>#A58E80</span>
									</div>
									<footer class="card-footer">Secondary</footer>
								</div>
							</li>
							<li class="color-card">
								<div class="card">
									<div class="card-content has-background-link">
										<span>#658EC6</span>
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
					<div
						class="tab-content"
						:class="{'is-active':currentTab === 1}"
					>
						<div class="columns">
							<div class="column is-4">
								<div
									class="has-text-centered"
									style="width:150px;margin: auto;margin-top: 3rem;"
								>
									<h1
										class="mb-3"
										style="border-bottom:1px solid #ccc;"
									>Aa</h1>
									<div class="mt-5">
										Nunito Google
									</div>
								</div>
							</div>
							<div class="column is-8">
								<table>
									<tr>
										<td style="height:4rem;width:170px;vertical-align:middle;">H1 3rem</td>
										<td>
											<h1>Heading</h1>
										</td>
									</tr>
									<tr style="height:3.5rem;vertical-align:middle;">
										<td>H2 2.5rem</td>
										<td>
											<h2>Heading</h2>
										</td>
									</tr>
									<tr style="height:3rem;vertical-align:middle;">
										<td>H3 2rem</td>
										<td>
											<h3>Heading</h3>
										</td>
									</tr>
									<tr style="height:2.5rem;vertical-align:middle;">
										<td>H4 1.5rem</td>
										<td>
											<h4>Heading</h4>
										</td>
									</tr>
									<tr style="height:2.25rem;vertical-align:middle;">
										<td>H5 1.25rem</td>
										<td>
											<h5>Heading</h5>
										</td>
									</tr>
									<tr style="height:2rem;vertical-align:middle;">
										<td>H6 1rem</td>
										<td>
											<h6>Heading</h6>
										</td>
									</tr>
									<tr style="height:1.75rem;vertical-align:middle;">
										<td>H7 0.75rem</td>
										<td>
											<div class="is-size-7">Heading</div>
										</td>
									</tr>
									<tr style="height:2rem;vertical-align:middle;">
										<td>Body</td>
										<td>
											Bulma is simply a collection of CSS classes. Write the HTML code you want.
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab == 2}"
					>
						<h4 class="mb-5"># Default</h4>
						<div class="buttons mb-5">
							<a class="button">Anchor</a>
							<button class="button">Button</button>
							<input
								class="button"
								type="submit"
								value="Submit input"
							/>
							<input
								class="button"
								type="reset"
								value="Reset input"
							/>
						</div>
						<h4 class="mb-5"># Colors</h4>
						<h6>Buttons</h6>
						<div class="buttons">
							<button class="button is-white">White</button>
							<button class="button is-light">Light</button>
							<button class="button is-dark">Dark</button>
							<button class="button is-black">Black</button>
							<button class="button is-text">Text</button>
						</div>
						<div class="buttons">
							<button class="button is-primary">Primary</button>
							<button class="button is-secondary">Secondary</button>
							<button class="button is-link">Link</button>
							<button class="button is-info">Info</button>
							<button class="button is-success">Success</button>
							<button class="button is-warning">Warning</button>
							<button class="button is-danger">Danger</button>
						</div>
						<div class="buttons mb-5">
							<button class="button is-primary is-light">Primary</button>
							<button class="button is-secondary is-light">Secondary</button>
							<button class="button is-link is-light">Link</button>
							<button class="button is-info is-light">Info</button>
							<button class="button is-success is-light">Success</button>
							<button class="button is-warning is-light">Warning</button>
							<button class="button is-danger is-light">Danger</button>
						</div>
						<h4 class="mb-5"># Styles</h4>
						<div class="buttons mb-5">
							<button class="button is-outlined">Outlined</button>
							<button class="button is-primary is-inverted">Inverted</button>
							<button class="button is-primary is-inverted is-outlined">Invert Outlined</button>
							<button class="button is-rounded">Rounded</button>
						</div>
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab == 3}"
					>
						<h4 class="mb-5"># Breadcrumb</h4>
						<div class="box mb-5">
							<nav
								class="breadcrumb"
								aria-label="breadcrumbs"
							>
								<ul>
									<li><a href="#">Bulma</a></li>
									<li><a href="#">Documentation</a></li>
									<li><a href="#">Components</a></li>
									<li class="is-active"><a
											href="#"
											aria-current="page"
										>Breadcrumb</a></li>
								</ul>
							</nav>
							<nav
								class="breadcrumb"
								aria-label="breadcrumbs"
							>
								<ul>
									<li>
										<a href="#">
											<span class="icon is-small">
												<i
													class="fas fa-home"
													aria-hidden="true"
												></i>
											</span>
											<span>Bulma</span>
										</a>
									</li>
									<li>
										<a href="#">
											<span class="icon is-small">
												<i
													class="fas fa-book"
													aria-hidden="true"
												></i>
											</span>
											<span>Documentation</span>
										</a>
									</li>
									<li>
										<a href="#">
											<span class="icon is-small">
												<i
													class="fas fa-puzzle-piece"
													aria-hidden="true"
												></i>
											</span>
											<span>Components</span>
										</a>
									</li>
									<li class="is-active">
										<a href="#">
											<span class="icon is-small">
												<i
													class="fas fa-thumbs-up"
													aria-hidden="true"
												></i>
											</span>
											<span>Breadcrumb</span>
										</a>
									</li>
								</ul>
							</nav>
						</div>
						<h4 class="mb-5"># Card</h4>
						<div class="columns">
							<div class="column is-4 mr-3">
								<div class="card">
									<div class="card-image">
										<figure class="image is-4by3">
											<img
												src="https://bulma.io/images/placeholders/1280x960.png"
												alt="Placeholder image"
											>
										</figure>
									</div>
									<div class="card-content">
										<div class="media">
											<div class="media-left">
												<figure class="image is-48x48">
													<img
														src="https://bulma.io/images/placeholders/96x96.png"
														alt="Placeholder image"
													>
												</figure>
											</div>
											<div class="media-content">
												<p class="title is-4">John Smith</p>
												<p class="subtitle is-6">@johnsmith</p>
											</div>
										</div>

										<div class="content">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Phasellus nec iaculis mauris. <a>@bulmaio</a>.
											<a href="#">#css</a> <a href="#">#responsive</a>
											<br>
											<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
										</div>
									</div>
								</div>
							</div>
							<div class="column is-3 mr-3">
								<div class="card">
									<header class="card-header">
										<p class="card-header-title">
											Component
										</p>
										<a
											href="#"
											class="card-header-icon"
											aria-label="more options"
										>
											<span class="icon">
												<i
													class="fas fa-angle-down"
													aria-hidden="true"
												></i>
											</span>
										</a>
									</header>
									<div class="card-content">
										<div class="content">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
											<a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
											<br>
											<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
										</div>
									</div>
									<footer class="card-footer">
										<a
											href="#"
											class="card-footer-item"
										>Save</a>
										<a
											href="#"
											class="card-footer-item"
										>Edit</a>
										<a
											href="#"
											class="card-footer-item"
										>Delete</a>
									</footer>
								</div>
							</div>
							<div class="column is-4">
								<div class="card">
									<div class="card-content">
										<p class="title">
											"There are two hard things in computer science: cache invalidation,
											naming things, and off-by-one errors."
										</p>
										<p class="subtitle">
											Jeff Atwood
										</p>
									</div>
									<footer class="card-footer">
										<p class="card-footer-item">
											<span>
												View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
											</span>
										</p>
										<p class="card-footer-item">
											<span>
												Share on <a href="#">Facebook</a>
											</span>
										</p>
									</footer>
								</div>
							</div>
						</div>
						<h4 class="mb-5"># Dropdown</h4>
						<div class="box mb-5">
							<div class="dropdown">
								<div class="dropdown-trigger">
									<button
										class="button"
										aria-haspopup="true"
										@click="toggleDropdown('dropdown-menu3')"
									>
										<span>Click me</span>
										<span class="icon is-small">
											<i
												class="fas fa-angle-down"
												aria-hidden="true"
											></i>
										</span>
									</button>
								</div>
								<div
									class="dropdown-menu"
									id="dropdown-menu3"
									role="menu"
								>
									<div class="dropdown-content">
										<a
											href="#"
											class="dropdown-item"
										>
											Overview
										</a>
										<a
											href="#"
											class="dropdown-item"
										>
											Modifiers
										</a>
										<a
											href="#"
											class="dropdown-item"
										>
											Grid
										</a>
										<a
											href="#"
											class="dropdown-item"
										>
											Form
										</a>
										<a
											href="#"
											class="dropdown-item"
										>
											Elements
										</a>
										<a
											href="#"
											class="dropdown-item"
										>
											Components
										</a>
										<a
											href="#"
											class="dropdown-item"
										>
											Layout
										</a>
										<hr class="dropdown-divider">
										<a
											href="#"
											class="dropdown-item"
										>
											More
										</a>
									</div>
								</div>

							</div>
							<div class="dropdown is-hoverable">
								<div class="dropdown-trigger">
									<button
										class="button"
										aria-haspopup="true"
										aria-controls="dropdown-menu4"
									>
										<span>Hover me</span>
										<span class="icon is-small">
											<i
												class="fas fa-angle-down"
												aria-hidden="true"
											></i>
										</span>
									</button>
								</div>
								<div
									class="dropdown-menu"
									id="dropdown-menu4"
									role="menu"
								>
									<div class="dropdown-content">
										<div class="dropdown-item">
											<p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<h4 class="mb-5"># Modal</h4>
						<div class="mb-5">
							<button
								class="button is-primary"
								@click="modal.showBoxModal=true"
							>Lauch Box Modal</button>
							<button
								class="button is-primary"
								@click="modal.showConfirmModal=true"
							>Lauch Confirm Modal</button>
							<button
								class="button is-primary"
								@click="modal.showCardModal=true"
							>Lauch Card Modal</button>
						</div>
						<h4 class="mb-5"># Pagination</h4>
						<div class="mb-5">
							Control pagination styles:
							<br />
							<div class="control">
								<label class="radio">
									<input
										type="radio"
										name="rsvp"
										value=""
										v-model="pagination.location"
									>
									Default
								</label>
								<label class="radio">
									<input
										type="radio"
										value="is-centered"
										name="rsvp"
										v-model="pagination.location"
									>
									Centered
								</label>
								<label class="radio">
									<input
										type="radio"
										value="is-right"
										name="rsvp"
										v-model="pagination.location"
									>
									Right
								</label>
							</div>
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="pagination.rounded"
								>
								Have rounded pagination items.
							</label>
							<br />
							<div class="box">
								<nav
									class="pagination"
									:class="[pagination.location,{'is-rounded':pagination.rounded}]"
									role="navigation"
									aria-label="pagination"
								>
									<a class="pagination-previous">Previous</a>
									<a class="pagination-next">Next page</a>
									<ul class="pagination-list">
										<li>
											<a
												class="pagination-link"
												aria-label="Goto page 1"
											>1</a>
										</li>
										<li>
											<span class="pagination-ellipsis">&hellip;</span>
										</li>
										<li>
											<a
												class="pagination-link"
												aria-label="Goto page 45"
											>45</a>
										</li>
										<li>
											<a
												class="pagination-link is-current"
												aria-label="Page 46"
												aria-current="page"
											>46</a>
										</li>
										<li>
											<a
												class="pagination-link"
												aria-label="Goto page 47"
											>47</a>
										</li>
										<li>
											<span class="pagination-ellipsis">&hellip;</span>
										</li>
										<li>
											<a
												class="pagination-link"
												aria-label="Goto page 86"
											>86</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
						<h4 class="mb-5"># Tabs</h4>
						<div class="mb-5">
							Control tabs styles:
							<br />
							<div class="control">
								<label class="radio">
									<input
										type="radio"
										name="rsvp"
										value=""
										v-model="tabs.location"
									>
									Default
								</label>
								<label class="radio">
									<input
										type="radio"
										value="is-centered"
										name="rsvp"
										v-model="tabs.location"
									>
									Centered
								</label>
								<label class="radio">
									<input
										type="radio"
										value="is-right"
										name="rsvp"
										v-model="tabs.location"
									>
									Right
								</label>
							</div>
							<br />
							<div class="control">
								<label class="radio">
									<input
										type="radio"
										name="tabsRadio"
										value=""
										v-model="tabs.styles"
									>
									Default
								</label>
								<label class="radio">
									<input
										type="radio"
										name="tabsRadio"
										value="is-boxed"
										v-model="tabs.styles"
									>
									with borders
								</label>
								<label class="radio">
									<input
										type="radio"
										value="is-toggle"
										name="tabsRadio"
										v-model="tabs.styles"
									>
									mutually exclusive tabs
								</label>
								<label class="radio">
									<input
										type="radio"
										value="is-toggle is-toggle-rounded"
										name="tabsRadio"
										v-model="tabs.styles"
									>
									rounded the first and last items
								</label>
							</div>
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="tabs.isFullWidth"
								>
								Has fullwidth
							</label>
						</div>
						<div class="box mb-5">
							<div
								class="tabs"
								:class="[tabs.location,tabs.styles,{'is-fullwidth':tabs.isFullWidth}]"
							>
								<ul>
									<li class="is-active"><a>Pictures</a></li>
									<li><a>Music</a></li>
									<li><a>Videos</a></li>
									<li><a>Documents</a></li>
								</ul>
							</div>
							<div
								class="tabs"
								:class="[tabs.location,tabs.styles,{'is-fullwidth':tabs.isFullWidth}]"
							>
								<ul>
									<li class="is-active">
										<a>
											<span class="icon is-small"><i
													class="fas fa-image"
													aria-hidden="true"
												></i></span>
											<span>Pictures</span>
										</a>
									</li>
									<li>
										<a>
											<span class="icon is-small"><i
													class="fas fa-music"
													aria-hidden="true"
												></i></span>
											<span>Music</span>
										</a>
									</li>
									<li>
										<a>
											<span class="icon is-small"><i
													class="fas fa-film"
													aria-hidden="true"
												></i></span>
											<span>Videos</span>
										</a>
									</li>
									<li>
										<a>
											<span class="icon is-small"><i
													class="far fa-file-alt"
													aria-hidden="true"
												></i></span>
											<span>Documents</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab == 4}"
					>
						<h4 class="mb-5"># Input</h4>
						<div class="mb-5">
							<div class="field">
								<div class="control">
									<input
										class="input"
										type="text"
										placeholder="Text input"
									>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input
										class="input is-primary"
										type="text"
										placeholder="Primary input"
									>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input
										class="input is-secondary"
										type="text"
										placeholder="Secondary input"
									>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input
										class="input is-info"
										type="text"
										placeholder="Info input"
									>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input
										class="input is-success"
										type="text"
										placeholder="Success input"
									>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input
										class="input is-warning"
										type="text"
										placeholder="Warning input"
									>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input
										class="input is-danger"
										type="text"
										placeholder="Danger input"
									>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input
										class="input"
										type="text"
										placeholder="Disabled input"
										disabled
									>
								</div>
							</div>
							<div class="control has-icons-left has-icons-right">
								<input
									class="input"
									type="email"
									placeholder="Email"
								>
								<span class="icon is-small is-left">
									<i class="fas fa-envelope"></i>
								</span>
								<span class="icon is-small is-right">
									<i class="fas fa-check"></i>
								</span>
							</div>
						</div>
						<h4 class="mb-5"># Textarea</h4>
						<div class="mb-5">
							<div class="mb-5 control">
								<textarea
									class="textarea"
									placeholder="e.g. Hello world"
								/>
							</div>
							<div class="control">
								<textarea
									class="textarea"
									placeholder="Disabled textarea"
									disabled
								/>
							</div>
						</div>
						<h4 class="mb-5"># Select</h4>
						<div class="mb-5">
							<div class="select mr-2">
								<select>
									<option>Select dropdown</option>
									<option>With options</option>
								</select>
							</div>
							<div class="select is-rounded mr-2">
								<select>
									<option>Rounded dropdown</option>
									<option>With options</option>
								</select>
							</div>
							<div class="field mt-2">
								<div class="control has-icons-left">
									<div class="select">
										<select>
											<option selected>Country</option>
											<option>Select dropdown</option>
											<option>With options</option>
										</select>
									</div>
									<div class="icon is-small is-left">
										<i class="fas fa-globe"></i>
									</div>
								</div>
							</div>
						</div>
						<h4 class="mb-5"># Checkbox / Radio</h4>
						<div class="mb-5">
							Control:
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="checkradio.isRight"
								>
								Display a right-to-left design of checkbox or radio(text at left)
							</label>
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="checkradio.hasBackground"
								>
								Modify the input to get the checkbox background color impacted
							</label>
							<br />
							<div class="control">
								<label class="radio">
									<input
										type="radio"
										name="checkRadio"
										value=""
										v-model="checkradio.style"
									>
									Default
								</label>
								<label class="radio">
									<input
										type="radio"
										value="is-circle"
										name="checkRadio"
										v-model="checkradio.style"
									>
									Circle
								</label>
								<label class="radio">
									<input
										type="radio"
										value="is-block"
										name="checkRadio"
										v-model="checkradio.style"
									>
									Block
								</label>
								<label class="radio">
									<input
										type="radio"
										value="has-no-border"
										name="checkRadio"
										v-model="checkradio.style"
									>
									No border
								</label>
							</div>
						</div>
						<div class="mb-5">
							<div class="field">
								<input
									class="is-checkradio"
									:class="[checkradio.style,{'is-rtl':checkradio.isRight,
									'has-background-color is-info':checkradio.hasBackground}]"
									id="exampleCheckbox"
									type="checkbox"
									name="exampleCheckbox"
									checked="checked"
								>
								<label for="exampleCheckbox">Check me</label>
							</div>
							<div class="field">
								<input
									class="is-checkradio"
									:class="[checkradio.style,{'is-rtl':checkradio.isRight,
									'has-background-color is-info':checkradio.hasBackground}]"
									id="exampleRadioInline1"
									type="radio"
									name="exampleRadioInline"
									checked="checked"
								>
								<label for="exampleRadioInline1">Option 1</label>
								<input
									class="is-checkradio"
									:class="[checkradio.style,{'is-rtl':checkradio.isRight,
									'has-background-color is-info':checkradio.hasBackground}]"
									id="exampleRadioInline2"
									type="radio"
									name="exampleRadioInline"
								>
								<label for="exampleRadioInline2">Option 2</label>
							</div>
							<div class="notification is-dark">
								<div class="field">
									<input
										class="is-checkradio is-white"
										:class="[checkradio.style,{'is-rtl':checkradio.isRight,
										'has-background-color is-info':checkradio.hasBackground}]"
										id="exampleCheckboxWhite"
										type="checkbox"
										name="exampleCheckboxWhite"
										checked="checked"
									>
									<label for="exampleCheckboxWhite">Checkbox - white</label>

									<input
										class="is-checkradio is-white"
										:class="[checkradio.style,{'is-rtl':checkradio.isRight,
										'has-background-color is-info':checkradio.hasBackground}]"
										id="exampleCheckboxWhite2"
										type="checkbox"
										name="exampleCheckboxWhite2"
									>
									<label for="exampleCheckboxWhite2">Checkbox - white</label>
								</div>
								<div class="field">
									<input
										class="is-checkradio has-background-color is-white"
										:class="[checkradio.style,{'is-rtl':checkradio.isRight,
										'has-background-color is-info':checkradio.hasBackground}]"
										id="exampleRadioBackgroundColorWhite"
										type="radio"
										name="exampleRadioBackgroundColorWhite"
										checked="checked"
									>
									<label for="exampleRadioBackgroundColorWhite">Radio - white</label>

									<input
										class="is-checkradio has-background-color is-white"
										:class="[checkradio.style,{'is-rtl':checkradio.isRight,
										'has-background-color is-info':checkradio.hasBackground}]"
										id="exampleRadioBackgroundColorWhite2"
										type="radio"
										name="exampleRadioBackgroundColorWhite"
									>
									<label for="exampleRadioBackgroundColorWhite2">Radio - white</label>
								</div>
							</div>
						</div>
						<h4 class="mb-5"># Switch</h4>
						<div class="mb-5">
							Control switch styles:
							<br />
							<div class="control">
								<label class="radio">
									<input
										type="radio"
										name="switchOpen"
										:value="true"
										v-model="switcher.isChecked"
									>
									Open
								</label>
								<label class="radio">
									<input
										type="radio"
										:value="false"
										name="switchOpen"
										v-model="switcher.isChecked"
									>
									Close
								</label>
							</div>
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="switcher.isThin"
								>
								Thin
							</label>
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="switcher.isRounded"
								>
								Rounded
							</label>
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="switcher.isOutlined"
								>
								Outlined
							</label>
							<br />
							<div class="field">
								<input
									id="switchRoundedInfo"
									type="checkbox"
									name="switchRoundedInfo"
									class="switch"
									:class="[{'is-rtl':checkradio.isRight},
									{'is-rounded':switcher.isRounded},
									{'is-outlined':switcher.isOutlined},
									{'is-thin':switcher.isThin}]"
									v-model="switcher.isChecked"
								/>
								<label for="switchRoundedInfo">Open Switch</label>
							</div>
							<div class="field">
								<input
									id="switchRoundedInfo"
									type="checkbox"
									name="switchRoundedInfo"
									class="switch is-secondary"
									:class="[{'is-rtl':checkradio.isRight},
									{'is-rounded':switcher.isRounded},
									{'is-outlined':switcher.isOutlined},
									{'is-thin':switcher.isThin}]"
									v-model="switcher.isChecked"
								/>
								<label for="switchRoundedInfo">Open Switch</label>
							</div>
							<div class="field">
								<input
									id="switchRoundedInfo1"
									type="checkbox"
									name="switchRoundedInfo1"
									class="switch is-success"
									:class="[{'is-rtl':checkradio.isRight},
									{'is-rounded':switcher.isRounded},
									{'is-outlined':switcher.isOutlined},
									{'is-thin':switcher.isThin}]"
									v-model="switcher.isChecked"
								/>
								<label for="switchRoundedInfo1">Open Switch</label>
							</div>
							<div class="field">
								<input
									id="switchRoundedInfo2"
									type="checkbox"
									name="switchRoundedInfo2"
									class="switch is-warning"
									:class="[{'is-rtl':checkradio.isRight},
									{'is-rounded':switcher.isRounded},
									{'is-outlined':switcher.isOutlined},
									{'is-thin':switcher.isThin}]"
									v-model="switcher.isChecked"
								/>
								<label for="switchRoundedInfo2">Open Switch</label>
							</div>
							<div class="field">
								<input
									id="switchRoundedInfo3"
									type="checkbox"
									name="switchRoundedInfo3"
									class="switch is-danger"
									:class="[{'is-rtl':checkradio.isRight},
									{'is-rounded':switcher.isRounded},
									{'is-outlined':switcher.isOutlined},
									{'is-thin':switcher.isThin}]"
									v-model="switcher.isChecked"
								/>
								<label for="switchRoundedInfo3">Open Switch</label>
							</div>
							<div class="field">
								<input
									id="switchRoundedInfo4"
									type="checkbox"
									name="switchRoundedInfo4"
									class="switch is-info"
									:class="[{'is-rtl':checkradio.isRight},
									{'is-rounded':switcher.isRounded},
									{'is-outlined':switcher.isOutlined},
									{'is-thin':switcher.isThin}]"
									v-model="switcher.isChecked"
								/>
								<label for="switchRoundedInfo4">Open Switch</label>
							</div>
							<div class="field">
								<input
									id="switchColorDefault"
									type="checkbox"
									name="switchColorDefault"
									class="switch"
									v-model="switcher.isChecked"
									disabled
								>
								<label for="switchColorDefault">Switch disabled</label>
							</div>
						</div>
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab == 5}"
					>
						<div class="mt-5 mb-5">
							Control table:
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="table.tableFooter"
								>
								Has table footer.
							</label>
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="table.tableBordered"
								>
								Add borders to all the cells.
							</label>
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="table.tableStriped"
								>
								Add stripes to the table.
							</label>
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="table.tableNarrow"
								>
								Make the cells narrower.
							</label>
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="table.tableHoverable"
								>
								Add a hover effect on each row.
							</label>
							<br />
							<label class="checkbox">
								<input
									type="checkbox"
									v-model="table.tableFullWidth"
								>
								A fullwidth table.
							</label>
						</div>
						<div class="box">
							<table
								class="table"
								:class="{'is-bordered':table.tableBordered,
							'is-striped':table.tableStriped,
							'is-narrow':table.tableNarrow,
							'is-hoverable':table.tableHoverable,
							'is-fullwidth':table.tableFullWidth}"
							>
								<thead>
									<tr>
										<th><abbr title="Position">Pos</abbr></th>
										<th>Team</th>
										<th><abbr title="Played">Pld</abbr></th>
										<th><abbr title="Won">W</abbr></th>
										<th><abbr title="Drawn">D</abbr></th>
										<th><abbr title="Lost">L</abbr></th>
										<th><abbr title="Goals for">GF</abbr></th>
										<th><abbr title="Goals against">GA</abbr></th>
										<th>Qualification or relegation</th>
									</tr>
								</thead>
								<tfoot v-if="table.tableFooter">
									<tr>
										<th><abbr title="Position">Pos</abbr></th>
										<th>Team</th>
										<th><abbr title="Played">Pld</abbr></th>
										<th><abbr title="Won">W</abbr></th>
										<th><abbr title="Drawn">D</abbr></th>
										<th><abbr title="Lost">L</abbr></th>
										<th><abbr title="Goals for">GF</abbr></th>
										<th><abbr title="Goals against">GA</abbr></th>
										<th>Qualification or relegation</th>
									</tr>
								</tfoot>
								<tbody>
									<tr>
										<th>1</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Leicester_City_F.C."
												title="Leicester City F.C."
											>Leicester City</a> <strong>(C)</strong>
										</td>
										<td>38</td>
										<td>23</td>
										<td>12</td>
										<td>3</td>
										<td>68</td>
										<td>36</td>
										<td>Qualification for the <a
												href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
												title="2016–17 UEFA Champions League"
											>Champions League group stage</a></td>
									</tr>
									<tr>
										<th>2</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Arsenal_F.C."
												title="Arsenal F.C."
											>Arsenal</a></td>
										<td>38</td>
										<td>20</td>
										<td>11</td>
										<td>7</td>
										<td>65</td>
										<td>36</td>
										<td>Qualification for the <a
												href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
												title="2016–17 UEFA Champions League"
											>Champions League group stage</a></td>
									</tr>
									<tr>
										<th>3</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C."
												title="Tottenham Hotspur F.C."
											>Tottenham Hotspur</a></td>
										<td>38</td>
										<td>19</td>
										<td>13</td>
										<td>6</td>
										<td>69</td>
										<td>35</td>
										<td>Qualification for the <a
												href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
												title="2016–17 UEFA Champions League"
											>Champions League group stage</a></td>
									</tr>
									<tr class="is-selected">
										<th>4</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Manchester_City_F.C."
												title="Manchester City F.C."
											>Manchester City</a></td>
										<td>38</td>
										<td>19</td>
										<td>9</td>
										<td>10</td>
										<td>71</td>
										<td>41</td>
										<td>Qualification for the <a
												href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Play-off_round"
												title="2016–17 UEFA Champions League"
											>Champions League play-off round</a></td>
									</tr>
									<tr>
										<th>5</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Manchester_United_F.C."
												title="Manchester United F.C."
											>Manchester United</a></td>
										<td>38</td>
										<td>19</td>
										<td>9</td>
										<td>10</td>
										<td>49</td>
										<td>35</td>
										<td>Qualification for the <a
												href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Group_stage"
												title="2016–17 UEFA Europa League"
											>Europa League group stage</a></td>
									</tr>
									<tr>
										<th>6</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Southampton_F.C."
												title="Southampton F.C."
											>Southampton</a></td>
										<td>38</td>
										<td>18</td>
										<td>9</td>
										<td>11</td>
										<td>59</td>
										<td>41</td>
										<td>Qualification for the <a
												href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Group_stage"
												title="2016–17 UEFA Europa League"
											>Europa League group stage</a></td>
									</tr>
									<tr>
										<th>7</th>
										<td><a
												href="https://en.wikipedia.org/wiki/West_Ham_United_F.C."
												title="West Ham United F.C."
											>West Ham United</a></td>
										<td>38</td>
										<td>16</td>
										<td>14</td>
										<td>8</td>
										<td>65</td>
										<td>51</td>
										<td>Qualification for the <a
												href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Third_qualifying_round"
												title="2016–17 UEFA Europa League"
											>Europa League third qualifying round</a></td>
									</tr>
									<tr>
										<th>8</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Liverpool_F.C."
												title="Liverpool F.C."
											>Liverpool</a></td>
										<td>38</td>
										<td>16</td>
										<td>12</td>
										<td>10</td>
										<td>63</td>
										<td>50</td>
										<td></td>
									</tr>
									<tr>
										<th>9</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Stoke_City_F.C."
												title="Stoke City F.C."
											>Stoke City</a></td>
										<td>38</td>
										<td>14</td>
										<td>9</td>
										<td>15</td>
										<td>41</td>
										<td>55</td>
										<td></td>
									</tr>
									<tr>
										<th>10</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Chelsea_F.C."
												title="Chelsea F.C."
											>Chelsea</a></td>
										<td>38</td>
										<td>12</td>
										<td>14</td>
										<td>12</td>
										<td>59</td>
										<td>53</td>
										<td></td>
									</tr>
									<tr>
										<th>11</th>
										<td><a
												href="https://en.wikipedia.org/wiki/Everton_F.C."
												title="Everton F.C."
											>Everton</a></td>
										<td>38</td>
										<td>11</td>
										<td>14</td>
										<td>13</td>
										<td>59</td>
										<td>55</td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<box-modal :is-show-modal="modal.showBoxModal">
				<template #content>
					<h5>Box Modal</h5>
					<div class="field is-grouped is-grouped-right">
						<p class="control">
							<a
								class="button is-light"
								@click="modal.showBoxModal=false"
							>Cancel</a>
						</p>
					</div>
				</template>
			</box-modal>
			<card-modal
				:is-show-modal="
								modal.showCardModal"
				@confirm="modal.showCardModal=false"
				@cancel="modal.showCardModal=false"
			>
				<template #modal-content>
					Card Modal Content
				</template>
			</card-modal>
			<confirm-modal
				:is-show-modal="modal.showConfirmModal"
				:message="'Confirm'"
				@confirm="modal.showConfirmModal=false"
				@cancel="modal.showConfirmModal=false"
			/>
		</div>
	</section>
</template>

<script>
import NavBar from '@views/layouts/NavBar';
import BoxModal from '@components/BoxModal';
import ConfirmModal from '@components/ConfirmModal';
import CardModal from '@components/CardModal';

export default {
	name: 'StyleGuide',
	components: { NavBar, BoxModal, ConfirmModal, CardModal },
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
			],
			table: {
				tableFooter: true,
				tableBordered: false,
				tableStriped: false,
				tableNarrow: false,
				tableHoverable: true,
				tableFullWidth: true
			},
			modal: {
				showBoxModal: false,
				showConfirmModal: false,
				showCardModal: false
			},
			pagination: {
				location: '',
				rounded: false
			},
			tabs: {
				location: '',
				styles: '',
				isFullWidth: false
			},
			checkradio: {
				isRight: false,
				hasBackground: false,
				style: ''
			},
			switcher: {
				isThin: false,
				isRounded: false,
				isOutlined: false,
				isChecked: true
			}
		}
	},
	methods: {
		changeTab(tab) {
			this.currentTab = tab;
		},
		toggleDropdown(id) {
			let dropdowmMenu = document.getElementById(id).closest(".dropdown");
			if (dropdowmMenu && dropdowmMenu.classList.contains('is-active')) {
				dropdowmMenu.classList.remove('is-active');
			} else {
				dropdowmMenu.classList.add('is-active');
			}
		}
	}
}
</script>
