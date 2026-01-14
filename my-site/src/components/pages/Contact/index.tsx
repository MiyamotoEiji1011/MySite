import { useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedTitle from '../../ui/AnimatedTitle';
import './index.css';

interface FormData {
  name: string;
  email: string;
  title: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  title?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    title: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // バリデーション
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.title.trim()) {
      newErrors.title = '件名を入力してください';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_r71cpgt',
        'template_ntyj4u3',
        {
          name: formData.name,
          email: formData.email,
          title: formData.title,
          message: formData.message,
          time: new Date().toLocaleString('ja-JP'),
        },
        'FbhoH94evhVZ8jSPe'
      );

      setSubmitStatus('success');
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        title: '',
        message: '',
      });
      setErrors({});

      // 3秒後に成功メッセージを消す
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');

      // 5秒後にエラーメッセージを消す
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 入力変更ハンドラー
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // エラーをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <AnimatedTitle text="Contact" autoAnimate={false} />
      </div>

      <div className="contact-content">
        <div className="contact-form-wrapper">
          <p className="contact-description">
            お問い合わせは下記フォームからお願いします。<br />
            内容を確認後、メールにて返信させていただきます。
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                お名前 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                メールアドレス <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="title" className="form-label">
                件名 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-input ${errors.title ? 'error' : ''}`}
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                お問い合わせ内容 <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                rows={8}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>

            {submitStatus === 'success' && (
              <div className="status-message success">
                <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                お問い合わせを受け付けました。ありがとうございます。
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-message error">
                <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                送信に失敗しました。時間をおいて再度お試しください。
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
