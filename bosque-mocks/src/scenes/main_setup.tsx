import { Code, makeScene2D,lines } from '@motion-canvas/2d';
import { createRef, Direction, slideTransition, waitFor} from '@motion-canvas/core';

export default makeScene2D(function*(view) {
	// Create your animations here
	const setup_code = createRef<Code>();

	view.add(
		<Code
			ref={setup_code}
			fontFamily={"Monaspace Argon"}
			fontSize={28}
			offsetX={-1}
			x={-400}
		/>,
	);

	yield* setup_code().code(`public function main(){}`, 0.5);
	yield* setup_code().code(`\
public function main(){
}
							 `, 0.5);
	yield* setup_code().code.insert([1,0],`    var forecast = getForecast("JFK");\n`,0.8)
	yield* setup_code().code.insert([1,17],`: Forecast `,0.8)
	yield* setup_code().code.insert([0,0],`\
entity Forecast {
    field temp: TempRange;
    field winds: WindSpeedInfo;
    field info: ForecastDetail;
}\n\n`,0.8)
	yield* setup_code().code.insert([7,0],`    %% getForecast function has yet to be implemented.\n`,0.8)
	yield* setup_code().selection(lines(7), 0.6);

	yield* waitFor(1.5);
});
