import { useState } from 'react';

// بيانات الشركات المصنعة والموديلات
const BRANDS = {
  apple: {
    name: 'آبل',
    nameEn: 'Apple',
    models: [
      { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', category: 'phone' },
      { id: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'phone' },
      { id: 'iphone-16', name: 'iPhone 16', category: 'phone' },
      { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'phone' },
      { id: 'iphone-15', name: 'iPhone 15', category: 'phone' },
      { id: 'iphone-14-pro', name: 'iPhone 14 Pro', category: 'phone' },
      { id: 'macbook-pro-16', name: 'MacBook Pro 16"', category: 'laptop' },
      { id: 'macbook-air-m2', name: 'MacBook Air M2', category: 'laptop' },
      { id: 'ipad-pro-12-9', name: 'iPad Pro 12.9"', category: 'tablet' },
      { id: 'ipad-air', name: 'iPad Air', category: 'tablet' }
    ]
  },
  samsung: {
    name: 'سامسونج',
    nameEn: 'Samsung',
    models: [
      { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', category: 'phone' },
      { id: 'galaxy-s24', name: 'Galaxy S24', category: 'phone' },
      { id: 'galaxy-z-fold-5', name: 'Galaxy Z Fold 5', category: 'phone' },
      { id: 'galaxy-tab-s9', name: 'Galaxy Tab S9', category: 'tablet' }
    ]
  },
  huawei: {
    name: 'هواوي',
    nameEn: 'Huawei',
    models: [
      { id: 'p60-pro', name: 'P60 Pro', category: 'phone' },
      { id: 'mate-60', name: 'Mate 60', category: 'phone' },
      { id: 'matebook-x-pro', name: 'MateBook X Pro', category: 'laptop' }
    ]
  },
  dell: {
    name: 'ديل',
    nameEn: 'Dell',
    models: [
      { id: 'xps-15', name: 'XPS 15', category: 'laptop' },
      { id: 'xps-13', name: 'XPS 13', category: 'laptop' },
      { id: 'inspiron-15', name: 'Inspiron 15', category: 'laptop' }
    ]
  },
  hp: {
    name: 'إتش بي',
    nameEn: 'HP',
    models: [
      { id: 'spectre-x360', name: 'Spectre x360', category: 'laptop' },
      { id: 'envy-15', name: 'Envy 15', category: 'laptop' },
      { id: 'pavilion-15', name: 'Pavilion 15', category: 'laptop' }
    ]
  },
  lenovo: {
    name: 'لينوفو',
    nameEn: 'Lenovo',
    models: [
      { id: 'thinkpad-x1', name: 'ThinkPad X1 Carbon', category: 'laptop' },
      { id: 'yoga-9i', name: 'Yoga 9i', category: 'laptop' },
      { id: 'ideapad-5', name: 'IdeaPad 5', category: 'laptop' }
    ]
  }
};

// أنواع المشاكل/الخدمات
const SERVICES = {
  phone: [
    { id: 'screen-replacement', name: 'تغيير الشاشة' },
    { id: 'battery-replacement', name: 'تغيير البطارية' },
    { id: 'charging-port', name: 'إصلاح منفذ الشحن' },
    { id: 'camera-repair', name: 'إصلاح الكاميرا' },
    { id: 'speaker-repair', name: 'إصلاح السماعة' },
    { id: 'other', name: 'مشكلة أخرى' }
  ],
  laptop: [
    { id: 'screen-replacement', name: 'تغيير الشاشة' },
    { id: 'battery-replacement', name: 'تغيير البطارية' },
    { id: 'keyboard-repair', name: 'إصلاح الكيبورد' },
    { id: 'software-issues', name: 'حل مشاكل البرامج' },
    { id: 'cleaning', name: 'تنظيف وصيانة' },
    { id: 'other', name: 'مشكلة أخرى' }
  ],
  tablet: [
    { id: 'screen-replacement', name: 'تغيير الشاشة' },
    { id: 'battery-replacement', name: 'تغيير البطارية' },
    { id: 'charging-port', name: 'إصلاح منفذ الشحن' },
    { id: 'software-issues', name: 'حل مشاكل البرامج' },
    { id: 'other', name: 'مشكلة أخرى' }
  ]
};

export default function RequestPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    modelCategory: '',
    service: '',
    serviceOther: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // التحقق من صحة البيانات
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.brand) newErrors.brand = 'يرجى اختيار الشركة المصنعة';
      if (!formData.model) newErrors.model = 'يرجى اختيار الموديل';
      if (!formData.service) newErrors.service = 'يرجى اختيار نوع الخدمة';
      if (formData.service === 'other' && !formData.serviceOther) {
        newErrors.serviceOther = 'يرجى وصف المشكلة';
      }
    }

    if (currentStep === 2) {
      if (!formData.name || formData.name.trim().length < 2) {
        newErrors.name = 'يرجى إدخال الاسم (حرفين على الأقل)';
      }
      if (!formData.phone || !/^[0-9]{10,}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
        newErrors.phone = 'يرجى إدخال رقم جوال صحيح';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
      }
      if (!formData.city || formData.city.trim().length < 2) {
        newErrors.city = 'يرجى إدخال المدينة';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // الانتقال للخطوة التالية
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  // الرجوع للخطوة السابقة
  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
    window.scrollTo(0, 0);
  };

  // اختيار الشركة المصنعة
  const selectBrand = (brandKey) => {
    setFormData({
      ...formData,
      brand: brandKey,
      model: '',
      modelCategory: '',
      service: ''
    });
    setErrors({});
  };

  // اختيار الموديل
  const selectModel = (modelId) => {
    const selectedModel = BRANDS[formData.brand].models.find(m => m.id === modelId);
    setFormData({
      ...formData,
      model: modelId,
      modelCategory: selectedModel.category,
      service: ''
    });
    setErrors({});
  };

  // إرسال النموذج
  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brand: formData.brand,
          brand_name: BRANDS[formData.brand].name,
          model: formData.model,
          model_name: BRANDS[formData.brand].models.find(m => m.id === formData.model)?.name,
          service: formData.service,
          service_name: SERVICES[formData.modelCategory].find(s => s.id === formData.service)?.name,
          service_other: formData.serviceOther,
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email,
          city: formData.city,
          address: formData.address,
          notes: formData.notes
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'حدث خطأ أثناء إرسال الطلب');
      }

      setSubmitted(true);
      setStep(3);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert(error.message || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#f9fafb',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      direction: 'rtl'
    }}>
      {/* Header */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px'
      }}>
        <a href="/" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#F57C00',
          textDecoration: 'none'
        }}>
          Fixate
        </a>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {/* العنوان */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            احجز خدمة الإصلاح
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            املأ النموذج وسنتواصل معك لتأكيد الموعد
          </p>
        </div>

        {/* مؤشر الخطوات */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '40px',
          position: 'relative'
        }}>
          {/* الخط الواصل */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '0',
            left: '0',
            height: '2px',
            background: '#e5e7eb',
            zIndex: 0
          }} />

          {[
            { num: 1, label: 'معلومات الجهاز' },
            { num: 2, label: 'الموقع والتواصل' },
            { num: 3, label: 'التأكيد' }
          ].map((s) => (
            <div key={s.num} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: step >= s.num ? '#10b981' : '#e5e7eb',
                color: step >= s.num ? '#fff' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                marginBottom: '8px'
              }}>
                {s.num}
              </div>
              <span style={{
                fontSize: '14px',
                color: step >= s.num ? '#10b981' : '#6b7280',
                fontWeight: step === s.num ? 'bold' : 'normal'
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* محتوى النموذج */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {/* الخطوة 1: معلومات الجهاز */}
          {step === 1 && (
            <div>
              {/* اختيار الشركة المصنعة */}
              {!formData.brand && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '16px'
                  }}>
                    اختر الشركة المصنعة *
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    {Object.entries(BRANDS).map(([key, brand]) => (
                      <button
                        key={key}
                        onClick={() => selectBrand(key)}
                        style={{
                          padding: '24px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          background: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = '#F57C00';
                          e.currentTarget.style.background = '#fff7ed';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.background = '#fff';
                        }}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                  {errors.brand && (
                    <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px' }}>
                      {errors.brand}
                    </p>
                  )}
                </div>
              )}

              {/* اختيار الموديل */}
              {formData.brand && !formData.model && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <button
                      onClick={() => selectBrand('')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#F57C00',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '8px 0'
                      }}
                    >
                      ← رجوع
                    </button>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginTop: '8px'
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                        {BRANDS[formData.brand].name}
                      </span>
                    </div>
                  </div>

                  <label style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '16px'
                  }}>
                    اختر الموديل *
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    {BRANDS[formData.brand].models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => selectModel(model.id)}
                        style={{
                          padding: '16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          background: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontSize: '14px',
                          color: '#1f2937',
                          textAlign: 'right'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = '#F57C00';
                          e.currentTarget.style.background = '#fff7ed';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.background = '#fff';
                        }}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                  {errors.model && (
                    <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px' }}>
                      {errors.model}
                    </p>
                  )}
                </div>
              )}

              {/* اختيار الخدمة */}
              {formData.model && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <button
                      onClick={() => setFormData({ ...formData, model: '', modelCategory: '', service: '' })}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#F57C00',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '8px 0'
                      }}
                    >
                      ← رجوع
                    </button>
                    <div style={{ marginTop: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        {BRANDS[formData.brand].name}
                      </span>
                      <span style={{ margin: '0 8px', color: '#d1d5db' }}>•</span>
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                        {BRANDS[formData.brand].models.find(m => m.id === formData.model)?.name}
                      </span>
                    </div>
                  </div>

                  <label style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '16px'
                  }}>
                    اختر نوع الخدمة *
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    {SERVICES[formData.modelCategory].map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setFormData({ ...formData, service: service.id })}
                        style={{
                          padding: '16px',
                          border: formData.service === service.id ? '2px solid #F57C00' : '2px solid #e5e7eb',
                          borderRadius: '8px',
                          background: formData.service === service.id ? '#fff7ed' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontSize: '14px',
                          color: '#1f2937',
                          textAlign: 'right'
                        }}
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                  {errors.service && (
                    <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px' }}>
                      {errors.service}
                    </p>
                  )}

                  {formData.service === 'other' && (
                    <div style={{ marginTop: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#1f2937',
                        marginBottom: '8px'
                      }}>
                        وصف المشكلة *
                      </label>
                      <textarea
                        value={formData.serviceOther}
                        onChange={(e) => setFormData({ ...formData, serviceOther: e.target.value })}
                        placeholder="اكتب وصف المشكلة هنا..."
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontFamily: 'inherit',
                          resize: 'vertical'
                        }}
                      />
                      {errors.serviceOther && (
                        <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                          {errors.serviceOther}
                        </p>
                      )}
                    </div>
                  )}

                  <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={nextStep}
                      style={{
                        padding: '12px 32px',
                        background: '#F57C00',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      التالي
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* الخطوة 2: الموقع والتواصل */}
          {step === 2 && (
            <div>
              <div style={{ display: 'grid', gap: '24px' }}>
                {/* الاسم */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  {errors.name && (
                    <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* رقم الجوال */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    رقم الجوال *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05xxxxxxxx"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  {errors.phone && (
                    <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* البريد الإلكتروني */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  {errors.email && (
                    <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* المدينة */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    المدينة *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="الرياض، جدة، الدمام..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  {errors.city && (
                    <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* العنوان */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    العنوان (اختياري)
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="الحي، الشارع، رقم المبنى..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* ملاحظات */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="أي معلومات إضافية تود إخبارنا بها..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              <div style={{
                marginTop: '32px',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <button
                  onClick={prevStep}
                  style={{
                    padding: '12px 32px',
                    background: '#fff',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  رجوع
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    padding: '12px 32px',
                    background: submitting ? '#9ca3af' : '#F57C00',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </button>
              </div>
            </div>
          )}

          {/* الخطوة 3: التأكيد */}
          {step === 3 && submitted && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '40px'
              }}>
                ✓
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                تم إرسال طلبك بنجاح!
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                شكراً لك! سنتواصل معك قريباً عبر رقم الجوال<br />
                لتأكيد الموعد وتفاصيل الخدمة.
              </p>
              <a
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  background: '#F57C00',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                العودة للصفحة الرئيسية
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
