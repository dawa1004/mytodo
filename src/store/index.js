import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// localStorageに保存したリストを取得します。
const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({ // ストアインスタンスを取得
  state: {
  // localStorageに保存されたリストがあれば取得、なければデフォルトのリスト配列を設置します。
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    // 第一引数(state), 第二引数(コミット時に受け取る引数payloadを指定)
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
    // 受け取ったリストのインデックスを使ってspliceでリストを削除
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
    },
    // 受け取ったリストのインデックスとカードのインデックスを使ってspliceでリストを削除
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    updateList(state, payload) {
      state.lists = payload.lists
    }
  },
  actions: {
    // 第一引数(context ストアインスタンスのメソッドやプロパティを呼び出せるオブジェクト)
    // 第二引数(mutationsに渡す引数)
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
    // mutationsのremovelistメソッドをcommitで実行
    removelist(context, payload) {
      context.commit('removelist', payload)
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    // mutationsのremoveCardFromListメソッドをcommitで実行
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
    updateList(context, payload) {
      context.commit('updateList', payload)
    }
  },
  // modulesをgettersに修正
  getters: {
    // stateを受け取り、全体のカードの総数を返す
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    },
  },
})
// データの状態を更新後にlocalStorageへデータの状態を保存
store.subscribe((mutation, state) => { // 第一引数にmutationインスタンス、第二引数にmutation後のデータの状態を受け取ります。
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})
// main.jsでインポートできるようにexport defaultする
export default store
