import { query } from '../../lib/db';

export default async function handler(req, res) {
  // السماح فقط بطلبات POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      brand,
      brand_name,
      model,
      model_name,
      service,
      service_name,
      service_other,
      customer_name,
      customer_phone,
      customer_email,
      city,
      address,
      notes
    } = req.body;

    // التحقق من البيانات المطلوبة
    if (!brand || !brand_name || !model || !model_name || !service || !service_name || 
        !customer_name || !customer_phone || !city) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'يرجى ملء جميع الحقول المطلوبة'
      });
    }

    // إدراج الطلب في قاعدة البيانات
    const result = await query(
      `INSERT INTO repair_requests (
        brand, brand_name, model, model_name, service, service_name, service_other,
        customer_name, customer_phone, customer_email, city, address, notes,
        status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
      RETURNING id, created_at`,
      [
        brand, brand_name, model, model_name, service, service_name, service_other,
        customer_name, customer_phone, customer_email, city, address, notes,
        'pending'
      ]
    );

    // إرجاع النتيجة
    return res.status(201).json({
      success: true,
      message: 'تم إرسال طلبك بنجاح',
      data: {
        id: result.rows[0].id,
        created_at: result.rows[0].created_at
      }
    });

  } catch (error) {
    console.error('Error submitting repair request:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.'
    });
  }
}
