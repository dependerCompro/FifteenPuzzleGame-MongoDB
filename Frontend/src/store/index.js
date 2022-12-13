import { createStore } from 'vuex'

export default createStore({
  state: {
    "values": [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]],
    "size": 4,
    "seconds": 0,
    "minutes": 0,
    "moves": 0,
    "emptyX": 3,
    "emptyY": 3,
    "interval": null,
    "play": false,
    "shuffleValue": 10,
    "gameOverArray": [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]],
    "startButtonState": "Start",
    "scoreCardVisibility": "hidden",
    "onloadPopupVisibility": "visible",
    "gameOverPopupVisibility": "hidden",
    "wsServer": "ws://localhost:8000"
  },
  getters: {
    getValues(state) {
      return state.values
    },
    getEmptyX(state) {
      return state.emptyX
    },
    getEmptyY(state) {
      return state.emptyY
    },
    getShuffleValue(state) {
      return state.shuffleValue
    },
    getStartButtonState(state) {
      return state.startButtonState
    },
    createMessageForStatistics(state) {
      var messageObj = {
        minutes: state.minutes,
        seconds: state.seconds,
        moves: state.moves,
        userid: 1,
      };
      return messageObj;
    },
    createMessageForLastState(state) {
      var messageObj = {
        minutes: state.minutes,
        seconds: state.seconds,
        moves: state.moves,
        values: state.values,
        emptyX: state.emptyX,
        emptyY: state.emptyY
      }
      return messageObj
    },
    getWSServer(state) {
      return state.wsServer
    }
  },
  mutations: {
    resetMoves(state) {
      state.moves = 0;
    },
    incrementMoves(state) {
      state.moves++;
    },
    incrementMinutes(state) {
      state.minutes++;
    },
    incrementSeconds(state) {
      state.seconds++;
    },
    updateValues(state, payload) {
      state.values = payload
    },
    updateEmptyX(state, val) {
      state.emptyX = val
    },
    updateEmptyY(state, val) {
      state.emptyY = val
    },
    updateMinutes(state, val) {
      state.minutes = val
    },
    updateMoves(state, val) {
      state.moves = val
    },
    updateSeconds(state, val) {
      state.seconds = val
    },
    makeScoreCardVisible(state) {
      state.scoreCardVisibility = "visible"
    },
    makeScoreCardHidden(state) {
      state.scoreCardVisibility = "hidden"
    },
    makePopupVisible(state) {
      state.onloadPopupVisibility = "visible"
    },
    makePopupHidden(state) {
      state.onloadPopupVisibility = "hidden"
    },
    makeGameOverPopupVisible(state) {
      state.gameOverPopupVisibility = "visible"
    },
    makeGameOverPopupHidden(state) {
      state.gameOverPopupVisibility = "hidden"
    },
    resetGame(state) {
      state.moves = 0
      state.emptyX = state.size - 1
      state.emptyY = state.size - 1
      state.minutes = 0
      state.seconds = 0
      state.startButtonState = "Start"
      clearInterval(state.interval)
    },
    waitForSocketConnection({ commit, state }, payload) {
      setTimeout(function () {
        if (payload.socket.readyState === 1) {
          payload.socket.send(payload.msg);
        } else {
          payload.socket = new WebSocket(state.wsServer);
          commit('waitForSocketConnection', payload)
        }
      }, 50);
    }
  },
  actions: {
    makeMove({ commit, getters }, move) {
      let temp;
      let values = getters.getValues;
      let newValues = [...values]
      let X = getters.getEmptyX;
      let Y = getters.getEmptyY;
      if (move === "UP" && X > 0) {
        temp = values[X - 1][Y]
        newValues[X - 1][Y] = 0
        commit('updateEmptyX', X - 1)
      }

      else if (move === "RIGHT" && Y < 3) {
        temp = values[X][Y + 1]
        newValues[X][Y + 1] = 0
        commit('updateEmptyY', Y + 1)
      }

      else if (move === "DOWN" && X < 3) {
        temp = values[X + 1][Y]
        newValues[X + 1][Y] = 0
        commit('updateEmptyX', X + 1)
      }

      else if (move === "LEFT" && Y > 0) {
        temp = values[X][Y - 1]
        newValues[X][Y - 1] = 0
        commit('updateEmptyY', Y - 1)
      }
      newValues[X][Y] = temp
      commit('updateValues', newValues)
    },
    shuffle({ getters }) {
      let iterations = getters.getShuffleValue
      const moveOptions = ["UP", "RIGHT", "DOWN", "LEFT"]
      for (let i = 0; i < iterations; i++) {
        let move = moveOptions[Math.floor(Math.random() * moveOptions.length)]
        this.dispatch('makeMove', move)
      }
    },
    getStatisticsFromJSON() {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:8000/statistics");
        xhr.send();
        xhr.onload = () => {
          const statistics = JSON.parse(xhr.response);
          resolve(statistics);
        };
      });
    },
    postStatDataToServer({ getters }) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:8000/statistics");
      xhr.setRequestHeader("Content-Type", "application/json");
      const msg = JSON.stringify(getters.createMessageForStatistics);
      xhr.send(msg);
    },
    getLastStateFromJSON({ commit }) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:8000/lastState");
        xhr.send();
        xhr.onload = () => {
          const lastStateData = JSON.parse(xhr.response);
          const dataObject = lastStateData.data.lastStateData[0]
          commit('updateValues', dataObject.values)
          commit('updateEmptyX', dataObject.emptyX)
          commit('updateEmptyY', dataObject.emptyY)
          commit('updateMinutes', parseInt(dataObject.minutes))
          commit('updateMoves', parseInt(dataObject.moves))
          commit('updateSeconds', parseInt(dataObject.seconds))
          resolve(lastStateData);
        };
      });
    },
    webSocketConnection({ commit, getters }) {
      let socket = new WebSocket(getters.getWSServer);
      const msg = JSON.stringify(getters.createMessageForLastState)
      const payload = { socket, msg }
      commit('waitForSocketConnection', payload)
    }
  },
  modules: {
  }
})
