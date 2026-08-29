import type { ChipProps, CommonLayoutProps } from "tscircuit"

const boardOutline = [
  { x: -46.5, y: 39.25 },
  { x: 46.5, y: 39.25 },
  { x: 48.5, y: 37.25 },
  { x: 48.5, y: -37.25 },
  { x: 46.5, y: -39.25 },
  { x: -46.5, y: -39.25 },
  { x: -48.5, y: -37.25 },
  { x: -48.5, y: 37.25 },
]

const keyPinLabels = { pin1: "S1", pin2: "S2" } as const
const comboPinLabels = {
  pin1: "A", pin2: "B", pin3: "C", pin4: "D",
  pin5: "E", pin6: "S1", pin7: "S2", pin8: "CASE1", pin9: "CASE2",
} as const
const proMicroPinLabels = {
  pin1: "TX", pin2: "RX", pin3: "GND1", pin4: "GND2",
  pin5: "SDA", pin6: "SCL", pin7: "D4", pin8: "COL0",
  pin9: "ENCODER1_L1", pin10: "ENCODER1_L0",
  pin11: "ENCODER0_L0", pin12: "ENCODER0_L1",
  pin13: "COL4", pin14: "COL3", pin15: "COL2", pin16: "COL1",
  pin17: "ROW3", pin18: "ROW2", pin19: "ROW1", pin20: "ROW0",
  pin21: "VCC", pin22: "RESET", pin23: "GND3", pin24: "RAW",
} as const
const oledPinLabels = { pin1: "GND", pin2: "VCC", pin3: "SCL", pin4: "SDA" } as const
const resetPinLabels = { pin1: "GND", pin2: "RESET" } as const

const switchOutline = [
  { x: -7.5, y: -7.5 }, { x: 7.5, y: -7.5 },
  { x: 7.5, y: 7.5 }, { x: -7.5, y: 7.5 },
  { x: -7.5, y: -7.5 },
]

const LowProfileSwitch = (props: ChipProps<typeof keyPinLabels>) => (
  <pushbutton
    {...props}
    manufacturerPartNumber="Gateron Low Profile 2.0 hot-swap socket"
    pinLabels={keyPinLabels}
    schPinArrangement={{
      leftSide: { pins: ["S1"], direction: "top-to-bottom" },
      rightSide: { pins: ["S2"], direction: "top-to-bottom" },
    }}
    footprint={
      <footprint originalLayer="top" insertionDirection="from_above">
        <hole pcbX={-4.4} pcbY={-4.7} diameter={3} />
        <hole pcbX={0} pcbY={0} diameter={5.1} />
        <hole pcbX={2.6} pcbY={-5.75} diameter={3} />
        <smtpad portHints={["pin1"]} pcbX={-8.275} pcbY={-4.7} layer="bottom" width={2.55} height={2.55} shape="rect" />
        <smtpad portHints={["pin2"]} pcbX={6.475} pcbY={-5.75} layer="bottom" width={2.55} height={2.55} shape="rect" />
        <silkscreenpath route={switchOutline} strokeWidth={0.15} />
      </footprint>
    }
  />
)

