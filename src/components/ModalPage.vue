<template>
    <q-modal ref='modal' @close="$router.go(-1); modalClosed = true" position="top" :content-css="{marginTop: '30px', background: 'rgba(50,50,50,0.5)'}" :maximized="isMobile">
      <div class="modalImg justify-end row" :style="{backgroundImage: 'url('+info.img+')', width: imageWidth +'px', height: imageHeight}">
        <div class="self-end modalBtnPosition ">
          <q-btn @click="addLike" icon="thumb_up" color="primary" big rounded>
            <q-chip color="tertiary" floating>{{info.likes}}</q-chip>
          </q-btn>
        </div>
      </div>
      <q-infinite-scroll ref='modalScroll' :handler="loadMoreComments">
        <div :style="{background: 'rgba(50,50,50,0.5)', margin:'auto', width: isMobile ? '90%' : '600px'}" class="light">
          <q-list>
            <q-item v-for="(comment, index) in commentsToShow" :key="index" highlight>
              <q-item-side :avatar="comment.avatar" />
              <q-item-main :label="comment.name" :sublabel="comment.comment"></q-item-main>
            </q-item>
            <div v-if="commentsShowLoad" class=" row justify-center text-white">
              <q-spinner-dots :size="100" />
            </div>
          </q-list>

        </div>
      </q-infinite-scroll>
      <div class="fixed-bottom row justify-center">
        <div class="col-xs-11 commentInput">
          <q-input v-model="addCommentText" type="text" clearable max-length='200' dark :after="[{
            icon: 'arrow_forward',
            content: showSubmitBtn,
            handler(){addComment()}
          }]" @keyup.enter="addComment" />
        </div>
      </div>
    </q-modal>
</template>

<script>
export default {
  data () {
    return {
      commentsToShow: [],
      commentsShowLoad: true,
      addCommentText: '',
      isMobile: this.$q.platform.is.mobile,
      imageWidth: !this.$q.platform.is.mobile ? '600' : '325',
      imageHeight: !this.$q.platform.is.mobile ? '338px' : '183px',
      showSubmitBtn: true,
      modalClosed: false
    }
  },
  computed: {
    info: function () {
      return { ...this.$store.getters.elemById(this.$route.params.id) }
    }
  },
  created () {
    this.commentsToShow.push(...this.info.comments.slice(0, 4))
  },
  mounted () {
    this.$refs['modal'].open()
  },
  methods: {
    loadMoreComments (index, done) {
      if (!(this.info.comments.length - this.commentsToShow.length === 1)) {
        setTimeout(() => {
          if (!this.modalClosed) {
            let start = index * 4,
              end = (index + 1) * 4
            this.commentsToShow.push(...this.info.comments.slice(start, end))
            if (!this.info.comments[start]) {
              this.commentsShowLoad = false
              this.$refs['modalScroll'].stop()
            }
            done()
          }
        }, 1000)
      }
      else {
        this.commentsToShow.push(...this.info.comments.slice(-1))
        this.$refs['modalScroll'].stop()
        this.commentsShowLoad = false
        done()
      }
    },
    addComment () {
      this.$store.commit('addComment', {
        id: this.info.id,
        comment: {
          name: 'Replicunt',
          avatar: '../statics/indigo.jpg',
          comment: this.addCommentText
        }
      })
      this.addCommentText = ''
      this.$refs['modalScroll'].resume()
    },
    addLike () {
      this.$store.commit('addLike', { id: this.info.id })
    }
  }
}
</script>

<style scoped>
.modalImg {
  margin: auto;
  border-radius: 10px;
}
.modalBtnPosition {
  width: 100px;
  margin-bottom: 10px;
}
.commentInput {
  background: rgba(20, 20, 20, 0.7);
}
.q-item-label {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: #caafff;
}
.q-item-sublabel {
  font-weight: 500;
  color: #f1eaff;
}
.mobileWidth{
  width: 90%
}
.nonMobieWidth{
  width: 600px
}
</style>