# 肌肉放鬆指南 — 開發任務批次

> **專案**：`muscle_relax.html`
> **方向對齊**：見 `direction_v2.md` / `project_plan.html`
> **目前策略**：C-lite，放鬆模式完整交付 + 健身模式骨架 + 1 個 MediaPipe form check demo。
> **執行原則**：每批做完先測試確認沒壞，再進下一批。

---

## 已完成批次

### Batch 1：重構資料結構

**狀態**：已完成

**完成內容**：

- 新增 `methodsData`。
- 新增 `symptomMap`。
- `showMethods()` 改成從資料物件產生卡片。
- 未填資料時 fallback 顯示「內容準備中」。

### Batch 2：填核心肌群內容 + 全站安全提醒

**狀態**：已完成

**完成內容**：

- 已補 7 個高頻痛點肌群內容：
  - `neck`
  - `trapezius`
  - `lower_back`
  - `glutes`
  - `hamstrings`
  - `calf`
  - `forearm`
- 每群至少 2-3 種器材組合。
- 加入頂部安全提醒。
- 用語避免「治療、矯正、根治、保證」等療效宣稱。

### Batch 3：症狀快選入口 + 使用建議

**狀態**：已完成

**完成內容**：

- 新增症狀快選入口。
- 症狀對應肌群會高亮第一肌群，其他相關肌群淡色標示。
- 手動點選肌肉時會清除症狀模式標示。
- 方法區底部新增使用建議。

### Batch 4：卡片美化 + GIF 整合骨架

**狀態**：已完成

**完成內容**：

- 方法卡片改為分區版型：
  - 標題列
  - GIF / 佔位區
  - 步驟
  - 建議時間
  - 注意事項
- 無 GIF 時顯示灰色佔位。
- 已建立 `assets/` 資料夾。

---

## 方向修正紀錄

### 原 Batch 5：MediaPipe 姿勢分析推薦痛點

**狀態**：取消作為產品方向，待移除或重構。

**原因**：

- 姿勢不等於疼痛。
- 容易造成過度健康判斷。
- MediaPipe 更適合做骨架偵測與動作姿勢檢查。

**處理策略**：

- 不再把 MediaPipe 放在放鬆模式作為痛點推薦入口。
- 既有 MediaPipe 程式可保留為技術素材，但後續要移到健身模式 form check。

---

## 待做批次

## Batch 5：放鬆模式按壓位置確認 + 相鄰肌群

**目標**：讓使用者在看方法卡片後確認是否選對位置；若感覺不對，提供相鄰肌群重新選擇。

**檔案**：`muscle_relax.html`

### 要做的事

1. 新增 `neighborMap`：

```js
const neighborMap = {
    neck:       ['trapezius', 'shoulder'],
    trapezius:  ['neck', 'rhomboids', 'shoulder'],
    shoulder:   ['trapezius', 'chest', 'biceps'],
    rhomboids:  ['trapezius', 'lats'],
    lats:       ['rhomboids', 'lower_back'],
    lower_back: ['glutes', 'hip_flexor', 'lats'],
    glutes:     ['lower_back', 'hip_flexor', 'hamstrings'],
    hip_flexor: ['quadriceps', 'glutes'],
    hamstrings: ['glutes', 'calf'],
    quadriceps: ['hip_flexor', 'calf'],
    calf:       ['hamstrings', 'quadriceps'],
    forearm:    ['biceps', 'triceps'],
    biceps:     ['shoulder', 'forearm', 'triceps'],
    triceps:    ['shoulder', 'forearm', 'biceps']
};
```

2. 在每張放鬆方法卡片底部新增「按壓位置確認」：

> 按壓或伸展這個區域時，是否有痠、緊、可忍受的不適感？

3. 按鈕：

- `位置正確`：顯示「可依步驟繼續放鬆」。
- `感覺不對`：展開相鄰肌群按鈕。

4. 點相鄰肌群按鈕時：

- 呼叫 `selectMuscle(muscleId)`。
- 清除目前器材選擇。
- 使用者重新選器材後再看方法。

**驗收**：

- 卡片內能完成位置確認。
- 按「感覺不對」才顯示相鄰肌群。
- 相鄰肌群按鈕可導回既有流程。

---

## Batch 6：模式切換 + 健身模式骨架

**目標**：建立「放鬆 / 健身」雙模式架構。放鬆模式維持現有完整流程；健身模式先有骨架與資料結構。

**檔案**：`muscle_relax.html`

### 要做的事

1. 在頁面上方新增模式切換：

- `放鬆模式`
- `健身模式`

