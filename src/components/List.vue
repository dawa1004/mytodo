<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <!-- リスト内のカードの総数のデータをバインド -->
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <div class="deletelist" @click="removeList">×</div>
    </div>
    <!-- group属性 他のコンポーネントとドラッグ&ドロップ可能 -->
    <draggable group="cards"
           :list="cards"
           :options="{animation:300}"
           @end="$emit('change')"> <!-- endイベントはドラッグ&ドロップの操作後に最後に発生するイベント -->
    <!-- Cardコンポーネントを呼び出し、propsで受け取れるように定義したデータを渡す -->
      <card v-for="(item, index) in cards"
            :body="item.body"
            :key="item.id"
            :cardIndex="index"
            :listIndex="listIndex"
      />
      <card-add :listIndex="listIndex" /> <!-- コンポーネントを呼び出す -->
    </draggable> <!-- Vue.Draggable -->
  </div>
</template>

<script>
import draggable from 'vuedraggable' // Vue.Draggable
import CardAdd from './CardAdd'
import Card from './Card'

export default {
  components: {
    draggable, // Vue.Draggable
    CardAdd,
    Card
  },
  props: {
    title: {
      type: String,
      required: true // 必ず受け取る
    },
    cards: {
    type: Array,
    required: true // 必ず受け取る
    },
    listIndex: {
      type: Number,
      required: true // 必ず受け取る
    }
  },
  computed: { //<template>でバインドさせたtotalCardInListをcomputedプロパティで定義
    totalCardInList() {
      return this.cards.length // propsで受け取っているcardsのデータを利用してその総数を返せるようにします。
    }
  },
  methods: {
    removeList: function() {
      if(confirm('本当にこのリストを削除しますか？')){
        this.$store.dispatch('removelist', { listIndex: this.listIndex })
      }
    },
  }
}
</script>