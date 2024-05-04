document.addEventListener('DOMContentLoaded', function() {
	var tdElements = document.querySelectorAll('td');
	// td要素のクリック時の処理
	tdElements.forEach(function(td) {
		td.addEventListener('click', function(event) {
			// クリックされた要素がinput要素またはtextarea要素であれば、デフォルトの動作を防止してJavaScriptコードが発火しないようにする
			if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA') {
				event.stopPropagation();
			} else {
				focusOnInputElement(td);
			}
		});
	});
	// 対応するtd要素内のinput要素またはtextarea要素にフォーカスを当てる関数
	function focusOnInputElement(td) {
		var inputElement = td.querySelector('input');
		var textareaElement = td.querySelector('textarea');
		if (inputElement) {
			inputElement.focus();
		} else if (textareaElement) {
			textareaElement.focus();
		}
	}
});


//電話番号を整数しか入力できないようにする
document.addEventListener('DOMContentLoaded', function() {
	// HTML要素を取得
	const areaCodeInput = document.getElementById('customer-phone-area-code');
	const cityCodeInput = document.getElementById('customer-phone-city-code');
	const phoneNumberInput = document.getElementById('customer-phone-number');
	// 整数以外が入力された場合に削除し、メッセージを表示するイベントリスナーを追加
	areaCodeInput.addEventListener('input', function(event) {
		this.value = this.value.replace(/\D/g, ''); // 整数以外を削除
		if (!/^\d*$/.test(this.value)) {
			alert('数字を入力してください'); // メッセージを表示
		}
	});
	cityCodeInput.addEventListener('input', function(event) {
		this.value = this.value.replace(/\D/g, ''); // 整数以外を削除
		if (!/^\d*$/.test(this.value)) {
			alert('数字を入力してください'); // メッセージを表示
		}
	});
	phoneNumberInput.addEventListener('input', function(event) {
		this.value = this.value.replace(/\D/g, ''); // 整数以外を削除
		if (!/^\d*$/.test(this.value)) {
			alert('数字を入力してください'); // メッセージを表示
		}
	});
});

//合計桁数が11桁を超える場合、自動的に削除
function limitPhoneLength() {
	// 各入力欄の値を取得
	var areaCode = document.getElementById('customer-phone-area-code').value;
	var cityCode = document.getElementById('customer-phone-city-code').value;
	var number = document.getElementById('customer-phone-number').value;
	// 全体の桁数を計算
	var totalLength = areaCode.length + cityCode.length + number.length;
	// 合計桁数が11桁を超えた場合、それぞれの入力欄から削除
	if (totalLength > 11) {
		// 合計桁数が11桁になるまで加入者番号から順に文字を削除
		while (totalLength > 11 && number.length > 0) {
			number = number.slice(0, -1);
			totalLength--;
		}
		// 合計桁数が11桁になるまで市内局番から順に文字を削除
		while (totalLength > 11 && cityCode.length > 0) {
			cityCode = cityCode.slice(0, -1);
			totalLength--;
		}
		// 合計桁数が11桁になるまで市外局番から順に文字を削除
		while (totalLength > 11 && areaCode.length > 0) {
			areaCode = areaCode.slice(0, -1);
			totalLength--;
		}
		// 削除後の値を入力欄に反映
		document.getElementById('customer-phone-area-code').value = areaCode;
		document.getElementById('customer-phone-city-code').value = cityCode;
		document.getElementById('customer-phone-number').value = number;
	}
}

//郵便番号を整数しか入力できないようにする
document.addEventListener('DOMContentLoaded', function() {
	const postalCodeAreaInput = document.getElementById('postal-code-area');
	const postalCodeRegionInput = document.getElementById('postal-code-region');
	postalCodeAreaInput.addEventListener('input', function(event) {
		this.value = this.value.replace(/\D/g, ''); // 整数以外を削除
		if (!/^\d*$/.test(this.value)) {
			alert('数字を入力してください'); // メッセージを表示
		}
	});

	postalCodeRegionInput.addEventListener('input', function(event) {
		this.value = this.value.replace(/\D/g, ''); // 整数以外を削除
		if (!/^\d*$/.test(this.value)) {
			alert('数字を入力してください'); // メッセージを表示
		}
	});
});


