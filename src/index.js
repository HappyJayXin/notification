let vm = new Vue({
  el: '#app',
  data: {
    time: {
      content: '開始倒數',
      totalTime: null,
      second: 0,
      canClick: true
    },
    notifyConfig: {
      title: '時間到',
      detail: {
        body: '點擊回畫面',
        icon: ''
      }
    }
  },
  methods: {
    handlecountDown() {
      if (!this.time.canClick) return
      this.time.canClick = false

      // 分轉秒
      this.time.second = this.time.totalTime * 60

      this.time.content = this.turnTime()
      let clock = setInterval(() => {
        this.time.second--
        this.time.content = this.turnTime()
        if (this.time.second < 0) {
          window.clearInterval(clock)
          this.time = {
            content: '開始倒數',
            totalTime: null,
            canClick: true
          }
          this.popNotice()
        }
      }, 1000)
    },
    turnTime() {
      if (this.time.second > 59) {
        let min = Math.floor(this.time.second / 60)
        let sec = this.time.second % 60
        return `倒數${min}分${sec}秒`
      } else {
        return `倒數${this.time.second}秒`
      }
    },
    popNotice() {
      if (window.Notification) {
        if (Notification.permission == 'granted') {
          const { title, detail } = this.notifyConfig
          const notification = new Notification(title, detail)
          notification.addEventListener('click', () => {
            window.focus()
          })
        }
      } else {
        alert('瀏覽器不支援!')
      }
    }
  },
  computed: {
    inputLimit: {
      set: function(value) {
        if (value > 60) {
          this.time.totalTime = 60
          alert('時間限制1小時內')
        } else {
          this.time.totalTime = value
        }
      },
      get: function() {
        return this.time.totalTime
      }
    }
  }
})
