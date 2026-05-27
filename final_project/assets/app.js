async function loadBodyMap() {
    const wrapper = document.getElementById('svg-wrapper');
    if (!wrapper) return;

    try {
        const response = await fetch('assets/body-map.svg');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const svgText = await response.text();
        wrapper.innerHTML = svgText.replace(/<\?xml[^>]*>/, '').trim();
    } catch (error) {
        wrapper.innerHTML = '<div class="svg-loading">肌肉圖載入失敗，請使用 localhost 或 GitHub Pages 開啟此頁。</div>';
        console.error('Body map SVG failed to load:', error);
    }
}

const muscleMap = {
    chest:      ["path847"],
    shoulder:   ["path861"],
    neck:         ["path919","path1751","path2205"],
    biceps:       ["path881"],
    forearm:      ["path908","path928","path998","path1065","path1080","path1725","path1598","path1697","path2254"],
    abdomen:      ["path970","path974","path978","path1012"],
    obliques:     ["path950"],
    hip_flexor:   ["path1100","path1337"],
    quadriceps:   ["path1554","path1366"],
    calf:         ["path1734","path1790","path1848","path3022","path3075","path3216","path3196","path3254"],
    trapezius:    ["path1268"],
    rhomboids:    ["path2085"],
    lats:         ["path2220"],
    triceps:      ["path1513","path1542"],
    lower_back:   ["path3733"],
    glutes:       ["path2744"],
    hamstrings:   ["path2990","path2931","path2900","path2803","path2962"]
};

