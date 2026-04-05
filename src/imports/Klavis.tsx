import svgPaths from "./svg-iiwldb8iff";
import imgImageKlavisLogo from "figma:asset/da9c5f090346b090388c669d3e7c116edcd58dfb.png";

function Heading1() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[36px] min-h-px min-w-px not-italic relative text-[#0a1628] text-[30px]">Bienvenido</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#64748b] text-[16px] top-[-1px] whitespace-nowrap">Ingresa tus credenciales institucionales para continuar</p>
    </div>
  );
}

function Login() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-full" data-name="Login">
      <Heading1 />
      <Paragraph />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a1628] text-[14px] top-0 whitespace-nowrap">Correo institucional</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-[#f8fafc] h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(100,116,139,0.5)] whitespace-nowrap">ejemplo@itmexicali.edu.mx</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <EmailInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a1628] text-[14px] top-0 whitespace-nowrap">Contraseña</p>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute bg-[#f8fafc] h-[50px] left-0 rounded-[10px] top-0 w-[448px]" data-name="Password Input">
      <div className="content-stretch flex items-center overflow-clip pl-[16px] pr-[48px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(15,23,42,0.5)] whitespace-nowrap">••••••••</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function MuiSvgIconRoot() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="MuiSvgIconRoot">
      <div className="absolute inset-[18.75%_4.17%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 12.5">
          <path d={svgPaths.p32384d00} fill="var(--fill-0, #64748B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[416px] pt-[3.625px] top-[13px] w-[20px]" data-name="Button">
      <MuiSvgIconRoot />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Container">
      <PasswordInput />
      <Button />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[168px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Checkbox() {
  return <div className="shrink-0 size-[16px]" data-name="Checkbox" />;
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a1628] text-[14px] top-0 whitespace-nowrap">Recordarme</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[105.641px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Checkbox />
        <Text />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[148.094px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[74px] not-italic text-[#2563eb] text-[14px] text-center top-0 whitespace-nowrap">Recuperar contraseña</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2563eb] h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[224.06px] not-italic text-[16px] text-center text-white top-[11px] whitespace-nowrap">Iniciar Sesión</p>
    </div>
  );
}

function Login1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[284px] items-start relative shrink-0 w-full" data-name="Login">
      <Container2 />
      <Container6 />
      <Button2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[384px] relative shrink-0 w-[448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[32px] items-start relative size-full">
        <Login />
        <Login1 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[944px] items-start justify-center left-[774.5px] pl-[163.25px] py-[280px] top-0 w-[774.5px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container8() {
  return <div className="absolute h-[944px] left-0 opacity-10 top-0 w-[774.5px]" data-name="Container" />;
}

function Login2() {
  return (
    <div className="absolute h-[32px] left-0 top-[106px] w-[495.922px]" data-name="Login">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-[248px] not-italic text-[24px] text-center text-white top-[-1px] whitespace-nowrap">Sistema de Control de Acceso Institucional</p>
    </div>
  );
}

function Login3() {
  return (
    <div className="absolute h-[28px] left-[108.55px] top-[146px] w-[278.828px]" data-name="Login">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-[139.5px] not-italic text-[#64748b] text-[18px] text-center top-0 whitespace-nowrap">Instituto Tecnológico de Mexicali</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[40px] relative shrink-0 w-[151px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-[76.5px] not-italic text-[36px] text-center text-white top-0 tracking-[3.6px] whitespace-nowrap">KLAVIS</p>
      </div>
    </div>
  );
}

function Login4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.05)] content-stretch flex h-[74px] items-center left-[155px] px-[17px] py-px rounded-[16px] top-0" data-name="Login">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[174px] left-[139px] top-[472px] w-[496px]" data-name="Container">
      <Login2 />
      <Login3 />
      <Login4 />
    </div>
  );
}

function ImageKlavisLogo() {
  return (
    <div className="absolute h-[312px] left-[296px] top-[160px] w-[184px]" data-name="Image (KLAVIS Logo)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[181.82%] left-[-104.36%] max-w-none top-[-32.33%] w-[307.69%]" src={imgImageKlavisLogo} />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#0a1628] h-[944px] left-0 overflow-clip top-0 w-[774.5px]" data-name="Container">
      <Container8 />
      <Container9 />
      <ImageKlavisLogo />
    </div>
  );
}

export default function Klavis() {
  return (
    <div className="bg-[#f8fafc] relative size-full" data-name="Klavis">
      <Container />
      <Container7 />
    </div>
  );
}