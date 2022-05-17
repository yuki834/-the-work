'use strict'

// プレイヤー側の選択肢のボタンの名前割り当て
const sentaku = ["攻撃", "ヒャダルコ", "イオラ", "ベホマズン"];
// ボタン宣言時の短縮
const $button = document.getElementsByTagName("button");

const info = document.getElementById('myInfo');


const yuTenmetu = document.getElementById('yusya-tenmetu');
const mgTenmetu = document.getElementById('mg-tenmetu');
const armyTenmetu01 = document.getElementById('army-gazou01');
const armyTenmetu02 = document.getElementById('army-gazou02');
const armyTenmetu03 = document.getElementById('army-gazou03');
const armyTenmetu04 = document.getElementById('army-gazou04');


// ================================
// ここからウィンドウ読み込み完了後に走る処理
// ================================
$(window).on('load', function () {
    setTimeout(function () {
        $('#big').fadeOut(2000);
    }, 2000);
    info.textContent = '魔物の群れが現れた！'
});

// setTimeout(function () {
//     $('#big').
//         // css('display', 'none');
//         fadeOut(2000);
// }, 2000);

// ================================
// ここまでウィンドウ読み込み完了後に走る処理
// ================================


// ========================================
// ここからプレイヤー側ステータス一覧
// ======================================

// プレイヤー側のステータス情報
const myData = {
    name: 'とんぬら',
    maxHp: 5000,
    hp: 5000,/* 体力 */
    mp: 500,
    attack: 400,/* 物理攻撃力 */
    defence: 350,/* 物理防御力 */
    magicAttack: 280,/* 呪文攻撃力 */
    magicDefence: 300/* 呪文防御力 */
}

// プレイヤー側パートナーのステータス情報
const myPtData = {
    name: 'マジシャン',
    maxHp: 5000,
    hp: 5000,/* 体力 */
    attack: 100,/* 物理攻撃力 */
    defence: 250,/* 物理防御力 */
    magicAttack: 500,/* 呪文攻撃力 */
    magicDefence: 400/* 呪文防御力 */
}



// ========================================
// ここまでプレイヤー側ステータス一覧
// ======================================



// ========================================
// ここから敵側ステータス一覧
// ======================================

// 敵側のステータス情報
const armyData01 = {
    name: 'ゴーレム',
    maxHp: 6000,
    hp: 6000,
    attack: 250,
    defence: 600,
    magicAttack: 120,
    magicDefence: 100
}

// 敵側のステータス情報
const armyData02 = {
    name: 'シャドー',
    maxHp: 3500,
    hp: 3500,
    attack: 250,
    defence: 250,
    magicAttack: 200,
    magicDefence: 200
}

// 敵側のステータス情報
const armyData03 = {
    name: 'ドラゴン',
    maxHp: 7000,
    hp: 7000,
    attack: 500,
    defence: 300,
    magicAttack: 450,
    magicDefence: 250
}

// 敵側のステータス情報
const armyData04 = {
    name: 'ネクロ',
    maxHp: 5000,
    hp: 5000,
    attack: 100,
    defence: 200,
    magicAttack: 600,
    magicDefence: 400
}

// ========================================
// ここまで敵側ステータス一覧
// ======================================

// =============================================
// ここからステータス表記関係
// ==============================================

// 各々のステータス表記時の簡略化
function insertText(id, text) {
    document.getElementById(id).textContent = text;
}

// 味方側のステータス表記
insertText('myName', myData.name);/* プレイヤー側の名前 */
insertText('currentMyHp', myData.hp);/* プレイヤー側の残りHP */
insertText('maxMyHp', myData.hp);/* プレイヤー側の最大HP */
insertText('currentMyMp', myData.mp);/* プレイヤー側の残りMP */
insertText('maxMyMp', myData.mp);/* プレイヤー側の最大MP */

// 味方側パートナーのステータス表記
insertText('partnerName', myPtData.name);/* プレイヤー側の名前 */
insertText('currentPtHp', myPtData.hp);/* プレイヤー側の残りHP */
insertText('maxPtHp', myPtData.hp);/* プレイヤー側の最大HP */

// 敵側のステータス表記
// army01のステータス(一番左)
insertText('armyName01', armyData01.name);
insertText('currentArmy01Hp', armyData01.hp);
insertText('maxArmy01Hp', armyData01.hp);

// army01のステータス
insertText('armyName02', armyData02.name);
insertText('currentArmy02Hp', armyData02.hp);
insertText('maxArmy02Hp', armyData02.hp);

// army01のステータス(一番左)
insertText('armyName03', armyData03.name);
insertText('currentArmy03Hp', armyData03.hp);
insertText('maxArmy03Hp', armyData03.hp);

// army01のステータス(一番左)
insertText('armyName04', armyData04.name);
insertText('currentArmy04Hp', armyData04.hp);
insertText('maxArmy04Hp', armyData04.hp);

// =============================================
// ここまでステータス表記関係
// ==============================================

// 敵の出現と選択肢の表示
const setupArmy = () => {
    let buttonIndex = 0;
    let buttonLength = $button.length;
    while (buttonIndex < buttonLength) {
        $button[buttonIndex].textContent = sentaku[buttonIndex];
        buttonIndex++;
    }
}
setupArmy();

// =================================================
// ここから乱数関係
// =================================================

let ransu;
// アクション発生時のランダム要素用の乱数
const ransu01 = function () {
    const x = Math.floor(Math.random() * 101);
    ransu = x;
    return ransu;
}

// ダメージ計算時に使う乱数
const ransu02 = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 回復時の処理
let careful;
const care = function (min, max) {
    careful = Math.floor(Math.random() * (max - min + 1) + min);
    console.log('回復量は' + careful);
}

// =================================================
// ここまで乱数関係
// =================================================

// ============================================
// 回復判定用関数
// ============================================

// プレイヤー用
const careHantei01 = function () {
    if (myData.hp > myData.maxHp) {
        myData.hp = myData.maxHp;
    }
}

// マジシャン用
const careHantei02 = function () {
    if (myPtData.hp > myPtData.maxHp) {
        myPtData.hp = myPtData.maxHp;
    }
}

// ゴーレム用
const careHantei03 = function () {
    if (armyData01.hp > armyData01.maxHp) {
        armyData01.hp = armyData01.maxHp;
    }
}

// シャドー用
const careHantei04 = function () {
    if (armyData02.hp > armyData02.maxHp) {
        armyData02.hp = armyData02.maxHp;
    }
}

// ドラゴン用
const careHantei05 = function () {
    if (armyData03.hp > armyData03.maxHp) {
        armyData03.hp = armyData03.maxHp;
    }
}

