<!-- TOPページ -->
<template>
  <div>
    <header>
      my ToDo
    </header>
    <div>
      <label for="title">Title：</label>
      <input 
        id="title" 
        type="text"
        placeholder="タイトルを入力"
        v-model="boad"
        >
        <h1>{{ boad }}</h1>
    </div>
    <main>
      <p class="info-line">All: {{ totalCardCount }} cards</p>
        <draggable :list="lists"
            :options="{animation:300}"
            @end="movingList"
            class="list-index"> <!-- Vue.Draggable -->
          <!-- Listコンポーネントを呼び出しListコンポーネントに必要なデータを渡す -->
          <list v-for="(item, index) in lists"
                :key="item.id"
                :title="item.title"
                :cards="item.cards"
                :listIndex="index"
                @change="movingCard"
          />
          <list-add /><!-- 呼び出す -->
        </draggable> <!-- Vue.Draggable -->
    </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable' //Vue.Draggable
import List from './List'
import ListAdd from './ListAdd'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      boad: "new"
    };
  },
  components: {
    draggable, // Vue.Draggable
    ListAdd,
    List,
  },
  computed: {
     //stateのリストデータlistsをコンポーネントのcomputedプロパティで取得
    ...mapState([
      'lists'
    ]),
    // 全体のカードの総数はストアのstateで管理しているcardsの数を合計して返す
    totalCardCount() {
      return this.$store.getters.totalCardCount
    }
  },
  methods: {
    movingCard: function() {
      this.$store.dispatch('updateList', { lists: this.lists })
    },
    movingList: function() {
      this.$store.dispatch('updateList', { lists: this.lists })
  }
  }
}
</script>