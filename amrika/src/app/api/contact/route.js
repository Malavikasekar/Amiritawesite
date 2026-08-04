import { Resend } from 'resend';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';


export async function POST(request) {
  try {
    const body = await request.json();
    const {
      Customer_Name,
      Mobile_Number,
      Delivery_Date,
      Order_2l,
      Order_1l,
      Order_500ml,
      Order_300ml,
      Estimated_Total,
    } = body;

    // Save data to Firestore
    try {
      await addDoc(collection(db, 'orders'), {
        Customer_Name,
        Mobile_Number,
        Delivery_Date,
        Order_2l,
        Order_1l,
        Order_500ml,
        Order_300ml,
        Estimated_Total,
        createdAt: serverTimestamp(),
      });
    } catch (firestoreError) {
      console.error('Error adding document to Firestore: ', firestoreError);
      // We log the error but still proceed to send the email
    }

    // Format the email using a highly professional HTML design
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        
        <!-- Header -->
        <div style="background-color: #0f172a; padding: 40px 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">New Order Received</h1>
          <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 15px; font-weight: 400;">Amirita Water</p>
        </div>

        <!-- Content -->
        <div style="padding: 32px;">
          
          <!-- Customer Info -->
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin: 0 0 16px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-weight: 700;">Customer Information</h2>
            
            <div style="margin-bottom: 16px;">
              <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase;">Name</p>
              <p style="margin: 4px 0 0 0; font-size: 17px; color: #0f172a; font-weight: 600;">${Customer_Name}</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase;">Mobile Number</p>
              <p style="margin: 4px 0 0 0; font-size: 17px; color: #0f172a; font-weight: 600;">${Mobile_Number}</p>
            </div>
          </div>

          <!-- Order Info -->
          <div style="margin-bottom: 16px;">
            <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin: 0 0 16px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-weight: 700;">Order Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              ${Order_2l ? `
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                  <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 500;">2 Ltr Bottles</p>
                </td>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                  <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 600;">${Order_2l}</p>
                </td>
              </tr>
              ` : ''}
              ${Order_1l ? `
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                  <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 500;">1 Ltr Bottles</p>
                </td>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                  <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 600;">${Order_1l}</p>
                </td>
              </tr>
              ` : ''}
              ${Order_500ml ? `
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                  <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 500;">500ml Bottles</p>
                </td>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                  <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 600;">${Order_500ml}</p>
                </td>
              </tr>
              ` : ''}
              ${Order_300ml ? `
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                  <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 500;">300ml Bottles</p>
                </td>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                  <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 600;">${Order_300ml}</p>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                  <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 500;">Estimated Total</p>
                </td>
                <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                  <p style="margin: 0; font-size: 16px; color: #3b82f6; font-weight: 700;">${Estimated_Total || '—'}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 0;">
                  <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 500;">Expected Delivery</p>
                </td>
                <td style="padding: 16px 0; text-align: right;">
                  <span style="display: inline-block; background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 4px 12px; border-radius: 9999px; font-size: 13px; font-weight: 600;">${Delivery_Date || 'Pending'}</span>
                </td>
              </tr>
            </table>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; text-align: center;">
          <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">This order was placed securely via the Amirita Water website.</p>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed #cbd5e1;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 600; letter-spacing: 0.5px;">
              DEVELOPED BY MALAVIKA 
            </p>
          </div>
        </div>

      </div>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined');
      return Response.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Orders <support@hybixgroups.com>', // Use your verified domain in production if you have one
      to: ['faseedmohamed6@gmail.com', 'mohamedfaseeda@gmail.com','malavikasekar2005@gmail.com'],
      subject: `🛒 New Order from ${Customer_Name} — Amirita Water`,
      html: emailHtml,
    });

    if (error) {
      return Response.json({ success: false, message: error.message }, { status: 400 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
