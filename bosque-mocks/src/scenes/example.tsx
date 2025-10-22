import {Circle, makeScene2D} from '@motion-canvas/2d';
import {all,createRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Create your animations here

  const circle = createRef<Circle>();

  view.add(
	  <Circle
	  x = {-300}
	  ref={circle}
	  size={320}
	  fill={'lightseagreen'}
	  />,
  );

  yield* all(
	  circle().position.x(300,1).to(-300,1),
	  circle().fill("#4b4b4b",1).to('#7f7f4c',1),
  );
});
