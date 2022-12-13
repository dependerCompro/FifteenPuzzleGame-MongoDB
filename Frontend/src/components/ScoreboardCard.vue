<template>
  <div
    id="scoreboard-card"
    class="scoreboard-card"
  >
    <div id="scoreboard-card__close_button">
      <button @click="makeScoreCardHidden">
        ❌
      </button>
    </div>
    <div
      id="scoreboard-card__wrapper"
      class="scoreboard-card__wrapper"
    >
      <table class="scoreboard-table">
        <tr class="score-row">
          <th class="timestamp-cell-th">
            TIMESTAMP
          </th>
          <th class="moves-cell-th">
            MOVES
          </th>
          <th class="time-cell-th">
            TIME
          </th>
        </tr>
        <tr
          v-for="(row, i) in statsArr"
          :key="i"
          class="score-row"
        >
          <td class="timestamp-cell">
            {{ row.timestamp }}
          </td>
          <td class="moves-cell">
            {{ row.moves }}
          </td>
          <td class="time-cell">
            {{ row.minutes }} : {{ row.seconds }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statsArr: []
    }
  },
  mounted(){
    this.getStat()
  },
  methods: {
    getStat: async function() {
      const statObj = await this.$store.dispatch('getStatisticsFromJSON')
      this.statsArr = statObj.data.stats
      this.statsArr.reverse()
    },
    makeScoreCardHidden(){
      this.$store.commit('makeScoreCardHidden')
    }
  }
}
</script>