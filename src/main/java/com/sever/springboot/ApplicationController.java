package com.sever.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ApplicationController {

	// 認証フォームに遷移
	@GetMapping("/")
	public ModelAndView access(ModelAndView mav) {
		mav.setViewName("certification");
		return mav;
	}

	// 不正なゲットリクエストに対するリダイレクト
	@GetMapping({ "/home", "/collections", "/application", "/inquiry" })
	public String reAccess() {
		return "redirect:/";
	}

	// 認証コードを照合
	@PostMapping("/Verification")
	public ModelAndView verification(@RequestParam("password") String password, ModelAndView mav) {
		if ("0".equals(password)) {
			mav.setViewName("home"); // 認証成功時はhomeにリダイレクト
		} else {
			mav.addObject("msg", "認証コードが間違っています");
			mav.addObject("flag", true);
			mav.setViewName("certification"); // 認証失敗時は再度認証画面にリダイレクト
		}
		return mav;
	}

	// 認証フォームに遷移
	@GetMapping("/certification")
	public ModelAndView postCertification(ModelAndView mav) {
		mav.setViewName("certification");
		return mav;
	}

	//トップページに遷移
	@PostMapping("/home")
	public ModelAndView posthome(ModelAndView mav) {
		mav.setViewName("home");
		return mav;
	}

	// 作品集に遷移
	@PostMapping("/collections")
	public ModelAndView postCollections(ModelAndView mav) {
		mav.setViewName("collections");
		return mav;
	}

	// アプリに遷移
	@PostMapping("/application")
	public ModelAndView postApplication(@RequestParam("title") String title,
			@RequestParam("url") String url,
			@RequestParam("explanation") String explanation,
			ModelAndView mav) {
		mav.addObject("title", title);
		mav.addObject("url", url);
		mav.addObject("explanation", explanation);
		mav.setViewName("application");
		return mav;
	}

	// 問い合わせフォームに遷移
	@PostMapping("/inquiry")
	public ModelAndView postInquiry(ModelAndView mav) {
		mav.setViewName("inquiry");
		return mav;
	}

	//メール送信クラス
	@Autowired
	MailSender mailSender;

	// メールを送信
	@PostMapping("/mail")
	public ModelAndView sendMail(@RequestParam("subject") String subject,
			@RequestParam("message") String message, @RequestParam("last_name") String last_name,
			@RequestParam("first_name") String first_name, @RequestParam("phone_area_code") String phone_area_code,
			@RequestParam("phone_city_code") String phone_city_code, @RequestParam("phone_number") String phone_number,
			@RequestParam("email") String email,
			@RequestParam(value = "customer_type", defaultValue = "") String customer_type,
			@RequestParam("company_name") String company_name,
			@RequestParam("postal_code_area") String postal_code_area,
			@RequestParam("postal_code_region") String postal_code_region, @RequestParam("address") String address,
			@RequestParam("building_name") String building_name, ModelAndView mav) {
		// 必須項目がnullもしくは空文字列か確認
		boolean trigger = true;
		if (subject == null || subject.isEmpty() ||
				message == null || message.isEmpty() ||
				last_name == null || last_name.isEmpty() ||
				first_name == null || first_name.isEmpty() ||
				phone_area_code == null || phone_area_code.isEmpty() ||
				phone_city_code == null || phone_city_code.isEmpty() ||
				phone_number == null || phone_number.isEmpty() ||
				email == null || email.isEmpty() ||
				postal_code_area == null || postal_code_area.isEmpty() ||
				postal_code_region == null || postal_code_region.isEmpty() ||
				address == null || address.isEmpty()) {
			trigger = false;
		}
		// trigger が true の場合に引数の値をメールサーバーに送信する。
		if (trigger) {
			try {
				// メッセージクラス生成
				SimpleMailMessage simpleMsg = new SimpleMailMessage();
				// 送信元アドレスをセット
				simpleMsg.setFrom(email);
				// 送信先アドレスをセット
				simpleMsg.setTo(""); //送信先のメールアドレスを""内に記述する
				// 表題をセット
				simpleMsg.setSubject(subject);
				// 本文をセット
				simpleMsg.setText("(問い合わせ内容)\n" + message + "\n\n名字：" + last_name + " " + first_name +
						"\n電話番号：" + phone_area_code + phone_city_code + phone_number +
						"\nメールアドレス：" + email + "\n属性：" + customer_type + "\n法人名：" + company_name +
						"\n郵便番号：" + postal_code_area + "-" + postal_code_region + "\n住所：" + address + building_name);
				mailSender.send(simpleMsg);
				mav.addObject("msg", "問い合わせを送信しました‼");
			} catch (MailException e) {
				mav.addObject("msg", "メールが送信できませんでした");
			}
			// 必須項目が存在しない場合の処理
		} else {
			// trigger が false の場合にエラーメッセージを返す
			mav.addObject("msg", "必須項目を入力してください");
			// 全ての引数を inquiry に返す
			mav.addObject("subject", subject);
			mav.addObject("message", message);
			mav.addObject("last_name", last_name);
			mav.addObject("first_name", first_name);
			mav.addObject("phone_area_code", phone_area_code);
			mav.addObject("phone_city_code", phone_city_code);
			mav.addObject("phone_number", phone_number);
			mav.addObject("email", email);
			if (customer_type != null) {
				mav.addObject("customer_type", customer_type);
			}
			mav.addObject("company_name", company_name);
			mav.addObject("postal_code_area", postal_code_area);
			mav.addObject("postal_code_region", postal_code_region);
			mav.addObject("address", address);
			mav.addObject("building_name", building_name);
		}
		mav.setViewName("inquiry");
		return mav;
	}
}
