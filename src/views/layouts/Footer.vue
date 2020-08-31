<template>
  <footer class="jx-footer">
    <div class="jx-lang-switcher">
      <a href="javascript:;" :class="{ active: isActive('zh-TW') }" @click="changeLang('zh-TW')">中文</a>
      <span class="text-muted">|</span>
      <a href="javascript:;" :class="{ active: isActive('en') }" @click="changeLang('en')">English</a>
    </div>
    <div class="jx-copyright">{{$t("common.copy_right")}}</div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  props: {
    hasLang: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentLang: localStorage.getItem("lang") || "en"
    };
  },
  methods: {
    isActive(lang) {
      return this.currentLang === lang;
    },
    changeLang(lang) {
      localStorage.setItem("lang", lang || "en");
      this.$i18n.locale = localStorage.getItem("lang") || lang;
      this.$store.commit("setCurrentLang", lang);
      this.currentLang = lang;
    }
  }
};
</script>
