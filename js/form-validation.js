document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#reservation-form");
  const feedback = document.querySelector("#form-feedback");

  if (!form || !feedback) {
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  const phoneInput = form.querySelector("#phone");

  const setFeedback = (state, message) => {
    feedback.textContent = message;
    feedback.classList.remove("success", "error", "processing");
    if (state) {
      feedback.classList.add(state);
    }
  };

  const toggleInvalidState = (element, isValid) => {
    if (!element) {
      return;
    }
    element.setAttribute("aria-invalid", String(!isValid));
    if (isValid) {
      element.classList.remove("is-invalid");
    } else {
      element.classList.add("is-invalid");
    }
  };

  form.addEventListener("input", (event) => {
    const target = event.target;
    if (
      !(target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement)
    ) {
      return;
    }

    if (target === phoneInput) {
      target.value = target.value.replace(/[^0-9]/g, "");
    }

    if (target.checkValidity()) {
      toggleInvalidState(target, true);
      target.setCustomValidity("");
    }
  });

  form.addEventListener("change", (event) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      if (target.checkValidity()) {
        toggleInvalidState(target, true);
      }
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFeedback("", "");

    if (phoneInput) {
      phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
      if (!/^[0-9]{10,11}$/.test(phoneInput.value)) {
        phoneInput.setCustomValidity("電話番号はハイフンなし10〜11桁で入力してください。");
      } else {
        phoneInput.setCustomValidity("");
      }
      toggleInvalidState(phoneInput, phoneInput.checkValidity());
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      setFeedback("error", "入力内容をご確認ください。必須項目のご記入と形式のご確認をお願いします。");
      return;
    }

    const formData = new FormData(form);

    if (submitButton) {
      submitButton.disabled = true;
    }

    setFeedback("processing", "送信中です。しばらくお待ちください。");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setFeedback("success", "送信が完了しました。担当者より折り返しご連絡いたします。");
        form.reset();
        const fields = form.querySelectorAll("input, textarea, select");
        fields.forEach((field) => {
          field.classList.remove("is-invalid");
          field.removeAttribute("aria-invalid");
          if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
            field.setCustomValidity("");
          }
        });
      } else {
        let errorMessage = "送信に失敗しました。お手数ですが時間をおいて再度お試しください。";
        try {
          const data = await response.json();
          if (data && Array.isArray(data.errors) && data.errors.length > 0) {
            errorMessage = data.errors.map((item) => item.message).join("\n");
          }
        } catch (parseError) {
          // JSONを解析できない場合は既定のメッセージを使用
        }
        setFeedback("error", errorMessage);
      }
    } catch (networkError) {
      setFeedback("error", "通信中にエラーが発生しました。通信環境をご確認の上、再度お試しください。");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
});

