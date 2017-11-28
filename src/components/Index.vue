<template>
  <div class="bg">
    <div class="row justify-center">
      <img :height="headerWidth" class="header" src="../assets/header.png" alt="">
    </div>

    <q-tabs color='indigo-3' v-model="selectedTab" align="justify" :inverted="true" :glossy="true" @select="tabChange">
      <q-tab slot="title" name="all" label="All" />
      <q-tab slot="title" name="Blade Runner" label="Blade Runner" />
      <q-tab slot="title" name="Blade Runner 2049" label="Blade Runner 2049" />

      <q-tab-pane name="all" >
        <q-infinite-scroll :handler="loadMore">
          <ul key="all" class="row no-padding justify-around lsn" v-touch-swipe.horizontal="swipeTab">
            <li @click="openModal(obj)" v-for="(obj,index) in allItemsToShow" :key="obj.id" class="mt10">
              <div :style="{backgroundImage: 'url('+obj.img+')', width: imageWidth +'px', height: imageHeight}">
                <q-chip color="primary" icon="thumb_up">{{obj.likes}}</q-chip>
              </div>
            </li>
          </ul>
          <div v-if="showLoad" slot="message" class="row justify-center text-white">
            <q-spinner-dots :size="100" />
          </div>
        </q-infinite-scroll>
      </q-tab-pane>
      <q-tab-pane key="Blade Runner" name="Blade Runner">
        <q-infinite-scroll :handler="loadMore">
          <ul class="no-padding row justify-around lsn" v-touch-swipe.horizontal="swipeTab">
            <li @click="openModal(obj)" v-for="(obj,index) in bladeRunnerToShow" :key="obj.id" class="mt10">
              <div :style="{backgroundImage: 'url('+obj.img+')', width: imageWidth +'px', height: imageHeight}">
                <q-chip color="primary" icon="thumb_up">{{obj.likes}}</q-chip>
              </div>
            </li>
          </ul>
          <div v-if="showLoad" slot="message" class="row justify-center text-white">
            <q-spinner-dots :size="100" />
          </div>
        </q-infinite-scroll>
      </q-tab-pane>
      <q-tab-pane key="Blade Runner 2049" name="Blade Runner 2049">
        <q-infinite-scroll :handler="loadMore">
          <ul class="no-padding row justify-around lsn" v-touch-swipe.horizontal="swipeTab">
            <li @click="openModal(obj)" v-for="(obj,index) in bladeRunner2049ToShow" :key="obj.id" class="mt10 round-borders">
              <div :style="{backgroundImage: 'url('+obj.img+')', width: imageWidth +'px', height: imageHeight}">
                <q-chip color="primary" icon="thumb_up">{{obj.likes}}</q-chip>
              </div>
            </li>
          </ul>
          <div v-if="showLoad" class="row justify-center text-white">
            <q-spinner-dots :size="100" />
          </div>
        </q-infinite-scroll>
      </q-tab-pane>
    </q-tabs>
    <!-- modal-->
    
      <router-view> </router-view>
  
  </div>
</template>

<script>
import commentos from '../statics/comments'

export default {
  data () {
    return {
      bladeRunnerToShow: [],
      bladeRunner2049ToShow: [],
      allItems: [],
      allItemsToShow: [],
      selectedTab: 'all',
      showLoad: true,
      imageWidth: this.$q.platform.is.mobile ? '325' : '600',
      headerWidth: this.$q.platform.is.mobile ? '90px' : '200px',
      imageHeight: this.$q.platform.is.mobile ? '183px' : '338px'
    }
  },
  methods: {
    async fetchData () {
      let id = 0,
        amountOfLikes
      await this.axios.get(this.$store.state.urls[0]).then(res => {
        res.data.backdrops.forEach(img => {
          amountOfLikes = Math.floor(Math.random() * (680 - 15)) + 15
          this.$store.commit('dafaultFillBR', {
            img:
              'https://image.tmdb.org/t/p/w' +
              this.imageWidth +
              '/' +
              img.file_path,
            id: id++,
            likes: amountOfLikes,
            comments: [...commentos]
          })
        })
      })
      await this.axios.get(this.$store.state.urls[1]).then(res => {
        res.data.backdrops.forEach(img => {
          amountOfLikes = Math.floor(Math.random() * (680 - 15)) + 15
          this.$store.commit('dafaultFillBR2049', {
            img:
              'https://image.tmdb.org/t/p/w' +
              this.imageWidth +
              '/' +
              img.file_path,
            id: id++,
            likes: amountOfLikes,
            comments: [...commentos]
          })
        })
      })
      // this.allItems.push(...this.$store.state.bladeRunner)
      // this.allItems.push(...this.$store.state.bladeRunner2049)
      this.allItems.push(...this.$store.getters.allItems)
      this.allItemsToShow.push(...this.allItems.slice(0, 8))
      this.bladeRunnerToShow.push(...this.$store.state.bladeRunner.slice(0, 8))
      this.bladeRunner2049ToShow.push(
        ...this.$store.state.bladeRunner2049.slice(0, 8)
      )
    },
    loadMore (index, done) {
      setTimeout(() => {
        if (this.selectedTab === 'all') {
          for (let i = index * 8; i < (index + 1) * 8; i++) {
            this.allItems[i]
              ? this.allItemsToShow.push(this.allItems[i])
              : (this.showLoad = false)
          }
        }
        else if (this.selectedTab === 'Blade Runner') {
          for (let i = index * 8; i < (index + 1) * 8; i++) {
            this.$store.state.bladeRunner[i]
              ? this.bladeRunnerToShow.push(this.$store.state.bladeRunner[i])
              : (this.showLoad = false)
          }
        }
        else if (this.selectedTab === 'Blade Runner 2049') {
          for (let i = index * 8; i < (index + 1) * 8; i++) {
            this.$store.state.bladeRunner2049[i]
              ? this.bladeRunner2049ToShow.push(
                this.$store.state.bladeRunner2049[i]
              )
              : (this.showLoad = false)
          }
        }
        done()
      }, 2000)
    },
    swipeTab (swipe) {
      switch (this.selectedTab) {
        case 'all':
          swipe.direction === 'right'
            ? (this.selectedTab = 'all')
            : (this.selectedTab = 'Blade Runner')
          break
        case 'Blade Runner':
          swipe.direction === 'right'
            ? (this.selectedTab = 'all')
            : (this.selectedTab = 'Blade Runner 2049')
          break
        case 'Blade Runner 2049':
          swipe.direction === 'right'
            ? (this.selectedTab = 'Blade Runner')
            : (this.selectedTab = 'Blade Runner 2049')
      }
    },
    tabChange () {
      this.showLoad = true
      this.allItemsToShow.splice(8)
      this.bladeRunnerToShow.splice(8)
      this.bladeRunner2049ToShow.splice(8)
    },
    openModal (obj) {
      this.$router.push({ name: 'modal', params: { id: obj.id } })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
.bg {
  background-image: url("../assets/bg.jpg");
  background-size: auto;
  background-position-x: 80%;
  width: 100%;
  min-height: 100vh;
  background-attachment: fixed;
  overflow: hidden;
}
.ls3 {
  letter-spacing: 2px;
}
.lsn {
  list-style: none;
}
.mt10 {
  margin-top: 10px;
  cursor: pointer;
}
</style>