const methodsData = {
    // muscle_key: { equip_key: { title, steps[], duration, caution, image, pose_target } }
    // Only combinations with real content are stored here. Missing combinations use a fallback card.
    neck: {
        hands: {
            title: '頸部側向伸展',
            steps: [
                '坐姿或站姿，背部打直，肩膀自然放鬆',
                '右手輕放在頭部左側，慢慢讓右耳靠近右肩',
                '感覺左側頸部有溫和伸展感後停留，不要聳肩',
                '回到中間後換邊，過程保持自然呼吸'
            ],
            duration: '15-30 秒 × 2-3 組 / 每側',
            caution: '避免用力拉扯或快速甩頭；若出現麻、刺、暈或放射痛，立即停止。',
            image: 'images/4.png',
            pose_target: null
        },
        ball: {
            title: '枕下肌按摩球放鬆',
            steps: [
                '仰躺，將按摩球放在後腦勺下方靠近髮際線的位置',
                '讓頭部重量輕放在球上，找到緊繃但可忍受的點',
                '小幅度左右點頭或停留呼吸，避免壓到頸椎正中央',
                '換到另一側重複，結束後慢慢起身'
            ],
            duration: '30-45 秒 × 2 回 / 每側',
            caution: '壓力以舒適為主，不要直接壓迫喉嚨、頸椎骨或造成頭暈。',
            image: 'images/12.png',
            pose_target: null
        }
    },
    trapezius: {
        hands: {
            title: '上斜方肌側拉伸',
            steps: [
                '坐姿，單手抓住椅面或放在身側，讓肩膀保持下沉',
                '頭部慢慢往另一側傾斜，感覺肩頸上方被伸展',
                '可微微轉頭看向腋下，調整到最緊繃的位置',
                '停留後慢慢回正，再換邊'
            ],
            duration: '20-30 秒 × 2 組 / 每側',
            caution: '不要硬壓頭部；若肩膀或手臂出現麻刺感，先減少角度或停止。',
            image: 'images/13.png',
            pose_target: null
        },
        ball: {
            title: '牆面斜方肌按摩球放鬆',
            steps: [
                '背對牆站立，將按摩球放在肩胛骨上方到肩頸交界處',
                '用身體微微靠牆調整壓力，不要直接壓在骨頭上',
                '找到緊繃點後停留呼吸，或小幅度上下移動',
                '每次只處理一小區域，再換另一側'
            ],
            duration: '45-60 秒 / 每側',
            caution: '壓力以可放鬆為主；避開頸椎、鎖骨與明顯疼痛點。',
            image: 'images/14.png',
            pose_target: null
        },
        gun: {
            title: '筋膜槍低強度肩頸放鬆',
            steps: [
                '使用最低或低強度，先從肩膀外側肌肉開始',
                '沿斜方肌厚實處慢慢移動，單點不要停太久',
                '保持肩膀放鬆，不要把槍頭壓向頸椎或骨頭',
                '結束後做幾次慢速肩膀繞圈'
            ],
            duration: '30-45 秒 / 每側',
            caution: '不要用在頸部前側、骨頭、急性腫脹或麻痛區域。',
            image: 'images/15.png',
            pose_target: null
        },
        roller: {
            title: '仰躺上背滾筒放鬆',
            steps: [
                '仰躺，將滾筒橫向放於肩胛骨上方（避開頸部）',
                '雙手抱頭支撐頸部，臀部抬離地面',
                '小範圍前後滾動，處理上斜方肌與肩胛骨上緣',
                '動作緩慢，過程保持呼吸'
            ],
            duration: '30-60 秒',
            caution: '不要讓滾筒滾到頸部；下背不適時降低臀部高度。',
            image: 'images/16.png',
            pose_target: null
        }
    },
    lower_back: {
        hands: {
            title: '仰躺抱膝伸展',
            steps: [
                '仰躺，雙膝彎曲，腳掌平放地面',
                '雙手抱住單側膝蓋，慢慢往胸口方向靠近',
                '保持肩膀與下背放鬆，感覺下背與臀部有溫和伸展',
                '放回地面後換邊，也可雙膝一起抱向胸口'
            ],
            duration: '15-30 秒 × 2-3 組',
            caution: '不要憋氣或硬拉；若疼痛往腿部放射，請停止並尋求專業評估。',
            image: 'images/9.png',
            pose_target: null
        },
        ball: {
            title: '下背旁肌牆面按摩球放鬆',
            steps: [
                '背對牆站立，將球放在脊椎旁邊的肌肉，不壓脊椎正中央',
                '膝蓋微彎，用身體靠牆控制壓力',
                '找到緊繃點後停留呼吸，或小幅度上下移動',
                '左右兩側分開處理，避免一次壓太久'
            ],
            duration: '30-45 秒 × 2 回 / 每側',
            caution: '避開脊椎骨、腎臟附近與劇痛點；急性拉傷或不明原因疼痛時不要按壓。',
            image: 'images/17.png',
            pose_target: null
        },
        roller: {
            title: '臀上緣滾筒放鬆',
            steps: [
                '坐在滾筒上，讓滾筒位於臀部上緣，不直接壓腰椎',
                '雙手撐地，身體略往單側傾斜',
                '小範圍前後滾動，找出臀上緣與下背交界的緊繃感',
                '換側重複，動作保持慢速'
            ],
            duration: '30-60 秒 / 每側',
            caution: '不要直接把滾筒壓在下背腰椎上；若越滾越痛，請停止。',
            image: 'images/18.png',
            pose_target: null
        }
    },
    glutes: {
        hands: {
            title: '仰躺 4 字臀部伸展',
            steps: [
                '仰躺，雙膝彎曲，將右腳踝放到左大腿上形成 4 字',
                '雙手抱住左大腿後側，慢慢往胸口方向靠近',
                '保持右膝自然向外，感覺右側臀部被伸展',
                '停留後換邊，過程不要抬肩或憋氣'
            ],
            duration: '20-30 秒 × 2-3 組 / 每側',
            caution: '髖部或膝蓋不適時減少角度；不要用力壓膝蓋。',
            image: 'images/8.png',
            pose_target: null
        },
        roller: {
            title: '坐姿臀部滾筒放鬆',
            steps: [
                '坐在滾筒上，雙手撐地保持平衡',
                '將一側腳踝跨到另一側膝蓋上，身體微微傾向被放鬆的臀部',
                '以前後小範圍滾動找緊繃點',
                '停留呼吸後換邊'
            ],
            duration: '45-60 秒 / 每側',
            caution: '避免滾到尾椎或骨頭；若有坐骨神經症狀，先諮詢專業人員。',
            image: 'images/19.png',
            pose_target: null
        },
        ball: {
            title: '臀部深層按摩球放鬆',
            steps: [
                '靠牆或坐地，將按摩球放在臀部肌肉厚實處',
                '慢慢移動身體找出緊繃點，壓力維持可放鬆的程度',
                '停留 20-30 秒，配合深呼吸',
                '換不同位置或換邊重複'
            ],
            duration: '1-2 分鐘 / 每側',
            caution: '不要追求強烈疼痛感；若麻痛往腿部延伸，請停止。',
            image: 'images/20.png',
            pose_target: null
        }
    },
    hamstrings: {
        hands: {
            title: '坐姿腿後側伸展',
            steps: [
                '坐在地上，一腳伸直，另一腳彎曲放鬆',
                '背部盡量打直，從髖部往前傾，不要先圓背',
                '雙手放在小腿或腳踝附近，停在腿後有伸展感的位置',
                '慢慢回正後換邊'
            ],
            duration: '20-30 秒 × 2-3 組 / 每側',
            caution: '膝蓋可微彎；不要用彈震方式壓腿。',
            image: 'images/6.png',
            pose_target: null
        },
        roller: {
            title: '腿後側滾筒放鬆',
            steps: [
                '坐地，將滾筒放在大腿後側',
                '雙手撐地抬起臀部，慢慢前後滾動',
                '可將身體微微轉向內外側，找不同緊繃區',
                '換腿重複'
            ],
            duration: '30-60 秒 / 每側',
            caution: '避開膝窩正中央；壓力太強時可雙腿同時放在滾筒上降低強度。',
            image: 'images/21.png',
            pose_target: null
        },
        band: {
            title: '彈力帶仰躺腿後伸展',
            steps: [
                '仰躺，將彈力帶或毛巾套在單腳腳掌前端',
                '膝蓋微彎，慢慢將腿抬高到腿後有伸展感',
                '骨盆保持穩定，不要硬把膝蓋鎖死',
                '停留後慢慢放下並換邊'
            ],
            duration: '20-30 秒 × 2 組 / 每側',
            caution: '避免用力拉到麻痛；下背不適時降低抬腿角度。',
            image: 'images/22.png',
            pose_target: null
        }
    },
    calf: {
        hands: {
            title: '牆面小腿伸展',
            steps: [
                '面向牆壁站立，雙手扶牆',
                '一腳往後踩，腳跟貼地，腳尖朝前',
                '前腳微彎，身體慢慢往牆靠近，感覺後腳小腿伸展',
                '後腳膝蓋伸直可偏向腓腸肌，微彎可偏向比目魚肌'
            ],
            duration: '20-30 秒 × 2-3 組 / 每側',
            caution: '不要讓腳跟彈起或腳尖外八太多；阿基里斯腱疼痛時先降低強度。',
            image: 'images/3.png',
            pose_target: null
        },
        roller: {
            title: '小腿滾筒放鬆',
            steps: [
                '坐地，將滾筒放在小腿肚下方',
                '雙手撐地，慢慢讓小腿在滾筒上前後移動',
                '可把另一腳輕放在上方增加壓力，但不要一開始就加重',
                '轉動小腿角度，分別放鬆內外側'
            ],
            duration: '30-60 秒 / 每側',
            caution: '避開膝窩與跟腱末端；若有靜脈曲張或明顯腫脹，先詢問專業人員。',
            image: 'images/23.png',
            pose_target: null
        },
        ball: {
            title: '足底與小腿連動放鬆',
            steps: [
                '站姿或坐姿，將按摩球放在足底',
                '以可控制的壓力前後滾動足底',
                '在較緊繃處停留數秒，再慢慢移動',
                '結束後做牆面小腿伸展，感受小腿後側放鬆'
            ],
            duration: '1 分鐘 / 每側',
            caution: '足底刺痛、麻木或急性發炎時不要按壓。',
            image: 'images/24.png',
            pose_target: null
        },
        band: {
            title: '彈力帶坐姿小腿伸展',
            steps: [
                '坐地，將彈力帶或毛巾套在單腳腳掌前端',
                '另一腳自然彎曲放鬆，背部打直',
                '雙手輕拉彈力帶，慢慢將腳掌往身體方向勾',
                '感覺小腿後側被伸展後停留，再換邊'
            ],
            duration: '20-30 秒 × 2 組 / 每側',
            caution: '膝蓋可微彎，不要鎖死；下背不適時降低拉力。',
            image: 'images/25.png',
            pose_target: null
        }
    },
    forearm: {
        hands: {
            title: '手腕伸肌與屈肌伸展',
            steps: [
                '一手往前伸直，手肘不要鎖死',
                '掌心向下時，另一手輕壓手背，伸展前臂外側',
                '掌心向上時，另一手輕壓手指向下，伸展前臂內側',
                '兩個方向都做，換手重複'
            ],
            duration: '15-30 秒 × 2 組 / 每側',
            caution: '只需溫和拉伸，不要壓到手腕疼痛或麻刺。',
            image: 'images/10.png',
            pose_target: null
        },
        ball: {
            title: '前臂按摩球放鬆',
            steps: [
                '坐在桌前，將前臂放在桌面，按摩球放在前臂肌肉下方',
                '用另一手輕壓前臂，慢慢讓球沿肌肉滾動',
                '掌心朝上與朝下各處理一次',
                '結束後做幾次手腕慢速彎曲與伸直'
            ],
            duration: '45-60 秒 / 每側',
            caution: '避開手肘骨點與手腕關節；若手指麻木或無力，請停止。',
            image: 'images/26.png',
            pose_target: null
        },
        roller: {
            title: '桌面前臂滾筒放鬆',
            steps: [
                '使用小滾筒或水瓶放在桌上，前臂輕放其上',
                '身體微微前後移動，讓前臂肌肉慢慢滾過滾筒',
                '掌心向上處理屈肌群，掌心向下處理伸肌群',
                '每次小範圍操作，換手重複'
            ],
            duration: '30-60 秒 / 每側',
            caution: '不要直接壓手腕關節；打字造成的持續疼痛應搭配休息與姿勢調整。',
            image: 'images/27.png',
            pose_target: null
        }
    },
    abdomen: {
        hands: {
            title: '腹式呼吸放鬆',
            steps: [
                '仰躺或舒適坐姿，膝蓋可微彎，肩頸放鬆',
                '一手放胸口、一手放腹部，先用鼻子慢慢吸氣',
                '吸氣時讓腹部自然鼓起，胸口盡量不要大幅起伏',
                '吐氣時讓腹部自然回落，保持慢而穩的節奏',
                '重複 5-10 次，過程不要憋氣或用力撐肚子'
            ],
            duration: '5-10 次慢呼吸 / 1-2 回',
            caution: '若出現頭暈、胸悶、腹部疼痛、近期腹部手術、疝氣或孕期不適，請停止並諮詢專業人員。',
            image: 'images/35.png',
            pose_target: null
        }
    },
    obliques: {
        hands: {
            title: '溫和側彎伸展',
            steps: [
                '坐姿或站姿，雙腳穩定，背部自然延伸',
                '一手扶腰或放在身側，另一手慢慢往上延伸',
                '身體向對側輕輕側彎，感覺肋骨到骨盆外側有溫和拉伸',
                '保持骨盆穩定，不要向前彎或向後仰',
                '停留後慢慢回正，再換邊'
            ],
            duration: '15-20 秒 × 2 組 / 每側',
            caution: '只做溫和拉伸，不要憋氣或硬壓；若下背、肋骨或腹部出現疼痛，請停止。',
            image: 'images/36.png',
            pose_target: null
        }
    },
    hip_flexor: {
        hands: {
            title: '跪姿髖屈肌伸展',
            steps: [
                '雙膝跪地，將一腳往前踩穩，膝蓋約 90 度',
                '骨盆微微後傾收緊核心，不要凹腰塌腹',
                '身體保持直立，慢慢將重心往前移',
                '感覺後腳髖部前側有伸展感後停留'
            ],
            duration: '20-30 秒 × 2-3 組 / 每側',
            caution: '保持骨盆穩定，不要過度前推到下背不適；膝蓋下方可墊毛巾保護。',
            image: 'images/1.png',
            pose_target: null
        }
    },
    chest: {
        hands: {
            title: '門框胸大肌伸展',
            steps: [
                '站於門框前，單側前臂與手肘抵在門框內側',
                '手肘大約與肩同高，前臂貼門框',
                '一腳往前踏，身體慢慢轉向反方向',
                '感覺胸前肌肉被伸展後停留，可調整手肘高度伸展不同纖維'
            ],
            duration: '20-30 秒 × 2-3 組 / 每側',
            caution: '若肩前側出現疼痛或夾擠感，先降低角度或停止；避免聳肩。',
            image: 'images/2.png',
            pose_target: null
        },
        roller: {
            title: '胸椎開展滾筒放鬆',
            steps: [
                '仰躺，將滾筒橫向放於上背中段（避開頸與下背）',
                '雙手抱頭支撐頸部，或張開呈 T 字',
                '慢慢讓上背順著滾筒方向後仰，感覺胸口打開',
                '回正後可微微移動滾筒處理不同節段'
            ],
            duration: '30-60 秒 × 2-3 回',
            caution: '保護頸椎與腰椎，不要讓滾筒滾到頸部或下背；骨質疏鬆者請先諮詢專業人員。',
            image: 'images/28.png',
            pose_target: null
        }
    },
    rhomboids: {
        hands: {
            title: '擁抱式肩胛伸展',
            steps: [
                '站姿或坐姿，雙手交叉抱住對側肩膀',
                '感覺像擁抱自己，肩胛骨慢慢往外打開',
                '頭部可微微低下，加強上背的伸展感',
                '停留呼吸後放鬆，可重複數次'
            ],
            duration: '20-30 秒 × 2-3 組',
            caution: '只需溫和伸展，不要硬拉到不適；肩關節舊傷者降低強度。',
            image: 'images/29.png',
            pose_target: null
        },
        ball: {
            title: '肩胛間靠牆按摩球',
            steps: [
                '背對牆站立，將按摩球放在脊椎旁的肩胛骨內側',
                '用身體微微靠牆控制壓力，避開脊椎正中',
                '找到緊繃點後停留呼吸，或小幅度上下移動',
                '左右兩側分開處理'
            ],
            duration: '45-60 秒 / 每側',
            caution: '避開脊椎骨與肩胛骨稜角；急性受傷區域不要按壓。',
            image: 'images/30.png',
            pose_target: null
        }
    },
    shoulder: {
        hands: {
            title: '跨臂三角肌伸展',
            steps: [
                '站姿或坐姿，將右手橫跨身體往左側伸',
                '左手扶在右上臂或手肘外側，輕輕往身體方向帶',
                '感覺右肩外側被伸展，肩膀保持下沉不要聳肩',
                '停留後換邊'
            ],
            duration: '15-30 秒 × 2 組 / 每側',
            caution: '不要硬扳手肘導致肩關節不適；肩夾擠或舊傷者降低角度。',
            image: 'images/5.png',
            pose_target: null
        }
    },
    quadriceps: {
        hands: {
            title: '站立股四頭肌伸展',
            steps: [
                '單手扶牆或穩固物體保持平衡',
                '另一手抓住同側腳背，將腳跟拉向臀部',
                '膝蓋指向地面，骨盆保持中立不要前推',
                '感覺大腿前側被伸展後停留，再換邊'
            ],
            duration: '20-30 秒 × 2-3 組 / 每側',
            caution: '不要硬拉到膝蓋不適；膝關節舊傷可改側躺執行。',
            image: 'images/7.png',
            pose_target: null
        },
        roller: {
            title: '大腿前側滾筒放鬆',
            steps: [
                '俯臥姿，將滾筒放在大腿前側',
                '雙手或前臂撐地，慢慢前後移動',
                '可微微內外旋大腿，找不同緊繃區',
                '單腿壓力太強時，可改為雙腿同時放在滾筒上'
            ],
            duration: '30-60 秒 / 每側',
            caution: '避免直接壓在膝蓋骨上方；越滾越痛時停止並休息。',
            image: 'images/31.png',
            pose_target: null
        }
    },
    lats: {
        hands: {
            title: '背闊肌側拉伸',
            steps: [
                '站姿或坐姿，將單手往上舉伸直',
                '身體慢慢側彎到對側，感覺腋下到腰側被伸展',
                '骨盆保持穩定，不要左右晃動',
                '停留呼吸後回正，再換邊'
            ],
            duration: '20-30 秒 × 2 組 / 每側',
            caution: '若肩膀活動度有限，手不必完全舉直；下背不適時降低側彎幅度。',
            image: 'images/32.png',
            pose_target: null
        },
        roller: {
            title: '側臥背闊肌滾筒',
            steps: [
                '側躺，下方手臂往頭頂方向伸直，滾筒放在腋下下方的背闊肌處',
                '用上方腿撐地控制壓力',
                '慢慢前後或小範圍移動，找出緊繃點',
                '結束後做一次背闊肌側拉伸'
            ],
            duration: '30-45 秒 / 每側',
            caution: '避開肋骨與肩胛骨；若有麻刺感往手臂延伸，請停止。',
            image: 'images/33.png',
            pose_target: null
        }
    },
    biceps: {
        hands: {
            title: '二頭肌牆面伸展',
            steps: [
                '面向牆站立，將手臂往後伸直，掌心貼牆，拇指朝下',
                '手肘保持伸直，慢慢將身體轉離牆面',
                '感覺手臂前側與肩前側被伸展',
                '停留後換邊'
            ],
            duration: '15-30 秒 × 2 組 / 每側',
            caution: '不要硬扭到肩膀不適；肩前側疼痛或舊傷者降低強度。',
            image: 'images/34.png',
            pose_target: null
        }
    },
    triceps: {
        hands: {
            title: '頭後三頭肌伸展',
            steps: [
                '站姿或坐姿，將一手舉高並彎曲手肘，手心貼背',
                '另一手扶住手肘外側，輕輕往對側帶',
                '感覺上臂後側被伸展，肩膀保持下沉',
                '停留後換邊'
            ],
            duration: '15-30 秒 × 2 組 / 每側',
            caution: '不要硬扳手肘；頸部或肩膀不適時降低高度。',
            image: 'images/11.png',
            pose_target: null
        }
    }
};

