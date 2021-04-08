import React from 'react'
import ReactDOM from 'react-dom';
import GroupTemplate from "../../Components/Timeline/Groups/GroupTemplate";
import ItemTemplate from "../../Components/Timeline/Items/ItemTemplate";
import { SET_OPTIONS } from "../Actions/OptionsActions";

const initState = {}

export default function OptionsReducer(state = initState, actions) {
    switch (actions.type) {
        case SET_OPTIONS:
            return actions.options
        default:
            return state
    }
}