export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    const formData = new FormData();

    formData.append("userSecretKey", process.env.TOYYIBPAY_SECRET_KEY || "");
    formData.append("categoryCode", process.env.TOYYIBPAY_CATEGORY_CODE || "");
    formData.append("billName", "AI Content Premium");
    formData.append("billDescription", "Langganan premium AI Content Booster");
    formData.append("billPriceSetting", "1");
    formData.append("billPayorInfo", "1");
    formData.append("billAmount", "1900");
    formData.append(
      "billReturnUrl",
      `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?userId=${userId}`
    );
    formData.append(
      "billCallbackUrl",
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/toyyibpay/callback`
    );
    formData.append("billExternalReferenceNo", userId);
    formData.append("billTo", email);
    formData.append("billEmail", email);
    formData.append("billPhone", "0123456789");

    const response = await fetch(
      "https://toyyibpay.com/index.php/api/createBill",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      const billCode = data?.[0]?.BillCode;

      if (!billCode) {
        return Response.json({
          error: "Gagal create bill",
          data,
        });
      }

      return Response.json({
        url: `https://toyyibpay.com/${billCode}`,
      });
    } catch {
      return Response.json({
        error: "ToyyibPay tidak pulangkan JSON",
        raw: text,
      });
    }
  } catch (error: any) {
    return Response.json({
      error: error.message || "Unknown error",
    });
  }
}