const ComboEncoderKey = (props: ChipProps<typeof comboPinLabels>) => (
  <chip
    {...props}
    manufacturerPartNumber="Gateron Low Profile socket / EC11 combo"
    pinLabels={comboPinLabels}
    noConnect={["CASE1", "CASE2"]}
    schWidth={1.485}
    schHeight={1}
    schPinArrangement={{
      leftSide: { pins: ["A", "B", "C", "CASE1", "CASE2"], direction: "top-to-bottom" },
      rightSide: { pins: ["D", "E", "S1", "S2"], direction: "top-to-bottom" },
    }}
    footprint={
      <footprint originalLayer="top" insertionDirection="from_above">
        <hole pcbX={-4.4} pcbY={-4.7} diameter={3} />
        <hole pcbX={0} pcbY={0} diameter={5.1} />
        <platedhole portHints={["pin8"]} pcbX={1.17} pcbY={-5.93} outerWidth={2.4} outerHeight={3.4} holeWidth={2} holeHeight={3} shape="pill" pcbRotation={280} />
        <platedhole portHints={["pin8"]} pcbX={0} pcbY={-6.1} outerWidth={3.175} outerHeight={3} holeWidth={2.2} holeHeight={2.2} shape="pill" pcbRotation={90} />
        <platedhole portHints={["pin8"]} pcbX={2.6} pcbY={-5.75} outerDiameter={3.5} holeDiameter={3} shape="circle" />
        <platedhole portHints={["pin9"]} pcbX={0} pcbY={6.1} outerWidth={3.1875} outerHeight={3} holeWidth={2.2} holeHeight={2.2} shape="pill" pcbRotation={90} />
        <platedhole portHints={["pin1"]} pcbX={-7.5} pcbY={2.5} outerDiameter={1.5} holeDiameter={1} shape="circle" />
        <platedhole portHints={["pin2"]} pcbX={-7.5} pcbY={-2.2} outerDiameter={1.5} holeDiameter={1} shape="circle" />
        <platedhole portHints={["pin3"]} pcbX={-7.5} pcbY={0} outerDiameter={1.5} holeDiameter={1} shape="circle" />
        <platedhole portHints={["pin4"]} pcbX={7} pcbY={2.5} outerDiameter={1.5} holeDiameter={1} shape="circle" />
        <platedhole portHints={["pin5"]} pcbX={7} pcbY={-2.5} outerDiameter={1.5} holeDiameter={1} shape="circle" />
        <smtpad portHints={["pin6"]} pcbX={-8.275} pcbY={-4.7375} layer="bottom" width={2.55} height={2.475} shape="rect" />
        <smtpad portHints={["pin7"]} pcbX={6.475} pcbY={-5.75} layer="bottom" width={2.55} height={2.55} shape="rect" />
        <silkscreenpath route={switchOutline} strokeWidth={0.15} />
        <silkscreencircle pcbX={0} pcbY={0} radius={3} strokeWidth={0.15} />
      </footprint>
    }
  />
)

interface RoundPlatedPinProps {
  portHint: string
  x: number
  y: number
  outerDiameter: number
  holeDiameter: number
}

const RoundPlatedPin = ({ portHint, x, y, outerDiameter, holeDiameter }: RoundPlatedPinProps) => (
  <platedhole
    portHints={[portHint]}
    pcbX={x}
    pcbY={y}
    outerDiameter={outerDiameter}
    holeDiameter={holeDiameter}
    shape="circle"
  />
)

const ProMicro = (props: ChipProps<typeof proMicroPinLabels>) => {
  const leftPins = Array.from({ length: 12 }, (_, index) => ({ pin: `pin${index + 1}`, y: 12.7 - index * 2.54 }))
  const rightPins = Array.from({ length: 12 }, (_, index) => ({ pin: `pin${24 - index}`, y: 12.7 - index * 2.54 }))

  return (
    <chip
      {...props}
      manufacturerPartNumber="SparkFun Pro Micro ATmega32U4"
      pinLabels={proMicroPinLabels}
      noConnect={["TX", "RX", "D4", "RAW"]}
      schWidth={2.625}
      schPinArrangement={{
        leftSide: { pins: ["TX", "RX", "GND1", "GND2", "SDA", "SCL", "D4", "COL0", "ENCODER1_L1", "ENCODER1_L0", "ENCODER0_L0", "ENCODER0_L1"], direction: "top-to-bottom" },
        rightSide: { pins: ["RAW", "GND3", "RESET", "VCC", "ROW0", "ROW1", "ROW2", "ROW3", "COL1", "COL2", "COL3", "COL4"], direction: "top-to-bottom" },
      }}
      footprint={
        <footprint originalLayer="top" insertionDirection="from_above">
          {leftPins.map(({ pin, y }) => (
            <RoundPlatedPin key={pin} portHint={pin} x={-7.62} y={y} outerDiameter={1.8796} holeDiameter={1.016} />
          ))}
          {rightPins.map(({ pin, y }) => (
            <RoundPlatedPin key={pin} portHint={pin} x={7.62} y={y} outerDiameter={1.8796} holeDiameter={1.016} />
          ))}
          <silkscreenrect pcbX={0} pcbY={0} width={18} height={33.5} filled={false} strokeWidth={0.18} />
        </footprint>
      }
    />
  )
}