const symptomMap = {
    '肩頸痠痛': ['trapezius', 'neck'],
    '下背痠痛': ['lower_back', 'glutes'],
    '久坐髖緊': ['hip_flexor', 'glutes'],
    '腿後與小腿緊': ['hamstrings', 'calf'],
    '腹部與側腹緊繃': ['abdomen', 'obliques'],
    '滑鼠手 / 前臂痠': ['forearm']
};

const neighborMap = {
    neck: ['trapezius', 'shoulder'],
    trapezius: ['neck', 'rhomboids', 'shoulder'],
    shoulder: ['trapezius', 'chest', 'biceps'],
    rhomboids: ['trapezius', 'lats'],
    lats: ['rhomboids', 'lower_back'],
    lower_back: ['glutes', 'hip_flexor', 'lats'],
    glutes: ['lower_back', 'hip_flexor', 'hamstrings'],
    abdomen: ['obliques', 'hip_flexor'],
    obliques: ['abdomen', 'lats', 'lower_back'],
    hip_flexor: ['quadriceps', 'glutes'],
    hamstrings: ['glutes', 'calf'],
    quadriceps: ['hip_flexor', 'calf'],
    calf: ['hamstrings', 'quadriceps'],
    forearm: ['biceps', 'triceps'],
    biceps: ['shoulder', 'forearm', 'triceps'],
    triceps: ['shoulder', 'forearm', 'biceps']
};

const muscleNames = {
    neck:       '頸部肌群',
    chest:      '胸部肌群（胸大肌）',
    shoulder:   '肩部肌群（三角肌）',
    biceps:     '二頭肌（肱二頭肌）',
    forearm:    '前臂肌群',
    abdomen:    '腹部肌群（腹直肌）',
    obliques:   '側腹（腹外斜肌）',
    hip_flexor: '髖屈肌群（髂腰肌）',
    quadriceps: '股四頭肌（大腿前側）',
    calf:       '小腿肌群（腓腸肌）',
    trapezius:  '斜方肌（肩頸部）',
    rhomboids:  '菱形肌（肩胛骨之間）',
    lats:       '背闊肌',
    triceps:    '三頭肌（肱三頭肌）',
    lower_back: '下背部肌群（豎脊肌）',
    glutes:     '臀部肌群（臀大肌）',
    hamstrings: '腿後肌群（股二頭肌）'
};

// Reverse map: pathId → muscleId
const pathToMuscle = {};
for (const [muscle, paths] of Object.entries(muscleMap)) {
    paths.forEach(p => { pathToMuscle[p] = muscle; });
}

const equipLabels = {
    hands: '徒手', roller: '滾筒', ball: '按摩球', band: '彈力帶', gun: '筋膜槍'
};

const methodPriority = {
    neck: ['hands', 'ball'],
    trapezius: ['hands', 'roller', 'ball', 'gun'],
    lower_back: ['hands', 'roller', 'ball'],
    glutes: ['hands', 'roller', 'ball'],
    hamstrings: ['hands', 'band', 'roller'],
    calf: ['hands', 'band', 'roller', 'ball'],
    forearm: ['hands', 'ball', 'roller'],
    abdomen: ['hands'],
    obliques: ['hands'],
    hip_flexor: ['hands'],
    chest: ['hands', 'roller'],
    rhomboids: ['hands', 'ball'],
    shoulder: ['hands'],
    quadriceps: ['hands', 'roller'],
    lats: ['hands', 'roller'],
    biceps: ['hands'],
    triceps: ['hands']
};

