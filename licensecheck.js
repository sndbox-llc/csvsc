import { execSync } from 'node:child_process'
import fs from 'node:fs'

const filePath = './src/components/thanks2.json'

// semver風のバージョンを比較する (a > b なら 1、同値なら 0、a < b なら -1)
const compareVersions = (a, b) => {
  const pa = String(a).split(/[.-]/)
  const pb = String(b).split(/[.-]/)
  const len = Math.max(pa.length, pb.length)

  for (let i = 0; i < len; i++) {
    const va = pa[i] ?? '0'
    const vb = pb[i] ?? '0'
    const na = Number(va)
    const nb = Number(vb)
    const isNa = Number.isNaN(na)
    const isNb = Number.isNaN(nb)

    if (!isNa && !isNb) {
      if (na > nb) return 1
      if (na < nb) return -1
      continue
    }

    const cmp = va.localeCompare(vb)
    if (cmp !== 0) return cmp > 0 ? 1 : -1
  }

  return 0
}

// 元情報となるライセンス一覧のJSONを出力
try {
  execSync(`license-checker --production --json > ${filePath}`, { stdio: 'inherit' })
} catch (error) {
  console.error('license-checker の実行に失敗しました。')
  console.error(error)
  process.exit(1)
}

// 出力されたJSONファイルを読み込む
const licenses = JSON.parse(fs.readFileSync(filePath, 'utf8'))
const licenseKeys = Object.keys(licenses)
const newLicenses = {}
const versions = {}
const lsc = {}

licenseKeys.forEach((key) => {
  const license = licenses[key]
  lsc[license.licenses] = lsc[license.licenses] + 1 || 1
  delete license.path
  delete license.licenseFile
  delete license.email
  delete license.url
  // 自作ライブラリ(private=true)を除外
  if (!license.private) {
    const tmp = key.match(/(.+)@(.+)$/)
    if (!tmp) {
      return
    }
    const name = tmp[1]
    const version = tmp[2]
    if (!Object.hasOwn(versions, name)) {
      newLicenses[key] = license
      versions[name] = version
    } else if (compareVersions(versions[name], version) < 1) {
      // 重複している場合、最新バージョンのみ含める
      delete newLicenses[`${name}@${versions[name]}`]
      newLicenses[key] = license
      versions[name] = version
    }
  }
})
console.log(lsc)

fs.writeFileSync(filePath, JSON.stringify(newLicenses, null, 4))