const OledHeader = (props: ChipProps<typeof oledPinLabels>) => (
  <connector
    {...props}
    manufacturerPartNumber="0.91in 128x32 I2C OLED"
    pinLabels={oledPinLabels}
    schPinArrangement={{
      leftSide: { pins: ["SDA", "SCL"], direction: "top-to-bottom" },
      rightSide: { pins: ["VCC", "GND"], direction: "top-to-bottom" },
    }}
    footprint={
      <footprint originalLayer="top" insertionDirection="from_above">
        <platedhole
          portHints={["pin1"]}
          pcbX={3.81}
          pcbY={0}
          shape="circular_hole_with_rect_pad"
          holeDiameter={1}
          rectPadWidth={1.7}
          rectPadHeight={1.7}
        />
        {[1.27, -1.27, -3.81].map((x, index) => (
          <RoundPlatedPin key={index} portHint={`pin${index + 2}`} x={x} y={0} outerDiameter={1.7} holeDiameter={1} />
        ))}
        <silkscreenrect pcbX={0} pcbY={0} width={10.5} height={3} filled={false} strokeWidth={0.12} />
        <silkscreenrect pcbX={0} pcbY={17.4} width={12} height={38} filled={false} strokeWidth={0.15} />
        <silkscreenrect pcbX={-1.0111} pcbY={16.65} width={5.52} height={22.38} filled={false} strokeWidth={0.12} />
        <courtyardrect pcbX={0} pcbY={17.4} width={12} height={38} strokeWidth={0.05} />
        <silkscreentext text="GND" pcbX={3.81} pcbY={-2} fontSize={0.55} anchorAlignment="center" />
        <silkscreentext text="VCC" pcbX={1.27} pcbY={-2} fontSize={0.55} anchorAlignment="center" />
        <silkscreentext text="SCL" pcbX={-1.27} pcbY={-2} fontSize={0.55} anchorAlignment="center" />
        <silkscreentext text="SDA" pcbX={-3.81} pcbY={-2} fontSize={0.55} anchorAlignment="center" />
      </footprint>
    }
  />
)

const ResetButton = (props: ChipProps<typeof resetPinLabels>) => (
  <pushbutton
    {...props}
    manufacturerPartNumber="6mm through-hole tactile switch"
    pinLabels={resetPinLabels}
    schPinArrangement={{
      leftSide: { pins: ["GND"], direction: "top-to-bottom" },
      rightSide: { pins: ["RESET"], direction: "top-to-bottom" },
    }}
    footprint={
      <footprint originalLayer="top" insertionDirection="from_above">
        <platedhole portHints={["pin1"]} pcbX={-3.2512} pcbY={2.2606} outerDiameter={1.8796} holeDiameter={1.016} shape="circle" />
        <platedhole pcbX={3.2512} pcbY={2.2606} outerDiameter={1.8796} holeDiameter={1.016} shape="circle" />
        <platedhole portHints={["pin2"]} pcbX={-3.2512} pcbY={-2.2606} outerDiameter={1.8796} holeDiameter={1.016} shape="circle" />
        <platedhole pcbX={3.2512} pcbY={-2.2606} outerDiameter={1.8796} holeDiameter={1.016} shape="circle" />
        <silkscreenrect pcbX={0} pcbY={0} width={6.5} height={6.5} filled={false} strokeWidth={0.15} />
      </footprint>
    }
  />
)

