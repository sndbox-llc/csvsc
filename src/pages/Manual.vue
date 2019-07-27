<template>
  <q-page padding>
    <div class="text-h5">使い方ガイド</div>
    <div class="text-h6">CSVを連結する</div>
    <div>
      このWebアプリの目的は、複数のCSVファイルを１つのCSVファイルに連結することです。<br>
      手順は次の通りです
      <ul>
        <li><span style="color:blue;cursor:pointer" @click="$router.push({ path: '/'})">CSVSC</span>のメインページへ移動</li>
        <li>連結したいCSVファイルを灰色のエリアにドラッグ＆ドロップする(追加した順に連結されます)</li>
        <li>「CSVダウンロード」ボタンをクリック</li>
      </ul>
    </div>
    <div class="text-h6">免責とか</div>
    <div>
      <ul>
        <li>このシステムは誰でも自由に無料で使用することができます</li>
        <li>数千件を超えるような大容量のCSVファイルはサポートしていません。動くかもしれないし、動かないかもしれません</li>
        <li>CSVSCで作成されたデータにミスがあっても、責任は負いません。ざっと目視で確認してくださいね</li>
        <li>CSVSCは通信を行わず、あなたのブラウザ上でデータを加工します。そのためCSVデータはインターネット回線を通らないから安全性は抜群です</li>
        <li>CSVSCはオープンソースです。誰でもこのシステムの中身を見れるし、再配布することも自由です。コードはGithub上に公開されています。左のサイドメニューからどうぞ</li>
      </ul>
    </div>
    <div>フィールド名について</div>
    複数のCSVファイルを追加するとき、それぞれのCSVファイルに存在するフィールド名に留意してください。フィールド名はとても重要です。
    CSVSCでは、各CSVファイルに同名のフィールド名がある場合、それらを同じフィールドとして同列に書き出します。
    片方にしか存在しないフィールド名の場合や、1文字でも違うフィールドの場合は同列ではなくそれぞれの列に書き出されます。
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