const sourceLibrary = {
    cuh_neck: {
        label: 'CUH NHS 頸部運動衛教',
        type: 'NHS 物理治療',
        url: 'https://www.cuh.nhs.uk/patient-information/neck-exercises-and-advice/'
    },
    cuh_seated: {
        label: 'CUH NHS 坐姿伸展影片',
        type: 'NHS 物理治療',
        url: 'https://www.cuh.nhs.uk/our-services/physiotherapy-outpatients/outpatient-physio-resources/resources/shoulder/seated-stretches/'
    },
    south_tees_hip: {
        label: 'South Tees NHS 跪姿髖部伸展',
        type: 'NHS 物理治療',
        url: 'https://www.southtees.nhs.uk/resources/hip-stretch-in-half-kneeling/'
    },
    south_tees_chest: {
        label: 'South Tees NHS 胸前伸展',
        type: 'NHS 物理治療',
        url: 'https://www.southtees.nhs.uk/resources/anterior-shoulder-stretch/'
    },
    south_tees_wrist: {
        label: 'South Tees NHS 手腕伸肌伸展',
        type: 'NHS 物理治療',
        url: 'https://www.southtees.nhs.uk/resources/wrist-extensor-stretch/'
    },
    guys_low_back: {
        label: 'Guy’s and St Thomas’ NHS 下背運動',
        type: 'NHS 物理治療',
        url: 'https://www.guysandstthomas.nhs.uk/health-information/low-back-pain/physiotherapy-and-exercises'
    },
    kent_stretch: {
        label: 'Kent Community Health NHS 伸展衛教',
        type: 'NHS 伸展衛教',
        url: 'https://www.kentcht.nhs.uk/leaflet/stretching-exercises/'
    },
    aaos_spine: {
        label: 'AAOS 脊椎復健運動',
        type: '骨科復健',
        url: 'https://orthoinfo.aaos.org/en/recovery/spine-conditioning-program/'
    },
    aaos_shoulder: {
        label: 'AAOS 肩部復健運動',
        type: '骨科復健',
        url: 'https://orthoinfo.aaos.org/en/recovery/rotator-cuff-and-shoulder-conditioning-program'
    },
    aaos_flexibility: {
        label: 'AAOS 熱身與伸展建議',
        type: '骨科運動醫學',
        url: 'https://orthoinfo.aaos.org/en/staying-healthy/warm-up-cool-down-and-be-flexible/'
    },
    myhealth_biceps: {
        label: 'MyHealth Alberta 二頭肌伸展',
        type: '政府健康教育',
        url: 'https://myhealth.alberta.ca/health/AfterCareInformation/pages/conditions.aspx?hwid=zp4494'
    },
    myhealth_flexibility: {
        label: 'MyHealth Alberta 伸展入門',
        type: '政府健康教育',
        url: 'https://myhealth.alberta.ca/Health/pages/conditions.aspx?hwid=ta1694'
    },
    cleveland_wrist: {
        label: 'Cleveland Clinic 手腕伸展',
        type: '醫學中心健康教育',
        url: 'https://health.clevelandclinic.org/wrist-pain-exercises'
    },
    cleveland_foam: {
        label: 'Cleveland Clinic 滾筒安全建議',
        type: '醫學中心健康教育',
        url: 'https://health.clevelandclinic.org/foam-rolling'
    },
    cleveland_massage_gun: {
        label: 'Cleveland Clinic 筋膜槍安全建議',
        type: '醫學中心健康教育',
        url: 'https://health.clevelandclinic.org/are-massage-guns-for-percussive-therapy-worth-it'
    },
    hss_myofascial: {
        label: 'HSS 自我筋膜放鬆概念',
        type: '醫院運動醫學',
        url: 'https://www.hss.edu/health-library/conditions-and-treatments/myofascial-release'
    },
    dorset_plantar: {
        label: 'Dorset NHS 足底滾動伸展',
        type: 'NHS 物理治療',
        url: 'https://www.dorsethealthcare.nhs.uk/our-services-and-sites/physical-health/podiatry-foot-care/plantar-fasciitis'
    },
    ace_lat: {
        label: 'ACE 背闊肌伸展教學',
        type: '運動醫學教學',
        url: 'https://www.acefitness.org/acefit/fitness_programs_exercise_library_details.aspx?exerciseid=198'
    },
    johns_breathing: {
        label: 'Johns Hopkins 腹式呼吸',
        type: '醫院健康教育',
        url: 'https://www.hopkinsmedicine.org/breathlessness-clinic/breathing-techniques'
    },
    barnes_side_bend: {
        label: 'Barnes-Jewish 側彎伸展',
        type: '醫院健康教育',
        url: 'https://www.barnesjewish.org/Health-Library/View-Content?contentId=4469&contentTypeId=1'
    }
};

const defaultSourceRefsByEquip = {
    roller: ['cleveland_foam'],
    ball: ['hss_myofascial'],
    gun: ['cleveland_massage_gun']
};

const methodSourceRefs = {
    neck: {
        hands: ['cuh_neck', 'cuh_seated'],
        ball: ['hss_myofascial']
    },
    trapezius: {
        hands: ['cuh_neck'],
        ball: ['hss_myofascial'],
        gun: ['cleveland_massage_gun'],
        roller: ['cleveland_foam']
    },
    lower_back: {
        hands: ['guys_low_back', 'aaos_spine'],
        ball: ['hss_myofascial'],
        roller: ['cleveland_foam']
    },
    glutes: {
        hands: ['aaos_spine'],
        roller: ['hss_myofascial', 'cleveland_foam'],
        ball: ['hss_myofascial']
    },
    hamstrings: {
        hands: ['kent_stretch', 'cuh_seated'],
        roller: ['cleveland_foam'],
        band: ['aaos_spine']
    },
    calf: {
        hands: ['kent_stretch', 'aaos_flexibility'],
        roller: ['cleveland_foam'],
        ball: ['dorset_plantar'],
        band: ['cuh_seated', 'kent_stretch']
    },
    forearm: {
        hands: ['south_tees_wrist', 'cleveland_wrist'],
        ball: ['hss_myofascial'],
        roller: ['hss_myofascial']
    },
    abdomen: {
        hands: ['johns_breathing']
    },
    obliques: {
        hands: ['barnes_side_bend', 'myhealth_flexibility']
    },
    hip_flexor: {
        hands: ['south_tees_hip', 'kent_stretch']
    },
    chest: {
        hands: ['south_tees_chest'],
        roller: ['cleveland_foam']
    },
    rhomboids: {
        hands: ['cuh_seated'],
        ball: ['hss_myofascial']
    },
    shoulder: {
        hands: ['aaos_shoulder', 'aaos_flexibility']
    },
    quadriceps: {
        hands: ['kent_stretch', 'aaos_flexibility'],
        roller: ['cleveland_foam']
    },
    lats: {
        hands: ['ace_lat', 'aaos_spine'],
        roller: ['cleveland_foam', 'hss_myofascial']
    },
    biceps: {
        hands: ['myhealth_biceps']
    },
    triceps: {
        hands: ['aaos_flexibility', 'myhealth_flexibility']
    }
};

const exercisesData = {
    biceps_curl: {
        title: '二頭彎舉',
        targetMuscles: ['biceps', 'forearm'],
        equipment: ['啞鈴', '彈力帶'],
        steps: [
            '站姿或坐姿，背部打直，手肘靠近身體兩側',
            '吐氣彎曲手肘，把重量往肩膀方向抬起',
            '吸氣慢慢放下，全程避免身體後仰借力'
        ],
        commonMistakes: [
            '手肘前後晃動太大',
            '身體後仰甩重量',
            '手腕過度彎折或下放太快'
        ],
        caution: '重量以可控制為主；肩、肘或手腕出現疼痛時請停止。',
        image: 'images/fitness/biceps_curl.png',
        formChecks: ['elbow_stability', 'curl_range']
    },
    triceps_extension: {
        title: '三頭肌伸展',
        targetMuscles: ['triceps', 'shoulder'],
        equipment: ['彈力帶', '啞鈴'],
        steps: [
            '站姿，核心輕微收緊，雙手持啞鈴在頭後起始',
            '吐氣伸直手肘，將重量往頭頂上方推起',
            '吸氣慢慢回到頭後，手肘盡量朝前不外張'
        ],
        commonMistakes: [
            '手肘外張或左右晃動太多',
            '聳肩代償而不是手肘伸展',
            '腰部後仰或下放太快'
        ],
        caution: '先用輕重量或低阻力；手肘或肩膀不適時請降低幅度或停止。',
        image: 'images/fitness/triceps_extension.png',
        formChecks: ['elbow_stability', 'extension_range']
    },
    shoulder_press: {
        title: '肩推',
        targetMuscles: ['shoulder', 'triceps', 'trapezius'],
        equipment: ['啞鈴', '彈力帶'],
        steps: [
            '站姿或坐姿，核心輕微收緊，啞鈴放在肩膀兩側',
            '吐氣往上推到手臂接近伸直，手腕維持中立',
            '吸氣慢慢回到肩膀兩側，避免聳肩或腰部後仰'
        ],
        commonMistakes: [
            '腰部後仰，用身體代償推起重量',
            '聳肩過多，讓頸部承受壓力',
            '手肘外開過大或下放太快'
        ],
        caution: '肩關節不適或夾擠感時請降低重量與幅度；避免硬推到疼痛位置。',
        image: 'images/fitness/shoulder_press.png',
        formChecks: ['overhead_range', 'elbow_path']
    }
};

const selectedEquip = new Set();
let currentMuscle = null;
let currentMode = 'relax';
let currentExercise = 'biceps_curl';
let svgHome = null;
let poseLandmarker = null;
let poseStream = null;
let poseAnimationFrame = null;
let lastPoseVideoTime = -1;
let formBaseline = null;
let formMinAngle = 180;
let formMaxAngle = 0;
let formMinWristY = 1;
let formMaxWristY = 0;
let lastFormFeedback = null;

const poseConfig = {
    moduleUrl: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.mjs',
    wasmUrl: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm',
    modelUrl: 'assets/models/pose_landmarker_lite.task'
};