2. 預設進入放鬆模式。

3. 健身模式 UI 初版：

- 動作選擇區作為主入口。
- SVG 作為目標肌群預覽，不作為健身模式主入口。
- 滑過或選中動作時，高亮 SVG 中的目標肌群。
- 動作教學卡片。
- MediaPipe form check 區塊先保留入口。

4. 新增 `exercisesData`：

```js
const exercisesData = {
    biceps_curl: {
        title: '二頭彎舉',
        targetMuscles: ['biceps', 'forearm'],
        equipment: ['dumbbell', 'band'],
        steps: [],
        commonMistakes: [],
        caution: '',
        image: '',
        formChecks: ['elbow_stability', 'curl_range']
    }
};
```

目前已先放入兩個動作，方便驗證 SVG 目標肌群切換：

- `biceps_curl`：二頭彎舉，高亮二頭肌與前臂。
- `triceps_extension`：三頭肌伸展，高亮三頭肌與肩部。

5. 既有 MediaPipe 痛點推薦 UI 不再顯示於放鬆模式。

**驗收**：

- 可切換放鬆 / 健身模式。
- 放鬆模式現有功能不受影響。
- 健身模式可顯示二頭彎舉與三頭肌伸展教學卡片。
- 滑過或選中不同動作時，SVG 會切換高亮對應目標肌群。

---

## Batch 7：MediaPipe 三動作 form check demo

**目標**：把 MediaPipe 用在健身模式，支援目前三個健身動作的基礎姿勢檢查。

**檔案**：`muscle_relax.html`（後續可拆 `fitness_pose.js`）

### 部署前提

MediaPipe 與 `getUserMedia` 需要 **HTTPS 或 localhost**。

- 開發：`python -m http.server 8000`
- Demo：GitHub Pages

### 要做的事

1. 保留 MediaPipe Pose Landmarker 載入邏輯。
2. 健身模式中新增「啟動姿勢檢查」。
3. 針對三個動作做基礎檢查：

- `biceps_curl`：手肘穩定度、彎舉幅度。
- `triceps_extension`：手肘穩定度、伸展幅度。
- `shoulder_press`：上推高度、手肘路徑穩定度。

4. 回饋文字：

- 「手肘保持穩定」
- 「手肘移動太多，試著固定在身體側邊」
- 「動作幅度不足，手腕上抬與放下角度需要更明顯」

5. 提供關閉攝影機按鈕。

**驗收**：

- localhost / GitHub Pages 可開啟攝影機。
- 三個健身動作都能看到 form check 回饋。
- 放鬆模式不再出現「姿勢分析推薦痛點」。

---

## Batch 8：收尾與展示準備

**目標**：整理展示體驗與部署細節。

**要做的事**：

1. 補 GIF 或示範佔位素材。
2. 測試桌機與手機版面。
3. 更新 `project_plan.html` 與簡報用敘事。
4. 部署 GitHub Pages。
5. 確認攝影機功能在 HTTPS 下正常。
6. 內容來源清理：先移出缺少可信依據的放鬆方法，待查證後再回補。

**目前內容查證進度**：

