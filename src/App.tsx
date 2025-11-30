import { useState, useEffect } from "react";
import svgPaths from "./imports/svg-p4pahwsfnn";
import imgImage18 from "figma:asset/60d9c8e2dfd84cc27b63c4197fd737fc9fe0f98a.png";
import imgImage19 from "figma:asset/97634777488fa5100fb52805ed0954075e13da6f.png";
import imgImage21 from "figma:asset/a70b603eb54bb58ad6b372b385f8e04fb05c4a82.png";
import imgImage22 from "figma:asset/7d39e02abc42aeb7788ef3bccf64ee760cfb6b45.png";
import imgImage from "figma:asset/c8a3230c6894086974101d4ec19566142b8bc876.png";
import imgImage23 from "figma:asset/c58c770188c955d5558e96c512e1ef3cec94a804.png";
import { imgImage17, imgImage16, imgImage20, imgImage15, imgImage14, imgHumbertoArellanoNG2Sqdy9QyUnsplash } from "./imports/svg-hpews";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

interface VetBill {
  id?: number;
  name: string;
  issue: string;
  current: number;
  goal: number;
  code?: string;
}

// Montonio types
declare global {
  interface Window {
    Montonio?: {
      Checkout?: {
        PaymentInitiation?: {
          create: (config: any) => {
            init: () => void;
          };
        };
      };
    };
  }
}

