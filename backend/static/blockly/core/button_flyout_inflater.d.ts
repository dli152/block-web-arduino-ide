/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FlyoutItem } from './flyout_item.js';
import type { IFlyout } from './interfaces/i_flyout.js';
import type { IFlyoutInflater } from './interfaces/i_flyout_inflater.js';
/**
 * Class responsible for creating buttons for flyouts.
 */
export declare class ButtonFlyoutInflater implements IFlyoutInflater {
    /**
     * Inflates a flyout button from the given state and adds it to the flyout.
     *
     * @param state A JSON representation of a flyout button.
     * @param flyout The flyout to create the button on.
     * @returns A newly created FlyoutButton.
     */
    load(state: object, flyout: IFlyout): FlyoutItem;
    /**
     * Returns the amount of space that should follow this button.
     *
     * @param state A JSON representation of a flyout button.
     * @param defaultGap The default spacing for flyout items.
     * @returns The amount of space that should follow this button.
     */
    gapForItem(state: object, defaultGap: number): number;
    /**
     * Disposes of the given button.
     *
     * @param item The flyout button to dispose of.
     */
    disposeItem(item: FlyoutItem): void;
    /**
     * Returns the type of items this inflater is responsible for creating.
     *
     * @returns An identifier for the type of items this inflater creates.
     */
    getType(): string;
}
//# sourceMappingURL=button_flyout_inflater.d.ts.map