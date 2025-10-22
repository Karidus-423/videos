import { Code, makeScene2D,lines } from '@motion-canvas/2d';
import { createRef, Direction, slideTransition, waitFor} from '@motion-canvas/core';

export default makeScene2D(function*(view) {
	// Create your animations here
	const mock_def = createRef<Code>();

	view.add(
		<Code
			ref={mock_def}
			fontFamily={"Monaspace Argon"}
			fontSize={28}
			offsetX={-1}
			x={-400}
		/>,
	);

	yield* slideTransition(Direction.Bottom);
	yield* mock_def().code(`%%Defining mocks in Bosque\n`,0.3)
	yield* waitFor(1.0);
	yield* mock_def().code.append(`function getForecast(iota: String): Forecast`,0.8)
	yield* mock_def().position.x(-530,0.5);
	yield* mock_def().code.insert([1,45],`= s_mockService;`,0.8)

	yield* waitFor(2.0);
});

