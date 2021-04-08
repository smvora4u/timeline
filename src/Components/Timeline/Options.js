// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Timeline, DataSet } from "vis-timeline/standalone";
// import { useSelector } from "react-redux";
// import '../../Styles/Main.css';



let Groups
let Items
let timeline
let FirebaseGroupsData

export const setTimeline = (tl) => {
    timeline = tl
}
export const getTimeline = () => {
    return timeline
}

export const setGroups = (groups) => {
    Groups = groups
}
export const getGroups = () => {
    return Groups
}

export const setItems = (items) => {
    Items = items
}
export const getItems = () => {
    return Items
}

export const setFirebaseGroupsData = (data) => {
    FirebaseGroupsData = data
}
export const getFirebaseGroupsData = () => {
    return FirebaseGroupsData
}

// export function initData() {
//     var numberOfGroups = 2;
//     var numberOfItems = 1000;
//     var itemsPerGroup = Math.round(numberOfItems / numberOfGroups);

//     for (var i = 1; i <= numberOfGroups; i++) {
//         groups.add({
//             order: i,
//             id: i,
//             content: 'Truck No: ' + i,
//         })
//     }

//     for (var truck = 0; truck <= numberOfGroups; truck++) {
//         var date = new Date();
//         for (var order = 0; order < itemsPerGroup; order++) {

//             date.setHours(date.getHours() + 4 * (Math.random() < 0.2));

//             var start = new Date(date);
//             date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));

//             var end = new Date(date);

//             items.add({
//                 id: order + itemsPerGroup * truck,
//                 group: truck,
//                 start: start,
//                 end: end,
//                 content: 'Order No: ' + order,
//                 title: 'JOHN DOE'
//             });

//         }
//     }
// }
// export function initOptions() {
//     options = {
//         margin: {
//             item: 5,
//             axis: 10
//         },
//         groupHeightMode: 'auto',
//         orientation: 'top',
//         height: '85vh',
//         start: new Date(),
//         end: new Date(1000 * 60 * 60 * 24 + (new Date()).valueOf()),
//         editable: true,
//         groupEditable: true,
//         multiselect: true,
//         zoomFriction: 8,
//         onInitialDrawComplete: () => {
//             //     timeline.setItems(items)
//         },
//         template: function (item, element) {
//             if (!item) { return }
//             return ReactDOM.createPortal(ReactDOM.render(<ItemTemplate item={item} />, element), element, () => { timeline.redraw() });
//         },

//         groupTemplate: function (groups, element) {
//             if (!groups || !groups.content) { return }
//             return ReactDOM.createPortal(ReactDOM.render(<GroupTemplate group={groups} />, element), element);
//         },

//         // visibleFrameTemplate: function (item, element) {
//         //     if (!item || !element) { return }
//         //     if (element.className.indexOf('timeline-item-visible-frame') === -1) { return }
//         //     return ReactDOM.createPortal( ReactDOM.render( <VisibleFrameTemplate item={item} />, element ), element );

//         // },
//     }
// }
// export function initTimeline() {
//     var container = document.getElementById('visualization');
//     // options.editable = true;
//     // options.groupEditable = true;
//     timeline = new Timeline(container, items, groups, options);
// } 
