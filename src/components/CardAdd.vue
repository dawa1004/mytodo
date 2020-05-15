<template>
  <form :class="classList" @submit.prevent="addCardToList">
    <input v-model="body"
           type="text"
           class="text-input"
           placeholder="Add new card..."
           @focusin="startEditing"
           @focusout="finishEditing"
    />
    <!-- フォームが活性の時（isEditing）と、テキストが入力された時(bodyExists)を指定 -->
    <button type="submit"
            class="add-button"
            v-if="isEditing || bodyExists">
      カードを追加
    </button>
  </form>
</template>

<script>
export default {
  // addCardToListメソッドで必要なlistIndexをListコンポーネントから受け取る
  props: {
    listIndex: {
      type: Number,
      required: true,
    }
  },
  data: function() {
    return {
      body: '',
      isEditing: false,
    }
  },
  computed: {
      classList() {
        const classList = ['addcard']
        if (this.isEditing) {
          classList.push('active')
        }
        if (this.bodyExists) {
          classList.push('addable')
        }
        return classList
      },
      bodyExists() {
      return this.body.length > 0
    }
  },
  // addCardToListメソッドをmethodsプロパティに定義して、store/index.jsで定義したactionsを呼び出す
  methods: {
    startEditing: function() {
    this.isEditing = true
    },
    finishEditing: function() {
      this.isEditing = false
    },
    addCardToList: function() {
      this.$store.dispatch('addCardToList', { body: this.body, listIndex: this.listIndex })
      this.body = ''
    }
  }
}
</script>