// ネクロ用
const careHantei06 = function () {
    if (armyData04.hp > armyData04.maxHp) {
        armyData04.hp = armyData04.maxHp;
    }
}

// ===============================
// 割合条件判断用関数
// ==============================
const is10per = function (val, max, per) {
    let v = Math.floor((val / max) * 100)
    if (v > per) {
        return true;
    } else {
        return false;
    }
}

// =======================================
// ここからダメージ発生時の点滅
// =========================================

const yusyaTenmetu = function () {
    yuTenmetu.src = 'images/yusyaDamage.gif';
    setTimeout(function () {
        yuTenmetu.src = 'images/yusya.png'
    }, 500);
}

const magicianTenmetu = function () {
    mgTenmetu.src = 'images/maDamage.gif';
    setTimeout(function () {
        mgTenmetu.src = 'images/magician.png'
    }, 500);
}

// 個別攻撃はアクション選択に、全体攻撃の際は各々の全体攻撃の箇所に記載
const armyGazouTenmetu01 = function () {
    armyTenmetu01.src = 'images/golemDamage.gif';
    setTimeout(function () {
        armyTenmetu01.src = 'images/golem.png'
    }, 500);
}

const armyGazouTenmetu02 = function () {
    armyTenmetu02.src = 'images/shadowDamage.gif';
    setTimeout(function () {
        armyTenmetu02.src = 'images/shadow.png'
    }, 500);
}

const armyGazouTenmetu03 = function () {
    armyTenmetu03.src = 'images/dragonDamage.gif';
    setTimeout(function () {
        armyTenmetu03.src = 'images/dragon.png'
    }, 500);
}

const armyGazouTenmetu04 = function () {
    armyTenmetu04.src = 'images/necromancerDamage.gif';
    setTimeout(function () {
        armyTenmetu04.src = 'images/necromancer.png'
    }, 500);
}

// =======================================
// ここまでダメージ発生時の点滅
// =========================================

// ==================================================
//  ここから敵へ攻撃後のHP判定
// ===================================================

// 敵を倒したときにカウントアップさせ、countが４になった時に勝利判定
let armyCount = 0;

const winLose = function () {
    if (armyCount === 4) {
        if (window.confirm('魔物の群れを倒した！ 次へ進みますか？')) {
            alert('欲しいアイテムは手に入れたからと言ってマジシャンは去っていきました。次へ進みます')
            location.href = "boss.html";
        }
    }
    if (myData.hp < 1) {
        myData.hp = 0;
        window.alert('魔物の群れに負けました。お疲れさまでした');
        history.back();
    }
};


const hantei01 = function () {
    if (myData.hp >= 1 && armyData01.hp >= 1) {
    } else if (armyData01.hp <= 0) {
        info.textContent = armyData01.name + 'を倒した！';
        armyData01.hp = 0;
        insertText('currentArmy01Hp', armyData01.hp);
        armyCount += 1;
        console.log(armyCount);
        winLose();
        // 倒した敵の表示を消す
        const st = document.querySelectorAll('.status');
        console.log(st);
        st[0].innerHTML = '';
        // HP0の時にセレクトボックスの選択肢から削除
        let dele = document.getElementById("taisyo");
        dele.remove(0);
    } else {
        myData.hp = 0;
        insertText('currentMyHp', myData.hp);
        window.alert('魔物の群れに敗北した...。お疲れ様でした');
        history.back();
    }
};
const hantei02 = function () {
    if (myData.hp >= 1 && armyData02.hp >= 1) {
    } else if (armyData02.hp <= 0) {
        info.textContent = armyData02.name + 'を倒した！';
        armyData02.hp = 0;
        insertText('currentArmy02Hp', armyData02.hp);
        armyCount += 1;
        console.log(armyCount);
        winLose();
        // 倒した敵の表示を消す
        const st = document.querySelectorAll('.status');
        console.log(st);
        st[1].innerHTML = '';
        // HP0の時にセレクトボックスの選択肢から削除
        if (armyData01.hp < 1) {
            let dele = document.getElementById("taisyo");
            dele.remove(0);
        } else {
            let dele = document.getElementById("taisyo");
            dele.remove(1);
        }
    } else {
        myData.hp = 0;
        insertText('currentMyHp', myData.hp);
        window.alert('魔物の群れに敗北した...。お疲れ様でした');
        history.back();
    }
};

const hantei03 = function () {
    if (myData.hp >= 1 && armyData03.hp >= 1) {
    } else if (armyData03.hp <= 0) {
        info.textContent = armyData03.name + 'を倒した！';
        armyData03.hp = 0;
        insertText('currentArmy03Hp', armyData03.hp);
        armyCount += 1;
        console.log(armyCount);
        winLose();
        // 倒した敵の表示を消す
        const st = document.querySelectorAll('.status');
        console.log(st);
        st[2].innerHTML = '';
        // HP0の時にセレクトボックスの選択肢から削除
        if (armyData01.hp < 1 && armyData02.hp < 1) {
            let dele = document.getElementById("taisyo");
            dele.remove(0);
        } else if (armyData01.hp < 1 || armyData02.hp < 1) {
            let dele = document.getElementById("taisyo");
            dele.remove(1);
        } else {
            let dele = document.getElementById("taisyo");
            dele.remove(2);
        }
    } else {
        myData.hp = 0;
        insertText('currentMyHp', myData.hp);
        window.alert('魔物の群れに敗北した...。お疲れ様でした');
        history.back();
    }

};

const hantei04 = function () {
    if (myData.hp >= 1 && armyData04.hp >= 1) {
    } else if (armyData04.hp <= 0) {
        info.textContent = armyData04.name + 'を倒した！';
        armyData04.hp = 0;
        insertText('currentArmy04Hp', armyData04.hp);
        armyCount += 1;
        console.log(armyCount);
        winLose();
        // 倒した敵の表示を消す
        const st = document.querySelectorAll('.status');
        console.log(st);
        st[3].innerHTML = '';
        // HP0の時にセレクトボックスの選択肢から削除
        if (armyData01.hp < 1 && armyData02.hp < 1 && armyData03.hp < 1) {
            let dele = document.getElementById("taisyo");
            dele.remove(0);
        } else if ((armyData01.hp < 1 && armyData02.hp < 1) || (armyData02.hp < 1 && armyData03.hp < 1) || (armyData01.hp < 1 && armyData03 < 1)) {
            let dele = document.getElementById("taisyo");
            dele.remove(1);
        } else if (armyData01.hp < 1 || armyData02.hp < 1 || armyData03 < 1) {
            let dele = document.getElementById("taisyo");
            dele.remove(2);
        } else {
            let dele = document.getElementById("taisyo");
            dele.remove(2);
        }
    } else {
        myData.hp = 0;
        insertText('currentMyHp', myData.hp);
        window.alert('魔物の群れに敗北した...。お疲れ様でした');
        history.back();
    }
}

