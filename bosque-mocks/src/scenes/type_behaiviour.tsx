import { Code, makeScene2D, lines, CubicBezier, QuadBezier } from '@motion-canvas/2d';
import { all, createRef, Direction, slideTransition, waitFor } from '@motion-canvas/core';

export default makeScene2D(function*(view) {
	// Create your animations here
	const behaviour = createRef<Code>();
	const temp_range = createRef<Code>();
	const wind_speed = createRef<Code>();
	const forecast_detail = createRef<Code>();
	const arrowA = createRef<QuadBezier>();
	const arrowB = createRef<QuadBezier>();
	const arrowC = createRef<QuadBezier>();

	view.add(
		<CubicBezier
			ref={arrowA}
			lineWidth={2}
			stroke={'orange'}
			p0={[-240, -37]}
			p2={[-240, -390]}
			p3={[120, -390]}
			end={0}
			arrowSize={10}
			endArrow
		/>,
	);

	view.add(
		<CubicBezier
			ref={arrowB}
			lineWidth={2}
			stroke={'orange'}
			p0={[-160, 0]}
			p2={[0, -160]}
			p3={[120, -160]}
			end={0}
			arrowSize={10}
			endArrow
		/>,
	);

	view.add(
		<CubicBezier
			ref={arrowC}
			lineWidth={2}
			stroke={'orange'}
			p0={[-160, 35]}
			p2={[-142, 143]}
			p3={[120, 113]}
			end={0}
			arrowSize={10}
			endArrow
		/>,
	);

	view.add(
		<Code
			ref={behaviour}
			fontFamily={"Monaspace Argon"}
			fontSize={28}
			offsetX={-1}
			x={-400}
		/>,
	);

	view.add(
		<Code
			ref={forecast_detail}
			fontFamily={"Monaspace Argon"}
			fontSize={28}
			offsetX={-1}
			x={130}
			y={230}
			opacity={0}
			code={`\
enum ForecastDetail {
    sun,
    showers,
    thunderstorms,
    snow,
    fog
}
`}
		/>,
	);

	view.add(
		<Code
			ref={wind_speed}
			fontFamily={"Monaspace Argon"}
			fontSize={28}
			offsetX={-1}
			x={130}
			y={-40}
			opacity={0}
			code={`\
entity WindSpeedInfo {
    field min: Nat;
    field max: Nat;
    field windDirection: WindDirection;

    invariant $min <= $max;
}\n`}
		/>,
	);

	view.add(
		<Code
			ref={temp_range}
			fontFamily={"Monaspace Argon"}
			fontSize={28}
			offsetX={-1}
			x={130}
			y={-300}
			opacity={0}
			code={`
entity TempRange {
    field low: Int;
    field high: Int;

    invariant $low <= $high;
}\n`}
		/>,
	);

	yield* slideTransition(Direction.Bottom);
	yield* behaviour().code(`%%The behaviour of a mock is defined by the type constraints.\n`, 1.0);
	yield* waitFor(2.0);
	yield* all(
		behaviour().code.insert([1, 0], `\
entity Forecast {
    field temp: TempRange;
    field winds: WindSpeedInfo;
    field info: ForecastDetail;
}`, 1.0),
		behaviour().code.remove(lines(0), 0.8)
	)
	yield* behaviour().position.x(-700, 1)


	yield* all(
		arrowA().end(1, 2),
		arrowB().end(1, 2),
		arrowC().end(1, 2),
	)

	yield* forecast_detail().opacity(1,0.8)
	yield* wind_speed().opacity(1,0.8)
	yield* temp_range().opacity(1,0.8)

	yield* temp_range().selection(lines(5),0.8)
	yield* wind_speed().selection(lines(5),0.8)

	yield* waitFor(1.0);
});
