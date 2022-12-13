<template>
  <div class="puzzle-board">
    <table
      id="field"
      class="board"
    >
      <tr
        v-for="(row, i) in $store.state.values"
        :key="i"
      >
        <td
          v-for="(val, j) in row"
          :key="j"
          :class="val == 0 ? 'empty-cell' : 'cell'"
          @click="mouseMove(i, j)"
        >
          {{
            val == 0 ? "" : val
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getValues'])
  },
  watch: {
    getValues: {
      handler(newValues) {
        if (this.isGameOver(newValues)) {
          setTimeout(() => {
            this.$store.commit("makeGameOverPopupVisible")
            this.$store.dispatch('postStatDataToServer')
            this.$store.commit('resetGame')
            this.$store.dispatch('shuffle')
            this.$store.dispatch('webSocketConnection')
          }, 1000);
        }
      }
    }
  },
  methods: {
    mouseMove(i, j) {
      // UP, DOWN, LEFT, RIGHT here denotes the movement of empty cell.
      var move;
      if (i - 1 == this.$store.state.emptyX && j == this.$store.state.emptyY) {
        move = "DOWN"
      }

      else if (i == this.$store.state.emptyX && j + 1 == this.$store.state.emptyY) {
        move = "LEFT"
      }

      else if (i + 1 == this.$store.state.emptyX && j == this.$store.state.emptyY) {
        move = "UP"
      }

      else if (i == this.$store.state.emptyX && j - 1 == this.$store.state.emptyY) {
        move = "RIGHT"
      }
      else {
        move = "INVALID"
      }

      if (this.$store.state.play) {
        this.$store.dispatch('makeMove', move)
        this.$store.commit('incrementMoves')
      }
    },
    isGameOver(newValues) {
      return JSON.stringify(newValues) === JSON.stringify(this.$store.state.gameOverArray)
    }
  }
}
</script> 