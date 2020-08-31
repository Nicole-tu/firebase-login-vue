import moment from "moment";

function toggleModal(modalId) {
  let modal = document.getElementById(modalId);
  modal.scrollTop = 0;
  if (modal.classList.contains("show")) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("style", "display: none");
    let modalBackdrops = document.getElementsByClassName(
      "modal-backdrop"
    );
    document.body.removeChild(modalBackdrops[0]);
    document.body.classList.remove("modal-open");
  } else {
    modal.classList.add("show");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("style", "display: block");
    let modalBackdrops = document.createElement('div');
    modalBackdrops.classList.add("modal-backdrop");
    modalBackdrops.classList.add("fade");
    modalBackdrops.classList.add("show");
    document.body.appendChild(modalBackdrops);
    document.body.classList.add("modal-open");
  }
}

function showAlert() {
  let alert = document.getElementById("alertBox");
  setTimeout(() => {
    alert.classList.remove("show");
    this.$store.dispatch('closeAlert');
  }, 3000);
}

function toggleDropdown(dropdownId) {
  let dropdown = document.getElementById(dropdownId);
  let dropdownMenu = document.querySelector(`div#${dropdownId} .dropdown-menu`);
  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
    dropdown.setAttribute('aria-expanded', false);
    dropdownMenu.classList.remove("show");
    dropdownMenu.setAttribute("style", "display:none");
  } else {
    dropdown.classList.add("show");
    dropdown.setAttribute('aria-expanded', true);
    dropdownMenu.classList.add("show");
    dropdownMenu.setAttribute("style", `position: absolute;will-change: transform;`);
  }
}

function formatDate(date, format) {
  if (date == "" || date == null) {
    return "";
  }
  if (typeof format == "undefined") {
    return moment(new Date(date)).format("YYYY/MM/DD");
  }
  return moment(new Date(date)).format(format);
}

document.body.addEventListener("click", function (event) {
  if (!event.target.matches('.jx-pagination-text')) {
    let pagination = document.querySelector("[id^=pagination]");
    if (pagination != null) {
      if (pagination.classList.contains("show")) {
        toggleDropdown(pagination.id);
      } else {
        return;
      }
    }
  }
});

export const customMixins = {
  methods: {
    toggleModal,
    showAlert,
    toggleDropdown,
    formatDate
  }
}
