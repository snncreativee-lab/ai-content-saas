import { supabase } from "../../lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const status = formData.get("status");
    const billExternalReferenceNo = formData.get("billExternalReferenceNo");

    if (status === "1" && billExternalReferenceNo) {
      await supabase
        .from("profiles")
        .update({
          package: "premium",
          daily_limit: 999999,
        })
        .eq("id", billExternalReferenceNo.toString());
    }

    return Response.json({
      success: true,
      status,
      userId: billExternalReferenceNo,
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}