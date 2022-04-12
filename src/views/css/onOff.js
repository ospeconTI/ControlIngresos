/** @format */

import { css } from "lit";

export const onOff = css`
    .switch-button {
        display: inline-block;
    }
    .switch-button .switch-button__checkbox {
        display: none;
    }
    .switch-button .switch-button__label {
        background-color: var(--primary-color);
        width: 7rem;
        height: 4vh;
        border-radius: 2rem;
        display: inline-block;
        position: relative;

        font-size: 0.5rem;
        font-weight: bold;
        text-align: left;

        color: var(--color-blnco);
    }
    .switch-button .switch-button__label:before {
        transition: 0.2s;
        display: block;
        position: absolute;
        width: 3.5rem;
        height: 4vh;
        background-color: var(--color-gris);
        content: "";
        border-radius: 2rem;
        box-shadow: inset 0px 0px 0px 1px var(--color-negro);
    }
    .switch-button .switch-button__checkbox:checked + .switch-button__label {
        background-color: var(--primary-color);
    }
    .switch-button .switch-button__checkbox:checked + .switch-button__label:before {
        transform: translateX(3.5rem);
    }
`;