const diodeFootprint = () => (
  <footprint originalLayer="top" insertionDirection="from_above">
    <platedhole portHints={["anode"]} pcbX={-3.81} pcbY={0} outerDiameter={1.35} holeDiameter={0.9} shape="circle" />
    <platedhole portHints={["cathode"]} pcbX={3.81} pcbY={0} outerDiameter={1.35} holeDiameter={0.9} shape="circle" />
    <silkscreenrect pcbX={0} pcbY={0} width={4} height={1.8} filled={false} strokeWidth={0.15} />
  </footprint>
)

interface MatrixPosition {
  name: string
  diode: string
  row: 0 | 1 | 2 | 3
  col: 0 | 1 | 2 | 3 | 4
  pcbX: number
  pcbY: number
  isEncoderCombo?: boolean
  encoderIndex?: 0 | 1
}

const matrixPositions: MatrixPosition[] = [
  { name: "RE_0_1", diode: "D1", row: 0, col: 1, pcbX: -18.5, pcbY: 28.75, isEncoderCombo: true, encoderIndex: 0 },
  { name: "S2", diode: "D2", row: 0, col: 2, pcbX: 0.55, pcbY: 28.75 },
  { name: "S3", diode: "D3", row: 0, col: 3, pcbX: 19.6, pcbY: 28.75 },
  { name: "RE_0_4", diode: "D4", row: 0, col: 4, pcbX: 38.65, pcbY: 28.75, isEncoderCombo: true, encoderIndex: 1 },
  { name: "S5", diode: "D5", row: 1, col: 1, pcbX: -18.5, pcbY: 9.7 },
  { name: "S6", diode: "D6", row: 1, col: 2, pcbX: 0.55, pcbY: 9.7 },
  { name: "S7", diode: "D7", row: 1, col: 3, pcbX: 19.6, pcbY: 9.7 },
  { name: "S8", diode: "D8", row: 1, col: 4, pcbX: 38.65, pcbY: 9.7 },
  { name: "S9", diode: "D9", row: 2, col: 1, pcbX: -18.5, pcbY: -9.35 },
  { name: "S10", diode: "D10", row: 2, col: 2, pcbX: 0.55, pcbY: -9.35 },
  { name: "S11", diode: "D11", row: 2, col: 3, pcbX: 19.6, pcbY: -9.35 },
  { name: "S12", diode: "D12", row: 2, col: 4, pcbX: 38.65, pcbY: -9.35 },
  { name: "RE_3_0", diode: "D20", row: 3, col: 0, pcbX: -38.45, pcbY: -28.4, isEncoderCombo: true, encoderIndex: 0 },
  { name: "RE_3_1", diode: "D13", row: 3, col: 1, pcbX: -18.5, pcbY: -28.4, isEncoderCombo: true, encoderIndex: 0 },
  { name: "S14", diode: "D14", row: 3, col: 2, pcbX: 0.55, pcbY: -28.4 },
  { name: "S15", diode: "D15", row: 3, col: 3, pcbX: 19.6, pcbY: -28.4 },
  { name: "RE_3_4", diode: "D16", row: 3, col: 4, pcbX: 38.65, pcbY: -28.4, isEncoderCombo: true, encoderIndex: 1 },
]

