// <fieldset>内がクリックされたら、<input>にフォーカスが当たる
document.addEventListener('DOMContentLoaded', function() {
	var fieldset = document.querySelector('fieldset');
	fieldset.addEventListener('click', function() {
		var input = fieldset.querySelector('input[type="password"]');
		if (input) {
			input.focus();
		}
	});
});

// 目のアイコンをクリックした際の挙動を定義する関数
function togglePasswordVisibility() {
	var passwordInput = document.getElementById('password');
	if (passwordInput) { // 対象の要素が存在することを確認
		if (passwordInput.type === "password") {
			passwordInput.type = "text";
		} else {
			passwordInput.type = "password";
		}
	}
}

// HTMLドキュメントが完全に読み込まれた後に実行される関数
document.addEventListener('DOMContentLoaded', function() {
	// 目のアイコンをクリックしたらパスワードの可視性を切り替えるイベントリスナーを追加
	var eyeIcon = document.getElementById('eye-icon');
	if (eyeIcon) { // 対象の要素が存在することを確認
		eyeIcon.addEventListener('click', togglePasswordVisibility);
	}
});

// ページ読み込み時にパスワード入力欄が隠れた状態になるよう設定
document.addEventListener('DOMContentLoaded', function() {
	var passwordInput = document.getElementById('password');
	if (passwordInput) { // 対象の要素が存在することを確認
		passwordInput.type = "password";
	}
});

document.addEventListener("DOMContentLoaded", function() {
	const passwordInput = document.getElementById("password");
	const agreeCheckbox = document.getElementById("agree");
	const submitButton = document.querySelector(".inputform button[type='submit']");

	// パスワードが入力されており、チェックボックスにチェックが入っている場合のみ送信ボタンを有効化する関数
	function toggleSubmitButton() {
		const inputValue = passwordInput.value.trim();
		if (inputValue !== "" && agreeCheckbox.checked) {
			submitButton.disabled = false;
		} else {
			submitButton.disabled = true;
		}
	}

	// ページ読み込み時とパスワード入力・チェックボックス変更時にイベントリスナーを設定
	toggleSubmitButton(); // 初期状態で送信ボタンを有効化するか確認
	passwordInput.addEventListener("input", toggleSubmitButton);
	agreeCheckbox.addEventListener("change", toggleSubmitButton);
});


window.onload = function() {
	// flagがtrueのときにエラーメッセージを表示する
	var flag = /*[[${flag}]]*/ false; // Thymeleafの変数flagをJavaScriptに渡す
	if (flag) {
		alert(/*[[${error_message}]]*/); // Thymeleafの変数error_messageをJavaScriptのalert関数に渡す
	}
};

document.addEventListener('DOMContentLoaded', function() {
	// msg要素の内容を取得
	var message = document.querySelector('.message').textContent;
	// msgが空でない場合、ポップアップとして表示
	if (message.trim() !== '') {
		alert(message);
	}
});

