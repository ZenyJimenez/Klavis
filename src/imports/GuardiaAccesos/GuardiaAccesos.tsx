import svgPaths from "./svg-2kca5v9426";
import imgImageKlavisLogo from "./da9c5f090346b090388c669d3e7c116edcd58dfb.png";

function MuiSvgIconRoot() {
  return (
    <div className="h-[23.994px] overflow-clip relative shrink-0 w-full" data-name="MuiSvgIconRoot">
      <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9953 11.9969">
          <path d={svgPaths.p11637200} fill="var(--fill-0, #0F172A)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[41.602px] relative rounded-[10px] shrink-0 w-[39.974px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.619px] px-[7.99px] relative size-full">
        <MuiSvgIconRoot />
      </div>
    </div>
  );
}

function MuiSvgIconRoot1() {
  return (
    <div className="h-[19.999px] overflow-clip relative shrink-0 w-full" data-name="MuiSvgIconRoot">
      <div className="absolute inset-[4.17%_12.5%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.999 18.3321">
          <path d={svgPaths.pf283a80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#2563eb] h-[36.002px] relative rounded-[4px] shrink-0 w-[31.996px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9.619px] px-[5.998px] relative size-full">
        <MuiSvgIconRoot1 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[36.002px] relative shrink-0 w-[94.405px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#0f172a] text-[24px] top-[-1px] tracking-[1.2px] whitespace-nowrap">KLAVIS</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[41.602px] relative shrink-0 w-[190.345px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[15.98px] items-center pl-[-7.99px] relative size-full">
        <Button />
        <Container2 />
        <Heading />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#1e3a5f] flex-[1_0_0] h-[35.991px] min-h-px min-w-px relative rounded-[25159200px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">JP</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[35.991px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[63.991px] relative shrink-0 w-[392.897px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b-[0.75px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[0.75px] px-[15.992px] relative size-full">
        <Container1 />
        <Container3 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27.989px] relative shrink-0 w-[155.163px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0a1628] text-[20px] top-[-0.5px] tracking-[-0.5px] whitespace-nowrap">Accesos en Vivo</p>
      </div>
    </div>
  );
}

function Container7() {
  return <div className="absolute bg-[#16a34a] left-[9.99px] opacity-83 rounded-[25159200px] size-[7.99px] top-[7.99px]" data-name="Container" />;
}

function Container6() {
  return (
    <div className="bg-[rgba(22,163,74,0.1)] h-[23.982px] relative rounded-[25159200px] shrink-0 w-[95.588px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container7 />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-[25.97px] not-italic text-[#16a34a] text-[12px] top-[4px] tracking-[0.6px] uppercase whitespace-nowrap">En línea</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[27.989px] relative shrink-0 w-[343.668px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.997px] items-center relative size-full">
        <Heading1 />
        <Container6 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#0a1628] h-[33.495px] relative rounded-[25159200px] shrink-0 w-[73.141px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[36.99px] not-italic text-[14px] text-center text-white top-[6.5px] whitespace-nowrap">todos</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[33.495px] relative rounded-[25159200px] shrink-0 w-[91.675px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[25159200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[46.24px] not-italic text-[#64748b] text-[14px] text-center top-[6.5px] whitespace-nowrap">peatonal</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[33.495px] relative rounded-[25159200px] shrink-0 w-[96.221px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[25159200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[48.24px] not-italic text-[#64748b] text-[14px] text-center top-[6.5px] whitespace-nowrap">vehicular</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[33.495px] relative shrink-0 w-[343.668px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-start relative size-full">
        <Button1 />
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Option() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option1() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option2() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option3() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Option4() {
  return <div className="h-0 shrink-0 w-full" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="bg-white h-[32.242px] relative rounded-[25159200px] shrink-0 w-[343.668px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[25159200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.75px] pl-[-15.992px] pr-[359.66px] pt-[-177.446px] relative size-full">
        <Option />
        <Option1 />
        <Option2 />
        <Option3 />
        <Option4 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[77.734px] relative shrink-0 w-[343.668px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[11.997px] items-start relative size-full">
        <Container9 />
        <Dropdown />
      </div>
    </div>
  );
}

function GuardRealtime() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[15.992px] h-[145.696px] items-start pt-[7.99px] relative shrink-0 w-full" data-name="GuardRealtime">
      <Container5 />
      <Container8 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#2563eb] relative rounded-[5px] shrink-0 size-[123px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">CH</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex h-[22.494px] items-start left-0 overflow-clip pr-[8px] top-0 w-[161.032px]" data-name="Heading 3">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] not-italic relative shrink-0 text-[#0a1628] text-[18px] whitespace-nowrap">Carlos Hernández L.</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[15.992px] items-start left-[161.03px] top-0 w-[69.158px]" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap">Justo ahora</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[22.494px] left-0 top-0 w-[230.19px]" data-name="Container">
      <Heading2 />
      <Text />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[19.999px] left-0 top-[26.49px] w-[230.19px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-[-0.25px] whitespace-nowrap">Alumno</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[65px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#0a1628] text-[14px] top-[-0.25px] whitespace-nowrap">Peatonal</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex h-[19.999px] items-center left-[165.67px] top-[54.33px]" data-name="Container">
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[109.061px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#0a1628] text-[14px] top-[-0.25px] whitespace-nowrap">Principal</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[19.999px] items-center left-0 top-[54.48px]" data-name="Container">
      <Text2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[75px] relative shrink-0 w-[243px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container14 />
        <Paragraph />
        <Container15 />
        <Container16 />
        <div className="absolute h-[20px] left-[138.67px] top-[53.33px] w-0">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 20">
              <path d="M0.5 0V20" id="Vector 1" stroke="var(--stroke-0, #E2E8F0)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[342.168px]" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[15.992px] items-center justify-center pt-[19.999px] px-[19.999px] relative size-full">
          <Container12 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function MuiSvgIconRoot2() {
  return (
    <div className="absolute left-[114.23px] size-[19.999px] top-[12px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p15c4ea00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#16a34a] h-[43.992px] relative shrink-0 w-[342.168px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <MuiSvgIconRoot2 />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[142.22px] not-italic text-[14px] text-white top-[11.75px] tracking-[0.7px] uppercase whitespace-nowrap">APROBADO</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white h-[290px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.75px] relative rounded-[inherit] size-full">
        <Container11 />
        <Container17 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#2563eb] relative rounded-[25159200px] shrink-0 size-[55.989px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">LR</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[22.494px] relative shrink-0 w-[165.144px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip pr-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] not-italic relative shrink-0 text-[#0a1628] text-[18px] whitespace-nowrap">Luis Ramírez Vega</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[15.992px] relative shrink-0 w-[65.045px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">Hace 2 min</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex h-[22.494px] items-start justify-between left-0 top-0 w-[230.19px]" data-name="Container">
      <Heading3 />
      <Text3 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[19.999px] left-0 top-[26.49px] w-[230.19px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-[-0.25px] whitespace-nowrap">Alumno</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[126.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#0a1628] text-[14px] top-[-0.25px] whitespace-nowrap">Estacionamiento D</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[19.999px] items-center left-0 top-[54.48px] w-[230.19px]" data-name="Container">
      <Text4 />
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[230.19_0_0] h-[74.477px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container22 />
        <Paragraph1 />
        <Container23 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex gap-[15.992px] h-[114.474px] items-start left-[0.75px] pt-[19.999px] px-[19.999px] top-[0.75px] w-[342.168px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function MuiSvgIconRoot3() {
  return (
    <div className="absolute left-[109.13px] size-[19.999px] top-[12px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p484fc00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[#dc2626] h-[43.992px] left-[0.75px] top-[115.22px] w-[342.168px]" data-name="Container">
      <MuiSvgIconRoot3 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[137.12px] not-italic text-[14px] text-white top-[11.75px] tracking-[0.7px] uppercase whitespace-nowrap">RECHAZADO</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[159.966px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container19 />
        <Container24 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#16a34a] relative rounded-[25159200px] shrink-0 size-[39.997px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">RM</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[19.999px] left-0 overflow-clip top-0 w-[180.433px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#0a1628] text-[14px] top-[-0.25px] whitespace-nowrap">Roberto Mendoza</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[15.992px] items-start left-0 top-[20px] w-[180.433px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">Docente · Zona A</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[180.433_0_0] h-[35.991px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading4 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15.992px] relative shrink-0 w-[70.751px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right whitespace-nowrap">Hace 10 min</p>
      </div>
    </div>
  );
}

function MuiSvgIconRoot4() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p15c4ea00} fill="var(--fill-0, #16A34A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[39.986px] relative shrink-0 w-[70.751px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.995px] items-end relative size-full">
        <Text5 />
        <MuiSvgIconRoot4 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-white h-[65.491px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[11.997px] items-center pl-[15.746px] pr-[12.747px] py-[0.75px] relative size-full">
          <Container26 />
          <Container27 />
          <Container28 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#16a34a] border-b-[0.75px] border-l-[3.749px] border-r-[0.75px] border-solid border-t-[0.75px] inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#2563eb] relative rounded-[25159200px] shrink-0 size-[39.997px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">AL</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[19.999px] left-0 overflow-clip top-0 w-[181.066px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#0a1628] text-[14px] top-[-0.25px] whitespace-nowrap">Ana López Castillo</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex h-[15.992px] items-start left-0 top-[20px] w-[181.066px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">Alumno · Principal (A y C)</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[181.066_0_0] h-[35.991px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading5 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[15.992px] relative shrink-0 w-[70.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right whitespace-nowrap">Hace 15 min</p>
      </div>
    </div>
  );
}

function MuiSvgIconRoot5() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p15c4ea00} fill="var(--fill-0, #16A34A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[39.986px] relative shrink-0 w-[70.118px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.995px] items-end relative size-full">
        <Text6 />
        <MuiSvgIconRoot5 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-white h-[65.491px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[11.997px] items-center pl-[15.746px] pr-[12.747px] py-[0.75px] relative size-full">
          <Container30 />
          <Container31 />
          <Container32 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#16a34a] border-b-[0.75px] border-l-[3.749px] border-r-[0.75px] border-solid border-t-[0.75px] inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function GuardRealtime1() {
  return (
    <div className="content-stretch flex flex-col gap-[15.992px] h-[674.847px] items-start relative shrink-0 w-full" data-name="GuardRealtime">
      <Container10 />
      <Container18 />
      <Container25 />
      <Container29 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-[#f8fafc] h-[876px] relative shrink-0 w-[393px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[23.994px] items-start overflow-clip pl-[15.992px] pr-[33.237px] pt-[15.992px] relative rounded-[inherit] size-full">
        <GuardRealtime />
        <GuardRealtime1 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[392.897_0_0] h-[851.777px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

function GuardLayout() {
  return (
    <div className="absolute bg-[#f8fafc] content-stretch flex h-[940px] items-start left-0 top-0 w-[393px]" data-name="GuardLayout">
      <Container />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[28px] left-[71.98px] top-[30.12px] w-[84.681px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-white top-[-0.5px] tracking-[2px] whitespace-nowrap">KLAVIS</p>
    </div>
  );
}

function ImageKlavisLogo() {
  return (
    <div className="absolute h-[79.69px] left-[-19.31px] top-[-16.71px] w-[74.465px]" data-name="Image (Klavis Logo)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageKlavisLogo} />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#1e3a5f] h-[39.997px] left-[23.99px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[24.12px] w-[35.991px]" data-name="Container">
      <ImageKlavisLogo />
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="absolute border-[rgba(255,255,255,0.1)] border-b-[0.75px] border-solid h-[88.992px] left-0 top-0 w-[279.993px]" data-name="SidebarContent">
      <Text7 />
      <Container33 />
    </div>
  );
}

function MuiSvgIconRoot6() {
  return (
    <div className="h-[23.994px] overflow-clip relative shrink-0 w-full" data-name="MuiSvgIconRoot">
      <div className="absolute inset-[20.83%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9963 13.9963">
          <path d={svgPaths.p623960} fill="var(--fill-0, #64748B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[25.622px] items-start left-[240.01px] pt-[1.628px] top-[23.99px] w-[23.994px]" data-name="Button">
      <MuiSvgIconRoot6 />
    </div>
  );
}

function MuiSvgIconRoot7() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g clipPath="url(#clip0_49_395)" id="MuiSvgIconRoot">
          <path d={svgPaths.p2869b600} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_49_395">
            <rect fill="white" height="19.9987" width="19.9987" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SidebarContent2() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[57.735px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-white top-[-0.25px] whitespace-nowrap">Accesos</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bg-[#2563eb] content-stretch flex gap-[11.997px] h-[43.992px] items-center left-[15.99px] pl-[15.992px] rounded-[8px] top-[23.99px] w-[248.009px]" data-name="Link">
      <MuiSvgIconRoot7 />
      <SidebarContent2 />
    </div>
  );
}

function MuiSvgIconRoot8() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p700de00} fill="var(--fill-0, #64748B)" id="Vector" />
          <path d={svgPaths.p32378600} fill="var(--fill-0, #64748B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function SidebarContent3() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[55.111px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-[-0.25px] whitespace-nowrap">Historial</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[43.992px] items-center left-[15.99px] pl-[15.992px] rounded-[8px] top-[71.98px] w-[248.009px]" data-name="Link">
      <MuiSvgIconRoot8 />
      <SidebarContent3 />
    </div>
  );
}

function MuiSvgIconRoot9() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p5ba5a80} fill="var(--fill-0, #64748B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SidebarContent4() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[72.508px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-[-0.25px] whitespace-nowrap">Calendario</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[43.992px] items-center left-[15.99px] pl-[15.992px] rounded-[8px] top-[119.97px] w-[248.009px]" data-name="Link">
      <MuiSvgIconRoot9 />
      <SidebarContent4 />
    </div>
  );
}

function MuiSvgIconRoot10() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g clipPath="url(#clip0_49_411)" id="MuiSvgIconRoot">
          <path d={svgPaths.p35ad2da0} fill="var(--fill-0, #64748B)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_49_411">
            <rect fill="white" height="19.9987" width="19.9987" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SidebarContent5() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[76.246px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-[-0.25px] whitespace-nowrap">Incidencias</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[43.992px] items-center left-[15.99px] pl-[15.992px] rounded-[8px] top-[167.96px] w-[248.009px]" data-name="Link">
      <MuiSvgIconRoot10 />
      <SidebarContent5 />
    </div>
  );
}

function MuiSvgIconRoot11() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p190f3280} fill="var(--fill-0, #64748B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SidebarContent6() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[50.963px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-[-0.25px] whitespace-nowrap">Parking</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[43.992px] items-center left-[15.99px] pl-[15.992px] rounded-[8px] top-[215.94px] w-[248.009px]" data-name="Link">
      <MuiSvgIconRoot11 />
      <SidebarContent6 />
    </div>
  );
}

function MuiSvgIconRoot12() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p27ea0a00} fill="var(--fill-0, #64748B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SidebarContent7() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[44.086px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-[-0.25px] whitespace-nowrap">Avisos</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[43.992px] items-center left-[15.99px] pl-[15.992px] rounded-[8px] top-[263.93px] w-[248.009px]" data-name="Link">
      <MuiSvgIconRoot12 />
      <SidebarContent7 />
    </div>
  );
}

