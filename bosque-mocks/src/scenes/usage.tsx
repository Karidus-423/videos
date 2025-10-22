import { Code, makeScene2D,lines, Path } from '@motion-canvas/2d';
import { createRef, Direction, slideTransition, waitFor} from '@motion-canvas/core';

export default makeScene2D(function*(view) {
	// Create your animations here
	const usage_cmds = createRef<Code>();
	const loading_path = createRef<Path>();

	view.add(
		<Code
			ref={usage_cmds}
			fontFamily={"Monaspace Argon"}
			fontSize={28}
			offsetX={-1}
			x={-400}
		/>,
	);

	view.add(
    <Path
      ref={loading_path}
      lineWidth={100}
      stroke={'white'}
      data= "M 250,200 A 50,50 0 1,0 150,200 A 50,50 0 1,0 250,200 Z"
      position={[-200, 70]}
	  scaleX={0.3}
	  scaleY={0.3}
      scale={0.5}
      start={0}
      end={0}
    ></Path>,
  );

	yield* slideTransition(Direction.Bottom);
	yield* usage_cmds().code(`%%To compile Bosque using mocks`, 0.5);
	yield* waitFor(2.0);
	yield* usage_cmds().code(`node BosqueCore/bin/src/cmd/bosque.js service.bsq`, 1.0);
	yield* usage_cmds().position.x(-550,0.7)
	yield* usage_cmds().code.insert([0,49], ` --function getForecast`,0.6)
	yield* usage_cmds().code.append(`\n./jsout/Main.mjs\n`,0.5)
	yield* usage_cmds().code.append(`./jsout/targettype.json\n`,0.3)
	yield* usage_cmds().code.append(`./jsout/typeinfo.json\n`,0.3)
	yield* usage_cmds().code.append(`\n\n`,0.3)
	yield* usage_cmds().code.append(`node BosqueCore/bin/src/cmd/analyze.js service.bsq\n`,0.6)
	yield* usage_cmds().code.append(`./smtout/formula.smt2`,0.3)
	yield* usage_cmds().code.append(`\n\n`,0.3)
	yield* usage_cmds().code.append(`node ./jsout/Main.mjs\n`,0.3)
	//Play waiting animation
	yield* loading_path().start(1, 1);
	yield* loading_path().opacity(0,0.2);
	//Ouput Result
	yield* usage_cmds().code.append(`(|8n,Main::Reason#approved|)`,0.5)
	yield* usage_cmds().selection(lines(10),0.5)

	yield* waitFor(1.5);
});