// ======================================================
// ここまで敵へ攻撃時の判定
// ======================================================


// =========================================================
// ここからプレイヤー攻撃時のダメージ計算式
// ========================================================

let damage;
// 物理攻撃時
const normalAttack01 = function (normal) {
    const exDamage = Math.floor(normal * myData.attack / armyData01.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage
}
const normalAttack02 = function (normal) {
    const exDamage = Math.floor(normal * myData.attack / armyData02.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage
}
const normalAttack03 = function (normal) {
    const exDamage = Math.floor(normal * myData.attack / armyData03.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage
}
const normalAttack04 = function (normal) {
    const exDamage = Math.floor(normal * myData.attack / armyData04.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage
}

// 魔法攻撃時

const mahouAttack01 = function (magic, min, max) {
    const exDamage = Math.floor(magic * myData.magicAttack / armyData01.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const mahouAttack02 = function (magic, min, max) {
    const exDamage = Math.floor(magic * myData.magicAttack / armyData02.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const mahouAttack03 = function (magic, min, max) {
    const exDamage = Math.floor(magic * myData.magicAttack / armyData03.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}
const mahouAttack04 = function (magic, min, max) {
    const exDamage = Math.floor(magic * myData.magicAttack / armyData04.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}
//========================================================
// ここからプレイヤー全体攻撃関数
// ========================================================
const zen01 = function () {
    if (armyData01.hp >= 1) {
        mahouAttack01(70, 70, 100);
        armyData01.hp -= damage;
        armyGazouTenmetu01();
        insertText('currentArmy01Hp', armyData01.hp);
        console.log(insertText('currentArmy01Hp', armyData01.hp));
        insertText('currentMyMp', myData.mp);
        info.textContent = 'イオラを唱えた！' + armyData01.name + 'に' + damage + 'のダメージ！';
        hantei01();
    }
    setTimeout(zen02, 1000);

}

const zen02 = function () {
    if (armyData02.hp >= 1) {
        mahouAttack02(70, 70, 100);
        armyData02.hp -= damage;
        armyGazouTenmetu02();
        insertText('currentArmy02Hp', armyData02.hp);
        console.log(insertText('currentArmy02Hp', armyData02.hp));
        insertText('currentMyMp', myData.mp);
        info.textContent = 'イオラを唱えた！' + armyData02.name + 'に' + damage + 'のダメージ！';
        hantei02();
    }
    setTimeout(zen03, 1000);
}
const zen03 = function () {
    if (armyData03.hp >= 1) {
        mahouAttack02(70, 70, 100);
        armyData03.hp -= damage;
        armyGazouTenmetu03();
        insertText('currentArmy03Hp', armyData03.hp);
        console.log(insertText('currentArmy03Hp', armyData03.hp));
        insertText('currentMyMp', myData.mp);
        info.textContent = 'イオラを唱えた！' + armyData03.name + 'に' + damage + 'のダメージ！';
        hantei03();
    }
    setTimeout(zen04, 1000);
}

const zen04 = function () {
    if (armyData04.hp >= 1) {
        mahouAttack02(70, 70, 100);
        armyData04.hp -= damage;
        armyGazouTenmetu04();
        insertText('currentArmy04Hp', armyData04.hp);
        console.log(insertText('currentArmy04Hp', armyData04.hp));
        insertText('currentMyMp', myData.mp);
        info.textContent = 'イオラを唱えた！' + armyData04.name + 'に' + damage + 'のダメージ！';
        hantei04();
    }
    setTimeout(magicianPatern, 1000);
}

//========================================================
// ここまでプレイヤー全体攻撃関数
// ========================================================

// ===================================================
// ここからマジシャンの攻撃時の式
// ====================================================

const magicianAttack01 = function (magic, min, max) {
    const exDamage = Math.floor(magic * myPtData.magicAttack / armyData01.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const magicianAttack02 = function (magic, min, max) {
    const exDamage = Math.floor(magic * myPtData.magicAttack / armyData02.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const magicianAttack03 = function (magic, min, max) {
    const exDamage = Math.floor(magic * myPtData.magicAttack / armyData03.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}
const magicianAttack04 = function (magic, min, max) {
    const exDamage = Math.floor(magic * myPtData.magicAttack / armyData04.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

// ===================================================
// ここからマジシャンの攻撃時の式
// ====================================================

//========================================================
// ここからマジシャン全体攻撃関数
// ========================================================
const mgZen01 = function () {
    if (armyData01.hp >= 1) {
        magicianAttack01(70, 70, 100);
        armyData01.hp -= damage;
        armyGazouTenmetu01();
        insertText('currentArmy01Hp', armyData01.hp);
        console.log(insertText('currentArmy01Hp', armyData01.hp));
        info.textContent = 'マジシャンはイオラを唱えた！' + armyData01.name + 'に' + damage + 'のダメージ！';
        hantei01();
    }
    setTimeout(mgZen02, 1000);
}

const mgZen02 = function () {
    if (armyData02.hp >= 1) {
        magicianAttack02(70, 70, 100);
        armyData02.hp -= damage;
        armyGazouTenmetu02();
        insertText('currentArmy02Hp', armyData02.hp);
        console.log(insertText('currentArmy02Hp', armyData02.hp));
        info.textContent = 'マジシャンはイオラを唱えた！' + armyData02.name + 'に' + damage + 'のダメージ！';
        hantei02();
    }
    setTimeout(mgZen03, 1000);
}
const mgZen03 = function () {
    if (armyData03.hp >= 1) {
        magicianAttack03(70, 70, 100);
        armyData03.hp -= damage;
        armyGazouTenmetu03();
        insertText('currentArmy03Hp', armyData03.hp);
        console.log(insertText('currentArmy03Hp', armyData03.hp));
        info.textContent = 'マジシャンはイオラを唱えた！' + armyData03.name + 'に' + damage + 'のダメージ！';
        hantei03();
    }
    setTimeout(mgZen04, 1000);
}

const mgZen04 = function () {
    if (armyData04.hp >= 1) {
        magicianAttack04(70, 70, 100);
        armyData04.hp -= damage;
        armyGazouTenmetu04();
        insertText('currentArmy04Hp', armyData04.hp);
        console.log(insertText('currentArmy04Hp', armyData04.hp));
        info.textContent = 'マジシャンはイオラを唱えた！' + armyData04.name + 'に' + damage + 'のダメージ！';
        hantei04();
    }
    setTimeout(armyAttack01, 1000);
}

//========================================================
// ここまでマジシャン全体攻撃関数
// ========================================================

// ==================================================
// ここから敵の攻撃時の式
// ================================================

// プレイヤーへの通常攻撃4体分
const armyNomalAttack01 = function (normal) {
    const exDamage = Math.floor(normal * armyData01.attack / myData.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage;
}

const armyNomalAttack02 = function (normal) {
    const exDamage = Math.floor(normal * armyData02.attack / myData.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage;
}

const armyNomalAttack03 = function (normal) {
    const exDamage = Math.floor(normal * armyData03.attack / myData.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage;
}

const armyNomalAttack04 = function (normal) {
    const exDamage = Math.floor(normal * armyData01.attack / myData.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage;
}

// マジシャンへの通常攻撃4体分
const armyNomalAttack01Pt = function (normal) {
    const exDamage = Math.floor(normal * armyData01.attack / myPtData.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage;
}

const armyNomalAttack02Pt = function (normal) {
    const exDamage = Math.floor(normal * armyData02.attack / myPtData.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage;
}

const armyNomalAttack03Pt = function (normal) {
    const exDamage = Math.floor(normal * armyData03.attack / myPtData.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage;
}

const armyNomalAttack04Pt = function (normal) {
    const exDamage = Math.floor(normal * armyData01.attack / myPtData.defence / 40 * ransu02(60, 120));
    console.log('通常攻撃の攻撃力は' + exDamage);
    damage = exDamage;
}



// 敵側のプレイヤーへの呪文攻撃時の式
const armymahouAttack01 = function (magic, min, max) {
    const exDamage = Math.floor(magic * armyData01.magicAttack / myData.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const armymahouAttack02 = function (magic, min, max) {
    const exDamage = Math.floor(magic * armyData02.magicAttack / myData.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const armymahouAttack03 = function (magic, min, max) {
    const exDamage = Math.floor(magic * armyData03.magicAttack / myData.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const armymahouAttack04 = function (magic, min, max) {
    const exDamage = Math.floor(magic * armyData04.magicAttack / myData.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

// 敵側のマジシャンへの魔法攻撃時の式

const armymahouAttack01Pt = function (magic, min, max) {
    const exDamage = Math.floor(magic * armyData01.magicAttack / myPtData.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const armymahouAttack02Pt = function (magic, min, max) {
    const exDamage = Math.floor(magic * armyData02.magicAttack / myPtData.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const armymahouAttack03Pt = function (magic, min, max) {
    const exDamage = Math.floor(magic * armyData03.magicAttack / myPtData.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

const armymahouAttack04Pt = function (magic, min, max) {
    const exDamage = Math.floor(magic * armyData04.magicAttack / myPtData.magicDefence / 50 * ransu02(min, max));
    console.log('ダメージは' + exDamage);
    damage = exDamage;
}

// ==================================================
// ここまで敵の攻撃時の式
// ================================================

// ==============================================
// ここから敵の全体攻撃時の処理
// =============================================

// army01の全体攻撃
const armyZen01 = function () {
    if (myData.hp >= 1) {
        armymahouAttack01(60, 70, 100);
        myData.hp -= damage;
        yusyaTenmetu();
        insertText('currentMyHp', myData.hp);
        info.textContent = armyData01.name + 'はイオラを唱えた！' + myData.name + 'に' + damage + 'のダメージ！';
        hantei01();
        setTimeout(armyZen02, 1000);
    }
}

const armyZen02 = function () {
    if (myPtData.hp >= 1) {
        armymahouAttack01Pt(60, 70, 100);
        myPtData.hp -= damage;
        magicianTenmetu();
        insertText('currentPtHp', myPtData.hp);
        info.textContent = armyData01.name + 'はイオラを唱えた！' + myPtData.name + 'に' + damage + 'のダメージ！';
        setTimeout(armyAttack02, 1000);
    } else {
        setTimeout(armyAttack02, 1000);
    }
}

// army02の全体攻撃
const armyZen03 = function () {
    if (myData.hp >= 1) {
        armymahouAttack02(60, 70, 100);
        myData.hp -= damage;
        yusyaTenmetu();
        insertText('currentMyHp', myData.hp);
        info.textContent = armyData02.name + 'はイオラを唱えた！' + myData.name + 'に' + damage + 'のダメージ！';
        hantei02();
        setTimeout(armyZen04, 1000);
    }
}

const armyZen04 = function () {
    if (myPtData.hp >= 1) {
        armymahouAttack02Pt(60, 70, 100);
        myPtData.hp -= damage;
        magicianTenmetu();
        insertText('currentPtHp', myPtData.hp);
        info.textContent = armyData02.name + 'はイオラを唱えた！' + myPtData.name + 'に' + damage + 'のダメージ！';
        setTimeout(armyAttack03, 1000);
    } else {
        setTimeout(armyAttack03, 1000);
    }
}

// army03の全体攻撃
const armyZen05 = function () {
    if (myData.hp >= 1) {
        armymahouAttack03(60, 70, 100);
        myData.hp -= damage;
        yusyaTenmetu();
        insertText('currentMyHp', myData.hp);
        info.textContent = armyData03.name + 'はイオラを唱えた！' + myData.name + 'に' + damage + 'のダメージ！';
        hantei03();
        setTimeout(armyZen06, 1000);
    }
}

const armyZen06 = function () {
    if (myPtData.hp >= 1) {
        armymahouAttack03Pt(60, 70, 100);
        myPtData.hp -= damage;
        magicianTenmetu();
        insertText('currentPtHp', myPtData.hp);
        info.textContent = armyData03.name + 'はイオラを唱えた！' + myPtData.name + 'に' + damage + 'のダメージ！';
        setTimeout(armyAttack04, 1000);
    } else {
        setTimeout(armyAttack04, 1000);
    }
}

// army04の全体攻撃
const armyZen07 = function () {
    if (myData.hp >= 1) {
        armymahouAttack04(60, 70, 100);
        myData.hp -= damage;
        yusyaTenmetu();
        insertText('currentMyHp', myData.hp);
        info.textContent = armyData04.name + 'はイオラを唱えた！' + myData.name + 'に' + damage + 'のダメージ！';
        hantei04();
        setTimeout(armyZen08, 1000);
    }
}

const armyZen08 = function () {
    if (myPtData.hp >= 1) {
        armymahouAttack04Pt(60, 70, 100);
        myPtData.hp -= damage;
        magicianTenmetu();
        insertText('currentPtHp', myPtData.hp);
        info.textContent = armyData04.name + 'はイオラを唱えた！' + myPtData.name + 'に' + damage + 'のダメージ！';
    }
}


// ========================================================
// ここからマジシャンの行動パターン
// ======================================================

const magicianPatern = function () {

    if (is10per(myData.hp, myData.maxHp, 10)) {
        ransu01();
        console.log('敵は', ransu);
        if (ransu <= 20) {
            ransu01();
            console.log(ransu);
            if (ransu < 26) {/* 乱数が26より低いとき、army01を攻撃 */
                if (armyData01.hp >= 1) {
                    magicianAttack01(50, 50, 80);
                    armyData01.hp -= damage;
                    armyGazouTenmetu01();
                    insertText('currentArmy01Hp', armyData01.hp);
                    console.log(insertText('currentArmy01Hp', armyData01.hp));
                    info.textContent = 'マジシャンはヒャドを唱えた！' + armyData01.name + 'に' + damage + 'のダメージ！';
                    hantei01();
                    setTimeout(armyAttack01, 1000);
                } else {
                    magicianPatern();
                }

            } else if (ransu < 51) {/* 乱数が51より低いとき、army02を攻撃 */
                if (armyData02.hp >= 1) {
                    magicianAttack02(50, 50, 80);
                    armyData02.hp -= damage;
                    armyGazouTenmetu02();
                    insertText('currentArmy02Hp', armyData02.hp);
                    console.log(insertText('currentArmy02Hp', armyData02.hp));
                    info.textContent = 'マジシャンはヒャドを唱えた！' + armyData02.name + 'に' + damage + 'のダメージ！';
                    hantei02();
                    setTimeout(armyAttack01, 1000);
                } else {
                    magicianPatern();
                }

            } else if (ransu < 76) {/* 乱数が76より低いとき、army03を攻撃 */
                if (armyData03.hp >= 1) {
                    magicianAttack03(50, 50, 80);
                    armyData03.hp -= damage;
                    armyGazouTenmetu03();
                    insertText('currentArmy03Hp', armyData03.hp);
                    console.log(insertText('currentArmy03Hp', armyData03.hp));
                    info.textContent = 'マジシャンはヒャドを唱えた！' + armyData03.name + 'に' + damage + 'のダメージ！';
                    hantei03();
                    setTimeout(armyAttack01, 1000);
                } else {
                    magicianPatern();
                }

            } else {/* 上記以外のとき、army04を攻撃 */
                if (armyData04.hp >= 1) {
                    magicianAttack04(50, 50, 80);
                    armyData04.hp -= damage;
                    armyGazouTenmetu04();
                    insertText('currentArmy04Hp', armyData04.hp);
                    console.log(insertText('currentArmy04Hp', armyData04.hp));
                    info.textContent = 'マジシャンはヒャドを唱えた！' + armyData04.name + 'に' + damage + 'のダメージ！';
                    hantei04();
                    setTimeout(armyAttack01, 1000);
                } else {
                    magicianPatern();
                }
            }
        } else if (ransu <= 60) {
            mgZen01();
        } else if (ransu <= 90) {
            ransu01();
            console.log(ransu);
            if (ransu < 26) {/* 乱数が26より低いとき、army01を攻撃 */
                if (armyData01.hp >= 1) {
                    magicianAttack01(80, 80, 120);
                    armyData01.hp -= damage;
                    armyGazouTenmetu01();
                    insertText('currentArmy01Hp', armyData01.hp);
                    console.log(insertText('currentArmy01Hp', armyData01.hp));
                    info.textContent = 'マジシャンはヒャダルコを唱えた！' + armyData01.name + 'に' + damage + 'のダメージ！';
                    hantei01();
                    setTimeout(armyAttack01, 1000);
                } else {
                    magicianPatern();
                }

            } else if (ransu < 51) {/* 乱数が51より低いとき、army02を攻撃 */
                if (armyData02.hp >= 1) {
                    magicianAttack02(80, 80, 120);
                    armyData02.hp -= damage;
                    armyGazouTenmetu02();
                    insertText('currentArmy02Hp', armyData02.hp);
                    console.log(insertText('currentArmy02Hp', armyData02.hp));
                    info.textContent = 'マジシャンはヒャダルコを唱えた！' + armyData02.name + 'に' + damage + 'のダメージ！';
                    hantei02();
                    setTimeout(armyAttack01, 1000);
                } else {
                    magicianPatern();
                }

            } else if (ransu < 76) {/* 乱数が76より低いとき、army03を攻撃 */
                if (armyData03.hp >= 1) {
                    magicianAttack03(80, 80, 120);
                    armyData03.hp -= damage;
                    armyGazouTenmetu03();
                    insertText('currentArmy03Hp', armyData03.hp);
                    console.log(insertText('currentArmy03Hp', armyData03.hp));
                    info.textContent = 'マジシャンはヒャダルコを唱えた！' + armyData03.name + 'に' + damage + 'のダメージ！';
                    hantei03();
                    setTimeout(armyAttack01, 1000);
                } else {
                    magicianPatern();
                }

            } else {/* 上記以外のとき、army04を攻撃 */
                if (armyData04.hp >= 1) {
                    magicianAttack04(80, 80, 120);
                    armyData04.hp -= damage;
                    armyGazouTenmetu04();
                    insertText('currentArmy04Hp', armyData04.hp);
                    info.textContent = 'マジシャンはヒャダルコを唱えた！' + armyData04.name + 'に' + damage + 'のダメージ！';
                    hantei04();
                    setTimeout(armyAttack01, 1000);
                } else {
                    magicianPatern();
                }
            }
        } else {
            care(250, 300);
            myData.hp += careful;
            myPtData.hp += careful;
            careHantei01();
            careHantei02();
            insertText('currentMyHp', myData.hp);
            insertText('currentPtHp', myPtData.hp);
            info.textContent = 'マジシャンはベホマズンを唱えた！' + myData.name + 'と' + myPtData.name + 'は' + careful + '回復した！';
            setTimeout(armyAttack01, 1000);
        }
    } else {
        care(500, 600);
        myData.hp += careful;
        myPtData.hp += careful;
        careHantei01();
        careHantei02();
        insertText('currentMyHp', myData.hp);
        insertText('currentPtHp', myPtData.hp);
        info.textContent = 'マジシャンは本気のベホマズンを唱えた！' + myData.name + 'と' + myPtData.name + 'は' + careful + '回復した！';
        setTimeout(armyAttack01, 1000);
    }
}

// ========================================================
// ここまでマジシャンの行動パターン
// ========================================================

// ==========================================================
// ここから敵側の行動パターン
// =========================================================

const armyAttack01 = function () {
    if (armyData01.hp >= 1) {
        ransu01();
        if (ransu <= 30) {
            ransu01();
            if (ransu <= 50) {/* 50以下でプレイヤーへの攻撃 */
                armyNomalAttack01(50);
                myData.hp -= damage;
                yusyaTenmetu();
                insertText('currentMyHp', myData.hp);
                info.textContent = armyData01.name + 'は腕を振り回した！' + myData.name + 'は' + damage + 'のダメージ！'
                hantei01();
                setTimeout(armyAttack02, 1000);
            } else {/* 51以上でマジシャンへの攻撃 */
                armyNomalAttack01Pt(50);
                myPtData.hp -= damage;
                magicianTenmetu();
                insertText('currentPtHp', myPtData.hp);
                info.textContent = armyData01.name + 'は腕を振り回した！' + myPtData.name + 'は' + damage + 'のダメージ！'
                hantei01();
                setTimeout(armyAttack02, 1000);
            }
        } else if (ransu <= 65) {
            ransu01();
            if (ransu <= 50) {
                armymahouAttack01(80, 80, 110);
                myData.hp -= damage;
                yusyaTenmetu();
                insertText('currentMyHp', myData.hp);
                info.textContent = armyData01.name + 'は泥を投げつけた！' + myData.name + 'は' + damage + 'のダメージ！'
                hantei01();
                setTimeout(armyAttack02, 1000);
            } else {
                armymahouAttack01(80, 80, 110);
                myPtData.hp -= damage;
                magicianTenmetu();
                insertText('currentPtHp', myPtData.hp);
                info.textContent = armyData01.name + 'は泥を投げつけた！' + myPtData.name + 'は' + damage + 'のダメージ！'
                hantei01();
                setTimeout(armyAttack02, 1000);
            }
        } else if (ransu <= 90) {
            armyZen01();
        } else {
            care(100, 120);
            if (armyData01.hp >= 1) {
                armyData01.hp += careful;
                careHantei03();
                insertText('currentArmy01Hp', armyData01.hp);

            }
            if (armyData02.hp >= 1) {
                armyData02.hp += careful;
                careHantei04();
                insertText('currentArmy02Hp', armyData02.hp);
            }
            if (armyData03.hp >= 1) {
                armyData03.hp += careful;
                careHantei05();
                insertText('currentArmy03Hp', armyData03.hp);
            }
            if (armyData04.hp >= 1) {
                armyData04.hp += careful;
                careHantei06();
                insertText('currentArmy04Hp', armyData04.hp);
            }
            info.textContent = armyData04.name + 'はベホマラーを唱えた！' + '魔物たちは' + careful + '回復した！'
            setTimeout(armyAttack03, 1000);
        }
    } else {
        armyAttack02();
    }
}

// army02の攻撃
const armyAttack02 = function () {
    if (armyData02.hp >= 1) {
        ransu01();
        if (ransu <= 30) {
            ransu01();
            if (ransu <= 50) {/* 50以下でプレイヤーへの攻撃 */
                armyNomalAttack02(50);
                myData.hp -= damage;
                yusyaTenmetu();
                insertText('currentMyHp', myData.hp);
                info.textContent = armyData02.name + 'は影で攻撃した！' + myData.name + 'は' + damage + 'のダメージ！'
                hantei02();
                setTimeout(armyAttack03, 1000);
            } else {/* 51以上でマジシャンへの攻撃 */
                armyNomalAttack02Pt(50);
                myPtData.hp -= damage;
                magicianTenmetu();
                insertText('currentPtHp', myPtData.hp);
                info.textContent = armyData02.name + 'は影で攻撃した！' + myPtData.name + 'は' + damage + 'のダメージ！'
                hantei02();
                setTimeout(armyAttack03, 1000);
            }
        } else if (ransu <= 65) {
            ransu01();
            if (ransu <= 50) {
                armymahouAttack02(80, 80, 110);
                myData.hp -= damage;
                yusyaTenmetu();
                insertText('currentMyHp', myData.hp);
                info.textContent = armyData02.name + 'はメラゾーマを唱えた！' + myData.name + 'は' + damage + 'のダメージ！'
                hantei02();
                setTimeout(armyAttack03, 1000);
            } else {
                armymahouAttack02Pt(80, 80, 110);
                myPtData.hp -= damage;
                magicianTenmetu();
                insertText('currentPtHp', myPtData.hp);
                info.textContent = armyData02.name + 'はメラゾーマを唱えた！' + myPtData.name + 'は' + damage + 'のダメージ！'
                hantei02();
                setTimeout(armyAttack03, 1000);
            }
        } else if (ransu <= 90) {
            armyZen03();

        } else {
            care(150, 200);
            if (armyData01.hp >= 1) {
                armyData01.hp += careful;
                careHantei03();
                insertText('currentArmy01Hp', armyData01.hp);

            }
            if (armyData02.hp >= 1) {
                armyData02.hp += careful;
                careHantei04();
                insertText('currentArmy02Hp', armyData02.hp);
            }
            if (armyData03.hp >= 1) {
                armyData03.hp += careful;
                careHantei05();
                insertText('currentArmy03Hp', armyData03.hp);
            }
            if (armyData04.hp >= 1) {
                armyData04.hp += careful;
                careHantei06();
                insertText('currentArmy04Hp', armyData04.hp);
            }
            info.textContent = armyData04.name + 'はベホマラーを唱えた！' + '魔物たちは' + careful + '回復した！'
            setTimeout(armyAttack03, 1000);
        }
    } else {
        armyAttack03();
    }
}

// army03の攻撃
const armyAttack03 = function () {
    if (armyData03.hp >= 1) {
        ransu01();
        if (ransu <= 30) {
            ransu01();
            if (ransu <= 50) {/* 50以下でプレイヤーへの攻撃 */
                armyNomalAttack03(50);
                myData.hp -= damage;
                yusyaTenmetu();
                insertText('currentMyHp', myData.hp);
                info.textContent = armyData03.name + 'は爪で切り裂いた！' + myData.name + 'は' + damage + 'のダメージ！'
                hantei03();
                setTimeout(armyAttack04, 1000);
            } else {/* 51以上でマジシャンへの攻撃 */
                armyNomalAttack03Pt(50);
                myPtData.hp -= damage;
                magicianTenmetu();
                insertText('currentPtHp', myPtData.hp);
                info.textContent = armyData03.name + 'は爪で切り裂いた！' + myPtData.name + 'は' + damage + 'のダメージ！'
                hantei03();
                setTimeout(armyAttack04, 1000);
            }
        } else if (ransu <= 65) {
            ransu01();
            if (ransu <= 50) {
                armymahouAttack03(80, 80, 110);
                myData.hp -= damage;
                yusyaTenmetu();
                insertText('currentMyHp', myData.hp);
                info.textContent = armyData03.name + 'は激しい炎を吹いた！' + myData.name + 'は' + damage + 'のダメージ！'
                hantei03();
                setTimeout(armyAttack04, 1000);
            } else {
                armymahouAttack03Pt(80, 80, 110);
                myData.hp -= damage;
                magicianTenmetu();
                insertText('currentPtHp', myPtData.hp);
                info.textContent = armyData03.name + 'は激しい炎を吹いた！' + myPtData.name + 'は' + damage + 'のダメージ！'
                hantei03();
                setTimeout(armyAttack04, 1000);
            }
        } else if (ransu <= 90) {
            armyZen05();
        } else {
            care(150, 200);
            if (armyData01.hp >= 1) {
                armyData01.hp += careful;
                careHantei03();
                insertText('currentArmy01Hp', armyData01.hp);

            }
            if (armyData02.hp >= 1) {
                armyData02.hp += careful;
                careHantei04();
                insertText('currentArmy02Hp', armyData02.hp);
            }
            if (armyData03.hp >= 1) {
                armyData03.hp += careful;
                careHantei05();
                insertText('currentArmy03Hp', armyData03.hp);
            }
            if (armyData04.hp >= 1) {
                armyData04.hp += careful;
                careHantei06();
                insertText('currentArmy04Hp', armyData04.hp);
            }
            info.textContent = armyData04.name + 'はベホマラーを唱えた！' + '魔物たちは' + careful + '回復した！'
            setTimeout(armyAttack04, 1000);
        }
    } else {
        armyAttack04();
    }
}

// army04の攻撃
const armyAttack04 = function () {
    if (armyData04.hp >= 1) {
        ransu01();
        if (ransu <= 30) {
            ransu01();
            if (ransu <= 50) {/* 50以下でプレイヤーへの攻撃 */
                armyNomalAttack04(50);
                myData.hp -= damage;
                yusyaTenmetu();
                insertText('currentMyHp', myData.hp);
                hantei04();
                info.textContent = armyData04.name + 'は武器を振り回した！' + myData.name + 'は' + damage + 'のダメージ！'
            } else {/* 51以上でマジシャンへの攻撃 */
                armyNomalAttack04Pt(50);
                myPtData.hp -= damage;
                magicianTenmetu();
                insertText('currentPtHp', myPtData.hp);
                hantei04();
                info.textContent = armyData04.name + 'は武器を振り回した！' + myPtData.name + 'は' + damage + 'のダメージ！'
            }
        } else if (ransu <= 65) {
            ransu01();
            if (ransu <= 50) {
                armymahouAttack04(80, 80, 110);
                myData.hp -= damage;
                yusyaTenmetu();
                insertText('currentMyHp', myData.hp);
                hantei04();
                info.textContent = armyData04.name + 'はメラゾーマを唱えた！' + myData.name + 'は' + damage + 'のダメージ！'
            } else {
                armymahouAttack04Pt(80, 80, 110);
                myData.hp -= damage;
                magicianTenmetu();
                insertText('currentPtHp', myPtData.hp);
                hantei04();
                info.textContent = armyData04.name + 'はメラゾーマを唱えた！' + myPtData.name + 'は' + damage + 'のダメージ！'
            }
        } else if (ransu <= 90) {
            armyZen07();
        } else {
            care(150, 200);
            if (armyData01.hp >= 1) {
                armyData01.hp += careful;
                careHantei03();
                insertText('currentArmy01Hp', armyData01.hp);

            }
            if (armyData02.hp >= 1) {
                armyData02.hp += careful;
                careHantei04();
                insertText('currentArmy02Hp', armyData02.hp);
            }
            if (armyData03.hp >= 1) {
                armyData03.hp += careful;
                careHantei05();
                insertText('currentArmy03Hp', armyData03.hp);
            }
            if (armyData04.hp >= 1) {
                armyData04.hp += careful;
                careHantei06();
                insertText('currentArmy04Hp', armyData04.hp);
            }
            info.textContent = armyData04.name + 'はベホマラーを唱えた！' + '魔物たちは' + careful + '回復した！'
        }
    }
}


// ==========================================================
// ここまで敵側の行動パターン
// =========================================================


//===========================================================
// ここから戦闘時のアクション
//===========================================================

$button[0].addEventListener("click", () => {
    ransu01();
    console.log(ransu);
    const sele = document.querySelector('#taisyo').value;
    switch (sele) {
        case 'army01':
            if (ransu >= 10) {
                normalAttack01(80);
                armyData01.hp -= damage;
                armyGazouTenmetu01();
                insertText('currentArmy01Hp', armyData01.hp);
                info.textContent = 'プレイヤーの攻撃！' + damage + 'のダメージ！'

                hantei01();/*プレイヤー側と敵側の残りHPの判定  */

                setTimeout(magicianPatern, 1000);


            } else {
                info.textContent = 'プレイヤーの攻撃が外れた！';
                hantei01();/*プレイヤー側と敵側の残りHPの判定  */

                setTimeout(magicianPatern, 1000);

            }
            break;
        case 'army02':
            if (ransu >= 10) {
                normalAttack02(80);
                armyData02.hp -= damage;
                armyGazouTenmetu02();
                insertText('currentArmy02Hp', armyData02.hp);
                info.textContent = 'プレイヤーの攻撃！' + damage + 'のダメージ！'

                hantei02();/*プレイヤー側と敵側の残りHPの判定  */

                setTimeout(magicianPatern, 1000);

            } else {
                info.textContent = 'プレイヤーの攻撃が外れた！';
                hantei02();/*プレイヤー側と敵側の残りHPの判定  */

                setTimeout(magicianPatern, 1000);

            }
            break;
        case 'army03':
            if (ransu >= 10) {
                normalAttack03(80);
                armyData03.hp -= damage;
                armyGazouTenmetu03();
                insertText('currentArmy03Hp', armyData03.hp);
                info.textContent = 'プレイヤーの攻撃！' + damage + 'のダメージ！'

                hantei03();/*プレイヤー側と敵側の残りHPの判定  */

                setTimeout(magicianPatern, 1000);

            } else {
                info.textContent = 'プレイヤーの攻撃が外れた！';
                hantei03();/*プレイヤー側と敵側の残りHPの判定  */

                setTimeout(magicianPatern, 1000);

            }
            break;
        case 'army04':
            if (ransu >= 10) {
                normalAttack04(80);
                armyData04.hp -= damage;
                armyGazouTenmetu04();
                insertText('currentArmy04Hp', armyData04.hp);
                info.textContent = 'プレイヤーの攻撃！' + damage + 'のダメージ！'

                hantei04();/*プレイヤー側と敵側の残りHPの判定  */

                setTimeout(magicianPatern, 1000);

            } else {
                info.textContent = 'プレイヤーの攻撃が外れた！';
                hantei04();/*プレイヤー側と敵側の残りHPの判定  */

                setTimeout(magicianPatern, 1000);
            }
            break;

        default:
            info.textContent = 'エラー発生';

    }
    // プレイヤー側、敵側のHPが1以上の時に攻撃、そうじゃなければ別表記
});

$button[1].addEventListener("click", () => {
    ransu01();
    console.log('乱数は', ransu);
    const sele = document.querySelector('#taisyo').value;
    switch (sele) {
        case 'army01':
            if (myData.mp >= 20) {/* MP7以上の時のみ唱えられる */
                if (ransu >= 90) {/* 乱数が90以上の場合のみダメージが増加 */
                    mahouAttack01(180, 100, 120);
                    armyData01.hp -= damage;
                    armyGazouTenmetu01();
                    myData.mp -= 20;
                    insertText('currentArmy01Hp', armyData01.hp);
                    insertText('currentMyMp', myData.mp);
                    info.textContent = 'ヒャダルコが暴走した！' + damage + 'のダメージ！';

                    hantei01();
                    setTimeout(magicianPatern, 1000);


                } else {
                    mahouAttack01(120, 80, 100);
                    armyData01.hp -= damage;
                    armyGazouTenmetu01();
                    myData.mp -= 15;
                    insertText('currentArmy01Hp', armyData01.hp);
                    insertText('currentMyMp', myData.mp);
                    info.textContent = 'ヒャダルコを唱えた！' + damage + 'のダメージ！';

                    hantei01();
                    setTimeout(magicianPatern, 1000);

                }

            }
            break;

        case 'army02':
            if (myData.mp >= 10) {
                if (ransu >= 90) {
                    mahouAttack02(120, 80, 120);
                    armyData02.hp -= damage;
                    armyGazouTenmetu02();
                    myData.mp -= 10;
                    insertText('currentArmy02Hp', armyData02.hp);
                    console.log(insertText('currentArmy02Hp', armyData02.hp));
                    insertText('currentMyMp', myData.mp);
                    info.textContent = 'ヒャダルコが暴走した！' + damage + 'のダメージ！';

                    hantei02();
                    setTimeout(magicianPatern, 1000);

                } else {
                    mahouAttack02(50, 80, 120);
                    armyData02.hp -= damage;
                    armyGazouTenmetu02();
                    myData.mp -= 7;
                    insertText('currentArmy02Hp', armyData02.hp);
                    console.log(insertText('currentArmy02Hp', armyData02.hp));
                    insertText('currentMyMp', myData.mp);
                    info.textContent = 'ヒャダルコを唱えた！' + damage + 'のダメージ！';

                    hantei02();
                    setTimeout(magicianPatern, 1000);

                }
            }
            break;

        case 'army03':
            if (myData.mp >= 10) {
                if (ransu >= 90) {
                    mahouAttack03(120, 80, 120);
                    armyData03.hp -= damage;
                    armyGazouTenmetu03();
                    myData.mp -= 10;
                    insertText('currentArmy03Hp', armyData03.hp);
                    console.log(insertText('currentArmy03Hp', armyData03.hp));
                    insertText('currentMyMp', myData.mp);
                    info.textContent = 'ヒャダルコが暴走した！' + damage + 'のダメージ！';

                    hantei03();
                    setTimeout(magicianPatern, 1000);


                } else {
                    mahouAttack03(50, 80, 120);
                    armyData03.hp -= damage;
                    armyGazouTenmetu03();
                    myData.mp -= 7;
                    insertText('currentArmy03Hp', armyData03.hp);
                    console.log(insertText('currentArmy03Hp', armyData03.hp));
                    insertText('currentMyMp', myData.mp);
                    info.textContent = 'ヒャダルコを唱えた！' + damage + 'のダメージ！';

                    hantei03();
                    setTimeout(magicianPatern, 1000);
                }
            }
            break;

        case 'army04':
            if (myData.mp >= 10) {
                if (ransu >= 90) {
                    mahouAttack04(120, 80, 120);
                    armyData04.hp -= damage;
                    armyGazouTenmetu04();
                    myData.mp -= 10;
                    insertText('currentArmy04Hp', armyData04.hp);
                    console.log(insertText('currentArmy04Hp', armyData04.hp));
                    insertText('currentMyMp', myData.mp);
                    info.textContent = 'ヒャダルコが暴走した！' + damage + 'のダメージ！';

                    hantei04();
                    setTimeout(magicianPatern, 1000);

                } else {
                    mahouAttack04(50, 80, 120);
                    armyData04.hp -= damage;
                    armyGazouTenmetu04();
                    myData.mp -= 7;
                    insertText('currentArmy04Hp', armyData04.hp);
                    console.log(insertText('currentArmy04Hp', armyData04.hp));
                    insertText('currentMyMp', myData.mp);
                    info.textContent = 'ヒャダルコを唱えた！' + damage + 'のダメージ！';

                    hantei04();
                    setTimeout(magicianPatern, 1000);

                }
            }
            break;
        default:
            info.textContent = 'エラー発生';
    }
});

$button[2].addEventListener("click", () => {

    if (myData.mp >= 30) {
        myData.mp -= 30;
        zen01();
        // マジシャンの攻撃はzen04にて呼び出し
    }
});

$button[3].addEventListener("click", () => {

    if (myData.mp >= 30) {
        care(250, 300);
        myData.hp += careful;
        myPtData.hp += careful;
        myData.mp -= 30;
        careHantei01();
        careHantei02();
        insertText('currentMyHp', myData.hp);
        insertText('currentPtHp', myPtData.hp);
        insertText('currentMyMp', myData.mp);
        info.textContent = 'マジシャンはベホマズンを唱えた！' + myData.name + 'と' + myPtData.name + 'は' + careful + '回復した！';
        setTimeout(magicianPatern, 1000);

    } else {
        info.textContent = '呪文を唱えられない！'
    }
});



