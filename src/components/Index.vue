<template>
  <div :class="['bg', !isMobile ? 'bgDesktop' : 'bgMobile']">
    <div class="row justify-center">
      <img :height="headerHeight" class="header" src="../assets/header.png" alt="">
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
export default {
  data () {
    return {
      bladeRunnerToShow: [],
      bladeRunner2049ToShow: [],
      allItems: [],
      allItemsToShow: [],
      selectedTab: 'all',
      showLoad: true,
      imageWidth: !this.$q.platform.is.mobile ? '600' : '325',
      imageHeight: !this.$q.platform.is.mobile ? '338px' : '183px',
      headerHeight: !this.$q.platform.is.mobile ? '150px' : '90px',
      isMobile: this.$q.platform.is.mobile
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData', {
        imageWidth: this.imageWidth
      }).then(() => {
        this.allItems = [...this.$store.getters.allItems]
        this.allItemsToShow = [...this.allItems.slice(0, 8)]
        this.bladeRunnerToShow = [...this.$store.state.bladeRunner.slice(0, 8)]
        this.bladeRunner2049ToShow = [...this.$store.state.bladeRunner2049.slice(0, 8)]
      })
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
    this.fetchData(this.imageWidth)
    //   alert(screen.orientation.type)
    //   if ((window.screen.orientation.type === 'landscape-primary' || window.screen.orientation.type === 'landscape-secondary') && this.imageWidth !== '325') {
    //     this.imageWidth = '600'
    //     this.imageHeight = '338px'
    //     this.headerHeight = '150px'
    //     let iw = '600'
    //     this.fetchData(iw)
    //   }
    //   else if ((window.screen.orientation.type === 'portrait-primary' || window.screen.orientation.type === 'portrait-secondary') && this.imageWidth !== '325') {
    //     this.imageWidth = '325'
    //     this.imageHeight = '183px'
    //     this.headerHeight = '90px'
    //     this.fetchData()
    //   }
  }
}
</script>

<style scoped>
.bg {
  background-size: auto 100vh;
  background-position-x: 80%;
  width: 100%;
  min-height: 100vh;
  background-attachment: fixed;
  overflow: hidden;
}
.bgDesktop{
  background-image: url("../assets/bg.jpg");
}
.bgMobile{
  background-color: #252d3a;
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