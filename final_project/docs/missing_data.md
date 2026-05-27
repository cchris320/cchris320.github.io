# 缺資料紀錄

> 更新日期：2026-05-25  
> 目的：只記錄目前仍缺、待查證、或可擴充的資料，不混入已完成素材。

## 目前已完整

- 放鬆模式保留的 36 筆方法已完整。
- `methodsData` 檢查結果：36 筆都有步驟、安全提醒、參考來源。
- `images/1.png` 到 `images/36.png` 已接入 final project。
- `images/webp/1.webp` 到 `images/webp/36.webp` 已建立，PNG 保留 fallback。
- `sourceLibrary` / `methodSourceRefs` 目前能覆蓋所有保留方法。
- SVG 中每個可選部位目前都至少有 1 種放鬆方法。
- `abdomen`、`obliques` 已採用低風險徒手方法：腹式呼吸、溫和側彎伸展。

## 真正缺資料

### 放鬆模式示範圖缺口

目前放鬆模式 36 筆方法都已有示範圖、步驟、安全提醒與可信來源。

### 健身模式示範素材

目前三個健身動作有文字步驟、常見錯誤、目標肌群、MediaPipe form check，但沒有示範圖或影片。

| key | 動作 | 目前狀態 | 建議補法 |
|-----|------|----------|----------|
| `biceps_curl` | 二頭彎舉 | `image: ''`，目前也未在卡片中渲染示範媒體 | 補靜態圖或短影片 |
| `triceps_extension` | 三頭肌伸展 | `image: ''`，目前也未在卡片中渲染示範媒體 | 補靜態圖或短影片 |
| `shoulder_press` | 肩推 | `image: ''`，目前也未在卡片中渲染示範媒體 | 補靜態圖或短影片 |

### 健身模式可信來源

健身模式目前沒有像放鬆模式一樣顯示「參考來源」。

| 範圍 | 目前狀態 | 建議補法 |
|------|----------|----------|
| 三個健身動作文字 | 已有內容，但未建立 source refs | 補 `fitnessSourceLibrary` 或共用 `sourceLibrary` |
| MediaPipe form check 判斷規則 | 已有基礎規則，但未附來源或設計說明 | 補一份 `fitness_form_check_notes.md`，記錄角度/高度判斷只是輔助提示，不是醫療或教練級評分 |

## 已移出、待查證後再回補

以下 8 筆先前已從網頁移出，原因是缺少直接可信依據或安全定位較敏感。

| key | 原方法 | 缺口 |
|-----|--------|------|
| `hip_flexor.band` | 彈力帶輔助髖屈伸展 | 需要物理治療/復健來源支撐 |
| `chest.ball` | 胸前肌肉靠牆按摩球 | 胸前按壓位置敏感，需要更明確安全來源 |
| `rhomboids.gun` | 筋膜槍低強度肩胛間放鬆 | 接近脊椎與骨性結構，需要更明確來源 |
| `shoulder.band` | 彈力帶肩關節活動 | 原動作偏 mobility，可改成更常見復健動作 |
| `shoulder.ball` | 三角肌外側靠牆按摩球 | 缺少直接可信教材支撐 |
| `quadriceps.ball` | 股直肌深層按摩球 | 深層按壓定位需更明確來源 |
| `lats.ball` | 腋下後方按摩球放鬆 | 靠近腋下與肋骨，需要更明確安全教材 |
| `triceps.ball` | 三頭肌按摩球放鬆 | 缺少直接可信教材支撐 |

## 可擴充但不算缺

這些是「使用者選了某器材但該肌群沒有可信方法」時會被略過的組合。系統已用「尚未建立可信內容」提示處理，不影響目前核心流程。

| 肌群 | 可補但目前不必要 |
|------|------------------|
| `neck` | roller, band, gun |
| `trapezius` | band |
| `chest` | ball, band, gun |
| `shoulder` | band, ball, roller, gun |
| `biceps` | roller, ball, band, gun |
| `triceps` | ball, roller, band, gun |
| `forearm` | band, gun |
| `rhomboids` | gun, roller, band |
| `lats` | ball, band, gun |
| `lower_back` | band, gun |
| `hip_flexor` | band, ball, roller, gun |
| `glutes` | band, gun |
| `quadriceps` | ball, band, gun |
| `hamstrings` | ball, gun |
| `calf` | gun |

## 建議優先順序

1. 補健身模式三個動作的示範素材。
2. 補健身模式參考來源與 form check 設計說明。
3. 若要擴充放鬆模式，再從已移出的 8 筆開始查可信來源。
4. 其他「器材 × 肌群」組合等核心展示穩定後再補。