export default function App() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selgitus, setSelgitus] = useState("Kliinikuarvete toetus Annetamistalgudel");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedBillCode, setSelectedBillCode] = useState<string | null>(null);
  const [vetBills, setVetBills] = useState<VetBill[]>([]);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Fetch vet bills from API
  useEffect(() => {
    const fetchVetBills = async () => {
      try {
        const response = await fetch('/api/paymentData');
        if (response.ok) {
          const data = await response.json();
          // Transform the data to match VetBill interface
          const bills = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            issue: item.description || '',
            current: item.amountDonated,
            goal: item.donationGoal,
            code: item.code
          }));
          setVetBills(bills);

          // Set first bill as default selection
          if (bills.length > 0 && bills[0].code) {
            setSelectedBillCode(bills[0].code);
            setSelgitus(bills[0].name);
          }
        }
      } catch (error) {
        console.error('Failed to fetch vet bills:', error);
      }
    };

    fetchVetBills();
    // Refresh every 5 minutes
    const interval = setInterval(fetchVetBills, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const totalCurrent = vetBills.reduce((sum, bill) => sum + bill.current, 0);
  const totalGoal = vetBills.reduce((sum, bill) => sum + bill.goal, 0);

  // Handle payment submission
  const handlePayment = async () => {
    const amount = selectedAmount || parseFloat(customAmount);

    if (!amount || amount <= 0) {
      alert('Palun vali või sisesta kehtiv summa');
      return;
    }

    if (!selectedBank) {
      alert('Palun vali pank');
      return;
    }

    if (!selectedBillCode) {
      alert('Palun vali kliinik');
      return;
    }

    try {
      setPaymentProcessing(true);

      const payload = {
        preferredBank: selectedBank,
        preferredRegion: 'EE',
        donationType: selectedBillCode,
        donationTotal: amount,
      };

      const response = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Payment order creation failed');
      }

      const paymentUrl = await response.json();
      // Redirect to Montonio payment page
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Makse algatamine ebaõnnestus. Palun proovi uuesti.');
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f9e9f3] overflow-x-clip scroll-smooth">
      {/* Hero Section */}
      <section className="min-h-[600px] lg:h-[1077px] overflow-clip relative shrink-0 w-full bg-[#f9e9f3] py-12 lg:py-0 lg:flex lg:items-center lg:justify-center">
        <div className="absolute h-0 left-0 top-[96px] w-[1534px] hidden lg:block" />
        
        {/* Logo - Desktop */}
        <div className="absolute h-[112px] left-[50%] lg:translate-x-[-767px] top-[41px] w-[183px] hidden lg:flex items-center justify-center">
          <div className="text-center">
            <p className="font-['Schoolbell',sans-serif] text-[#29d4e8] text-[32px] leading-tight uppercase">Cats</p>
            <p className="font-['Schoolbell',sans-serif] text-[#ff80ce] text-[32px] leading-tight uppercase">Help</p>
          </div>
        </div>

        {/* Main Container - Centered */}
        <div className="relative lg:absolute h-auto lg:h-[781px] left-0 lg:left-[50%] lg:translate-x-[-50%] top-0 lg:top-[144px] w-full lg:w-[1470px] px-4 lg:px-0">
          {/* White Card Container */}
          <div className="relative lg:absolute bg-white h-auto lg:h-[1011px] left-0 rounded-[20px] lg:rounded-[40px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 lg:top-[-115px] w-full lg:w-[1470px] p-6 lg:p-0">
            {/* Empty on desktop - text is positioned absolutely outside this container on desktop */}
            {/* On mobile, content goes inside */}
            <div className="lg:hidden">
              {/* Mobile content */}
              <h1 className="font-['Schoolbell',sans-serif] text-[#29d4e8] text-[40px] sm:text-[50px] uppercase mb-4">KALLIS CATS HELPI TOETAJA,</h1>
              <p className="font-['Schoolbell',sans-serif] text-[#ff80ce] text-[40px] sm:text-[50px] uppercase mb-6">Sel aastal on meie ainus jõulusoov, et Saaksime jälle arsti juurde minna 🙏</p>
              <p className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[18px] sm:text-[22px] leading-[28px] sm:leading-[32px] mb-8">Ega me muidu ei küsiks, kui et kahejalgne räägib, et kõigil on raske ja, et meil on aina raskem ots-otsaga kokku tulla. Me ei saa enam arsti juurdegi minna, sest võlad on nii suureks kasvanud. Kas sina saaksid meid natukenegi järje peale aidata? Suur suur aitäh sulle! </p>
              
              {/* Mobile Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <p className="font-['Schoolbell',sans-serif] text-[#ff80ce] text-[24px] sm:text-[30px] uppercase">Kogutud kokku</p>
                  <p className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[20px] sm:text-[25px]">{totalCurrent.toFixed(2)}€ / {totalGoal}€</p>
                </div>
                <div className="bg-[rgba(160,150,121,0.26)] h-[50px] relative rounded-[247px] overflow-hidden">
                  <div
                    className="absolute h-full bg-[#ff80ce] rounded-[247px] transition-all duration-500"
                    style={{ width: `${Math.min((totalCurrent / totalGoal) * 100, 100)}%` }}
                  />
                </div>
              </div>
              
              <button
                onClick={() => {
                  const firstUnfilled = vetBills.find(bill => bill.current < bill.goal);
                  if (firstUnfilled) {
                    setSelgitus(firstUnfilled.name);
                  }
                  const donationSection = document.getElementById('donation-section');
                  donationSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#29d4e8] hover:bg-[#36d6e9] text-white font-['Schoolbell',sans-serif] text-[24px] sm:text-[28px] h-[60px] rounded-[247px] transition-colors text-center"
              >
                Aita kaasa
              </button>
            </div>
          </div>
        </div>
        
        {/* Desktop Text Content - Hidden on mobile */}
        <div className="absolute left-[50%] translate-x-[-50%] top-[20.33px] w-[1470px] hidden lg:block">
          {/* Heading Text */}
          <div className="absolute content-stretch flex h-[128px] items-start left-[85.75px] top-[82.75px] w-[1100px] z-10">
            <p className="basis-0 font-['Schoolbell',sans-serif] grow leading-[88px] min-h-px min-w-px not-italic relative shrink-0 text-[#29d4e8] text-[93px] tracking-[-4.65px] uppercase whitespace-nowrap">KALLIS CATS HELPI TOETAJA,</p>
          </div>
          <p className="absolute font-['Schoolbell',sans-serif] leading-[88px] left-[85.75px] not-italic text-[#ff80ce] text-[93px] top-[191.75px] tracking-[-4.65px] uppercase w-[813.5px]">Sel aastal on meie ainus jõulusoov, et Saaksime jälle arsti juurde minna 🙏</p>
          <p className="absolute font-['Schoolbell',sans-serif] leading-[37px] left-[85.75px] not-italic text-[#062d3e] dark:text-gray-200 text-[28px] top-[558.25px] w-[674.819px] bg-white dark:bg-gray-900 px-4 py-3 rounded-2xl z-20">Ega me muidu ei küsiks, kui et kahejalgne räägib, et kõigil on raske ja, et meil on aina raskem ots-otsaga kokku tulla. Me ei saa enam arsti juurdegi minna, sest võlad on nii suureks kasvanud. Kas sina saaksid meid natukenegi järje peale aidata? Suur suur aitäh sulle! </p>
          
          {/* Progress Bar Section */}
          <div className="absolute left-0 top-[831.34px] z-20">
            {/* Progress Bar Container */}
            <div className="absolute flex flex-col gap-[16px] items-start left-[85.75px] top-0 w-[1072px]">
              {/* Labels */}
              <div className="flex justify-between items-baseline w-full bg-white dark:bg-gray-900 rounded-xl px-4 py-2 -mx-4">
                <p className="font-['Schoolbell',sans-serif] leading-[60px] not-italic text-[#ff80ce] text-[40px] text-nowrap tracking-[-2px] uppercase">Kogutud kokku</p>
                <p className="font-['Schoolbell',sans-serif] leading-[52.5px] not-italic text-[#062d3e] dark:text-gray-200 text-[35px] tracking-[1.5px]">{totalCurrent.toFixed(2)}€ / {totalGoal}€</p>
              </div>

              {/* Progress Bar */}
              <div className="bg-[rgba(160,150,121,0.26)] h-[60px] relative rounded-[247px] shrink-0 w-full">
                <div className="overflow-clip rounded-[inherit] size-full">
                  <div className="box-border content-stretch flex flex-col h-[60px] items-start relative w-full" style={{ paddingRight: `${Math.max(0, 100 - Math.min((totalCurrent / totalGoal) * 100, 100))}%` }}>
                    <div className="bg-[#ff80ce] h-[60px] rounded-[247px] shrink-0 w-full" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Button */}
            <div
              className="absolute bg-[#29d4e8] hover:bg-[#36d6e9] cursor-pointer box-border content-stretch flex gap-[8px] h-[70px] items-center justify-center left-[1177px] px-[48px] py-[8px] rounded-[247px] top-[69px] w-[234.063px]"
              onClick={() => {
                const firstUnfilled = vetBills.find(bill => bill.current < bill.goal);
                if (firstUnfilled) {
                  setSelgitus(firstUnfilled.name);
                }
                const donationSection = document.getElementById('donation-section');
                donationSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <p className="font-['Schoolbell',sans-serif] leading-[48px] not-italic relative shrink-0 text-[32px] text-nowrap text-white whitespace-pre">Aita kaasa</p>
            </div>
          </div>
          
          {/* Cat Images and Decorations - Desktop only */}
          <div className="absolute left-[660.33px] top-[40.08px]">
            {/* Sandra - Mask Group */}
            <div className="absolute h-[979.474px] left-[308.94px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[101.599px_216.12px] mask-size-[453.522px_738.349px] top-[-92.05px] w-[617.283px]" style={{ maskImage: `url('${imgImage17}')` }}>
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage18} />
            </div>
            <p className="absolute font-['Schoolbell',sans-serif] leading-[37px] left-[139.67px] not-italic text-[28px] text-black text-nowrap top-[700px] whitespace-pre">Sandra</p>
            
            {/* Adelheid - Mask Group */}
            <div className="absolute h-[950.307px] left-[-80.83px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[80.325px_59.898px] mask-size-[520.487px_826.318px] top-[-70.32px] w-[737.317px]" style={{ maskImage: `url('${imgImage16}')` }}>
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage19} />
            </div>
            <p className="absolute font-['Schoolbell',sans-serif] leading-[37px] left-[619.67px] not-italic text-[28px] text-black text-nowrap top-[80px] whitespace-pre z-30">Adelheid</p>
            
            {/* Paw decorative element */}
            <div className="absolute h-[73px] left-[577.8px] overflow-clip top-[112px] w-[119px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 119 73">
                <g id="Group">
                  <path d={svgPaths.p22750a00} fill="var(--fill-0, black)" id="Vector" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Explanatory Text Section */}
      <section className="relative bg-[#fdf6f9] py-24">
        <div className="container mx-auto px-8 md:px-16 max-w-[1534px]">
          <h2 className="font-['Schoolbell',sans-serif] leading-[normal] not-italic text-[#ff80ce] text-[50px] md:text-[70px] tracking-[-2.5px] md:tracking-[-3.5px] uppercase mb-12 text-center">
            AITA MEIL KIISUSID EDASI AIDATA 🙏
          </h2>

          <div className="bg-white rounded-[40px] shadow-lg p-12 md:p-16 max-w-[1470px] mx-auto">
            <div className="font-['Schoolbell',sans-serif] leading-[normal] not-italic text-[#062d3e] text-[20px] md:text-[28px] max-w-[1374px] ml-[40px]">
              <p className="mb-4">See aasta on olnud Cats Helpi jaoks erakordselt raske. Meie hoole all on üle 400 kassi – igaüks neist on kunagi olnud hüljatud, näljas, haige või külmas värisev. 🩷 Täna ootavad nad meie abil võimalust edasi elada: soojas kodus, hoituna ja turvaliselt.</p>
              
              <p className="mb-4">Me tahame seda neile pakkuda iga päev – soojust, ravi, toitu ja armastust.<br />Aga sel aastal on see kõik olnud tavapärasest keerulisem.</p>
              
              <p className="mb-4">Majanduslikult on kõigil raske, ja seetõttu on ka annetused märkimisväärselt vähenenud. Samal ajal on abipalvete arv kasvanud rohkem kui kunagi varem. Meie postkasti täidavad iga päev kirjad: "Palun aidake, muidu ta ei jää ellu."</p>
              
              <p className="mb-4">💛 Ja kuigi me tahaks alati vastata "jah", ei ole see praegu lihtsalt alati võimalik.<br />Tõde on aga lihtne: meil lihtsalt pole enam ressursse.💔</p>
              
              <p className="mb-4">Viimase aasta jooksul oleme aidanud üle tuhande kassi. 🐱 🐱‍⬛</p>
              
              <p className="mb-0">Iga päästetud elu on toonud endaga kaasa raviarved, operatsioonid, toidu- ja ravimikulud, mis on kasvanud üle pea.<br />Meie vabatahtlikud teevad kõik, mis võimalik – korraldavad kohvikupäevi, oksjoneid, müüvad annetatud riideid ja raamatuid, leiutavad aina uusi viise, et kiisudele vajalikud vahendid kokku koguda.<br />Aga üksi me enam ei jõua.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vet Bills Section */}
      <section className="relative bg-[#fdf6f9] py-24">
        <div className="container mx-auto px-8 md:px-16 max-w-[1534px]">
          <div className="flex justify-between items-start mb-12 ml-[40px]">
            <h2 className="font-['Schoolbell',sans-serif] leading-[84px] not-italic text-[50px] md:text-[70px] tracking-[-2.5px] md:tracking-[-3.5px] uppercase max-w-[1017px]">
              <span className="text-[#29d4e8]">Aita meil kiisud terveks ravida</span>
              <span className="text-[#ff80ce]"> ja hoida uutele kiisudele uksed lahti</span>
            </h2>
            
            <div className="hidden lg:block">
              <p className="font-['Schoolbell',sans-serif] leading-[normal] text-[#29d4e8] text-[28px] tracking-[-1.4px] uppercase w-[218.949px]">
                Uuendame makstud arvete kokkuvõtet igal hommikul
              </p>
              
              {/* Decorative arrow */}
              <div className="mt-4 flex justify-center">
                <div className="h-[126.335px] rotate-[62.842deg] skew-x-[9.204deg] w-[193.942px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 194 127">
                    <path d={svgPaths.p348ffc60} fill="var(--fill-0, #29D4E8)" id="XMLID_1_" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="font-['Schoolbell',sans-serif] leading-[37px] not-italic text-[#062d3e] text-[20px] md:text-[28px] mb-16 max-w-[1026px] ml-[40px]">
            <p className="mb-4">Me tahame jätkata – sest iga väikene hingeke väärib võimalust.</p>
            
            <p className="mb-4">Meie varjupaigas ootab abi üle 400 kassi ja paljud neist vajavad just praegu kiiret veterinaararsti abi.</p>
            
            <p className="mb-4">💔 Meie suurim mure on täna loomakliinikute võlad, mis kokku ulatuvad 13 647 euroni.💔</p>
            
            <p className="mb-4">Mitmed arved on oodanud tasumist juba pikemat aega ja mitmed kliinikud on meiega ajutiselt peatunud – mitte sellepärast, et nad ei hooliks, vaid sellepärast, et meie võlad on lihtsalt kasvanud suuremaks kui keegi meist soovis.</p>
            
            <p className="mb-4">👉 Me päästsime ja päästsime… kuni ühel hetkel sai otsa see, millega päästa. 💔💔💔</p>
            
            <p className="mb-8">Kliinikutes ootavad tasumist :</p>
          </div>

          {/* Progress Bars - Aligned to left */}
          <div className="space-y-8 max-w-[1089px] ml-[40px]">
            {vetBills.map((bill, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-3">
                      <p className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[20px] md:text-[25px] tracking-[1.5px]">
                        {bill.name} {bill.issue && bill.issue !== bill.name && `- ${bill.issue}`}
                      </p>
                      <p className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[20px] md:text-[25px] tracking-[1.5px]">
                        {bill.current}€ / {bill.goal}€
                      </p>
                    </div>
                    <div className="relative h-[46px] bg-[rgba(160,150,121,0.26)] rounded-[247px] overflow-hidden">
                      <div 
                        className="absolute h-full rounded-[247px] transition-all duration-500"
                        style={{ 
                          width: `${(bill.current / bill.goal) * 100}%`,
                          backgroundColor: index % 3 === 0 ? '#ff80ce' : index % 3 === 1 ? '#29d4e8' : '#08a3fb'
                        }}
                      />
                      <div className="absolute inset-0 flex items-center px-9">
                        <span className="font-['Schoolbell',sans-serif] text-white text-[20px] tracking-[1.5px]">
                          {Math.round((bill.current / bill.goal) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelgitus(bill.name);
                      setSelectedBillCode(bill.code || null);
                      const donationSection = document.getElementById('donation-section');
                      donationSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#ff80ce] hover:bg-[#ff90d6] text-white font-['Schoolbell',sans-serif] text-[20px] h-[46px] px-6 rounded-[247px] transition-colors shrink-0"
                  >
                    Anneta
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donation-section" className="relative py-12 md:py-24 bg-[#f9e9f3]">
        <div className="container mx-auto px-8 md:px-16 max-w-[1534px]">
          <h2 className="font-['Schoolbell',sans-serif] leading-[normal] not-italic text-[#29d4e8] text-[50px] md:text-[70px] tracking-[-2.5px] md:tracking-[-3.5px] uppercase mb-12 text-center">
            Annetada saad siin!
          </h2>

          <div className="relative max-w-[1000px] mx-auto">
            {/* White Card Container */}
            <div className="relative max-w-[600px] mx-auto bg-white rounded-[30px] md:rounded-[40px] shadow-lg p-8 md:p-12 z-30">
              {/* Amount Selection Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[5, 10, 25, 50].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount(amount.toString());
                    }}
                    className={`font-['Schoolbell',sans-serif] text-[25px] md:text-[28px] h-[70px] rounded-[247px] border-2 transition-all text-center ${
                      selectedAmount === amount
                        ? 'bg-[#29d4e8] border-[#29d4e8] text-white'
                        : 'bg-white border-black text-black hover:bg-gray-50'
                    }`}
                  >
                    {amount}€
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mb-6">
                <label className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[22px] md:text-[25px] mb-3 block">
                  Muu summa
                </label>
                <Input
                  type="number"
                  placeholder="Sisesta summa"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="h-[60px] rounded-[247px] border-2 border-black text-[22px] md:text-[25px] font-['Schoolbell',sans-serif] px-6 text-center bg-[#f3f3f5]"
                />
              </div>

              {/* Selgitus Input */}
              <div className="mb-6">
                <label className="font-['Schoolbell',sans-serif] text-[#062d3e] text-[22px] md:text-[25px] mb-3 block">
                  Selgitus
                </label>
                <Input
                  type="text"
                  placeholder="Kliinikuarvete toetus Annetamistalgudel"
                  value={selgitus}
                  onChange={(e) => setSelgitus(e.target.value)}
                  className="h-[60px] rounded-[247px] border-2 border-black text-[22px] md:text-[25px] font-['Schoolbell',sans-serif] px-6 text-center bg-[#f3f3f5]"
                />
              </div>

              {/* Bank Selection Buttons */}
              <div className="mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {[
                    { name: 'SEB', bic: 'EEUHEE2X', bgColor: '#60CD18', textColor: 'text-black' },
                    { name: 'Swedbank', bic: 'HABAEE2X', bgColor: '#EE7023', textColor: 'text-white' },
                    { name: 'LHV', bic: 'LHVBEE22', bgColor: '#000000', textColor: 'text-white' },
                    { name: 'Luminor', bic: 'RIKOEE22', bgColor: '#481335', textColor: 'text-white' }
                  ].map((bank) => (
                    <button
                      key={bank.name}
                      onClick={() => setSelectedBank(bank.bic)}
                      style={{
                        backgroundColor: bank.bgColor,
                        boxShadow: selectedBank === bank.bic ? '0 0 0 4px #29d4e8' : 'none'
                      }}
                      className="border-2 border-black rounded-[247px] h-[60px] flex items-center justify-center hover:opacity-90 transition-all"
                    >
                      <span className={`font-['Schoolbell',sans-serif] text-[18px] ${bank.textColor}`}>{bank.name}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Coop', bic: 'EKRDEE22', bgColor: '#00B6FF', textColor: 'text-white' },
                    { name: 'Citadele', bic: 'PARXEE22', bgColor: '#DC143C', textColor: 'text-white' },
                    { name: 'Revolut', bic: 'REVOLT21', bgColor: '#FFFFFF', textColor: 'text-black' }
                  ].map((bank) => (
                    <button
                      key={bank.name}
                      onClick={() => setSelectedBank(bank.bic)}
                      style={{
                        backgroundColor: bank.bgColor,
                        boxShadow: selectedBank === bank.bic ? '0 0 0 4px #29d4e8' : 'none'
                      }}
                      className="border-2 border-black rounded-[247px] h-[60px] flex items-center justify-center hover:opacity-90 transition-all"
                    >
                      <span className={`font-['Schoolbell',sans-serif] text-[18px] ${bank.textColor}`}>{bank.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handlePayment}
                disabled={paymentProcessing}
                className="w-full bg-[#ff80ce] hover:bg-[#ff90d6] text-white font-['Schoolbell',sans-serif] text-[28px] md:text-[32px] h-[70px] rounded-[247px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentProcessing ? 'Laadin...' : 'Maksma'}
              </Button>
            </div>

            {/* Helper text with arrows */}
            <div className="absolute hidden lg:block right-[-200px] top-[76px] w-[200px]">
              <p className="font-['Schoolbell',sans-serif] leading-[normal] text-[#29d4e8] text-[28px] tracking-[-1.4px] uppercase mb-4">
                Vali summa
              </p>
              <div className="flex justify-center mt-8">
                <div className="h-[119.299px] rotate-[58.37deg] w-[168.8px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 169 120">
                    <path d={svgPaths.p2518be00} fill="var(--fill-0, #29D4E8)" id="XMLID_1_" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="absolute hidden lg:block right-[-230px] top-[387.5px] font-['Schoolbell',sans-serif] leading-[normal] text-[#29d4e8] text-[28px] tracking-[-1.4px] uppercase w-[278px]">
              Selgitus tuleb automaatselt
            </p>

            <div className="absolute hidden lg:block right-[-150px] top-[528px]">
              <p className="font-['Schoolbell',sans-serif] leading-[normal] text-[#29d4e8] text-[28px] tracking-[-1.4px] uppercase w-[126.881px]">
                Viimaseks vali pank
              </p>
            </div>

            {/* Cat Image - Bottom Left - Sonja */}
            <div className="absolute left-[-200px] bottom-[-100px] w-[750px] h-[562px] hidden lg:block z-20">
              <div className="absolute h-[562.9px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.422px_64.655px] mask-size-[552.457px_469.446px] top-0 w-[750.534px]" style={{ maskImage: `url('${imgImage20}')` }}>
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover size-full" src={imgImage21} />
              </div>
              <p className="absolute font-['Schoolbell',sans-serif] leading-[37px] left-[200px] bottom-[-50px] text-[28px] text-black">Sonja</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is needed Section - Renamed to "Iga toetus päästab elu" */}
      <section className="relative bg-[#fdf6f9] py-24">
        <div className="container mx-auto px-8 md:px-16 max-w-[1534px]">
          <h2 className="font-['Schoolbell',sans-serif] leading-[normal] not-italic text-[#ff80ce] text-[50px] md:text-[70px] tracking-[-2.5px] md:tracking-[-3.5px] uppercase mb-12 text-center">
            Iga toetus päästab elu
          </h2>

          <div className="bg-white rounded-[40px] shadow-lg p-12 md:p-16 max-w-[1200px] mx-auto relative overflow-hidden">
            <div className="font-['Schoolbell',sans-serif] leading-[normal] not-italic text-[#062d3e] dark:text-gray-200 text-[20px] md:text-[28px] max-w-[500px] ml-[40px] relative z-30 bg-white dark:bg-gray-900 rounded-2xl p-4 -m-4">
              <p className="mb-6">Iga euro on nagu väike pai mõnele nurrikule, kes seda praegu vajab.</p>

              <p className="mb-6">👉 Iga annetus aitab maksta ühe arve, ravida ühe vigastuse, päästa ühe elu.</p>

              <p className="mb-6">Me oleme südamest tänulikud igale inimesele, kes aitab meil uksed avatuna hoida.<br />Tänu teile saavad kassid, kes on kunagi olnud üksikud ja hirmul, nüüd tunda soojust, hoitust ja lootust.</p>

              <p className="mb-6">Aitäh, et hoolid.<br />Aitäh, et märkad.</p>

              <p className="mb-0">👉 Aitäh, et aitad meil kiisusid edasi aidata.</p>
            </div>

            {/* Cat Image in corner - Made solid and brought to front */}
            <div className="absolute right-[-30px] top-[80px] w-[300px] h-[380px] pointer-events-none hidden lg:block z-40">
              <div className="absolute h-[460px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[52px_112px] mask-size-[200px_247px] top-0 w-[306px]" style={{ maskImage: `url('${imgImage15}')` }}>
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover size-full" src={imgImage22} />
              </div>
              <p className="absolute right-[60px] top-[60px] font-['Schoolbell',sans-serif] leading-[37px] text-[28px] text-white z-50">Anna-Liisa</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to support Section */}
      <section className="relative py-24 bg-[#f9e9f3]">
        <div className="container mx-auto px-8 md:px-16 max-w-[900px]">
          <div className="bg-white rounded-[40px] shadow-lg p-12 md:p-16">
            <h2 className="font-['Schoolbell',sans-serif] leading-[normal] not-italic text-[#29d4e8] text-[50px] md:text-[60px] tracking-[-2.5px] md:tracking-[-3px] uppercase mb-8 text-center">
              Kuidas meid veel toetada?
            </h2>

            <div className="space-y-8 text-center">
              <div>
                <p className="font-['Schoolbell',sans-serif] leading-[normal] text-[#062d3e] text-[22px] md:text-[26px] mb-4">
                  Siis kui tellid toitu või kassitarbeid veebilehelt
                </p>
                <a
                  href="https://www.miumjau.ee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ff80ce] hover:bg-[#ff90d6] text-white font-['Schoolbell',sans-serif] text-[20px] md:text-[28px] h-[60px] md:h-[70px] px-6 md:px-12 rounded-[247px] transition-colors leading-[60px] md:leading-[70px]"
                >
                  www.miumjau.ee
                </a>
                <p className="font-['Schoolbell',sans-serif] leading-[normal] text-[#062d3e] text-[22px] md:text-[26px] mt-4">
                  ja valid saajaks Cats Help
                </p>
              </div>

              <div className="flex items-center justify-center gap-6">
                <div className="h-[2px] flex-1 bg-[#ff80ce]"></div>
                <span className="font-['Schoolbell',sans-serif] text-[#ff80ce] text-[32px]">või</span>
                <div className="h-[2px] flex-1 bg-[#ff80ce]"></div>
              </div>

              <div>
                <a
                  href="https://www.petcenter24.ee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#29d4e8] hover:bg-[#36d6e9] text-white font-['Schoolbell',sans-serif] text-[18px] md:text-[28px] h-[60px] md:h-[70px] px-6 md:px-12 rounded-[247px] transition-colors leading-[60px] md:leading-[70px]"
                >
                  www.petcenter24.ee
                </a>
                <p className="font-['Schoolbell',sans-serif] leading-[normal] text-[#062d3e] text-[22px] md:text-[26px] mt-4">
                  ja valid annetus Cats Help-le
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adopt Section */}
      <section className="bg-[#fdf6f9] min-h-[400px] lg:h-[673px] relative shrink-0 w-full py-12 lg:py-0">
        <div className="relative lg:absolute lg:contents left-0 top-[96px] px-4 lg:px-0">
          {/* White Card Container - Centered */}
          <div className="relative lg:absolute bg-white h-auto lg:h-[481px] left-0 lg:left-1/2 lg:-translate-x-1/2 lg:bottom-[96px] overflow-clip rounded-[20px] lg:rounded-[40px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-full lg:w-[1100px] max-w-[600px] lg:max-w-none mx-auto lg:mx-0 p-6 lg:p-0">
            {/* Background cat image with low opacity - Desktop only */}
            <div className="absolute h-[481px] left-[600px] opacity-10 top-0 w-[600px] hidden lg:block">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
            </div>

            {/* Content */}
            <div className="relative lg:absolute h-auto lg:h-[385px] left-0 lg:left-[48px] top-0 lg:top-[48px] w-full lg:w-[1004px]">
              {/* Heading */}
              <div className="relative lg:absolute content-stretch flex h-auto lg:h-[83px] items-start left-0 top-0 w-full lg:w-[1004px] mb-6 lg:mb-0">
                <p className="basis-0 font-['Schoolbell',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#ff80ce] text-[40px] lg:text-[60px] text-center tracking-[-2px] lg:tracking-[-3px] uppercase">Adopteeri, ära shoppa!</p>
              </div>
              
              {/* Paragraphs */}
              <div className="relative lg:absolute content-stretch flex flex-col gap-[16px] lg:gap-[24px] h-auto lg:h-[160px] items-start left-0 lg:left-[52px] top-0 lg:top-[115px] w-full lg:w-[900px] mb-6 lg:mb-0">
                <div className="h-auto lg:h-[68px] relative shrink-0 w-full">
                  <p className="relative lg:absolute font-['Schoolbell',sans-serif] leading-[28px] lg:leading-[34px] left-0 lg:left-[450.39px] not-italic text-[#062d3e] text-[20px] lg:text-[26px] text-center top-0 lg:translate-x-[-50%] w-full lg:w-[850px]">Anna hüljatud kassile võimalus leida uuesti kodusoojus ja hoolitsus - võta kass meie varjupaigast! Või paku hoiukodu mõnele tänaval külmas ootavale kassile!</p>
                </div>
                <div className="h-auto lg:h-[68px] relative shrink-0 w-full">
                  <p className="relative lg:absolute font-['Schoolbell',sans-serif] leading-[28px] lg:leading-[34px] left-0 lg:left-[450.36px] not-italic text-[#062d3e] text-[20px] lg:text-[26px] text-center top-0 lg:translate-x-[-50%] w-full lg:w-[892px]">Meil on üle 400 päästetud kassi hoiukodudes üle Eesti. Kõik nad on isemoodi erilised, kuid ühtemoodi tänulikud uue võimaluse eest paremale elule.</p>
                </div>
              </div>
              
              {/* Link */}
              <a
                href="https://catshelp.ee"
                target="_blank"
                rel="noopener noreferrer"
                className="relative lg:absolute bg-[#29d4e8] hover:bg-[#36d6e9] h-[60px] lg:h-[70px] left-0 lg:left-[359.19px] rounded-[247px] top-0 lg:top-[315px] w-full lg:w-[285.609px] flex items-center justify-center transition-colors mb-20 lg:mb-0"
              >
                <p className="font-['Schoolbell',sans-serif] not-italic text-[24px] lg:text-[28px] text-nowrap text-white whitespace-pre">Cats HELPi lehele</p>
              </a>
            </div>
          </div>
          
          {/* Liza Minelli - Bottom Right - Desktop only */}
          <div className="absolute bottom-[3.71px] h-[425.559px] left-[-2.37px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.872px_48.771px] mask-size-[292.106px_377.288px] w-[319.387px] hidden lg:block" style={{ maskImage: `url('${imgImage14}')` }}>
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage23} />
          </div>
          <p className="absolute font-['Schoolbell',sans-serif] leading-[37px] left-[249px] not-italic text-[28px] text-black text-nowrap top-[617.77px] whitespace-pre hidden lg:block">Liza Minelli</p>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="bg-[#f9e9f3] min-h-[400px] lg:h-[753px] relative shrink-0 w-full py-12 lg:py-0">
        <div className="relative lg:absolute lg:contents left-0 lg:left-[367px] top-0 lg:top-[128px] px-4 lg:px-0">
          {/* White Card Container - Centered */}
          <div className="relative lg:absolute bg-white h-auto lg:h-[585px] left-0 lg:left-1/2 lg:-translate-x-1/2 top-0 lg:top-1/2 lg:-translate-y-1/2 rounded-[20px] lg:rounded-[40px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-full lg:w-[800px] max-w-[600px] lg:max-w-none mx-auto p-8 lg:p-0">
            {/* Icon */}
            <div className="relative lg:absolute box-border content-stretch flex flex-col h-[80px] lg:h-[120px] items-center justify-center lg:items-start left-0 lg:left-[64px] px-0 lg:px-[276px] py-0 top-0 lg:top-[64px] w-full lg:w-[672px] mb-6 lg:mb-0">
              <div className="h-[80px] lg:h-[120px] overflow-clip relative shrink-0 w-full">
                <div className="absolute inset-[20%_15%_15%_15%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 84 78">
                    <path d={svgPaths.p1d1ae70} fill="#FF80CE" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Heading */}
            <div className="relative lg:absolute h-auto lg:h-[98px] left-0 lg:left-[64px] top-0 lg:top-[216px] w-full lg:w-[672px] mb-6 lg:mb-0">
              <p className="relative lg:absolute font-['Schoolbell',sans-serif] leading-[normal] left-0 lg:left-[335.77px] not-italic text-[#ff80ce] text-[50px] lg:text-[70px] text-center text-nowrap top-0 lg:top-px tracking-[-2.5px] lg:tracking-[-3.5px] lg:translate-x-[-50%] uppercase whitespace-pre">Aitähhhhhhh!!!!!</p>
            </div>
            
            {/* Paragraph */}
            <div className="relative lg:absolute h-auto lg:h-[76px] left-0 lg:left-[64px] top-0 lg:top-[338px] w-full lg:w-[672px] mb-6 lg:mb-0">
              <p className="relative lg:absolute font-['Schoolbell',sans-serif] leading-[32px] lg:leading-[38px] left-0 lg:left-[336.08px] not-italic text-[#062d3e] text-[22px] lg:text-[28px] text-center top-0 lg:translate-x-[-50%] w-full lg:w-[507px]">Tänu sinu panusele saavad meie kassipisarad õnnepisarateks!</p>
            </div>
            
            {/* Emojis */}
            <div className="relative lg:absolute content-stretch flex gap-[12px] lg:gap-[16px] h-[60px] lg:h-[75px] items-start justify-center left-0 lg:left-[64px] top-0 lg:top-[446px] w-full lg:w-[672px]">
              <div className="h-[60px] lg:h-[75px] relative shrink-0 w-[55px] lg:w-[68.656px]">
                <p className="absolute font-['Arial',sans-serif] leading-[60px] lg:leading-[75px] left-[27px] lg:left-[34px] not-italic text-[40px] lg:text-[50px] text-center text-neutral-950 text-nowrap top-[-5px] translate-x-[-50%] whitespace-pre">🐱</p>
              </div>
              <div className="h-[60px] lg:h-[75px] relative shrink-0 w-[55px] lg:w-[68.656px]">
                <p className="absolute font-['Arial',sans-serif] leading-[60px] lg:leading-[75px] left-[27px] lg:left-[34px] not-italic text-[40px] lg:text-[50px] text-center text-neutral-950 text-nowrap top-[-5px] translate-x-[-50%] whitespace-pre">💖</p>
              </div>
              <div className="h-[60px] lg:h-[75px] relative shrink-0 w-[55px] lg:w-[68.656px]">
                <p className="absolute font-['Arial',sans-serif] leading-[60px] lg:leading-[75px] left-[27px] lg:left-[34px] not-italic text-[40px] lg:text-[50px] text-center text-neutral-950 text-nowrap top-[-5px] translate-x-[-50%] whitespace-pre">🐱</p>
              </div>
            </div>
          </div>
          
          {/* Cat with Hand Image - Bottom Left (Cropped) - Desktop only */}
          <div className="absolute h-[570.079px] right-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.408px_125.031px] mask-size-[987.284px_532.056px] top-[182.94px] w-[988.999px] hidden lg:block" style={{ maskImage: `url('${imgHumbertoArellanoNG2Sqdy9QyUnsplash}')` }}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[115.33%] left-0 max-w-none top-0 w-full" src={imgImage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}