- 已從網頁移出 8 筆來源不足或風險定位較高的項目。
- `methodsData` 目前保留 34 筆放鬆方法。
- 方法卡已新增「參考來源」區塊，34 筆保留方法都有來源對應。
- 步驟 3 已改為「最推薦方法」主視圖；多選器材時依 `methodPriority` 顯示 1 張主卡，其餘可信方法收合到「其他可用方法」。
- 步驟 2 已加入器材可用性防呆：選定部位後，沒有可信內容的器材會灰色停用；若資料狀態仍進到不可用組合，步驟 3 會 fallback 到該部位最安全的已查證方法。
- Claude review 後已完成展示前 quick fixes：修正拆分版 SVG 載入提示亂碼、補「腹部與側腹緊繃」症狀快選、MediaPipe tasks-vision 鎖定 `0.10.3`、新增攝影機本機處理隱私說明、示範圖加入 lazy loading。
- MediaPipe pose landmarker lite `.task` 模型已改為本地 `assets/models/pose_landmarker_lite.task`，避免展示時依賴模型 latest URL。
- 腹部與側腹示範圖已補上：`abdomen.hands` 使用 `images/35.png`，`obliques.hands` 使用 `images/36.png`。
- 示範圖已新增 WebP 壓縮版並保留 PNG fallback；36 張 WebP 合計約 0.84 MB。
- 健身模式三個動作已補上靜態示意圖與 WebP fallback：`biceps_curl`、`triceps_extension`、`shoulder_press`。
- 健身模式版面已改為「視覺左、文字右」：上方動作按鈕橫跨整列，左欄放示範圖與目標肌群 SVG，右欄保留文字步驟。
- 健身 form check 已加入攝影機骨架疊圖，會在畫面上標示肩、肘、腕與上半身連線。
- 健身 form check 區已新增攝影機入鏡提示；`docs/fitness_form_check_notes.md` 已記錄判斷原則、目前閾值與限制。
- 已補強展示可信度與可近用性：頁尾加入製作/更新/版本資訊，安全警語加入孕期、術後、慢性疾病等族群提醒，器材未開放狀態加入文字標籤，按壓位置確認加入相鄰肌群原因提示。
- 健身 form check 已改為自動選擇較清楚的一側手臂，並加入骨架顏色圖例；未偵測到上半身或手臂時會顯示醒目提示卡。
- 健身 form check 的手肘穩定度已改用修剪後滑動視窗、手肘相對肩膀位移與上半身尺度正規化，降低單一壞幀、側身與身體晃動造成的誤警告。
- 健身 form check 已明確限定正面操作：保留完整上半身骨架 overlay，不再嘗試自動判斷側身或遮擋；側身時可能出現 MediaPipe 推測點，使用者需正面面向鏡頭。
- 健身 form check 已新增側身警示：連續多幀偵測到身體偏側時提示使用者轉向正面；攝影機預覽也改為顯示完整 video frame，避免 CSS 裁切造成畫面和 MediaPipe 分析範圍不一致。
- 程式命名已從 `gif` 欄位整理為 `image` 欄位；SVG 肌肉 path 支援鍵盤 Enter/Space 選取，模式切換補上 tab aria 狀態。
- GIF 製作工作區已建立：`assets/gif_work/gif_storyboard.html` 與 `assets/gif_work/gif_review.md`。
- 第一批草稿先做 3 個徒手動作：`hip_flexor.hands`、`chest.hands`、`calf.hands`；確認品質後再輸出正式檔到 `assets/gifs/`。
- 方向已從動態 GIF 改為靜態示範圖；正式圖片放在 `images/`。
- 已接上 11 張通過示範圖：`hip_flexor.hands`、`chest.hands`、`calf.hands`、`neck.hands`、`shoulder.hands`、`hamstrings.hands`、`quadriceps.hands`、`glutes.hands`、`lower_back.hands`、`forearm.hands`、`triceps.hands`。
- 微動態測試先拿 `calf.hands` 試作；來源圖與 Gemini prompt 放在 `assets/motion_work/`，通過審核前不接正式網頁。
- 靜態示範圖 `images/1.png` 到 `images/34.png` 已完成生成與複查；按摩球類改採中近景側面/局部構圖，其中 `30.png` 以完全側面呈現牆、球、上背關係。
- `assets/image_work/` 內臨時 prompt / 待調整 md 已清除，只保留參考圖。
- `muscle_relax.html` 已接上全部 34 張放鬆模式示範圖；`methodsData` 目前每筆保留方法都有對應圖片。
- 已為 SVG 中的 `abdomen`、`obliques` 補上低風險徒手方法：腹式呼吸、溫和側彎伸展；放鬆模式目前 36 筆都有步驟、安全提醒與參考來源。
- 目前缺資料已整理到 `missing_data.md`；放鬆模式示範圖與健身示意圖已補齊，主要剩健身動作來源紀錄，以及已移出的 8 筆待查證方法。
- 詳細清單見 `content_review.md`。

---

## 進度追蹤

- [x] Batch 1 — 重構資料結構
- [x] Batch 2 — 填核心肌群內容 + 全站安全提醒
- [x] Batch 3 — 症狀快選入口 + 使用建議
- [x] Batch 4 — 卡片美化 + GIF
- [ ] 原 Batch 5 — MediaPipe 姿勢分析推薦痛點（取消/待重構）
- [x] Batch 5 — 放鬆模式按壓位置確認 + 相鄰肌群
- [x] Batch 6 — 模式切換 + 健身模式骨架
- [x] Batch 7 — MediaPipe 三動作 form check demo
- [ ] Batch 8 — 收尾與展示準備

---

## 共用詞彙表

| key | 中文 |
|-----|------|
| `hands` | 徒手 |
| `roller` | 滾筒 |
| `ball` | 按摩球 |
| `band` | 彈力帶 |
| `gun` | 筋膜槍 |

**肌群 key**：見 `muscle_relax.html` 內 `muscleMap` 與 `muscleNames`。
