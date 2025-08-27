/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BlockSvg } from '../block_svg.js';
import type { IFocusableNode } from '../interfaces/i_focusable_node.js';
import type { INavigationPolicy } from '../interfaces/i_navigation_policy.js';
/**
 * Set of rules controlling keyboard navigation from a block.
 */
export declare class BlockNavigationPolicy implements INavigationPolicy<BlockSvg> {
    /**
     * Returns the first child of the given block.
     *
     * @param current The block to return the first child of.
     * @returns The first field or input of the given block, if any.
     */
    getFirstChild(current: BlockSvg): IFocusableNode | null;
    /**
     * Returns the parent of the given block.
     *
     * @param current The block to return the parent of.
     * @returns The top block of the given block's stack, or the connection to
     *     which it is attached.
     */
    getParent(current: BlockSvg): IFocusableNode | null;
    /**
     * Returns the next peer node of the given block.
     *
     * @param current The block to find the following element of.
     * @returns The first block of the next stack if the given block is a terminal
     *     block, or its next connection.
     */
    getNextSibling(current: BlockSvg): IFocusableNode | null;
    /**
     * Returns the previous peer node of the given block.
     *
     * @param current The block to find the preceding element of.
     * @returns The block's previous/output connection, or the last
     *     connection/block of the previous block stack if it is a root block.
     */
    getPreviousSibling(current: BlockSvg): IFocusableNode | null;
    /**
     * Returns whether or not the given block can be navigated to.
     *
     * @param current The instance to check for navigability.
     * @returns True if the given block can be focused.
     */
    isNavigable(current: BlockSvg): boolean;
    /**
     * Returns whether the given object can be navigated from by this policy.
     *
     * @param current The object to check if this policy applies to.
     * @returns True if the object is a BlockSvg.
     */
    isApplicable(current: any): current is BlockSvg;
}
//# sourceMappingURL=block_navigation_policy.d.ts.map