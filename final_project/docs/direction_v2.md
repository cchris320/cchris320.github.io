# 肌肉放鬆指南 — 方向討論整合 v2

> **目的**：記錄 2026-05-19 確認後的產品方向、技術定位與後續批次。
> **狀態**：已決定採用「雙模式架構」：放鬆模式完整交付，健身模式作為 MediaPipe 技術延伸。

---

## 一、最終定位

本專案不是「AI 診斷疼痛」，而是 **互動式健康自我照護工具**。

分成兩個模式：

1. **放鬆模式**
   - 使用者主動選痛點或症狀。
   - 系統提供對應肌群的放鬆方法。
   - 透過「按壓位置確認」協助使用者修正選錯肌群的情況。

2. **健身模式**
   - 使用者選擇訓練動作。
   - MediaPipe 用於骨架偵測與基礎 form check。
   - 不用 MediaPipe 判斷病痛來源。

---

## 二、為什麼放棄「MediaPipe 診斷痛點」

原想法是「MediaPipe 姿勢分析 → 推薦痛點」，但這個方向不適合作為核心功能。

| 面向 | 問題 |
|------|------|
| 臨床合理性 | 姿勢歪不代表一定疼痛；痛點可能來自睡姿、舊傷、過度使用或壓力。 |
| 產品責任 | 網頁告訴使用者「你哪裡痛」容易變成過度健康判斷。 |
| 展示風險 | 評審可合理追問：「我駝背但不痛，為什麼推薦背部？」 |
| 技術風險 | 攝影機、模型載入、角度與判斷邏輯都不適合作為核心流程。 |

**結論**：MediaPipe 不做診斷，改放在它更擅長的「骨架追蹤、角度判斷、動作姿勢輔助」。

---

## 三、放鬆模式核心流程

```
1. 使用者主動選痛點
   - SVG 肌肉圖
   - 症狀快選
        ↓
2. 選器材
   - 徒手 / 滾筒 / 按摩球 / 彈力帶 / 筋膜槍
        ↓
3. 查看放鬆方法卡片
   - GIF / 步驟 / 建議時間 / 注意事項
        ↓
4. 按壓位置確認
   問：「按壓或伸展這個區域時，是否有痠、緊、可忍受的不適感？」
   - 是：繼續放鬆
   - 否：顯示相鄰肌群，讓使用者重新選擇
```

設計原則：

- 使用者主導，不做診斷。
- 按壓位置確認放在方法卡片內，不獨立成第 4 步，避免重排既有三步驟 UI。
- 相鄰肌群只在使用者按「感覺不對」後顯示，避免一開始資訊過多。

---

## 四、相鄰肌群對應表

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

---

## 五、健身模式與 MediaPipe 新定位

MediaPipe 的定位改為：

> 偵測骨架 landmarks → 做健身動作 form check

不再是：

> 偵測姿勢 → 推薦你哪裡痛

健身模式初版建議：

- 先做 **二頭彎舉** demo。
- 原因：
  - 只需要上半身入鏡，展示穩定度比深蹲或棒式高。
  - 主要依賴肩、手肘、手腕 landmarks，MediaPipe 較容易判斷。
  - 可做出清楚的 form check 回饋。

初版 form check 項目：

1. 手肘是否大幅前後移動。
2. 手腕是否完成上抬 / 放下角度變化。

暫不做：

- 膝蓋方向判斷。
- 核心出力判斷。
- 疼痛來源推測。
- 按壓位置正確性判斷。

---

## 六、雙模式架構

```
                    模式切換：放鬆 / 健身
                              ↓
              ┌───────────────┴───────────────┐
              ↓                               ↓
          放鬆模式                          健身模式
    ┌──────────────────┐              ┌──────────────────┐
    │ 1. 選痛點         │              │ 1. 選訓練動作     │
    │ 2. 選器材         │              │ 2. 看動作教學     │
    │ 3. 看放鬆方法     │              │ 3. 啟動攝影機     │
    │ 4. 按壓位置確認   │              │ 4. MediaPipe form check │
    └──────────────────┘              └──────────────────┘
```

共用設計：

- SVG 肌肉圖概念。
- 卡片版型。
- GIF / 示範區。
- 安全提醒。
- 資料驅動結構。

資料結構對應：

```js
methodsData = {
    muscleKey: {
        equipKey: { title, steps, duration, caution, gif, pose_target }
    }
};

exercisesData = {
    exerciseKey: {
        title,
        targetMuscles,
        equipment,
        steps,
        commonMistakes,
        caution,
        gif,
        formChecks
    }
};
```

---

## 七、採用路線

採用 **C-lite：放鬆完整 + 健身骨架 + 1 個 MediaPipe demo**。

| 路線 | 結論 | 原因 |
|------|------|------|
| A. 專心放鬆 | 不選 | 穩但技術亮點較弱。 |
| B. 雙模式完整 | 不選 | 2.5 週內風險太高，容易半成品。 |
| C-lite | 採用 | 放鬆模式能完整交付，健身模式提供清楚技術延伸。 |

簡報敘事：

> 我們一開始考慮用 MediaPipe 推薦痛點，但姿勢不等於疼痛，這會造成過度判斷。因此最後改成雙模式：放鬆模式由使用者主動選痛點並確認按壓位置；健身模式則使用 MediaPipe 做它真正擅長的骨架偵測與姿勢檢查。

---

## 八、目前完成狀態

已完成：

- Batch 1：資料結構重構（`methodsData` / `symptomMap`）。
- Batch 2：7 個高頻肌群內容 + 全站安全提醒。
- Batch 3：症狀快選入口 + 使用建議。
- Batch 4：卡片美化 + GIF 整合骨架。

需要重新定義：

- 原 Batch 5「MediaPipe 姿勢分析推薦痛點」不再作為產品方向。
- 既有 MediaPipe 程式可保留作為技術素材，但後續應移到健身模式 form check。

---

## 九、下一步

1. 更新 `tasks.md`：重排後續批次。
2. 更新 `project_plan.html`：改成雙模式方向。
3. 實作放鬆模式的按壓位置確認與相鄰肌群推薦。
4. 新增模式切換與健身模式骨架。
5. 將 MediaPipe 改造成二頭彎舉 form check demo。
