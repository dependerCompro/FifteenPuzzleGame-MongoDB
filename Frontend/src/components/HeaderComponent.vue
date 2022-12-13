<template>
  <header class="header">
    <div class="move-n-time">
      <div class="move-n-time__cards">
        <div class="moves">
          <h1>Moves</h1>
          <span id="moves">{{ moves }}</span>
        </div>
        <div class="time">
          <h1>Time</h1>
          <p>
            <span id="timer-min">
              {{ min <= 9 ? '0'+ min : min }}
            </span> : <span id="timer-sec">
              {{ sec <= 9 ? '0'+ sec : sec }}
            </span>
          </p>
        </div>
      </div>
      <div class="move-n-time__buttons">
        <button
          id="button-start"
          @click="startTimer"
        >
          {{ $store.state.startButtonState }}
        </button>
        <button
          id="button-reset"
          @click="reloadPage"
        >
          Reset
        </button>
      </div>
    </div>
    <div class="header__title">
      <h1>Fifteen Puzzle Game</h1>
      <div
        id="scoreboard"
        class="scoreboard"
      >
        <button
          id="scoreboard-button"
          @click="makeScoreCardVisible"
        >
          Scoreboard
        </button>
      </div>
    </div>
  </header>
</template>

<script>

export default {  
  computed:{
    moves(){
      return this.$store.state.moves
    },
    min(){
      return this.$store.state.minutes
    },
    sec(){
      return this.$store.state.seconds
    }
  },
  methods: {
    //TODO: To make it work without data property.
    timerFormatter() {
      this.$store.commit('incrementSeconds')
      if (this.sec > 59) {
        this.$store.state.seconds = 0
        this.$store.commit('incrementMinutes')
      }
      this.$store.dispatch('webSocketConnection')
    },

    startTimer() {
      if (this.$store.state.startButtonState == "Start") {
        this.$store.state.interval = setInterval(this.timerFormatter, 1000)
        this.$store.state.play = true
        this.$store.state.startButtonState = "Pause"
      }
      else if (this.$store.state.startButtonState == "Pause") {
        clearInterval(this.$store.state.interval)
        this.$store.state.play = false
        this.$store.state.startButtonState = "Resume"
      }
      else if (this.$store.state.startButtonState == "Resume") {
        this.$store.state.interval = setInterval(this.timerFormatter, 1000)
        this.$store.state.play = true
        this.$store.state.startButtonState = "Pause"
      }
    },

    reloadPage() {
      window.location.reload();
    },

    makeScoreCardVisible() {
      this.$store.commit('makeScoreCardVisible')
    }
  }
}
</script>