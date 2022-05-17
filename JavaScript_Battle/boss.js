'use strict'

// プレイヤー側の選択肢のボタンの名前割り当て
const sentaku = ["攻撃", "メラ", "メラゾーマ", "ベホマズン "];
// ボタン宣言時の短縮
const $button = document.getElementsByTagName("button");
// イベント発生時の表示場所
const info = document.getElementById('myInfo');
// ダメージ発生時に点滅させるためのやつ
const yuTenmetu = document.getElementById('yusya-tenmetu');
const armyTenmetu01 = document.getElementById('army-gazou01');


// プレイヤー側のステータス情報
const myData = {
    name: 'とんぬら',
    hp: 5000,/* 体力 */
    mp: 500,
    attack: 198,/* 物理攻撃力 */
    defence: 192,/* 物理防御力 */
    magicAttack: 158,/* 呪文攻撃力 */
    magicDefence: 143/* 呪文防御力 */
}

// 敵側のステータス情報
const armyData = {
    name: 'まおー',
    hp: 5000,
    attack: 250,
    defence: 200,
    magicAttack: 150,
    magicDefence: 200
}

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

// 敵側のステータス表記
insertText('armyName', armyData.name);
insertText('currentArmyHp', armyData.hp);
insertText('maxArmyHp', armyData.hp);

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

// =======================================
// ここからダメージ発生時の点滅
// =========================================

const yusyaTenmetu = function () {
    yuTenmetu.src = 'images/yusyaDamage.gif';
    setTimeout(function () {
        yuTenmetu.src = 'images/yusya.png'
    }, 500);
}

// 個別攻撃はアクション選択に、全体攻撃の際は各々の全体攻撃の箇所に記載
const armyGazouTenmetu01 = function () {
    armyTenmetu01.src = 'images/maoDamage.gif';
    setTimeout(function () {
        armyTenmetu01.src = 'images/mao.png'
    }, 500);
}


// =====================================
// ここから敵の攻撃時のアクション
// ======================================

// 乱数の値によって攻撃が変化する。

const armyAttackRandom = function (min, max) {
    const x = Math.floor(Math.random() * (max - min + 1) + min);
    if (x <= 10) {
        info.textContent = '不敵な笑みを浮かべている'
    } else if (11 <= x && x <= 30) {
        let normal = 30;
        let damage = Math.floor(normal * armyData.attack / myData.defence / 40 * ransu2(60, 120));
        info.textContent = 'まおーが武器を振りかざした！' + damage + 'のダメージ！'
        myData.hp -= damage;
        yusyaTenmetu();
        insertText('currentMyHp', myData.hp);
    } else if (31 <= x && x <= 60) {
        /* ヒャド自体の威力 */
        let magic = 40;
        // ここからダメージ計算
        let damage = Math.floor(magic * armyData.magicAttack / myData.magicDefence / 50 * ransu2(10, 100));
        info.textContent = 'まおーがヒャドを唱えた！' + damage + 'のダメージ！'
        myData.hp -= damage;
        yusyaTenmetu();
        insertText('currentMyHp', myData.hp);
        // ここまでダメージ計算
    } else if (61 <= x && x <= 90) {
        /* ヒャダルコ自体の威力 */
        let magic = 100;
        // ここからダメージ計算
        let damage = Math.floor(magic * armyData.magicAttack / myData.magicDefence / 50 * ransu2(10, 100));
        info.textContent = 'まおーがヒャダルコを唱えた！' + damage + 'のダメージ！'
        myData.hp -= damage;
        yusyaTenmetu();
        insertText('currentMyHp', myData.hp);
        // ここまでダメージ計算
    } else {
        armyData.hp += ransu2(90, 100);
        insertText('currentArmyHp', armyData.hp);
        info.textContent = 'まおーはベホマを唱えた！' + ransu2(90, 100) + '回復した！';
        console.log(ransu2(90, 100));
    }
    return x;
}

//============================================-
//  ここまで敵の攻撃時のアクション
// ===========================================

// ダメージ計算時に使う乱数
let ransu2 = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//  敵攻撃後のHP判定
const hantei = function () {
    if (myData.hp >= 1 && armyData.hp >= 1) {
    } else if (armyData.hp <= 0) {
        info.textContent = 'まおーを倒した！'
        armyData.hp = 0;
        insertText('currentArmyHp', armyData.hp);
        alert('まおーを倒しました！お疲れさまでした。');
        location.href = 'index.html';
    } else {
        info.textContent = 'まおーに敗北した...'
        myData.hp = 0;
        insertText('currentMyHp', myData.hp);
    }
}

// ===========================================
// ここから戦闘時の処理
// ===========================================