window.addEventListener('DOMContentLoaded', async () => {
    await loadBodyMap();
    svgHome = document.getElementById('relax-svg-host') || null;
    for (const [pathId, muscle] of Object.entries(pathToMuscle)) {
        const el = document.getElementById(pathId);
        if (!el) continue;
        el.classList.add('muscle-clickable');
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', muscleNames[muscle] || muscle);
        el.setAttribute('aria-pressed', 'false');
        el.addEventListener('click', () => selectMuscle(muscle));
        el.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            selectMuscle(muscle);
        });
    }
    renderExerciseList();
    renderExerciseCard(currentExercise);
});

function setMode(mode) {
    currentMode = mode;
    const isRelax = mode === 'relax';

    if (!isRelax) {
        clearRelaxHighlights();
    }
    moveSvgToMode(mode);
    document.getElementById('relax-mode').classList.toggle('hidden', !isRelax);
    document.getElementById('fitness-mode').classList.toggle('hidden', isRelax);
    document.getElementById('relax-mode-btn').classList.toggle('active', isRelax);
    document.getElementById('fitness-mode-btn').classList.toggle('active', !isRelax);
    document.getElementById('relax-mode-btn').setAttribute('aria-selected', String(isRelax));
    document.getElementById('fitness-mode-btn').setAttribute('aria-selected', String(!isRelax));

    if (isRelax) {
        clearFitnessTargets();
        restoreRelaxHighlight();
        document.getElementById('muscle-label').textContent = currentMuscle
            ? (muscleNames[currentMuscle] || currentMuscle)
            : '點選圖中肌肉部位';
        stopPoseAnalysis('攝影機已關閉。');
    } else {
        selectExercise(currentExercise);
    }
}

function clearRelaxHighlights() {
    document.querySelectorAll('#svg-wrapper path.muscle-active')
        .forEach(el => {
            el.classList.remove('muscle-active');
            el.setAttribute('aria-pressed', 'false');
        });
    document.querySelectorAll('#svg-wrapper path.muscle-suggested')
        .forEach(el => el.classList.remove('muscle-suggested'));
}

function restoreRelaxHighlight() {
    if (!currentMuscle) return;
    (muscleMap[currentMuscle] || []).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('muscle-active');
            el.setAttribute('aria-pressed', 'true');
        }
    });
}

function moveSvgToMode(mode) {
    const wrapper = document.getElementById('svg-wrapper');
    if (!wrapper) return;

    if (mode === 'fitness') {
        const host = document.getElementById('fitness-svg-host');
        if (host && wrapper.parentElement !== host) host.appendChild(wrapper);
        wrapper.classList.add('fitness-preview');
    } else {
        if (svgHome && wrapper.parentElement !== svgHome) svgHome.appendChild(wrapper);
        wrapper.classList.remove('fitness-preview');
    }
}

function selectMuscle(muscleId) {
    clearSymptomState();

    if (currentMuscle) {
        muscleMap[currentMuscle].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('muscle-active');
            if (el) el.setAttribute('aria-pressed', 'false');
        });
    }
    muscleMap[muscleId].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('muscle-active');
        if (el) el.setAttribute('aria-pressed', 'true');
    });
    currentMuscle = muscleId;
    document.getElementById('muscle-label').textContent = muscleNames[muscleId] || muscleId;

    // Show step 2
    const sec = document.getElementById('equipment-section');
    sec.classList.remove('hidden');
    requestAnimationFrame(() => sec.classList.add('visible'));

    // Reset equipment if muscle changed
    selectedEquip.clear();
    updateEquipAvailability(muscleId);
    updateConfirmEquipState();
    document.getElementById('methods-section').classList.remove('visible');
    document.getElementById('methods-section').classList.add('hidden');

    // Update step flow
    document.getElementById('flow-1').classList.add('active');
    document.getElementById('flow-2').classList.add('active');
    document.getElementById('flow-3').classList.remove('active');

    setTimeout(() => sec.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

function selectSymptom(symptom, btn) {
    const relatedMuscles = symptomMap[symptom] || [];
    if (!relatedMuscles.length) return;

    const primaryMuscle = relatedMuscles[0];
    selectMuscle(primaryMuscle);

    relatedMuscles.slice(1).forEach(markSuggestedMuscle);
    if (btn) btn.classList.add('active');

    document.getElementById('muscle-label').textContent =
        `${symptom}：建議先查看 ${muscleNames[primaryMuscle] || primaryMuscle}`;
}

function markSuggestedMuscle(muscleId) {
    (muscleMap[muscleId] || []).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('muscle-suggested');
    });
}

function clearSymptomState() {
    document.querySelectorAll('#svg-wrapper path.muscle-suggested')
        .forEach(el => el.classList.remove('muscle-suggested'));
    document.querySelectorAll('.symptom-btn.active')
        .forEach(btn => btn.classList.remove('active'));
}

async function startPoseAnalysis() {
    const status = document.getElementById('pose-status');
    const startBtn = document.getElementById('pose-start-btn');
    const stopBtn = document.getElementById('pose-stop-btn');
    const video = document.getElementById('pose-video');

    if (currentMode !== 'fitness') {
        status.textContent = '請先切換到健身模式再啟動姿勢檢查。';
        return;
    }

    const exercise = exercisesData[currentExercise];
    if (!exercise?.formChecks?.length) {
        status.textContent = '目前選擇的動作尚未支援姿勢檢查。';
        return;
    }

    if (location.protocol === 'file:') {
        status.textContent = '請用 localhost 或 HTTPS 開啟頁面後再啟動攝影機。';
        return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
        status.textContent = '此瀏覽器不支援攝影機存取。';
        return;
    }

    startBtn.disabled = true;
    status.textContent = '正在載入姿勢分析模型...';

    try {
        await ensurePoseLandmarker();
        status.textContent = '正在開啟攝影機...';

        poseStream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: 'user' },
            audio: false
        });

        video.srcObject = poseStream;
        document.getElementById('pose-video-wrap')?.classList.remove('hidden');
        await video.play();

        stopBtn.disabled = false;
        status.textContent = `分析中：${exercise.title}。請讓肩膀、手肘與手腕進入畫面，正面面向攝影機。`;
        resetFormTracking();
        lastPoseVideoTime = -1;
        runPoseLoop();
    } catch (error) {
        startBtn.disabled = false;
        stopPoseAnalysis(`姿勢分析無法啟動：${error.message || error}`);
    }
}

async function ensurePoseLandmarker() {
    if (poseLandmarker) return poseLandmarker;

    const visionTasks = await import(poseConfig.moduleUrl);
    const vision = await visionTasks.FilesetResolver.forVisionTasks(poseConfig.wasmUrl);

    poseLandmarker = await visionTasks.PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: poseConfig.modelUrl
        },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    return poseLandmarker;
}

function runPoseLoop() {
    if (!poseStream || !poseLandmarker) return;

    const video = document.getElementById('pose-video');
    if (video.readyState >= 2 && video.currentTime !== lastPoseVideoTime) {
        const result = poseLandmarker.detectForVideo(video, performance.now());
        renderPoseResult(result);
        lastPoseVideoTime = video.currentTime;
    }

    poseAnimationFrame = requestAnimationFrame(runPoseLoop);
}

function renderPoseResult(result) {
    const landmarks = result?.landmarks?.[0];
    const status = document.getElementById('pose-status');
    const results = document.getElementById('pose-results');

    if (!landmarks) {
        clearPoseCanvas();
        status.textContent = '尚未偵測到上半身姿勢，請稍微後退並讓肩膀、手肘與手腕入鏡。';
        results.innerHTML = '';
        return;
    }

    const feedback = analyzeCurrentExercise(landmarks);
    lastFormFeedback = feedback;
    drawPoseOverlay(landmarks, feedback);
    status.textContent = feedback.summary;
    results.innerHTML = renderFormFeedback(feedback);
}

function resetFormTracking() {
    formBaseline = null;
    formMinAngle = 180;
    formMaxAngle = 0;
    formMinWristY = 1;
    formMaxWristY = 0;
    lastFormFeedback = null;
}

function resetCurlTracking() {
    resetFormTracking();
}

function analyzeCurrentExercise(landmarks) {
    if (currentExercise === 'biceps_curl') {
        return analyzeElbowRangeExercise(landmarks, {
            title: '二頭彎舉',
            rangeLabel: '彎舉幅度',
            minRange: 45,
            maxElbowDrift: 0.28,
            stableOk: '手肘保持穩定。',
            stableWarn: '手肘移動太多，試著固定在身體側邊。',
            rangeOk: '動作幅度足夠，持續保持慢速控制。',
            rangeWarn: '動作幅度不足，手腕上抬與放下角度需要更明顯。'
        });
    }

    if (currentExercise === 'triceps_extension') {
        return analyzeElbowRangeExercise(landmarks, {
            title: '三頭肌伸展',
            rangeLabel: '伸展幅度',
            minRange: 35,
            maxElbowDrift: 0.32,
            stableOk: '手肘保持穩定，伸展路徑清楚。',
            stableWarn: '手肘移動太多，試著讓上臂固定在身體旁或頭側。',
            rangeOk: '伸直與回收幅度足夠。',
            rangeWarn: '伸展幅度不足，手肘伸直與回收需要更明顯。'
        });
    }

    if (currentExercise === 'shoulder_press') {
        return analyzeShoulderPress(landmarks);
    }

    return {
        summary: '此動作尚未支援姿勢檢查。',
        sideLabel: '未支援',
        ok: false,
        angle: 0,
        rangeText: '無',
        messages: ['請選擇支援姿勢檢查的動作。']
    };
}

