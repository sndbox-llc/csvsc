<template>
  <q-page padding class="limit-width-xs">
    <q-card class="rooms q-pa-md">
      <q-card-section class="text-h6 text-bold">Contact</q-card-section>
      <q-card-section>ご意見やバグ報告など、なんでもOKです。連絡お待ちしています</q-card-section>
      <q-card-actions>
        <q-btn color="secondary" label="問い合わせフォームへ" @click="gotoWeb()" />
      </q-card-actions>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import thanks from 'components/thanks2.json'
import { openURL } from 'quasar'

export default {
  data () {
    return {
      licenseJson: thanks
    }
  },
  methods : {
    gotoWeb () {
      openURL('https://nipo.sndbox.jp/inquery')
    }
  }
}
</script>