//合計桁数が7桁を超える場合、自動的に削除
function limitPostalCodeLength() {
	// 各入力欄の値を取得
	var areaCode = document.getElementById('postal-code-area').value;
	var regionCode = document.getElementById('postal-code-region').value;
	// 全体の桁数を計算
	var totalLength = areaCode.length + regionCode.length;
	// 合計桁数が7桁を超えた場合、それぞれの入力欄から削除
	if (totalLength > 7) {
		// 合計桁数が7桁になるまで町域番号から順に文字を削除
		while (totalLength > 7 && regionCode.length > 0) {
			regionCode = regionCode.slice(0, -1);
			totalLength--;
		}
		// 合計桁数が7桁になるまで郵便区番号から順に文字を削除
		while (totalLength > 7 && areaCode.length > 0) {
			areaCode = areaCode.slice(0, -1);
			totalLength--;
		}
		// 削除後の値を入力欄に反映
		document.getElementById('postal-code-area').value = areaCode;
		document.getElementById('postal-code-region').value = regionCode;
	}
}

//外部APIを利用して住所検索
//参考サイト 外部のAPIを利用して郵便番号から住所を検索する https://x.gd/pHO37
document.addEventListener('DOMContentLoaded', function() {
	// 郵便番号の変更イベントを監視する
	document.getElementById('postal-code-area').addEventListener('input', handlePostalCodeChange);
	document.getElementById('postal-code-region').addEventListener('input', handlePostalCodeChange);
});
function handlePostalCodeChange() {
	const areaCode = document.getElementById('postal-code-area').value;
	const regionCode = document.getElementById('postal-code-region').value;
	const postCode = areaCode + regionCode;
	// 郵便番号が7桁でない場合は処理しない
	if (postCode.length !== 7) {
		return;
	}
	// APIキーを指定
	const apiKey = ""; //""内にhttps://postcode-jp.com/で取得したAPIキーを入力する
	// APIエンドポイント
	const url = 'https://apis.postcode-jp.com/api/v2/postcodes/' + postCode + '?apiKey=' + apiKey;
	// HTTPリクエストを送信して住所を取得
	fetch(url)
		.then(response => {
			// ステータスコードが200以外の場合はエラーをスロー
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// JSON形式でレスポンスを解析して返す
			return response.json();
		})
		.then(data => {
			// 住所を取得して入力欄に設定
			document.getElementById('address').value = data.allAddress;
		})
		.catch(error => {
			// エラーハンドリング
			console.error('There was a problem with your fetch operation:', error);
			alert('住所の検索に失敗しました。');
		});
}

//リセットボタンに関する設定
function resetForm() {
	document.getElementById("inquiry-subject").value = ""; // お問い合わせ件名
	document.getElementById("inquiry-message").value = ""; // お問い合わせ内容
	document.getElementById("customer-last-name").value = ""; // お名前（姓）
	document.getElementById("customer-first-name").value = ""; // お名前（名）
	document.getElementById("customer-phone-area-code").value = ""; // 電話番号（市外局番）
	document.getElementById("customer-phone-city-code").value = ""; // 電話番号（市内局番）
	document.getElementById("customer-phone-number").value = ""; // 電話番号（加入者番号）
	document.getElementById("customer-email").value = ""; // メールアドレス
	document.getElementById("customer-type-company").checked = false; // お客様属性（企業・個人事業主）
	document.getElementById("customer-type-individual").checked = false; // お客様属性（個人）
	document.getElementById("company-name").value = ""; // 法人名
	document.getElementById("postal-code-area").value = ""; // 郵便番号（市外局番）
	document.getElementById("postal-code-region").value = ""; // 郵便番号（市内局番）
	document.getElementById("address").value = ""; // ご住所
	document.getElementById("building-name").value = ""; // 建物名
}

//メッセージを取得してポップアップで表示
document.addEventListener('DOMContentLoaded', function() {
	// msg要素の内容を取得
	var message = document.querySelector('.message').textContent;
	// msgが空でない場合、ポップアップとして表示
	if (message.trim() !== '') {
		alert(message);
	}
});