const diodePlacement: Record<string, CommonLayoutProps> = {
  D1: { pcbX: -18.6911, pcbY: 19.1036, pcbRotation: 0 },
  D2: { pcbX: -9.0011, pcbY: 32.2936, pcbRotation: 90 },
  D3: { pcbX: 10.0989, pcbY: 32.2936, pcbRotation: 90 },
  D4: { pcbX: 38.9089, pcbY: 19.1036, pcbRotation: 0 },
  D5: { pcbX: -28.0011, pcbY: 12.0936, pcbRotation: 90 },
  D6: { pcbX: -9.0011, pcbY: 12.0936, pcbRotation: 90 },
  D7: { pcbX: 10.3989, pcbY: 12.0936, pcbRotation: 90 },
  D8: { pcbX: 29.1989, pcbY: 12.0936, pcbRotation: 90 },
  D9: { pcbX: -28.0011, pcbY: -6.5064, pcbRotation: 90 },
  D10: { pcbX: -8.9011, pcbY: -6.5064, pcbRotation: 90 },
  D11: { pcbX: 10.4989, pcbY: -6.5064, pcbRotation: 90 },
  D12: { pcbX: 29.0989, pcbY: -6.5064, pcbRotation: 90 },
  D13: { pcbX: -18.4911, pcbY: -18.7964, pcbRotation: 0 },
  D14: { pcbX: 0.8089, pcbY: -18.7964, pcbRotation: 0 },
  D15: { pcbX: 19.6089, pcbY: -18.7964, pcbRotation: 0 },
  D16: { pcbX: 38.7089, pcbY: -18.7964, pcbRotation: 0 },
  D20: { pcbX: -28.0011, pcbY: -25.4064, pcbRotation: 90 },
}

const mountingHoles = [
  { name: "MH1", x: -9.9011, y: 20.1036, diameter: 2.1 },
  { name: "MH2", x: 30.0989, y: 20.1036, diameter: 2.1 },
  { name: "MH3", x: -9.9011, y: -19.8964, diameter: 2.1 },
  { name: "MH4", x: 30.0989, y: -19.8964, diameter: 2.1 },
  { name: "MCU_MH1", x: -44.3511, y: -5.9964, diameter: 2.1 },
  { name: "MCU_MH2", x: -31.6011, y: -5.9964, diameter: 2.1 },
  { name: "TOOL1", x: -46.07, y: 35.4536, diameter: 1.152 },
  { name: "TOOL2", x: -30.83, y: 35.4536, diameter: 1.152 },
]

const BoardHole = ({ name, x, y, diameter }: (typeof mountingHoles)[number]) => (
  <hole name={name} pcbX={x} pcbY={y} diameter={diameter} />
)

const MatrixComponents = () => (
  <>
    {matrixPositions.map((position) => {
      const commonProps = {
        name: position.name,
        pcbX: position.pcbX,
        pcbY: position.pcbY,
        schX: position.col * 9,
        schY: 12 - position.row * 8,
        schSectionName: "Matrix",
      }
      return position.isEncoderCombo
        ? <ComboEncoderKey key={position.name} {...commonProps} />
        : <LowProfileSwitch key={position.name} {...commonProps} />
    })}
    {matrixPositions.map((position) => (
      <diode
        key={position.diode}
        name={position.diode}
        footprint={diodeFootprint()}
        layer="bottom"
        {...diodePlacement[position.diode]}
        schX={position.col * 9 + 4.5}
        schY={12 - position.row * 8}
        schSectionName="Matrix"
      />
    ))}
  </>
)

const MatrixPositionTraces = ({ position }: { position: MatrixPosition }) => {
  const keyToDiode = position.isEncoderCombo ? `${position.name}.D` : `${position.name}.S1`
  const keyToColumn = position.isEncoderCombo ? `${position.name}.E` : `${position.name}.S2`

  return (
    <>
      <trace name={`${position.name}_TO_${position.diode}`} from={keyToDiode} to={`${position.diode}.anode`} />
      <trace name={`${position.name}_COL${position.col}`} from={keyToColumn} to={`net.COL${position.col}`} />
      <trace name={`${position.diode}_ROW${position.row}`} from={`${position.diode}.cathode`} to={`net.ROW${position.row}`} />
      {position.isEncoderCombo && (
        <>
          <trace name={`${position.name}_S1_BRIDGE`} from={`${position.name}.S1`} to={`${position.name}.D`} />
          <trace name={`${position.name}_S2_BRIDGE`} from={`${position.name}.S2`} to={`${position.name}.E`} />
          <trace from={`${position.name}.C`} to="net.GND" />
          <trace from={`${position.name}.A`} to={`net.ENCODER${position.encoderIndex}_L1`} />
          <trace from={`${position.name}.B`} to={`net.ENCODER${position.encoderIndex}_L0`} />
        </>
      )}
    </>
  )
}

