// src/components/Task.stories.js

import React from "react";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {withKnobs, text, boolean, number} from "@storybook/addon-knobs";

import FHeader from "./";

storiesOf("FHeader", module).add("primary", () => <FHeader />);
