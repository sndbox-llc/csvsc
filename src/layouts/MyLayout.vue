<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <q-btn flat @click="$router.push({ path: '/' })">CSVSC</q-btn>
        </q-toolbar-title>

        <div>Version 0.0.6</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>CSVSCについて</q-item-label>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>CSVSC</q-item-label>
            <q-item-label caption>連結するページ</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/manual">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>使い方</q-item-label>
            <q-item-label caption>How to use</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/ueda19850603/csvsc">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>open source</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/contact">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>連絡先</q-item-label>
            <q-item-label caption>バグの報告やご要望があれば</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://nipo-plus-doc.sndbox.jp/">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>スポンサー</q-item-label>
            <q-item-label caption>Nipo Plus</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(true)
</script>
