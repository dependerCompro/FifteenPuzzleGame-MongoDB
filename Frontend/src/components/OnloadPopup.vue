<template>
  <div
    id="onload-popup"
    class="onload-popup"
  >
    <p>Would you like to continue the previous game?</p>
    <div>
      <button
        id="button-yes"
        @click="yesClicked"
      >
        Yes
      </button>
      <button
        id="button-no"
        @click="noClicked"
      >
        No
      </button>
    </div>
  </div>
</template>

<script>

export default {
  computed:{
    noClicked(){
      this.$store.commit("makePopupHidden")
      this.$store.commit('resetGame')
      this.$store.dispatch('shuffle')
      return 0
    },
    yesClicked(){
      this.$store.commit("makePopupHidden")
      this.$store.dispatch('getLastStateFromJSON')
      return 0
    }
  }
}
</script>