/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * An item in the toolbox.
 *
 * @class
 */
import type { ICollapsibleToolboxItem } from '../interfaces/i_collapsible_toolbox_item.js';
import type { IFocusableTree } from '../interfaces/i_focusable_tree.js';
import type { IToolbox } from '../interfaces/i_toolbox.js';
import type { IToolboxItem } from '../interfaces/i_toolbox_item.js';
import type * as toolbox from '../utils/toolbox.js';
import type { WorkspaceSvg } from '../workspace_svg.js';
/**
 * Class for an item in the toolbox.
 */
export declare class ToolboxItem implements IToolboxItem {
    protected id_: string;
    protected parent_: ICollapsibleToolboxItem | null;
    protected level_: number;
    protected toolboxItemDef_: toolbox.ToolboxItemInfo | null;
    protected workspace_: WorkspaceSvg;
    /** The toolbox this category belongs to. */
    protected readonly parentToolbox_: IToolbox;
    /**
     * @param toolboxItemDef The JSON defining the toolbox item.
     * @param parentToolbox The toolbox that holds the toolbox item.
     * @param opt_parent The parent toolbox item or null if the category does not
     *     have a parent.
     */
    constructor(toolboxItemDef: toolbox.ToolboxItemInfo, parentToolbox: IToolbox, opt_parent?: ICollapsibleToolboxItem);
    /**
     * Initializes the toolbox item.
     * This includes creating the DOM and updating the state of any items based
     * on the info object.
     */
    init(): void;
    /**
     * Gets the div for the toolbox item.
     *
     * @returns The div for the toolbox item.
     */
    getDiv(): Element | null;
    /**
     * Gets the HTML element that is clickable.
     * The parent toolbox element receives clicks. The parent toolbox will add an
     * ID to this element so it can pass the onClick event to the correct
     * toolboxItem.
     *
     * @returns The HTML element that receives clicks, or null if this item should
     *     not receive clicks.
     */
    getClickTarget(): Element | null;
    /**
     * Gets a unique identifier for this toolbox item.
     *
     * @returns The ID for the toolbox item.
     */
    getId(): string;
    /**
     * Gets the parent if the toolbox item is nested.
     *
     * @returns The parent toolbox item, or null if this toolbox item is not
     *     nested.
     */
    getParent(): ICollapsibleToolboxItem | null;
    /**
     * Gets the nested level of the category.
     *
     * @returns The nested level of the category.
     * @internal
     */
    getLevel(): number;
    /**
     * Whether the toolbox item is selectable.
     *
     * @returns True if the toolbox item can be selected.
     */
    isSelectable(): boolean;
    /**
     * Whether the toolbox item is collapsible.
     *
     * @returns True if the toolbox item is collapsible.
     */
    isCollapsible(): boolean;
    /** Dispose of this toolbox item. No-op by default. */
    dispose(): void;
    /**
     * Sets whether the category is visible or not.
     * For a category to be visible its parent category must also be expanded.
     *
     * @param _isVisible True if category should be visible.
     */
    setVisible_(_isVisible: boolean): void;
    /** See IFocusableNode.getFocusableElement. */
    getFocusableElement(): HTMLElement | SVGElement;
    /** See IFocusableNode.getFocusableTree. */
    getFocusableTree(): IFocusableTree;
    /** See IFocusableNode.onNodeFocus. */
    onNodeFocus(): void;
    /** See IFocusableNode.onNodeBlur. */
    onNodeBlur(): void;
    /** See IFocusableNode.canBeFocused. */
    canBeFocused(): boolean;
}
//# sourceMappingURL=toolbox_item.d.ts.map