const MatrixTraces = () => (
  <>
    {matrixPositions.map((position) => (
      <MatrixPositionTraces key={position.name} position={position} />
    ))}
  </>
)

export default () => (
  <board
    title="dumbpad combo OLED low profile v1.3.2"
    outline={boardOutline}
    layers={2}
    thickness={1.6}
    solderMaskColor="green"
    silkscreenColor="white"
    doubleSidedAssembly
    minTraceWidth={0.25}
    nominalTraceWidth={0.25}
    minViaHoleDiameter={0.3}
    minViaPadDiameter={0.6}
    pcbStyle={{ viaHoleDiameter: 0.3, viaPadDiameter: 0.6 }}
  >
    <schematicsection name="Controller" displayName="Pro Micro Controller" />
    <schematicsection name="Matrix" displayName="Key Matrix and Encoders" />
    <schematicsection name="UserIO" displayName="OLED and Reset" />

    <ProMicro name="B1" pcbX={-38.45} pcbY={20.25} schX={-12} schY={3} schSectionName="Controller" />
    <OledHeader name="J1" pcbX={-38.41} pcbY={1.0036} schX={-12} schY={-9} schSectionName="UserIO" />
    <ResetButton name="S17" pcbX={-38.2523} pcbY={-11.4858} pcbRotation={90} layer="bottom" schX={-12} schY={-14} schSectionName="UserIO" />

    <MatrixComponents />

    {mountingHoles.map((hole) => (
      <BoardHole key={hole.name} {...hole} />
    ))}
    <keepout pcbX={41.25} pcbY={3.95} shape="circle" radius={2} layers={["bottom"]} />

    <silkscreentext text="dumbpad v1.3.2" pcbX={-39} pcbY={-37.5} fontSize={1.2} anchorAlignment="center" />
    <silkscreentext text="combo OLED low profile" pcbX={29} pcbY={-37.5} fontSize={1.1} anchorAlignment="center" />

    <trace from="B1.GND1" to="net.GND" />
    <trace from="B1.GND2" to="net.GND" />
    <trace from="B1.GND3" to="net.GND" />
    <trace from="B1.VCC" to="net.VCC" />
    <trace from="B1.SDA" to="net.SDA" />
    <trace from="B1.SCL" to="net.SCL" />
    <trace from="B1.RESET" to="net.RESET" />
    <trace from="B1.COL0" to="net.COL0" />
    <trace from="B1.COL1" to="net.COL1" />
    <trace from="B1.COL2" to="net.COL2" />
    <trace from="B1.COL3" to="net.COL3" />
    <trace from="B1.COL4" to="net.COL4" />
    <trace from="B1.ROW0" to="net.ROW0" />
    <trace from="B1.ROW1" to="net.ROW1" />
    <trace from="B1.ROW2" to="net.ROW2" />
    <trace from="B1.ROW3" to="net.ROW3" />
    <trace from="B1.ENCODER0_L0" to="net.ENCODER0_L0" />
    <trace from="B1.ENCODER0_L1" to="net.ENCODER0_L1" />
    <trace from="B1.ENCODER1_L0" to="net.ENCODER1_L0" />
    <trace from="B1.ENCODER1_L1" to="net.ENCODER1_L1" />

    <trace from="J1.GND" to="net.GND" />
    <trace from="J1.VCC" to="net.VCC" />
    <trace from="J1.SCL" to="net.SCL" />
    <trace from="J1.SDA" to="net.SDA" />
    <trace from="S17.GND" to="net.GND" />
    <trace from="S17.RESET" to="net.RESET" />

    <MatrixTraces />
  </board>
)
