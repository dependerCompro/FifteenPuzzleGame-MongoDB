<template>
  <div
    id="gameover-popup"
    class="gameover-popup"
  >
    <p>GAME OVER</p>
    <div>
      <button
        id="button-yes"
        @click="okClicked"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>

export default {
  computed:{
    okClicked(){
      this.$store.commit("makeGameOverPopupHidden")
      return 0
    }
  }
}
</script>