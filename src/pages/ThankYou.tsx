import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import svgPaths from "../imports/svg-p4pahwsfnn";

interface PaymentResult {
  paymentStatus: string;
  grandTotal?: number;
  currency?: string;
  merchantReference?: string;
}

export default function ThankYou() {
  const [loading, setLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderToken = urlParams.get("order-token");

      if (!orderToken) {
        setError("Makseteave puudub");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/paymentReturn?orderToken=${encodeURIComponent(orderToken)}`);

        if (!response.ok) {
          throw new Error("Makse staatuse kontrollimine ebaõnnestus");
        }

        const data = await response.json();
        setPaymentResult(data);
      } catch (err) {
        setError("Makse staatuse kontrollimine ebaõnnestus. Palun kontrolli oma pangakontot.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, []);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const isSuccess = paymentResult?.paymentStatus === "PAID";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#f9e9f3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#ff80ce] border-t-transparent mx-auto mb-6"></div>
          <p className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[28px]">
            Kontrollin makset...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !paymentResult) {
    return (
      <div className="min-h-screen w-full bg-[#f9e9f3] flex items-center justify-center px-4">
        <div className="bg-white rounded-[40px] shadow-lg p-12 max-w-[600px] w-full text-center">
          <div className="text-[80px] mb-6">😿</div>
          <h1 className="font-['Schoolbell',sans-serif] text-[#ff80ce] text-[50px] lg:text-[60px] tracking-[-2px] uppercase mb-6">
            Oih!
          </h1>
          <p className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[24px] lg:text-[28px] leading-[38px] mb-8">
            {error || "Midagi läks valesti. Palun proovi uuesti."}
          </p>
          <Button
            onClick={handleBackToHome}
            className="bg-[#29d4e8] hover:bg-[#36d6e9] text-white font-['Schoolbell',sans-serif] text-[24px] lg:text-[28px] h-[60px] lg:h-[70px] px-12 rounded-[247px] transition-colors"
          >
            Tagasi avalehele
          </Button>
        </div>
      </div>
    );
  }

  // Failed/Cancelled payment state
  if (!isSuccess) {
    return (
      <div className="min-h-screen w-full bg-[#f9e9f3] flex items-center justify-center px-4">
        <div className="bg-white rounded-[40px] shadow-lg p-12 max-w-[600px] w-full text-center">
          <div className="text-[80px] mb-6">😿</div>
          <h1 className="font-['Schoolbell',sans-serif] text-[#ff80ce] text-[50px] lg:text-[60px] tracking-[-2px] uppercase mb-6">
            Makse katkestatud
          </h1>
          <p className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[24px] lg:text-[28px] leading-[38px] mb-8">
            Makse jäi pooleli või katkestati. Kui soovid kiisusid aidata, proovi uuesti!
          </p>
          <Button
            onClick={handleBackToHome}
            className="bg-[#29d4e8] hover:bg-[#36d6e9] text-white font-['Schoolbell',sans-serif] text-[24px] lg:text-[28px] h-[60px] lg:h-[70px] px-12 rounded-[247px] transition-colors"
          >
            Proovi uuesti
          </Button>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen w-full bg-[#f9e9f3] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-[40px] shadow-lg p-8 lg:p-12 max-w-[420px] w-full text-center">
        {/* Heart Icon */}
        <div className="h-[100px] lg:h-[120px] flex items-center justify-center mb-6">
          <svg className="h-full w-auto" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 84 78">
            <path d={svgPaths.p1d1ae70} fill="#FF80CE" />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="font-['Schoolbell',sans-serif] text-[#ff80ce] text-[50px] lg:text-[70px] tracking-[-3px] uppercase mb-4">
          Aitähhhhhhh!!!!!
        </h1>

        {/* Donation Amount */}
        {paymentResult.grandTotal && (
          <div className="bg-[#f9e9f3] rounded-[20px] py-4 px-8 inline-block mb-6">
            <p className="font-['Schoolbell',sans-serif] text-[#29d4e8] text-[32px] lg:text-[40px]">
              {paymentResult.grandTotal} {paymentResult.currency || "EUR"}
            </p>
          </div>
        )}

        {/* Thank You Message */}
        <p className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[24px] lg:text-[28px] leading-[36px] lg:leading-[42px] mb-8 max-w-[500px] mx-auto">
          Tänu sinu panusele saavad meie kassipisarad õnnepisarateks! Sinu annetus aitab meil kiisusid ravida ja hoida.
        </p>

        {/* Cat Emojis */}
        <div className="flex gap-4 justify-center mb-8">
          <span className="text-[50px] lg:text-[60px]">🐱</span>
          <span className="text-[50px] lg:text-[60px]">💖</span>
          <span className="text-[50px] lg:text-[60px]">🐱</span>
        </div>

        {/* Back Button */}
        <Button
          onClick={handleBackToHome}
          className="bg-[#29d4e8] hover:bg-[#36d6e9] text-white font-['Schoolbell',sans-serif] text-[24px] lg:text-[28px] h-[60px] lg:h-[70px] px-12 rounded-[247px] transition-colors"
        >
          Tagasi avalehele
        </Button>
      </div>
    </div>
  );
}