// 各ボタンの押下時の処理
$button[0].addEventListener("click", () => {
    // ボタン押下ごとに乱数を生成、コンソールにて確認可能
    let ransu = Math.floor(Math.random() * 101);
    if (ransu >= 10) {
        let normal = 30;
        let damage = Math.floor(normal * myData.attack / armyData.defence / 40 * ransu2(60, 120));
        console.log('通常攻撃の攻撃力は' + damage);
        armyData.hp -= damage;
        armyGazouTenmetu01();
        insertText('currentArmyHp', armyData.hp);
        info.textContent = 'プレイヤーの攻撃！' + damage + 'のダメージ！'

        hantei();/*プレイヤー側と敵側の残りHPの判定  */

        // 敵の攻撃ターン的なやつ
        setTimeout(() => { armyAttackRandom(1, 100) }, 1000);
    } else {
        info.textContent = 'プレイヤーの攻撃が外れた！'
    }
    // プレイヤー側、敵側のHPが1以上の時に攻撃、そうじゃなければ別表記
});

$button[1].addEventListener("click", () => {
    // ボタン押下ごとに乱数を生成、コンソールにて確認可能
    let ransu = Math.floor(Math.random() * 101);
    console.log(ransu);
    if (myData.mp >= 12) {/* MP7以上の時のみ唱えられる */
        if (ransu >= 10) {/* 乱数が10以上の場合のみ攻撃でダメージが与えられる */
            /* メラ自体の威力 */
            let magic = 20;
            // ここからダメージ計算
            let damage = Math.floor(magic * myData.magicAttack / armyData.magicDefence / 50 * ransu2(60, 80));
            console.log('メラの攻撃力は' + damage);
            armyData.hp -= damage;
            armyGazouTenmetu01();
            // ここまでダメージ計算
            myData.mp -= 12;/* MPを7消費のイメージ */
            insertText('currentArmyHp', armyData.hp);
            console.log(insertText('currentArmyHp', armyData.hp));
            insertText('currentMyMp', myData.mp);
            info.textContent = 'メラを唱えた！' + damage + 'のダメージ！'

            hantei();

            setTimeout(() => { armyAttackRandom(1, 100) }, 1000);
        }
    } else {
        // mes.textContent = ("魔法を唱えれない！");
        info.textContent = '魔法を唱えられない';

    }
});

$button[2].addEventListener("click", () => {
    // ボタン押下ごとに乱数を生成、コンソールにて確認可能
    let ransu = Math.floor(Math.random() * 101);
    if (myData.mp >= 25) {/* MP7以上の時のみ唱えられる */
        if (ransu >= 5) {/* 乱数が10以上の場合のみ攻撃でダメージが与えられる */
            /* メラゾーマ自体の威力 */
            let magic = 70;
            // ここからダメージ計算
            let damage = Math.floor(magic * myData.magicAttack / armyData.magicDefence / 50 * ransu2(80, 150));
            console.log('メラゾーマの攻撃力は' + damage);
            armyData.hp -= damage;
            armyGazouTenmetu01();
            // ここまでダメージ計算
            myData.mp -= 25;/* MPを7消費のイメージ */
            insertText('currentArmyHp', armyData.hp);
            console.log(insertText('currentArmyHp', armyData.hp));
            insertText('currentMyMp', myData.mp);
            info.textContent = 'メラゾーマを唱えた！' + damage + 'のダメージ！'


            hantei();

            setTimeout(() => { armyAttackRandom(1, 100) }, 1000);
        }
    } else {
        // mes.textContent = ("魔法を唱えれない！");
        info.textContent = '魔法を唱えられない';
    }
});

$button[3].addEventListener("click", () => {
    // ボタン押下ごとに乱数を生成、コンソールにて確認可能
    let ransu = Math.floor(Math.random() * 801);
    if (myData.mp >= 10) {/* MP10以上の時のみ唱えられる */
        if (ransu >= 20) {
            myData.hp += ransu;
            myData.mp -= 10;
            insertText('currentMyHp', myData.hp);
            insertText('currentMyMp', myData.mp);
            info.textContent = 'ベホマズンを唱えた！' + ransu + '回復した！'

            hantei();
            setTimeout(() => { armyAttackRandom(1, 100) }, 1000);
        } else {
            myData.hp += 50;
            myData.mp -= 10;
            insertText('currentMyHp', myData.hp);
            insertText('currentMyMp', myData.mp);
            info.textContent = 'ベホマズンを唱えた！50回復した！'
            hantei();
            setTimeout(() => { armyAttackRandom(1, 100) }, 1000);

        }
        hantei();
    } else {
        // mes.textContent = ("魔法を唱えれない！");
        info.textContent = '魔法を唱えられない';
    }
});

// ===========================================
// ここまで戦闘時の処理
// ===========================================