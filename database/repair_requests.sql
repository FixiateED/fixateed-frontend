-- جدول طلبات الإصلاح
CREATE TABLE IF NOT EXISTS repair_requests (
  id BIGSERIAL PRIMARY KEY,
  
  -- معلومات الجهاز
  brand VARCHAR(50) NOT NULL,
  brand_name VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  model_name VARCHAR(200) NOT NULL,
  service VARCHAR(100) NOT NULL,
  service_name VARCHAR(200) NOT NULL,
  service_other TEXT,
  
  -- معلومات العميل
  customer_name VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(200),
  city VARCHAR(100) NOT NULL,
  address TEXT,
  notes TEXT,
  
  -- حالة الطلب
  status VARCHAR(50) DEFAULT 'pending',
  -- pending: قيد الانتظار
  -- confirmed: تم التأكيد
  -- in_progress: جاري العمل
  -- completed: مكتمل
  -- cancelled: ملغي
  
  -- التواريخ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- إنشاء فهرس للبحث السريع
CREATE INDEX IF NOT EXISTS idx_repair_requests_status ON repair_requests(status);
CREATE INDEX IF NOT EXISTS idx_repair_requests_created_at ON repair_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_repair_requests_phone ON repair_requests(customer_phone);

-- تفعيل Row Level Security
ALTER TABLE repair_requests ENABLE ROW LEVEL SECURITY;

-- سياسة للسماح بالإدراج للجميع (للنموذج العام)
CREATE POLICY "Allow public insert" ON repair_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- سياسة للسماح بالقراءة للمستخدمين المصادق عليهم فقط
CREATE POLICY "Allow authenticated read" ON repair_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- سياسة للسماح بالتحديث للمستخدمين المصادق عليهم فقط
CREATE POLICY "Allow authenticated update" ON repair_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- تعليق على الجدول
COMMENT ON TABLE repair_requests IS 'جدول طلبات إصلاح الأجهزة الإلكترونية';
