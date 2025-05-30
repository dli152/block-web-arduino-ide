/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { FlyoutButton } from './flyout_button.js';
import type { FlyoutItemInfo } from './utils/toolbox.js';
import type { Workspace } from './workspace.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * String for use in the "custom" attribute of a category in toolbox XML.
 * This string indicates that the category should be dynamically populated with
 * variable blocks.
 * See also Blockly.Variables.CATEGORY_NAME and
 * Blockly.Procedures.CATEGORY_NAME.
 */
export declare const CATEGORY_NAME = "VARIABLE_DYNAMIC";
/**
 * Click handler for a button that creates String variables.
 *
 * @param button
 */
declare function stringButtonClickHandler(button: FlyoutButton): void;
export declare const onCreateVariableButtonClick_String: typeof stringButtonClickHandler;
/**
 * Click handler for a button that creates Number variables.
 *
 * @param button
 */
declare function numberButtonClickHandler(button: FlyoutButton): void;
export declare const onCreateVariableButtonClick_Number: typeof numberButtonClickHandler;
/**
 * Click handler for a button that creates Colour variables.
 *
 * @param button
 */
declare function colourButtonClickHandler(button: FlyoutButton): void;
export declare const onCreateVariableButtonClick_Colour: typeof colourButtonClickHandler;
/**
 * Internal wrapper that returns the contents of the dynamic variables category.
 *
 * @internal
 * @param workspace The workspace to populate variable blocks for.
 */
export declare function internalFlyoutCategory(workspace: WorkspaceSvg): FlyoutItemInfo[];
export declare function flyoutCategory(workspace: WorkspaceSvg, useXml: true): Element[];
export declare function flyoutCategory(workspace: WorkspaceSvg, useXml: false): FlyoutItemInfo[];
/**
 * Construct the blocks required by the flyout for the variable category.
 *
 * @param workspace The workspace containing variables.
 * @returns Array of XML block elements.
 */
export declare function flyoutCategoryBlocks(workspace: Workspace): Element[];
export {};
//# sourceMappingURL=variables_dynamic.d.ts.map