<template>
  <q-page padding>
    <div class="q-ma-xl text-center bg-grey" style="height:300px" @dragover.prevent="dragFlg = true" @dragleave.prevent="dragFlg = false" @drop.prevent="getFile">
      <p class="text-white text-bold q-pt-xl text-h6">ここにCSVファイルをドロップ</p>
    </div>
    <div v-if="uniqHeaders.length !== 0">
      <div class="text-center">
        <q-btn-group>
          <q-btn color="primary" label="リセット" outline @click="reset()" />
          <q-btn color="primary" label="CSVダウンロード" @click="download()" />
        </q-btn-group>
      </div>
      <div class="text-bold">総レコード数</div>
      {{ csvLen }}件
      <div class="text-bold">連結対象のファイル</div>
      <q-badge v-for="(fileName, index) in fileNames" :key="index + 'file'" class="q-mr-md">
        {{ fileName }}
      </q-badge>

      <div class="text-bold">項目リスト</div>
      <q-table :rows="csvData" :columns="tableColumns" dense separator="cell" :rows-per-page-options="[0]">
        <template #body-cell="props">
          <q-td :props="props" :class="(props.row.fileIndex % 2 === 0)?'bg-blue-10 text-white':'bg-white text-black'">
            {{ props.value }}
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import Papa from 'papaparse'
import { Notify, QTableColumn } from 'quasar'
interface csvDataIF {
  [key: string]: string | number
}
export default defineComponent({
  setup () {
    const csvData = ref<csvDataIF[]>([])
    const headers = ref<string[]>([])
    const fileNames = ref<string[]>([])
    const dragFlg = ref(false)
    /** 追加したファイルのインデックス。主にテーブルの色分けに使用する */
    const fileIndex = ref(0)
    const setting = ref({
      cutFirstLine: true,
      delimita: ','
    })
    const csvLen = computed(() => csvData.value.length)
    const uniqHeaders = computed(() => { return Array.from(new Set(headers.value)) })
    const tableColumns = computed(() => {
      return uniqHeaders.value.map(i => {
        const col: QTableColumn = {
          name: i,
          label: i,
          field: i,
          align: 'left'
        }
        return col
      })
    })

    /**
     * リセット
     */
    function reset () {
      csvData.value = []
      headers.value = []
      fileNames.value = []
      fileIndex.value = 0
    }
    /**
     *
     */
    function download () {
      const csv = Papa.unparse({
        fields: uniqHeaders.value,
        data: csvData.value
      })
      const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
      const DataBlob = new Blob([bom, csv], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(DataBlob)
      link.download = 'nipocon.csv'
      link.click()
    }

    /**
     * ファルドロップ時の処理
     */
    async function getFile (event: DragEvent) {
      // const fileList = event.dataTransfer.files
      if (!event) { Notify.create({ message: 'エラーです' }); return }
      if (!event.dataTransfer) { Notify.create({ message: 'エラーです' }); return }
      const fileList = event.dataTransfer.files

      Array.from(fileList).forEach(file => {
        fileNames.value.push(file.name)

        if ((file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') === false) { Notify.create({ message: `${file.name}はCSVでは無いようです` }); return }
        Papa.parse(file, {
          header: true,
          complete (result) {
          // complete: result => {
            console.log(result)
            result.data.forEach((row) => {
              console.log(row)
              csvData.value.push({ ...row as csvDataIF, fileIndex: fileIndex.value })
            })
            result.meta.fields?.forEach(row => {
              headers.value.push(row)
            })
            fileIndex.value++
          }
        })
      })
    }

    /**
     * CSV以外がセットされたときの処理
     */
    function rejected () { Notify.create({ message: 'CSVファイルを指定して下さい' }) }

    return {
      rejected,
      getFile,
      setting,
      tableColumns,
      dragFlg,
      // checkDrag,
      csvData,
      csvLen,
      download,
      fileNames,
      // onDrop,
      reset,
      uniqHeaders
    }
  }
})
</script>

<style scoped>
.droparea {
  width: 80%;
  height: 400px;
  line-height: 100px;
  color: red;

}
</style>
