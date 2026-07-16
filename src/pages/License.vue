<template>
  <q-page padding class="limit-width-xs">
    <q-card class="rooms q-pa-md">
      <q-card-section class="text-h6 text-bold">オープンソース・ソフトウェア・ライセンス</q-card-section>
      <q-card-section>CSVSCの作成に使用したオープンソース・ソフトウェアのライセンスです</q-card-section>
      <q-separator />
      <q-list separator>
        <q-item v-for="item in licenseItems" :key="item.key">
          <q-item-section>
            <q-item-label class="text-weight-medium">{{ item.packageName }}</q-item-label>
            <q-item-label caption>Version {{ item.version }} / {{ item.licenses }}</q-item-label>
            <q-item-label v-if="item.publisher" caption>Publisher: {{ item.publisher }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="item.repository" side>
            <q-btn flat dense color="primary" icon="open_in_new" label="Repository" tag="a" target="_blank" :href="item.repository" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import licenseMap from '@/components/thanks2.json'

type LicenseInfo = {
  licenses?: string
  repository?: string
  publisher?: string
}

type LicenseItem = {
  key: string
  packageName: string
  version: string
  licenses: string
  repository: string
  publisher: string
}

const licenseItems: LicenseItem[] = Object.entries(licenseMap as Record<string, LicenseInfo>)
  .map(([key, info]) => {
    const matched = key.match(/(.+)@(.+)$/)
    return {
      key,
      packageName: matched?.[1] ?? key,
      version: matched?.[2] ?? '-',
      licenses: info.licenses ?? '-',
      repository: info.repository ?? '',
      publisher: info.publisher ?? '',
    }
  })
  .sort((a, b) => a.packageName.localeCompare(b.packageName))
</script>
