<template>
  <div class="wrapper">
    <HeaderComponent />
    <OnloadPopup v-if="onloadPopupVisibility" />
    <ScoreboardCard v-if="visibility" />
    <GameOverPopup v-if="GameOverPopupVisibility" />
    <PuzzleBoard />
    <PlayingInstructions />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import OnloadPopup from '@/components/OnloadPopup.vue';
import ScoreboardCard from '@/components/ScoreboardCard.vue';
import PlayingInstructions from '@/components/PlayingInstructions.vue';
import PuzzleBoard from '@/components/PuzzleBoard.vue';
import GameOverPopup from '@/components/GameOverPopup.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    OnloadPopup,
    ScoreboardCard,
    PuzzleBoard,
    PlayingInstructions,
    GameOverPopup,
  },
  computed:{
    visibility(){
      return this.$store.state.scoreCardVisibility === 'visible'
    },
    onloadPopupVisibility(){
      return this.$store.state.onloadPopupVisibility === 'visible'
    },
    GameOverPopupVisibility(){
      return this.$store.state.gameOverPopupVisibility === 'visible'
    }
  }
}
</script>

<style>
@import '@/assets/css/main.css';
</style>