function SidebarContent1() {
  return (
    <div className="absolute h-[685.789px] left-0 overflow-clip top-[88.99px] w-[279.993px]" data-name="SidebarContent">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
      <Link5 />
    </div>
  );
}

function MuiSvgIconRoot13() {
  return (
    <div className="relative shrink-0 size-[19.999px]" data-name="MuiSvgIconRoot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9987 19.9987">
        <g id="MuiSvgIconRoot">
          <path d={svgPaths.p19496f00} fill="var(--fill-0, #64748B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SidebarContent9() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[91.746px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-[-0.25px] whitespace-nowrap">Cerrar Sesión</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[43.992px] items-center left-[15.99px] pl-[15.992px] rounded-[8px] top-[17px] w-[248.009px]" data-name="Link">
      <MuiSvgIconRoot13 />
      <SidebarContent9 />
    </div>
  );
}

function SidebarContent8() {
  return (
    <div className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t-[0.75px] h-[76.995px] left-0 top-[774.78px] w-[279.993px]" data-name="SidebarContent">
      <Link6 />
    </div>
  );
}

function GuardLayout1() {
  return (
    <div className="absolute bg-[#0a1628] h-[851.777px] left-[-279.99px] top-0 w-[279.993px]" data-name="GuardLayout">
      <SidebarContent />
      <Button4 />
      <SidebarContent1 />
      <SidebarContent8 />
    </div>
  );
}

export default function GuardiaAccesos() {
  return (
    <div className="bg-white relative size-full" data-name="Guardia - Accesos">
      <GuardLayout />
      <GuardLayout1 />
    </div>
  );
}