function analyzeBicepsCurl(landmarks) {
    const previousExercise = currentExercise;
    currentExercise = 'biceps_curl';
    const feedback = analyzeCurrentExercise(landmarks);
    currentExercise = previousExercise;
    return feedback;
}

function analyzeElbowRangeExercise(landmarks, config) {
    const side = chooseVisibleArm(landmarks);
    if (!side) {
        return {
            summary: '尚未清楚偵測到手臂，請讓肩膀、手肘與手腕進入畫面。',
            sideLabel: '未偵測',
            ok: false,
            angle: 0,
            rangeText: '0°',
            messages: ['請面向攝影機，讓至少一側手臂完整入鏡。']
        };
    }

    const shoulder = landmarks[side.shoulder];
    const elbow = landmarks[side.elbow];
    const wrist = landmarks[side.wrist];
    const shoulderWidth = Math.max(0.08, distance(landmarks[11], landmarks[12]));
    const currentElbow = { x: elbow.x, y: elbow.y };

    if (!formBaseline || formBaseline.exercise !== currentExercise || formBaseline.side !== side.name) {
        formBaseline = { exercise: currentExercise, side: side.name, elbow: currentElbow };
        formMinAngle = 180;
        formMaxAngle = 0;
    }

    const angle = jointAngle(shoulder, elbow, wrist);
    formMinAngle = Math.min(formMinAngle, angle);
    formMaxAngle = Math.max(formMaxAngle, angle);

    const elbowDrift = distance(currentElbow, formBaseline.elbow) / shoulderWidth;
    const range = formMaxAngle - formMinAngle;
    const elbowStable = elbowDrift < config.maxElbowDrift;
    const rangeOk = range > config.minRange;

    const messages = [];
    messages.push(elbowStable ? config.stableOk : config.stableWarn);
    messages.push(rangeOk ? config.rangeOk : config.rangeWarn);

    return {
        summary: `${side.label}${config.title}檢查中`,
        sideLabel: side.label,
        ok: elbowStable && rangeOk,
        elbowDrift,
        range,
        rangeText: `${Math.round(range)}°`,
        rangeLabel: config.rangeLabel,
        angle,
        messages
    };
}

function analyzeShoulderPress(landmarks) {
    const side = chooseVisibleArm(landmarks);
    if (!side) {
        return {
            summary: '尚未清楚偵測到手臂，請讓肩膀、手肘與手腕進入畫面。',
            sideLabel: '未偵測',
            ok: false,
            angle: 0,
            rangeText: '0%',
            messages: ['請面向攝影機，讓至少一側手臂完整入鏡。']
        };
    }

    const shoulder = landmarks[side.shoulder];
    const elbow = landmarks[side.elbow];
    const wrist = landmarks[side.wrist];
    const shoulderWidth = Math.max(0.08, distance(landmarks[11], landmarks[12]));
    const currentElbow = { x: elbow.x, y: elbow.y };

    if (!formBaseline || formBaseline.exercise !== currentExercise || formBaseline.side !== side.name) {
        formBaseline = { exercise: currentExercise, side: side.name, elbow: currentElbow };
        formMinWristY = 1;
        formMaxWristY = 0;
        formMinAngle = 180;
        formMaxAngle = 0;
    }

    const angle = jointAngle(shoulder, elbow, wrist);
    formMinAngle = Math.min(formMinAngle, angle);
    formMaxAngle = Math.max(formMaxAngle, angle);
    formMinWristY = Math.min(formMinWristY, wrist.y);
    formMaxWristY = Math.max(formMaxWristY, wrist.y);

    const verticalRange = (formMaxWristY - formMinWristY) / shoulderWidth;
    const overheadReached = formMinWristY < shoulder.y - shoulderWidth * 0.15;
    const elbowDriftX = Math.abs(currentElbow.x - formBaseline.elbow.x) / shoulderWidth;
    const elbowPathOk = elbowDriftX < 0.45;
    const rangeOk = verticalRange > 0.45 && overheadReached && formMaxAngle > 135;

    const messages = [];
    messages.push(rangeOk
        ? '手腕有推到肩膀上方，動作幅度足夠。'
        : '上推幅度不足，試著讓手腕明顯推到肩膀上方。');
    messages.push(elbowPathOk
        ? '手肘路徑相對穩定。'
        : '手肘左右偏移較多，試著沿穩定路徑上推。');

    return {
        summary: `${side.label}肩推檢查中`,
        sideLabel: side.label,
        ok: rangeOk && elbowPathOk,
        elbowDrift: elbowDriftX,
        range: verticalRange,
        rangeText: `${Math.round(verticalRange * 100)}% 肩寬`,
        rangeLabel: '上推高度',
        angle,
        messages
    };
}

function chooseVisibleArm(landmarks) {
    const left = visibilityScore(landmarks, [11, 13, 15]);
    const right = visibilityScore(landmarks, [12, 14, 16]);
    if (left < 0.45 && right < 0.45) return null;
    return left >= right
        ? { name: 'left', label: '左手', shoulder: 11, elbow: 13, wrist: 15 }
        : { name: 'right', label: '右手', shoulder: 12, elbow: 14, wrist: 16 };
}

function visibilityScore(landmarks, indexes) {
    return indexes.reduce((sum, index) => {
        const point = landmarks[index];
        return sum + (point?.visibility ?? point?.presence ?? 1);
    }, 0) / indexes.length;
}

function drawPoseOverlay(landmarks, feedback) {
    const canvas = document.getElementById('pose-canvas');
    const video = document.getElementById('pose-video');
    if (!canvas || !video?.videoWidth || !video?.videoHeight) return;

    const displayWidth = video.clientWidth || video.videoWidth;
    const displayHeight = video.clientHeight || video.videoHeight;
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const activeSide = feedback?.sideLabel === '左手'
        ? { shoulder: 11, elbow: 13, wrist: 15 }
        : { shoulder: 12, elbow: 14, wrist: 16 };

    const baseConnections = [
        [11, 12], [11, 23], [12, 24], [23, 24],
        [11, 13], [13, 15], [12, 14], [14, 16]
    ];

    baseConnections.forEach(([from, to]) => {
        const active = [from, to].includes(activeSide.shoulder)
            || [from, to].includes(activeSide.elbow)
            || [from, to].includes(activeSide.wrist);
        drawPoseLine(ctx, landmarks[from], landmarks[to], active);
    });

    [11, 12, 13, 14, 15, 16, 23, 24].forEach(index => {
        const active = index === activeSide.shoulder || index === activeSide.elbow || index === activeSide.wrist;
        drawPosePoint(ctx, landmarks[index], active);
    });
}

function drawPoseLine(ctx, a, b, active = false) {
    if (!isVisibleLandmark(a) || !isVisibleLandmark(b)) return;

    ctx.strokeStyle = active ? 'rgba(246, 173, 85, 0.95)' : 'rgba(99, 179, 237, 0.85)';
    ctx.lineWidth = active ? 5 : 3;
    ctx.beginPath();
    ctx.moveTo(a.x * ctx.canvas.width, a.y * ctx.canvas.height);
    ctx.lineTo(b.x * ctx.canvas.width, b.y * ctx.canvas.height);
    ctx.stroke();
}

