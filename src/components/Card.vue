<template>
  <div class="card">
    <!-- クリックイベント時に、removeCardFromListメソッドをハンドル -->
    <button class="close-button" @click="removeCardFromList">
      ×
    </button>
    <!-- コンポーネントで定義されたデータを”Mustache”構文を使って、データバインドさせる -->
    <div class="body">
      {{ body }}
    </div>
  </div>
</template>

<script>
export default {
  // Card.vueで使いたいデータを受け取るよう定義
  props: {
    body: {
      type: String,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
    cardIndex: {
      type: Number,
      required: true
    }
  },
  methods: { // removeCardFromListメソッドをmethodsプロパティに定義
    removeCardFromList() {
      if(confirm('本当にこのカードを削除しますか？')) {
        // this.$store.dispatchでstore/index.jsに定義したremoveCardFromListアクションを呼び出す
        this.$store.dispatch('removeCardFromList', { cardIndex: this.cardIndex, listIndex: this.listIndex })
      }
    }
  },
}
</script>