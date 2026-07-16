<template>
  <q-page padding class="limit-width-xs">
    <q-card class="rooms q-pa-md">
      <q-card-section class="text-h6 text-bold">スポンサー: Nipo Plus</q-card-section>
      <q-card-section> Nipo Plusは、現場向けの記録や情報共有を助ける日報Webサービスです。CSVSCはNipoPlusで日報データを連結するために作られました。 </q-card-section>
      <q-card-section> サービスの詳細や導入情報は、以下の公式ページをご覧ください。 </q-card-section>
      <q-card-actions>
        <q-btn color="secondary" label="Nipo Plus公式ページへ" @click="gotoNipoPlus()" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { openURL } from 'quasar'

function gotoNipoPlus() {
  openURL('https://nipo-plus-doc.sndbox.jp/')
}
</script>