function drawPosePoint(ctx, point, active = false) {
    if (!isVisibleLandmark(point)) return;

    const x = point.x * ctx.canvas.width;
    const y = point.y * ctx.canvas.height;
    ctx.fillStyle = active ? '#f6ad55' : '#63b3ed';
    ctx.strokeStyle = 'rgba(26, 32, 44, 0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, active ? 6 : 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

function isVisibleLandmark(point) {
    return Boolean(point) && (point.visibility ?? point.presence ?? 1) > 0.45;
}

function clearPoseCanvas() {
    const canvas = document.getElementById('pose-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function jointAngle(a, b, c) {
    const ab = { x: a.x - b.x, y: a.y - b.y };
    const cb = { x: c.x - b.x, y: c.y - b.y };
    const dot = ab.x * cb.x + ab.y * cb.y;
    const mag = Math.hypot(ab.x, ab.y) * Math.hypot(cb.x, cb.y);
    if (!mag) return 0;
    const cosine = Math.max(-1, Math.min(1, dot / mag));
    return Math.round(Math.acos(cosine) * 180 / Math.PI);
}

function renderFormFeedback(feedback) {
    const statusClass = feedback.ok ? 'ok' : 'warn';
    return `
        <div class="form-feedback ${statusClass}">
            <div><strong>偵測手臂：</strong>${escapeHTML(feedback.sideLabel)}</div>
            <div><strong>目前手肘角度：</strong>${Math.round(feedback.angle)}°</div>
            <div><strong>${escapeHTML(feedback.rangeLabel || '累積動作幅度')}：</strong>${escapeHTML(feedback.rangeText || `${Math.round(feedback.range || 0)}°`)}</div>
            <ul>
                ${feedback.messages.map(message => `<li>${escapeHTML(message)}</li>`).join('')}
            </ul>
        </div>
    `;
}

function midpoint(a, b) {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        z: ((a.z || 0) + (b.z || 0)) / 2
    };
}

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function stopPoseAnalysis(message = '攝影機已關閉。') {
    if (poseAnimationFrame) {
        cancelAnimationFrame(poseAnimationFrame);
        poseAnimationFrame = null;
    }

    if (poseStream) {
        poseStream.getTracks().forEach(track => track.stop());
        poseStream = null;
    }

    const video = document.getElementById('pose-video');
    const startBtn = document.getElementById('pose-start-btn');
    const stopBtn = document.getElementById('pose-stop-btn');

    if (video) {
        video.pause();
        video.srcObject = null;
    }
    document.getElementById('pose-video-wrap')?.classList.add('hidden');
    clearPoseCanvas();

    if (startBtn && !startBtn.dataset.locked) startBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;

    const status = document.getElementById('pose-status');
    const results = document.getElementById('pose-results');
    resetFormTracking();
    if (status) status.textContent = message;
    if (results) results.innerHTML = '';
}

function toggleEquip(btn) {
    if (btn.disabled || btn.classList.contains('is-unavailable')) return;

    const equip = btn.dataset.equip;
    if (selectedEquip.has(equip)) {
        selectedEquip.delete(equip);
        btn.classList.remove('active');
    } else {
        selectedEquip.add(equip);
        btn.classList.add('active');
    }
    updateConfirmEquipState();
}

function updateConfirmEquipState() {
    const confirmBtn = document.getElementById('confirm-equip-btn');
    const hasVerifiedSelection = [...selectedEquip].some(equip => hasVerifiedMethod(currentMuscle, equip));
    confirmBtn.disabled = !hasVerifiedSelection;
}

function updateEquipAvailability(muscleId) {
    const availableEquips = getVerifiedEquipKeys(muscleId);
    const unavailableLabels = [];

    document.querySelectorAll('.equip-btn').forEach(btn => {
        const equip = btn.dataset.equip;
        const isAvailable = hasVerifiedMethod(muscleId, equip);
        btn.disabled = !isAvailable;
        btn.classList.toggle('is-unavailable', !isAvailable);
        btn.classList.remove('active');
        btn.title = isAvailable
            ? `${equipLabels[equip] || equip}可用`
            : `${equipLabels[equip] || equip}目前尚未建立可信內容`;
        btn.setAttribute('aria-disabled', String(!isAvailable));
        if (!isAvailable) unavailableLabels.push(equipLabels[equip] || equip);
    });

    const note = document.getElementById('equip-availability-note');
    if (!note) return;

    if (!availableEquips.length) {
        note.textContent = '此部位目前尚未建立可信放鬆方法。';
        return;
    }

    const availableLabels = availableEquips.map(equip => equipLabels[equip] || equip).join('、');
    note.textContent = unavailableLabels.length
        ? `此部位目前可用：${availableLabels}。灰色器材暫無可信內容，先不開放選擇。`
        : `此部位目前可用：${availableLabels}。`;
}

function hasVerifiedMethod(muscleId, equip) {
    return Boolean(methodsData[muscleId]?.[equip]?.title);
}

function getVerifiedEquipKeys(muscleId) {
    return Object.keys(equipLabels).filter(equip => hasVerifiedMethod(muscleId, equip));
}

function getPreferredVerifiedEquip(muscleId) {
    const priority = methodPriority[muscleId] || Object.keys(equipLabels);
    return priority.find(equip => hasVerifiedMethod(muscleId, equip))
        || Object.keys(equipLabels).find(equip => hasVerifiedMethod(muscleId, equip))
        || null;
}

function showMethods() {
    if (!currentMuscle || selectedEquip.size === 0) return;

    const section = document.getElementById('methods-section');
    const cards = document.getElementById('methods-cards');
    const muscleName = muscleNames[currentMuscle] || currentMuscle;

    document.getElementById('methods-title').textContent =
        `步驟 3 ── ${muscleName}`;

    const recommendation = getMethodRecommendation(currentMuscle, [...selectedEquip]);
    cards.innerHTML = renderMethodRecommendation(currentMuscle, muscleName, recommendation);

    section.classList.remove('hidden');
    requestAnimationFrame(() => section.classList.add('visible'));

    document.getElementById('flow-3').classList.add('active');

    setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function getMethodRecommendation(muscleId, selectedEquips) {
    const uniqueEquips = [...new Set(selectedEquips)];
    const sortedEquips = uniqueEquips.sort((a, b) => getMethodPriorityIndex(muscleId, a) - getMethodPriorityIndex(muscleId, b));
    const availableEquips = sortedEquips.filter(equip => methodsData[muscleId]?.[equip]?.title);
    const unavailableEquips = sortedEquips.filter(equip => !methodsData[muscleId]?.[equip]?.title);
    const fallbackEquip = availableEquips.length ? null : getPreferredVerifiedEquip(muscleId);

    return {
        primary: availableEquips[0] || fallbackEquip,
        alternatives: availableEquips.slice(1),
        unavailable: unavailableEquips,
        fallbackUsed: Boolean(fallbackEquip && !availableEquips.length)
    };
}

function getMethodPriorityIndex(muscleId, equip) {
    const priority = methodPriority[muscleId] || Object.keys(equipLabels);
    const index = priority.indexOf(equip);
    if (index >= 0) return index;
    const fallbackIndex = Object.keys(equipLabels).indexOf(equip);
    return priority.length + (fallbackIndex >= 0 ? fallbackIndex : Object.keys(equipLabels).length);
}

function renderMethodRecommendation(muscleId, muscleName, recommendation) {
    if (!recommendation.primary) {
        return renderNoVerifiedMethod(muscleId, muscleName, recommendation.unavailable);
    }

    const primaryData = methodsData[muscleId][recommendation.primary];
    const badge = recommendation.fallbackUsed ? '建議替代' : '最推薦';
    return `
        ${renderMethodCard(recommendation.primary, muscleId, muscleName, primaryData, { badge })}
        ${renderAlternativeMethods(muscleId, muscleName, recommendation.alternatives)}
        ${recommendation.fallbackUsed
            ? renderFallbackEquipNote(recommendation.unavailable, recommendation.primary)
            : renderUnavailableEquipNote(recommendation.unavailable)}
    `;
}

function renderAlternativeMethods(muscleId, muscleName, alternativeEquips) {
    if (!alternativeEquips.length) return '';

    return `
        <details class="method-alternatives">
            <summary>
                <span>其他可用方法</span>
                <span class="method-alternatives-count">${alternativeEquips.length} 項</span>
            </summary>
            <div class="alternative-cards">
                ${alternativeEquips.map(equip =>
                    renderMethodCard(equip, muscleId, muscleName, methodsData[muscleId][equip], { badge: '可選' })
                ).join('')}
            </div>
        </details>
    `;
}

function renderUnavailableEquipNote(unavailableEquips) {
    if (!unavailableEquips.length) return '';

    const labels = unavailableEquips.map(equip => equipLabels[equip] || equip).join('、');
    return `
        <div class="method-unavailable-note">
            已略過尚未建立可信內容的器材：${escapeHTML(labels)}。
        </div>
    `;
}

function renderFallbackEquipNote(unavailableEquips, fallbackEquip) {
    const labels = unavailableEquips.length
        ? unavailableEquips.map(equip => equipLabels[equip] || equip).join('、')
        : '你選的器材';
    const fallbackLabel = equipLabels[fallbackEquip] || fallbackEquip;

    return `
        <div class="method-unavailable-note">
            ${escapeHTML(labels)}目前沒有已查證內容，已改用此部位較安全的${escapeHTML(fallbackLabel)}方法。
        </div>
    `;
}

function renderNoVerifiedMethod(muscleId, muscleName, unavailableEquips) {
    const selectedLabels = unavailableEquips.length
        ? unavailableEquips.map(equip => equipLabels[equip] || equip).join('、')
        : '目前選擇的器材';
    const verifiedOptions = (methodPriority[muscleId] || Object.keys(equipLabels))
        .filter(equip => methodsData[muscleId]?.[equip]?.title)
        .map(equip => equipLabels[equip] || equip)
        .join('、');

    return `
        <div class="method-card">
            <div class="method-card-header">
                <span class="equip-tag">未提供</span>
                <h3>${escapeHTML(muscleName)}</h3>
            </div>
            <div class="method-card-body">
                <p class="placeholder-text">
                    ${escapeHTML(selectedLabels)}目前沒有已查證的放鬆方法。
                    ${verifiedOptions ? `此肌群目前可改選：${escapeHTML(verifiedOptions)}。` : ''}
                </p>
            </div>
        </div>
    `;
}

function renderMethodCard(equip, muscleId, muscleName, data, options = {}) {
    const equipLabel = equipLabels[equip] || equip;
    const badge = options.badge
        ? `<span class="recommendation-pill">${escapeHTML(options.badge)}</span>`
        : '';

    if (!data?.title) {
        return `
            <div class="method-card">
                <div class="method-card-header">
                    <span class="equip-tag">${equipLabel}</span>
                    <h3>${escapeHTML(muscleName)}</h3>
                    ${badge}
                </div>
                <div class="method-card-body">
                    <div class="method-card-layout">
                        ${renderMethodMedia(null, `${equipLabel} ${muscleName}`)}
                        <div class="method-content">
                            <p class="placeholder-text">內容準備中：${equipLabel} × ${muscleName} 的放鬆方法尚未建立。</p>
                            ${renderLocationCheck(muscleId, equip)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const steps = Array.isArray(data.steps) && data.steps.length
        ? `<ol>${data.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>`
        : '<p class="placeholder-text">步驟準備中</p>';
    const sourceRefs = getMethodSourceRefs(muscleId, equip);

    return `
        <div class="method-card">
            <div class="method-card-header">
                <span class="equip-tag">${equipLabel}</span>
                <h3>${escapeHTML(data.title)}</h3>
                ${badge}
            </div>
            <div class="method-card-body">
                <div class="method-card-layout">
                    ${renderMethodMedia(data.image, data.title)}
                    <div class="method-content">
                        <h4>操作步驟</h4>
                        ${steps}
                        <div class="method-meta">
                            ${data.duration ? `<div class="method-duration"><strong>建議時間：</strong>${escapeHTML(data.duration)}</div>` : ''}
                            ${data.caution ? `<div class="method-caution"><strong>注意事項：</strong>${escapeHTML(data.caution)}</div>` : ''}
                        </div>
                        ${renderMethodSources(sourceRefs)}
                        ${renderLocationCheck(muscleId, equip)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getMethodSourceRefs(muscleId, equip) {
    const directRefs = methodSourceRefs[muscleId]?.[equip] || [];
    const defaultRefs = defaultSourceRefsByEquip[equip] || [];
    return [...new Set([...directRefs, ...defaultRefs])];
}

function renderMethodSources(sourceRefs) {
    const sources = sourceRefs
        .map(ref => sourceLibrary[ref])
        .filter(Boolean);

    if (!sources.length) return '';

    const links = sources.map(source => `
        <a class="source-link" href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(source.label)}
        </a>
    `).join('');
    const sourceTypes = [...new Set(sources.map(source => source.type))].join(' / ');

    return `
        <div class="method-sources">
            <div class="method-sources-title">參考來源</div>
            <div class="source-links">${links}</div>
            <div class="source-note">來源類型：${escapeHTML(sourceTypes)}</div>
        </div>
    `;
}

function renderLocationCheck(muscleId, equip) {
    const id = `${muscleId}-${equip}`.replace(/[^a-z0-9_-]/gi, '-');
    const neighbors = neighborMap[muscleId] || [];
    const neighborButtons = neighbors.length
        ? neighbors.map(neighbor => `
            <button class="neighbor-btn" onclick="selectNeighborMuscle('${neighbor}')">
                ${muscleNames[neighbor] || neighbor}
            </button>
        `).join('')
        : '<span class="placeholder-text">目前沒有相鄰肌群建議。</span>';

    return `
        <div class="location-check">
            <div class="location-check-title">按壓位置確認</div>
            <p>按壓或伸展這個區域時，是否有痠、緊、可忍受的不適感？</p>
            <div class="location-actions">
                <button class="location-btn primary" onclick="confirmLocation('${id}')">位置正確</button>
                <button class="location-btn" onclick="showNeighborOptions('${id}')">感覺不對</button>
            </div>
            <div class="location-message" id="location-message-${id}" aria-live="polite"></div>
            <div class="neighbor-panel hidden" id="neighbor-panel-${id}">
                <p>可以改看相鄰肌群，再重新選擇器材與方法：</p>
                <div class="neighbor-actions">${neighborButtons}</div>
            </div>
        </div>
    `;
}

function confirmLocation(id) {
    const message = document.getElementById(`location-message-${id}`);
    const panel = document.getElementById(`neighbor-panel-${id}`);
    if (message) message.textContent = '可依步驟繼續放鬆，過程維持溫和、可控制的力道。';
    if (panel) panel.classList.add('hidden');
}

function showNeighborOptions(id) {
    const message = document.getElementById(`location-message-${id}`);
    const panel = document.getElementById(`neighbor-panel-${id}`);
    if (message) message.textContent = '';
    if (panel) panel.classList.remove('hidden');
}

function selectNeighborMuscle(muscleId) {
    selectMuscle(muscleId);
    document.getElementById('equipment-section')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderExerciseList() {
    const list = document.getElementById('exercise-list');
    if (!list) return;

    list.innerHTML = Object.entries(exercisesData).map(([key, exercise]) => `
        <button
            class="exercise-btn ${key === currentExercise ? 'active' : ''}"
            onmouseenter="previewExerciseTargets('${key}')"
            onfocus="previewExerciseTargets('${key}')"
            onclick="selectExercise('${key}')"
        >
            ${escapeHTML(exercise.title)}
        </button>
    `).join('');
}

function selectExercise(exerciseKey) {
    if (!exercisesData[exerciseKey]) return;
    currentExercise = exerciseKey;
    renderExerciseList();
    renderExerciseCard(exerciseKey);
    if (currentMode === 'fitness') {
        previewExerciseTargets(exerciseKey);
    }
}

function previewExerciseTargets(exerciseKey) {
    if (currentMode !== 'fitness') return;

    const exercise = exercisesData[exerciseKey];
    if (!exercise) return;

    clearFitnessTargets();
    exercise.targetMuscles.forEach(markFitnessTarget);

    const label = document.getElementById('fitness-target-label');
    if (label) {
        label.textContent = `目標肌群：${exercise.targetMuscles.map(muscle => muscleNames[muscle] || muscle).join('、')}`;
    }
}

function clearFitnessTargets() {
    document.querySelectorAll('#svg-wrapper path.fitness-target')
        .forEach(el => el.classList.remove('fitness-target'));
}

function markFitnessTarget(muscleId) {
    (muscleMap[muscleId] || []).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('fitness-target');
    });
}

function renderExerciseCard(exerciseKey) {
    const container = document.getElementById('exercise-card');
    const demoSlot = document.getElementById('fitness-demo-slot');
    if (!container && !demoSlot) return;

    const exercise = exercisesData[exerciseKey];
    const equipment = exercise.equipment.join('、');

    if (demoSlot) {
        demoSlot.innerHTML = renderExerciseMedia(exercise.image, exercise.title);
    }

    if (!container) return;

    container.innerHTML = `
        <div class="fitness-card">
            <div class="fitness-card-header">
                <h3>${escapeHTML(exercise.title)}</h3>
            </div>
            <div class="fitness-card-body">
                <div class="fitness-meta">
                    <span class="fitness-tag">器材：${escapeHTML(equipment)}</span>
                </div>

                <h4>動作步驟</h4>
                <ol>${exercise.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>

                <h4>常見錯誤</h4>
                <ul>${exercise.commonMistakes.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>

                <div class="method-caution"><strong>注意事項：</strong>${escapeHTML(exercise.caution)}</div>
                <div class="fitness-pose-placeholder">
                    ${exercise.formChecks.length
                        ? '可使用下方 MediaPipe form check 檢查姿勢穩定與動作幅度。'
                        : '此動作目前提供教學與目標肌群預覽，姿勢檢查尚未開放。'}
                </div>
            </div>
        </div>
    `;
}

function renderExerciseMedia(image, title) {
    if (!image) {
        return `
            <div class="fitness-demo-media">
                <div class="fitness-demo-placeholder">示範圖待補</div>
            </div>
        `;
    }

    const webpImage = getWebpImagePath(image);
    return `
        <div class="fitness-demo-media">
            <picture>
                <source srcset="${escapeHTML(webpImage)}" type="image/webp">
                <img class="fitness-demo-image" src="${escapeHTML(image)}" alt="${escapeHTML(title)}示意圖" loading="lazy">
            </picture>
        </div>
    `;
}

function renderMethodMedia(image, title) {
    if (image) {
        const webpImage = getWebpImagePath(image);
        return `
            <div class="method-media">
                <picture>
                    <source srcset="${escapeHTML(webpImage)}" type="image/webp">
                    <img class="method-image" src="${escapeHTML(image)}" alt="${escapeHTML(title)}示範圖" loading="lazy">
                </picture>
            </div>
        `;
    }

    return `
        <div class="method-media">
            <div class="method-image-placeholder">示範圖待補</div>
        </div>
    `;
}

function getWebpImagePath(image) {
    const nestedMatch = image.match(/^images\/(.+)\/([^/]+)\.png$/i);
    if (nestedMatch) {
        return `images/${nestedMatch[1]}/webp/${nestedMatch[2]}.webp`;
    }

    return image.replace(/^images\/(.+)\.png$/i, 'images/webp/$1.webp');
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
