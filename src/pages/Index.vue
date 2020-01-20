<template>
  <q-page padding>
    <div class="q-ma-xl text-center bg-grey" style="height:500px" @dragover.prevent="checkDrag($event)" @dragleave.prevent="checkDrag($event)" @drop.prevent="onDrop">
      <p class="text-white text-bold q-pt-xl">ここにCSVファイルをドロップ</p>
    </div>
    <div class="text-center">
      <q-btn color="primary" label="リセット" @click="reset()" />
      <q-btn color="primary" label="CSVダウンロード" @click="download()" />
    </div>
    <div class="text-bold">総レコード数</div>
    {{ csvLen }}件
    <div class="text-bold">連結対象のファイル</div>
    <q-badge v-for="(fileName, index) in fileNames" :key="index + 'file'" class="q-mr-md">
      {{ fileName }}
    </q-badge>

    <div class="text-bold">項目リスト</div>
    <q-badge v-for="(field, idx) in uniqHeaders" :key="idx" class="q-mr-md">
      {{ field }}
    </q-badge>
  </q-page>
</template>

<script>
import Papa from 'papaparse'

export default {
  data () {
    return {
      isDrag: null,
      csvData: [],
      headers: [],
      fileNames: []
    }
  },
  computed: {
    csvLen: function () {
      return this.csvData.length
    },
    uniqHeaders: function () {
      return this.headers.filter((x, i, self) => self.indexOf(x) === i)
    }
  },
  created () {
  },
  methods: {
    reset () {
      this.csvData = []
      this.headers = []
      this.uniqHeaders = []
    },
    download () {
      // this.uniqHeaders = this.headers.filter((x, i, self) => self.indexOf(x) === i)
      const csv = Papa.unparse({
        'fields': this.uniqHeaders,
        'data': this.csvData
      })
      const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
      const DataBlob = new Blob([bom, csv], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(DataBlob)
      link.download = 'nipocon.csv'
      link.click()
    },
    checkDrag (event) {
      // console.log(event)
    },
    onDrop (event) {
      console.log(event)
      // let fileList = event.target.files ? event.target.files : event.dataTransfer.files
      const fileList = event.dataTransfer.files
      // ファイル配列（もどき）をループで１件づつよみこみます
      Array.from(fileList).forEach(file => {
        console.log(file)
        if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
          Papa.parse(file, {
            header: true,
            complete: result => {
              this.fileNames.push(file.name)
              result.data.forEach(row => {
                this.csvData.push(row)
              })
              result.meta.fields.forEach(row => {
                this.headers.push(row)
                console.log(this.headers)
              })
            }
          })
        } else {
          this.$q.notify({ message: `${file.name}はCSVでは無いようです`, color: 'negative', icon: 'warning', actions: [ { label: '閉じる', color: 'white' } ] })
        }
      })
    }
  }
}
</script>
