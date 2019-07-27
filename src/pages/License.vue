<template>
  <q-page padding class="limit-width-xs">
    <q-card class="rooms q-pa-md">
      <q-card-section class="text-h6 text-bold">オープンソース・ソフトウェア・ライセンス</q-card-section>
      <q-card-section>CSVSCの作成に使用したオープンソース・ソフトウェアのライセンスです</q-card-section>
      <div v-for="(license, key) in licenseJson" :key="license.id">
        {{ key }} {{ license.publisher }} ({{ license.licenses }})<br>
        {{ license.repository }}
        <hr>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import thanks from 'components/thanks2.json'

export default {
  data () {
    return {
      licenseJson: thanks
    }
  }
}
</script>
