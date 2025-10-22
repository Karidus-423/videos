import {makeProject} from '@motion-canvas/core';

// import example from './scenes/example?scene';
import setup from './scenes/main_setup?scene';
import mock_def from './scenes/mock_definition?scene';
import type_behaviour from './scenes/type_behaiviour?scene';
import usage from './scenes/usage?scene';

export default makeProject({
  scenes: [setup,mock_def,type_behaviour,usage],
});
